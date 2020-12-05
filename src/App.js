import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavbarObject from './components/Navbar/NavbarObject';
import HomePage from './components/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <Router>
      <div>
        <NavbarObject/>
        <Switch>
          <Route exact path="/" component={HomePage}/>          
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
