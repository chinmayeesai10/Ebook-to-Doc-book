import React from "react";
import {withRouter} from 'react-router-dom';

class Upload extends React.Component{
    componentDidMount(){
        
    }

    state = {
        selectedFile : null,
        text : ""
    };

    onChange = (event) => {
        console.log("changing!")
        this.setState({
            selectedFile : event.target.files[0]
        })
    }

    onUpload = () => {
        var fr=new FileReader();
        fr.onload = async (e) => { 
            const text = (e.target.result)
            console.log(text)
            this.setState({
                text : e.target.result
            })
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(this.state.text,"text/xml");
            this.props.history.push({
                pathname:"/book",
                state:{xml:xmlDoc}
            });
          };
        fr.readAsText(this.state.selectedFile);
    }

    render(){
        return(
            <div>
                <input type="file" onChange={this.onChange} />
                <button onClick={this.onUpload}>Upload</button>
            </div>
        )
    }
}

export default withRouter(Upload);

// x-special/nautilus-clipboard
// copy
// file:///home/ananya/Documents/DM/project/ranstuff/docbook/ex2.xml


