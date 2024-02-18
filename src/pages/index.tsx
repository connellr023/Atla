import { hostname } from "@/shared/utils";
import React from "react";
import Categories from "../shared/Categories";
import AddEventForum from "@/components/AddEventModal";
import dynamic from "next/dynamic";
import styles from "@/styles/Map.module.scss";
import MainLogo from "@/components/MainLogo";
import CreditFooter from "@/components/CreditFooter";
import EventSchema from "@/shared/EventSchema";
import Location from "@/shared/Location";
import SuccessModal from "@/components/SuccessModal";

const MapElementDyn = dynamic(() => import("../components/MapElement"), { ssr: false });

export const getServerSideProps = async () => {
  try {
    const response = await fetch(`${hostname}/api/locations`);
    const locations = await response.json();

    return {
      props: {
        locations: locations
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
      location: Location
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

  public setIndex = (i: any) => {
    this.setState({ selectedIndex: i });
  };

  public locationSelected = (location: any) => {
    this.setState({ location: location });
    this.setState({ displayLocations: false });
    this.setState({ past_select_location: true });
  }

  public updateState = () =>{
    this.setState({ displayLocations: false });
    this.setState({ selectedIndex: 0 });
    this.setState({ past_select_location: false });
  }

  public handleAddEvent = () => {
    this.setState({ displayLocations: false });
    this.setState({ selectedIndex: 7 });
    this.setState({ past_select_location: false });
  }

  public handleCloseModal = () => {
    this.setState({ selectedIndex: 0 });
  }

  public render = () => {
    const { locations } = this.props;

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
            <div className={styles.button_background} onClick={() => { this.setIndex(0); this.setState({ displayLocations: false }) }}>
              <div className={styles.icon_container_menu}>
                <img src={this.iconPaths[0]} alt=""></img>
              </div>
              <div className={styles.text_container_menu}>{"View All"}</div>
            </div>
          )}
          {this.keys.map((_icon, i) => {
            if (i + 1 === this.state.selectedIndex) {
              return (
                <div key={i} className={styles.button_background_selected}>
                  <div className={styles.icon_container_menu}>
                    <img src={this.iconPaths[i + 1]} alt="" />
                  </div>
                  <div className={styles.text_container_menu}>{this.values[i]}</div>
                </div>
              );
            } else {
              return (
                <div key={i} className={styles.button_background} onClick={() => { this.setIndex(i + 1); this.setState({ displayLocations: false }) }}>
                  <div className={styles.icon_container_menu}>
                    <img src={this.iconPaths[i + 1]} alt="" />
                  </div>
                  <div className={styles.text_container_menu}>{this.values[i]}</div>
                </div>
              );
            }
          })}
          {this.state.selectedIndex === 6 ? (
            <div className={styles.button_background_selected}>
              <div className={styles.icon_container_menu}>
                <img src={this.iconPaths[6]} alt="" />
              </div>
              <div className={styles.text_container_menu}>{"Add Event"}</div>
            </div>
          ) : (
            <div
              className={styles.button_background}
              onClick={() => {
                this.setIndex(6);
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
        <MapElementDyn initialPosition={[51.049999, -114.066666]} locations={locations} displayLocations={this.state.displayLocations} updateLocation={this.locationSelected} />
        {/* Yeah this is hacky but it is a hackathon ¯\_(ツ)_/¯ */}
        {this.state.selectedIndex === 6 && this.state.past_select_location ? <AddEventForum onExit={this.updateState} location={this.state.location} addEvent={this.handleAddEvent}/> : <></>}
        {this.state.selectedIndex === 7 ? <SuccessModal onExit={this.handleCloseModal} title="Event Created" message="Successfully created event!" /> : <></>}
        {/* ^ Idk what these numbers even mean ^ */}
        <CreditFooter />
      </main>
    );
  };
}

export default Map;