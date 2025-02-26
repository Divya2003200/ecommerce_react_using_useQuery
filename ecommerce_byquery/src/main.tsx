 
// In your main application file (e.g., index.tsx)
import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App'; // Assuming App is your main component
import {BrowserRouter as Router} from 'react-router-dom'

// Create a new QueryClient instance
const queryClient = new QueryClient(); 

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}> 
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

