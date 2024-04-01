!function () {

    function htp_call(scop = {}) {
        $htp.call(this, scop);
    }
   // setInterval(function () {
   document.addEventListener("evn-run",function() {
        var htpload = $qsall("[htp-load]");
        htpload.forEach(function (e) {
            if (e.getAttribute("set-htp-load") == null) {
                var bind = e.getAttribute("htp-load");
                var target = e.getAttribute("htp-t");
                e.setAttribute("set-htp-load", "t");
                if (bind == "void") {
                    htp_call.call(e)

                } else if (target  && target == "self") {
                    e.addEventListener(bind, function () {
                        if (e.getAttribute("htp-on") == null) {
                            var lastend = e.querySelectorAll("[htp-load-end]") /*if scrolling*/
                            var last = lastend[lastend.length - 1];

                            var attechs = {}
                            if (last) {
                                attechs.end = last.getAttribute("htp-load-end");
                            }
                            htp_call.call(this, attechs);

                        }

                    });


                } else if (target) {
                    e.addEventListener(bind, function () {
                        var def_ = $qs(target) || undefined;
                        if (def_) {
                            if (e.getAttribute("htp-on") == null) {
                                var lastend = def_.querySelectorAll("[htp-load-end]") 
                                var last = lastend[lastend.length - 1];
                                var attechs = {}
                                if (last) {
                                attechs.end = last.getAttribute("htp-load-end");
                                }
                                htp_call.call(this,attechs)
                            }

                        }

                    });



                }


            }

        })

    });

}();
