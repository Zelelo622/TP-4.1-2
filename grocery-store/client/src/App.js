import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
