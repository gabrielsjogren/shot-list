import React from 'react';
import AppHeader from './components/Header';
import CardWithPlayers from './components/Players';
import { GlobalProvider } from './context/GlobalState';

import './App.css';

function App() {
  return (
    <GlobalProvider>
      <AppHeader />
      <div className="container">
        <CardWithPlayers />
      </div>
    </GlobalProvider>
  );
}

export default App;
