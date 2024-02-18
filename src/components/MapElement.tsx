import { MapContainer, TileLayer,Marker,Popup } from "react-leaflet"
import LocationResponse from "@/shared/LocationResponse";
import MapContext from "@/contexts/MapContext";
import React from "react";
import styles from "@/styles/MapElement.module.scss";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.css";

interface MapComponentProps
{
  locations: LocationResponse,
  initialPosition: [number, number],
  displayLocations:boolean
}

class MapElement extends React.Component<MapComponentProps> {
  private handleMouseOver = (e: any) => {
    e.target.openPopup();
  };

  private handleMouseOut = (e: any) => {
    e.target.closePopup();
  };

  public render = () => {
    const { locations, initialPosition, displayLocations} = this.props;

    const festival = new L.Icon({
      className:"marker-unselected",
      iconUrl: "/location.png",
      iconRetinaUrl: "/location.png",
      popupAnchor:  [-0, -0],
      iconSize: [15,15]
    });
   
    return (
      <MapContext.Consumer>
        {(context) => (
          <div className={styles.container}>
            <MapContainer className={styles.map} center={initialPosition} zoom={13}
                zoomControl={false} >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {displayLocations ? locations.map((location, i) =>{
                  return (
                    <Marker riseOnHover={true} key={i} eventHandlers={{ mouseover: this.handleMouseOver, mouseout: this.handleMouseOut, click: () => context?.updateSelectedLocation(location) }} icon={festival} position={[location.longitude, location.latitude]}>
                      <Popup className={styles.popup}>
                        {location.name}
                      </Popup>
                    </Marker>
                  )
                }): null}
            </MapContainer>
          </div>
        )}
      </MapContext.Consumer>
    );
  }
}

export default MapElement;