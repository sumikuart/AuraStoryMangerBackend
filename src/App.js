// Base imports
import React from 'react';


// ----------------------------------------- Components:
// FileCenter:
import UploadFileComponent from './component/fileCenter/uploadFile/uploadFile.component';
import DownloadFileComponent from './component/fileCenter/downloadFile/downloadfile.component'

function App() {
  return (
    <div className="App">

      <UploadFileComponent/>
      <DownloadFileComponent />
      
    </div>
  );
}

export default App;
