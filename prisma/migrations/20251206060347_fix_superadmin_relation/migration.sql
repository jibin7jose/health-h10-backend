/*
  Warnings:

  - Made the column `email` on table `super_admins` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password_hash` on table `super_admins` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "super_admins" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "password_hash" SET NOT NULL,
ALTER COLUMN "updated_at" DROP DEFAULT;
