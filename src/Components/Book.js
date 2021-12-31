import { Title } from "@material-ui/icons";
import React from "react";
import {withRouter} from 'react-router-dom';
import App from "./Book/App.tsx";
import axios from 'axios';
import Search from "./search.js";

class Book extends React.Component{

    constructor(props){
        super(props);
        this.getDocbookPara = this.getDocbookPara.bind(this);
    }

    state = {
        xml : null,
        options_dict : [],
        temp_new: {},
        docbkStr:""
    }

    serializer = new XMLSerializer();
    parser = new DOMParser();

    getDocbookPara = (rtfString) => {
        console.log(rtfString)
        var data = {
          rtf:rtfString
        };
        axios
          .post("http://localhost:5000/api/rtf", data,{
          })
          .then(response => {
            this.setState({
                docbkStr : response.data
            })
          })
          .catch(error => {
            console.error("There was an error!", error);
          });
      };

    insertXML = (path) =>  { 
        var xml = this.state.xml;
        if(path.length === 1){
            var newChap = xml.createElement("chapter"); 
            var titleText = xml.createTextNode("");
            var newTitle = xml.createElement("title");
            newTitle.appendChild(titleText);
            newChap.appendChild(newTitle);
            xml.documentElement.appendChild(newChap);
        }
        else if(path.length === 2){
            var index = path[1]+1;
            console.log(index);
            var chapter = xml.documentElement.childNodes[index];
            console.log(xml.documentElement.childNodes)
            var paraText = xml.createTextNode("");
            var para = xml.createElement("para");
            para.appendChild(paraText);
            chapter.appendChild(para);
        }
        this.setState({
            xml : xml
        },()=>{console.log(this.state.xml)})
    }

    updateXML = (path, payload, indexToUpdate) => {
        var xml = this.state.xml;
        console.log(path)
        console.log(indexToUpdate)
        payload.value = payload.value.replace(/_/g," ");
        if (path.length === 1) {
            xml.documentElement.childNodes[indexToUpdate + 1].childNodes[0].childNodes[0].nodeValue = payload.value
        }
        else if (path.length === 2) {
            this.getDocbookPara(payload.value);
            console.log(this.state.docbkStr)
            var childNode = this.parser.parseFromString(this.state.docbkStr, "text/xml");
            console.log(childNode)
            this.deleteXML(path,indexToUpdate)
            var nextNode = xml.documentElement.childNodes[path[1] + 1].childNodes[indexToUpdate + 1]
            xml.documentElement.childNodes[path[1] + 1].insertBefore(childNode.documentElement,nextNode);
            // xml.documentElement.childNodes[path[1] + 1].childNodes[indexToUpdate + 1].childNodes[0].nodeValue = payload.value
        }
        this.setState({
            xml: xml
        }, () => { console.log(this.state.xml) })
    }

    deleteXML = (path,indexToRemove) => {
        var xml = this.state.xml;
        console.log("inside delete xml")
        if (path.length === 1) {
            var delNode = xml.documentElement.childNodes[indexToRemove + 1]
            delNode.parentNode.removeChild(delNode);
        }
        else if (path.length === 2) {
            var delNode = xml.documentElement.childNodes[path[1] + 1].childNodes[indexToRemove + 1]
            delNode.parentNode.removeChild(delNode);
        }
        this.setState({
            xml: xml
        }, () => { console.log(this.state.xml) })
    }

    walk = (node)=> {
        var child, next;
        var reBlank = /^\s*$/;
        switch (node.nodeType) {
            case 3: // Text node
                if (reBlank.test(node.nodeValue)) {
                    node.parentNode.removeChild(node);
                }
                break;
            case 1: // Element node
            case 9: // Document node
                child = node.firstChild;
                while (child) {
                    next = child.nextSibling;
                    this.walk(child);
                    child = next;
                }
                break;
        }
    }

    search = (text) => {
        var chapters =  this.state.xml.documentElement.childNodes;
        var length = chapters.length;
        var ans = ""
        var flag = 0
        for (var i = 1; i < length; i ++){
            var para_length = chapters[i].childNodes.length
            for (var j = 1; j < para_length; j ++){
                var temp_text = chapters[i].childNodes[j].childNodes[0].nodeValue
                var list = temp_text.split(" ")
                for (var k = 0; k < list.length; k ++){
                    console.log(list[k])
                    if (list[k].includes(text) ){
                        ans = (chapters[i].childNodes[j].childNodes[0].nodeValue)
                        flag= 1
                        break
                    }
                }
                if (flag == 1){
                    break
                }
            }
            if (flag == 1){
                break
            }
        }
        console.log("ans")
        console.log(ans)
        return ans
    }


    componentDidMount(){
        console.log('Hehehehehehehe');
        this.setState({
            xml : this.props.location.state.xml
        },()=>{
            this.walk(this.state.xml);
            var titleText = this.state.xml.getElementsByTagName("title")[0].childNodes[0].nodeValue
            console.log(this.state.xml)
            var temp_new = this.state.temp_new;
            // var options_dict = this.state.options_dict;
            var chapters =  this.state.xml.documentElement.childNodes;
            console.log(chapters)
            temp_new['label'] = titleText;
            temp_new['value'] = titleText;
            temp_new['options'] = [];
            console.log('temp_new ', temp_new);
            for(var j = 1; j < chapters.length; j++){
                var temp_new1 = {};
                // var temp = [];
                var node, chapterContent = chapters[j].childNodes;
                /* here insert title of chapter chapters[j].childNodes[0].nodeValue as label and value of temp_new1*/
                temp_new1['value'] = chapters[j].childNodes[0].textContent;
                temp_new1['label'] = chapters[j].childNodes[0].textContent;
                temp_new1['options'] = []
                for(var i = 1; i < chapterContent.length; i++)
                {
                    node = chapterContent[i];
                    // temp.push(node);
                    var temp_new2 = {};
                    temp_new2['label'] = node.textContent;
                    temp_new2['value'] = node.textContent;
                    temp_new2['options'] = [];
                    temp_new1['options'].push(temp_new2); 
                    console.log(temp_new)
                    if(node.nodeType !== Node.TEXT_NODE) {
                        console.log(node.textContent);
                    }
                }
                temp_new['options'].push(temp_new1);
                // console.log('hehedict', temp);
            }
            // options_dict.push(temp);
            // console.log('optionsdict ', options_dict);
            console.log('heheooptions', temp_new);
            this.setState({
                options_dict: [temp_new]
            })
            // console.log("dict", options_dict);
            // var node, childNodes = this.state.xml.getElementsByTagName("chapter")[0].childNodes;
        });
    }


    render(){

        return(
            <div>
                <App insertXml={this.insertXML} search={this.search} updateXml = {this.updateXML} deleteXml={this.deleteXML} xml={this.state.xml==null? "":this.serializer.serializeToString(this.state.xml)} options={this.state.options_dict}/>
            </div>
        )
    }
}

export default withRouter(Book);