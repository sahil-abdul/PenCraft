import config from "../config/config";
import { Client, Databases, Query, Storage, ID } from "appwrite";

export class Service {
  client = new Client();
  databases;
  Bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.Bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("appWrite :: StorageConfig :: createPost :: ", error);
    }
  }

  async upadtePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("appwrite :: storageconfig :: updatePost :: ", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("appwrite :: storageconfig :: deletePost :: ", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("appwrite :: storageconfig :: getPost :: ", error);
      return false;
    }
  }

  async getPosts(querys = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        querys
      );
    } catch (error) {
      console.log("appwrite :: storageConfig :: getPosts :: ", error);
      return false;
    }
  }

  //file uploading services

  async uploadFile(file) {
    try {
      const value = await this.Bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
      return value;
    } catch (error) {
      console.log("appwrite :: storageConfig :: uploadFile :: ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.Bucket.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("appwrite :: storageConfig :: deleteFile :: ", error);
      return false;
    }
  }

  //  async getFilePrev(fileId) {
  //   try {
  //     return await this.Bucket.getFilePreview(
  //       config.appwriteBucketId,
  //       fileId,

  //     )
  //   } catch (error) {
  //     console.log("appwrite :: storageConfig :: filePrev :: ", error);

  // }
  // }

  getFilePrev(fileId) {
    
    if (!fileId) return null;

    try {
      const pic =  this.Bucket.getFileView(
        config.appwriteBucketId,
        fileId
      );
      // console.log(pic)
      return pic;
    } catch (error) {
      console.log("appwrite :: storageConfig :: filePrev :: ", error);
      return null;
    }
  }
}

const service = new Service();
export default service;
