!function () {
    Object.defineProperties(this, {
        $radio: {
            value: function (name) {
                var list = document.getElementsByName(name);
                var prop = {
                    change: function (caller = function () { }) {
                        list.forEach(function (e) {
                            e.addEventListener("change", function (event) {
                                caller.call(this, this, list, event)
                            });
                        });
                        return list
                    },
                    names: list
                }
                return prop
            },
            writable: false
        }
    });
}();
