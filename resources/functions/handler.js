const {app, Menu, ipcMain, shell, dialog, Notification, BrowserWindow, systemPreferences} = require('electron'),
    {LoadOneTimeFiles, LoadFiles} = require('./load'),
    {join, resolve} = require('path'),
    {readFile, readFileSync, existsSync, truncate} = require('fs'),
    rimraf = require('rimraf'),
    {initAnalytics} = require('./utils');
initAnalytics();

const handler = {

    LaunchHandler: function () {
        // Version Fetch
        if (app.commandLine.hasSwitch('version') || app.commandLine.hasSwitch('v')) {
            console.log(app.getVersion())
            app.exit()
        }

        // Verbose Check
        if (app.commandLine.hasSwitch('verbose')) {
            console.log("[Apple-Music-Electron] User has launched the application with --verbose");
        }

        // Log File Location
        if (app.commandLine.hasSwitch('log') || app.commandLine.hasSwitch('l')) {
            console.log(join(app.getPath('userData'), 'logs'))
            app.exit()
        }
    },

    VersionHandler: function () {
        if (!app.preferences.value('storedVersion') || app.preferences.value('storedVersion') === undefined || app.preferences.value('storedVersion') !== app.getVersion()) {

            if (app.preferences.value('storedVersion')) {
                console.log(`[VersionHandler] Application updated from stored value ${app.preferences.value('storedVersion')} to ${app.getVersion()}`)
            }

            if (existsSync(resolve(app.getPath('userData'), 'Cache'))) {
                rimraf(resolve(app.getPath('userData'), 'Cache'), [], () => {
                    console.log(`[VersionHandler] Outdated / No Version Store Found. Clearing Application Cache. ('${resolve(app.getPath('userData'), 'Cache')}')`)
                })
            }

            if (existsSync(resolve(app.getPath('userData'), 'preferences.json'))) {
                truncate(resolve(app.getPath('userData'), 'preferences.json'), 0, function () {
                    console.log(`[VersionHandler] Outdated / No Version Store Found. Clearing Preferences File. ('${resolve(app.getPath('userData'), 'preferences.json')}')`)
                });
            }
        }

        if (app.preferences.value('storedVersion') !== app.getVersion()) {
            console.verbose(`[ApplicationReady] Updating Stored Version to ${app.getVersion()} (Was ${app.preferences.value('storedVersion')}).`);
            app.preferences.value('storedVersion', app.getVersion())
        }
    },

    InstanceHandler: function () {
        console.verbose('[InstanceHandler] Started.')

        app.on('second-instance', (_e, argv) => {
            console.warn(`[InstanceHandler][SecondInstanceHandler] Second Instance Started with args: [${argv.join(', ')}]`)

            // Checks if first instance is authorized and if second instance has protocol args
            argv.forEach((value) => {
                if (value.includes('ame://') || value.includes('itms://') || value.includes('itmss://') || value.includes('musics://') || value.includes('music://')) {
                    console.warn(`[InstanceHandler][SecondInstanceHandler] Found Protocol!`)
                    handler.LinkHandler(value);
                }
            })

            if (argv.includes("--force-quit")) {
                console.warn('[InstanceHandler][SecondInstanceHandler] Force Quit found. Quitting App.');
                app.isQuiting = true
                app.quit()
            } else if (app.win && !app.preferences.value('advanced.allowMultipleInstances').includes(true)) { // If a Second Instance has Been Started
                console.warn('[InstanceHandler][SecondInstanceHandler] Showing window.');
                app.win.show()
                app.win.focus()
            }
        })

        if (!app.requestSingleInstanceLock() && !app.preferences.value('advanced.allowMultipleInstances').includes(true)) {
            console.warn("[InstanceHandler] Existing Instance is Blocking Second Instance.");
            app.quit();
            app.isQuiting = true
        }
    },

    PlaybackStateHandler: function () {
        console.verbose('[playbackStateDidChange] Started.');

        ipcMain.on('playbackStateDidChange', (_event, a) => {
            console.verbose('[handler] playbackStateDidChange received.');
            app.media = a;

            app.ame.win.SetButtons()
            app.ame.win.SetTrayTooltip(a)
            app.ame.discord.updateActivity(a)
            app.ame.lastfm.scrobbleSong(a)
            app.ame.mpris.updateState(a)
        });
    },

    MediaStateHandler: function () {
        console.verbose('[MediaStateHandler] Started.');

        ipcMain.on('nowPlayingItemDidChange', (_event, a) => {
            console.verbose('[handler] nowPlayingItemDidChange received.');
            app.media = a;

            app.ame.win.CreateNotification(a);
            app.ame.mpris.updateActivity(a);

            if (app.preferences.value('audio.gaplessEnabled').includes(true)) {
                app.ame.win.SetButtons()
                app.ame.win.SetTrayTooltip(a)
                app.ame.discord.updateActivity(a)
                app.ame.lastfm.scrobbleSong(a)
                app.ame.mpris.updateState(a)
            }
        });
    },

    WindowStateHandler: function () {
        console.verbose('[WindowStateHandler] Started.');

        app.win.webContents.setWindowOpenHandler(({url}) => {
            shell.openExternal(url).then(() => console.log(`[WindowStateHandler] User has opened ${url} which has been redirected to browser.`));
            return {
                action: 'deny'
            }
        })

        app.win.webContents.on('did-finish-load', () => {
            console.verbose('[did-finish-load] Completed.');
            LoadOneTimeFiles();
            app.win.webContents.setZoomFactor(app.preferences.value("visual.scaling"))
            if (app.preferences.value('general.incognitoMode').includes(true)) {
                new Notification({
                    title: 'Incognito Mode Enabled',
                    body: `Listening activity is hidden.`
                }).show()
            }
        });

        app.win.webContents.on('did-fail-load', (event, errCode, errDesc, url, mainFrame) => {
            console.error(`Error Code: ${errCode}\nLoading: ${url}\n${errDesc}`)
            if (mainFrame) {
                app.exit()
            }
        });

        // Windows specific: Handles window states
        // Needed because Aero Snap events do not send the same way as clicking the frame buttons.
        if (process.platform === "win32" && app.preferences.value('visual.frameType') !== 'mac' || app.preferences.value('visual.frameType') !== 'mac-right') {
            var WND_STATE = {
                MINIMIZED: 0,
                NORMAL: 1,
                MAXIMIZED: 2,
                FULL_SCREEN: 3
            }
            var wndState = WND_STATE.NORMAL

            app.win.on("resize", (_event) => {
                const isMaximized = app.win.isMaximized()
                const isMinimized = app.win.isMinimized()
                const isFullScreen = app.win.isFullScreen()
                const state = wndState;
                if (isMinimized && state !== WND_STATE.MINIMIZED) {
                    wndState = WND_STATE.MINIMIZED
                } else if (isFullScreen && state !== WND_STATE.FULL_SCREEN) {
                    wndState = WND_STATE.FULL_SCREEN
                } else if (isMaximized && state !== WND_STATE.MAXIMIZED) {
                    wndState = WND_STATE.MAXIMIZED
                    app.win.webContents.executeJavaScript(`document.querySelector("#maximize").classList.add("maxed")`)
                } else if (state !== WND_STATE.NORMAL) {
                    wndState = WND_STATE.NORMAL
                    app.win.webContents.executeJavaScript(`document.querySelector("#maximize").classList.remove("maxed")`)
                }
            })
        }

        app.win.on('unresponsive', () => {
            dialog.showMessageBox({
                message: `${app.getName()} has become unresponsive`,
                title: 'Do you want to try forcefully reloading the app?',
                buttons: ['Yes', 'Quit', 'No'],
                cancelId: 1
            }).then(({response}) => {
                if (response === 0) {
                    app.win.contents.forcefullyCrashRenderer()
                    app.win.contents.reload()
                } else if (response === 1) {
                    console.log("[WindowStateHandler] Application has become unresponsive and has been closed.")
                    app.exit();
                }
            })
        })

        app.win.on('page-title-updated', (event, title) => {
            console.verbose(`[page-title-updated] Title updated Running necessary files. ('${title}')`)
            LoadFiles();
        })

        app.win.on('close', (e) => {
            if (!app.isQuiting) {
                if (app.isMiniplayerActive) {
                    ipcMain.emit("set-miniplayer", false);
                    e.preventDefault()
                } else if (app.preferences.value('window.closeButtonMinimize').includes(true) || process.platform === "darwin") {
                    app.win.hide()
                    e.preventDefault()
                }
            } else {
                app.win.destroy()
                if (app.lyrics.mxmWin) { app.lyrics.mxmWin.destroy(); }
                if (app.lyrics.neteaseWin) { app.lyrics.neteaseWin.destroy(); }
            }
        })

        app.win.on('maximize', (e) => {
            if (app.isMiniplayerActive) {
                e.preventDefault()
            }
        })

        app.win.on('show', () => {
            app.ame.win.SetContextMenu(true)
            app.ame.win.SetButtons()
            if (app.win.isVisible()) {
                app.win.focus()
            }
        });

        app.win.on('hide', () => {
            app.ame.win.SetContextMenu(false)
            if (app.pluginsEnabled) {
                app.win.webContents.executeJavaScript(`_plugins.execute('OnHide')`)
            }
        });

        // For macOS Link Handling
        app.on('open-url', function (event, url) {
            event.preventDefault()
            if (url.includes('ame://') || url.includes('itms://') || url.includes('itmss://') || url.includes('musics://') || url.includes('music://')) {
                handler.LinkHandler(url)
            }
        })

    },

    SettingsHandler: function () {
        console.verbose('[SettingsHandler] Started.');
        let DialogMessage = false,
            cachedPreferences = app.preferences._preferences,
            storedChanges = [];

        if (app.preferences.value('visual.useOperatingSystemAccent').includes(true)) {
            systemPreferences.on('accent-color-changed', (event, color) => {
                if (color) {
                    const accent = '#' + color.slice(0, -2)
                    app.win.webContents.insertCSS(`
                :root {
                    --keyColor: ${accent} !important;
                    --systemAccentBG: ${accent} !important;
                    --keyColor-rgb: ${app.ame.utils.hexToRgb(accent).r} ${app.ame.utils.hexToRgb(accent).g} ${app.ame.utils.hexToRgb(accent).b} !important;
                }
            }
            `).catch((e) => console.error(e));
                }
            })
        }


        app.preferences.on('save', (updatedPreferences) => {
            let currentChanges = []

            for (const [categoryTitle, categoryContents] of Object.entries(updatedPreferences)) {
                if (categoryContents !== cachedPreferences[categoryTitle]) { // This has gotten the changed category
                    for (const [settingTitle, settingValue] of Object.entries(updatedPreferences[categoryTitle])) {
                        if (JSON.stringify(settingValue) !== JSON.stringify(cachedPreferences[categoryTitle][settingTitle])) {
                            currentChanges.push(`${categoryTitle}.${settingTitle}`)
                            if (!storedChanges.includes(`${categoryTitle}.${settingTitle}`)) {
                                storedChanges.push(`${categoryTitle}.${settingTitle}`)
                            }
                        }
                    }
                }
            }

            console.verbose(`[SettingsHandler] Found changes: ${currentChanges} | Total Changes: ${storedChanges}`);

            // Theme Changes
            if (currentChanges.includes('visual.theme')) {
                app.win.webContents.executeJavaScript(`AMStyling.loadTheme("${(updatedPreferences.visual.theme === 'default' || !updatedPreferences.visual.theme) ? '' : updatedPreferences.visual.theme}");`).catch((e) => console.error(e));
                const updatedVibrancy = app.ame.utils.fetchTransparencyOptions();
                if (app.transparency && updatedVibrancy && process.platform !== 'darwin') app.win.setVibrancy(updatedVibrancy);
            }
            // Transparency Changes
            else if (currentChanges.includes('visual.transparencyEffect') || currentChanges.includes('visual.transparencyTheme') || currentChanges.includes('visual.transparencyDisableBlur') || currentChanges.includes('visual.transparencyMaximumRefreshRate')) {
                const updatedVibrancy = app.ame.utils.fetchTransparencyOptions()
                if (app.transparency && updatedVibrancy && process.platform !== 'darwin') {
                    app.win.setVibrancy(updatedVibrancy);
                    app.win.webContents.executeJavaScript(`AMStyling.setTransparency(true);`).catch((e) => console.error(e));
                } else {
                    app.win.setVibrancy();
                    app.win.webContents.executeJavaScript(`AMStyling.setTransparency(false);`).catch((e) => console.error(e));
                }
            }
            // Reload scripts
            else if (currentChanges.includes('visual.removeUpsell') || currentChanges.includes('visual.removeAppleLogo') || currentChanges.includes('visual.removeFooter') || currentChanges.includes('visual.useOperatingSystemAccent')) {
                app.ame.load.LoadFiles();
            }
            // IncognitoMode Changes
            else if (currentChanges.includes('general.incognitoMode')) {
                if (app.preferences.value('general.incognitoMode').includes(true)) {
                    console.log("[Incognito] Incognito Mode enabled. DiscordRPC and LastFM updates are ignored.")
                }
            }
            // The rest ask for a restart
            else if (!DialogMessage && !currentChanges.includes('general.lastfmAuthKey') && !currentChanges.includes('window.closeButtonMinimize')) {
                DialogMessage = dialog.showMessageBox({
                    title: "Relaunch Required",
                    message: "A relaunch is required in order for the settings you have changed to apply.",
                    type: "warning",
                    buttons: ['Relaunch Now', 'Relaunch Later']
                }).then(({response}) => {
                    if (response === 0) {
                        app.relaunch()
                        app.quit()
                    }
                })
            }

            cachedPreferences = updatedPreferences
        });
    },

    RendererListenerHandlers: () => {

        // Themes Listing Update
        ipcMain.handle('updateThemesListing', (_event) => {
            return app.ame.utils.fetchThemesListing();
        })

        // Acrylic Check
        ipcMain.handle('isAcrylicSupported', (_event) => {
            return app.ame.utils.isAcrylicSupported();
        })

        // Update Themes
        ipcMain.on('updateThemes', (_event) => {
            app.ame.utils.updateThemes().catch((e) => console.error(e))
        });

        // Authorization (This needs to be cleaned up a bit, an alternative to reload() would be good )
        ipcMain.on('authorizationStatusDidChange', (_event, authorized) => {
            console.log(`authorization updated. status: ${authorized}`)
            app.win.reload()
            app.ame.load.LoadFiles()
            app.isAuthorized = (authorized === 3)
        })

        // Window Navigation - Minimize
        ipcMain.on('minimize', () => { // listen for minimize event
            if (typeof app.win.minimize === 'function') {
                app.win.minimize()
            }
        });

        // Window Navigation - Maximize
        ipcMain.on('maximize', () => { // listen for maximize event and perform restore/maximize depending on window state

            if (app.win.isMaximized()) {
                app.win.unmaximize()
                if (process.platform !== "win32") {
                    app.win.webContents.executeJavaScript(`document.querySelector("#maximize").classList.remove("maxed")`)
                }
            } else {
                app.win.maximize()
                if (process.platform !== "win32") {
                    app.win.webContents.executeJavaScript(`document.querySelector("#maximize").classList.add("maxed")`)
                }
            }
        })

        // Window Navigation - Close
        ipcMain.on('close', () => { // listen for close event
            app.win.close();
        })

        // Window Navigation - Back
        ipcMain.on('back', () => { // listen for back event
            if (app.win.webContents.canGoBack()) {
                app.win.webContents.goBack()
            }
        })

        // Window Navigation - Resize
        ipcMain.on("resize-window", (event, width, height) => {
            app.win.setSize(width, height)
        })

        // miniPlayer
        const minSize = app.win.getMinimumSize()
        ipcMain.on("set-miniplayer", (event, val) => {
            if (val) {
                app.isMiniplayerActive = true;
                app.win.setSize(300, 300);
                app.win.setMinimumSize(300, 55);
                app.win.setMaximumSize(300, 300);
                app.win.maximizable = false;
                app.win.webContents.executeJavaScript("_miniPlayer.setMiniPlayer(true)").catch((e) => console.error(e));
                if (app.win.isMaximized) { app.win.unmaximize(); }
            } else {
                app.isMiniplayerActive = false;
                app.win.setMaximumSize(9999, 9999);
                app.win.setMinimumSize(minSize[0], minSize[1]);
                app.win.setSize(1024, 600);
                app.win.maximizable = true;
                app.win.webContents.executeJavaScript("_miniPlayer.setMiniPlayer(false)").catch((e) => console.error(e));
            }
        })

        ipcMain.on("show-miniplayer-menu", () => {
            const menuOptions = [{
                type: "checkbox",
                label: "Always On Top",
                click: () => {
                    if (app.win.isAlwaysOnTop()) {
                        app.win.setAlwaysOnTop(false, 'screen')
                    } else {
                        app.win.setAlwaysOnTop(true, 'screen')
                    }
                },
                checked: app.win.isAlwaysOnTop()
            }, {
                label: "Exit Mini Player",
                click: () => {
                    ipcMain.emit("set-miniplayer", false)
                }
            }]
            const menu = Menu.buildFromTemplate(menuOptions)
            menu.popup(app.win)
        })

        ipcMain.on("alwaysOnTop", (event, val) => {
            if (val) {
                app.win.setAlwaysOnTop(true, 'screen')
            } else {
                app.win.setAlwaysOnTop(false, 'screen')
            }
        })

        ipcMain.on("load-plugin", (event, plugin) => {
            let path = join(app.userPluginsPath, plugin.toLowerCase() + ".js")
            readFile(path, "utf-8", (error, data) => {
                if (!error) {
                    try {
                        app.win.webContents.executeJavaScript(data).then(() => {
                            console.verbose(`[Plugins] Injected Plugin`)
                        })
                    } catch (err) {
                        console.error(`[Plugins] error injecting plugin: ${path} - Error: ${err}`)
                    }
                } else {
                    console.error(`[Plugins] error reading plugin: ${path} - Error: ${error}`)
                }
            })
        })

        // Get Wallpaper
        ipcMain.on("get-wallpaper", (event) => {
            function base64_encode(file) {
                var bitmap = readFileSync(file)
                return `data:image/png;base64,${new Buffer(bitmap).toString('base64')}`
            }

            let spawn = require("child_process").spawn, child;
            child = spawn("powershell.exe", [`Get-ItemProperty -Path Registry::"HKCU\\Control Panel\\Desktop\\" -Name "Wallpaper" | ConvertTo-JSON`])
            child.stdout.on("data", function (data) {
                console.log("Powershell Data: " + data)
                const parsed = JSON.parse(data);
                event.returnValue = base64_encode(parsed["WallPaper"])
            })
            child.stderr.on("data", function (data) {
                console.log("Powershell Errors: " + data)
            })
            child.on("exit", function () {
                console.log("Powershell Script finished")
            })
            child.stdin.end()
        })

        ipcMain.on("set-zoom-factor", (event, factor)=>{
            app.win.webContents.setZoomFactor(factor)
        })
    },

    LinkHandler: function (startArgs) {
        if (!startArgs || !app.win || !app.isAuthorized) return;


        if (String(startArgs).includes('auth')) {
            let authURI = String(startArgs).split('/auth/')[1]
            if (authURI.startsWith('lastfm')) { // If we wanted more auth options
                const authKey = authURI.split('lastfm?token=')[1];
                app.win.webContents.send('LastfmAuthenticated', authKey);
            }
        } else {
            if (!app.isAuthorized) return
            const formattedSongID = startArgs.replace('ame://', '').replace('/', '');
            console.warn(`[LinkHandler] Attempting to load song id: ${formattedSongID}`);

            // setQueue can be done with album, song, url, playlist id
            app.win.webContents.executeJavaScript(`
                MusicKit.getInstance().setQueue({ song: '${formattedSongID}'}).then(function(queue) {
                    MusicKit.getInstance().play();
                });
            `).catch((err) => console.error(err));
        }

    },

    LyricsHandler: function () {
        app.lyrics = {neteaseWin: null, mxmWin: null}

        app.lyrics.neteaseWin = new BrowserWindow({
            width: 1,
            height: 1,
            show: false,
            autoHideMenuBar: true,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });
        app.lyrics.mxmWin = new BrowserWindow({
            width: 1,
            height: 1,
            show: false,
            autoHideMenuBar: true,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,

            }
        });

        ipcMain.on('MXMTranslation', function (event, track, artist, lang) {
            try {
                if (app.lyrics.mxmWin == null) {
                    app.lyrics.mxmWin = new BrowserWindow({
                        width: 1,
                        height: 1,
                        show: false,
                        autoHideMenuBar: true,
                        webPreferences: {
                            nodeIntegration: true,
                            contextIsolation: false,

                        }
                    });


                } else {
                    app.lyrics.mxmWin.webContents.send('mxmcors', track, artist, lang);
                }
                // try{

                // const cookie = { url: 'https://apic-desktop.musixmatch.com/', name: 'x-mxm-user-id', value: '' }
                // app.lyrics.mxmWin.webContents.session.defaultSession.cookies.set(cookie);
                // } catch (e){}
                if (!app.lyrics.mxmWin.webContents.getURL().includes('musixmatch.html')) {
                    app.lyrics.mxmWin.loadFile(join(__dirname, '../lyrics/musixmatch.html'));
                    app.lyrics.mxmWin.webContents.on('did-finish-load', () => {
                        app.lyrics.mxmWin.webContents.send('mxmcors', track, artist, lang);
                    });
                }

                app.lyrics.mxmWin.on('closed', () => {
                    app.lyrics.mxmWin = null
                });

            } catch (e) {
                console.error(e)
            }
        });

        ipcMain.on('NetEaseLyricsHandler', function (event, data) {
            try {
                if (app.lyrics.neteaseWin == null) {
                    app.lyrics.neteaseWin = new BrowserWindow({
                        width: 100,
                        height: 100,
                        show: false,
                        autoHideMenuBar: true,
                        webPreferences: {
                            nodeIntegration: true,
                            contextIsolation: false,

                        }
                    });
                    app.lyrics.neteaseWin.webContents.on('did-finish-load', () => {
                        app.lyrics.neteaseWin.webContents.send('neteasecors', data);
                    });
                } else {
                    app.lyrics.neteaseWin.webContents.on('did-finish-load', () => {
                        app.lyrics.neteaseWin.webContents.send('neteasecors', data);
                    });
                }
                app.lyrics.neteaseWin.loadFile(join(__dirname, '../lyrics/netease.html'));
                app.lyrics.neteaseWin.on('closed', () => {
                    app.lyrics.neteaseWin = null
                });

            } catch (e) {
                console.log(e);
                app.win.send('truelyrics', '[00:00] Instrumental. / Lyrics not found.');
            }
        });

        ipcMain.on('LyricsHandler', function (event, data, artworkURL) {
            app.win.send('truelyrics', data);
            app.win.send('albumart', artworkURL);
        });

        ipcMain.on('LyricsHandlerNE', function (event, data) {
            app.win.send('truelyrics', data);
        });

        ipcMain.on('LyricsHandlerTranslation', function (event, data) {
            app.win.send('lyricstranslation', data);
        });

        ipcMain.on('LyricsTimeUpdate', function (event, data) {
            app.win.send('ProgressTimeUpdate', data);
        });

        ipcMain.on('LyricsUpdate', function (event, data, artworkURL) {
            app.win.send('truelyrics', data);
            app.win.send('albumart', artworkURL);
        });

        ipcMain.on('LyricsMXMFailed', function (_event, _data) {
            app.win.send('backuplyrics', '');
        });

        ipcMain.on('ProgressTimeUpdateFromLyrics', function (event, data) {
            app.win.webContents.executeJavaScript(`MusicKit.getInstance().seekToTime('${data}')`).catch((e) => console.error(e));
        });
    }
}

module.exports = handler
