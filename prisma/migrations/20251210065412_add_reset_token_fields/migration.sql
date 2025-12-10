-- AlterTable
ALTER TABLE "club_admins" ADD COLUMN     "reset_token" VARCHAR(255),
ADD COLUMN     "reset_token_expires" TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "coaches" ADD COLUMN     "reset_token" VARCHAR(255),
ADD COLUMN     "reset_token_expires" TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "super_admins" ADD COLUMN     "reset_token" VARCHAR(255),
ADD COLUMN     "reset_token_expires" TIMESTAMPTZ(6);
