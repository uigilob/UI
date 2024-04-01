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
