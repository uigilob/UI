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
