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
