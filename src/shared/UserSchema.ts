interface UserSchema
{
    id: number,
    username: string,
    events: number[]    // Array of events IDs
}

export default UserSchema;