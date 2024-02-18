import React from "react";
import Location from "@/shared/Location";

export interface MapContextProps
{
    selectedLocation: Location
    updateSelectedLocation: (newLocation: Location) => void
}

const MapContext = React.createContext<MapContextProps | null>(null);

export default MapContext;