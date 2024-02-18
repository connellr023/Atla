import { MapContainer, TileLayer,Marker,Popup } from "react-leaflet"
import LocationResponse from "@/shared/LocationResponse";
import EventResponse from "@/shared/EventResponse";
import React from "react";
import styles from "@/styles/MapElement.module.scss";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Categories from "@/shared/Categories";
import EventSchema from "@/shared/EventSchema";

interface MapComponentProps
{
  locations: LocationResponse,
  events:EventResponse,
  initialPosition: [number, number],
  displayLocations: boolean,
  currentCategory: number,
  updateLocation: (location: Location) => void,
  displayEventIndex: (index: number) => void
}

class MapElement extends React.Component<MapComponentProps, any>
{
  private handleMouseOver = (e: any) => {
    e.target.openPopup();
  };

  private handleMouseOut = (e: any) => {
    e.target.closePopup();
  };

  private locationSelect;
  private events;

  constructor(props:any){
    super(props)

    this.locationSelect = props.updateLocation
    this.events = props.events;

    this.state = {
      categoryState: props.currentCategory
    }
  }

  public componentWillReceiveProps(nextProps: any) {
    this.setState({ categoryState: nextProps.currentCategory });  
  }

  public handleChangeState = (newCategory: any) =>{
    this.setState({categoryState: newCategory})
  }

  public render = () => {
    const { locations, initialPosition, displayLocations} = this.props;
    
    const loc = new L.Icon({
      className:"marker-unselected",
      iconUrl: "/location.png",
      iconRetinaUrl: "/location.png",
      popupAnchor:  [-0, -0],
      iconSize: [15,15]
    });

    const festival = new L.Icon({
      className:"marker-unselected",
      iconUrl: "/festival.png",
      iconRetinaUrl: "/festival.png",
      popupAnchor:  [-0, -0],
      iconSize: [15,15]
    });

    const healthcare = new L.Icon({
      className:"marker-unselected",
      iconUrl: "/healthcare.png",
      iconRetinaUrl: "/healthcare.png",
      popupAnchor:  [-0, -0],
      iconSize: [15,15]
    });

    const agriculture = new L.Icon({
      className:"marker-unselected",
      iconUrl: "/agriculture.png",
      iconRetinaUrl: "/agriculture.png",
      popupAnchor:  [-0, -0],
      iconSize: [15,15]
    });

    const environment = new L.Icon({
      className:"marker-unselected",
      iconUrl: "/environment.png",
      iconRetinaUrl: "/environment.png",
      popupAnchor:  [-0, -0],
      iconSize: [15,15]
    });

    const education = new L.Icon({
      className:"marker-unselected",
      iconUrl: "/education.png",
      iconRetinaUrl: "/education.png",
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
            {displayLocations ? locations.map((location, i) =>{
              
              return (
                <Marker riseOnHover={true} key={i} eventHandlers={{ mouseover: this.handleMouseOver, mouseout: this.handleMouseOut, click: () => this.locationSelect(location) }} icon={loc} position={[location.longitude, location.latitude]}>
                  <Popup className={styles.popup}>
                    {location.name}
                  </Popup>
                </Marker>
              )
            }): this.events.map((ev: any, it: any) =>{
             
               if (this.state.categoryState == 1 && ev.category=="Festival" || ev.category=="Festival" && this.state.categoryState == 0){
                  return(
                    <Marker riseOnHover={true} key={it} eventHandlers={{ mouseover: this.handleMouseOver, mouseout: this.handleMouseOut }} icon={festival} position={[ev.location.longitude, ev.location.latitude]}>
                      <Popup className={styles.popup}>
                        {ev.location.name}
                      </Popup>
                    </Marker>
                  )

                }else if (this.state.categoryState == 2 && ev.category=="Education" || ev.category=="Education" && this.state.categoryState == 0){
                  return(
                    <Marker riseOnHover={true} key={it} eventHandlers={{ mouseover: this.handleMouseOver, mouseout: this.handleMouseOut }} icon={education} position={[ev.location.longitude, ev.location.latitude]}>
                      <Popup className={styles.popup}>
                        {ev.location.name}
                      </Popup>
                    </Marker>
                  )

                }else if (this.state.categoryState == 3 && ev.category=="Environment" ||ev.category=="Environment" && this.state.categoryState == 0){
                  return(
                    <Marker riseOnHover={true} key={it} eventHandlers={{ mouseover: this.handleMouseOver, mouseout: this.handleMouseOut }} icon={environment} position={[ev.location.longitude, ev.location.latitude]}>
                      <Popup className={styles.popup}>
                        {ev.location.name}
                      </Popup>
                    </Marker>
                  )

                }else if (this.state.categoryState == 4 && ev.category=="Healthcare" || ev.category=="Healthcare"&& this.state.categoryState == 0){
                  return(
                    <Marker riseOnHover={true} key={it} eventHandlers={{ mouseover: this.handleMouseOver, mouseout: this.handleMouseOut }} icon={healthcare} position={[ev.location.longitude, ev.location.latitude]}>
                      <Popup className={styles.popup}>
                        {ev.location.name}
                      </Popup>
                    </Marker>
                  )

                }else if (this.state.categoryState == 5 && ev.category=="Agriculture" || ev.category=="Agriculture"&&this.state.categoryState == 0){
                  return(
                    <Marker riseOnHover={true} key={it} eventHandlers={{ mouseover: this.handleMouseOver, mouseout: this.handleMouseOut }} icon={agriculture} position={[ev.location.longitude, ev.location.latitude]}>
                      <Popup className={styles.popup}>
                        {ev.location.name}
                      </Popup>
                    </Marker>
                  )
                }
            })
            }
        </MapContainer>
      </div>
    );
  }
}

export default MapElement;