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

function $parserHTML(string_, applyto, method = "append", scriptMehtod = "after") {
    //methods textCotent,innerHTML,append,appendChild .....
    //scriptMehtod append,after before,prepend

    var parser = new DOMParser();
    var htmlDoc = parser.parseFromString(string_, 'text/html');

    var scripts = document.createElement("div");
    htmlDoc.querySelectorAll("script").forEach(function (script) {
        scripts.append(script);
    });
    if (typeof applyto[method] == "function") {
        Array.from(htmlDoc.body.childNodes).forEach(function (doc) {
            applyto[method](doc);
        });
    } else {
        applyto[method] = htmlDoc.body[method]
    }

    Array.from(scripts.childNodes).forEach(function (script) {

        var newScript = document.createElement("script");
        script_scopp = ["async", "crossorigin", "defer", "fetchpriority", "integrity",
            "nomodule", "src", "text", "type"]
        script_scopp.forEach(function (scop) {
            if (script.getAttribute(scop) != null) {
                newScript.setAttribute(scop, script.getAttribute(scop));
            }
        })
        if (script.getAttribute("src") == null) {
            newScript.innerHTML = script.innerHTML;
        }
        applyto[scriptMehtod](newScript);
    });
    
      
};

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
