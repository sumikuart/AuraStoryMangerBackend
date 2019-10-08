import React, { Component } from 'react'
import axios from 'axios';

import './editcharecter.style.css'

class EditChareacter extends Component {

state={

    chosenId: this.props.match.params.id,
    chosenV: this.props.match.params.v,

    ch_id: '',
    ch_name: '',
    ch_version: ''
}
// On Change Functions:
onChangeName = (e) => {
    this.setState({
        ch_name:e.target.value
    })
}

onChangeVersion = (e) => {
    this.setState({
        ch_version:e.target.value
    })
}

// Real Functions
onLoadClick = () => {
    console.log('hej')

    if(this.state.chosenId == 'newedit' || this.state.chosenId == 'new'){
        this.setState({
            ch_id:this.props.match.params.id,
            ch_name: '',
            ch_version: '',
            chosenId:'new'
    
        })
    }
    else {
        this.setState({
            ch_id:this.props.match.params.id,
            ch_name: '',
            ch_version: this.props.match.params.v
    
        })
    }

}

onSaveClick = () => {
    if(this.state.chosenId === 'new'){

        const newCh = {
            ch_name:this.state.ch_name,
            ch_version:this.state.ch_version
        }

        axios.post('http://localhost:4464/add/savech', newCh)
        .then(res => console.log(res.data))
                
        this.setState({
            chosenId:'newedit'
        })  

        

    } else if(this.state.chosenId){

    }
 

}

render(){
    return(
        <div className="mainEditComponentStyle">

            <div className="mainCharecterEditContent">
                <p>hej fra edit charecter: {this.state.chosenId} v:{this.state.chosenV}</p>

<h2>DU ER NÅET TIL SAVE FRA ARRAY</h2>
                <form>
                    <label>Name:</label>
                    <input type="text" placeholder='name'  value={this.state.ch_name} onChange={this.onChangeName}/>
                    <label>Version:</label>
                    <input type="number" placeholder='version'  value={this.state.ch_version} onChange={this.onChangeVersion}/>
                </form>
            </div>

            <div  className="mainCharecterEditTool">

                <p>Tools:</p>
                <div className="button" onClick={this.onLoadClick}><p>Load</p></div>
                <div className="button" onClick={this.onSaveClick}><p>Save</p></div>
                <div className="button"><p>Reset</p></div>
                <div className="button"><p>Delete</p></div>


            </div>


        </div>
    )


}
      

}

export default EditChareacter