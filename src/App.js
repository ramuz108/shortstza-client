import React, { Component ,useEffect, useState  }  from "react";
import {Route , BrowserRouter as Router , Switch , Link} from "react-router-dom";
import Home from './Pages/Home';
class App extends React.Component {
componentDidMount(){

  
}

render() {

  return (
    <div  className="container">    
    <Router>
   <Switch>
    <Route path = "/" exact component = {Home} />
  </Switch>
    </Router>

    </div>
  


  );
}

}
export default App;