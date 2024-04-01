!function () {
    //setInterval(function () {
document.addEventListener("evn-run",function() {
        var cmd = $qsall('[cmd-k]');
        cmd.forEach(function (c) {
            if (c.getAttribute("set-cmd") == null) {
                c.setAttribute("set-cmd", "t")
                var k = c.getAttribute("cmd-k", "t");
                var conditions = c.getAttribute("cmd-if") || undefined;
                var prevent = c.getAttribute("cmd-p") == "true" ? true : false;

                var event_handle = c.getAttribute("cmd-event") || undefined;
                $cmd(k, conditions, prevent, function (event) {
                    if (event_handle) {
                        if (typeof c[event_handle] == 'function') {
                            c[event_handle]();

                        }
                    }
                })

            }
        });

    });

}();