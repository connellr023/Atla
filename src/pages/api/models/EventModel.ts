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
    public category: Categories;
    public location: Location;

    constructor(
        name: string,
        description: string,
        category: Categories,
        location: Location
    )
    {
        this.id = EventModel.getEventKey(uuidv4());
        this.name = name.trim();
        this.description = description.trim();
        this.category = category;
        this.location = location;
    }

    private static getEventKey = (id: string): string => {
        return `events-${id}`;
    }

    public static fetchAll = async (): Promise<EventSchema[]> => {
        const keys = await kv.keys(EventModel.getEventKey("*"));

        const result = await Promise.all(
            keys.map(async (key) => {
                return await kv.get<EventSchema>(key);
            })
        );
        
        return result.filter((data) => data !== null) as EventSchema[];
    } 

    public insert = async () => {
        await kv.set(EventModel.getEventKey(this.id), JSON.stringify(this));
    }
}

export default EventModel;