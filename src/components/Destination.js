import React, {Component} from 'react';
import '../index.css';

class Destination extends Component{

  constructor(props){
    super(props);
    this.state = {
      selectedPlanet: '',
      somedata: ''
    }
  }

  componentDidUpdate(prevState) {
    const { temp_selected_planet_distance } = this.props;
    const t = this.props.planets.filter((i) => i.distance === temp_selected_planet_distance);
    console.log("t: ", t, "\nselected planet: ",t && t[0] && t[0].name);
    if(prevState.selectedPlanet !== this.state.selectedPlanet){
      this.setState({
        selectedPlanet: t && t[0] && t[0].name
      })
    }
    console.log("this.state.selectedPlanet: ", this.state.selectedPlanet);
  }

  render(){
    // console.log("this.prop(Destination)",this.props);
    const planets_options = this.props.derived_planets
                                .map(i => <option 
                                            value={i.name}
                                            key={i.name}
                                            // onClick={(i) => this.props.selectPlanet(i.distance)}
                                          >{i.name}</option>);
    // console.log("Planet_Options: ", planets_options);
    const vehicle_options = this.props.vehicles
                                .map(i => <div key={i.name+1000}>
                                            <input 
                                              type="radio" id={i.name}
                                              key={i.name}
                                              name="vehicle_type" value={i.name}
                                              disabled={i.total_no < 1 ? true : false}
                                              onChange={this.props.selectVehicle}
                                            />
                                            <label for={i.name}
                                              key={i.name+100}
                                            >
                                              {i.name + "(" + i.total_no + ")"}
                                            </label>
                                          </div>
                                    )
    // console.log("Vehicle_Options: ", vehicle_options);
    // const { temp_selected_planet_distance } = this.props;
    // const t = this.props.planets.filter((i) => i.distance === temp_selected_planet_distance);
    // console.log("selected planet: ",t && t[0] && t[0].name);
    const { selectedPlanet } = this.state;
    return(
      <div className="Destination_P">
        <select onChange={this.props.selectPlanet}>
          <option 
            value="" 
            selected disabled hidden>
            {
              selectedPlanet ? selectedPlanet : 'select'
            }
          </option>
          {
            planets_options
          }
        </select>
        {
          this.props.temp_selected_planet_distance > 0 && (
            <form>
              {
                vehicle_options
              }
            </form>
          )
        }
      </div>
    )
  }

}

export default Destination;