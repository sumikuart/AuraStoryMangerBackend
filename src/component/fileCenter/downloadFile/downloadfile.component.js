import React, { Component } from 'react'
import { NavLink, Link} from 'react-router-dom';
import axios from 'axios'
import './downloadfile.style.css'



const ListFileData = props => (

    <li><a href={"../upload/files/"+props.currentlist.list_name} download>{props.currentlist.list_name} - {props.currentlist.list_date}</a></li>

)



class DownloadFileComponent extends Component {

    state={
        filenames: []
    }

    onClickGetListHandler = (e) => {
        e.preventDefault()

        axios.get("http://localhost:4464/get_all_file_names").then(response => {
            this.setState({
                filenames:response.data
            })

            console.log(this.state.filenames)
        })


    }

filenameMapper =() =>{
    return this.state.filenames.map(function(currentItem, i){
        return <ListFileData currentlist={currentItem} key={i}/>
    })

}

    render(){
        return(
            <div className="downloadFileDiv">

                <div className="headliner">
                    <p>Download Files:</p>
                </div>
     

                <form> 
                    <button onClick={this.onClickGetListHandler}>Get List</button>
                </form>

                <ul>
                    {this.filenameMapper()}
                </ul>

            </div>
        )
    }

}

export default DownloadFileComponent