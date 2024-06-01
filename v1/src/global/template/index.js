!function () {
    /*platforms*/
    document.addEventListener("DOMContentLoaded", (event) => {
        if ($getDeviceType() == "Mobile") {
            //$qs("body").setAttribute("d-mb", "t");
            /*header*/
            var scrollTop = window.innerHeight + 50, bdtop = 0;
            $qs(".home").addEventListener("scroll", function () {
                var header = $qs("header")
                if (this.scrollTop > scrollTop) {
                    scrollTop = this.scrollTop
                    header.classList.remove("d-m-down")
                    header.style.display = "none"

                } else {
                    scrollTop = this.scrollTop
                    header.style.display = "flex"
                    header.classList.add("d-m-down");
                }
            });



        }

    });



    var setD = function (opend) {
        if ($getDeviceType() == "Mobile") {
            if (opend.getAttribute("d-mb") == null) {
                opend.setAttribute("d-mb", "t")
            }
            opend.style.top = `${$qs("header").getBoundingClientRect().bottom}px`
        } else {
            if (opend.getAttribute("d-dk") == null) {
                opend.setAttribute("d-dk", "t");
            }
        }
    }

    var onopen = new CustomEvent('open', {
        detail: {
            message: 'on opend it'
        }
    });

    var onclose = new CustomEvent('close', {
        detail: {
            message: 'on close it'
        }
    });

    var Samebtn = function (defind, setter = false) {
        var btn = $qsall(`[sidebar="trigger"][s-defind="${defind}"]`);

        btn.forEach(function (b) {
            if (setter) {
                b.setAttribute("isOpen", true);
            } else {
                b.removeAttribute("isOpen");
            }
        });
    }
    var openSide = function (open) {
        setD(open);
        open.dispatchEvent(onopen);
        $disableScroll();
        if (open.getAttribute("placement") == null) {
            open.setAttribute("placement", "left");
        }
        open.setAttribute("open", true);
        open.addEventListener('animationend', function () {
            if (this.getAttribute("open") == "true") {
                this.setAttribute("c-v-port", "t") /*close by viewport*/
            }
        });




    }
    var closeSide = function (open) {
        $enableScroll();
        open.dispatchEvent(onclose);
        open.setAttribute("open", "close");
        open.addEventListener('animationend', function () {
            if (this.getAttribute("open") == "close") {
                this.removeAttribute("open");
                this.removeAttribute("c-v-port");
            }

        });


    }
    var openalwy = function (open) {
        open.dispatchEvent(onopen);
        open.setAttribute("open", "always");
    }
    var closealwy = function (open) {
        open.dispatchEvent(onclose);
        open.setAttribute("open", "c-always");

    }
    var openexpand = function (open) {
        open.dispatchEvent(onopen);
        open.setAttribute("expand", true);
    }
    var closexpand = function (open) {
        open.dispatchEvent(onclose);
        open.removeAttribute("expand");
    }
    /*close by viewport*/
    document.addEventListener("click", function (event) {
        var sibars = $qsall(".sidebar");
        sibars.forEach(function (s) {
            if (s.getAttribute("d-dk") && s.getAttribute("open") == "true" && s.getAttribute("c-v-port")) {
                if (event.target.closest('.sidebar') !== s) {
                    var d = s.getAttribute("s-defind");
                    Samebtn(d, false)
                    closeSide(s)
                }

            }
        })

    });

    setInterval(function () {
        //window.addEventListener("load",function(){
        var trigger = $qsall(`[sidebar="trigger"]`);
        if (trigger.length > 0) {
            trigger.forEach(function (e) {
                if (e.getAttribute("s-setup") == null) {
                    e.setAttribute("s-setup", "t");

                    e.addEventListener("click", function () {
                        var d = this.getAttribute("s-defind");
                        var dt = $qs(`.sidebar[s-defind="${d}"]`);
                        var styel = dt.getAttribute("open");

                        if (dt && ((styel != "always" && styel != "c-always" && styel != "always-exp" && styel != "c-always-exp") || $getDeviceType() != "Desktop")) {
                            if (this.getAttribute("isOpen") == null) {
                                Samebtn(d, true);
                                openSide(dt);
                            } else {
                                Samebtn(d, false)
                                closeSide(dt)
                            }


                        }

                        else if (dt && (styel == "always" || styel == "c-always")) {
                            var atn = styel;
                            if (atn == "always") {
                                Samebtn(d, false);
                                closealwy(dt)
                            } else {
                                Samebtn(d, true);
                                openalwy(dt);
                            }
                        }
                        else if (dt && styel == "always-exp") {
                            null;
                        }
                    });
                }
            });
        }


        /*always on*/
        var sidebar = $qsall(".sidebar");
        if (sidebar.length > 0) {
            sidebar.forEach(function (e) {
                var open = e.getAttribute("open");
                if ((open == "always" || open == "always-exp") && e.getAttribute("always-s") == null) {
                    e.setAttribute("always-s", "t");
                    if ($getDeviceType() == "Desktop") {
                        e.setAttribute("d-dk", "t")
                    }

                }

                if ((open == "always-exp" || open == "always-exp") && e.getAttribute("s-exptnd-ev") == null) {
                    e.setAttribute("s-exptnd-ev", "t");
                    /*e.addEventListener("mouseenter", function () {
                       // openexpand(this)
                       var self = this 
                      setTimeout(function(){ 
                          openexpand(self)
                      },300) 
        
                    });  */
                    document.body.addEventListener("mousemove", function (event) { //mousemove
                        sidebar_leave = e.contains(event.target)
                        if (sidebar_leave && e.getAttribute("expand") == null) {
                            setTimeout(function () {
                                openexpand(e)
                            }, 100)

                        }

                    });
                    document.body.addEventListener("mousemove", function (event) { //mousemove
                        sidebar_leave = e.contains(event.target)
                        if (!sidebar_leave && e.getAttribute("expand") != null) {
                            //  setTimeout(function(){ 
                            closexpand(e)
                            //  },100) 

                        }

                    });
                    /*e.addEventListener("mouseleave", function () {
                       // closexpand(this) 
                          
      
                    }); */
                }


            });
        }


    }, 100);

    /*alway auto sidebar*/
    function auto_mode() {
        if ($getDeviceType() == "Desktop" && $sizeMobile()) {
            this.setAttribute("open", "");
        } else {
            this.setAttribute("open", "always");
        }
    }

    function autoreszie(self) {
        window.addEventListener("resize", function () {
            auto_mode.call(self)
        });
    }

    setInterval(function () {
        var resp_d_m = $qsall(".sidebar[open='always']");
        if (resp_d_m.length > 0) {
            resp_d_m.forEach(function (s) {
                if (s.getAttribute("set-auto_alays_co") == null) {
                    s.setAttribute("set-auto_alays_co", "t")

                    auto_mode.call(s);
                    autoreszie(s)
                }

            });
        }

    }, 100);

}(); 
