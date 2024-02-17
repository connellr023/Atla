import type { NextApiRequest, NextApiResponse } from "next";
import EventSchema from "@/shared/EventSchema";

const isEventObject = (object: any): boolean => {
    return (object.id && object.name && object.description && object.category && object.location.latitude && object.location.longitude);
}

const CreateEventController = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        res.status(405).end();
        return;
    }

    if (isEventObject(req.body)) {
        //res.status(200).send();
    }
    else {
        res.status(400).end();
    }
}

export default CreateEventController;