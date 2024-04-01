void function () {
    function setA(element, names = []) { /*private*/
        names.forEach(function (name) {
            element.setAttribute(name, null)
        });

    }
    function inputProperts() {
        var properties = document.querySelectorAll('div[form="input"]');
        properties.forEach(function (e) {
            if (e.getAttribute("prop-setup") == null) {
                Object.defineProperties(e, {
                    input: {
                        get: function () {
                            if (this.getAttribute("multiple") != null) {
                                return e.querySelectorAll("input");
                            } else {
                                return e.querySelector("input")
                            }

                        }
                    },
                    disabled: {
                        get: function () {
                            return this.getAttribute("disabled") != null ? true : false;
                        },
                        set: function (bool) {
                            if (bool) {
                                this.setAttribute("disabled", null);
                                e.querySelectorAll("input").forEach(function (ds) {
                                    ds.blur();
                                });
                            } else {
                                this.removeAttribute("disabled")
                            }
                        }
                    },
                    focus: {
                        value: function (options = false) {
                            //this.setAttribute("focus",null);
                            if (options) { this.input.focus(options); } else {
                                this.input.focus();
                            }

                        }
                    },
                    blur: {
                        value: function (options = false) {
                            //this.removeAttribute("focus",null);
                            //this.input.blur();
                            e.querySelectorAll("input").forEach(function (ds) {
                                ds.blur();
                            });

                        }
                    },
                    invalid: {
                        value: function (bool = false, massage = null) {
                            var s = this;
                            if (bool) {
                                this.setAttribute("error", null);
                                this.removeAttribute("checkmark");
                                this.removeAttribute("checking");
                                if (this.getAttribute("step2") == "true") {
                                    if (massage) {
                                        s.querySelector("[error-text] text").textContent = massage;
                                    }
                                }
                                else {
                                    const i = setInterval(function () {
                                        if (s.getAttribute("step2") == "true") {
                                            if (massage) {
                                                s.querySelector("[error-text] text").textContent = massage;
                                            }
                                            clearInterval(i);
                                        }
                                    });
                                }

                            } else {
                                this.removeAttribute("error");
                            }
                        }
                    },
                    isValid: {
                        get: function () {
                            return this.getAttribute("error") != null ? false : true;
                        }

                    },
                    checkmark: {
                        get: function () {
                            return this.getAttribute("checkmark") != null ? true : false;
                        },
                        set: function (bool) {
                            if (bool) {
                                this.setAttribute("checkmark", null);
                                this.removeAttribute("error");
                                this.removeAttribute("checking");
                            } else {
                                this.removeAttribute("checkmark")
                            }
                        }
                    },
                    check: {
                        get: function () {
                            return this.getAttribute("checking") != null ? true : false;
                        },
                        set: function (bool) {
                            if (bool) {
                                this.setAttribute("checking", null);
                                this.removeAttribute("error");
                                this.removeAttribute("checkmark");
                            } else {
                                this.removeAttribute("checking");
                            }
                        }
                    },
                    icon: {
                        value: function (obj) {
                            var s = this;
                            function newIcon(obj, iconLeft) {
                                if (typeof obj == "string") {
                                    iconLeft.innerHTML = null;
                                    iconLeft.innerHTML = obj;

                                } else if (obj instanceof SVGSVGElement || obj instanceof HTMLImageElement) {
                                    iconLeft.innerHTML = null;
                                    iconLeft.append(obj);

                                }
                            }

                            if (this.getAttribute("step2") == "true") {
                                var iconLeft = this.querySelector("[form-input-left-icon]");
                                newIcon(obj, iconLeft);
                            }
                            else {
                                const i = setInterval(function () {
                                    if (s.getAttribute("step2") == "true") {
                                        var iconLeft = s.querySelector("[form-input-left-icon]");
                                        newIcon(obj, iconLeft);
                                        clearInterval(i);
                                    }
                                });
                            }


                        }
                    },
                    text: {
                        value: function (leftText = null) {
                            var s = this;
                            if (s.getAttribute("step2") == "true") {
                                var TextLeft = s.querySelector("[form-input-left-text]");
                                TextLeft.textContent = leftText

                            } else {
                                const i = setInterval(function () {
                                    if (s.getAttribute("step2") == "true") {
                                        var TextLeft = s.querySelector("[form-input-left-text]");
                                        TextLeft.textContent = leftText
                                        clearInterval(i);
                                    }
                                });
                            }
                        }
                    },
                    getIcon: {
                        get: function () {
                            if (this.getAttribute("step2") == "true") {
                                var l = this.querySelector("[form-input-left-icon]");
                                var s = l.querySelector("img") != null ? l.querySelector("img") : l.querySelector("svg");
                                return s //element|null
                            } else {
                                var l = this.querySelector("icon");
                                var s = l.querySelector("img") != null ? l.querySelector("img") : l.querySelector("svg");
                                return s  //element|null
                            }
                        }
                    },
                    getText: {
                        get: function () {
                            if (this.getAttribute("step2") == "true") {
                                var l = this.querySelector("[form-input-left-text]");
                                var s = l.textContent;
                                return s //string|null 
                            } else {
                                var l = this.querySelector("text");
                                var s = l != null ? l.textContent : null;
                                return s  //string|null
                            }
                        }
                    }


                });
                e.setAttribute("prop-setup", true)
            }



        });
    }

    inputProperts();
    Object.defineProperties(this, {
        $input: {
            value: function (element) {
                inputProperts();
                return element
            },
            writable: false
        }
    });

    var d_iconL = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22,6H2C0.895,6,0,6.895,0,8v8c0,1.105,0.895,2,2,2h20c1.105,0,2-0.895,2-2V8C24,6.895,23.105,6,22,6z M3,16 c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1s1,0.448,1,1C4,15.552,3.552,16,3,16z M7,16c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1 s1,0.448,1,1C8,15.552,7.552,16,7,16z M11,16c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1s1,0.448,1,1C12,15.552,11.552,16,11,16z"/></svg>`;

    var right_icons = `<svg form-input-right-icon form-input-right-error xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
            d="M12 2C6.4889971 2 2 6.4889971 2 12C2 17.511003 6.4889971 22 12 22C17.511003 22 22 17.511003 22 12C22 6.4889971 17.511003 2 12 2 z M 12 4C16.430123 4 20 7.5698774 20 12C20 16.430123 16.430123 20 12 20C7.5698774 20 4 16.430123 4 12C4 7.5698774 7.5698774 4 12 4 z M 11 7L11 9L13 9L13 7L11 7 z M 11 11L11 17L13 17L13 11L11 11 z" />
    </svg><svg form-input-right-icon form-input-right-checkmark xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
            d="M11,16.4l-4.7-4.7l1.4-1.4l3.3,3.3l8.4-8.4C17.5,3.3,14.9,2,12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10 c0-1.9-0.5-3.6-1.4-5.1L11,16.4z" />
    </svg>
    <svg form-input-right-icon form-input-right-checking xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
            d="M11 2.1816406L11 6L13 6L13 2.1816406L11 2.1816406 z M 7.9570312 2.9960938L6.2246094 3.9960938L8.1347656 7.3046875L9.8652344 6.3046875L7.9570312 2.9960938 z M 16.042969 2.9960938L14.134766 6.3046875L15.865234 7.3046875L17.775391 3.9960938L16.042969 2.9960938 z M 3.9960938 6.2246094L2.9960938 7.9570312L6.3046875 9.8652344L7.3046875 8.1347656L3.9960938 6.2246094 z M 20.003906 6.2246094L16.695312 8.1347656L17.695312 9.8652344L21.003906 7.9570312L20.003906 6.2246094 z M 2.1816406 11L2.1816406 13L6 13L6 11L2.1816406 11 z M 18 11L18 13L21.818359 13L21.818359 11L18 11 z M 6.3046875 14.134766L2.9960938 16.042969L3.9960938 17.775391L7.3046875 15.865234L6.3046875 14.134766 z M 17.695312 14.134766L16.695312 15.865234L20.003906 17.775391L21.003906 16.042969L17.695312 14.134766 z M 8.1347656 16.695312L6.2246094 20.003906L7.9570312 21.003906L9.8652344 17.695312L8.1347656 16.695312 z M 15.865234 16.695312L14.134766 17.695312L16.042969 21.003906L17.775391 20.003906L15.865234 16.695312 z M 11 18L11 21.818359L13 21.818359L13 18L11 18 z" />
    </svg>`;

    var pass_icon = ` <div pass-icons form-cursor>
           <svg action="show" form-input-right-icon pass-icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M12 4C4 4 1 12 1 12C1 12 4 20 12 20C20 20 23 12 23 12C23 12 20 4 12 4 z M 12 6C17.276 6 19.944594 10.267094 20.808594 11.996094C19.943594 13.713094 17.255 18 12 18C6.724 18 4.0554062 13.732906 3.1914062 12.003906C4.0574062 10.286906 6.745 6 12 6 z M 12 8C9.791 8 8 9.791 8 12C8 14.209 9.791 16 12 16C14.209 16 16 14.209 16 12C16 9.791 14.209 8 12 8 z M 12 10C13.105 10 14 10.895 14 12C14 13.105 13.105 14 12 14C10.895 14 10 13.105 10 12C10 10.895 10.895 10 12 10 z"/>
</svg>
       <svg action="hide" form-input-right-icon pass-icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M4.2070312 2.7929688L2.7929688 4.2070312L5.0820312 6.4960938C2.4151866 8.6404109 1.1608367 11.416191 1.0800781 11.605469L0.91210938 12L1.0800781 12.394531C1.2130781 12.705531 4.428 20 12 20C14.066349 20 15.797205 19.449537 17.238281 18.652344L19.792969 21.207031L21.207031 19.792969L4.2070312 2.7929688 z M 12 4C10.789 4 9.7000313 4.200625 8.7070312 4.515625L10.353516 6.1621094C10.874516 6.0631094 11.419 6 12 6C17.396 6 20.167625 10.588094 20.890625 11.996094C20.596625 12.559094 19.952359 13.651953 18.943359 14.751953L20.369141 16.177734C22.049141 14.359734 22.854922 12.545531 22.919922 12.394531L23.087891 12L22.919922 11.605469C22.786922 11.294469 19.572 4 12 4 z M 6.5117188 7.9257812L8.5625 9.9765625C8.2079471 10.569059 8 11.258899 8 12C8 14.206 9.794 16 12 16C12.741101 16 13.430941 15.792053 14.023438 15.4375L15.748047 17.162109C14.674347 17.671227 13.428307 18 12 18C6.604 18 3.832375 13.411906 3.109375 12.003906C3.5249986 11.207948 4.6402378 9.3628241 6.5117188 7.9257812 z M 12.212891 8.0214844L15.978516 11.787109C15.869516 9.7541094 14.245891 8.1304844 12.212891 8.0214844 z M 10.074219 11.488281L12.511719 13.925781C12.347951 13.969804 12.177911 14 12 14C10.897 14 10 13.103 10 12C10 11.822089 10.030196 11.652049 10.074219 11.488281 z"/>
</svg>
       </div>`

    setInterval(function () {


        var step1 = document.querySelectorAll('div[form="input"]');
        step1.forEach(function (e) {
            if (e.getAttribute("ui-setup") == null || e.querySelector("input[worker]") == null) {
                // document.console = "HAA"
                e.setAttribute("form-border", null); e.setAttribute("form-font-size", null)
                var icon = e.querySelector("icon"), lText = e.querySelector("text"), eText = e.querySelector("error");

                var Input_e = document.createElement("div");
                var PI = icon != undefined ? icon.innerHTML : d_iconL, PT = lText != undefined ? lText.textContent : null;
                var PE = eText != undefined ? eText.innerHTML : "Please enter a valid";

                Input_e.setAttribute("input", null);

                var cnt = `<div form-input-left-icon> ${PI} </div>
         <div padding form-border-left-text  form-font-size form-input-color form-input-left-text form-border-color>
         ${PT}
         </div> 
         ${pass_icon} 
         ${right_icons}
         <div disabled-bar></div>
          `

                if (icon) { icon.remove() };
                if (lText) { lText.remove() }
                if (eText) { eText.remove() }

                Input_e.innerHTML = cnt;

                var inputs = e.querySelectorAll("input") /*main*/
                inputs.forEach(function (input) {
                    input.setAttribute("worker", true)
                    if (e.getAttribute("multiple") == null) {
                        var setPriv = ["worker", "padding", "form-text-width", "form-font-size", "form-input-placeholder", "form-input-color"]
                    } else {
                        var setPriv = ["worker", "padding", "form-font-size", "form-input-placeholder", "form-input-color"]

                    }

                    setA(input, setPriv)
                });

                if (e.getAttribute("multiple") == null) {
                    Input_e.querySelector("[form-input-left-text]").after(inputs[0]);
                } else {
                    var partsE = document.createElement("div");
                    var partsto = ["form-text-width", "parts", "form-font-size", "form-input-color"];
                    setA(partsE, partsto);


                    for (let pI = 0; inputs.length > pI; pI++) {
                        partsE.append(inputs[pI])
                        if (pI + 1 < inputs.length && e.getAttribute("join") != null) {

                            var joinE = document.createElement("div");
                            var joinTo = ["join", "form-input-color"];
                            setA(joinE, joinTo)
                            joinE.textContent = e.getAttribute("join");
                            inputs[pI].after(joinE)

                        }
                    }
                    Input_e.querySelector("[form-input-left-text]").after(partsE);
                }


                e.append(Input_e)

                /*valid check*/


                function validfind(pattern, value) {
                    var patternString = `^${pattern}$`;
                    return new RegExp(patternString).test(value);

                }


                /*events or valid*/
                inputs.forEach(function (valid) {
                    valid.addEventListener("input", function (event) {
                        var s = this
                        var pattern = valid.getAttribute("pattern");

                        if (pattern != null) {
                            if (!validfind(pattern, s.value)) {
                                $input(e).invalid(true)
                            } else {
                                $input(e).invalid(false);
                                //$input(e).checkmark = true

                            }

                        }


                        if (e.getAttribute("multiple") != null && valid.getAttribute("maxlength") != null) {
                            var max_legth = valid.getAttribute("maxlength");

                            if (max_legth == valid.value.length) {
                                var nf = Array.from(inputs);
                                nf.forEach(function (next, index) {
                                    if (valid == next) {
                                        var foucs_ = nf[index + 1];
                                        if (foucs_) {
                                            foucs_.focus()
                                        }

                                    }
                                })
                            }
                        }

                        /*required min size*/
                        if (valid.getAttribute("min") != null) {
                            var reS = valid.getAttribute("min");

                            if (new Number(reS) > valid.value.length) {
                                $input(e).invalid(true)
                            } else {
                                $input(e).invalid(false)
                            }
                        }


                        /*required*/
                        if (valid.getAttribute("required") != null) {
                            var required = valid.getAttribute("required");

                            if (required == "number") {
                                if (isNaN(new Number(event.data))) {
                                    valid.value = valid.value.slice(0, -1)
                                    $input(e).invalid(true)
                                } else {
                                    //$input(e).checkmark = true
                                    $input(e).invalid(false)
                                }

                            }
                            else if (required == "password") {
                                /*At least one lowercase letter (?=.*[a-z])
                               At least one uppercase letter (?=.*[A-Z])
                               At least one digit (?=.*\d)
                               At least one special character from the set [!@#$%^&*] (?=.*[!@#$%^&*])
                               Minimum length of 8 characters [A-Za-z\d!@#$%^&*]{8,}*/

                                var pattren = "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}"
                                if (!validfind(pattren, valid.value)) {
                                    $input(e).invalid(true)
                                } else {
                                    $input(e).invalid(false)
                                    //$input(e).checkmark = true
                                }

                            }
                            else if (required == "username") {
                                /*[a-zA-Z0-9_-]: This part defines a character set that includes uppercase letters (A-Z), lowercase letters (a-z), digits (0-9), underscores (_), and hyphens (-).
                                {3,16}: This part specifies the allowed length range for the string. The string must be at least 3 characters long and can be up to 16 characters long.
                                Here are some examples of strings that match this pattern:
                                "abc123"
                                "user_name"
                                "test-123"
                                less than 3 characters)
                                more than 16 characters
                                */
                                var pattren = "[a-zA-Z0-9_-]{3,16}";
                                if (!validfind(pattren, valid.value)) {
                                    $input(e).invalid(true)
                                } else {
                                    $input(e).invalid(false)
                                    //$input(e).checkmark = true
                                }
                            }

                            else if (required == "mail") {
                                /*
                                @: Matches the at symbol that separates the local part from the domain.
                                
                                [a-zA-Z0-9.-]+: Matches the domain part of the email address, which can include letters, numbers, dots, and hyphens.
                                
                                \.: Matches the dot that separates the domain from the top-level domain (TLD).
                                
                                [a-zA-Z]{2,}$: Matches the TLD, which must consist of at least two letters.
                                */
                                var pattren = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}";
                                if (!validfind(pattren, valid.value)) {
                                    $input(e).invalid(true)
                                } else {
                                    $input(e).invalid(false)
                                    //$input(e).checkmark = true
                                }
                            }





                        }


                    });



                    valid.addEventListener("focus", function (event) {
                        e.setAttribute("focus", null)
                    });
                    valid.addEventListener("blur", function (event) {
                        e.removeAttribute("focus")
                    });

                })

                /*pass toogle*/
                var tog = e.querySelector("[pass-icons]").querySelectorAll("svg");
                tog.forEach(function (toggle) {
                    toggle.onclick = function () {
                        if (this.getAttribute("action") == "show") {
                            this.style.display = "none";
                            tog[1].style.display = "block";
                            inputs.forEach(function (type) { type.setAttribute("type", "text") });
                        } else {
                            this.style.display = "none";
                            tog[0].style.display = "block";
                            inputs.forEach(function (type) { type.setAttribute("type", "password") });
                        }
                    }
                })

                var error_e = document.createElement("div"); error_e.setAttribute("padding", null); error_e.setAttribute("error-text", null)
                error_e.innerHTML = `<text>${PE}</text>`
                e.querySelector("[input]").after(error_e);




                /*done*/
                e.setAttribute("ui-setup", true);
                e.setAttribute("step2", true);
            }
        });


    });


}();
