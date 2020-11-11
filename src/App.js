import logo from './logo.svg';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import './App.css';
// import components
import AppNav from './componenets/AppNav.js'

function App() {
  return (
    <div className="App">
      <Router>
        {/* First the AppNavigation bar */}
        <AppNav />

        {/* Now the Router Switch To Switch between pages */}
        <Switch>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
