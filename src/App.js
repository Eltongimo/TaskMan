import Main from './main/Main' 
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import Modal from 'react-modal'

Modal.setAppElement('#root')
function App() {
  return (
    <Router>
        <Main/>
    </Router>
  );
}

export default App;
