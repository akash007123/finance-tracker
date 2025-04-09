import React from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import Charts from './components/Charts';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <HeroBanner />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div>
            <AddTransaction />
            <TransactionList />
          </div>
          <Charts />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;