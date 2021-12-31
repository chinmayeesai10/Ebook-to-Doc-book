import React from "react";
import axios from 'axios';
import download from 'downloadjs'

export default class XmlToPdf extends React.Component {

  exportAsPdf = (xmlString) => {
    var data = {
      xml:xmlString.replace(/xmlns=""/g,"")
    };
    axios
      .post("http://localhost:5000/api/pdf", data,{
        responseType: 'blob'
      })
      .then(response => {
        download(response.data, "myBook.pdf", 'application/pdf')
        console.log(response)
        this.setState({ dataId: response.data.id })
      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
  };

  exportAsHTML = (xmlString) => {
    var data = {
      xml:xmlString.replace(/xmlns=""/g,"")
    };
    axios
      .post("http://localhost:5000/api/html", data,{
        responseType: 'blob'
      })
      .then(response => {
        download(response.data, "myBook.html", 'application/html')
        console.log(response)
        this.setState({ dataId: response.data.id })
      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
  };

  downloadXML = (xmlString) => {
    var data = {
      xml:xmlString.replace(/xmlns=""/g,"")
    };
    axios
      .post("http://localhost:5000/api/xml", data,{
        responseType: 'blob'
      })
      .then(response => {
        download(response.data, "myBook.xml", 'application/xml')
        console.log(response)
        this.setState({ dataId: response.data.id })
      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
  };

  render() {
    const divStyle={
      flexDirection:'row',
      justifyContent: 'space-around'
    }
    const lineStyle = {
      borderWidth: 0.5,
      borderColor: 'black',
    }
    const funStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems : 'center',
    };
    const border = {
          border: '1px solid rgba(0, 0, 0, 0.05)', 
    };
    return (
      <div style={funStyle}>
        <div style={border}> 
          <h3> Convert to pdf</h3>
          <button onClick={this.exportAsPdf.bind(this,this.props.xml)}>To PDF</button>
        </div>
        <div>
          <h3> Convert to html</h3>
          <button onClick={this.exportAsHTML.bind(this,this.props.xml)}>To HTML</button>
        </div>
        <div>
          <h3> Save changes</h3>
          <button onClick={this.downloadXML.bind(this,this.props.xml)}>Download XML</button>
        </div>
      </div>
    );
  }
}
