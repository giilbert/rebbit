import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    username: string;
    name: string;
    id: string;
    email: string;
  }
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  // type assertions = bad
  interface JWT extends DefaultJWT {
    username: string;
  }
}
