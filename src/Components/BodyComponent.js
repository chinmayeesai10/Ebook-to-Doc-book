import React from "react";
import '../App.css'
import Upload from './Upload/index'
import BookFromScratch from "./Upload/index1";
import XmlToPdf from './xmlToPdf'

export default class HomeComponent extends React.Component {

    render() {
        const descText = {
            fontSize: 18,
            textAlign: 'center',
            padding: 20,
            color: 'black',
        }
        const lineStyle = {
            borderWidth: 0.5,
            borderColor: 'black',
        }
        const funStyle = {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: "center"
        };
        return (
            <div>
                <h1 style={descText}> A web app to create and edit docbooks online </h1>
                <div style={funStyle}>
                    <div>
                        <h1 style={descText}>CRUD operations on an existing book/xml file </h1>
                        <Upload />
                    </div>
                    <hr style={lineStyle} />
                    <div>
                        <h1 style={descText}> Creating a book from scratch using xml files from docbook schema</h1>
                        <BookFromScratch />
                    </div>
                </div>
                {/* <XmlToPdf />  */}
            </div>
        );
    }
}
