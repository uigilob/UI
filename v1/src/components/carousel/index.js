!function () {
  function foucs(from, to, beha = "smooth") {
    var rect = $reactFrom(from, to);
    var top = rect.top + from.scrollTop
    var left = rect.left + from.scrollLeft;

    from.scroll({ top: top, left: left, behavior: beha, });

  }


  function isCurrent(self) {
    this.forEach(function (c) {
      if (self != c) {
        c.removeAttribute("is-current");

      } else {
        c.setAttribute("is-current", "t");

      }
    });
  }

  function isCurrent_tab(index) {
    if (this.getAttribute("c-slider-tabs") != null) {
      this.querySelectorAll(".carousel-tabs .carousel-t").forEach(function (c, i) {

        if (index != i) {
          c.removeAttribute("t-active");

        } else {

          c.setAttribute("t-active", "t");

        }
      });
    }

  }

  function autoPlay_tabAni(delay) {
    if (this.getAttribute("c-slider-tabs") != null) {
      this.querySelectorAll(".carousel-tabs .carousel-t").forEach(function (c) {
        if (c.getAttribute("t-active") != null) {
          if (delay) {
            c.style.cssText = `animation-duration:${delay};`

          } else {
            c.style.cssText = `animation-duration:2s;`
          }
          c.setAttribute("play-delay", "t");

        } else {
          c.style.cssText = `animation-duration:2s;`
          c.removeAttribute("play-delay");
        }
      });
    }
  }

  function autoPlay() {

    var activ = this.querySelector(".carousel-ctn .x-item[is-current]");
    var self = this;
    if (activ.getAttribute("set-an-is-current") == null) {
      activ.setAttribute("set-an-is-current", "t")

      activ.addEventListener("animationend", function (event) {

        if (this.getAttribute("is-current") != null && this.getAttribute("play-delay") == null && event.animationName == "slider-play") {
          this.setAttribute("play-delay", "t");
          autoNext.call(this, self);
          var delay = self.getAttribute("c-slider-delay");
          if (delay != null) {
            this.style.cssText = `animation-delay:${delay};`
          } else {
            this.style.cssText = `animation-delay:2s;`
          }


          /*tab an*/
          autoPlay_tabAni.call(self, delay)


        }


      });
    }
  }

  function autoNext(self) {
    if (this.getAttribute("set-an-play-delay") == null) {
      this.setAttribute("set-an-play-delay", "t")
      this.addEventListener("animationend", function (event) {
        if (event.animationName == "slider-delay" && this.getAttribute("play-delay") != null && this.getAttribute("is-current") != null) {
          this.removeAttribute("play-delay");
          next.call(self, 1, 'play');
        }

      });
    }

  }
  function loop_down() {
    this.addEventListener("animationend", function () {
      if (this.getAttribute("is-current") != null && this.getAttribute("slide-down") != null) {
        this.removeAttribute("is-current");
        this.removeAttribute("slide-down");

      }

    });
  }

  function next(step, autoP = false, indexBy = undefined) {

    var cnt = this.querySelector(".carousel-ctn");
    var items = Array.from(cnt.querySelectorAll(".x-item"));


    if (items.length > 1) {
      for (i = 0; items.length > i; i++) {
        var c = items[i]

        if (c.getAttribute("is-current") != null) {
          var next = items[indexBy] || items[i + step];
          var btn_p = this.querySelector(".slider-btn.prev");
          var btn_n = this.querySelector(".slider-btn.next");
          btn_n.removeAttribute("disabled");
          btn_p.removeAttribute("disabled")
          if (autoP) {
            if (indexBy >= 0) {
              isCurrent_tab.call(this, indexBy);
            } else {
              isCurrent_tab.call(this, i + step);
            }

            if (!next) {

              next = step == 1 ? items[0] : items[items.length - 1]
              step == 1 ? isCurrent_tab.call(this, 0) : isCurrent_tab.call(this, items.length - 1)
            }



            if (autoP == "play") {
              c.style.cssText = `animation-delay:0s;`;
              c.removeAttribute("is-current");
              next.removeAttribute("play-delay");
              isCurrent.call(items, next);
              autoPlay.call(this);

            } else if (autoP == "loop") {
              next.setAttribute("is-current", "t")
              c.setAttribute("slide-down", "t");
              loop_down.call(c);
            }
            else if (autoP == "contain") {
              if (step == 1) {
                var left = cnt.scrollLeft + cnt.clientWidth;
                cnt.scroll({ top: 0, left: left, behavior: "smooth" });
              } else {
                var left = cnt.scrollLeft - cnt.clientWidth;
                cnt.scroll({ top: 0, left: left, behavior: "smooth" });
              }

            }


          }
          else if (next) {
            if (indexBy >= 0) {
              isCurrent_tab.call(this, indexBy);
            } else {
              isCurrent_tab.call(this, i + step);

            }

            c.removeAttribute("is-current");
            next.setAttribute("is-current", "t");
            foucs(cnt, next);





          }

          break;

        }

      }
    }


  }

  function auto_pause_play_progress(paused) {
    if (this.getAttribute("c-slider-tabs") != null) {
      var active = this.querySelector(".carousel-tabs .carousel-t[t-active]");
      if (active) {
        if (paused) {
          active.style.animationPlayState = "paused";
        } else {
          active.style.animationPlayState = "running";
        }
      }

    }
  }
  function auto_pause_play(cnt, play, type) {
    var fr = cnt.querySelector(".x-item[is-current]");
    if (fr && type == "play") {
      if (play) {
        fr.style.animationPlayState = 'running';
        this.querySelector(".slider-btn.play").setAttribute("type", "play");
        auto_pause_play_progress.call(this, false);


      } else {

        fr.style.animationPlayState = 'paused';
        this.querySelector(".slider-btn.play").setAttribute("type", "pause");
        auto_pause_play_progress.call(this, true);




      }
    }
  }


  //setInterval(function () {
   document.addEventListener("evn-run",function() {
    var carousel = $qsall('.carousel');
    carousel.forEach(function (e) {
      if (e.getAttribute("set-carousel") == null) {
        e.setAttribute("set-carousel", "t");
        var place_btn = e.getAttribute("c-slider-btn") || "bottom";
        var frame = document.createElement("div");
        var ecnt_ = e.querySelector(".carousel-ctn");
        ecnt_.className += " center-tb";
        var first1 = ecnt_.querySelector(".x-item");
        if (first1) {
          first1.setAttribute("is-current", "t");
        }
        if (place_btn == "inner" || place_btn == "outer") {
          e.innerHTML = `<div class="flex carousel-frame center center-tb">
               <button class="button slider-btn prev" align="icon" align-l="y">
    <div class="icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M13 3L7 12L13 21L17 21L11 12L17 3L13 3 z" />
      </svg>
    </div>
  </button>
  <button class="button slider-btn next" align="icon" align-l="y">
    <div class="icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M8 3L14 12L8 21L12 21L18 12L12 3L8 3 z" />
      </svg>
    </div>
  </button>
             </div>
  <div class="carousel-btm flex gap-l-f  center-tb">
   <div class="flex  carousel-tabs center-tb itm-r f-auto">
      <button class="button slider-btn play" type="play" align="icon" align-l="y">
        <div class="icon">
          <svg pause="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M6 5L6 19L10 19L10 5L6 5 z M 14 5L14 19L18 19L18 5L14 5 z" />
          </svg>
          <svg play='' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M8,5v14l11-7L8,5z" />
          </svg>
        </div>
      </button>
    </div>
  </div>           
             
  `
          e.querySelector(".carousel-frame button.prev").after(ecnt_);
        }
        else if (place_btn == "top" || place_btn == "bottom") {
          var top_c_ = "", bottom_c_ = "";

          if (place_btn == "top") {
            top_c_ = '<div class="flex carousel-frame center center-tb"></div>'
          } else {
            bottom_c_ = '<div class="flex carousel-frame center center-tb"></div>'
          }

          e.innerHTML = `
              ${bottom_c_}
              <div class="carousel-btm flex gap-l-f  center-tb">
    <div class="flex gap-l-f"><button class="button slider-btn prev" align="icon" align-l="y">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M13 3L7 12L13 21L17 21L11 12L17 3L13 3 z" />
          </svg>
        </div>
      </button>
      <button class="button slider-btn next" align="icon" align-l="y">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M8 3L14 12L8 21L12 21L18 12L12 3L8 3 z" />
          </svg>
        </div>
      </button>
  
    </div>
    <div class="flex  carousel-tabs center-tb itm-r f-auto">
      <button class="button slider-btn play" type="play" align="icon" align-l="y">
        <div class="icon">
          <svg pause="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M6 5L6 19L10 19L10 5L6 5 z M 14 5L14 19L18 19L18 5L14 5 z" />
          </svg>
          <svg play='' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M8,5v14l11-7L8,5z" />
          </svg>
        </div>
      </button>
    </div> 
  </div>
  ${top_c_}
              `
          e.querySelector(".carousel-frame").append(ecnt_)
        }




        /*end setup*/

        var aplay = e.getAttribute("c-slider-type") || undefined
        var etabs = e.getAttribute("c-slider-tabs") || undefined

        if (etabs) {
          e.querySelectorAll(".carousel-ctn .x-item").forEach(function (st, i) {
            var stt = document.createElement("div");
            stt.className = "carousel-t"
            if (i == 0) {
              stt.setAttribute("t-active", "t")
            }
            e.querySelector(".carousel-tabs").append(stt)

          })
        }

        /*autoPlay defult*/
        if (aplay == "play") {
          autoPlay.call(e)
        }


        /*button*/
        var btn_p = e.querySelector(".slider-btn.prev");
        var btn_n = e.querySelector(".slider-btn.next");
        //next.call(e,this)
        btn_n.addEventListener("click", function () {
          next.call(e, 1, aplay);


        })
        btn_p.addEventListener("click", function () {
          next.call(e, -1, aplay)
        });

        /*if(!aplay){
           btn_p.setAttribute("disabled","p") 
        }*/


        var cnt = e.querySelector(".carousel-ctn");
        /*tabs by Content*/
        if (etabs) {
          e.querySelectorAll(".carousel-tabs .carousel-t").forEach(function (t, t_i) {
            t.addEventListener("click", function (t) {
              var items = Array.from(cnt.querySelectorAll(".x-item[is-current]"));
              //document.console = items.length

              next.call(e, 0, aplay, t_i);
              //auto_pause_play.call(e,cnt,false,aplay);
              //e.querySelector(".slider-btn.play").setAttribute("type","play")
            })
          })

        }

        /*play btn*/
        var cntr_btn = true
        if (aplay == "play") {
          e.querySelector(".slider-btn.play").addEventListener("click", function () {
            var type_p = this.getAttribute("type");
            if (type_p == "play") {
              this.setAttribute("type", "pause");
              cntr_btn = false
              auto_pause_play.call(e, cnt, false, aplay);
            } else {
              cntr_btn = true;
              this.setAttribute("type", "play");
              auto_pause_play.call(e, cnt, true, aplay)
            }
          })
        }


        /*scrolling*/
        if (aplay != "contain") {
          cnt.addEventListener("scroll", function (event) {
            var items = Array.from(cnt.querySelectorAll(".x-item"));
            for (let i = 0; items.length > i; i++) {
              var r = $reactFrom(cnt, items[i])
              if (r.left >= -1 && r.right > -1) {
                isCurrent.call(items, items[i])
                isCurrent_tab.call(e, i)
                break;

              }
            }

          });
        }


        /*desktop scroll left right*/
        if ($getDeviceType() == "Desktop") {


          var items = Array.from(cnt.querySelectorAll(".x-item"));
          items.forEach(function (dr) {
            dr.addEventListener("mousedown", function (event) {
              event.preventDefault();
            })
          })
          let isDragging = false;
          let startX;
          let scrollLeft;
          cnt.addEventListener("mousedown", function (event) {
            event.preventDefault();
            isDragging = true;
            startX = event.pageX - cnt.offsetLeft;
            scrollLeft = cnt.scrollLeft;
          });

          cnt.addEventListener("mousemove", function (event) {
            event.preventDefault();
            /*if (!isDragging) return; */
            if (isDragging) {
              const x = event.pageX - cnt.offsetLeft;
              const walk = (x - startX) * 2; // Adjust scrolling speed
              cnt.scrollLeft = scrollLeft - walk;
            }

          });

          cnt.addEventListener("mouseup", function (event) {
            isDragging = false;
          });
          cnt.addEventListener("mouseleave", function (event) {
            isDragging = false;
          });
        };

        /*auto_pause_play*/
        cnt.addEventListener("mouseover", function () {
          if (cntr_btn) {
            auto_pause_play.call(e, cnt, false, aplay);
          }


        });
        cnt.addEventListener("pointermove", function () {
          if (cntr_btn) {
            auto_pause_play.call(e, cnt, false, aplay);
          }
        })
        cnt.addEventListener("mouseleave", function () {
          if (cntr_btn) {
            auto_pause_play.call(e, cnt, true, aplay)
          }


        })
        cnt.addEventListener("pointercancel", function () {
          if (cntr_btn) {
            auto_pause_play.call(e, cnt, true, aplay)
          }

        })

      }
    })
  })
}();
