import Categories from "./Categories";
import Location from "./Location";

interface EventSchema
{
    id?: string,
    name: string,
    description: string,
    category: Categories;
    location: Location
}

export default EventSchema;