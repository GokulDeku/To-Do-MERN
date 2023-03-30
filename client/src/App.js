import './App.css';
import Tasks from './components/Tasks';

import { Typography } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Typography variant='h3'>To-Do</Typography>
      <Tasks></Tasks>
    </div>
  );
}

export default App;
