declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // mysql://root:rebbit@localhost:3306/rebbit
      DATABASE_URL: string;
      // $ openssl rand -base64 32
      NEXTAUTH_SECRET: string;
      // http://localhost:3000
      NEXTAUTH_URL: string;
    }
  }
}

export {};
