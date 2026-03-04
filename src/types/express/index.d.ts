import { User } from "@/modules/users/models/user";

declare global {
    namespace Express {
        interface Request {
            user?:User;
        }
    }
}
export{}