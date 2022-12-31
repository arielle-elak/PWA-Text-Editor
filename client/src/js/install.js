// Install script for installing the PWA to local computer
const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA

// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Store the triggered events
  window.deferredPrompt = event;
  // Remove the hidden class from the button.
  butInstall.classList.toggle('hidden', false);
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  // Call the stored event
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  // Show prompt
  promptEvent.prompt();

  // Reset the deferred prompt variable as it may only be used once
  window.deferredPrompt = null;

  // Re-hide the button
  butInstall.classList.toggle('hidden', true);
});

// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // Double check that the prompt has indeed been cleared from the previous function
  window.deferredPrompt = null;
});
