import { useState } from 'react';
import Navbar from './components/Navbar';
import TaskList from './components/TaskList';

const App = () => {
  const [view, setView] = useState('Pending');
  const [refresh, setRefresh] = useState(false);

  function refreshPage() {
    setRefresh(!refresh);
  }

  const handleNavClick = (status) => {
    setView(status);
  };

  return (
    <div className="App">
      <Navbar onNavClick={handleNavClick} view={view} />
      <TaskList view={view} refreshPage={refreshPage} />
    </div>
  );
};

export default App;