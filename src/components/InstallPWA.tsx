import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

let deferredPrompt: any;

const InstallPWA = () => {
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      deferredPrompt = e;
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowInstallButton(false);
    }
    
    deferredPrompt = null;
  };

  if (!showInstallButton) return null;

  return (
    <button
      onClick={handleInstallClick}
      className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
    >
      <Download className="w-4 h-4 mr-2" />
      Install App
    </button>
  );
};

export default InstallPWA;