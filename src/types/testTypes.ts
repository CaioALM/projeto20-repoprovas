import { Tests } from "@prisma/client";

export type TestInsert = Omit<Tests, "id">;