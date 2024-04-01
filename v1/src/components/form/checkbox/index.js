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
