import React from "react";
import styles from "@/styles/AddEvent.module.scss";
import Categories from "@/shared/Categories";

class AddEventForum extends React.Component<any, any>
{
    private values;
    private onExit;
    private addEvent;
    constructor(props:any){
        super(props);

        this.state = {
            nameEvent: "",
            category: Categories.Festival,
            description:"",
            location: props.l
        }
        this.values = Object(Categories).values
        this.onExit = props.onExit
        this.addEvent = props.addEvent
       
    }
    handleOnChange = (e: any, i: any) =>{
        if (i ==0){//event name
            this.setState({nameEvent:e.target.value})
        }else if(i ==1){//category
            this.setState({category:e.target.value})
        }else if (i==2){//description
            this.setState({description:e.target.value})
        }
    }
    handleSubmitClick = (e: any) =>{
        console.log(this.state)

    }
    changeToNotAdding (){

    }
    public render = () => {
        return(
            <div className = {styles.adding_ammenity_container}>
            <div className = {styles.add_window}>
                    <div className = {styles.adding_header}>
                        <div className = {styles.add_window_exit} onClick = {(e) => this.onExit(e)}>
                            <img src = '/exit.png'></img>
                        </div>
                        <div className = {styles.add_window_title}>
                        {'Add Event'}
                        </div>
                    </div>
                    
                    <div className = {styles.add_window_body}>
                        <div className = {styles.first_row_container}>
                        <div className = {styles.event_type_container}>
                            <div className = {styles.event_name_text}>Type:</div>
                            <div className = {styles.event_type_select}>
                                <select className={styles.event_type} value = {this.state.type} onChange = {(e) => this.handleOnChange(e,1)}>
                                  
                                            <option value={0}>{Categories.Festival}</option>
                                            <option value={1}>{Categories.Education}</option>
                                            <option value={4}>{Categories.Agriculture}</option>
                                            <option value={2}>{Categories.Environment}</option>
                                            <option value={3}>{Categories.Healthcare}</option>
                                      
                                   
                                </select>
                            
                            </div>
                            </div>
                             <div className = {styles.event_name_container}>
                             <div className = {styles.event_name_text}>Event Name:</div>
                             <div className = {styles.event_name_enter}>
                             <input className = {styles.event_name} value = {this.state.nameEvent} onChange = {(e) => this.handleOnChange(e,0)}></input>
                             </div>
                        </div>
                        </div>

                       <div className = {styles.desc_row_container}>
                       <div className = {styles.description_container}>
                       <div className = {styles.house_type_text}>Description:</div>
                        <textarea className = {styles.description} value = {this.state.des} onChange = {(e) => this.handleOnChange(e,2)} rows={4} cols={43}></textarea>
                        </div>
                       </div>
                    
                    </div>
                    <div className = {styles.add_window_footer}>
                        <button className = {styles.add_button_container} onClick = {(e) => this.addEvent(e,this.state)}>
                        add
                        </button>
                    </div>
                    
                    
            </div>
        </div>
        )
       
    }


}

export default AddEventForum;