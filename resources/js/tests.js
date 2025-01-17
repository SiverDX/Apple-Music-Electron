var _tests = {
    zoo () {
        AMJavaScript.getRequest("ameres://html/zoo.html", (content)=>{
            var modal = new AMEModal({
                content: content
            })
        })
    },
    usermenu() {

    },
    stats() {
        var container = document.createElement("div")
        var frameRate = document.createElement("div")
        var listeners = document.createElement("div")
        Object.assign(container.style,
            {
                textAlign: "center",
                position: "absolute",
                fontSize: "18px",
                bottom: "16px",
                right: "16px",
                pointerEvents: "none",
                zIndex: 99991,
                color: "white",
                webkitTextStroke: "0.2px black"
            })
        document.body.appendChild(container)
        container.appendChild(frameRate)
        container.appendChild(listeners)

        const times = [];
        let fps;

        function refreshLoop() {
            window.requestAnimationFrame(() => {
                const now = performance.now();
                while (times.length > 0 && times[0] <= now - 1000) {
                    times.shift();
                }
                times.push(now);
                fps = times.length;
                frameRate.innerText = `${fps} FPS`
                refreshLoop();
            });
        }

        refreshLoop();
    },
    oobe(skipIntro = false, closeBtn = false) {
        AMJavaScript.getRequest("ameres://html/oobe.html", (content) => {
            var vm = new Vue({
                data: {
                    prefs: {
                        audioQuality: "auto",
                        language: "us",
                        region: "",
                        mxm: false,
                        mxmlanguage: "en",
                        theme: preferences.visual.theme
                    },
                    page: "intro",
                },
                methods: {
                    btn() {
                        console.info("Button clicked")
                    },
                    setPrefs() {

                    },
                    close() {
                        modal.close()
                    },
                    init() {
                        let self = this
                        document.getElementById('introVideo').addEventListener('ended', () => {
                            self.page = "welcome"
                        }, false);
                    },
                    enableBlur() {
                        modal.setStyle("backdrop", {
                            backdropFilter: "blur(16px) saturate(180%)"
                        })
                    },
                    disableBlur() {
                        modal.setStyle("backdrop", {
                            backdropFilter: "blur(0px)"
                        })
                    }
                }
            })
            var modal = new AMEModal({
                content: content,
                CloseButton: closeBtn,
                Dismissible: closeBtn,
                OnCreate() {
                    vm.$mount("#oobe-vue")
                    if (skipIntro) {
                        vm.page = "welcome"
                    } else {
                        vm.init()
                    }
                },
                OnClose() {
                    _vues.destroy(vm)
                }
            })
        })
    }
}