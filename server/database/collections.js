const setupCollections = database => {

    let userCollection = database.createCollection('Users',{ validator: {
        $jsonSchema: {
            // TODO: validation schema for show documents
        }
    }});
    let postCollection = database.createCollection('Posts',{ validator: {
        $jsonSchema: {
            // TODO: validation schema for actor documents
        }
    }});

    return Promise.all([postCollection, userCollection]);
}

export default setupCollections;