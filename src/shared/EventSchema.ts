import Categories from "./Categories";
import Location from "./Location";

interface EventSchema
{
    id: string,
    name: string,
    description: string,
    catagery: Categories;
    location: Location
}

export default EventSchema;