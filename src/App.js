import React, { Component } from 'react';
import './App.css';

import Destination from './components/Destination';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      planets: [],
      vehicles: [],
      temp_selected_planet_distance: 0,
      temp_selected_vehicle_speed: 0,
      timeTaken: 0,
    }
  }

  componentDidMount(){
    this.fetchPlanets();
    this.fetchVehicles();
  }

  fetchPlanets = () => {
    fetch('https://findfalcone.herokuapp.com/planets')
      .then(function(response) {
        return response.json();
      })
      .then((myJson) =>
        this.setState({
          planets: myJson
        })
      );
  }

  fetchVehicles = () => {
    fetch('https://findfalcone.herokuapp.com/vehicles')
      .then(function(response) {
        return response.json();
      })
      .then((myJson) =>
        this.setState({
              vehicles: myJson
        })
      );
  }

  selectPlanet = (e) => {
    var { planets } = this.state;
    const temp_selected_planet_name = e.target.value;
    const temp_selected_planet = planets.filter(i => i.name === temp_selected_planet_name);
    // console.log("temp_selected_planet_name: ", temp_selected_planet_name);
    // console.log("temp_selected_planet distance: ", temp_selected_planet[0].distance);
    this.setState({
      temp_selected_planet_distance: temp_selected_planet[0].distance
    })
  }

  selectVehicle = (e) => {
    var { vehicles } = this.state;
    const temp_selected_vehicle_name = e.target.value;
    var updated_total_number;

    const temp_selected_vehicle = vehicles.filter(i => i.name === temp_selected_vehicle_name);
    // console.log("temp_selected_vehicle_name: ", temp_selected_vehicle_name);
    console.log("temp_selected_vehicle speed: ", temp_selected_vehicle[0].speed);
    this.calculateTimeLeft(temp_selected_vehicle[0].speed);
    vehicles.forEach( (element) => {
      if(element.name === temp_selected_vehicle_name){
        updated_total_number = element.total_no - 1;
      }
    })
    console.log("updated_total_number: ", updated_total_number );
    // this.setState({
    //   vehicles: vehicles
    // })
  }

  calculateTimeLeft = (temp_selected_vehicle_speed) => {
    const { 
      temp_selected_planet_distance
    } = this.state;
    console.log(temp_selected_planet_distance, temp_selected_vehicle_speed);
    const temp_total_time = temp_selected_planet_distance / temp_selected_vehicle_speed;
    const timeTaken = this.state.timeTaken + temp_total_time;
    this.setState({
      timeTaken
    })
    // console.log("time taken: ", temp_total_time);
  }

  render() {
    
    return (
      <div className="App">
        <h1> Finding Falcon!! </h1>
        <h2> Select Planets you want to search in: </h2>
        <h4> Time Taken: {this.state.timeTaken}</h4>
        { 
          !![].length && <p>hello</p> 
        }

        { 
           <Destination 
            planets={this.state.planets} 
            vehicles={this.state.vehicles}
            selectPlanet={this.selectPlanet}
            selectVehicle={this.selectVehicle}
          />
        }
        {
          <Destination 
            planets={this.state.planets} 
            vehicles={this.state.vehicles}
            selectPlanet={this.selectPlanet}
            selectVehicle={this.selectVehicle}
          />
        }
      </div>
    );
  }
}

export default App;
