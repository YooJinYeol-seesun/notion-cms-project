'use client';

import { Toaster as HotToaster } from 'react-hot-toast';

export default function Toaster() {
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#18181b',
          color: '#fafafa',
          borderRadius: '8px',
          padding: '12px 16px',
          fontSize: '14px',
          border: '1px solid #27272a',
        },
        success: {
          style: {
            background: '#10b981',
            color: '#ffffff',
          },
          icon: '✓',
        },
        error: {
          style: {
            background: '#ef4444',
            color: '#ffffff',
          },
          icon: '✕',
        },
      }}
    />
  );
}
