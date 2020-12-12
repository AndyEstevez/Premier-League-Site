import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import NavbarObject from './components/Navbar/NavbarObject';
import HomePage from './components/HomePage/HomePage';
import FixturesPage from './components/FixturesPage';
import ResultsPage from './components/ResultsPage';
import StandingsPage from './components/StandingsPage';
import ClubsPage from './components/ClubsPage';
import ClubPage from './components/ClubPage/ClubPage';
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
          <Route exact path="/Clubs" component={ClubsPage}/>
          <Redirect exact from="/Clubs/:clubId/" to="/Clubs/:clubId/Fixtures" />
          <Route exact path="/Clubs/:clubId/:page?" component={ClubPage} />
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
