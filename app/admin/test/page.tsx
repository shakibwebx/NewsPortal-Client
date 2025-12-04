'use client';

import { useEffect, useState } from 'react';

export default function TestPage() {
  const [cookies, setCookies] = useState('');
  const [localStorage, setLocalStorage] = useState('');

  useEffect(() => {
    setCookies(document.cookie);
    setLocalStorage(window.localStorage.getItem('admin_user') || 'null');
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Info</h1>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded border">
          <h2 className="font-bold mb-2">Cookies:</h2>
          <pre className="text-sm overflow-auto">{cookies || 'No cookies'}</pre>
        </div>

        <div className="bg-white p-4 rounded border">
          <h2 className="font-bold mb-2">LocalStorage (admin_user):</h2>
          <pre className="text-sm overflow-auto">{localStorage}</pre>
        </div>

        <button
          onClick={() => {
            setCookies(document.cookie);
            setLocalStorage(window.localStorage.getItem('admin_user') || 'null');
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
