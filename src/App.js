import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import cuid from 'cuid'
import './App.css';
// import './static/css/materialize.css'
// import components
import AppNav from './componenets/AppNav.js'
import CreatureListView from './componenets/CreatureListView.js'
import CreatureForm from './componenets/CreatureForm.js'
import useLocalStorageState from './hooks/useLocalStorageState';

function App() {
  // test catalog switch to useLocalStorageState in the future to recall from localStorage
  const [catalog, setCatalog] = useLocalStorageState("CREATURECATALOG-CATALOG", [
    {
      id: cuid(),
      name: "Spotter",
      type: "Mammal",
      imageURL: "https://placedog.net/500",
      infoURL: "https://en.wikipedia.org/wiki/Dog"
    }
  ])

  // return the generated jsx app 
  return (
    <div className="App">
      <Router>
        {/* First the AppNavigation bar */}
        <AppNav />

        {/* Now the Router Switch To Switch between pages */}
        <Switch>
          <Route exact path="/">
            <CreatureListView data={catalog} setter={setCatalog} />
          </Route>

          <Route path="/add">
            <CreatureForm data={catalog} setter={setCatalog} hideForm={['', null]} />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
