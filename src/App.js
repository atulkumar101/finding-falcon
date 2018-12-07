import React, { Component } from 'react';
import './App.css';

import Destination from './components/Destination';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      planets: [],
      derived_planets: [],
      vehicles: [],
      selected_planets: [],
      selected_vehicles: [],
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
          planets: myJson,
          derived_planets: myJson
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
    this.updateSelectedPlanetList(temp_selected_planet_name);
    this.updateDerivedPlanetList(temp_selected_planet_name);
  }

  updateDerivedPlanetList = (temp_selected_planet_name) => {
    const { derived_planets } = this.state;
    // console.log("derived_planets: ", derived_planets);
    const t_derived_planets = derived_planets.filter( (i) => i.name !== temp_selected_planet_name );
    // console.log("t_derived_planets: ", t_derived_planets);
    this.setState({
      derived_planets: t_derived_planets
    })
    // console.log("this.state.derived_planets", this.state.derived_planets);
  }

  updateSelectedPlanetList = (temp_selected_planet_name) => {
    var { selected_planets } = this.state;
    selected_planets.push(temp_selected_planet_name);
    // console.log("this.state.selected_planets: ",this.state.selected_planets);
  }

  selectVehicle = (e) => {
    var { vehicles } = this.state;
    const temp_selected_vehicle_name = e.target.value;
    
    const temp_selected_vehicle = vehicles
                                    .filter(i => i.name === temp_selected_vehicle_name);
    // console.log("temp_selected_vehicle_name: ", temp_selected_vehicle_name);
    // console.log("temp_selected_vehicle speed: ", temp_selected_vehicle[0].speed);
    this.updateSelectedVehicleList(temp_selected_vehicle_name);
    this.calculateTimeLeft(temp_selected_vehicle[0].speed);
    this.updatedTotalVehicleNumber(temp_selected_vehicle_name);
  }

  updateSelectedVehicleList = (temp_selected_vehicle_name) => {
    var { selected_vehicles } = this.state;
    selected_vehicles.push(temp_selected_vehicle_name);
    // console.log("this.state.selected_vehicles: ",this.state.selected_vehicles);
  }

  updatedTotalVehicleNumber = (temp_selected_vehicle_name) => {
    var { vehicles } = this.state;
    // debugger
    // console.log("vehicles(b): ", this.state.vehicles );
    // console.log("temp_selected_vehicle_name: ", temp_selected_vehicle_name);
    vehicles.forEach( (element) => {
      if(element.name === temp_selected_vehicle_name){
        // console.log("element.total_no (b): ", element.total_no );
        element.total_no = element.total_no - 1;
        // console.log("element.total_no (a): ", element.total_no );
      }
    })
    this.setState({
      vehicles
    })
    // console.log("vehicles state (a): ", this.state.vehicles );
  }

  calculateTimeLeft = (temp_selected_vehicle_speed) => {
    const { 
      temp_selected_planet_distance
    } = this.state;
    // console.log(temp_selected_planet_distance, temp_selected_vehicle_speed);
    const temp_total_time = temp_selected_planet_distance / temp_selected_vehicle_speed;
    const timeTaken = this.state.timeTaken + temp_total_time;
    this.setState({
      timeTaken
    })
    // console.log("time taken: ", temp_total_time);
  }

  render() {
    
    return (
      <div className="App" style={{margin: "2px"}}>
        <h1> Finding Falcon!! </h1>
        <h2> Select Planets you want to search in: </h2>
        <h4> Time Taken: {this.state.timeTaken}</h4>
        { 
          // !![].length && <p>hello</p> 
        }

        { 
           <Destination 
            planets={this.state.planets} 
            derived_planets={this.state.derived_planets}
            vehicles={this.state.vehicles}
            selected_planets={this.state.selected_planets}
            selected_vehicles={this.state.selected_vehicles}
            selectPlanet={this.selectPlanet}
            selectVehicle={this.selectVehicle}
            temp_selected_planet_distance={this.state.temp_selected_planet_distance}
          />
        }
        
        {
          // <Destination 
          //   planets={this.state.planets} 
          //   vehicles={this.state.vehicles}
          //   selectPlanet={this.selectPlanet}
          //   selectVehicle={this.selectVehicle}
          // />
        }
        <div>
        <button
          className="btn btn-primary"
          style={{marginTop: "100px"}}
          onClick={this.findFalcon}
        >
        Find Falcon
        </button>
        </div>
      </div>
    );
  }
}

export default App;
