import React from "react";

class Search extends React.Component {
    constructor(props) {
      super(props);
      this.state = { text: '' ,display : ''};
    }
    myChangeHandler = (event) => {
      this.setState({text: event.target.value});
    }
    onSearch = () => {
        this.setState({
            display : this.props.search(this.state.text)
        })
    }
    render() {
      return (
        <div>
            <input
                type='text'
                onChange={this.myChangeHandler}
            />
            <button onClick={this.onSearch}>search</button>
            <div>{this.state.display}</div>
        </div>
      );
    }
}

export default Search;