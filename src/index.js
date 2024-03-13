import React from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Rutas from './routes/Routes';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId="1091575447729-qj1hgi579asju5m528uep9d0r4o7ghum.apps.googleusercontent.com">
        <Rutas />
        </GoogleOAuthProvider>
    </React.StrictMode>
);