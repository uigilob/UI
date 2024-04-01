!function () {

  function adjustVisibility(contents, self, isSub = false) {
    /*position:absolute or right: 0; in css*/

    var btn = self.getBoundingClientRect();
    contents.style.bottom = "auto"
    if (isSub) {
      contents.style.top = `${btn.top - 2}px`
      contents.style.left = `${btn.right - 2}px`
    } else {

      contents.style.top = `${btn.bottom}px`
      contents.style.left = `${btn.left}px`
    }

    var re2 = contents.getBoundingClientRect();
    if (re2.right > window.innerWidth) {
      contents.style.left = `${btn.left - re2.width}px`
    }

    if (re2.bottom > window.innerHeight) {
      contents.style.top = `${btn.top - re2.height}px`
      /*not posible visbilty after*/
      var adjust = contents.getBoundingClientRect();
      if (adjust.top < 0) {
        contents.style.top = "1px";
        contents.style.bottom = "0"  //`${window.innerHeight-btn.top}px`;
      }



      contents.setAttribute("up", null);
    } else {
      contents.setAttribute("down", null);
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

  function dropOpen(open, trigger, mobile = null) {
    $disableScroll();
    open.dispatchEvent(onopen);
    open.setAttribute("open", true)
    adjustVisibility(open, trigger);
    mobile.show();


    window.addEventListener('resize', function () {
      adjustVisibility(open, trigger);
      if (trigger.getAttribute("Isopen")) {
        mobile.show();

      } else {
        mobile.close()
      }

    });

    /*cnt-load*/
    var cnt_load = open.getAttribute("cnt-load-get") || open.getAttribute("cnt-load-post");

    if (cnt_load) {
      if (window.$cntload) {
        open.setAttribute("isloading", true);
        var errorE = open.querySelector("[loading-drop]");
        errorE.querySelector(".error-l-drop").style.display = 'none'
        errorE.querySelector(".loader-icon").style.display = "block";
        function success_load(status, cnt) {
          if (status == 200) {
            var swap_cnt = this.getAttribute("htp-swap") || "innerHTML";
            $parserHTML(cnt, this.querySelector(".items-drops"), swap_cnt);
            ulitem(this);

            this.removeAttribute("isloading");
            if (this.getAttribute("htp-sync") != "true") {
              this.removeAttribute("cnt-load-get");
              this.removeAttribute("cnt-load-post");

            }

          } else {
            errorE.querySelector(".icon").style.display = "none";
            errorE.querySelector(".error-l-drop").style.display = "flex";

          }

          var agent_call = this.getAttribute("htp-s") || null;
          if (agent_call) {
            try {
              var fun = eval(agent_call);
              if (typeof fun == "function") {
                fun.call(this, this, status);
              }
            } catch (erc) {
              null;
            }
          }
        }
        var data = open.getAttribute("data");
        $cntload(open, success_load, { "data": data });
      }

    }


    document.querySelectorAll('.dropdown').forEach(function (unset) {
      if (trigger != unset) {
        unset.removeAttribute('Isopen')
      }
    });

    document.querySelectorAll('.dropdown-menu[d-defind]').forEach(function (unset) {
      if (open != unset) {
        unset.removeAttribute("open")
        unset.removeAttribute("down")
        unset.removeAttribute("up");
      }
    });

    open.querySelectorAll(".dropdown-sub").forEach(function (clls) { /*opend is New close set*/
      var subMenu = clls.querySelector(".dropdown-menu");
      if (subMenu) {
        subMenu.removeAttribute("open");
        subMenu.removeAttribute("down");
        subMenu.removeAttribute("up");
        var tr = clls.querySelector("[dropdown='trigger']");
        if (tr) {
          tr.removeAttribute("Isopen", null);
        }
      }

    });



  }



  function dropClose(open, mobile, trigger) {
    if (open.getAttribute("open")) {
      open.dispatchEvent(onclose);
      open.removeAttribute("open")
      open.removeAttribute("down")
      open.removeAttribute("up");
      $enableScroll()
      if (mobile && trigger) {
        trigger.removeAttribute("Isopen");
        mobile.close();
      } else {

        document.querySelectorAll('.dropdown').forEach(function (unset) {
          unset.removeAttribute('Isopen')

        });
      }

    }


  }

  function subOpen(open, trigger) {
    adjustVisibility(open, trigger, true);
    open.setAttribute("open", true);
    trigger.querySelector("[dropdown='trigger']").setAttribute("Isopen", null)
    window.addEventListener('resize', function () {
      adjustVisibility(open, trigger, true);
    });



  }

  function subClose(open, trigger) {
    open.removeAttribute("open");
    open.removeAttribute("down");
    open.removeAttribute("up");
    trigger.querySelector("[dropdown='trigger']").removeAttribute("Isopen", null)

  }

  function ulitem(ul, sub = false) {

    var items = ul.querySelector(".items-drops");
    if (sub) {
      items = sub;

    }


    if (items) {
      Array.from(items.childNodes).forEach(function (it) {

        if (it instanceof Element && !it.classList.contains("dropdown-sub")) {

          if (it.getAttribute) {
            if (it.getAttribute("setup") == null) {
              it.setAttribute("setup", true);
              it.addEventListener("click", function () {
                if (this.getAttribute("disabled") == null) {
                  if (!(this.getAttribute("event-remove") == "true")) {

                    setTimeout(function () {
                      dropClose(ul);

                    }, 100);


                  }

                }

              });
            }
          }

        }
        else if (it instanceof Element && it.classList.contains("dropdown-sub")) {
          var subdrop = it.querySelector(".dropdown-menu");
          ulitem(ul, subdrop);

        }
      })
    }

  }

 // setInterval(function () {
  document.addEventListener("evn-run",function() {
    var dropdown = document.querySelectorAll('.dropdown');
    dropdown.forEach(function (e) {
      if (e.getAttribute("step1") == null) {
        var defind = e.getAttribute("d-defind");
        var ul = undefined;
        var hover_events = ["mouseenter", "mouseleave", "mousemove", "mouseout",
          "mouseover", "pointerenter", "pointerleave", "pointermove",
          "pointerout", "pointerover", "pointerup"] /*ony support dekstop antor by click like mobile*/

        var trigger = e, event_d = "click"; /*default*/

        if (e.getAttribute("d-event") != null) {
          var eventListen = e.getAttribute("d-event");
          if (hover_events.includes(eventListen)) {
            if ($getDeviceType() == "Desktop") {
              event_d = e.getAttribute("d-event");
            } else {
              event_d = "click"
            }
          } else {
            event_d = e.getAttribute("d-event");
          }

        }




        trigger.addEventListener(event_d, function (event) {
          var self = this
          if (defind != null) {
            ul = document.querySelector(`.dropdown-menu[d-defind="${defind}"]`);
          }
          if (event_d == "contextmenu") {
            event.preventDefault();
          }
          if (ul) {

            mobile = $action_btm(ul.querySelector("mobile"));
            ulitem(ul);
            if (this.getAttribute('Isopen')) {

              if (!hover_events.includes(event_d)) {
                dropClose(ul);

              }



            } else {
              if (e.getAttribute("data")) {
                ul.setAttribute("data", e.getAttribute("data"));
              }
              dropOpen(ul, trigger, mobile);
              this.setAttribute("Isopen", true);


            }

            mobile.onclose(function () {
              this.close(function () { dropClose(ul, mobile, trigger) });
            });



          }







        });


        e.setAttribute("step1", true)



      }
    });

    /*setup2*/
    var stup2 = document.querySelectorAll(".dropdown-menu[d-defind]");

    stup2.forEach(function (ul) {

      if (ul.getAttribute("stup2") == null || ul.querySelector("mobile") == null) {
        ul.setAttribute("stup2", "t");
        ul.setAttribute("scroll-br", null);
        var mb = document.createElement("mobile");
        var items_drops = document.createElement("div");
        items_drops.classList.add("items-drops");


        mb.setAttribute("form", "bottom-bar");
        ul.querySelectorAll(".dropdown-sub [dropdown='trigger']").forEach(function (right_icon) {
          var rs = right_icon.querySelector("right");
          if (rs == null) {
            right_icon.innerHTML += `<right><svg  more_th="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M6.5234375 3.1484375L5.4765625 4.8515625L17.09375 12L5.4765625 19.148438L6.5234375 20.851562L20.908203 12L6.5234375 3.1484375 z"/>
</svg></right>`
          }
        });
        Array.from(ul.childNodes).forEach(function (c) {

          items_drops.append(c);
        });


        var loading_drop = document.createElement("div");
        loading_drop.setAttribute("loading-drop", "t");
        loading_drop.className = "padding-cnt flex center-tb center";
        var elabel = ul.getAttribute("error-label") || ""
        loading_drop.innerHTML = `
         <div class="icon loader-icon"> 
    <svg class="spinner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M11 2.1816406L11 6L13 6L13 2.1816406L11 2.1816406 z M 7.9570312 2.9960938L6.2246094 3.9960938L8.1347656 7.3046875L9.8652344 6.3046875L7.9570312 2.9960938 z M 16.042969 2.9960938L14.134766 6.3046875L15.865234 7.3046875L17.775391 3.9960938L16.042969 2.9960938 z M 3.9960938 6.2246094L2.9960938 7.9570312L6.3046875 9.8652344L7.3046875 8.1347656L3.9960938 6.2246094 z M 20.003906 6.2246094L16.695312 8.1347656L17.695312 9.8652344L21.003906 7.9570312L20.003906 6.2246094 z M 2.1816406 11L2.1816406 13L6 13L6 11L2.1816406 11 z M 18 11L18 13L21.818359 13L21.818359 11L18 11 z M 6.3046875 14.134766L2.9960938 16.042969L3.9960938 17.775391L7.3046875 15.865234L6.3046875 14.134766 z M 17.695312 14.134766L16.695312 15.865234L20.003906 17.775391L21.003906 16.042969L17.695312 14.134766 z M 8.1347656 16.695312L6.2246094 20.003906L7.9570312 21.003906L9.8652344 17.695312L8.1347656 16.695312 z M 15.865234 16.695312L14.134766 17.695312L16.042969 21.003906L17.775391 20.003906L15.865234 16.695312 z M 11 18L11 21.818359L13 21.818359L13 18L11 18 z" />
    </svg> 
  </div>
  <div style="display:none" class="error-l-drop error flex flex-col center-tb center flex-gap">
    <div class="icon">
      <svg style="fill:var(--error-color)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M22.239,18.451L13.442,3.816C13.135,3.305,12.596,3,12,3s-1.135,0.305-1.441,0.815L1.761,18.451 c-0.312,0.519-0.32,1.168-0.022,1.695C2.036,20.673,2.597,21,3.203,21h17.595c0.605,0,1.167-0.327,1.464-0.854 C22.56,19.619,22.551,18.97,22.239,18.451z M13,18h-2v-2h2V18z M13,14h-2V9h2V14z" />
      </svg>
    </div>
    <div class="error-mdl-label over-x-adjust">${elabel}</div>
         `

        mb.append(items_drops);
        mb.querySelector(".items-drops").after(loading_drop)
        ul.append(mb)



        /*close dropdown-menu*/
        var menu_event_d = "click";
        if (ul.getAttribute("d-event") != null) {
          menu_event_d = ul.getAttribute("d-event");
        }

        document.addEventListener(menu_event_d, function (event) {

          if (event.target.closest('.dropdown-menu') != ul && !event.target.closest('.dropdown')) {

            if (!Array.from(ul.querySelectorAll(".dropdown-sub")).some(f => event.target.closest('.dropdown-sub') === f)) {
              if ($sizeDekstop()) {
                dropClose(ul, false, false);
              }
            }

          }

        });

        /*tree view*/
        ul.querySelectorAll(".dropdown-sub [dropdown='trigger']").forEach(function (sub) {
          /*dekstop*/
          sub.addEventListener("mousemove", function (event) {
            var btn = this.parentElement;
            var self = this;
            var menus = btn.querySelector(".dropdown-menu");

            if (menus) {
              if ($sizeDekstop()) {

                subOpen(menus, btn);
              }

              document.addEventListener('mousemove', function (event) {
                var selfClose = event.target.closest('.dropdown-sub');
                var dropmenu = event.target.closest('.dropdown-menu');


                if ((dropmenu == ul || dropmenu == btn.parentElement) && (selfClose !== btn)) {
                  if (!Array.from(btn.querySelectorAll(".dropdown-sub")).some(f => selfClose === f)) {
                    if ($sizeDekstop()) {

                      subClose(menus, btn);
                    }

                  }
                }

              });
            }
          });

          /*mobile*/

          sub.addEventListener("click", function (event) {
            var btn = this.parentElement;
            var menus = btn.querySelector(".dropdown-menu");
            if (menus) {

              if ($sizeMobile()) {
                if (menus.getAttribute("open") != null) {
                  subClose(menus, btn);
                } else {
                  subOpen(menus, btn);
                }
              }
            }

          });
        });



        ul.setAttribute("stup2", true)
      }

    });

  });

}();  
