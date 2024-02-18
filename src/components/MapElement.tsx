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
  initialPosition: [number, number]
}


class MapElement extends React.Component<MapComponentProps> {
  constructor(props:any){
    super(props);
    this.state = {
      displayLocations: true
    }
  }
  public render = () => {

    const { locations, initialPosition } = this.props;


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
            {this.state.displayLocations ? locations.map((thing,c) =>{
              console.log(thing)
                return(
                  <Marker  icon={festival}  position={[thing.longitude,thing.latitude]} eventHandlers={{
                    click: (e) => {
                        var te = [0,c];
                        //this.forceUpdate();
                        //this.setState({selectedAmmenity:te});
                        //this.setState({selectedTopIndex:0});
                        //this.setState({menuColapsed:false})
                        //console.log("selecting house")
                        //this.forceUpdate();
                    },
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