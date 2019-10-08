import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import axios from 'axios';

import './selectorcreate.style.css'

const CharecterListWorker = props => (
    <option value={props.currentcharecter._id}>{props.currentcharecter.ch_name}</option>
)

const CharecterVersionWorker = props => (
    
        <option value={props.currentcharecter.ch_version}>{props.currentcharecter.ch_version}</option>
)

class SelectOrMakeCharecter extends Component {

    state={
        selectedCharecterValue: 'addCharecter',
        selectedVersionValue: 'newV',
        charecterId: '',
        charecterVersion:[0],
        charecterList: ''
    }

    changeCharecterSelectValue = (e) =>{
        this.setState({
            selectedCharecterValue: e.target.value
        })
    }
    changeVersisonSelectValue = (e) =>{
        this.setState({
            selectedVersionValue: e.target.value
        })
    }

    selectCharecterFunction = (e) => {
        e.preventDefault(); 


        if (this.state.selectedCharecterValue=='addCharecter'){
  
            this.setState({
                selectedCharecterValue: 'addCharecter',
                selectedVersionValue: 'newV'
            }) 

        } else  if (!this.state.selectedCharecterValue) {

        } else {
            this.setState({
                selectedVersionValue: 'newV'
            }) 
        }
    }
    
    selectVersionFunction = (e) => {
        e.preventDefault();
        console.log(this.state.selectedCharecterValue, this.state.selectedVersionValue)

        if (this.state.selectedCharecterValue == 'addCharecter' && this.state.selectedVersionValue=='newV') {
            this.setState({
                charecterId: 'new',
                charecterVersion:'0'
            })
            console.log('ready to make new charecter')
        } else if(this.state.selectedVersionValue==='newV') {
            
   
            let nexV = this.state.charecterVersion[this.state.charecterVersion.length-1]; 
            console.log('v1: ', nexV)
            nexV = nexV+1
            console.log('v2: ', nexV)

            this.state.charecterVersion.push(nexV)
            console.log('v3: ', this.state.charecterVersion[this.state.charecterVersion.length-1])

            this.setState({
                charecterId: this.state.selectedCharecterValue,
                selectedVersionValue: nexV
            })

            console.log('v4: ',this.state.charecterVersion)

        }



    }

    getlistfunction = () => {
        axios.get('http://localhost:4464/getNameList')
        .then(response =>{
            this.setState({
                charecterList:response.data
            })
        }).catch(function(error) {
            console.log('an Error has accurd in get from componentDidMount in todoList component')
        })


    }

    makeCharecterSelectionList = () =>{
        if(this.state.charecterList){
            return this.state.charecterList.map(function(currentItem, i){
                return <CharecterListWorker currentcharecter={currentItem} key= {i} />
            })
        }
    }

    makeCharecterVersionList = () =>{
        if(this.state.charecterList.ch_version){
            return this.state.charecterList.ch_version.map(function(currentItem, i){
                return <CharecterVersionWorker currentcharecter={currentItem} key= {i} />
            })
        }
    }

    render(){
        return(
            <div className="SelectOrMakeCharecterStyle">

                <div className="headline">
                    <p>Charecters:</p>
                </div>

                <div className="getCompleteChList" onClick={this.getlistfunction}>
                  <p>Get list</p> 
                </div>

                <div className="flexerSelect">
                <div className="formDiv">
                    <div className="selectCharecterDiv">
                        <form onSubmit={this.selectCharecterFunction}>
                            <label>Select Charecter:</label>
                            <select onChange={this.changeCharecterSelectValue}>
                                <option value="empty" disabled>---Options---</option>   
                                <option value="addCharecter">Make New Charecter</option>
                                <option value="empty" disabled>---Existing---</option>
                                {this.makeCharecterSelectionList()}
                            </select>

                    
                            <button type="submit" className="addCharecter">Select</button>
                        </form>

                        <form onSubmit={this.selectVersionFunction}>
                            <label>Select Version:</label>
                            <select onChange={this.changeVersisonSelectValue} value={this.state.selectedVersionValue}>
                                <option value="empty" disabled>---Options---</option>
                                <option value="newV">Add New Version</option>
                                <option value="empty" disabled>---Existing---</option>
                                {this.makeCharecterVersionList()}
                            </select>

                            <button type="submit" className="addCharecterVersion">Edit Chosen Charecter</button>
                        </form>
                    </div>

                    <div className="generateCharecterLink"> 
                        <NavLink to={"/home/characters/edit/"+this.state.charecterId + "/" + this.state.charecterVersion} >Start</NavLink>
                    </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default SelectOrMakeCharecter
