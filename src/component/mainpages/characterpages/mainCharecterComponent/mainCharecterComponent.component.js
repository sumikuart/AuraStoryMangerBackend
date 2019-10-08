import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import './mainCharecterComponent.style.css'

import SelectOrMakeCharecter from './selectOrCreate/selectorcreate.component'
import EditChareacter from './editCharecter/editcharecter.component'

class MainCharecterComponent extends Component {

    state={
        Charecter:{
            chosenCharecterId: 'NewId'
        }
 
    }



    render(){
        return(
            <div className="mainCharecterComponentStyle">

                <div>
                    <SelectOrMakeCharecter />

                    <Route path='/home/characters/edit/:id/:v' component={EditChareacter} charecterToEdit={this.state.Charecter} />

                </div>


            </div>
        )
    }

}

export default MainCharecterComponent