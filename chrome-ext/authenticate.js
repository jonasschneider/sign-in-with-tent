// Prefix shim
window.Intent = window.Intent || window.WebKitIntent;
window.navigator.startActivity = window.navigator.startActivity || window.navigator.webkitStartActivity;
window.intent = window.intent || window.webkitIntent;

okBtn = document.getElementById("ok")

function accept() {
  chrome.storage.sync.get('tentEntity', function(data) {
    window.intent.postResult(data.tentEntity)
  })
}

document.getElementById("cancel").addEventListener("click", function() {
  window.intent.postFailure("user_cancelled")
})

okBtn.addEventListener("click", accept)
