interface EndpointLocationElement
{
    active_dt: string;
    install_dt: string;
    life_cycle_status: string;
    maintained_by: string;
    minortype: string;
    parcel_land_use: string;
    parcel_location: string;
    prim_parcel: boolean;
    steward: string;
    street: string;
    type_description: string;
    asset_cd: string;
    multipolygon: {
        type: string;
        coordinates: number[][][][];
    };
}

/**
 * Represents a response from the chosen
 * Calgary Open Data Portal API endpoint
 */
type EndpointResponse = EndpointLocationElement[];

export default EndpointResponse;