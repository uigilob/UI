!function () {
    var onchange = new CustomEvent('change');
    function event_(current) {
        this.setAttribute("get-page", current)

        var cnt_load = this.getAttribute("cnt-load-get") || this.getAttribute("cnt-load-post");
        if (cnt_load) {
            var scopp = { "page": current }
            $htp.call(this, scopp);
        }
        try {

            this.dispatchEvent(onchange)
        } catch (er) {
            null
        }

    }
    function genrate(current, tabs, total, e) {
        event_.call(e, current, total)
        notfixd = undefined

        if (!total) {
            notfixd = true
            total = current + tabs;

            var max = e.getAttribute("pn-mx-total") || undefined;
            if (max && total > max) {
                total = max
            }
            // e.setAttribute("total",current+tabs)
        }
        var start = 2;
        var end = tabs;
        var part = Math.floor(tabs / 2)
        start = (current - 1)
        end = (current + tabs - 2);
        /* if(end >= total){
               end = total-1
               start -=tabs-1
              
               
         }
         if(start < 2){  
             start = 2
             end += 2
      } */

        var distance = (end / total > 0.50)

        var ato = e.querySelector(".pag-n-b");
        var ap = e.getAttribute("pn-pattern-a") || false;

        ato.innerHTML = ""
        if (ap) {
            $parserHTML(`<a href="${ap}=1" class="n-page button ${current == 1 ? "current-p" : ""}" value="1">1</a>`, ato);
        } else {
            $parserHTML(`<div class="n-page button ${current == 1 ? "current-p" : ""}" value="1">1</div>`, ato);
        }


        if (distance && (tabs + tabs) < total) {
            $parserHTML(`<div class="n-page button" disabled='t'>...</div>`, ato);
        }

        for (let i = start; end >= i; i++) {

            if (i != 0 && i != 1 && (i < total && i > 0)) {
                //document.console = i
                var active = i == current ? "current-p" : ""
                if (ap) {

                    $parserHTML(`<a  href="${ap}=${i}" class="n-page button ${active}" value="${i}">${i}</a>`, ato);
                } else {
                    $parserHTML(`<div class="n-page button ${active}" value="${i}">${i}</div>`, ato);
                }

            }




        }

        if (total > 1) {
            if (!distance && (tabs + tabs) < total) {
                $parserHTML(`<div class="n-page button" disabled='t'>...</div>`, ato);
            }

            if (ap) {
                $parserHTML(`<a  href="${ap}=${total}" class="n-page button ${current == total ? "current-p" : ""}" value="${total}">${total}</a>`, ato);
            } else {
                $parserHTML(`<div class="n-page button ${current == total ? "current-p" : ""}" value="${total}">${total}</div>`, ato);
            }

        }

        if (notfixd) {
            total = undefined
        }
        ato.querySelectorAll(".button").forEach(function (btn) {
            btn.addEventListener("click", function () {
                if (this.getAttribute("disabled") == null) {
                    var key = this.getAttribute('value');
                    e.setAttribute("pn-current", key);
                    if (ap && e.getAttribute("pn-a-s-page") == "true") {
                        genrate(new Number(key).valueOf(), tabs, total, e)
                    } else if (!ap) {
                        genrate(new Number(key).valueOf(), tabs, total, e)
                    }
                }


            });
        })


        /*next prev*/
        var prev = e.querySelector(".button.p-pre");
        var next = e.querySelector(".button.p-next");
        current == 1 ? prev.setAttribute("disabled", "t") : prev.removeAttribute("disabled");
        current == total ? next.setAttribute("disabled", "t") : next.removeAttribute("disabled");


        prev.onclick = function () {
            if (this.getAttribute("disabled") == null) {
                genrate(current - 1, tabs, total, e)
            }

        }
        next.onclick = function () {
            //document.console = total
            if (this.getAttribute("disabled") == null) {
                genrate(current + 1, tabs, total, e)
            }

        }

        var jump = e.querySelector(".pag-n-go .button");
        var jin = e.querySelector(".pag-n-go input");

        e.classList.remove("error");
        jump.setAttribute("disabled", "t");
        jin.value = null;

        jump.onclick = function () {
            if (this.getAttribute("disabled") == null) {
                genrate(new Number(jin.value).valueOf(), tabs, total, e)
            }

        }

        jin.oninput = function (event) {

            var v = new Number(this.value).valueOf();
            if (v && v != current && v <= total) {
                e.classList.remove("error");
                jump.removeAttribute("disabled");




            } else {
                jump.setAttribute("disabled", "r")
                e.classList.add("error");
            }


        }

        jin.onkeydown = function (event) {
            if (event.key === 'Enter' || event.keyCode === 13) {
                jump.click()
            }
        }
    }
    //setInterval(function () {
     document.addEventListener("evn-run",function() {
        var pn = $qsall(".pagination");
        pn.forEach(function (e) {
            if (e.getAttribute("pag-n-s") == null) {

                e.setAttribute("pag-n-s", "t");
                e.className += " flex  center center-tb f-wrap g-gap";
                var jumbtn = e.getAttribute("pn-j-label") || "Jump"
                e.innerHTML = `
             <div class="flex-l-c-r  center center-tb pag-n-a  g-gap  over-h">
             <button class="button p-pre " align="icon">
                <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
     <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2 z M 12 4C16.418 4 20 7.582 20 12C20 16.418 16.418 20 12 20C7.582 20 4 16.418 4 12C4 7.582 7.582 4 12 4 z M 11.292969 7.2929688L6.5859375 12L11.292969 16.707031L12.707031 15.292969L10.414062 13L17 13L17 11L10.414062 11L12.707031 8.7070312L11.292969 7.2929688 z"/>
   </svg>
                </div>
            </button>
             <div class="center  flex  flex-gap pag-n-b over-h f-wrap">
             </div> 
            <button class="button p-next" align="icon">
            <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
     <path d="M12 2C6.4889971 2 2 6.4889971 2 12C2 17.511003 6.4889971 22 12 22C17.511003 22 22 17.511003 22 12C22 6.4889971 17.511003 2 12 2 z M 12 4C16.430123 4 20 7.5698774 20 12C20 16.430123 16.430123 20 12 20C7.5698774 20 4 16.430123 4 12C4 7.5698774 7.5698774 4 12 4 z M 13.457031 8.0429688L12.042969 9.4570312L13.585938 11L7 11L7 13L13.585938 13L12.042969 14.542969L13.457031 15.957031L17.414062 12L13.457031 8.0429688 z"/>
   </svg>
            
            </div>
            </button>
             </div>
              <div class="pag-n-go flex center center-tb">
                <div class="flex-l-c-r  center   pag-n-go-cnt border border-radius">
                    <input class="center b-none border-radius" placeholder="0">
                <div class="button ">${jumbtn}</div>
                </div>
            </div>
             `
                var total = new Number(e.getAttribute("pn-total")) || undefined;
                var tabs = new Number(e.getAttribute("pn-tabs")) || new Number(8);
                var current = new Number(e.getAttribute("pn-current")) || new Number(1);

                //var both = tabs-2 || 8-2;
                genrate(current.valueOf(), tabs, total.valueOf(), e)




            }
        })
    });
}(); 
