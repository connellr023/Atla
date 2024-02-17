import { kv } from "@vercel/kv";
import { v4 as uuidv4 } from "uuid";
import Categories from "@/shared/Categories";
import EventSchema from "@/shared/EventSchema";
import Location from "@/shared/Location";

class EventModel implements EventSchema
{
    public id: string;
    public name: string;
    public description: string;
    public catagery: Categories;
    public location: Location;

    constructor(
        name: string,
        description: string,
        category: Categories,
        location: Location
    )
    {
        this.id = uuidv4();
        this.name = name.trim();
        this.description = description.trim();
        this.catagery = category;
        this.location = location;
    }

    // public static fetchAll = (): EventModel[] => {
    //     const events = kv.hgetall();
    // }

    public insert = async () => {
        await kv.set(this.id, JSON.stringify(this));
    }
}

export default EventModel;