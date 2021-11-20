declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_DB_CONNECTION_STRING: string;
    }
  }
}

export {};
