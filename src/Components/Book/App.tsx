import React, { Component } from "react";
import { Classification as ClassificationType, DropdownOption } from "./app/types";
import { Dropdown } from "./app/dropdown";
import "./index.css";
import { ThemeProvider } from "./theme";
import { Root } from "./app/styled-components";
import { Classification } from "./image-segmentation/classification";
import { defaultState } from "./default-state";
import { Row } from "./ui";
import XmlToPdf from "../xmlToPdf";
import Search from "../search";

class App extends Component<{ search: any; insertXml: any; updateXml: any ; deleteXml : any; xml : any; options : DropdownOption[]}, {}> {
  state = defaultState;
  set = false
  componentDidUpdate(){
    console.log(this.props.options)
    if(this.set == false && this.props.options.length){
      var new_state = this.state;
      new_state.classification.options = this.props.options;
      this.setState({
        classification : new_state.classification
      })
      this.set = true
    }
  }
  onChange = (classification: ClassificationType) =>
    this.setState({ ...this.state, classification });
  dropdownClicked = (index: number) =>
    this.setState(state => ({
      ...state,
      dropdownPath: [...this.state.dropdownPath, index]
    }));
  dropdownClosed = () =>
    this.state.dropdownPath.length > 1
      ? this.setState(state => ({
          ...state,
          dropdownPath: this.state.dropdownPath.slice(0, -1)
        }))
      : null;
  onAnswer = (answer: string[]) =>
    this.setState(state => ({
      ...state,
      answer: answer
    }));

  render() {
    return (
      this.state.classification.options.length?
      <ThemeProvider>
        <Root>
          <Row>
            <Dropdown
              {...this.state}
              onChange={this.onChange}
              onDropdownClick={this.dropdownClicked}
              onClose={this.dropdownClosed}
              insertXml={this.props.insertXml}
              updateXml={this.props.updateXml}
              deleteXml={this.props.deleteXml}
            />
            {/* <Classification
              highlighted={false}
              answer={this.state.answer}
              onAnswer={this.onAnswer}
              field={this.state.classification}
            /> */}
            <Search search={this.props.search}/>
          </Row>
          <XmlToPdf xml={this.props.xml}/>
        </Root>
      </ThemeProvider> :
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
}

export default App;
