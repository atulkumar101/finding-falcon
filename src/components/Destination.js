import React, {Component} from 'react';
import '../index.css';

class Destination extends Component{

  constructor(props){
    super(props);
    this.state = {
      somedata: ''
    }
  }

  render(){
    console.log("this.prop(Destination)",this.props);
    const planets_options = this.props.planets
                                .map(i => <option 
                                            value={i.name}
                                            // onClick={(i) => this.props.selectPlanet(i.distance)}
                                          >{i.name}</option>);
    // console.log("Planet_Options: ", planets_options);
    const vehicle_options = this.props.vehicles
                                .map(i => <div>
                                            <input 
                                              type="radio" id={i.name}
                                              name="vehicle_type" value={i.name}
                                              onChange={this.props.selectVehicle}
                                            />
                                            <label for={i.name}>
                                              {i.name + "(" + i.total_no + ")"}
                                            </label>
                                          </div>
                                    )
    // console.log("Vehicle_Options: ", vehicle_options);
    return(
      <div className="Destination_P">
        <select onChange={this.props.selectPlanet}>
          {
            planets_options
          }
        </select>
        {
          planets_options && (
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