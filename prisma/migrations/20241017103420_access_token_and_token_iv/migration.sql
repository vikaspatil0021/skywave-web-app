/*
  Warnings:

  - Added the required column `encrypted_access_token` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token_iv` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "encrypted_access_token" TEXT NOT NULL,
ADD COLUMN     "token_iv" TEXT NOT NULL;
