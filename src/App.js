
import './App.css';
import HomeScreen from './Screens/HomeScreen'
import Book from './Components/Book'
import { HashRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={HomeScreen} /> 
        <Route path="/book" component={Book} />
      </div>
    </Router>
    // <div>
    //   <Input/>
    // </div>
  );
}

export default App;
