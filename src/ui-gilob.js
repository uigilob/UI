 /*
Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/
https://github.com/uigilob/UI/blob/main/LICENSE
© UI-GILOB
https://github.com/uigilob/U
 */

!function () {
    Object.defineProperty(window, "$http", {
        value: {
            worker__: function (type, request, data, options) {
                var http_data = JSON.stringify(data);
                xhr_http = new XMLHttpRequest();

                if (typeof options != "object") {
                    options = {}
                    options.status = 200;
                }

                /*not status conf defulat is 200*/
                if (typeof options == "object" && options != null && !("status" in options)) {
                    options.status = 200
                }
                /*responseType*/
                if (typeof options == "object" && options != null && "responseType" in options) {
                    xhr_http.responseType = options.responseType
                }

                if (type == 'POST') {
                    xhr_http.open(type, request, true);
                }

                else if (typeof data == "object" && data != null) {
                    var urlEncodedString_from_object = Object.keys(data).map(function (k) {
                        fm = ""
                        if (data[k] instanceof Array) {
                            fm = data[k].map(function (v) { return `${encodeURIComponent(k)}=${encodeURIComponent(v)}` }).join('&');
                        }
                        else {
                            fm = `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`
                        }
                        return fm
                    }).join('&');
                    xhr_http.open(type, request + "?" + new String(urlEncodedString_from_object), true);
                }
                else {
                    xhr_http.open(type, request, true);
                }
                /*overrideMimeType*/
                if (typeof options == "object" && options != null && "overrideMimeType" in options) {
                    xhr_http.overrideMimeType(new String(options.overrideMimeType))
                }
                /*setRequestHeader*/
                if (typeof options == "object" && options != null && "headers" in options) {
                    if (typeof options.headers == "object" && options.headers != null)
                        for (k of Object.keys(options.headers)) {
                            xhr_http.setRequestHeader(new String(k), new String(options.headers[k]))
                        }
                }


                var UploadProgress = 0, Uplaod_Interval_stop = false;
                xhr_http.upload.onprogress = function (event) {


                    var progressUpdateInterval = setInterval(function () {
                        var percentComplete = (event.loaded / event.total) * 100;
                        if (percentComplete !== UploadProgress) {
                            UploadProgress = percentComplete;
                        }
                        if (xhr_http.readyState == 4) {
                            UploadProgress = 100
                            Uplaod_Interval_stop = true

                            clearInterval(progressUpdateInterval);
                        }

                    }); //Interval

                };



                var [connect, prossing_status] = [xhr_http, true];
                var data_return = {
                    uploadProgress: function (func) {
                        var UploadInterval = setInterval(function () {
                            func.call(connect, UploadProgress)
                            if (connect.readyState == 4) {

                                clearInterval(UploadInterval)
                            }
                        })
                        return data_return;
                    }, //wait
                    on: function (func) {
                        connect.addEventListener('load', func)
                        return data_return;
                    },//on
                    wait: function (func) {
                        func.call();
                        return data_return;
                    }, //wait
                    downloadProgress: function (func) {
                        var lastProgress = 0;
                        connect.onprogress = function (event) {
                            xhr = this
                            var progressUpdateInterval = setInterval(function () {
                                if (xhr.readyState === XMLHttpRequest.LOADING) {
                                    var percentComplete = (event.loaded / event.total) * 100;
                                    if (percentComplete !== lastProgress) {
                                        lastProgress = percentComplete;
                                        func.call(xhr, lastProgress, progressUpdateInterval)
                                    }
                                } else if (xhr.readyState == 4) {  //1 sec before loaded compliter
                                    lastProgress = 100
                                    func.call(xhr, lastProgress, progressUpdateInterval)
                                    clearInterval(progressUpdateInterval);

                                }
                            }); //Interval
                        }
                        return data_return;
                    }, //wait

                    done: function (func) {
                        connect.addEventListener('loadend', function () {
                            if (this.readyState === this.DONE) {
                                if (this.status === options.status) {
                                    if (prossing_status == true) {
                                        func.call(this.response, this.response, this)

                                    }
                                }
                            }
                        });
                        return data_return;
                    },//done
                    error: function (func) {
                        connect.addEventListener('loadend', function () {
                            if (!(this.status == options.status)) {
                                if (prossing_status == true) {
                                    func.call(this,this.response);
                                }
                            }
                        });
                        return data_return;
                    },//error

                }//data_return

                /*body*/
                if (typeof options == "object" && options != null && "body" in options) {
                    connect.send(options.body)
                }
                else {
                    connect.send(null);
                }

                /*set time*/

                data_return.timeOut = function (time, fun) {
                    setTimeout(function () {
                        if (!(connect.status == options.status)) {
                            if (typeof fun == "function") {
                                fun.call(connect, connect)
                            }
                            connect.abort();
                        }
                    }, time)
                    return data_return
                }

                /*cancel*/
                data_return.abort = function (fun) {
                    if (typeof fun == "function") { fun.call(connect, connect) }
                    connect.abort();
                    return data_return
                }


                return data_return;
            },//end  worker__


            get: function (request, data, options) {
                var connect = this.worker__("GET", request, data, options);
                return connect;
            },

            post: function (request, options) {
                var connect = this.worker__("POST", request, null, options);
                return connect;
            },

        }, writable: false
    });

}();



function $qs(selectors){
    return document.querySelector(selectors);
}
function $qsall(selectors){
    return document.querySelectorAll(selectors);
}

//!function(){
var  $evn_ = new CustomEvent('evn-run')
      window.addEventListener('load', function(){
         document.dispatchEvent($evn_)
     });    
//}();

function $evn_load (){
    try {
        document.dispatchEvent($evn_);
      }catch (error) {
          null
      }
}

 window.addEventListener('load', function() {
     
        var observer = new MutationObserver(function(mutationsList, observer) {
            for(var mutation of mutationsList) {
                //console.log(mutation)
                 $evn_load ()
            }
        });
  observer.observe(document, { childList: true, subtree: true });
});

window.addEventListener('load', function(){
   setTimeout(function(){
           $evn_load();
           },100); 
});

Object.defineProperties(window, {
    $arriveAdd: {
        value: function (targetSelector, callback) { /*call(element,MutationRecord])*/
        
            const observer = new MutationObserver(function(mutationsList) {
                for (const mutation of mutationsList) {
                    /* 
                     $arriveAdd(match,callback)
                     https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
                       */
                    if (mutation.addedNodes.length > 0) {
                        const addedElement = mutation.addedNodes[0];
                        if( typeof addedElement.matches == "function"){
                           if (addedElement.matches(targetSelector)) {
                               callback(addedElement,mutation);
                            }
                        }
                    }
                }
            });

            const observerConfig = {
                childList: true,
                attributes: true,
                subtree: true,
            };

            observer.observe(document, observerConfig);
        },
        writable: false
    }
});


function $disableScroll() {
    document.querySelectorAll(".d-scroll").forEach(function(disS){
        disS.classList.add("Scrollon");
    });
    document.documentElement.style.overflow = 'hidden';  // For most modern browsers
    document.body.scroll = 'no';  // For some older browsers
    
};
function $enableScroll() {
    document.querySelectorAll(".d-scroll").forEach(function(disS){
        disS.classList.remove("Scrollon");
    });
    document.documentElement.style.overflow = 'auto';
    document.body.scroll = 'yes';
};

function $sizeDekstop(){
    return 768 < window.innerWidth;
};
function $sizeMobile(){
    return 768 >= window.innerWidth;
};


function $getDeviceType() {
  const userAgent = navigator.userAgent;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    return 'Mobile';
  } else {
    return 'Desktop';
  }
};

!function () {
  document.addEventListener("DOMContentLoaded", (event) => {
    if ($getDeviceType() == "Mobile") {
      $qs("body").setAttribute("d-mb", "t");
    } else {
      $qs("body").setAttribute("d-dk", "t");
    }
  });
}();

function $parserHTML(string_, applyto, method = "append", scriptMethod = "after",styleMethod="before") {
    // Available methods: textContent, innerHTML, append, appendChild, etc.
    // Available scriptMethod: append, after, before, prepend
    // Available styleMethod: after, before, prepend
    
    var parser = new DOMParser();
    var htmlDoc = parser.parseFromString(string_, 'text/html');
    
    var scripts = document.createElement("div");
    var styles = document.createElement("div");
    
    htmlDoc.querySelectorAll("script").forEach(function (script) {
        scripts.appendChild(script);
    });

    htmlDoc.querySelectorAll("style").forEach(function (style) {
        styles.appendChild(style);
    });
    
    if (typeof applyto[method] === "function") {
        Array.from(htmlDoc.body.childNodes).forEach(function (node) {
            applyto[method](node);
        });
    } else {
        applyto[method] = htmlDoc.body[method];
    }
    
    Array.from(styles.childNodes).forEach(function (style) {
        var newStyle = document.createElement("style");
        newStyle.innerHTML = style.innerHTML;
        applyto[styleMethod](newStyle);
    });
    
    Array.from(scripts.childNodes).forEach(function (script) {
        var newScript = document.createElement("script");
        var scriptAttributes = ["async", "crossorigin", "defer", "fetchpriority", "integrity", "nomodule", "src", "text", "type"];
        
        scriptAttributes.forEach(function (attr) {
            if (script.getAttribute(attr) != null) {
                newScript.setAttribute(attr, script.getAttribute(attr));
            }
        });

        if (script.getAttribute("src") == null) {
            newScript.innerHTML = script.innerHTML;
        }
        
        applyto[scriptMethod](newScript);
    });
}


function $cntload($target__$_$, $call__$_$, scops_apply = {}, $progress_call_$,
  $upprogress_call_$) {
  //$cntload(element,success)  
  //$call__$_$.call [status = 200,300 ,300 is error],[data],[targetElement],[http],[this=targetElement]
  //scops_apply target global or local variables orgin scope is global not local caller function


  function queryParams___$_$(query__$_$ = {}, scope__$_$ = true) {

    var queryParams__$_$ = {}

    try {
      var parse__$_$ = JSON.parse(query__$_$);
      if (scope__$_$) {
        for (var [key__$_$, value__$_$] of Object.entries(parse__$_$)) {
          try {
            if (value__$_$[0] == "$") {
              if (scops_apply[value__$_$.slice(1)]) {
                parse__$_$[key__$_$] = scops_apply[value__$_$.slice(1)]
              } else {
                parse__$_$[key__$_$] = eval(value__$_$.slice(1));
              }

            }

          } catch (errorx) {
            null
          }

        }
      }

      queryParams__$_$ = parse__$_$;
    }
    catch (errorx) {
      null
    }

    return queryParams__$_$
  }

  var geth__$__$ = $target__$_$.getAttribute("cnt-load-get") || $target__$_$.getAttribute("htp-get");
  var posth__$__$ = $target__$_$.getAttribute("cnt-load-post") || $target__$_$.getAttribute("htp-post");
  var query__$__$ = $target__$_$.getAttribute("htp-query") == null ? "{}" : `${$target__$_$.getAttribute("htp-query")}`;
  var headers__$__$ = $target__$_$.getAttribute("htp-headers") == null ? "{}" : `${$target__$_$.getAttribute("htp-headers")}`;
  var status__$__$ = $target__$_$.getAttribute("htp-status") == null ? 200 : `${$target__$_$.getAttribute("htp-status")}`;

  if (geth__$__$ != null) {

    let pr__$__$ = queryParams___$_$(query__$__$);
    let he__$__$ = queryParams___$_$(headers__$__$);

    let $op__$__$ = {
      headers: he__$__$,
      status: eval(status__$__$),
      body: null
    }
    $http.get(geth__$__$, pr__$__$, $op__$__$).done(function (data__$_$, ht__$_$) {
      if (typeof $call__$_$ == "function") {
       $call__$_$.call($target__$_$,ht__$_$.status, data__$_$, ht__$_$);
      }
    })
      .downloadProgress(function ($__progress__$) {
         if(typeof  $progress_call_$ == "function"){
             $progress_call_$.call($target__$_$, $__progress__$);
         }
         
      })
      .uploadProgress(function ($_progress__$) {
          if(typeof  $upprogress_call_$ == "function"){
             $upprogress_call_$.call($target__$_$, $_progress__$)
         }
       
      })
      .error(function (data__$_$) {
        if (typeof $call__$_$ == "function") {
          $call__$_$.call($target__$_$,this.status,data__$_$,this);
        }
      });

  } 
  else if (posth__$__$ != null) {
    let pr__$__$ = queryParams___$_$(query__$__$);
    let he__$__$ = queryParams___$_$(headers__$__$);
    he__$__$["Content-Type"] = "application/json"
    let $op__$__$ = {
      headers: he__$__$,
      status: eval(status__$__$),
      body: JSON.stringify(pr__$__$)
    }

    var HTP__$_$ = $http.post(posth__$__$, $op__$__$).done(function (data__$_$, ht__$_$) {
      if (typeof $call__$_$ == "function") {
        $call__$_$.call($target__$_$,ht__$_$.status, data__$_$, ht__$_$);
      }
      // $parserHTML(data,ss("button"),"innerHTML") 

    })
      .downloadProgress(function ($__progress__$) {
          if(typeof  $progress_call_$ == "function"){
             $progress_call_$.call($target__$_$, $__progress__$);
         }
      })
      .uploadProgress(function ($_progress__$) {
        if(typeof  $upprogress_call_$ == "function"){
             $upprogress_call_$.call($target__$_$, $_progress__$)
         }
      })
      .error(function (data__$_$) {
        if (typeof $call__$_$ == "function") {
            $call__$_$.call($target__$_$, this.status,data__$_$,this);
        }
      });
  }
 
};


function $htp(scopp__$={}, optons_$={},extension__$=undefined) {
     
      var self__$ = this;
      
     //agin call is not synk 
     var $__idetfiy =  self__$.getAttribute("cnt-load-get") || self__$.getAttribute("cnt-load-post") || self__$.getAttribute("htp-get") || self__$.getAttribute("htp-post")
     
     if ($__idetfiy == null){
         return undefined
     }
    
    
     var onhtp__$ = new CustomEvent('htp-load');
     var endhtp__$ = new CustomEvent('htp-loaded');
     var htpfiald__$ = new CustomEvent('htp-fail');
     try {
        this.dispatchEvent(onhtp__$)
      } catch (er) { 
            null
        }
     function event_loaded__$(){
         try {
        this.dispatchEvent(endhtp__$)
      } catch (er) { 
            null
        } 
     }
     function event_fail__$(){
         try {
        this.dispatchEvent(htpfiald__$)
      } catch (er) { 
            null
        }
     }
  
  if (typeof optons_$ == "object") {
    for (k__$ of Object.keys(optons_$)) {
      this.setAttribute(k__$, optons_$[k__$]);
    }
  }

 

  var synk__$ = this.getAttribute("htp-sync") == "true" || undefined
  var target__$ = $qs(this.getAttribute("htp-t")) || this;
  var lder__$ = $qs(this.getAttribute("htp-ldr")) || target__$;
  var htp_data__$ = target__$.getAttribute("htp-data") || target__$.querySelector(`[htp-data]`) || target__$;
  var status_r__$ = this.getAttribute("htp-status") || 200;
  var swap__$ = this.getAttribute("htp-swap") || "innerHTML"
  var swap_s__$ = this.getAttribute("htp-swap-s") || "after"
  var agent_call__$ = this.getAttribute("htp-s") || undefined;
  var download__$ = lder__$.querySelector(`[htp-type="progress"]`) || undefined;
  var upload__$ = lder__$.querySelector(`[htp-type="progress-up"]`) || undefined;
  var download_op__$ = download__$ != null ? download__$.getAttribute("htp-type-t") || "value" : undefined;
  var upload_op__$ = upload__$ != null ? upload__$.getAttribute("htp-type-t") || "value" : undefined;


  /* upload progrss must use post reqeust*/

  target__$.setAttribute("htp-on", "t");
  lder__$.removeAttribute("htp-done");
  lder__$.removeAttribute("htp-fail");
  if (lder__$ != target__$) {
    target__$.removeAttribute("htp-done");
    target__$.removeAttribute("htp-fail");

  }
  function download_f__$(pro) {
    if (download__$ && download_op__$) {

      if (download_op__$ == "width") {
        download__$.style.width = `${pro}%`
      } else {

        download__$.value = pro;
      }
 
    }
  }
  function upload_f__$(pro) {

    if (upload__$ && upload_op__$) {

      if (upload_op__$ == "width") {
        upload__$.style.width = `${pro}%`
      } else {
        upload__$.value = pro;
      }

    }
  }
  download_f__$(0);
  upload_f__$(0)
  function onetime__$() {
    self__$.removeAttribute("cnt-load-get");
    self__$.removeAttribute("cnt-load-post");
    self__$.removeAttribute("htp-get");
    self__$.removeAttribute("htp-post")
  }
  function call_agent__$(st) {
    try {
      var fun = eval(agent_call__$);
      if (typeof fun == "function") {
        fun.call(this, this, st);
      }
    } catch (erc) {
      null;
    }
  }
  function success_load__$(status, cnt,http) {
      if(typeof extension__$ == "function")  {
          extension__$.call(this,{
              status:status,
              target:target__$,
              body:cnt,
              http:http,
              lder:lder__$,
              swap:swap__$, 
              swap_s:swap_s__$,
              htp_data:htp_data__$, //target to append to rsponse body content
              
          })
         
          return null
      }
    target__$.removeAttribute("htp-on");
    
    if (status_r__$ == status) {
      
      if (lder__$ != target__$) {
        target__$.setAttribute("htp-done", "t");
      }
      if (htp_data__$) {
        $parserHTML(cnt, htp_data__$, swap__$, swap_s__$)
      }
      lder__$.setAttribute("htp-done", "t");


      if (synk__$ == undefined) {
        onetime__$();

      }

    } else {
      event_fail__$.call(this)
      lder__$.setAttribute("htp-fail", "t");
      if (lder__$ != target__$) {
        target__$.setAttribute("htp-fail", "t");
      }
    }
    
    event_loaded__$.call(this)

    if (agent_call__$) {
      call_agent__$.call(this, status);
    }
  } 
  
  
  if (scopp__$) {
    try {
      scopp__$['self'] = self__$;
    } catch (er__$) {
      null
    }
    try {
      scopp__$['input'] = self__$.value;
    } catch (er__$) {
      null
    }
  }
  $cntload(this, success_load__$, scopp__$, function (pr) {
    download_f__$(pr)
  }, function (pr) {
    upload_f__$(pr)
  });



}; 

!function () {
    document.addEventListener("DOMContentLoaded", (event) => {
        if ($getDeviceType() == "Desktop") {
            var Myscroll = document.createElement("style");
            Myscroll.innerHTML = `
* {scrollbar-width: thin;scrollbar-color: #c2c2c2 var(--scrollbar-bg);}
::-webkit-scrollbar-button {display: none; }
::-webkit-scrollbar { width:var(--scrollbar-width); background:var(--scrollbar-bg);}
::-webkit-scrollbar-thumb:hover {background:#c2c2c2;}
::-webkit-scrollbar-thumb:active {background:#c2c2c2;  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.6);}
::-webkit-scrollbar-thumb {background: #c2c2c2; border-radius: 35px;}

`;
            var head = $qs("head");
            if (head) {
               head.append(Myscroll);
            }
      
        }    
    });

}();


function $d_pinchZoom() { /*mobile only*/
    if ($getDeviceType() == "Mobile") {
        document.addEventListener('touchmove', function (event) {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        }, { passive: false });
        document.addEventListener('touchstart', function (event) {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        }, { passive: false });
    }
};

function $reactFrom(from, to) {

    var parent = from.getBoundingClientRect();
    var child = to.getBoundingClientRect();

    var createReact = {
        top: (child.top - parent.top),
        bottom: (parent.bottom - child.bottom),
        left: (child.left - parent.left),
        right: (parent.right - child.right),
        x: (child.left - parent.left),
        y: (child.top - parent.top)
    }

    var top_p = ((child.top - parent.top) / parent.height) * 100;
    var bottom_p = ((parent.bottom - child.bottom) / parent.height) * 100;
    var left_p = ((child.left - parent.left) / parent.width) * 100;
    var right_p = ((parent.right - child.right) / parent.width) * 100;
    function pr_min_max() {
        return Math.min(100, Math.max(0, this));
    }
    createReact.percenTop = pr_min_max.call(top_p);
    createReact.percenBottom = pr_min_max.call(bottom_p)
    createReact.percenLeft = pr_min_max.call(left_p)
    createReact.percenRight = pr_min_max.call(right_p)

    return createReact
}
function $isVisible(to, from = window) {
    var rect = to.getBoundingClientRect();
    var windowHeight = (from.innerHeight || from.clientHeight);
    var windowWidth = (from.innerWidth || from.clientWidth);

    if (from != window) {
        var rect2 = $reactFrom(from, to);
        return rect2.top > 0 && rect2.bottom > 0 && rect2.left > 0 && rect2.right > 0
    } else {
        return rect.top < windowHeight && rect.bottom > 0 && rect.left < windowWidth && rect.right > 0
    }





}
function $Visibility(from, to) {
    document.addEventListener("DOMContentLoaded", function () {
        var rect = $reactFrom(from, to);
        var Visible_now = new CustomEvent('visible-now');
         var top = rect.top+from.scrollTop 
        var left = rect.left+from.scrollLeft;
        from.scroll({ top: top, left:left, behavior: "smooth", });
        to.dispatchEvent(Visible_now)
      
    });

}     

function $cmd(key,conditions=false,prevent=false,call_back){
     //$cmd("S","shiftKey,ctrlKey",false,function(){})
     //$cmd("d","ctrlKey",false,function(){})
    window.addEventListener('keydown', function(event) {
       
        if(conditions){   
            var conditionMet = conditions.split(",").every(function(condition) {
                return event[condition.trim()];
            });     
            
           if(conditionMet && event.key == key){
               if(typeof call_back == "function"){
                   call_back.call(event,event);
               }
               if(prevent == true){
                event.preventDefault();
              }
           }
           
        }else{
           if(event.key == key){
             if(typeof call_back == "function"){
                   call_back.call(event,event);
               }
             if(prevent == true){
                event.preventDefault();
              }
         } 
        } 
         
    })
    
}



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



 !function () {
  Object.defineProperties(window, {
    $action_btm: {
      value: function (element) {
        var mbs = document.querySelectorAll('mobile[form="bottom-bar"]');
        mbs.forEach(function (e) {
          if (e.getAttribute("setup-properties-public") == null) {
            Object.defineProperties(e, {

              onclose: {
                value: function (caller = function () { }) {
                  var s = this
                  const i = setInterval(function () {
                    if (s.getAttribute("setup-properties") == "true") {
                      s.Ponclose(caller);
                      clearInterval(i)
                    }
                  });

                }
              },

              close: {
                value: function (caller = function () { }) {
                  var s = this
                  const i = setInterval(function () {
                    if (s.getAttribute("setup-properties") == "true") {
                      s.Pclose(caller);
                      clearInterval(i)
                    }
                  });
                }
              },

              show: {
                value: function () {
                  var s = this
                  if (s.getAttribute("setup-properties") == "true") {
                    s.Pshow();
                  } else {
                    const i = setInterval(function () {
                      if (s.getAttribute("setup-properties") == "true") {
                        s.Pshow();
                        clearInterval(i)
                      }
                    });
                  }


                }
              }

            });
            e.setAttribute("setup-properties-public", true)
          }


        });

        return element
      },
      writable: false
    }
  });

  //setInterval(function () {
document.addEventListener("evn-run",function() {
    /*setup 1*/
    var action_steup1 = document.querySelectorAll('mobile[form="bottom-bar"]');
    action_steup1.forEach(function (e) {
      if (e.getAttribute("setup-setup1") == null) {
        e.setAttribute("setup-setup1", true);
        e.setAttribute("none-scroll", null);


        var Content_agent = e.innerHTML;

        var viewOne = document.createElement('test')

        var setup_cnt = `<div mobile-view-none mobile-hidden></div> 
                 <div mobile-view-none last> 
                <div  mobile-view-cnt none-scroll overflow="${e.getAttribute("overflow")}"> 
                  
                  </div></div> 
                `
        viewOne.innerHTML = setup_cnt 
        var append_orgin = viewOne.querySelector("[mobile-view-cnt]")
        Array.from(e.childNodes).forEach(function (e2) {
          append_orgin.append(e2)
        });
        Array.from(viewOne.childNodes).forEach(function (e2) {
          e.append(e2)
        });


        var optn_hight = e.getAttribute("max-height");

        if (optn_hight && new String(optn_hight).includes("%")) {
          e.querySelector('[mobile-view-none][last]').style.cssText += `max-height:${optn_hight}`

        }
        e.setAttribute("ui-setup", true);
      }
    });

    /*Setup 2*/

    var action_steup2 = document.querySelectorAll('mobile[form="bottom-bar"][ui-setup="true"]');
    /*Properties setup Privtes*/
    action_steup2.forEach(function (e) {
      if (e.getAttribute("setup-properties") == null) {
        Object.defineProperties(e, {

          Ponclose: {
            value: function (caller) {
              let self = this, ch_s = this.scrollTop
              let close_bar = this.querySelectorAll("[mobile-view-none]")[1];
              if (caller instanceof Function) {
                /*close_bar.onclick = function (event) {
                    
                  caller.call(self, event)
                  self.setAttribute("close-event", "click-hide")
                  event.preventDefault();

                };*/ 
                self.addEventListener("click",function(event){
                    
                    if(!event.target.closest('[mobile-view-cnt]')){
                       caller.call(self, event);
                       /*if( self.getAttribute("show-event") == "true"){*/
                           self.setAttribute("close-event", "click-hide")
                      // }
                       
                    }
                });

                self.onscroll = function (event) {
                  if (this.getAttribute('show-event-onshide') == "true") {
                    var scrollUp = (this.scrollTop / (this.scrollHeight - this.clientHeight)) * 100;
                    if (scrollUp < 50) {
                      self.setAttribute("close-event", null)
                      caller.call(self, event)

                    }
                    ch_s = this.scrollTop
                  }


                }
              }

            }
          },

          Pclose: {
            value: function (caller) {
              let cnt_el = this.querySelector("[mobile-view-cnt]");
              var self = this;
              cnt_el.setAttribute("show-event", self.getAttribute("close-event"));
              this.removeAttribute("show-event-onshide", null);
              setTimeout(function () {
                caller.call(self)
              }, 290);

            }
          },

          Pshow: {
            value: function () {
              this.style.display = "block"

              this.scrollTop = this.scrollHeight;
              var self = this;


              let cnt_el = this.querySelector("[mobile-view-cnt]");
              cnt_el.setAttribute("show-event", true);

              setTimeout(function () {
                self.setAttribute("show-event-onshide", true);

              }, 100);

            }
          }


        });
        e.setAttribute("setup-properties", true);
      }


    });

  })

}();


!function () {
    var promote = {
        success: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11,16.4l-4.7-4.7l1.4-1.4l3.3,3.3l8.4-8.4C17.5,3.3,14.9,2,12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10 c0-1.9-0.5-3.6-1.4-5.1L11,16.4z"/>
</svg>`,
        primary: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 3L18 5L11 8L11 16L18 19L19 21L21 21L21 13.728516 A 2 2 0 0 0 22 12 A 2 2 0 0 0 21 10.269531L21 3L19 3 z M 5 8C3.9 8 3 8.9 3 10L3 14C3 15.1 3.9 16 5 16L7 16L7 21L9 21L9 14L9 8L5 8 z"/></svg> 
` ,
        error: ` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
<path d="M22.239,18.451L13.442,3.816C13.135,3.305,12.596,3,12,3s-1.135,0.305-1.441,0.815L1.761,18.451 c-0.312,0.519-0.32,1.168-0.022,1.695C2.036,20.673,2.597,21,3.203,21h17.595c0.605,0,1.167-0.327,1.464-0.854 C22.56,19.619,22.551,18.97,22.239,18.451z M13,18h-2v-2h2V18z M13,14h-2V9h2V14z"/></svg>
`,
        warning: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M12,1L3,5c0,0,0,4,0,6c0,7.83,6.439,11.486,9,12c2.561-0.514,9-4.17,9-12c0-2,0-6,0-6L12,1z M13,18h-2v-2h2V18z M13,14h-2V6 h2V14z"/>
</svg>`

    }

    var promote_key = ["success", "error", "primary", "warning"];
    var placement_key = ["top", "bottom"]

    var alertSet = () => {
        var pop_contner = $qs("[alert-pop]");
        if (pop_contner == null) {
            var push = document.body || $qs("html");
            var np = document.createElement("div");
            np.setAttribute("alert-pop", "t");
            np.className = "pf p-cnt-r p-cnt-l  flex flex-col gap-l-f center  center-tb";
            push.append(np);

        }
    }

    var ondisplayed = new CustomEvent('display');
    var onclose = new CustomEvent('close');

    var closealert = function (byBtn) {

        if (byBtn == undefined) {

            this.addEventListener("animationend", function () {
                if (this.getAttribute("displayd")) {
                    this.dispatchEvent(onclose);
                    this.remove();
                    var c = $qs("[alert-pop]");
                    if (c.querySelector(".alert") == null) { /*no alert this time or more displayd*/
                        c.removeAttribute("open")
                    }
                }
            });
        }
        else {

            this.remove()
            var c = $qs("[alert-pop]");
            if (c.querySelector(".alert") == null) { /*no alert this time or more displayd*/
                c.removeAttribute("open")
            }
        }
    }
    var openalert = function (options) {
        this.setAttribute('open', "t");
        this.addEventListener("animationend", function () {
            if (this.getAttribute("displayd") == null) {
                if (this.getAttribute("auto-sleep") == null) {
                    if (this.getAttribute("delay")) { /*after close*/
                        this.style.cssText = `animation-delay:${this.getAttribute("delay")}`
                    }
                    this.dispatchEvent(ondisplayed);
                    this.setAttribute("displayd", "t");

                    closealert.call(this);
                }

            }
        });
    }

    function Falert(message, prompt, options) {
        alertSet();
        var container = $qs("[alert-pop]");
        var a = document.createElement("div");
        a.className = "alert padding-card-x-e b-radius h10  flex-l-c-r  gap-l-f center  center-tb"
        a.innerHTML = `
      <div class="icon"></div>
      <div class="center"></div>
      <button alert-c="n" class="right button" align="icon" align-l="y"> 
                    <div class="icon" style="fill:var(--color-surface);">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M12 2C6.4889971 2 2 6.4889971 2 12C2 17.511003 6.4889971 22 12 22C17.511003 22 22 17.511003 22 12C22 6.4889971 17.511003 2 12 2 z M 12 4C16.430123 4 20 7.5698774 20 12C20 16.430123 16.430123 20 12 20C7.5698774 20 4 16.430123 4 12C4 7.5698774 7.5698774 4 12 4 z M 8.7070312 7.2929688L7.2929688 8.7070312L10.585938 12L7.2929688 15.292969L8.7070312 16.707031L12 13.414062L15.292969 16.707031L16.707031 15.292969L13.414062 12L16.707031 8.7070312L15.292969 7.2929688L12 10.585938L8.7070312 7.2929688 z"/>
</svg></div></button>
      `
        var type = promote[prompt] || promote["primary"];
        var k = promote_key.includes(prompt) == true ? prompt : "primary";
        var m = message || ""

        a.setAttribute("promote", k);
        a.querySelector(".icon").innerHTML = type;
        var mc = a.querySelector(".center");
        $parserHTML(new String(m), mc, "innerHTML");

        //container.removeAttribute("placement");

        /*options*/
        if (typeof options == "object") {
            if (options.sleep == false) {
                a.setAttribute("auto-sleep", "true"); /*not close auto close by button*/
            }
            if (options.display) {
                a.setAttribute("delay", options.display);
            }
            var placement = options.placement;
            if (placement && placement_key.includes(placement)) {
                container.setAttribute("placement", placement);
            }
        }

        if (container) {
            container.setAttribute("open", "t");
            container.append(a);
            openalert.call(a);


            /*close by buton*/
            a.querySelector("[alert-c]").addEventListener("click", function () {
                closealert.call(this.parentElement, true)
            });


            return a
        }


    }
    Object.defineProperties(window, {
        $alert: {
            value: function (message, prompt, options) {
                return Falert(message, prompt, options);
            }
        }

    });

}();



!function () {
 // setInterval(function () {
 document.addEventListener("evn-run",function() {
    var breadcrumbs = $qsall(".breadcrumbs");
    breadcrumbs.forEach(function (e) {
      if (e.getAttribute("set-breadcrumbs") == null) {
        e.setAttribute("set-breadcrumbs", "t");
        e.classList.add += " flex f-wrap gap-l-f center-tb";
        var home = e.getAttribute("bread-h-label") || "Home";
        var url = new URL(
          window.location.href
        );

        var parts = url.pathname.split("/").slice(1);
        var hostname = `${url.protocol}//${url.hostname}`;

        var bread = `<a href="${hostname}">${home}</a>`;

        if (parts.length > 0) {
          parts.forEach(function (p, i) {

            if (parts.length == i + 1) {  /*last*/

              bread += `
       <div class="flex breadcrumbs-p center-tb center">
       <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M10 5.9296875L8.5 7.4296875L13.070312 12L8.5 16.570312L10 18.070312L16.070312 12L10 5.9296875 z"/>
</svg></div>
       <a last="" href="${url}">${decodeURI(p)}</a></div>`
            } else {
              var isb = parts.slice(0, i + 1).join("/")

              bread += `
      <div class="flex breadcrumbs-p center-tb center">
      <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M10 5.9296875L8.5 7.4296875L13.070312 12L8.5 16.570312L10 18.070312L16.070312 12L10 5.9296875 z"/>
</svg></div>
      <a  href="${hostname}/${isb}">${decodeURI(p)}</a>
      </div>
      `
            }

          })
        } else {
          bread = `<a last="" href="${url}">${home}</a>`
        }

        e.innerHTML = bread




      }


    });
  });
}();


!function () {
  //setInterval(function () {
  document.addEventListener("evn-run",function(){
 // window.addEventListener("load",function(){
    var buttons = $qsall(".button");
    if (buttons.length > 0){
        buttons.forEach(function (b,it) {
      if (b.getAttribute(`btn-setup`) == null || !(b['btn-setup'])) {
        //b.classList.remove("button")
        
         b.setAttribute(`btn-setup`, "t")
         Object.defineProperty(b,"btn-setup",{value:true});
         
         
        var btn_Loder = document.createElement("div");
        btn_Loder.setAttribute("btn-loader", "t");
        btn_Loder.className = "pa center center-tb p0";
        var label = b.getAttribute("label") || ""
        btn_Loder.innerHTML = `
          <div>${label}</div>
          <div class="icon spinner">
         <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
         <path d="M11 2.1816406L11 6L13 6L13 2.1816406L11 2.1816406 z M 7.9570312 2.9960938L6.2246094 3.9960938L8.1347656 7.3046875L9.8652344 6.3046875L7.9570312 2.9960938 z M 16.042969 2.9960938L14.134766 6.3046875L15.865234 7.3046875L17.775391 3.9960938L16.042969 2.9960938 z M 3.9960938 6.2246094L2.9960938 7.9570312L6.3046875 9.8652344L7.3046875 8.1347656L3.9960938 6.2246094 z M 20.003906 6.2246094L16.695312 8.1347656L17.695312 9.8652344L21.003906 7.9570312L20.003906 6.2246094 z M 2.1816406 11L2.1816406 13L6 13L6 11L2.1816406 11 z M 18 11L18 13L21.818359 13L21.818359 11L18 11 z M 6.3046875 14.134766L2.9960938 16.042969L3.9960938 17.775391L7.3046875 15.865234L6.3046875 14.134766 z M 17.695312 14.134766L16.695312 15.865234L20.003906 17.775391L21.003906 16.042969L17.695312 14.134766 z M 8.1347656 16.695312L6.2246094 20.003906L7.9570312 21.003906L9.8652344 17.695312L8.1347656 16.695312 z M 15.865234 16.695312L14.134766 17.695312L16.042969 21.003906L17.775391 20.003906L15.865234 16.695312 z M 11 18L11 21.818359L13 21.818359L13 18L11 18 z"/>
         </svg>
         </div>
          `
        b.append(btn_Loder);

        b.addEventListener("click", function () {
          if (this.getAttribute("disabled") == null && this.getAttribute("isloading") == null) {
            if ($getDeviceType() == "Mobile") {
              this.setAttribute("mb-a-btn", "t");
              this.addEventListener('animationend', function () {
                this.removeAttribute("mb-a-btn");
              });
            } else {
              this.setAttribute("dk-a-btn", "t");
              var self = this
              setTimeout(function () {
                self.removeAttribute("dk-a-btn");
              }, 100)
            }
          }


        })


      }
    });
    }
   

   
  },100);
}();    



!function () {
   var success = new CustomEvent('clip-success');
   var success_after = new CustomEvent('clip-after');
   var faild = new CustomEvent('clip-error');

   var clipsuccess = function () {
      this.dispatchEvent(success);
      this.setAttribute("clip-new", "t");
      var self = this;
      var ir = this.querySelector(`[icon-clip="r"]`);
      if (ir) {
         ir.addEventListener('animationend', function () {
            self.removeAttribute("clip-new");
            self.dispatchEvent(success_after);
         });
      }

   }

   var cliperror = function () {
      this.dispatchEvent(faild);;
   }

   //setInterval(function () {
document.addEventListener("evn-run",function() {
      var clipB = $qsall(".clip-b");
      clipB.forEach(function (e, index) {
         if (e.getAttribute("clip-set") == null) {
            e.setAttribute("clip-set", "t");
            e.innerHTML = `
           <div class="icon">
    <svg icon-clip="c" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
   <path d="M4 2C2.895 2 2 2.895 2 4L2 18L4 18L4 4L18 4L18 2L4 2 z M 8 6C6.895 6 6 6.895 6 8L6 20C6 21.105 6.895 22 8 22L20 22C21.105 22 22 21.105 22 20L22 8C22 6.895 21.105 6 20 6L8 6 z M 8 8L20 8L20 20L8 20L8 8 z"/>
</svg>  
<svg icon-clip="r" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
<path d="M20.292969 5.2929688L9 16.585938L4.7070312 12.292969L3.2929688 13.707031L9 19.414062L21.707031 6.7070312L20.292969 5.2929688 z"/>
</svg>
 </div>
    `
            e.addEventListener("click", function () {
               var data = undefined;
               var sd = e.getAttribute("clip-b-d");
               if (sd) {
                  data = sd
               } else if (e.getAttribute("clip-b-t")) { /*target element*/
                  var tr = $qs(e.getAttribute("clip-b-t"));
                  var tr_e = $qsall(e.getAttribute("clip-b-t"));
                  var vl = e.getAttribute("clip-b-v") || "value"
                  var follow = e.getAttribute("clip-b-e");
                  if (follow == "index") {
                     var each_clp = tr_e[index];
                     if (each_clp && each_clp[vl]) {
                        data = each_clp[vl]
                     }
                  }
                  else {
                     if (tr && tr[vl]) {
                        data = tr[vl]
                     }
                  }
               }



               if (navigator.clipboard && navigator.clipboard.write && data) {
                  try {
                     navigator.clipboard.write([new ClipboardItem({ "text/plain": new Blob([data], { type: "text/plain" }) })]).then(function () {
                        clipsuccess.call(e);
                     }).catch(function (error) { cliperror.call(e) });
                  } catch (err) {
                     cliperror.call(e);
                  }


               } else if (navigator.clipboard && navigator.clipboard.writeText && data) { /*firefox mozilla*/

                  try {
                     navigator.clipboard.writeText(data).then(function () {
                        clipsuccess.call(e);
                     }).catch(function (error) { cliperror.call(e) });
                  } catch (err) {

                     cliperror.call(e);
                  }

               }
               else {
                  cliperror.call(e);
               }

            });

         }
      });
   });

}(); 



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



!function () {
   // setInterval(function () {
    document.addEventListener("evn-run",function() {
        var img_Load = $qsall(".img-load");
        img_Load.forEach(function (e) {
            if (e.getAttribute("set-img-load") == null) {
                e.setAttribute("set-img-load", "t");
                var img = e.querySelector("img");

                if (img) {
                    if (img.complete) {
                        e.classList.remove("img-load");
                    } else {
                        img.addEventListener("load", function () {
                            e.classList.remove("img-load");
                        });
                        img.addEventListener("error", function () {
                            e.classList.remove("img-load");
                            e.innerHTML = `<svg  fill="var(--color-surface-container)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M2.6699219 1.1503906L1.2558594 2.5664062L2.9785156 4.2890625C2.3945091 4.6381888 2 5.2697837 2 6L2 18C2 19.105 2.895 20 4 20L18.689453 20L20.78125 22.091797L22.195312 20.677734L2.6699219 1.1503906 z M 8.3300781 4L22 17.669922L22 6C22 4.895 21.105 4 20 4L8.3300781 4 z M 18 8C18.552 8 19 8.448 19 9C19 9.552 18.552 10 18 10C17.448 10 17 9.552 17 9C17 8.448 17.448 8 18 8 z M 8.4980469 12.501953L11 15.509766L12.398438 13.708984L15.689453 17L5 17L8.4980469 12.501953 z"/>
</svg>`
                        });
                    }

                }
            }
        })
    })
}();



!function () {
  //  setInterval(function () {
   document.addEventListener("evn-run",function() {
        var loader = document.querySelectorAll("[loader]");
        loader.forEach(function (load) {
            if (load.getAttribute("steup") == null) {
                load.setAttribute("steup", true);
                var l = load.getAttribute("label")
                var label = l == null ? "" : l
                load.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M11 2.1816406L11 6L13 6L13 2.1816406L11 2.1816406 z M 7.9570312 2.9960938L6.2246094 3.9960938L8.1347656 7.3046875L9.8652344 6.3046875L7.9570312 2.9960938 z M 16.042969 2.9960938L14.134766 6.3046875L15.865234 7.3046875L17.775391 3.9960938L16.042969 2.9960938 z M 3.9960938 6.2246094L2.9960938 7.9570312L6.3046875 9.8652344L7.3046875 8.1347656L3.9960938 6.2246094 z M 20.003906 6.2246094L16.695312 8.1347656L17.695312 9.8652344L21.003906 7.9570312L20.003906 6.2246094 z M 2.1816406 11L2.1816406 13L6 13L6 11L2.1816406 11 z M 18 11L18 13L21.818359 13L21.818359 11L18 11 z M 6.3046875 14.134766L2.9960938 16.042969L3.9960938 17.775391L7.3046875 15.865234L6.3046875 14.134766 z M 17.695312 14.134766L16.695312 15.865234L20.003906 17.775391L21.003906 16.042969L17.695312 14.134766 z M 8.1347656 16.695312L6.2246094 20.003906L7.9570312 21.003906L9.8652344 17.695312L8.1347656 16.695312 z M 15.865234 16.695312L14.134766 17.695312L16.042969 21.003906L17.775391 20.003906L15.865234 16.695312 z M 11 18L11 21.818359L13 21.818359L13 18L11 18 z"/>
</svg>
<div inline="true"></div>
<div label="null">${label}</div>
        `
            }
        });
    });

}(); 



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



!function () {
  function adjustVisibility(contents, self, event) {
    /*position:absolute or right: 0; in css*/

    var btn = self.getBoundingClientRect();
    contents.style.bottom = "auto"
    contents.style.right = "auto"
    contents.style.top = `${event.clientY}px`
    contents.style.left = `${event.clientX}px`
    var re2 = contents.getBoundingClientRect();

    if (re2.right >= window.innerWidth) {
      contents.style.left = "auto"
      contents.style.right = `${btn.width}px`
    }
    var re3 = contents.getBoundingClientRect();
    if (re3.bottom > window.innerHeight) {
      contents.style.top = `${btn.top - re3.height}px`
      var adjust = contents.getBoundingClientRect();
      if (adjust.top < 0) {
        contents.style.top = "1px";

      }
    }
  }

  function popopen(event) {
    var pop = $qs('[pop-t-o]');
    var delay = this.getAttribute("pop-t-d");
    var title = this.getAttribute("pop-t") || "";
    pop.textContent = title
    if (delay) {
      pop.style.cssText += `animation-delay:${delay};`
    } else {
      pop.style.cssText += `animation-delay: 400ms;`
    }
    pop.setAttribute("open", "t");
    adjustVisibility(pop, this, event);
  }

  function popleave() {
    var pop = $qs('[pop-t-o]');
    pop.removeAttribute("open");

  }

  function popSet() {

    var pop = $qs('[pop-t-o]');
    if (pop == null) {

      var np = document.createElement("div");
      np.setAttribute("pop-t-o", "n")
      np.className = "pf center center-tb padding-cnt h11 b-radius over-x-adjust border";
      var push = document.body || $qs("html");
      push.appendChild(np);
    }

  }

  //setInterval(function () {
   document.addEventListener("evn-run",function() {
    var popT = $qsall("[pop-t]");
    popT.forEach(function (e) {
      if (e.getAttribute("pop-t-set") == null) {
        e.setAttribute("pop-t-set", "n")
        popSet();

        e.addEventListener("mouseenter", function (event) {
          popopen.call(this, event);

        });

        e.addEventListener("mouseleave", function (event) {
          popleave.call(this);

        });
        e.addEventListener("click", function (event) {
          popleave.call(this);

        })
      }

    });
  });

}();



!function () {
    function foucs(from, to) {
        var rect = $reactFrom(from, to);
        var top = rect.top + from.scrollTop
        var left = rect.left + from.scrollLeft;
        from.scroll({ top: top, left: left, behavior: "smooth", });

    }
    function active(btn, foused = true) {
        btn.setAttribute("tab-active", "t");
        var t = $qs(btn.getAttribute("tab-t")) || undefined
        var isspy = $qs(this.getAttribute("tab-spy")) || undefined
        if (isspy) {
            t = isspy
        }
        if (!foused) {
            var self_spy = this.getAttribute("self-spy");
            var self_f = self_spy == "self" ? this : $qs(self_spy);
            if (self_f) {
                foucs(self_f, btn);
            }

        }
        if (t) {
            t.setAttribute("tab-active", "t");
            var focus = btn.getAttribute("tab-f-t");
            if (focus && foused) {
                foucs(t, t.querySelector(focus));
            }
        }
        try {
            var tab_chnage = new CustomEvent('change');
            var label = btn.getAttribute("tab-label");
            label == null ? tab_chnage.label = null : tab_chnage.label = label
            this.dispatchEvent(tab_chnage);
        } catch (err_) {
            null;
        }

        var collps = Array.from(this.querySelectorAll(".tab")).filter(t => t != btn);
        collps.forEach(function (rm) {
            rm.removeAttribute("tab-active");
            var t2 = $qs(rm.getAttribute("tab-t")) || undefined;
            if (t2) {
                t2.removeAttribute("tab-active");
            }
        })

    }

   // setInterval(function () {
document.addEventListener("evn-run",function() {
        var tabs = $qsall(".tabs");
        tabs.forEach(function (e) {
            if (e.getAttribute("set-tabs") == null) {
                e.setAttribute("set-tabs", "t");


                var btntab = e.querySelectorAll(".tab");


                btntab.forEach(function (e2) {
                    var event = e2.getAttribute("tab-e") || "click";
                    e2.addEventListener(event, function () {
                        active.call(e, this);
                    });

                    e2.getAttribute("tab-d") != null ? active.call(e, e2) : false;

                });

                if (e.getAttribute("tabs-url") == "hash") {
                    //window.addEventListener('hashchange',function(){
                    var match = e.querySelector(`[href="${window.location.hash}"]`);
                    match != null ? active.call(e, match) : null;
                    //});
                }
                var scrollspy = $qs(e.getAttribute("scrollspy"));
                if (scrollspy) {
                    scrollspy.addEventListener("scroll", function () {
                        var tf = e.querySelectorAll(".tab[tab-f-t]");
                        var t_f = Array.from(tf).map((g) => g.getAttribute("tab-f-t"));


                        for (sp of t_f) {
                            var s = scrollspy.querySelector(sp);
                            var saw = scrollspy.getBoundingClientRect().height
                            if (s) {
                                if ($reactFrom(scrollspy, s).bottom < saw) {
                                    var btn2 = e.querySelector(`[tab-f-t="${sp}"]`);
                                    if (btn2) {
                                        active.call(e, btn2, false);
                                        break;
                                    }

                                }
                            }

                        }


                    })
                }

            }
        });
    });

}();



!function () {
    //setInterval(function () {
     document.addEventListener("evn-run",function() {
        var back_tabs = $qsall(`[nav-tb="head"]`);
        back_tabs.forEach(function (t) {
            if (t.getAttribute("set-nav-tb") == null) {
                t.setAttribute("set-nav-tb", "t")
                t.className += " flex center-tb gap-l-f";
                var label = t.innerHTML;
                t.innerHTML = ` <button class="button" align="icon" align-l="y"> 
                         <div class="icon" style="--fill:var(--color)">
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13 5.9296875L6.9296875 12L13 18.070312L14.5 16.570312L9.9296875 12L14.5 7.4296875L13 5.9296875 z"/></svg>
    </div>
</button>
<div class="f-auto">${label}</div>
                           `
                t.querySelector(".button").addEventListener("click", function () {
                    var tg = this.parentElement.parentElement;
                    if (tg) {
                        tg.removeAttribute("tab-active");

                        var tab = $qs(`[tab-t="${tg.getAttribute('nav-tb-t')}"]`);
                        if (tab) {
                            tab.removeAttribute("tab-active");
                        }

                    }

                })

            }
        });
        var s_cnt = $qsall(`[nav-tb="cnt"]`);
        s_cnt.forEach(function (c) {
            if (c.getAttribute("set-nav-tb-c") == null) {
                c.setAttribute("set-nav-tb-c", "t");
                c.className += " d-scroll"
            }
        })

        var child_i = $qsall('.tabstack-gp .tab');
        child_i.forEach(function (r) {
            if (r.getAttribute("set-setting-i-r") == null) {
                r.setAttribute("set-setting-i-r", "t")
                r.innerHTML += ` <div class="icon pl-right" nav-tb="child-s" style="fill:var(--color)">
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M10 5.9296875L8.5 7.4296875L13.070312 12L8.5 16.570312L10 18.070312L16.070312 12L10 5.9296875 z"/>
</svg> 
                      </div>`
            }
        })
    });

    window.addEventListener("resize", function () {
        if ($qsall("[tab-t][tab-active]").length == 0) {
            var def = $qs("[tab-d]");
            if (def && $sizeDekstop() && $getDeviceType() == "Desktop") {
                if (typeof def.click == "function") {
                    def.click();
                }
            }
        }
    })
}();



!function () {
  var endScroll = new CustomEvent('endscroll');
  var endScroll_x = new CustomEvent('endscroll-x');
  var topScroll = new CustomEvent('topscroll');
  var scrollTop = new CustomEvent('scrolltop');
  var topscroll_x = new CustomEvent('topscroll-x');
  var scroll_x_top = new CustomEvent('scroll-x-top');
  function endScroll_() {
    this.addEventListener("scroll", function () {
      const scrollableHeight = this.scrollHeight - this.clientHeight;
      const scrolledHeight = this.scrollTop;
      const threshold = this.getAttribute("b-hold") || 50;

      if (scrollableHeight - scrolledHeight <= threshold) {
        this.dispatchEvent(endScroll)
      }
    })
  }
  function endScroll_x_() {
    this.addEventListener("scroll", function () {
      const threshold = this.getAttribute("b-hold") || 50;
      const maxScrollableX = this.scrollWidth - this.clientWidth;
      if (maxScrollableX - this.scrollLeft <= threshold) {
        this.dispatchEvent(endScroll_x)
      }
    })

  }
  function topscroll_x_() {
    this.addEventListener("scroll", function () {
      const threshold = this.getAttribute("b-hold") || 50;
      if (this.scrollLeft <= threshold) {
        this.dispatchEvent(topscroll_x);
      }
    })

  }
  function scroll_x_top_() {
    this.addEventListener("scroll", function () {
      const threshold = this.getAttribute("b-hold") || 50;
      if (this.scrollLeft > threshold) {
        this.dispatchEvent(scroll_x_top);
      }
    })

  }
  function topscroll_(top) {
    this.addEventListener("scroll", function () {
      const threshold = this.getAttribute("b-hold") || 50;

      if (top) { /*scrolltop*/
        if (this.scrollTop > threshold) {
          this.dispatchEvent(scrollTop)
        }
      } else {  /*topscroll*/
        if (this.scrollTop <= threshold) {
          this.dispatchEvent(topScroll)
        }
      }

    });
  }
  function Bounding_react() {
    this.addEventListener("scroll", function () {
      var self = this;
      this.querySelectorAll(`[b-event-rect="scroll"]`).forEach(function (child) {
        var scrollRect = new CustomEvent('scroll-rect');
        scrollRect.getRect = function () {
          return $reactFrom(self, child);
        }

        child.dispatchEvent(scrollRect);
      });

    })
  }
  setInterval(function () {
    var bindEvent = $qsall("[b-event]")
    bindEvent.forEach(function (e) {
      var event = e.getAttribute("b-event")
      if (e.getAttribute("set-b-event") == null) {
        e.setAttribute("set-b-event", 't')
        switch (event) {
          case "endscroll":
            endScroll_.call(e)
            break;
          case "endscroll-x":
            endScroll_x_.call(e)
            break;
          case "topscroll-x":
            topscroll_x_.call(e)
            break;
          case "scroll-x-top":
            scroll_x_top_.call(e)
            break;
          case "topscroll":
            topscroll_.call(e)
            break;
          case "scrolltop":
            topscroll_.call(e, true)
            break;
          case "rect-parent":
            Bounding_react.call(e)
            break;
        }
      }
    })
  });
}();



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



!function () {
  Object.defineProperties(this, {
    $checkbox: {
      value: function (elemnts) {
        var list = [];
        if (elemnts instanceof NodeList || elemnts instanceof Array) {
          list = Array.from(elemnts)
        } else {
          elemnts instanceof HTMLInputElement ? list.push(elemnts) : null
        }

        var prop = {
          checked: function () {
            return list.filter(function (c) {
              if (c.checked) {
                return c
              }
            });
          },
          change: function (caller = function () { }) {
            list.forEach(function (e) {
              e.addEventListener("change", function (event) {
                caller.call(this, this, list, event)
              });
            });
            return list
          }
        }
        return prop
      },
      writable: false
    }
  });
}();



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



void function () {
    function adjustVisibility(contents, self) {
        /*position:absolute or right: 0; in css*/
        contents.style.top = `${self.getBoundingClientRect().height + 3}px`
        contents.style.left = 0;
        var window_over = contents.getBoundingClientRect();
        if (window_over.bottom > window.innerHeight && (contents.getBoundingClientRect().height + 10 < self.getBoundingClientRect().top)) {
            contents.style.top = `-${contents.getBoundingClientRect().height + 3}px`;

        }

        if (window_over.right > window.innerWidth) {
            contents.style.left = `-${(window_over.right - window.innerWidth) + 30}px`

        }
    }

    function iconSet(self, option) {
        if (self.getAttribute("selectType") == "left-icon") {
            try {
                var name = self.getAttribute("name");
                var datalist = document.querySelector(`datalist[name="${name}"]`);
                var imgORsvg = datalist.querySelector(`data[value="${option.getAttribute("value")}"]`);
                option.querySelector('[form-input-left-icon]').innerHTML = imgORsvg.innerHTML
            } catch (e) {
                /**/
            }

        }
    }
    function unsCheckAll(elment) {
        var a = Array.from(elment.querySelectorAll("o[select-ul]")).filter(function (f) { if (f.getAttribute("selected") != null) { return f } })

        if (a.length == 0) { /*no selected*/

            elment.setAttribute("value", "")
            elment.setAttribute("placeholder_view", null)
            elment.querySelector('[input] [form-text-width]').textContent = elment.getAttribute('placeholder')
            if (elment.getAttribute("selectType") == "left-icon") {
                elment.querySelector('[input] [form-input-left-icon]').innerHTML = input_icon_def;
            }

        }
        return a.length
    }

    function newselected(element, e) {
        var self = element;
        var set_value = self.getAttribute('value')
        var options = e.querySelectorAll("[options] [select-ul]");

        if (e.getAttribute("filter") == null) {
            e.querySelector('[input] [form-text-width]').textContent = self.textContent
        }


        self.querySelector("[form-input-right-icon]").innerHTML = path_selected
        if (self.getAttribute('value')) {
            e.setAttribute('value', set_value)
        } else {
            e.setAttribute('value', "")
        }
        self.setAttribute("selected", true)
        if (e.getAttribute("multiple") == null) {
            options.forEach(function (us) {
                if (self != us) {
                    us.querySelector("[form-input-right-icon]").innerHTML = path_selecte
                    us.removeAttribute("selected");

                }
            });
        }


        if (e.getAttribute("selectType") == "left-icon") {
            e.querySelector('[input] [form-input-left-icon]').innerHTML = self.querySelector('[form-input-left-icon]').innerHTML
        }

        e.removeAttribute("placeholder_view");
    }

    function unselected(self, e) {
        self.removeAttribute("selected")
        self.querySelector("[form-input-right-icon]").innerHTML = path_selecte

    }

    function adjustSizeDesktop(self) {

        if (self.getAttribute("options-width") && (768 <= window.innerWidth)) {  /*dekstop only*/

            self.querySelector("[contents]").style.width = `${self.getAttribute("options-width")}`
        } else {
            self.querySelector("[contents]").style.width = "100%"
        }
    }

    var selectOpen = function (self) {
        self.setAttribute("focus", true);
        self.setAttribute("open", true);
        /* var topDefult = self.querySelector("[input]").getBoundingClientRect().height
          self.querySelector("[contents]").style.top =`${topDefult+3}px`*/
        adjustVisibility(self.querySelector("[contents]"), self);
        adjustSizeDesktop(self)
        window.addEventListener('resize', function () {
            adjustVisibility(self.querySelector("[contents]"), self);
            adjustSizeDesktop(self);
        });


    }

    var selectClose = function (self) {
       setTimeout(function(){
           self.removeAttribute("focus");
           self.removeAttribute("open");
           var mobile_view = $action_btm(self.querySelector("mobile"));
           mobile_view.close(); //agin close up when click to close desktop
        
        },100);

    }
    var selectEvent = function (e) { /*you sould load function after chnage any content in Element fragment*/

        /*select*/
        e.querySelectorAll("[options] [select-ul]").forEach(function (e2) {
            if (e2.getAttribute("event-steup") == null) {
                if (e2.getAttribute("disabled") == null) {
                    e2.addEventListener("click", function () {

                        var options = e.querySelectorAll("[options] [select-ul]");
                        var mobile_close = $action_btm(e.querySelector("mobile"));
                        if (e.getAttribute("multiple") == null) {



                            if (this.getAttribute('selected') == null || e.getAttribute('required') != null) {
                                newselected(this, e);



                            } else {
                                unselected(this, e)
                                unsCheckAll(e)

                            }
                            //selectClose(e);  
                            if (e.getAttribute("open") == "true") {
                                e.querySelector("[input]").click()
                            }


                        } else {

                            if (this.getAttribute('selected') == null) {
                                newselected(this, e);
                            } else if (unsCheckAll(e) != 1 || e.getAttribute('required') == null) {
                                unselected(this, e)
                            }

                            if (e.getAttribute("size") != null) {

                                if (unsCheckAll(e) > e.getAttribute("size")) { //max 
                                    for (let max = 0; options.length > max; max++) {
                                        if (options[max] != this && options[max].getAttribute('selected') !== null) {
                                            unselected(options[max], e);
                                            break;
                                        }
                                    }
                                }
                                if (unsCheckAll(e) == e.getAttribute("size")) {
                                    if (e.getAttribute("open") == "true") {
                                        e.querySelector("[input]").click()
                                    }
                                }
                                e.querySelector("[multiple-remain] [remain]").textContent = e.getAttribute("size");
                                e.querySelector("[multiple-remain] [done]").textContent = unsCheckAll(e)

                            }


                            var v = [], t = [], o_ob = [];

                            options.forEach(function (al) {
                                if (al.getAttribute('selected') != null) {
                                    v.push(al.getAttribute("value"))
                                    t.push(al.querySelector('[form-text-width]').textContent)
                                    o_ob.push(al)
                                }

                            });


                            if (e.getAttribute("filter") == null) {
                                e.querySelector('[input] [form-text-width]').textContent = t.toString()


                            }

                            e.setAttribute("value", v.toString())
                            if (o_ob.length > 0 && e.getAttribute("selectType") == "left-icon") {
                                e.querySelector('[input] [form-input-left-icon]').innerHTML = o_ob[o_ob.length - 1].querySelector('[form-input-left-icon]').innerHTML
                            }

                            unsCheckAll(e)

                        }


                    });
                }
                e2.setAttribute("event-steup", true);
            }
        });


        /*search*/
        function find(el, keyword = "") {
            var finds = Array.from(el.querySelectorAll("[options] [select-ul]")).filter(function (f) {
                if (f.querySelector('[form-text-width]').textContent.toLowerCase().includes(keyword.toLowerCase())) {
                    return true
                }
            });
            return finds
        }

        var back = e.querySelectorAll("[options] [select-ul]")

        e.querySelector("[select-ul-search] input").addEventListener("input", function () {
            var keyword = this.value.trim();
            e.querySelector("[options]").scrollTop = 0;

            var shif = e.querySelectorAll("[options] [select-ul]")[0]
            find(e, keyword).forEach(function (top) {
                if (shif) {
                    shif.before(top);

                }
            });
            if (keyword.length == 0) {
                e.querySelectorAll("[options] [select-ul]").forEach(function (remove) {
                    remove.remove()
                })
                back.forEach(function (b) {
                    e.querySelector("[options]").append(b)
                });
            }
        });

    }

    var path_selected = `<path d="M11,16.4l-4.7-4.7l1.4-1.4l3.3,3.3l8.4-8.4C17.5,3.3,14.9,2,12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10 c0-1.9-0.5-3.6-1.4-5.1L11,16.4z"/>`
    var path_selecte = ` <path d="M12 2C6.4889971 2 2 6.4889971 2 12C2 17.511003 6.4889971 22 12 22C17.511003 22 22 17.511003 22 12C22 6.4889971 17.511003 2 12 2 z M 12 4C16.430123 4 20 7.5698774 20 12C20 16.430123 16.430123 20 12 20C7.5698774 20 4 16.430123 4 12C4 7.5698774 7.5698774 4 12 4 z"/>`
    var input_icon_def = `<svg  opacity="0.30"  defult f xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M5.453125 3L3 5.453125L3 8.2792969L8.28125 3L5.453125 3 z M 12.582031 3L3 12.582031L3 15.410156L15.410156 3L12.582031 3 z M 19.59375 3L3 19.595703L3 20.970703L4.453125 20.970703L21 4.421875L21 3L19.59375 3 z M 21 8.6660156L8.6953125 20.970703L11.523438 20.970703L21 11.494141L21 8.6660156 z M 21 15.736328L15.767578 20.970703L18.595703 20.970703L21 18.564453L21 15.736328 z" />
</svg>`

    function optionPropert(p) {
        p.querySelectorAll('o').forEach(function (po) {
            if (po.getAttribute("prop-setup") == null) {
                Object.defineProperties(po, {
                    value: {
                        get: function () {
                            return this.getAttribute("value")
                        }
                    },
                    text: {
                        get: function () {
                            return this.querySelector('text').textContent;
                        }
                    },
                    selected: {
                        get: function () {
                            return this.getAttribute('selected') == null ? false : true
                        },
                        set: function (bool) {

                            var s = this
                            const i = setInterval(function () {
                                if (p.getAttribute("step2") == "true") {
                                    if (bool) { s.getAttribute('selected') == null ? s.click() : false } else { s.getAttribute('selected') != null ? s.click() : false; }
                                    clearInterval(i)
                                }
                            });
                        }
                    },
                    edit: {
                        value: function (value, text) {
                            var s = this
                            const i = setInterval(function () {
                                if (p.getAttribute("step2") == "true") {
                                    s.setAttribute("value", new String(value));
                                    s.querySelector("[form-text-width]").textContent = text
                                    clearInterval(i)
                                }
                            });
                        },
                        disabled: {
                            get: function () {
                                return this.getAttribute("disabled") != null ? true : false;
                            },
                            set: function (bool) {
                                if (bool) {
                                    this.setAttribute("disabled", null)
                                } else {
                                    this.removeAttribute("disabled")
                                }
                            }
                        }

                    },

                });
                po.setAttribute("prop-setup", true);
            }

        })
    }

    function selectPropert() {
        var properties = document.querySelectorAll('div[form="select"]');
        properties.forEach(function (p) {
            if (p.getAttribute("properties-setup") == null) {

                /*self*/
                Object.defineProperties(p, {
                    loadend: {
                        value: function (caller = function () { }) {
                            var s = this;
                            const i = setInterval(function () {
                                if (s.getAttribute("step2") == "true") {
                                    caller.call(s, s);
                                    clearInterval(i)
                                }
                            });
                        }
                    },
                    change: {
                        value: function (caller = function () { }) {
                            var s = this;
                            const i = setInterval(function () {
                                if (s.getAttribute("step2") == "true" && s.getAttribute("reload") == null) {
                                    s.setAttribute("reload", true);

                                    s.querySelectorAll(['[options] [select-ul]']).forEach(function (u) {
                                        if (u.getAttribute("event-chnage-steup") == null) {
                                            u.addEventListener("click", function () {
                                                if (u.getAttribute("disabled") == null) {
                                                    caller.call(s, s)
                                                }

                                            });
                                            u.setAttribute("event-chnage-steup", true)
                                        }

                                    })

                                    // clearInterval(i)
                                }
                            });
                        }
                    },
                    value: {
                        get: function () {
                            if (this.getAttribute("step2") == null) { /*.getAttribute("step2")*/
                                var value_re = ""
                                if (this.getAttribute("multiple") == null) {
                                    value_re = this.querySelector("option[selected]").value
                                } else {
                                    value_re = Array.from(this.querySelectorAll("option[selected]")).map(function (e) {
                                        return e.value
                                    }).toString();
                                }

                                return value_re
                            } else {
                                return this.getAttribute('value')
                            }
                        },

                    },
                    disabled: {
                        get: function () {
                            return this.getAttribute("disabled") != null ? true : false;
                        },
                        set: function (bool) {
                            if (bool) {
                                this.setAttribute("disabled", null)
                            } else {
                                this.removeAttribute("disabled")
                            }
                        }
                    },
                    cntload: {
                        value: function (caller = function () { }) {
                            var s = this; var click = 0;


                            const i = setInterval(function () {
                                if (s.getAttribute("step2") == "true") {
                                    var lEl = s.querySelector('[contents] [loading-content]')
                                    var event = {

                                        label: function (action = false, text = null) {
                                            if (action) {
                                                lEl.querySelector("[label]").style.display = "flex"
                                                lEl.querySelector("[label]").textContent = text;
                                            }
                                        },
                                        clearloade: false,
                                        error: function () {
                                            s.removeAttribute("cnt-laoding-wait");
                                            lEl.setAttribute("error", null);
                                            click = 1;

                                        },
                                        clear: function (appendData = "") {
                                            s.removeAttribute("cnt-laoding");
                                            s.removeAttribute("cnt-laoding-wait");
                                            event.clearloade = true;
                                            click = 0;
                                            s.html(appendData);
                                            // selectClose(s) 
                                            //s.querySelector("[input]").click()
                                            //  $action_btm(self.querySelector("mobile"))
                                            var i2 = setInterval(function () {
                                                if (s.getAttribute("step2") == "true") {
                                                    var mobile_view = $action_btm(s.querySelector("mobile"))
                                                    mobile_view.show()

                                                    mobile_view.onclose(function () {
                                                        this.close(function () {
                                                            selectClose(s);
                                                        });
                                                    });
                                                    clearInterval(i2)
                                                }


                                            });





                                        },
                                    }
                                    var opend = s.querySelector("[input]");
                                    if (!event.clearloade && s.getAttribute("cnt-laoding-wait") == null) {
                                        s.setAttribute("cnt-laoding-wait", true);

                                        click = 1;
                                        opend.addEventListener("click", function () {
                                            if (click == 1 && s.getAttribute("open") != null) {

                                                click = 0;

                                                s.querySelector('[contents] [options]').style.display = "none";
                                                s.querySelector("[contents] [select-ul-search]").style.display = "none";
                                                s.setAttribute("cnt-laoding", true);
                                                lEl.removeAttribute("error");
                                                caller.call(event, event, s)

                                            }

                                        });



                                    } else {
                                        click = 0
                                    }
                                    //e.querySelector("[input]").addEventListener("click"
                                    clearInterval(i)
                                }
                            });

                        }
                    },
                    html: {
                        value: function (optionsHTML) {
                            var s = this;
                            const i = setInterval(function () {
                                if (s.getAttribute("step2") == "true") {
                                    s.innerHTML = optionsHTML
                                    s.removeAttribute("ui-setup"); s.removeAttribute("step2");
                                    s.removeAttribute("step1");
                                    s.setAttribute("reload", true);
                                    s.removeAttribute("reload")
                                    clearInterval(i);
                                }
                            });
                        }
                    },
                    add: {
                        value: function (value, text) {
                            var s = this
                            const i = setInterval(function () {
                                if (s.getAttribute("step2") == "true") {
                                    var o = document.createElement("o");
                                    o.setAttribute("select-ul", null); o.setAttribute("form-font-size", null); o.setAttribute("form-cursor", null);
                                    o.setAttribute("value", value);
                                    o.innerHTML = ` 
                       <div form-input-left-icon></div> <text form-text-width>${text}</text>
                       <svg form-input-right-icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                       <path d="M12 2C6.4889971 2 2 6.4889971 2 12C2 17.511003 6.4889971 22 12 22C17.511003 22 22 17.511003 22 12C22 6.4889971 17.511003 2 12 2 z M 12 4C16.430123 4 20 7.5698774 20 12C20 16.430123 16.430123 20 12 20C7.5698774 20 4 16.430123 4 12C4 7.5698774 7.5698774 4 12 4 z" />
                       </svg>`
                                    iconSet(s, o);
                                    s.querySelector("[contents] [options]").append(o);
                                    selectEvent(s);
                                    optionPropert(s);
                                    s.removeAttribute("reload");
                                    clearInterval(i)
                                }
                            });
                        }
                    },
                    options: {
                        value: function (caller = function () { }, index = "all") {
                            var s = this;
                            const i = setInterval(function () {
                                if (s.getAttribute("step2") == "true") {
                                    var ops = s.querySelectorAll("o");
                                    for (let i = 0; ops.length > i; i++) {

                                        if (index != "all") {
                                            if (i == index) {
                                                caller.call(s, ops[i], i);
                                                break
                                            }
                                        }
                                        else {
                                            caller.call(s, ops[i], i);
                                        }
                                    }
                                    clearInterval(i)
                                }
                            });

                        }
                    },
                    required: {
                        get: function () {
                            return this.getAttribute("required") != null ? true : false;
                        },
                        set: function (bool) {
                            if (bool) {
                                this.setAttribute("required", null)
                            } else {
                                this.removeAttribute("required")
                            }
                        }
                    },
                    multiple: {
                        value: function (m = false, size = false) {
                            if (m) {
                                this.setAttribute("multiple", true);
                                if (size) {
                                    this.setAttribute("size", size)
                                }

                            } else {
                                this.removeAttribute("multiple")
                            }
                        }
                    },
                    options_width: {
                        value: function (width) {
                            this.setAttribute("options-width", width)
                        }
                    }

                });
                /*options*/
                optionPropert(p)
                p.setAttribute("properties-setup", true)
            }

        });
    }
    selectPropert();

    Object.defineProperties(this, {
        $select: {
            value: function (element) {
                selectPropert();
                return element
            },
            writable: false
        }
    });


    setInterval(function () {
        var step1 = document.querySelectorAll('div[form="select"]');

        step1.forEach(function (e) {
            if (e.getAttribute("step1") == null) {
                e.setAttribute("placeholder_view", null); e.setAttribute("form-border", null); e.setAttribute("form-font-size", null); e.setAttribute("form-input-color", null);
                e.setAttribute("value", "")

                var input_box = document.createElement("div");
                var placeholder = e.getAttribute('placeholder') != null ? e.getAttribute('placeholder') : ""
                input_box.setAttribute("input", null); input_box.setAttribute("form-cursor", null); input_box.setAttribute("padding", null)
                var input_boxInner = `<div form-input-left-icon> <svg  opacity="0.30"  defult  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.453125 3L3 5.453125L3 8.2792969L8.28125 3L5.453125 3 z M 12.582031 3L3 12.582031L3 15.410156L15.410156 3L12.582031 3 z M 19.59375 3L3 19.595703L3 20.970703L4.453125 20.970703L21 4.421875L21 3L19.59375 3 z M 21 8.6660156L8.6953125 20.970703L11.523438 20.970703L21 11.494141L21 8.6660156 z M 21 15.736328L15.767578 20.970703L18.595703 20.970703L21 18.564453L21 15.736328 z" /</svg></div>
         <text form-text-width>${placeholder}</text>
     <svg form-input-right-icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
   <path d="M11 3L11 17.070312L6.4296875 12.5L4.9296875 14L12 21.070312L19.070312 14L17.570312 12.5L13 17.070312L13 3L11 3 z" />
 </svg>
`
                input_box.innerHTML = input_boxInner;
                if (e.querySelector("o")) {
                    e.querySelector("o").before(input_box)
                } else {
                    e.append(input_box)
                }


                /*option sets*/
                var contents = document.createElement("div"); contents.setAttribute('contents', null);
                //contents.style.display = "block"
                var search_holder = e.getAttribute("search-holder") != null ? e.getAttribute("search-holder") : "search";

                contents.innerHTML = `
          <mobile max-height="90%" form="bottom-bar">
  <div select-ul-search>
    <svg form-input-left-icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M9 2C5.1458514 2 2 5.1458514 2 9C2 12.854149 5.1458514 16 9 16C10.747998 16 12.345009 15.348024 13.574219 14.28125L14 14.707031L14 16L20 22L22 20L16 14L14.707031 14L14.28125 13.574219C15.348024 12.345009 16 10.747998 16 9C16 5.1458514 12.854149 2 9 2 z M 9 4C11.773268 4 14 6.2267316 14 9C14 11.773268 11.773268 14 9 14C6.2267316 14 4 11.773268 4 9C4 6.2267316 6.2267316 4 9 4 z" />
    </svg>
    <input type="text" form-text-width form-input-placeholder placeholder="${search_holder}">
  </div>
  <div multiple-remain padding form-font-size><span done>0</span>/<span remain>0</span></div>
  <div options scroll-br>
  </div>
   <div loading-content > 
       <div load_i padding  spinner-icon>
           <svg load  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M11 2.1816406L11 6L13 6L13 2.1816406L11 2.1816406 z M 7.9570312 2.9960938L6.2246094 3.9960938L8.1347656 7.3046875L9.8652344 6.3046875L7.9570312 2.9960938 z M 16.042969 2.9960938L14.134766 6.3046875L15.865234 7.3046875L17.775391 3.9960938L16.042969 2.9960938 z M 3.9960938 6.2246094L2.9960938 7.9570312L6.3046875 9.8652344L7.3046875 8.1347656L3.9960938 6.2246094 z M 20.003906 6.2246094L16.695312 8.1347656L17.695312 9.8652344L21.003906 7.9570312L20.003906 6.2246094 z M 2.1816406 11L2.1816406 13L6 13L6 11L2.1816406 11 z M 18 11L18 13L21.818359 13L21.818359 11L18 11 z M 6.3046875 14.134766L2.9960938 16.042969L3.9960938 17.775391L7.3046875 15.865234L6.3046875 14.134766 z M 17.695312 14.134766L16.695312 15.865234L20.003906 17.775391L21.003906 16.042969L17.695312 14.134766 z M 8.1347656 16.695312L6.2246094 20.003906L7.9570312 21.003906L9.8652344 17.695312L8.1347656 16.695312 z M 15.865234 16.695312L14.134766 17.695312L16.042969 21.003906L17.775391 20.003906L15.865234 16.695312 z M 11 18L11 21.818359L13 21.818359L13 18L11 18 z" />
</svg>
  <svg error  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M22.239,18.451L13.442,3.816C13.135,3.305,12.596,3,12,3s-1.135,0.305-1.441,0.815L1.761,18.451 c-0.312,0.519-0.32,1.168-0.022,1.695C2.036,20.673,2.597,21,3.203,21h17.595c0.605,0,1.167-0.327,1.464-0.854 C22.56,19.619,22.551,18.97,22.239,18.451z M13,18h-2v-2h2V18z M13,14h-2V9h2V14z" />
</svg>
       </div>
       <div style="display:noned"  load_i label  form-font-size form-input-color  padding>Loading...</div>
       </div>
</mobile>
`

                e.querySelectorAll('o').forEach(function (o) {
                    o.setAttribute("select-ul", null); o.setAttribute("form-font-size", null); o.setAttribute("form-cursor", null);
                    o.getAttribute("value") == null ? o.setAttribute("value", "") : true;
                    var text = o.textContent
                    o.innerHTML = `
                 <div form-input-left-icon></div> 
<text form-text-width>${text}</text>
 
<svg form-input-right-icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path
    d="M12 2C6.4889971 2 2 6.4889971 2 12C2 17.511003 6.4889971 22 12 22C17.511003 22 22 17.511003 22 12C22 6.4889971 17.511003 2 12 2 z M 12 4C16.430123 4 20 7.5698774 20 12C20 16.430123 16.430123 20 12 20C7.5698774 20 4 16.430123 4 12C4 7.5698774 7.5698774 4 12 4 z" />
</svg>
`
                    iconSet(e, o)
                    contents.querySelector("[options]").append(o);

                });

                var now_selected = contents.querySelector("[options]").querySelectorAll('o[selected]');

                input_box.after(contents)
                var disabled_el = document.createElement("div");
                disabled_el.setAttribute("sel-disabled", true);
                contents.after(disabled_el)


                var v = [], t = []

                if (e.getAttribute("multiple") != null && now_selected.length > 0) {

                    if (e.getAttribute("size") == null) {
                        now_selected.forEach(function (sl) {

                            newselected(sl, e);
                            v.push(sl.getAttribute('value'))
                            t.push(sl.querySelector('text').textContent)
                        });


                    } else {
                        var size = e.getAttribute("size") - 1;
                        e.querySelector("[multiple-remain] [remain]").textContent = e.getAttribute("size");
                        now_selected.forEach(function (sl, ind) {

                            if (size >= ind) {
                                newselected(sl, e);
                                v.push(sl.getAttribute('value'))
                                t.push(sl.querySelector('text').textContent);
                                e.querySelector("[multiple-remain] [done]").textContent = ind + 1
                            } else {
                                sl.removeAttribute('selected');
                            }
                        });
                    }


                    e.setAttribute("value", v.toString());

                    if (e.getAttribute("filter") == null) {
                        e.querySelector('[input] [form-text-width]').textContent = t.toString()
                    }

                } else {

                    now_selected.length > 0 ? newselected(now_selected[0], e) : true
                }





                e.setAttribute("step1", true);
                e.setAttribute("ui-setup", true);
            }
        });

        /*setup 2*/
        var select_steup2 = document.querySelectorAll('div[form="select"][ui-setup="true"]');
        select_steup2.forEach(function (e) {
            if (e.getAttribute('step2') == null) {
                /*opend*/
                e.querySelector("[input]").addEventListener("click", function (event) {
                    var self = this.parentElement;


                    if (!self.getAttribute("disabled")) {

                        if (self.getAttribute("open")) { /*is aredy opend*/
                            selectClose(self);

                        } else {

                            selectOpen(self)
                            var mobile_view = $action_btm(self.querySelector("mobile"));
                            mobile_view.show();

                            mobile_view.onclose(function () {
                                this.close(function () {
                                    selectClose(self);
                                });
                            });






                        }




                    }
                    document.addEventListener('click', function (event) {
                        if (event.target.closest('div[form="select"]') != self) {
                            selectClose(self);
                        }
                    });
                });
                selectEvent(e);
                e.setAttribute("step2", true);
            }
        });


    });

}(); 



!function(){
    
var autoHeight = function () {
     var T = document.querySelectorAll("textarea");
     T.forEach(function (Te) {

          if (Te.getAttribute("stup-ui") == null) {
               Te.setAttribute("stup-ui", null)
               Te.addEventListener("input", function () {
                    if (Te.getAttribute("height") == "auto") {
                         Te.style.height = 'auto';
                         if (Te.clientHeight < Te.scrollHeight) {
                              Te.style.height = `${Te.scrollHeight}px`;
                         } else if (this.getAttribute("min")) {
                              Te.style.height = `${Te.getAttribute("min")}`;
                         }
                    }
               });
          }

     });

}
window.addEventListener("load", function () {
     autoHeight()
});
$arriveAdd('textarea', function () {
     autoHeight()

});
}();


