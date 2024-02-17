import Categories from "./Categories";
import Location from "./Location";
import UserSchema from "./UserSchema";

interface EventSchema
{
    id: number,
    name: string,
    coordinator: UserSchema,
    catagery: Categories;
    location: Location
}

export default EventSchema;