try {
    function matchRuleShort(str, rule) {
        var escapeRegex = (str) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        return new RegExp("^" + rule.split("*").map(escapeRegex).join(".*") + "$").test(str);
    }
    if (!preferences) {
        var preferences = ipcRenderer.sendSync('getPreferences');
    }
    if (!storedInnerHTML) {
        var storedInnerHTML = document.getElementsByClassName('dt-footer')[0].innerHTML;
    }

    if (matchRuleShort(window.location.href, '*settings*') && document.getElementsByClassName('application-preferences').length === 0) {
        document.getElementsByClassName('commerce-full-content')[0].innerHTML = `
        <div class="application-preferences">
            <div class="app-prefs-section general">
                <div class="app-prefs-title header-nav" style="height: 10px;">
                    <div class="header-nav-content">
                        <h1 class="typography-header-emphasized">General Settings</h1>
                    </div>
                </div>
                <ul class="settings-list general">
                    <li class="app-prefs-dropdown">
                        <span class="typography-title-3-tall">Choose a language for the system to use</span>
                        <select class="form-dropdown-select list-element" name="language" id="language">
                            <option disabled>Select one</option>
                            <option value='us'>English (US)</option>
                            <option value='gb'>English (UK)</option>
                            <option value='ae'>United Arab Emirates</option>
                            <option value='ag'>Antigua and Barbuda</option>
                            <option value='ai'>Anguilla</option>
                            <option value='al'>Albania</option>
                            <option value='am'>Armenia</option>
                            <option value='ao'>Angola</option>
                            <option value='ar'>Argentina</option>
                            <option value='at'>Austria</option>
                            <option value='au'>Australia</option>
                            <option value='az'>Azerbaijan</option>
                            <option value='bb'>Barbados</option>
                            <option value='be'>Belgium</option>
                            <option value='bf'>Burkina-Faso</option>
                            <option value='bg'>Bulgaria</option>
                            <option value='bh'>Bahrain</option>
                            <option value='bj'>Benin</option>
                            <option value='bm'>Bermuda</option>
                            <option value='bn'>Brunei Darussalam</option>
                            <option value='bo'>Bolivia</option>
                            <option value='br'>Brazil</option>
                            <option value='bs'>Bahamas</option>
                            <option value='bt'>Bhutan</option>
                            <option value='bw'>Botswana</option>
                            <option value='by'>Belarus</option>
                            <option value='bz'>Belize</option>
                            <option value='ca'>Canada</option>
                            <option value='cg'>Democratic Republic of the Congo</option>
                            <option value='ch'>Switzerland</option>
                            <option value='cl'>Chile</option>
                            <option value='cn'>China</option>
                            <option value='co'>Colombia</option>
                            <option value='cr'>Costa Rica</option>
                            <option value='cv'>Cape Verde</option>
                            <option value='cy'>Cyprus</option>
                            <option value='cz'>Czech Republic</option>
                            <option value='de'>Germany</option>
                            <option value='dk'>Denmark</option>
                            <option value='dm'>Dominica</option>
                            <option value='do'>Dominican Republic</option>
                            <option value='dz'>Algeria</option>
                            <option value='ec'>Ecuador</option>
                            <option value='ee'>Estonia</option>
                            <option value='eg'>Egypt</option>
                            <option value='es'>Spain</option>
                            <option value='fi'>Finland</option>
                            <option value='fj'>Fiji</option>
                            <option value='fm'>Federated States of Micronesia</option>
                            <option value='fr'>France</option>
                            <option value='gd'>Grenada</option>
                            <option value='gh'>Ghana</option>
                            <option value='gm'>Gambia</option>
                            <option value='gr'>Greece</option>
                            <option value='gt'>Guatemala</option>
                            <option value='gw'>Guinea Bissau</option>
                            <option value='gy'>Guyana</option>
                            <option value='hk'>Hong Kong</option>
                            <option value='hn'>Honduras</option>
                            <option value='hr'>Croatia</option>
                            <option value='hu'>Hungaria</option>
                            <option value='id'>Indonesia</option>
                            <option value='ie'>Ireland</option>
                            <option value='il'>Israel</option>
                            <option value='in'>India</option>
                            <option value='is'>Iceland</option>
                            <option value='it'>Italy</option>
                            <option value='jm'>Jamaica</option>
                            <option value='jo'>Jordan</option>
                            <option value='jp'>Japan</option>
                            <option value='ke'>Kenya</option>
                            <option value='kg'>Krygyzstan</option>
                            <option value='kh'>Cambodia</option>
                            <option value='kn'>Saint Kitts and Nevis</option>
                            <option value='kr'>South Korea</option>
                            <option value='kw'>Kuwait</option>
                            <option value='ky'>Cayman Islands</option>
                            <option value='kz'>Kazakhstan</option>
                            <option value='la'>Laos</option>
                            <option value='lb'>Lebanon</option>
                            <option value='lc'>Saint Lucia</option>
                            <option value='lk'>Sri Lanka</option>
                            <option value='lr'>Liberia</option>
                            <option value='lt'>Lithuania</option>
                            <option value='lu'>Luxembourg</option>
                            <option value='lv'>Latvia</option>
                            <option value='md'>Moldova</option>
                            <option value='mg'>Madagascar</option>
                            <option value='mk'>Macedonia</option>
                            <option value='ml'>Mali</option>
                            <option value='mn'>Mongolia</option>
                            <option value='mo'>Macau</option>
                            <option value='mr'>Mauritania</option>
                            <option value='ms'>Montserrat</option>
                            <option value='mt'>Malta</option>
                            <option value='mu'>Mauritius</option>
                            <option value='mw'>Malawi</option>
                            <option value='mx'>Mexico</option>
                            <option value='my'>Malaysia</option>
                            <option value='mz'>Mozambique</option>
                            <option value='na'>Namibia</option>
                            <option value='ne'>Niger</option>
                            <option value='ng'>Nigeria</option>
                            <option value='ni'>Nicaragua</option>
                            <option value='nl'>Netherlands</option>
                            <option value='np'>Nepal</option>
                            <option value='no'>Norway</option>
                            <option value='nz'>New Zealand</option>
                            <option value='om'>Oman</option>
                            <option value='pa'>Panama</option>
                            <option value='pe'>Peru</option>
                            <option value='pg'>Papua New Guinea</option>
                            <option value='ph'>Philippines</option>
                            <option value='pk'>Pakistan</option>
                            <option value='pl'>Poland</option>
                            <option value='pt'>Portugal</option>
                            <option value='pw'>Palau</option>
                            <option value='py'>Paraguay</option>
                            <option value='qa'>Qatar</option>
                            <option value='ro'>Romania</option>
                            <option value='ru'>Russia</option>
                            <option value='sa'>Saudi Arabia</option>
                            <option value='sb'>Soloman Islands</option>
                            <option value='sc'>Seychelles</option>
                            <option value='se'>Sweden</option>
                            <option value='sg'>Singapore</option>
                            <option value='si'>Slovenia</option>
                            <option value='sk'>Slovakia</option>
                            <option value='sl'>Sierra Leone</option>
                            <option value='sn'>Senegal</option>
                            <option value='sr'>Suriname</option>
                            <option value='st'>Sao Tome e Principe</option>
                            <option value='sv'>El Salvador</option>
                            <option value='sz'>Swaziland</option>
                            <option value='tc'>Turks and Caicos Islands</option>
                            <option value='td'>Chad</option>
                            <option value='th'>Thailand</option>
                            <option value='tj'>Tajikistan</option>
                            <option value='tm'>Turkmenistan</option>
                            <option value='tn'>Tunisia</option>
                            <option value='tr'>Turkey</option>
                            <option value='tt'>Republic of Trinidad and Tobago</option>
                            <option value='tw'>Taiwan</option>
                            <option value='tz'>Tanzania</option>
                            <option value='ua'>Ukraine</option>
                            <option value='ug'>Uganda</option>
                            <option value='uy'>Uruguay</option>
                            <option value='uz'>Uzbekistan</option>
                            <option value='vc'>Saint Vincent and the Grenadines</option>
                            <option value='ve'>Venezuela</option>
                            <option value='vg'>British Virgin Islands</option>
                            <option value='vn'>Vietnam</option>
                            <option value='ye'>Yemen</option>
                            <option value='za'>South Africa</option>
                            <option value='zw'>Zimbabwe</option>
                        </select>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">You will need to restart the application for language settings to apply.</span>
                    </li>
                    <li class="app-prefs-toggle">
                        <span class="typography-title-3-tall">Incognito Mode</span>
                        <label class="toggle-element list-element">
                            <input id="incognitoMode" type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">When enabled the application will hide all song details and information from all receivers. (Discord RPC, LastFM, Apple)</span>
                    </li>
                    <li class="app-prefs-dropdown">
                        <span class="typography-title-3-tall">Show notifications on Song Change</span>
                        <select class="form-dropdown-select list-element" name="playbackNotifications"
                                id="playbackNotifications">
                            <option disabled>Select one</option>
                            <option value=''>Disabled</option>
                            <option value=true>Enabled</option>
                            <option value='minimized'>Enabled (Notifications when Minimized)</option>
                        </select>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">Enabling this means you will get notifications when you change song. The minimized option forces notifications to only appear if the app is hidden / minimized.</span>
                    </li>
                    <li class="app-prefs-toggle">
                        <span class="typography-title-3-tall">Show song name as tray icon tooltip</span>
                        <label class="toggle-element list-element">
                            <input id="trayTooltipSongName" type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">Enabling this option allows you to see the song name in the tooltip on the taskbar when the application is minimized to the tray.</span>
                    </li>
                    <li class="app-prefs-dropdown">
                        <span class="typography-title-3-tall">Startup page</span>
                        <select class="form-dropdown-select list-element" name="startupPage" id="startupPage">
                            <option disabled>Select one</option>
                            <option value='browse'>Browse</option>
                            <option value='listen-now'>Listen now</option>
                            <option value='radio'>Radio</option>
                            <option value='library/recently-added'>Recently Added</option>
                            <option value='library/albums'>Albums</option>
                            <option value='library/songs'>Songs</option>
                            <option value='library/made-for-you'>Made for You</option>
                        </select>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">Select what page you wish to be placed on when you start the application.</span>
                    </li>
                    <li class="app-prefs-toggle">
                        <span class="typography-title-3-tall">Allow statistics to be collected when errors or crashes occur</span>
                        <label class="toggle-element list-element">
                            <input id="analyticsEnabled" type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">These logs when enabled allow us to fix bugs and errors that may occur during your listening sessions to better improve the application. We understand if you're not comfortable with them on, but it helps us out immensely in figuring out widespread issues. (Note: We do not gather personal information, only stuff that shows to you as an error in the code.)</span>
                    </li>
                    <li class="app-prefs-divider header-nav">
                        <h2 class="shelf-title">Discord Rich Presence</h2>
                        <span class="app-prefs-help typography-title-3-tall">These settings are for managing how you display your status on Discord. You must have 'Display current activity as status message.' turned on in your Discord settings for the song to be shown.</span>
                    </li>
                    <li class="app-prefs-dropdown">
                        <span class="typography-title-3-tall">Display song data as activity on Discord</span>
                        <select class="form-dropdown-select list-element" name="discordRPC" id="discordRPC">
                            <option disabled>Select one</option>
                            <option value='am-title'>Enabled (Display 'Apple Music' as title)</option>
                            <option value='ame-title'>Enabled (Display 'Apple Music Electron' as title)</option>
                            <option value=''>Disabled</option>
                        </select>
                        </label>
                    </li>
                    <li class="app-prefs-toggle">
                        <span class="typography-title-3-tall">Clear activity on pause</span>
                        <label class="toggle-element list-element">
                            <input id="discordClearActivityOnPause" type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">With this disabled your status will show a Pause/Play icon whenever you are playing or have a song paused. When you enable this, it is replaced with a branch icon (Nightly / Stable) and a version title when you hover.</span>
                    </li>
                    <li class="app-prefs-divider header-nav">
                        <h2 class="shelf-title">LastFM</h2>
                    </li>
                    <li class="app-prefs-button">
                        <span class="typography-title-3-tall">LastFM Account</span>
                        <label id="lfmConnect" class="list-button list-element"
                               onclick="LastFMAuthenticate()">Connect</label>
                    </li>
                    <li class="app-prefs-toggle">
                        <span class="typography-title-3-tall">Remove featuring artists from song title</span>
                        <label class="toggle-element list-element">
                            <input id="lastfmRemoveFeaturingArtists" type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">Enabling this will remove the featuring artists from the scrobbled data, meaning on LastFM only the primary artist will be shown.</span>
                    </li>
                </ul>
            </div>
            <div class="app-prefs-section visual">
                <div class="app-prefs-title header-nav" style="height: 10px;">
                    <div class="header-nav-content">
                        <h1 class="typography-header-emphasized">Visual Settings</h1>
                    </div>
                </div>
                <ul class="settings-list visual">
                    <li class="app-prefs-dropdown">
                        <span class="typography-title-3-tall">Theme</span>
                        <select class="form-dropdown-select list-element" name="theme" id="theme">
                            <option disabled>Select one</option>
                            <option value='default'>Default</option>
                        </select>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">You will need to restart the application in order for the default themes to be populated. You can preview all the themes <a
                                href="#"
                                onclick="window.open('https://github.com/Apple-Music-Electron/Apple-Music-Electron/wiki/Theme-Preview-Images')">here</a>.</span>
                    </li>
                    <li class="app-prefs-button">
                        <span class="typography-title-3-tall">Update Themes</span>
                        <label id="updateThemes" class="list-button list-element"
                               onclick="updateThemes()">Update Themes</label>
                    </li>
                    <li class="app-prefs-dropdown">
                        <span class="typography-title-3-tall">Application Frame</span>
                        <select class="form-dropdown-select list-element" name="frameType" id="frameType">
                            <option disabled>Select one</option>
                            <option value=''>Disabled</option>
                            <option value='mac-right'>macOS Emulation (Right)</option>
                            <option value='mac'>macOS Emulation</option>
                        </select>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">macOS Emulation shows the 'stoplights' that are well known for all mac users and adjusts other UI elements to resemble the macOS Music App. Selecting the right option shows a more Windows-like representation with the stoplights replacing the usual close, minimize and maximize buttons. For mac users its suggested that you disable this for the best experience. Having this disabled will make the application use the operating system's frame.</span>
                    </li>
                    <li class="app-prefs-divider header-nav">
                        <h2 class="shelf-title">Transparency Configuration</h2>
                        <span class="app-prefs-help typography-title-3-tall">Here you can configure the transparency options for the window. Transparency only works on certain systems, so read the descriptions of each setting. It is not advised to use transparency on platforms other than Windows or macOS.</span>
                    </li>
                    <li class="app-prefs-dropdown">
                        <span class="typography-title-3-tall">Transparency Effect</span>
                        <select class="form-dropdown-select list-element" name="transparencyEffect" id="transparencyEffect">
                            <option disabled>Select one</option>
                            <option value=''>Disabled</option>
                            <option value='blur'>Blur Behind</option>
                        </select>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">Sets the type of Windows transparency effect, either 'acrylic', 'blur' or leave it empty to disable it. Changing the transparency blur type can improve performance and compatibility with older hardware and systems.</span>
                    </li>
                    <li class="app-prefs-dropdown">
                        <span class="typography-title-3-tall">Transparency Theme</span>
                        <input class="form-dropdown-select list-element" name="transparencyTheme" id="transparencyTheme"/>
                        <span class="app-prefs-help typography-title-3-tall">Sets color of acrylic effect. Can be 'light', 'dark', 'appearance-based' or a hex color code with alpha ('#0f0f0f00').</span>
                    </li>
                    <li class="app-prefs-toggle" id="transparencyDisableBlurToggleLI">
                        <span class="typography-title-3-tall">Disable Transparency when Unfocused (Acrylic Only)</span>
                        <label class="toggle-element list-element">
                            <input id="transparencyDisableBlur" type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">If enabled, acrylic effect will be disabled when the window loses focus, to mimic the behaviour of normal UWP apps.</span>
                    </li>
                    <li class="app-prefs-dropdown">
                        <span class="typography-title-3-tall">Use Custom Window Refresh Rate</span>
                        <select class="form-dropdown-select list-element" name="transparencyMaximumRefreshRate"
                                id="transparencyMaximumRefreshRate">
                            <option disabled>Select one</option>
                            <option value=''>Disabled</option>
                            <option value='30'>30</option>
                            <option value='60'>60</option>
                            <option value='144'>144</option>
                            <option value='175'>175</option>
                            <option value='240'>240</option>
                            <option value='360'>30</option>
                        </select>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">Use custom window resize/move handler for performance. You can set the maximum refresh rate that the application uses. Disabled would default to 60hz.</span>
                    </li>
                    <li class="app-prefs-divider header-nav">
                    <h2 class="shelf-title">Lyrics</h2>
                    </li>
                    <li class="app-prefs-toggle">
                    <span class="typography-title-3-tall">Enable Musixmatch Lyrics</span>
                    <label class="toggle-element list-element">
                        <input id="mxmon" type="checkbox" checked>
                        <span class="slider"></span>
                    </label>
                    <span class="app-prefs-help typography-title-3-tall">Less stable , but allow for lyrics translation and better lyrics detection</span>
                    </li>
                    <li class="app-prefs-dropdown">
                    <span class="typography-title-3-tall">Lyrics translation language</span>
                    <select class="form-dropdown-select list-element" name="mxmlanguage" id="mxmlanguage">
                        <option value='disabled'>Disabled</option>
                        <option value='ab'>Abkhazian</option>
                        <option value='aa'>Afar</option>
                        <option value='af'>Afrikaans</option>
                        <option value='ak'>Akan</option>
                        <option value='sq'>Albanian</option>
                        <option value='am'>Amharic</option>
                        <option value='ar'>Arabic</option>
                        <option value='an'>Aragonese</option>
                        <option value='hy'>Armenian</option>
                        <option value='as'>Assamese</option>
                        <option value='a5'>Assamese-romaji</option>
                        <option value='a3'>Asturian</option>
                        <option value='av'>Avaric</option>
                        <option value='ae'>Avestan</option>
                        <option value='ay'>Aymara</option>
                        <option value='az'>Azerbaijani</option>
                        <option value='bm'>Bambara</option>
                        <option value='ba'>Bashkir</option>
                        <option value='eu'>Basque</option>
                        <option value='b1'>Bavarian</option>
                        <option value='be'>Belarusian</option>
                        <option value='bn'>Bengali</option>
                        <option value='b5'>Bengali-romaji</option>
                        <option value='bh'>Bihari languages</option>
                        <option value='b3'>Bishnupriya</option>
                        <option value='bi'>Bislama</option>
                        <option value='bs'>Bosnian</option>
                        <option value='br'>Breton</option>
                        <option value='bg'>Bulgarian</option>
                        <option value='my'>Burmese</option>
                        <option value='ca'>Catalan</option>
                        <option value='c2'>Cebuano</option>
                        <option value='b2'>Central bikol</option>
                        <option value='c3'>Central kurdish</option>
                        <option value='ch'>Chamorro</option>
                        <option value='c1'>Chavacano</option>
                        <option value='ce'>Chechen</option>
                        <option value='ny'>Chichewa</option>
                        <option value='zh'>Chinese (simplified)</option>
                        <option value='z1'>Chinese (traditional)</option>
                        <option value='rz'>Chinese-romaji</option>
                        <option value='cu'>Church slavic</option>
                        <option value='cv'>Chuvash</option>
                        <option value='kw'>Cornish</option>
                        <option value='co'>Corsican</option>
                        <option value='cr'>Cree</option>
                        <option value='c4'>Creoles and pidgins</option>
                        <option value='c5'>Creoles and pidgins, english based</option>
                        <option value='c6'>Creoles and pidgins, french-based</option>
                        <option value='c7'>Creoles and pidgins, portuguese-based</option>
                        <option value='hr'>Croatian</option>
                        <option value='cs'>Czech</option>
                        <option value='da'>Danish</option>
                        <option value='d1'>Dimli (individual language)</option>
                        <option value='dv'>Divehi</option>
                        <option value='d3'>Dotyali</option>
                        <option value='nl'>Dutch</option>
                        <option value='dz'>Dzongkha</option>
                        <option value='m2'>Eastern mari</option>
                        <option value='a2'>Egyptian arabic</option>
                        <option value='e1'>Emilian-romagnol</option>
                        <option value='en'>English</option>
                        <option value='m6'>Erzya</option>
                        <option value='eo'>Esperanto</option>
                        <option value='et'>Estonian</option>
                        <option value='ee'>Ewe</option>
                        <option value='fo'>Faroese</option>
                        <option value='h1'>Fiji hindi</option>
                        <option value='fj'>Fijian</option>
                        <option value='f1'>Filipino</option>
                        <option value='fi'>Finnish</option>
                        <option value='fr'>French</option>
                        <option value='f2'>Frisian, northern</option>
                        <option value='fy'>Frisian, western</option>
                        <option value='ff'>Fulah</option>
                        <option value='gl'>Galician</option>
                        <option value='lg'>Ganda</option>
                        <option value='ka'>Georgian</option>
                        <option value='de'>German</option>
                        <option value='n2'>German, low</option>
                        <option value='g1'>Goan konkani</option>
                        <option value='el'>Greek</option>
                        <option value='e2'>Greek-romaji</option>
                        <option value='kl'>Greenlandic</option>
                        <option value='gn'>Guarani</option>
                        <option value='gu'>Gujarati</option>
                        <option value='g2'>Gujarati-romaji</option>
                        <option value='ht'>Haitian creole</option>
                        <option value='ha'>Hausa</option>
                        <option value='he'>Hebrew</option>
                        <option value='hz'>Herero</option>
                        <option value='hi'>Hindi</option>
                        <option value='h3'>Hindi-romaji</option>
                        <option value='ho'>Hiri motu</option>
                        <option value='hu'>Hungarian</option>
                        <option value='is'>Icelandic</option>
                        <option value='io'>Ido</option>
                        <option value='ig'>Igbo</option>
                        <option value='i1'>Iloko</option>
                        <option value='id'>Indonesian</option>
                        <option value='ia'>Interlingua</option>
                        <option value='ie'>Interlingue</option>
                        <option value='iu'>Inuktitut</option>
                        <option value='ik'>Inupiaq</option>
                        <option value='ga'>Irish</option>
                        <option value='it'>Italian</option>
                        <option value='ja'>Japanese</option>
                        <option value='rj'>Japanese-romaji</option>
                        <option value='jv'>Javanese</option>
                        <option value='x1'>Kalmyk</option>
                        <option value='kn'>Kannada</option>
                        <option value='k2'>Kannada-romaji</option>
                        <option value='kr'>Kanuri</option>
                        <option value='k1'>Karachay-balkar</option>
                        <option value='ks'>Kashmiri</option>
                        <option value='kk'>Kazakh</option>
                        <option value='km'>Khmer, central</option>
                        <option value='ki'>Kikuyu</option>
                        <option value='rw'>Kinyarwanda</option>
                        <option value='ky'>Kirghiz</option>
                        <option value='kv'>Komi</option>
                        <option value='kg'>Kongo</option>
                        <option value='ko'>Korean</option>
                        <option value='rk'>Korean-romaji</option>
                        <option value='kj'>Kuanyama</option>
                        <option value='ku'>Kurdish</option>
                        <option value='lo'>Lao</option>
                        <option value='la'>Latin</option>
                        <option value='lv'>Latvian</option>
                        <option value='l1'>Lezghian</option>
                        <option value='li'>Limburgish</option>
                        <option value='ln'>Lingala</option>
                        <option value='lt'>Lithuanian</option>
                        <option value='j1'>Lojban</option>
                        <option value='l2'>Lombard</option>
                        <option value='lu'>Luba-katanga</option>
                        <option value='lb'>Luxembourgish</option>
                        <option value='mk'>Macedonian</option>
                        <option value='m1'>Maithili</option>
                        <option value='mg'>Malagasy</option>
                        <option value='ms'>Malay</option>
                        <option value='ml'>Malayalam</option>
                        <option value='m8'>Malayalam-romaji</option>
                        <option value='mt'>Maltese</option>
                        <option value='gv'>Manx</option>
                        <option value='mi'>Maori</option>
                        <option value='mr'>Marathi</option>
                        <option value='m9'>Marathi-romaji</option>
                        <option value='mh'>Marshallese</option>
                        <option value='m7'>Mazanderani</option>
                        <option value='m3'>Minangkabau</option>
                        <option value='x2'>Mingrelian</option>
                        <option value='m5'>Mirandese</option>
                        <option value='mo'>Moldavian</option>
                        <option value='mn'>Mongolian</option>
                        <option value='n4'>Nahuatl</option>
                        <option value='na'>Nauru</option>
                        <option value='nv'>Navajo</option>
                        <option value='nd'>Ndebele, north</option>
                        <option value='nr'>Ndebele, south</option>
                        <option value='ng'>Ndonga</option>
                        <option value='n1'>Neapolitan</option>
                        <option value='n3'>Nepal bhasa</option>
                        <option value='ne'>Nepali</option>
                        <option value='n5'>Nepali-romaji</option>
                        <option value='l3'>Northern luri</option>
                        <option value='no'>Norwegian</option>
                        <option value='nb'>Norwegian bokmål</option>
                        <option value='nn'>Norwegian nynorsk</option>
                        <option value='oc'>Occitan</option>
                        <option value='oj'>Ojibwa</option>
                        <option value='or'>Oriya</option>
                        <option value='o1'>Oriya-romaji</option>
                        <option value='om'>Oromo</option>
                        <option value='os'>Ossetian</option>
                        <option value='pi'>Pali</option>
                        <option value='p1'>Pampanga</option>
                        <option value='pa'>Panjabi</option>
                        <option value='p5'>Panjabi-romaji</option>
                        <option value='fa'>Persian</option>
                        <option value='p2'>Pfaelzisch</option>
                        <option value='p3'>Piemontese</option>
                        <option value='pl'>Polish</option>
                        <option value='pt'>Portuguese</option>
                        <option value='ps'>Pushto</option>
                        <option value='qu'>Quechua</option>
                        <option value='ro'>Romanian</option>
                        <option value='rm'>Romansh</option>
                        <option value='rn'>Rundi</option>
                        <option value='b4'>Russia buriat</option>
                        <option value='ru'>Russian</option>
                        <option value='r2'>Russian-romaji</option>
                        <option value='r1'>Rusyn</option>
                        <option value='se'>Sami, northern</option>
                        <option value='sm'>Samoan</option>
                        <option value='sg'>Sango</option>
                        <option value='sa'>Sanskrit</option>
                        <option value='s4'>Sanskrit-romaji</option>
                        <option value='sc'>Sardinian</option>
                        <option value='s3'>Scots</option>
                        <option value='gd'>Scottish gaelic</option>
                        <option value='sr'>Serbian</option>
                        <option value='sh'>Serbo-croatian</option>
                        <option value='sn'>Shona</option>
                        <option value='ii'>Sichuan yi</option>
                        <option value='s2'>Sicilian</option>
                        <option value='sd'>Sindhi</option>
                        <option value='si'>Sinhala</option>
                        <option value='sk'>Slovak</option>
                        <option value='sl'>Slovenian</option>
                        <option value='so'>Somali</option>
                        <option value='d2'>Sorbian, lower</option>
                        <option value='h2'>Sorbian, upper</option>
                        <option value='st'>Sotho, southern</option>
                        <option value='a4'>South azerbaijani</option>
                        <option value='es'>Spanish</option>
                        <option value='su'>Sundanese</option>
                        <option value='sw'>Swahili</option>
                        <option value='ss'>Swati</option>
                        <option value='sv'>Swedish</option>
                        <option value='tl'>Tagalog</option>
                        <option value='ty'>Tahitian</option>
                        <option value='tg'>Tajik</option>
                        <option value='ta'>Tamil</option>
                        <option value='t2'>Tamil-romaji</option>
                        <option value='tt'>Tatar</option>
                        <option value='te'>Telugu</option>
                        <option value='t3'>Telugu-romaji</option>
                        <option value='th'>Thai</option>
                        <option value='t4'>Thai-romaji</option>
                        <option value='bo'>Tibetan</option>
                        <option value='ti'>Tigrinya</option>
                        <option value='to'>Tonga (tonga islands)</option>
                        <option value='a1'>Tosk albanian</option>
                        <option value='ts'>Tsonga</option>
                        <option value='tn'>Tswana</option>
                        <option value='tr'>Turkish</option>
                        <option value='tk'>Turkmen</option>
                        <option value='t1'>Tuvinian</option>
                        <option value='tw'>Twi</option>
                        <option value='ug'>Uighur</option>
                        <option value='uk'>Ukrainian</option>
                        <option value='ur'>Urdu</option>
                        <option value='u1'>Urdu-romaji</option>
                        <option value='uz'>Uzbek</option>
                        <option value='ve'>Venda</option>
                        <option value='v1'>Venetian</option>
                        <option value='v2'>Veps</option>
                        <option value='vi'>Vietnamese</option>
                        <option value='v3'>Vlaams</option>
                        <option value='vo'>Volapük</option>
                        <option value='wa'>Walloon</option>
                        <option value='w1'>Waray</option>
                        <option value='cy'>Welsh</option>
                        <option value='m4'>Western mari</option>
                        <option value='p4'>Western panjabi</option>
                        <option value='wo'>Wolof</option>
                        <option value='w2'>Wu chinese</option>
                        <option value='xh'>Xhosa</option>
                        <option value='s1'>Yakut</option>
                        <option value='yi'>Yiddish</option>
                        <option value='yo'>Yoruba</option>
                        <option value='y1'>Yue chinese</option>
                        <option value='za'>Zhuang</option>
                        <option value='zu'>Zulu</option>
                    </select>
                    </label>
                    <span class="app-prefs-help typography-title-3-tall">(Only when Musixmatch Lyrics is enabled) Select the targeted language for translated lyrics</span>
                    </li>
                    <li class="app-prefs-toggle">
                    <li class="app-prefs-divider header-nav">
                        <h2 class="shelf-title">Miscellaneous Options</h2>
                        <span class="app-prefs-help typography-title-3-tall">Various options allowing you to adjust the user interface to your preference.</span>
                    </li>
                    <li class="app-prefs-toggle">
                        <span class="typography-title-3-tall">Streaming Mode</span>
                        <label class="toggle-element list-element">
                            <input id="streamerMode" type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">Removes certain UI elements and has unique scaling properties.</span>
                    </li>
                    <li class="app-prefs-toggle">
                        <span class="typography-title-3-tall">Remove Upsell</span>
                        <label class="toggle-element list-element">
                            <input id="removeUpsell" type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">Removes the Open in iTunes and Exit Beta Buttons.</span>
                    </li>
                    <li class="app-prefs-toggle">
                        <span class="typography-title-3-tall">Remove Apple Music Logo</span>
                        <label class="toggle-element list-element">
                            <input id="removeAppleLogo" type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">Removes the Apple Music Logo and moves search bar up.</span>
                    </li>
                    <li class="app-prefs-toggle">
                        <span class="typography-title-3-tall">Remove Footer</span>
                        <label class="toggle-element list-element">
                            <input id="removeFooter" type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">Removes the Apple Music footer.</span>
                    </li>
                    <li class="app-prefs-toggle">
                        <span class="typography-title-3-tall">Use OS Accent as Application Accent</span>
                        <label class="toggle-element list-element">
                            <input id="useOperatingSystemAccent" type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">Force the application to use your operating systems' accent.</span>
                    </li>               
                </ul>
            </div>
            <div class="app-prefs-section audio">
                <div class="app-prefs-title header-nav" style="height: 10px;">
                    <div class="header-nav-content">
                        <h1 class="typography-header-emphasized">Audio Settings</h1>
                    </div>
                </div>
                <ul class="settings-list audio">
                    <li class="app-prefs-dropdown">
                        <span class="typography-title-3-tall">Audio Quality</span>
                        <select class="form-dropdown-select list-element" name="audioQuality" id="audioQuality">
                            <option disabled>Select one</option>
                            <option value='auto'>Automatic (Default)</option>
                            <option value='extreme'>Extreme (990kbps)</option>
                            <option value='high'>High (256kbps)</option>
                            <option value='standard'>Standard (64kbps)</option>
                        </select>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">Allows the user to select a preferred audio bitrate for music playback. NOTE: This may not work on all songs. Extreme mode can have the side effects of high CPU Usage.</span>
                    </li>
                    <li class="app-prefs-toggle">
                        <span class="typography-title-3-tall">Gapless Playback</span>
                        <label class="toggle-element list-element">
                            <input id="gaplessEnabled" type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">Reduces or completely removes the delay between songs providing a smooth audio experience.</span>
                    </li>
                </ul>
            </div>
            <div class="app-prefs-section window">
                <div class="app-prefs-title header-nav" style="height: 10px;">
                    <div class="header-nav-content">
                        <h1 class="typography-header-emphasized">Startup and Window Behavior</h1>
                    </div>
                </div>
                <ul class="settings-list window">
                    <li class="app-prefs-dropdown">
                        <span class="typography-title-3-tall">Open Apple Music automatically after login</span>
                        <select class="form-dropdown-select list-element" name="appStartupBehavior" id="appStartupBehavior">
                            <option disabled>Select one</option>
                            <option value=''>Disabled</option>
                            <option value='true'>Enabled</option>
                            <option value='hidden'>Enabled (Application is Hidden)</option>
                            <option value='minimized'>Enabled (Application is Minimized)</option>
                        </select>
                        </label>
                    </li>
                    <li class="app-prefs-toggle">
                        <span class="typography-title-3-tall">Close button should minimize Apple Music</span>
                        <label class="toggle-element list-element">
                            <input id="closeButtonMinimize" type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                    </li>
                </ul>
            </div>
            <div class="app-prefs-section advanced">
                <div class="app-prefs-title header-nav" style="height: 10px;" onclick="revealCollapse()">
                    <div class="header-nav-content">
                        <h1 class="typography-header-emphasized">Advanced Settings</h1>
                         <span class="app-prefs-help typography-title-3-tall">Only changes these settings if you know what you are doing.</span>
                    </div>
                    <img class="header-nav-image" src="ameres://icons/webui/down.svg" alt="Open Category">
                </div>
                <ul class="settings-list advanced" id="advanced">
                    <li class="app-prefs-dropdown">
                        <span class="typography-title-3-tall">Force Storefront (App Region)</span>
                        <select class="form-dropdown-select list-element" name="forceApplicationRegion" id="forceApplicationRegion">
                            <option disabled>Select one</option>
                            <option value=''>Default</option>
                            <option value='ae'>United Arab Emirates</option>
                            <option value='ag'>Antigua and Barbuda</option>
                            <option value='ai'>Anguilla</option>
                            <option value='al'>Albania</option>
                            <option value='am'>Armenia</option>
                            <option value='ao'>Angola</option>
                            <option value='ar'>Argentina</option>
                            <option value='at'>Austria</option>
                            <option value='au'>Australia</option>
                            <option value='az'>Azerbaijan</option>
                            <option value='bb'>Barbados</option>
                            <option value='be'>Belgium</option>
                            <option value='bf'>Burkina-Faso</option>
                            <option value='bg'>Bulgaria</option>
                            <option value='bh'>Bahrain</option>
                            <option value='bj'>Benin</option>
                            <option value='bm'>Bermuda</option>
                            <option value='bn'>Brunei Darussalam</option>
                            <option value='bo'>Bolivia</option>
                            <option value='br'>Brazil</option>
                            <option value='bs'>Bahamas</option>
                            <option value='bt'>Bhutan</option>
                            <option value='bw'>Botswana</option>
                            <option value='by'>Belarus</option>
                            <option value='bz'>Belize</option>
                            <option value='ca'>Canada</option>
                            <option value='cg'>Democratic Republic of the Congo</option>
                            <option value='ch'>Switzerland</option>
                            <option value='cl'>Chile</option>
                            <option value='cn'>China</option>
                            <option value='co'>Colombia</option>
                            <option value='cr'>Costa Rica</option>
                            <option value='cv'>Cape Verde</option>
                            <option value='cy'>Cyprus</option>
                            <option value='cz'>Czech Republic</option>
                            <option value='de'>Germany</option>
                            <option value='dk'>Denmark</option>
                            <option value='dm'>Dominica</option>
                            <option value='do'>Dominican Republic</option>
                            <option value='dz'>Algeria</option>
                            <option value='ec'>Ecuador</option>
                            <option value='ee'>Estonia</option>
                            <option value='eg'>Egypt</option>
                            <option value='es'>Spain</option>
                            <option value='fi'>Finland</option>
                            <option value='fj'>Fiji</option>
                            <option value='fm'>Federated States of Micronesia</option>
                            <option value='fr'>France</option>
                            <option value='gb'>Great Britain</option>
                            <option value='gd'>Grenada</option>
                            <option value='gh'>Ghana</option>
                            <option value='gm'>Gambia</option>
                            <option value='gr'>Greece</option>
                            <option value='gt'>Guatemala</option>
                            <option value='gw'>Guinea Bissau</option>
                            <option value='gy'>Guyana</option>
                            <option value='hk'>Hong Kong</option>
                            <option value='hn'>Honduras</option>
                            <option value='hr'>Croatia</option>
                            <option value='hu'>Hungaria</option>
                            <option value='id'>Indonesia</option>
                            <option value='ie'>Ireland</option>
                            <option value='il'>Israel</option>
                            <option value='in'>India</option>
                            <option value='is'>Iceland</option>
                            <option value='it'>Italy</option>
                            <option value='jm'>Jamaica</option>
                            <option value='jo'>Jordan</option>
                            <option value='jp'>Japan</option>
                            <option value='ke'>Kenya</option>
                            <option value='kg'>Krygyzstan</option>
                            <option value='kh'>Cambodia</option>
                            <option value='kn'>Saint Kitts and Nevis</option>
                            <option value='kr'>South Korea</option>
                            <option value='kw'>Kuwait</option>
                            <option value='ky'>Cayman Islands</option>
                            <option value='kz'>Kazakhstan</option>
                            <option value='la'>Laos</option>
                            <option value='lb'>Lebanon</option>
                            <option value='lc'>Saint Lucia</option>
                            <option value='lk'>Sri Lanka</option>
                            <option value='lr'>Liberia</option>
                            <option value='lt'>Lithuania</option>
                            <option value='lu'>Luxembourg</option>
                            <option value='lv'>Latvia</option>
                            <option value='md'>Moldova</option>
                            <option value='mg'>Madagascar</option>
                            <option value='mk'>Macedonia</option>
                            <option value='ml'>Mali</option>
                            <option value='mn'>Mongolia</option>
                            <option value='mo'>Macau</option>
                            <option value='mr'>Mauritania</option>
                            <option value='ms'>Montserrat</option>
                            <option value='mt'>Malta</option>
                            <option value='mu'>Mauritius</option>
                            <option value='mw'>Malawi</option>
                            <option value='mx'>Mexico</option>
                            <option value='my'>Malaysia</option>
                            <option value='mz'>Mozambique</option>
                            <option value='na'>Namibia</option>
                            <option value='ne'>Niger</option>
                            <option value='ng'>Nigeria</option>
                            <option value='ni'>Nicaragua</option>
                            <option value='nl'>Netherlands</option>
                            <option value='np'>Nepal</option>
                            <option value='no'>Norway</option>
                            <option value='nz'>New Zealand</option>
                            <option value='om'>Oman</option>
                            <option value='pa'>Panama</option>
                            <option value='pe'>Peru</option>
                            <option value='pg'>Papua New Guinea</option>
                            <option value='ph'>Philippines</option>
                            <option value='pk'>Pakistan</option>
                            <option value='pl'>Poland</option>
                            <option value='pt'>Portugal</option>
                            <option value='pw'>Palau</option>
                            <option value='py'>Paraguay</option>
                            <option value='qa'>Qatar</option>
                            <option value='ro'>Romania</option>
                            <option value='ru'>Russia</option>
                            <option value='sa'>Saudi Arabia</option>
                            <option value='sb'>Soloman Islands</option>
                            <option value='sc'>Seychelles</option>
                            <option value='se'>Sweden</option>
                            <option value='sg'>Singapore</option>
                            <option value='si'>Slovenia</option>
                            <option value='sk'>Slovakia</option>
                            <option value='sl'>Sierra Leone</option>
                            <option value='sn'>Senegal</option>
                            <option value='sr'>Suriname</option>
                            <option value='st'>Sao Tome e Principe</option>
                            <option value='sv'>El Salvador</option>
                            <option value='sz'>Swaziland</option>
                            <option value='tc'>Turks and Caicos Islands</option>
                            <option value='td'>Chad</option>
                            <option value='th'>Thailand</option>
                            <option value='tj'>Tajikistan</option>
                            <option value='tm'>Turkmenistan</option>
                            <option value='tn'>Tunisia</option>
                            <option value='tr'>Turkey</option>
                            <option value='tt'>Republic of Trinidad and Tobago</option>
                            <option value='tw'>Taiwan</option>
                            <option value='tz'>Tanzania</option>
                            <option value='ua'>Ukraine</option>
                            <option value='ug'>Uganda</option>
                            <option value='us'>United States of America</option>
                            <option value='uy'>Uruguay</option>
                            <option value='uz'>Uzbekistan</option>
                            <option value='vc'>Saint Vincent and the Grenadines</option>
                            <option value='ve'>Venezuela</option>
                            <option value='vg'>British Virgin Islands</option>
                            <option value='vn'>Vietnam</option>
                            <option value='ye'>Yemen</option>
                            <option value='za'>South Africa</option>
                            <option value='zw'>Zimbabwe</option>
                        </select>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">This will make the application use a different storefront (I.e. music.apple.com/us). This can cause issues with the user interface, and the Apple Music website will attempt to switch you back to your native storefront, which is usually the same as your Language. Set to default if you wish to reset the region.</span>
                    </li>
                    <li class="app-prefs-toggle">
                        <span class="typography-title-3-tall">Verbose Logging</span>
                        <label class="toggle-element list-element">
                            <input id="verboseLogging" type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">When enabled more logs will be posted, used for debugging.</span>
                    </li>
                    <li class="app-prefs-toggle">
                        <span class="typography-title-3-tall">Always on Top</span>
                        <label class="toggle-element list-element">
                            <input id="alwaysOnTop" type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">This will make the application persist above all other windows. Best used for mini player usage.</span>
                    </li>
                    <li class="app-prefs-toggle">
                        <span class="typography-title-3-tall">Auto Update Beta Builds</span>
                        <label class="toggle-element list-element">
                            <input id="autoUpdaterBetaBuilds" type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">This will make the autoUpdater perform updates when a new pre-release is made on GitHub.</span>
                    </li>
                    <li class="app-prefs-toggle">
                        <span class="typography-title-3-tall">Use Apple Music Beta Site</span>
                        <label class="toggle-element list-element">
                            <input id="useBetaSite" type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">Enabling this makes the application load 'beta.music.apple.com' instead of 'music.apple.com'. Disabling this will provide a limited experience on the app.</span>
                    </li>
                    <li class="app-prefs-toggle">
                        <span class="typography-title-3-tall">Prevent Media Key Hijacking</span>
                        <label class="toggle-element list-element">
                            <input id="preventMediaKeyHijacking" type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">This prevents the Chromium window from hijacking your media key. If you experience issues with pausing or playing videos/media on other applications, enable this.</span>
                    </li>
                    <li class="app-prefs-divider header-nav">
                        <h2 class="shelf-title">Advanced Visual Settings</h2>
                        <span class="app-prefs-help typography-title-3-tall">These are advanced features that are disabled to make your experience better and may ruin the visual aesthetics of the UI.</span>
                    </li>
                    <li class="app-prefs-toggle">
                        <span class="typography-title-3-tall">Menu Bar Visible</span>
                        <label class="toggle-element list-element">
                            <input id="menuBarVisible" type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">This enables the small menubar at the top of the window.</span>
                    </li>
                    <li class="app-prefs-toggle">
                        <span class="typography-title-3-tall">Remove Scrollbars</span>
                        <label class="toggle-element list-element">
                            <input id="removeScrollbars" type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">Currently, the scrollbar is experimental and incomplete. It is recommended to leave this on.</span>
                    </li>
                    <li class="app-prefs-divider header-nav">
                        <h2 class="shelf-title">Advanced Development Settings</h2>
                        <span class="app-prefs-help typography-title-3-tall">These settings are for the use of application developers.</span>
                    </li>
                    <li class="app-prefs-toggle">
                        <span class="typography-title-3-tall">DevTools</span>
                        <label class="toggle-element list-element">
                            <input id="devTools" type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">Enabled Chromium DevTools. Read more about them <a href="#" onclick="window.open('https://developer.chrome.com/docs/devtools/')">here</a>.</span>
                    </li>
                    <li class="app-prefs-toggle">
                        <span class="typography-title-3-tall">DevTools (Open Detached on Launch)</span>
                        <label class="toggle-element list-element">
                            <input id="devToolsOpenDetached" type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">Shows the DevTools window in a detached state on launch.</span>
                    </li>
                    <li class="app-prefs-toggle">
                        <span class="typography-title-3-tall">Allow Multiple Instances</span>
                        <label class="toggle-element list-element">
                            <input id="allowMultipleInstances" type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">Allows multiple instance of the application to be opened.</span>
                    </li>
                    <li class="app-prefs-toggle">
                        <span class="typography-title-3-tall">Allow Old Menu Access</span>
                        <label class="toggle-element list-element">
                            <input id="allowOldMenuAccess" type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                        <span class="app-prefs-help typography-title-3-tall">Allows the old menu to opened using the 'CTRL/COMMAND + SHIFT + S' keybind.</span>
                    </li>
                </ul>
            </div>
        </div>
        `;

        let themesListingHTML = document.getElementById('theme').innerHTML;
        for (const [key, value] of Object.entries(preferences.availableThemes)) {
            themesListingHTML = themesListingHTML + `\n<option value="${key}">${value}</option>`;
        }
        document.getElementById('theme').innerHTML = themesListingHTML;

        /* Set the Footer */
        if (document.querySelector('footer')) {
            document.querySelector('.dt-footer').style.display = "block";
            document.querySelector('.dt-footer').classList.add('app-prefs-credits');
            document.querySelector('.dt-footer').innerHTML = `
            <button class="typography-title-3-tall" data-test-ls-footer-btn="" disabled="" type="button">Credits</button>
            <div class="dt-footer-contents-container">
                <div class="dt-footer__copyright dt-flex-container">
                    <p>Major thanks to the <a href="https://github.com/Apple-Music-Electron" class="dt-footer__link" target="_blank" rel="noopener" data-dt-link-to-exclude=""> Apple Music Electron Team</a> and to all of our <a href="https://github.com/Apple-Music-Electron/Apple-Music-Electron/graphs/contributors" class="dt-footer__link" target="_blank" rel="noopener" data-dt-link-to-exclude="">contributors</a>.</p>
        
                    <div class="dt-footer__locale"></div>
                </div>
        
                <ul class="dt-footer__list dt-flex-container">
                    <li class="dt-footer__item">
                    <a href="https://github.com/Apple-Music-Electron" class="dt-footer__link" target="_blank" rel="noopener" data-dt-link-to-exclude="">Development Team</a>
                    <ul>
                        <li class="dt-footer__list-item"><a href="#" onclick="window.open('https://github.com/cryptofyre')">cryptofyre</a></li>
                        <li class="dt-footer__list-item"><a href="#" onclick="window.open('https://github.com/coredev-uk')">Core</a></li>
                        <li class="dt-footer__list-item"><a href="#" onclick="window.open('https://github.com/child-duckling')">Quacksire</a></li>
                        <li class="dt-footer__list-item"><a href="#" onclick="window.open('https://github.com/booploops')">booploops</a></li>
                    </ul>
                    </li>
                    
                    
                    <li class="dt-footer__item" style="margin: 20px auto 0 auto;">
                    <p class="dt-footer__link">Social Communications Team</p>
                    <ul>
                        <li class="dt-footer__list-item"><a href="#" onclick="window.open('https://twitter.com/MoonyVoid')">Void</a></li>
                        <li class="dt-footer__list-item"><a href="#" onclick="window.open('https://twitter.com/noah_grose')">NoseySG</a></li>
                    </ul>
                    </li>
                </ul>
            </div>
            `;
        }

        if (preferences.supportsAcrylic) {
            document.getElementById('transparencyEffect').innerHTML = document.getElementById('transparencyEffect').innerHTML + "\n<option value='acrylic'>Acrylic (W10 1809+)</option>";
        } else {
            document.getElementById('transparencyDisableBlurToggleLI').remove();
        }

        function revealCollapse() {
            const elem = document.querySelector('#advanced');
            if (elem.classList.contains('revealed')) {
                /* Collapse Category */
                elem.classList.remove('revealed');
                document.querySelector('.header-nav-image').src = 'ameres://icons/webui/down.svg'
            } else {
                /* Reveal the Category */
                elem.classList.add('revealed');
                document.querySelector('.header-nav-image').src = 'ameres://icons/webui/up.svg'
            }
        }

        function LastFMDeauthorize() {
            preferences.general.lastfmAuthKey = 'Put your Auth Key here.';
            preferences.general.lastfmEnabled = [];
            ipcRenderer.sendSync('setPreferences', preferences);
            const element = document.getElementById('lfmConnect');
            element.innerHTML = 'Connect';
            element.onclick = LastFMAuthenticate;
        }
        function LastFMAuthenticate() {
            const element = document.getElementById('lfmConnect');
            window.open('https://www.last.fm/api/auth?api_key=174905d201451602407b428a86e8344d&cb=ame://auth/lastfm');
            element.innerText = 'Connecting...';

            /* Just a timeout for the button */
            setTimeout(() => {
                if (element.innerText === 'Connecting...') {
                    element.innerText = 'Connect';
                    console.warn('[LastFM] Attempted connection timed out.');
                }
            }, 20000);

            ipcRenderer.on('LastfmAuthenticated', function (_event, lfmAuthKey) {
                preferences.general.lastfmEnabled = [true];
                preferences.general.lastfmAuthKey = lfmAuthKey;
                element.innerHTML = `Disconnect\n<p style="font-size: 8px"><i>(Authed: ${lfmAuthKey})</i></p>`;
                element.onclick = LastFMDeauthorize;
                ipcRenderer.sendSync('setPreferences', preferences);
            });
        }
        function updateThemes() {
            ipcRenderer.send('updateThemes');
            document.getElementById('updateThemes').innerText = 'Updating...';
            ipcRenderer.on('themesUpdated', (_event, themesListing) => {
                document.getElementById('updateThemes').innerText = (themesListing ? 'Themes Updated' : 'Error');
                if (themesListing) {
                    let themesListingHTML = `<option disabled>Select one</option>\n<option value='default'>Default</option>`;
                    for (const [key, value] of Object.entries(themesListing)) {
                        themesListingHTML = themesListingHTML + `\n<option value="${key}">${value}</option>`;
                    }
                    document.getElementById('theme').innerHTML = themesListingHTML;
                    console.info('[updateThemes] Themes Listing Updated!');
                }
            });
        }
        function hasParentClass(child, classname) {
            if (child.className.split(' ').indexOf(classname) >= 0) return true;
            try {
                return child.parentNode && hasParentClass(child.parentNode, classname);
            } catch (TypeError) {
                return false;
            }
        }
        function HandleField(element) {
            const field = document.getElementById(element);
            if (!field) return 'Element Not Found';

            let fieldCategory, fieldCategoryTitle;
            if (hasParentClass(field, 'general')) {
                fieldCategory = preferences.general;
                fieldCategoryTitle = 'general';
            } else if (hasParentClass(field, 'visual')) {
                fieldCategory = preferences.visual;
                fieldCategoryTitle = 'visual';
            } else if (hasParentClass(field, 'audio')) {
                fieldCategory = preferences.audio;
                fieldCategoryTitle = 'audio';
            } else if (hasParentClass(field, 'window')) {
                fieldCategory = preferences.window;
                fieldCategoryTitle = 'window';
            } else if (hasParentClass(field, 'advanced')) {
                fieldCategory = preferences.advanced;
                fieldCategoryTitle = 'advanced';
            } else {
                console.error('[HandleField] No Parent Category Found.');
                return 'No Parent Category Found';
            }

            if (hasParentClass(field, 'toggle-element')) {
                /* Toggles */
                field.checked = fieldCategory[element].includes(true);
                field.addEventListener('change', (event) => {
                    fieldCategory[element] = (event.target.checked ? [true] : []);
                    ipcRenderer.sendSync('setPreferences', preferences);
                });
                console.warn(`[HandleField] Event listener created for ${fieldCategoryTitle}.${element}`)
            } else if (field.classList.contains('form-dropdown-select')) {
                /* Dropdowns */
                field.value = fieldCategory[element];
                field.addEventListener('change', (event) => {
                    fieldCategory[element] = event.target.value;
                    ipcRenderer.sendSync('setPreferences', preferences);
                });
                console.warn(`[HandleField] Event listener created for ${fieldCategoryTitle}.${element}`)
            } else if (field.id === "lfmConnect") {
                if (preferences.general.lastfmAuthKey !== 'Put your Auth Key here.' && preferences.general.lastfmAuthKey) {
                    field.innerHTML = `Disconnect\n<p style="font-size: 8px"><i>(Authed: ${preferences.general.lastfmAuthKey})</i></p>`;
                    field.onclick = LastFMDeauthorize;
                }
            }
        }

        /* General Settings */
        HandleField('language');
        HandleField('incognitoMode');
        HandleField('playbackNotifications');
        HandleField('trayTooltipSongName');
        HandleField('startupPage');
        HandleField('analyticsEnabled');
        HandleField('discordRPC');
        HandleField('discordClearActivityOnPause');
        HandleField('lfmConnect');
        HandleField('lastfmRemoveFeaturingArtists');

        /* Visual Settings */
        HandleField('theme');
        HandleField('frameType');
        HandleField('transparencyEffect');
        HandleField('transparencyTheme');
        HandleField('transparencyDisableBlur');
        HandleField('transparencyMaximumRefreshRate');
        HandleField('streamerMode');
        HandleField('removeUpsell');
        HandleField('removeAppleLogo');
        HandleField('removeFooter');
        HandleField('useOperatingSystemAccent');
        HandleField('mxmon');
        HandleField('mxmlanguage');

        /* Audio Settings */
        HandleField('audioQuality');
        HandleField('gaplessEnabled');

        /* Window Settings */
        HandleField('appStartupBehavior');
        HandleField('closeButtonMinimize');

        /* Advanced Settings */
        HandleField('forceApplicationRegion');
        HandleField('verboseLogging');
        HandleField('alwaysOnTop');
        HandleField('autoUpdaterBetaBuilds');
        HandleField('useBetaSite');
        HandleField('preventMediaKeyHijacking');
        HandleField('menuBarVisible');
        HandleField('removeScrollbars');
        HandleField('devTools');
        HandleField('devToolsOpenDetached');
        HandleField('allowMultipleInstances');
        HandleField('allowOldMenuAccess');

    } else {
        document.getElementsByClassName('dt-footer')[0].innerHTML = storedInnerHTML; /* Revert the footer */
    }

} catch (e) {
    console.error("[JS] Error while trying to apply settingsPage.js", e);
}