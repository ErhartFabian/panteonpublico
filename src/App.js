import {BrowserRouter,Routes,Route, Router, Switch} from "react-router-dom";
import {Home} from "./Components";

function App() {
  return (
    <Router>
      <Switch>

        <Route path="/home">
          <Home/>
        </Route>

        <Route path="/" exact component={Home}></Route>

      </Switch>
    </Router>
  );
}

export default App;
