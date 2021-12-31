import React, {Component} from 'react';
import RichTextEditor from 'react-rte';


function convertLabelToValue(str) {
  return str.toLowerCase().replace(/ /g, '_');
}

class RTFInput extends Component {
    // static propTypes = {
    //   onChange: PropTypes.func
    // };
    constructor(props){
      super(props);
      this.state = {
        value: RichTextEditor.createValueFromString(this.props.value, 'html')
      }
    }

    componentWillReceiveProps(nextProps) {
      console.log("new props!")
      console.log(nextProps.value)
      console.log(this.state.value.toString('html'))
      if(nextProps.value !== this.state.value.toString('html')) {
        console.log("changed!")
        this.setState({value: RichTextEditor.createValueFromString(nextProps.value, 'html')})
      }
    }
   
    onChange = (value) => {
      this.setState({value},()=>{
        console.log("in on change")
        // this.props.onChange(this.state.value.toString('html'))
        this.props.onChange({
          value: this.state.value.toString('html'),
          label: this.state.value.toString('html'),
          options: this.props.options
        })
      });
    }
   
    render () {
      return (
        <RichTextEditor
          value={this.state.value}
          onChange={this.onChange}
          onKeyUp={this.props.onKeyUp}
        />
      );
    }
  }

export default RTFInput;