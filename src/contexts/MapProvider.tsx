import React from "react";
import MapContext from "@/contexts/MapContext";
import Location from "@/shared/Location";

interface MapProviderState
{
  selectedLocation: Location
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
    }
  };

  public updateSelectedLocation = (newLocation: Location) => {
      this.setState({ selectedLocation: newLocation });
  };

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