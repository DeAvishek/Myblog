import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class Authservice {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl) // Your API Endpoint
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }
    async createaccount({ email, password, name }) {
        const userAccount = await this.account.create(ID.unique(), email, password, name)
        try {
            if (userAccount) {
                //call login
                return this.login({ email, password })
            }
            else {
                return null;
            }

        } catch (error) {
            console.error("Error creating account:", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();

        } catch (error) {
            console.error("Logout failed:", error); 
            console.log(error)
        }
    }

    async getCurruser() {
        try {
            // Attempt to fetch current session (check if the user is authenticated)
            const session = await this.account.getSession('current');
            
            // If there's no active session, prompt the user to log in again
            if (!session) {
                console.log("User is not logged in.");
                return null; // Handle this case (maybe redirect to login or show message)
            }
    
            // Session exists, fetch the user account information
            return await this.account.get();
        } catch (error) {
            // In case of error, handle it gracefully
            console.error("Error fetching current user:", error);
            return null;
        }
    }
    
    
    
    
    

}

const authservice = new Authservice();
export default authservice ;
