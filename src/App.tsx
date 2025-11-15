import { useState } from 'react';
import { Calendar } from './components/Calendar';
import './App.css';

function App() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const changeMonth = (increment: number) => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + increment, 1));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Calendar Component</h1>
      </header>
      
      <main className="app-main">
        <div className="app-controls">
          <button onClick={() => changeMonth(-1)}>Previous Month</button>
          <button onClick={() => changeMonth(1)}>Next Month</button>
        </div>
        
        <Calendar date={currentDate} />
        
        <div className="app-info">
          <p>Selected date: {currentDate.toLocaleDateString()}</p>
        </div>
      </main>
    </div>
  );
}

export default App;