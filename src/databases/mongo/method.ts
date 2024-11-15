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

// export async function findAndUpdateuser(filter:any,update:any,collection_name: string){
//     try {
//         let collection = mongoClient.collection(collection_name);
//         return await collection.findOneAndUpdate(filter,update,{upsert: true})
//     } catch (error) {
        
//     }
export async function findAndUpdateuser(filter: any, update: any, collection_name: string) {
    try {
      const collection = mongoClient.collection(collection_name);
      const result = await collection.findOneAndUpdate(
        filter, 
        { $set: update }, 
        { upsert: true, returnDocument: 'after' }
      );
      return result;
    } catch (error) {
      console.error("Error in findAndUpdateuser:", error);
      throw error;
    }
  }
  