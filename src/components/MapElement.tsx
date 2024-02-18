import { MapContainer, TileLayer,Marker, Popup} from 'react-leaflet'
import React from "react";
import styles from "@/styles/MapElement.module.scss";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import festival from '/festival.png';
import { hostname } from '@/shared/utils';
import LocationResponse from '@/shared/LocationResponse';
interface MapComponentProps
{
  serverSideProps: LocationResponse,
  otherProps: {
    initialPosition: [number, number]
  }
}

export const getServerSideProps = async (context: any): Promise<{ props: MapComponentProps | {} }> => {
  const { id } = context.params;

  try {
    const response = await fetch(`${hostname}/api/locations/`);
    const locations = await response.json();

    return {
      props: { locations },
    };
  }
  catch (error) {
    return {
      props: {}
    };
  }
};


class MapElement extends React.Component<MapComponentProps> {
  constructor(props:any){
    super(props);
    
  }
  public render = () => {
    const { serverSideProps, otherProps} = this.props;
    const hou = new L.Icon({
      className:'marker-unselected',
       iconUrl: festival,
       iconRetinaUrl: festival,
       popupAnchor:  [-0, -0],
       iconSize: [15,15]
   });
    return (
      
      <div className={styles.container}>
        <MapContainer className={styles.map}  center={[51.049999,-114.066666]} zoom={13}
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