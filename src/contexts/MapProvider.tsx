import React from "react";
import MapContext from "@/contexts/MapContext";
import Location from "@/shared/Location";

interface MapProviderState
{
  selectedLocation: Location
  inAddEvent: boolean
}

interface MapProviderProps
{
  children: React.ReactNode
}

class MapProvider extends React.Component<MapProviderProps, MapProviderState>
{
  state: MapProviderState = {
    selectedLocation: {
      name: "",
      street: "",
      latitude: 0,
      longitude: 0
    },
    inAddEvent: false
  };

  public updateSelectedLocation = (newLocation: Location) => {
      this.setState({ selectedLocation: newLocation });
  };
  public updateInAddEvent = (newState: boolean) =>{
    this.setState({inAddEvent:newState})
  }

  public render = () => {
    const contextValue = {
      selectedLocation: this.state.selectedLocation,
      updateSelectedLocation: this.updateSelectedLocation
    };

    return (
      <MapContext.Provider value={contextValue}>
        {this.props.children}
      </MapContext.Provider>
    );
  }
}

export default MapProvider;