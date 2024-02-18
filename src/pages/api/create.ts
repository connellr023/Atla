import type { NextApiRequest, NextApiResponse } from "next";
import EventSchema from "@/shared/EventSchema";
import EventModel from "./models/EventModel";

const isEventSchemaObject = (object: any): boolean => {
    return (
        typeof object.name === "string" &&
        typeof object.description === "string" &&
        typeof object.location === "object" &&
        object.category
    );
}

const CreateEventController = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        res.status(405).end();
        return;
    }

    const parsedBody = JSON.parse(req.body);
    console.log(parsedBody);

    if (isEventSchemaObject(parsedBody)) {
        try {
            const event: EventSchema = parsedBody;
            const model: EventModel = new EventModel(event.name, event.description, event.category, event.location);
    
            await model.insert();

            res.status(200).end();
        }
        catch (error) {
            res.status(500).end();
        }
    }
    else {
        res.status(400).end();
    }
}

export default CreateEventController;