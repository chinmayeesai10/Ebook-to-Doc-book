import React from "react";
import {withRouter} from 'react-router-dom';

class BookFromScratch extends React.Component {
    componentDidMount() {

    }

    state = {
        selectedFile: null,
        text: ""
    };

    onChange = (event) => {
        console.log("changing!")
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    onUpload = () => {    
        const start_text = '<book xmlns="http://docbook.org/ns/docbook" xmlns:xi="http://www.w3.org/2001/XInclude" version="5.0"></book>';
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(start_text, "text/xml");
        console.log(xmlDoc.documentElement.childNodes);
        const bookTitle = prompt('Please enter book title');
        var titleText = xmlDoc.createTextNode(bookTitle);
        var title = xmlDoc.createElement("title");
        title.appendChild(titleText);
        xmlDoc.documentElement.appendChild(title);
        this.props.history.push({
            pathname:"/book",
            state:{xml:xmlDoc}
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.onUpload}>Click to start!</button>
            </div>
        )
    }
}

export default withRouter(BookFromScratch);



