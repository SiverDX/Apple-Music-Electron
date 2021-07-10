const {app} = require('electron')
const {autoUpdater} = require("electron-updater");
autoUpdater.logger = require("electron-log");

exports.InitializeAutoUpdater = function () {
    console.log('[InitializeAutoUpdater] Started.')

    if (app.preferences.value('advanced.autoUpdaterBetaBuilds').includes(true)) {
        autoUpdater.allowPrerelease = true
        autoUpdater.allowDowngrade = false
    }
    console.log("[AutoUpdater] Checking for updates...")
    autoUpdater.checkForUpdatesAndNotify().then(r => console.log(`[AutoUpdater] Latest Version is ${r.updateInfo.version}`))


}