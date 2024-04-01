!function () {
    var e_expand = new CustomEvent("expand");
    var e_less = new CustomEvent("less");
    function expand(isexpand = false) {
        try {
            this.dispatchEvent(e_expand)
        } catch (rr) {
            null
        }
        if (isexpand) {
            var d = this.querySelector(".collapse-d");
            if (d) {
                d.classList.remove("less")
            }
        }
        this.setAttribute("cl-expand", "t");

    }
    function less(isexpand) {
        try {
            this.dispatchEvent(e_less)
        } catch (rr) {
            null
        }

        if (isexpand) {
            var d = this.querySelector(".collapse-d");
            if (d) {
                d.classList.add("less");
            }
        }
        this.removeAttribute("cl-expand")
    }
    //setInterval(function () {
     document.addEventListener("evn-run",function() {
        var collapse = $qsall("[collapse]");
        collapse.forEach(function (e) {
            if (e.getAttribute("set-collapse") == null) {
                e.setAttribute("set-collapse", "t")
                var type = e.getAttribute("collapse");
                if (type == "toggle") {
                    var head = e.querySelector(".collapse-h");
                    var h_l = head.innerHTML
                    head.classList += " flex gap-l-f center-tb"

                    head.innerHTML = `<div  class="collapse-h-c">${h_l}</div>
                  <div class="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M7.4296875 9.5L5.9296875 11L12 17.070312L18.070312 11L16.570312 9.5L12 14.070312L7.4296875 9.5 z"/>
</svg>
                  </div>`
                    head.addEventListener("click", function () {
                        if (e.getAttribute("cl-expand") != null) {

                            less.call(e)
                        } else {
                            expand.call(e)
                        }

                    })
                }
                else {
                    var labe_ex = e.getAttribute("c-expand-label") || "expand"
                    var labe_le = e.getAttribute("c-less-label") || undefined

                    e.innerHTML += `<div class="flex center center-tb collapse-ex"> 
                  <button class="button">${labe_ex}</button>
              </div>`

                    var expandbtn = e.querySelector(".collapse-ex .button");


                    expandbtn.addEventListener("click", function () {
                        if (e.getAttribute("cl-expand") != null) {
                            this.textContent = labe_ex
                            less.call(e, true);
                        } else {
                            expand.call(e, true);
                            if (labe_le) {
                                this.textContent = labe_le
                            } else {
                                this.style.display = 'none'
                            }
                        }
                    })
                }
            }
        });
    });
}();
