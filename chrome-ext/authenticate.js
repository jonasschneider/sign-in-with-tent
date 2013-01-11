// Prefix shim
window.Intent = window.Intent || window.WebKitIntent;
window.navigator.startActivity = window.navigator.startActivity || window.navigator.webkitStartActivity;
window.intent = window.intent || window.webkitIntent;

okBtn = document.getElementById("ok")
userEntity = null

chrome.storage.sync.get('tentEntity', function(data) {
  if(data && typeof data.tentEntity == 'string')
    userEntity = data.tentEntity
  else {
    document.getElementById("alert-notset").classList.remove("hide")
    document.getElementById("message").classList.add("hide")
    document.getElementById("ok").classList.add("hide")
  }
})

function accept() {
  window.intent.postResult(userEntity)
}
document.getElementById("cancel").addEventListener("click", function() {
  window.intent.postFailure("user_cancelled")
})

okBtn.addEventListener("click", accept)
