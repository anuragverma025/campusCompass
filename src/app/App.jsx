import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import AppRoutes from './routes';

export const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
        <Header />
        <main className="flex-1 w-full">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

