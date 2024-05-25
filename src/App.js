import React from 'react';
import logo from './logo.svg';
import './App.css';
import Tracker from './component/expTracker/expTracker';
import Transac from './component/transac/transac';
import Context from "./component/context";
import { useState } from 'react';
import Grid from '@mui/material/Grid';

function App() {
  const [expenses, setXpenses] = useState([]);
  const [bal, setBal] = useState(0);
  const [totalExp, setTotalExp] = useState(0);
  const [percentage, setPercentage] = useState([
    { name: "Food", value: 0 },
    { name: "Entertainment", value: 0 },
    { name: "Travel", value: 0 },
  ]);


  // const [dialogTitle, setXpenses] = useState([]);
  const [open, setOpen] = React.useState(false);
  return (
    <Context.Provider value={{ expenses, setXpenses, open, setOpen, bal, setBal, totalExp, setTotalExp, percentage, setPercentage }}>
      <div className='background'>
            <Tracker />
            <Transac />
      </div>
    </Context.Provider>
  );
}

export default App;
