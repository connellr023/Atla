import React from "react";
import styles from "@/styles/AddEventModal.module.scss";
import Categories from "@/shared/Categories";
import EventSchema from "@/shared/EventSchema";
import Modal from "./Modal";

interface AddEventForumState
{
  event: EventSchema,
  message: string
}

class AddEventForum extends React.Component<any, AddEventForumState>
{
  private onExit;
  private addEvent;
  private timerId: number | null;

  constructor(props: any) {
    super(props);

    this.state = {
      event: {
        name: "",
        category: Categories.Festival,
        description: "",
        location: props.location,
      },
      message: ""
    };
    
    this.onExit = props.onExit;
    this.addEvent = props.addEvent;
    this.timerId = null;
  }

  public componentDidUpdate = (_prevProps: {}, prevState: AddEventForumState) => {
    if (this.state.message !== prevState.message) {
      if (this.timerId) {
        window.clearInterval(this.timerId);
      }

      this.timerId = window.setTimeout(() => {
        this.setState({
          message: ""
        });
      }, this.state.message.length * 200);
    }
  }

  public componentWillUnmount(): void {
    if (this.timerId) {
      window.clearInterval(this.timerId);
    }
  }

  private handleOnChange = (e: any, i: any) => {
    switch (i) {
      case 0: // event name
        this.setState({ event: {...this.state.event, name: e.target.value }, message: this.state.message });
        break;
      case 1: // category
      this.setState({ event: {...this.state.event, category: e.target.value }, message: this.state.message });
        break;
      case 2: // description
        this.setState({ event: {...this.state.event, description: e.target.value }, message: this.state.message });
        break;
      default:
        break;
    }
  }

  private handleAddEvent = async () => {
    if (
      this.state.event.name.length === 0 ||
      this.state.event.description.length === 0
    )
    {
      this.displayError("Name or description too short.");
      return;
    }

    try {
      const response = await fetch("/api/create", {
        method: "POST",
        body: JSON.stringify(this.state.event)
      });

      if (response.ok) {
        this.addEvent();
      }
      else {
        this.displayError(`Received status code: ${response.status}`);
      }
    }
    catch {
      this.displayError("Failed to parse response.");
    }
  }

  private displayError = (message: string) => {
    this.setState({
      message: message
    });
  }

  public render = () => {
    return (
      <Modal onExit={this.onExit} title="Open Event">
        <div className={styles.add_window_body}>
          <div className={styles.first_row_container}>
            <div className={styles.event_type_container}>
              <div className={styles.event_name_text}>Type</div>
              <br />
              <div className={styles.event_type_select}>
                <select
                  className={styles.event_type}
                  onChange={(e) => this.handleOnChange(e, 1)}
                >
                  <option value={Categories.Festival}>{Categories.Festival}</option>
                  <option value={Categories.Education}>{Categories.Education}</option>
                  <option value={Categories.Agriculture}>{Categories.Agriculture}</option>
                  <option value={Categories.Environment}>{Categories.Environment}</option>
                  <option value={Categories.Healthcare}>{Categories.Healthcare}</option>
                </select>
              </div>
            </div>
            <div className={styles.event_name_container}>
              <div className={styles.event_name_text}>Event Name</div>
              <br />
              <div className={styles.event_name_enter}>
                <input
                  className={styles.event_name}
                  value={this.state.event.name}
                  onChange={(e) => this.handleOnChange(e, 0)}
                ></input>
              </div>
            </div>
          </div>
          <div className={styles.desc_row_container}>
            <div className={styles.description_container}>
              <div className={styles.house_type_text}>Description</div>
              <br />
              <textarea
                className={styles.description}
                value={this.state.event.description}
                onChange={(e) => this.handleOnChange(e, 2)}
                rows={4}
                cols={43}
              ></textarea>
            </div>
          </div>
        </div>
        {this.state.message && <><p>{this.state.message}</p><br /></>}
        <div className={styles.add_window_footer}>
          <button className={styles.add_button_container} onClick={this.handleAddEvent}>
            Add
          </button>
        </div>
      </Modal>
    );
  };
}

export default AddEventForum;
