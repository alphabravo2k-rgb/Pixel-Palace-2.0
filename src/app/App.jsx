import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { SessionProvider } from '../auth/useSession';
import { router } from './router';
import '../index.css'; // Ensure Tailwind is here

function App() {
  return (
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  );
}

export default App;
