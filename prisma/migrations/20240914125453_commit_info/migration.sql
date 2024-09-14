/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `commit_message` to the `Deployment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commit_sha` to the `Deployment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commit_url` to the `Deployment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Deployment" ADD COLUMN     "commit_message" TEXT NOT NULL,
ADD COLUMN     "commit_sha" TEXT NOT NULL,
ADD COLUMN     "commit_url" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Project_name_key" ON "Project"("name");
