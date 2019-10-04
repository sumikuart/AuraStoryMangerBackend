import React, { Component } from 'react'
import axios from 'axios'
import './uploadFile.style.css'

class UploadFileComponent extends Component {

    state={
        selectedFile: null,
        loaded: '',
        list_name: '',
        list_name_in_use: ' ',
        Uploade_controle: 0
    }

    onChangeHandler = (e) => {


        if(e.target.value){
            this.setState({

                selectedFile: e.target.files[0],
                loaded: 0,
                list_name:e.target.files[0].name,
                list_name_in_use:' ',
                Uploade_controle: 0
                
            })

        }

        

            axios.get("http://localhost:4464/get_all_file_names").then(response => {
                this.setState({
                    list_name_in_use:response.data
                })
    
                console.log(this.state.list_name_in_use)
                console.log(this.state)
            })



    }

    onClickHandler = (e) => {
        e.preventDefault()
        
        if(this.state.Uploade_controle == 1){
            alert('ERROR: Denne fil eksistere allerede')

        }else{

        
if(this.state.list_name_in_use.length === 0){
    const data =  new FormData();

    data.append('file', this.state.selectedFile);
    data.append('list_name', this.state.list_name);


    axios.post("http://localhost:4464/upload", data, {}).then(
        res => {
            console.log(res.statusText)
        }
        
    )

    alert('Filen er Uploaded')
    this.setState({
        Uploade_controle: 1
    });

} else {
    for(var i = 0; i < this.state.list_name_in_use.length; i++){

      if(this.state.list_name_in_use[i].list_name){ 
        if (this.state.list_name_in_use[i].list_name.includes(this.state.list_name)){
            console.log('søger om navnet er brugt')
            alert('navnet er i brug; '+ this.state.list_name )
            break

        } else {

            console.log('navnet er ikke brugt')
            
            if( i === this.state.list_name_in_use.length-1){

                this.setState({
                    Uploade_controle: 1
                });

                console.log(this.state.list_name_in_use)

                            
                console.log('upload file: ', this.state.selectedFile.name);

        
                const data =  new FormData();

                data.append('file', this.state.selectedFile);
                data.append('list_name', this.state.list_name);


                axios.post("http://localhost:4464/upload", data, {}).then(
                    res => {
                        console.log(res.statusText)
                    }
                    
                )
                    alert('Filen er Uploaded')
            }


        } }

    }

}
}
        
   

    }


    render(){
        return(
            <div className="fileUploadStyle">

                <div className="headline">
                    <p>Upload File:</p>
                </div>

                
                <form>
                    <input type="file" name="file" onChange={this.onChangeHandler} />
                    <button onClick={this.onClickHandler}>Upload</button>
                </form>


            </div>
        )
    }

}

export default UploadFileComponent