import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet'
import React from "react";
import styles from "@/styles/MapElement.module.scss";

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
//import festival from '/festival.png';
import { hostname } from '@/shared/utils';

import LocationResponse from '@/shared/LocationResponse';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps
{
  locations: LocationResponse,
  initialPosition: [number, number],
  displayLocations:boolean
}


class MapElement extends React.Component<MapComponentProps> {
  constructor(props:any){
    super(props);
  }
  handleLocationSelected = (e, loc) => {
    console.log("loc",loc)
  }
  public render = () => {

    const { locations, initialPosition, displayLocations} = this.props;


    const festival = new L.Icon({
      className:'marker-unselected',
       iconUrl: '/location.png',
       iconRetinaUrl: '/location.png',
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
            {displayLocations ? locations.map((thing,c) =>{
              //console.log(thing)
                return(
                  <Marker  icon={festival}  position={[thing.longitude,thing.latitude]} eventHandlers={{
                    click: (e) =>this.handleLocationSelected(e, thing)
                    
                       
                    
                }}>
                    <Popup
                      
                    >
                      {thing.name}
                    </Popup>
                </Marker>
                )
                
            }): null}
        </MapContainer>


      </div>
    );

  }
}

export default MapElement;