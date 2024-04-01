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
