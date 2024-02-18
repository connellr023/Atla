import { hostname } from '@/shared/utils';
import React from "react";
import dynamic from "next/dynamic";
import 'leaflet/dist/leaflet.css';
import Link from 'next/link'

import Categories from "../shared/Categories";
import styles from "@/styles/Map.module.scss";

const MapElementDyn = dynamic(() => import("../components/MapElement"), { ssr: false })
const AddEvent = dynamic(() => import("../components/addEvent"), { ssr: false })
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

  private values;
  private iconPaths;
  constructor(props:any){

    super(props);

    this.state = {
      selectedIndex:0,
      past_select_location:false,
      displayLocations:false
    }

    this.keys = Object.keys(Categories);

    this.values = Object.values(Categories);
    this.iconPaths = ['/all.png','/festival.png', '/education.png', '/environment.png', '/healthcare.png', '/agriculture.png', '/plus.png']
   //this.selectedIndex = 0;
    //.sideIcons = [icon,icon,icon,icon,icon,icon,icon];
  }
  setIndex = (e, i) =>{
    //if (this.state.past_){
      this.setState({selectedIndex:i});
    //}

  }
  locationSelected (e, i){

    console.log("location selected");
  }
  public render = () => {
    const { locations } = this.props;

    return (
      <main className="flex-wrapper">
       
      <div className = {styles.topMenuContainer}>
      {this.state.selectedIndex == 0 ? 
          <div className = {styles.button_background_selected}>
              <div className = {styles.icon_container_menu}>
              <img src = {this.iconPaths[0]}></img>
              </div>
              <div className = {styles.text_container_menu}>
          {"View All"}
          </div>
          </div>
       :
            <div className = {styles.button_background} onClick = {(e) =>this.setIndex(e,0)}>
                <div className = {styles.icon_container_menu}>
                <img src = {this.iconPaths[0]}></img>
                </div>
                <div className = {styles.text_container_menu}>
                {"View All"}
                </div>

            </div>}
       
          {this.keys.map((icon,i) => {
              if (i+1 == this.state.selectedIndex){
                  return(
                  <div className = {styles.button_background_selected}>
                      <div className = {styles.icon_container_menu}>
                      <img src = {this.iconPaths[i]}></img>
                      </div>
                      <div className = {styles.text_container_menu}>
                  {this.values[i]}
                  </div>
                  </div>)
              }else{
              return(
              <div className = {styles.button_background} onClick = {(e) =>this.setIndex(e,i+1)}>
                  <div className = {styles.icon_container_menu}>
                  <img src = {this.iconPaths[i+1]}></img>
                  </div>
                  <div className = {styles.text_container_menu}>
                  {this.values[i]}
                  </div>

              </div>)}
            
          })}
          {this.state.selectedIndex==6 ? <div className = {styles.button_background_selected}>
                      <div className = {styles.icon_container_menu}>
                      <img src = {this.iconPaths[6]}></img>
                      </div>
                      <div className = {styles.text_container_menu}>
                  {"Add Event"}
                  </div>
                  </div>: <div className = {styles.button_background} onClick = {(e) =>{
                    this.setIndex(e,6)
                  // this.setState({selectedIndex:6});
                   this.setState({displayLocations:true})
                  }
                    
                   }>
                      <div className = {styles.icon_container_menu}>
                      <img src = {this.iconPaths[6]}></img>
                      </div>
                      <div className = {styles.text_container_menu}>
                  {"Add Event"}
                  </div>

                  </div>}
         
          
          
      </div>
      <MapElementDyn initialPosition={[51.049999, -114.066666]} locations={locations} displayLocations = {this.state.displayLocations} />
     
      { this.state.selectedIndex==6 && this.state.past_select_location ? 
       <AddEvent ></AddEvent>:null
      } 
    </main>
    );
  }
}

export default Map;