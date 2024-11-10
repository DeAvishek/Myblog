import config from "../config/config";
import { Client, ID, Databases, Query, Storage } from "appwrite";

export class databaseService {
    client = new Client();
    databases;
    query;
    storage;
    constructor() {
        this.client
        .setEndpoint(config.appwriteUrl) // Your API Endpoint
        .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.query = new Query(this.client);
        this.storage = new Storage(this.client);

    }
    async createpost({ title, content, slug, featuredimage, status, userId }) {
        try {
            return await this.databases.createDocument(config.appwriteDatabaseId, config.appwriteCollectionId, ID.unique(), {
                title,
                content,
                featuredimage,
                status,
                slug,
                userId
            })

        } catch (error) {
            console.log(error);
        }
    }
    async updatepost(postID, { title, content, slug, featuredimage, status, }) {
        try {
            return await this.databases.updateDocument(config.appwriteDatabaseId, config.appwriteCollectionId, postID, {
                title,
                content,
                featuredimage,
                status,
                slug,
            })
        } catch (error) {
            console.log(error);
        }
    }
    async deletepost({ postID }) {
        try {
            await this.databases.deleteDocument(config.appwriteDatabaseId, config.appwriteCollectionId, postID);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }

    }
    async getpost({ postID }) {
        try {
            return await this.databases.getDocument(config.appwriteDatabaseId, config.appwriteCollectionId, postID)
        } catch (error) {
            console.log(error);
        }
    }
    async getposts() {
        try {
            return await this.databases.listDocuments(config.appwriteDatabaseId, config.appwriteCollectionId,
                [Query.equal('status', 'active')]
            )
        } catch (error) {
            console.log(error)
        }
    }

    //file services
    async createfile(file)
    {
       try {
         return await this.storage.createFile(config.appwriteBucketId,ID.unique(),file);
         return true;
       } catch (error) {
        console.log(error);
        return false;
       }
    }
    async deletefile(fileId)
    {
        try {
            await this.storage.deleteFile(config.appwriteBucketId,fileId);
            return true;
            
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    getfile(fileId)
    {
      return this.storage.getFile(config.appwriteBucketId,fileId)
    }
}
const databaseservice = new databaseService();
export default databaseservice;