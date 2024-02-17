import React from "react";
import styles from "@/styles/Map.module.scss";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer,Marker, Popup} from 'react-leaflet'

class Map extends React.Component<{},{mapLocation:any}> {
constructor(props){
    super(props);
    this.state = {
        mapLocation: [51.049999, -114.066666]
    }
}
  public render = () => {
    return (
      
      <main className="flex-wrapper">
                
        <div className={styles.container}>
        <MapContainer className={styles.map}  center={this.state.mapLocation} zoom={13}
                         zoomControl={ false} >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
        </MapContainer>
        </div>
      </main>
    );
  }
}

export default Map;