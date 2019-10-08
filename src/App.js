
// Base imports
import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './app.style.css'


// ----------------------------------------- Components:
//nav: 
import Navbar from './component/navpages/navigation/navigation.component'
import Sidebar from './component/navpages/sidebar/sidebar.component'
import Footer from './component/navpages/footer/footer.component'

// Login:
import LoginComponent from './component/mainpages/login/login.component'

// Landing Page: 
import LandingComponent from './component/mainpages/landingpage/landingPage.component'
import MainCharecterComponent from './component/mainpages/characterpages/mainCharecterComponent/mainCharecterComponent.component'

//File Center: 
import FileControler from './component/fileCenter/mainFileControler/filecontroler.component'


function App() {
  return (
    <div className="App">

      <Router>

        <Route exact path='/' component={LoginComponent} />

        <div className="contentGrid"> 

          <div className="topNav">
            <Route path='/home' component={Navbar} />
          </div>

          <div className="sideNav" id="sidebarhidemainid"> 
           <Route path='/home' component={Sidebar} />
          </div>

          <div className="mainContent">
            <header>
            </header>
            <main>
            <Route exact path='/home' component={LandingComponent} />
            <Route exact path='/home/files' component={FileControler} />
            <Route path='/home/characters' component={MainCharecterComponent} />
            </main>
            <footer></footer>
          </div>

          <div className="footerContent">
          <Route path='/home' component={Footer} />
          </div>
           
        </div>

      </Router>

    </div>
  );
}

export default App;
