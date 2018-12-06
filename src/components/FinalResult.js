import React, {Component} from 'react';
import '../index.css';

class FinalResult extends Component{

  constructor(props){
    super(props);
    this.state = {
      somedata: ''
    }
  }

  render(){
    return(
      <div className="App">
      {
        this.state.somedata
      }
      </div>
    )
  }

}

export default FinalResult;