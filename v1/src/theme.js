!function () {
    var themes = ["light", "dark"];
    var current_theme = false
    let IntervalID;
    var calld = { change: undefined }; /*create event on change or..*/


    function set_themeToElement(mode) {

        if (IntervalID) {
            clearInterval(IntervalID);
        }

        IntervalID = setInterval(function () {
            if (mode == 'dark') {
                elements = document.querySelectorAll(".theme");
                elements.forEach(function (e) {
                    if (e.getAttribute("my-theme-formui") == null) {
                        e.setAttribute("my-theme-formui", true)
                        e.classList.add("dark");
                    }
                });
            } else {
                elements = document.querySelectorAll(".theme");
                elements.forEach(function (e) {
                    if (e.getAttribute("my-theme-formui") != null) {

                        e.removeAttribute("my-theme-formui")
                        e.classList.remove("dark");
                    }


                });
            }

        });
    }

    function set_History(mode) {
        try {
            localStorage.setItem("my-theme-formui", mode);
        } catch (e) {
            return null
        }
    }


var Themis = function () {
            try {
                return localStorage.getItem("my-theme-formui")
            } catch (e) {
                return null
            }
        }
if(Themis() == "dark"){ /*fastly*/
    set_themeToElement("dark");
 }  
    const defaultset = function () {

        
        var button = document.querySelector('[theme="toggle"]');
        var prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (Themis() == undefined || Themis() == null) { /* no history*/

            if (button && button.getAttribute("default") != null) {
                var defSet = button.getAttribute("default")
                if (themes.includes(defSet)) {
                    if (current_theme != defSet) {
                        set_themeToElement(defSet);
                        set_History(defSet);
                        current_theme = defSet
                        if (typeof calld.change == "function") {
                            calld.change();
                        }
                    }

                }

            }
            else if (prefersDarkMode) { /*by system defult*/

                if (current_theme != "dark") {
                    set_themeToElement("dark");
                    set_History("dark");
                    current_theme = "dark"
                    if (typeof calld.change == "function") {
                        calld.change();
                    }
                }


            }

        } else {
            var back = Themis();
            if (themes.includes(back)) {
                if (current_theme != back) {
                    set_themeToElement(back);
                    current_theme = back
                    if (typeof calld.change == "function") {
                        calld.change();
                    }
                }

            }


        }

    };

    var Themis = function () {
        try {
            return localStorage.getItem("my-theme-formui");
        } catch (e) {
            return undefined;
        }
    };
    var buttonTo = function () {
        var button = document.querySelector('[theme="toggle"]');

        if (button) {
            button.addEventListener('click', function () {


                if (Themis() === undefined) {
                    if (current_theme != "dark") {
                        current_theme = "dark";
                        set_themeToElement("dark");
                    } else {
                        current_theme = "light";
                        set_themeToElement("light");
                    }


                } else if (Themis() === 'dark') {

                    set_History("light");
                    current_theme = "light";
                    set_themeToElement("light");
                } else {
                    set_History("dark");
                    current_theme = "dark";
                    set_themeToElement("dark");
                }

                if (typeof calld.change == "function") {
                    calld.change();
                }
            });


        }

    };


    document.addEventListener('DOMContentLoaded', function () {
        defaultset();
        buttonTo();
    });


    $arriveAdd('[theme="toggle"]', function () {
        if (document.querySelector('[theme="toggle"]') == null) {
            defaultset();
            buttonTo();
        }

    });

    window.addEventListener('storage', function (event) {
        if (event.key === 'my-theme-formui') {
            set_History(event.newValue);
            set_themeToElement(event.newValue);
            if (typeof calld.change == "function") {
                calld.change();
            }
        }
    });





    Object.defineProperty(window, '$theme', {
        get: function () {
            return {
                themeSet: function (t) { 
                    /*dark/light/default*/  //default:is by os defult or defult by toogle element
                    if (t == "default") {
                        try { localStorage.removeItem("my-theme-formui"); } catch (e) { null }
                        defaultset();
                    } else if (themes.includes(t)) {
                        set_themeToElement(t);
                        set_History(t);
                        current_theme = t;
                        if (typeof calld.change == "function") {
                            calld.change();
                        }
                    }
                },
                change: function (caller = function () { }) { //call theme or current theme info
                    calld.change = function () {
                        var t = Themis() || current_theme
                        caller.call(t, t) //t:string|undefined|false
                    }
                },

            };
        },

    });


}();
