!function () {
    var promote = {
        success: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11,16.4l-4.7-4.7l1.4-1.4l3.3,3.3l8.4-8.4C17.5,3.3,14.9,2,12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10 c0-1.9-0.5-3.6-1.4-5.1L11,16.4z"/>
</svg>`,
        primary: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 3L18 5L11 8L11 16L18 19L19 21L21 21L21 13.728516 A 2 2 0 0 0 22 12 A 2 2 0 0 0 21 10.269531L21 3L19 3 z M 5 8C3.9 8 3 8.9 3 10L3 14C3 15.1 3.9 16 5 16L7 16L7 21L9 21L9 14L9 8L5 8 z"/></svg> 
` ,
        error: ` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
<path d="M22.239,18.451L13.442,3.816C13.135,3.305,12.596,3,12,3s-1.135,0.305-1.441,0.815L1.761,18.451 c-0.312,0.519-0.32,1.168-0.022,1.695C2.036,20.673,2.597,21,3.203,21h17.595c0.605,0,1.167-0.327,1.464-0.854 C22.56,19.619,22.551,18.97,22.239,18.451z M13,18h-2v-2h2V18z M13,14h-2V9h2V14z"/></svg>
`,
        warning: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M12,1L3,5c0,0,0,4,0,6c0,7.83,6.439,11.486,9,12c2.561-0.514,9-4.17,9-12c0-2,0-6,0-6L12,1z M13,18h-2v-2h2V18z M13,14h-2V6 h2V14z"/>
</svg>`

    }

    var promote_key = ["success", "error", "primary", "warning"];
    var placement_key = ["top", "bottom"]

    var alertSet = () => {
        var pop_contner = $qs("[alert-pop]");
        if (pop_contner == null) {
            var push = document.body || $qs("html");
            var np = document.createElement("div");
            np.setAttribute("alert-pop", "t");
            np.className = "pf p-cnt-r p-cnt-l  flex flex-col gap-l-f center  center-tb";
            push.append(np);

        }
    }

    var ondisplayed = new CustomEvent('display');
    var onclose = new CustomEvent('close');

    var closealert = function (byBtn) {

        if (byBtn == undefined) {

            this.addEventListener("animationend", function () {
                if (this.getAttribute("displayd")) {
                    this.dispatchEvent(onclose);
                    this.remove();
                    var c = $qs("[alert-pop]");
                    if (c.querySelector(".alert") == null) { /*no alert this time or more displayd*/
                        c.removeAttribute("open")
                    }
                }
            });
        }
        else {

            this.remove()
            var c = $qs("[alert-pop]");
            if (c.querySelector(".alert") == null) { /*no alert this time or more displayd*/
                c.removeAttribute("open")
            }
        }
    }
    var openalert = function (options) {
        this.setAttribute('open', "t");
        this.addEventListener("animationend", function () {
            if (this.getAttribute("displayd") == null) {
                if (this.getAttribute("auto-sleep") == null) {
                    if (this.getAttribute("delay")) { /*after close*/
                        this.style.cssText = `animation-delay:${this.getAttribute("delay")}`
                    }
                    this.dispatchEvent(ondisplayed);
                    this.setAttribute("displayd", "t");

                    closealert.call(this);
                }

            }
        });
    }

    function Falert(message, prompt, options) {
        alertSet();
        var container = $qs("[alert-pop]");
        var a = document.createElement("div");
        a.className = "alert padding-card-x-e b-radius h10  flex-l-c-r  gap-l-f center  center-tb"
        a.innerHTML = `
      <div class="icon"></div>
      <div class="center"></div>
      <button alert-c="n" class="right button" align="icon" align-l="y"> 
                    <div class="icon" style="fill:var(--color-surface);">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M12 2C6.4889971 2 2 6.4889971 2 12C2 17.511003 6.4889971 22 12 22C17.511003 22 22 17.511003 22 12C22 6.4889971 17.511003 2 12 2 z M 12 4C16.430123 4 20 7.5698774 20 12C20 16.430123 16.430123 20 12 20C7.5698774 20 4 16.430123 4 12C4 7.5698774 7.5698774 4 12 4 z M 8.7070312 7.2929688L7.2929688 8.7070312L10.585938 12L7.2929688 15.292969L8.7070312 16.707031L12 13.414062L15.292969 16.707031L16.707031 15.292969L13.414062 12L16.707031 8.7070312L15.292969 7.2929688L12 10.585938L8.7070312 7.2929688 z"/>
</svg></div></button>
      `
        var type = promote[prompt] || promote["primary"];
        var k = promote_key.includes(prompt) == true ? prompt : "primary";
        var m = message || ""

        a.setAttribute("promote", k);
        a.querySelector(".icon").innerHTML = type;
        var mc = a.querySelector(".center");
        $parserHTML(new String(m), mc, "innerHTML");

        //container.removeAttribute("placement");

        /*options*/
        if (typeof options == "object") {
            if (options.sleep == false) {
                a.setAttribute("auto-sleep", "true"); /*not close auto close by button*/
            }
            if (options.display) {
                a.setAttribute("delay", options.display);
            }
            var placement = options.placement;
            if (placement && placement_key.includes(placement)) {
                container.setAttribute("placement", placement);
            }
        }

        if (container) {
            container.setAttribute("open", "t");
            container.append(a);
            openalert.call(a);


            /*close by buton*/
            a.querySelector("[alert-c]").addEventListener("click", function () {
                closealert.call(this.parentElement, true)
            });


            return a
        }


    }
    Object.defineProperties(window, {
        $alert: {
            value: function (message, prompt, options) {
                return Falert(message, prompt, options);
            }
        }

    });

}();
