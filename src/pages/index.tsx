import { hostname } from "@/shared/utils";
import React from "react";
import Categories from "../shared/Categories";
import AddEventForum from "@/components/AddEventForum";
import dynamic from "next/dynamic";
import styles from "@/styles/Map.module.scss";
import Location from "@/shared/Location";
import MainLogo from "@/components/MainLogo";
import CreditFooter from "@/components/CreditFooter";
import EventSchema from "@/shared/EventSchema";

const MapElementDyn = dynamic(() => import("../components/MapElement"), { ssr: false });

export const getServerSideProps = async () => {
  try {
    const locationResponse = await fetch(`${hostname}/api/locations`);
    const locations = await locationResponse.json();

    const eventsResponse = await fetch(`${hostname}/api/events`);
    const events = await eventsResponse.json();

    return {
      props: {
        locations: locations,
        events: events
      },
    };
  } catch (error) {
    return {
      props: {}
    };
  }
};

class Map extends React.Component<any, any> {
  private keys;
  private values;
  private iconPaths;

  constructor(props: any) {
    super(props);

    this.state = {
      selectedIndex: 0,
      past_select_location: false,
      displayLocations: false,
      location: Location,
      displayEventsIndex: 0,
      events: props.events
    };

    this.keys = Object.keys(Categories);
    this.values = Object.values(Categories);

    this.iconPaths = [
      "/all.png",
      "/festival.png",
      "/education.png",
      "/environment.png",
      "/healthcare.png",
      "/agriculture.png",
      "/plus.png"
    ];
  }

  public setIndex = (e: any, i: any) => {
    this.setState({ selectedIndex: i });
  };

  public locationSelected = (location: any) => {
    this.setState({location: location});
    this.setState({displayLocations: false});
    this.setState({past_select_location: true});
  }

  public updateState = (e: any) =>{
    this.setState({displayLocations:false})
    this.setState({selectedIndex:0});
    this.setState({past_select_location:false})
  }

  public handleAddEvent = (e:any, eventData: EventSchema) => {
    this.setState((prevState: any) => ({
      events: [...prevState.events, eventData],
    }));
    
    console.log(this.state.events);
    this.setState({displayLocations:false})
    this.setState({selectedIndex:0});
    this.setState({past_select_location:false})
  }

  public render = () => {
    const { locations } = this.props;
    const { events } = this.state;
  
    return (
      <main className="flex-wrapper">
        <MainLogo />
        <div className={styles.topMenuContainer}>
          {this.state.selectedIndex == 0 ? (
            <div className={styles.button_background_selected}>
              <div className={styles.icon_container_menu}>
                <img src={this.iconPaths[0]} alt=""></img>
              </div>
              <div className={styles.text_container_menu}>{"View All"}</div>
            </div>
          ) : (
            <div className={styles.button_background} onClick={(e) => this.setIndex(e, 0)}>
              <div className={styles.icon_container_menu}>
                <img src={this.iconPaths[0]} alt=""></img>
              </div>
              <div className={styles.text_container_menu}>{"View All"}</div>
            </div>
          )}
          {this.keys.map((_icon, i) => {
            if (i + 1 == this.state.selectedIndex) {
              return (
                <div key={i} className={styles.button_background_selected}>
                  <div className={styles.icon_container_menu}>
                    <img src={this.iconPaths[i+1]} alt=""></img>
                  </div>
                  <div className={styles.text_container_menu}>{this.values[i]}</div>
                </div>
              );
            } else {
              return (
                <div key={i} className={styles.button_background} onClick={(e) => this.setIndex(e, i + 1)}>
                  <div className={styles.icon_container_menu}>
                    <img src={this.iconPaths[i + 1]} alt=""></img>
                  </div>
                  <div className={styles.text_container_menu}>{this.values[i]}</div>
                </div>
              );
            }
          })}
          {this.state.selectedIndex == 6 ? (
            <div className={styles.button_background_selected}>
              <div className={styles.icon_container_menu}>
                <img src={this.iconPaths[6]} alt=""></img>
              </div>
              <div className={styles.text_container_menu}>{"Add Event"}</div>
            </div>
          ) : (
            <div
              className={styles.button_background}
              onClick={(e) => {
                this.setIndex(e, 6);
                this.setState({ displayLocations: true });
              }}
            >
              <div className={styles.icon_container_menu}>
                <img src={this.iconPaths[6]} alt=""></img>
              </div>
              <div className={styles.text_container_menu}>{"Add Event"}</div>
            </div>
          )}
        </div>
        <MapElementDyn initialPosition={[51.049999, -114.066666]} locations={locations} events = {events} displayLocations={this.state.displayLocations} updateLocation={this.locationSelected} displayEventIndex={this.state.displayEventsIndex} currentCategory={this.state.selectedIndex} />
        {this.state.selectedIndex === 6 && this.state.past_select_location ? <AddEventForum onExit = {this.updateState} l = {this.state.location} addEvent = {this.handleAddEvent}/> : null}
        <CreditFooter />
      </main>
    );
  };
}

export default Map;