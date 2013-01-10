(function() {
  var intentKlass = window.Intent || window.WebKitIntent;
  var sa = window.navigator.startActivity || window.navigator.webkitStartActivity;
  var iconURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAACLlBMVEWQkJBaWlr09PQ/Pz+jo6PU1NRZWVnMzMxoaGgLCwvi4uLj4+MoKCiWlpbr6+t4eHjS0tIHBwfX19dcXFwzMzMTExOrq6vJyckXFxcqKiplZWXd3d2enp6Xl5dDQ0Pp6em6urqVlZUaGhqzs7Ph4eEPDw9SUlKYmJhqamry8vKBgYGKioqhoaHm5uZbW1u/v7/Y2NilpaX19fVhYWEvLy9TU1Otra02NjaZmZlAQEB1dXXv7+/o6OhWVlYFBQV+fn5XV1eTk5NERESnp6eLi4sICAghISFdXV3t7e2RkZH8/Py8vLyHh4dvb2/GxsZfX18xMTHDw8NycnLx8fEgICAuLi6+vr5RUVGSkpInJyfLy8sVFRVHR0e0tLRnZ2d6enoNDQ3u7u4mJiZtbW0DAwO2trbg4ODW1tZGRkbExMQ4ODheXl5zc3MQEBD+/v4iIiJCQkIyMjLAwMBgYGAlJSUcHByJiYk7OztQUFB9fX3T09PHx8evr6+wsLCCgoI5OTkKCgqfn5/FxcVLS0uUlJSIiIgeHh48PDxwcHAjIyO7u7uioqIRERE+Pj729vasrKw6OjoODg41NTWmpqbl5eVOTk5KSkoMDAzs7Ozn5+fq6urOzs4SEhIEBAT5+fmoqKi9vb15eXkJCQktLS0WFhY3Nzdra2ssLCwkJCTV1dX9/f2kpKTPz8/b29uysrICAgLz8/P4+PjQ0ND6+vr7+/v39/cGBgYBAQEAAAD///8OTSmsAAACnklEQVR42u3YZXcaQRQG4NTd3d3d3d1dI427NNZ44417QgIEAiUQ3OXOv2tTTgmy251LoB9y5v3+8pxddmb3Tgz5D2EIQxjCEIYwhCEMYQhDZibSPSg1Nz27ExXEJskoGrib8uHC2z74nbqTEURc4kpFR7Nmf7a2Uwb+6Xo8bUR+VffE8FRTri7YZwHufAsbkYvte5ou32xpy7OAQO4Zw0GcI0lxyXlAnX55GEiaiAwBJhVhIJkwLyMVg1yvQiNZHpiPvJSJ01hEBOBOX+BBKa+RSMPkzy8kX1GIRYFDGidLi5YrABXtGwzy3HuflGQtTtFgkEZvZ511PQ7xtNMjWR7fZlGCU0oOUSOZfzulzm2ASystcmKqs9W2EYekvqJD/B/cTaQCcHlno0La/TvxI8NI5TsV0uVfKSObkchPHQWSFtjZYJIhldvCSH5vYKWcDAEyHYKIOagh21KFRUZHBBB9f3AlgdTiDLWhWwA5H9JJTKrBEL09eqH/xPmS65lMpiZaaihW/BhHcbdzFyVRVk2zCztUXN161zgNUdtD92Y8xdlWkS/CROGYnlAhjgngzM4ddQKE6qiD9uPOANzZTor/SXw64CKEF6G7EPBUrrbwE/cfWRHzyQDwZQ2JA56UNl/BDEHOs/w7q7gIODN+WIKbtOqBPytIIdcmpRzEjnPKH/xIrCt0mfa1pocxM1o/37rW5uFWluUXBN3Bg6awB1OX/eJxLQe0lMSAX9xndNOcfm3Sj+dCbl387Ngp4oE9IiO2teGIKGDHmuPbW9w5xgjO8Q/f37jU6VuQUsnwH+KFMeKHBcfMuWrvR9EskgCwqtgepROJvdW52YkAJtNozsqoHnssNqfMJUtm8gEOQxjCEIYwhCEMYQhDGBLp/AJIcN1QrMdL7QAAAABJRU5ErkJggg==';
  document.addEventListener("DOMContentLoaded", function() {
    document.head.innerHTML +=
      "<style>"+
      ".sign-in-with-tent-box{display:inline-block;padding:0;background:#fff;border:1px solid #ccc;box-shadow:0 0 5px rgba(0,0,0,0.)}"+
      ".sign-in-with-tent-box input{outline:none;display:inline-block;background:none;border:none;padding:10px}"+
      ".sign-in-with-tent-box button{cursor:pointer;opacity:0.7;width:40px;padding:10px;border:none;background:url('"+iconURL+"') no-repeat;background-size:contain;}"+
      ".sign-in-with-tent-box:hover button{opacity:1}"+
      "</style>";

    var inputFields = document.querySelectorAll("input.sign-in-with-tent");
    
    for(var i=0;i<inputFields.length;i++) {
      var field = inputFields.item(i);
      var container = document.createElement("div");
      container.className = 'sign-in-with-tent-box';
      
      var newField = document.createElement("input");
      newField.placeholder = field.placeholder || 'https://your.tent-entity.com';
      newField.size = newField.placeholder.length+5;
      container.appendChild(newField);

      var btn = document.createElement("button");
      btn.tabIndex = -1
      container.appendChild(btn);

      field.parentNode.insertBefore(container, field);
      field.style.display = 'none';
      newField.name = field.name;
      newField.value = field.value;
      field.name = "";

      btn.addEventListener("click", function(e) {
        if(e.detail==0) return; // don't do anything special on enter
        var intent = new intentKlass("https://tent.jonasschneider.com/sign-in-with-tent/authenticate", "v1");
        e.preventDefault();
        e.stopPropagation();
        sa.apply(window.navigator, [intent, function(userEntity) {
          field.value = newField.value = userEntity;
          newField.size = newField.value.length;
          field.form.submit();
        }]);
        return false;
      });
    }
  });
})();