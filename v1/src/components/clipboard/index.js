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
