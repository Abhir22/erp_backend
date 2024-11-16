import MongoClientClass from "./setup"
import {} from 'mongodb'
let mongoClient = MongoClientClass.initialize()


export async function findOne(collection_name: string,params:any){
    try {
        let collection = mongoClient.collection(collection_name)
        let data = await collection.find(params).toArray();        
        return data[0] || {};
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function insertOne(collection_name:string,params:any) {
    try {
        let collection = mongoClient.collection(collection_name);
        collection.insertOne(params)
    } catch (error) {
        
    }
}

export async function findAndUpdateuser(filter:any,update:any,collection_name: string){
    try {
        let collection = mongoClient.collection(collection_name);
    console.log(collection)
        const result =  await collection.findOneAndUpdate(filter,update,{upsert: true});
        console.log(result)

         return result
    } catch (error) {
        
    }}
export async function findAndUpdateOrCreateUser(filter: any, update: any, collection_name: string) {
  try {
    const collection = mongoClient.collection(collection_name);
    const existingDocument = await collection.findOne(filter);
    if (existingDocument) {
      await collection.updateOne(filter, { $set: update });
      return { message: "updated", data: { ...existingDocument, ...update } };
    } else {
      const newDocument = { ...filter, ...update };
      await collection.insertOne(newDocument);
      return { message: "created", data: newDocument };
    }
  } catch (error) {
    throw error;
  }
}

  