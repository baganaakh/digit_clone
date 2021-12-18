import React, { Component } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Typography, Button, ListItem } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import UploadService from "utils/fileUpload";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EEEEEE",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      isError: false,
      fileInfos: [],
    };
  }

  componentDidMount() {
    UploadService.getFiles().then((response) => {
      this.setState({
        fileInfos: response.data,
      });
    });
  }

  selectFile(event) {
    this.setState({
      selectedFiles: event.target.files,
    });
  }

  upload() {
    let currentFile = this.state.selectedFiles[0];

    this.setState({
        progress: 0,
        currentFile: currentFile,
    });
    UploadService.upload(currentFile, (event) => {
        this.setState({
            progress: Math.round((100 * event.loaded) / event.total),
        });
    })
    .then((response) => {
        this.setState({
            message: response.data.message,
            isError: false
        });
        //return UploadService.getFiles();
        return response.data
    })
    .then((files) => {
        console.debug(' file ' + JSON.stringify(files))
        let newFile = []
        //newFile = this.state.fileInfos
        newFile.push(files)
        this.setState({
            fileInfos: newFile,
        });
        if (newFile && newFile.length){
          newFile.map(item => (
            this.props.getCoverFn(item, this.props.fileName)
          ))
        }
        //console.debug(' fileInfos ' + JSON.stringify(this.state.fileInfos))
    })
    .catch((error) => {
      console.debug('songogdson file huulahad aldaa garlaa',error)
        this.setState({
            progress: 0,
            message: "Файлыг хуулахад алдаа гарлаа",
            currentFile: undefined,
            isError: true
        });
    });

    this.setState({
        selectedFiles: undefined,
    });
  }

  render() {
    const {
        selectedFiles,
        currentFile,
        progress,
        message,
        fileInfos,
        isError
    } = this.state;
    
    return (
      <div className="mg20">
        {currentFile && (
          <Box className="mb25" display="flex" alignItems="center">
            <Box width="100%" mr={1}>
              <BorderLinearProgress variant="determinate" value={progress} />
            </Box>
            <Box minWidth={35}>
              <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
            </Box>
          </Box>)
        }

        <label htmlFor={`btn-upload` + this.props.id}>
            <input
                id={`btn-upload` + this.props.id}
                name="btn-upload"
                style={{ display: 'none' }}
                type="file"
                //inputProps={{ multiple: true }}
                onChange={this.selectFile} />
            <Button
                className="btn-choose"
                variant="outlined"
                component="span" >
                Файл сонгох
            </Button>&nbsp;&nbsp;&nbsp;&nbsp;
            <Button
                className="btn-upload"
                color="primary"
                variant="contained"
                component="span"
                disabled={!selectedFiles}
                onClick={this.upload}>
                Хуулах (Upload)
            </Button>
        </label>
        <div className="file-name">
            {selectedFiles && selectedFiles.length > 0 ? selectedFiles[0].name : null}
        </div>

        <Typography variant="subtitle2" className={`upload-message ${isError ? "error" : ""}`}>
          {message}
        </Typography>

        <Typography variant="caption" className="list-header">
          Хуулагдсан файлууд:
          </Typography>
        <ul className="list-group">
          {fileInfos && fileInfos.length && 
            fileInfos.map((file, index) => (
              <ListItem
                divider
                key={index}>
                <b>{file.length ? file[0].name : file.name}</b>
              </ListItem>
            ))}
        </ul>
      </div >
    );
  }
}