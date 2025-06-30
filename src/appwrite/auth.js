import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthUser {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        //login the user
        return this.logIn({ email, password });
      } else {
        return userAccount;
      }
    }catch(error) {
      console.log("appwrite :: createUser :: ", error);
    }
  }

  async logIn({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("appwrite :: getCuurentUser :: ", error);
    }

    return null;
  }

  async logOut() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("appwrite :: getCuurentUser :: ", error);
    }
  }
}

const authUser = new AuthUser();

export default authUser;
