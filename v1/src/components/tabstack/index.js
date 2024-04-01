!function () {
    //setInterval(function () {
     document.addEventListener("evn-run",function() {
        var back_tabs = $qsall(`[nav-tb="head"]`);
        back_tabs.forEach(function (t) {
            if (t.getAttribute("set-nav-tb") == null) {
                t.setAttribute("set-nav-tb", "t")
                t.className += " flex center-tb gap-l-f";
                var label = t.innerHTML;
                t.innerHTML = ` <button class="button" align="icon" align-l="y"> 
                         <div class="icon" style="--fill:var(--color)">
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13 5.9296875L6.9296875 12L13 18.070312L14.5 16.570312L9.9296875 12L14.5 7.4296875L13 5.9296875 z"/></svg>
    </div>
</button>
<div class="f-auto">${label}</div>
                           `
                t.querySelector(".button").addEventListener("click", function () {
                    var tg = this.parentElement.parentElement;
                    if (tg) {
                        tg.removeAttribute("tab-active");

                        var tab = $qs(`[tab-t="${tg.getAttribute('nav-tb-t')}"]`);
                        if (tab) {
                            tab.removeAttribute("tab-active");
                        }

                    }

                })

            }
        });
        var s_cnt = $qsall(`[nav-tb="cnt"]`);
        s_cnt.forEach(function (c) {
            if (c.getAttribute("set-nav-tb-c") == null) {
                c.setAttribute("set-nav-tb-c", "t");
                c.className += " d-scroll"
            }
        })

        var child_i = $qsall('.tabstack-gp .tab');
        child_i.forEach(function (r) {
            if (r.getAttribute("set-setting-i-r") == null) {
                r.setAttribute("set-setting-i-r", "t")
                r.innerHTML += ` <div class="icon pl-right" nav-tb="child-s" style="fill:var(--color)">
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M10 5.9296875L8.5 7.4296875L13.070312 12L8.5 16.570312L10 18.070312L16.070312 12L10 5.9296875 z"/>
</svg> 
                      </div>`
            }
        })
    });

    window.addEventListener("resize", function () {
        if ($qsall("[tab-t][tab-active]").length == 0) {
            var def = $qs("[tab-d]");
            if (def && $sizeDekstop() && $getDeviceType() == "Desktop") {
                if (typeof def.click == "function") {
                    def.click();
                }
            }
        }
    })
}();
