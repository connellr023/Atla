import React from "react";
import dynamic from "next/dynamic";
import 'leaflet/dist/leaflet.css';

const MapElementDyn = dynamic(() => import("../components/MapElement"), { ssr: false })

class Map extends React.Component {
  public render = () => {
    return (
      <main className="flex-wrapper">
        <MapElementDyn initialPosition={[51.049999, -114.066666]} />
      </main>
    );
  }
}

export default Map;