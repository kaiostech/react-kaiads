import React, {useState} from 'react';
import {Dashboard} from './views/Dashboard';
import {DPad} from './views/DPad';
import {BannerAd} from './views/BannerAd';
import {FullscreenAd} from './views/FullscreenAd';
import './css/App.css';

function App() {
  const [view, setView] = useState(0);
  const views = [
    <Dashboard viewIndex={view} navToView={setView}/>,
    <DPad viewIndex={view} navToView={setView}/>,
    <FullscreenAd viewIndex={view} navToView={setView}/>,
    <BannerAd viewIndex={view} navToView={setView}/>,
  ];
  return views[view];
}

export default App;
