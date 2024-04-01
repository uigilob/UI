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
