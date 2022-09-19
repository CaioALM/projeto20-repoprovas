import { Users } from "@prisma/client";

export type UserInsert = Omit<Users, "id">