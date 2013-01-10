// Prefix shim
window.Intent = window.Intent || window.WebKitIntent;
window.navigator.startActivity = window.navigator.startActivity || window.navigator.webkitStartActivity;
window.intent = window.intent || window.webkitIntent;

potentialEntity = window.intent.data
document.getElementById("entity").innerText = potentialEntity
okBtn = document.getElementById("ok")

chrome.storage.sync.get('tentEntity', function(data) {
  if(data.tentEntity) {
    if(data.tentEntity == potentialEntity)
      document.getElementById("alert-duplicate").classList.remove("hide")
    else {
      document.getElementById("currentEntity").innerText = data.tentEntity
      document.getElementById("alert-replace").classList.remove("hide")
      okBtn.classList.add("btn-danger")
    }
  }
})

function accept() {
  okBtn.setAttribute('disabled', true)
  okBtn.innerText = 'Saving..'

  chrome.storage.sync.set({'tentEntity': potentialEntity}, function() {
    window.intent.postResult(true)
  })
}

okBtn.addEventListener("click", accept)

document.getElementById("cancel").addEventListener("click", function() {
  window.intent.postFailure("user_cancelled")
})