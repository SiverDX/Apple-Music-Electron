const {app} = require('electron')
const {GetLocale} = require('../GetLocale')

exports.LoadWebsite = function () {
    console.log('[LoadWebsite] Started.')

    const locale = GetLocale()
    const urlExtension = `${locale[0]}?l=${locale[1]}`
    const url = (app.config.advanced.useBeta.includes(true)) ? `https://beta.music.apple.com/${urlExtension}` : `https://music.apple.com/${urlExtension}`;
    const fallback = `https://music.apple.com/${urlExtension}`

    console.log(`[LoadWebsite] The chosen website is ${url}`)
    app.win.loadURL(url).catch(() => {
        app.win.loadURL(fallback).then(() => console.log(`[LoadWebsite] ${url} was unavailable, falling back to ${fallback}`))
    })


}