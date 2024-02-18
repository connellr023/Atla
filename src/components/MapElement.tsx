import { MapContainer, TileLayer } from 'react-leaflet'
import React from "react";
import styles from "@/styles/MapElement.module.scss";

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import festival from '/festival.png';
import { hostname } from '@/shared/utils';

import LocationResponse from '@/shared/LocationResponse';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps
{
  locations: LocationResponse,
  initialPosition: [number, number]
}

class MapElement extends React.Component<MapComponentProps> {
  public render = () => {

    const { locations, initialPosition } = this.props;


    const hou = new L.Icon({
      className:'marker-unselected',
       iconUrl: festival,
       iconRetinaUrl: festival,
       popupAnchor:  [-0, -0],
       iconSize: [15,15]
   });
    return (
      
      <div className={styles.container}>
        <MapContainer className={styles.map} center={initialPosition} zoom={13}

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