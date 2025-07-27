// ✅ Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/sw.js')
      .then(function (reg) {
        console.log('✅ Service Worker registered with scope:', reg.scope);
      })
      .catch(function (err) {
        console.error('❌ Service Worker registration failed:', err);
      });
  });
}

// ✅ Optional: Log app install prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // Prevent automatic prompt
  deferredPrompt = e;
  console.log('ℹ️ App can be installed. Prompt saved.');
  
  // Example: Show your custom install button
  const installBtn = document.getElementById('install-btn');
  if (installBtn) installBtn.style.display = 'block';

  // Optional: Install flow
  if (installBtn) {
    installBtn.addEventListener('click', () => {
      installBtn.style.display = 'none';
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('✅ User accepted the install prompt');
        } else {
          console.log('❌ User dismissed the install prompt');
        }
        deferredPrompt = null;
      });
    });
  }
});
