import React from "react";
import styles from "@/styles/AddEvent.module.scss";
import Categories from "@/shared/Categories";
class AddEventForum extends React.Component<any, any>
{
    constructor(props:any){
        super(props);
        this.state = {
            nameEvent: "",
            category: Categories.Festival,
            description:"",
            location:Location
        }
       
    }
    public render = () => {
        return(
            <div className={styles.forum_container}>
                

            </div>
    
        )
       
    }


}export default AddEventForum;