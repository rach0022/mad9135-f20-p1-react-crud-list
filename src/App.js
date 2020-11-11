import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
// import components
import AppNav from './componenets/AppNav.js'
import CreatureList from './componenets/CreatureList.js'

function App() {
  // test catalog switch to useLocalStorageState in the future to recall from localStorage
  const catalog = [
    {
      id: 1,
      name: "Spotter",
      type: "Mammal",
      imageURL: "https://placedog.net/500",
      infoURL: "https://en.wikipedia.org/wiki/Dog"
    }]

  // return the generated jsx app 
  return (
    <div className="App">
      <Router>
        {/* First the AppNavigation bar */}
        <AppNav />

        {/* Now the Router Switch To Switch between pages */}
        <Switch>
          <Route exact path="/">
            <CreatureList catalog={catalog} />
          </Route>


        </Switch>
      </Router>
    </div>
  );
}

export default App;
