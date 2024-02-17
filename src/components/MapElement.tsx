import { MapContainer, TileLayer,Marker, Popup} from 'react-leaflet'
import React from "react";
import styles from "@/styles/MapElement.module.scss";
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  initialPosition: [number, number];
}

class MapElement extends React.Component<MapComponentProps> {
  public render = () => {
    const { initialPosition } = this.props;

    return (
      <div className={styles.container}>
        <MapContainer className={styles.map}  center={initialPosition} zoom={13}
            zoomControl={false} >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
      </div>
    );
  }
}

export default MapElement;