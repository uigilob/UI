!function () {

  var onopen = new CustomEvent('open', {
    detail: {
      message: 'on opend it'
    }
  });


  function dialogOpen(d, defult = false) {
    d.dispatchEvent(onopen);
    $disableScroll()
    if (!defult) {
      d.setAttribute("open", true);
      d.removeAttribute("close");
    }

    /*cnt-load*/
    var cnt_load = d.getAttribute("cnt-load-get") || d.getAttribute("cnt-load-post");

    if (cnt_load) {
      if (window.$cntload) {
        d.setAttribute("isloading", true);
        var errorE = d.querySelector("[loading-mdl]");
        errorE.querySelector(".error-mdl").style.display = 'none'
        errorE.querySelector(".loader-icon").style.display = "block";
        function success_load(status, cnt) {
          if (status == 200) {
            var swap_cnt = this.getAttribute("htp-swap") || "innerHTML";
            $parserHTML(cnt, this.querySelector(".dialog-content"), swap_cnt);
            this.removeAttribute("isloading");
            if (this.getAttribute("htp-sync") != "true") {
              this.removeAttribute("cnt-load-get");
              this.removeAttribute("cnt-load-post");

            }

          } else {
            errorE.querySelector(".icon").style.display = "none";
            errorE.querySelector(".error-mdl").style.display = "flex";

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
        var data = d.getAttribute("data");

        $cntload(d, success_load, { "data": data });
      } else {
        alert("Packages Requirements ==> $cntload");
      }
    }

  }

  var onclose = new CustomEvent('close', {
    detail: {
      message: 'on opend it'
    }
  });

  function dialogClose(d) {

    d.dispatchEvent(onclose);
    d.setAttribute("close", true);
    $enableScroll()
    d.querySelector(".dialog-card").addEventListener('animationend', function () {
      if (d.getAttribute("close") != null) {
        d.removeAttribute("open");
      }

    });

  }

  //setInterval(function () {
  document.addEventListener("evn-run", function () {
    var dialog = document.querySelectorAll(".dialog");
    dialog.forEach(function (e) {
      if (e.getAttribute("step1") == null) {
        e.setAttribute("step1", true);
        e.setAttribute("data", "");
        var modal = document.createElement("div");
        modal.className = "dialog-card";
        var cstn_h = e.querySelector(`[cnt-tag="header"]`);
        if (cstn_h == null) {
          var ti = e.getAttribute("d-title") == null ? "" : e.getAttribute("d-title");

          modal.innerHTML = `<div class="dialog-head center-tb padding-cnt">
            <div class="title h4 color">${ti}</div>
            <button class="button icon-actn"  align="icon" align-l="y"> 
             <div class="icon">    
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M12 2C6.4889971 2 2 6.4889971 2 12C2 17.511003 6.4889971 22 12 22C17.511003 22 22 17.511003 22 12C22 6.4889971 17.511003 2 12 2 z M 12 4C16.430123 4 20 7.5698774 20 12C20 16.430123 16.430123 20 12 20C7.5698774 20 4 16.430123 4 12C4 7.5698774 7.5698774 4 12 4 z M 8.7070312 7.2929688L7.2929688 8.7070312L10.585938 12L7.2929688 15.292969L8.7070312 16.707031L12 13.414062L15.292969 16.707031L16.707031 15.292969L13.414062 12L16.707031 8.7070312L15.292969 7.2929688L12 10.585938L8.7070312 7.2929688 z"/>
</svg>
             </div>
                
            </button> 
        </div>`
          //$parserHTML(head_str_p,modal,"innerHTML");
        }
        else {

          modal.append(cstn_h);
        }
        /*var dialog_content = document.createElement("div");
        dialog_content.setAttribute("scroll-br", "t");
        dialog_content.className = "dialog-content color padding-cnt"*/
        //modal.innerHTML += `<div class="dialog-content color padding-cnt" scroll-br></div>`;

        /*Array.from(e.childNodes).forEach(function (c) {
          if (c.getAttribute) {

            if (c.getAttribute("cnt-tag") != "footer") {
              dialog_content.append(c);
            }
          } else {
            dialog_content.append(c);
          }
        });*/
        //modal.append(dialog_content)
        var conten_d = e.querySelector(".dialog-content") || ""
        modal.append(conten_d);
        var cst_f = e.querySelector(`[cnt-tag="footer"]`);
        if (cst_f != null) {
          modal.append(cst_f);

        }
        var errLebel = e.getAttribute("error-label") || ""
        var loadingmdl = document.createElement("div");
        loadingmdl.setAttribute("loading-mdl", "t");
        loadingmdl.className = "padding-cnt flex center-tb center";

        loadingmdl.innerHTML = `
          <div class="icon loader-icon" >
    <svg class="spinner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M11 2.1816406L11 6L13 6L13 2.1816406L11 2.1816406 z M 7.9570312 2.9960938L6.2246094 3.9960938L8.1347656 7.3046875L9.8652344 6.3046875L7.9570312 2.9960938 z M 16.042969 2.9960938L14.134766 6.3046875L15.865234 7.3046875L17.775391 3.9960938L16.042969 2.9960938 z M 3.9960938 6.2246094L2.9960938 7.9570312L6.3046875 9.8652344L7.3046875 8.1347656L3.9960938 6.2246094 z M 20.003906 6.2246094L16.695312 8.1347656L17.695312 9.8652344L21.003906 7.9570312L20.003906 6.2246094 z M 2.1816406 11L2.1816406 13L6 13L6 11L2.1816406 11 z M 18 11L18 13L21.818359 13L21.818359 11L18 11 z M 6.3046875 14.134766L2.9960938 16.042969L3.9960938 17.775391L7.3046875 15.865234L6.3046875 14.134766 z M 17.695312 14.134766L16.695312 15.865234L20.003906 17.775391L21.003906 16.042969L17.695312 14.134766 z M 8.1347656 16.695312L6.2246094 20.003906L7.9570312 21.003906L9.8652344 17.695312L8.1347656 16.695312 z M 15.865234 16.695312L14.134766 17.695312L16.042969 21.003906L17.775391 20.003906L15.865234 16.695312 z M 11 18L11 21.818359L13 21.818359L13 18L11 18 z" />
    </svg> 
  </div>
  <div style="display:none" class="error-mdl error flex flex-col center-tb center flex-gap">
    <div class="icon">
      <svg style="fill:var(--error-color)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M22.239,18.451L13.442,3.816C13.135,3.305,12.596,3,12,3s-1.135,0.305-1.441,0.815L1.761,18.451 c-0.312,0.519-0.32,1.168-0.022,1.695C2.036,20.673,2.597,21,3.203,21h17.595c0.605,0,1.167-0.327,1.464-0.854 C22.56,19.619,22.551,18.97,22.239,18.451z M13,18h-2v-2h2V18z M13,14h-2V9h2V14z" />
      </svg>
    </div>
    <div class="error-mdl-label">${errLebel}</div>
  </div>
  `
        modal.append(loadingmdl)

        e.append(modal);


        /*defult opend is*/
        if (e.getAttribute("open")) {
          dialogOpen(e, true);
        }



        /*close*/


        var hcls = e.querySelector(".dialog-head");

        if (hcls && hcls.querySelector(".icon-actn")) {
          var x = hcls.querySelector(".icon-actn");
          x.addEventListener("click", function () {
            if (e.getAttribute("close-self") != "false") {
              dialogClose(e);
            }
          });
        }




        e.addEventListener("click", function (event) {
          if (e.getAttribute("close-self") != "false") {
            if (!e.querySelector('.dialog-card').contains(event.target) && !event.target.closest('.n-page')) {
              dialogClose(e)
            }

            /*if (e.contains(event.target)) {  //!= modal  
                document.console = event.target.closest('.dialog-card')
              //dialogClose(e)
            }*/
          }

        });

        /*  setTimeout(function(){
            $evn_load();
           },100);*/
      }

    });

    /* if(document.querySelectorAll(".dialog[step1]").length > 0){
         setTimeout(function(){
          $evn_load();
          console.log("berror")
         },100);
     }*/


    /*trigger*/

    var trigger = document.querySelectorAll(`[dialog="trigger"]`);
    trigger.forEach(function (t) {
      if (t.getAttribute("dialog-t-steup") == null) {
        t.setAttribute("dialog-t-steup", true);
        t.addEventListener("click", function () {
          var defind = this.getAttribute("dg-defind");
          var todefind = document.querySelector(`.dialog[dg-defind="${defind}"]`);
          if (todefind) {
            todefind.setAttribute("data", this.getAttribute("data"));
            dialogOpen(todefind);


          }
        });
      }

    });

  });


  function setPropert() {
    var dialogs = document.querySelectorAll(".dialog");
    dialogs.forEach(function (p) {
      if (p.getAttribute("stup-p") == null) {
        p.setAttribute("stup-p", "t")
        Object.defineProperties(p, {
          open: {
            value: function () {
              if (this.getAttribute("open") == null) {
                if (this.getAttribute("step1")) {
                  dialogOpen(this);
                  document.console = "true"
                } else {
                  this.setAttribute("open", "t");
                }
              }
            }
          },
          close: {
            value: function () {
              if (this.getAttribute("open")) {
                if (this.getAttribute("step1")) {
                  dialogClose(this);
                } else {
                  this.removeAttribute("open");
                }
              }

            }
          }
        })
      }
    })
  }



  Object.defineProperties(window, {
    $dialog: {
      value: function (element) {
        setPropert();
        return element
      }
    }
  });

}();
