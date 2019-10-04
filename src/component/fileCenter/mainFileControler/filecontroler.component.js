import React, { Component } from 'react'
import './filecontroler.style.css'

import DownloadFileComponent from '../downloadFile/downloadfile.component';
import UploadFileComponent from '../uploadFile/uploadFile.component';

class FileControler extends Component {

    state={
    
    }


    render(){
        return(
            <div className="filecontrolerStyle">

                <p className="headline">File Maneger</p>
                    
                <div className="fileGrid"> 
                    <div className="fileUpload">
                        <UploadFileComponent />
                    </div>
                   
                    <div className="filedownload">
                        <DownloadFileComponent />
                    </div>
                </div>
 
            </div>
        )
    }

}

export default FileControler