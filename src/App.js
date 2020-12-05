import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavbarObject from './components/Navbar/NavbarObject';
import HomePage from './components/HomePage';
import FixturesPage from './components/FixturesPage';
import ResultsPage from './components/ResultsPage';
import StandingsPage from './components/StandingsPage';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <Router>
      <div>
        <NavbarObject/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/Fixtures" component={FixturesPage}/>           
          <Route exact path="/Results" component={ResultsPage}/> 
          <Route exact path="/Standings" component={StandingsPage}/> 
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
