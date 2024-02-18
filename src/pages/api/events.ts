import type { NextApiRequest, NextApiResponse } from "next";
import EventModel from "./models/EventModel";

const FetchEventsController = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        res.status(405).end();
        return;
    }

    try {
        const events = await EventModel.fetchAll();
        res.status(200).json(events);
    }
    catch {
        res.status(500).end();
    }
}

export default FetchEventsController;