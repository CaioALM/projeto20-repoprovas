/*
  Warnings:

  - You are about to drop the column `teacherDisciplineId` on the `tests` table. All the data in the column will be lost.
  - You are about to drop the `teacherDisciplines` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `teachersDisciplineId` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "teacherDisciplines" DROP CONSTRAINT "teacherDisciplines_disciplineId_fkey";

-- DropForeignKey
ALTER TABLE "teacherDisciplines" DROP CONSTRAINT "teacherDisciplines_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_teacherDisciplineId_fkey";

-- AlterTable
ALTER TABLE "tests" DROP COLUMN "teacherDisciplineId",
ADD COLUMN     "teachersDisciplineId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "teacherDisciplines";

-- CreateTable
CREATE TABLE "teachersDisciplines" (
    "id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "disciplineId" INTEGER NOT NULL,

    CONSTRAINT "teachersDisciplines_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "teachersDisciplines" ADD CONSTRAINT "teachersDisciplines_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachersDisciplines" ADD CONSTRAINT "teachersDisciplines_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_teachersDisciplineId_fkey" FOREIGN KEY ("teachersDisciplineId") REFERENCES "teachersDisciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
