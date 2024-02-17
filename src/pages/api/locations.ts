import type { NextApiRequest, NextApiResponse } from "next";
import EndpointResponse from "./models/EndpointResponse";
import LocationResponse from "@/shared/LocationResponse";

// https://data.calgary.ca/Recreation-and-Culture/Parks-Site-Elements/vd9i-m9ze/about_data
const API_ENDPOINT: string = "https://data.calgary.ca/resource/vd9i-m9ze.json";

const filterEndpointResponse = (elements: EndpointResponse): LocationResponse => {
    let result: LocationResponse = [];

    elements.forEach((element) => {
        result.push({
            name: element.minortype,
            street: element.street,
            latitude: element.multipolygon.coordinates[0][0][0][0],
            longitude: element.multipolygon.coordinates[0][0][0][1],
        });
    });

    return result;
}

const FetchLocationsController = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        res.status(405).end();
        return;
    }

    const endpointResponse = await fetch(API_ENDPOINT);

    if (!endpointResponse.ok) {
        throw new Error(`Failed to fetch recreational data. Status code: ${endpointResponse.status}`);
    }

    const endpointData: EndpointResponse = await endpointResponse.json();
    const filteredData: LocationResponse = filterEndpointResponse(endpointData);

    res.status(200).send(filteredData);
}

export default FetchLocationsController;