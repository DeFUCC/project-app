import { ref } from 'vue'
export function useInstall() {
  let deferredPrompt
  const installable = ref(false)
  window.addEventListener('beforeinstallprompt', function (event) {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    event.preventDefault()
    installable.value = true
    // Stash the event so it can be triggered later.
    deferredPrompt = event
  })

  // Installation must be done by a user gesture! Here, the button click
  function installApp(e) {
    deferredPrompt.prompt()
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt')
      } else {
        console.log('User dismissed the A2HS prompt')
      }
      deferredPrompt = null
    })
  }
  return {
    installApp,
    installable,
  }
}
