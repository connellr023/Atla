import { hostname } from '@/shared/utils';
import React from "react";
import dynamic from "next/dynamic";
import 'leaflet/dist/leaflet.css';

import Categories from "../shared/Categories";
import styles from "@/styles/Map.module.scss";

const MapElementDyn = dynamic(() => import("../components/MapElement"), { ssr: false })

export const getServerSideProps = async () => {
  try {
    const response = await fetch(`${hostname}/api/locations`);
    const locations = await response.json();

    return {
      props: {
        locations: locations
      },
    };
  }
  catch (error) {
    return {
      props: {}
    };
  }
}

class Map extends React.Component<any, any>
{
  private keys;

  constructor(props: any) {
    super(props);

    this.state = {
      selectedIndex:0
    }

    this.keys = Object.keys(Categories);
  }

  public render = () => {
    const { locations } = this.props;

    return (
      <main className="flex-wrapper">
        <div className = {styles.topMenuContainer}>
            {this.keys.map((_icon, i) => {
                if (i === this.state.selectedIndex){
                    return(
                    <div key={i} className = {styles.button_background_selected}>
                      <div className = {styles.icon_container_menu}>
                        <img src = {'/favicon.ico'}></img>
                      </div>
                      <div className = {styles.text_container_menu}>
                        {Object.values(Categories)[i]}
                      </div>
                    </div>
                  )
                }else{
                return (
                <div key={i} className={styles.button_background} onClick = {(e) =>{
                  this.setState({selectedIndex:i})}}>
                  <div className = {styles.icon_container_menu}>
                    <img src = '/favicon.ico'></img>
                  </div>
                  <div className = {styles.text_container_menu}>
                    {Object.values(Categories)[i]}
                  </div> 
                </div>
              )}
            })}
        </div>
        <MapElementDyn initialPosition={[51.049999, -114.066666]} locations={locations} />
      </main>
    );
  }
}

export default Map;