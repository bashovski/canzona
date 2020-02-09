exports.getAtlasURI = () => {
    let cluster = process.env.MONGODB_ATLAS_CLUSTER,
        user = process.env.MONGODB_ATLAS_USER,
        password = process.env.MONGODB_ATLAS_PASSWORD;

    return (`mongodb+srv://${user}:${password}@${cluster}/test?retryWrites=true&w=majority`);
};
