import React from "react";
import Location from "@/shared/Location";

export interface MapContextProps
{
    selectedLocation: Location
    updateSelectedLocation: (newLocation: Location) => void
    inAddEvent:boolean
    updateInAddEvent: (newState:boolean) => void
}

const MapContext = React.createContext<MapContextProps | null>(null);

export default MapContext;