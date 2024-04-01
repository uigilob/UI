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