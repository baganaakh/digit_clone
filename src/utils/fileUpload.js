import http from "./http-common";
import axios from "axios"

const CONFIG = {
  url: process.env.REACT_APP_BACKEND_API,
  appName: process.env.REACT_APP_NAME || '',
  clientId: process.env.REACT_APP_CLIENT_ID || '',
  clientSecret: process.env.REACT_APP_CLIENT_SECRET || '',
  token: process.env.REACT_APP_CLIENT_TOKEN || ''
};

class UploadFilesService {
  
  async upload(file, onUploadProgress) {
    try {
      const formData = new FormData();

      formData.append('files', file);

      const assetAPIURL = 'https://api.digit.mn'
      
      //console.debug('zurag upload hiij bna=', formData)
      return http.post( `${assetAPIURL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          //"Authorization": "Bearer " + CONFIG.token
        },
        onUploadProgress,
      });

      
    } catch(error) {
      console.debug('Алдаа', error)
    }
    
  }

  getFiles() {
    return http.get("/");
  }
}

export default new UploadFilesService();
