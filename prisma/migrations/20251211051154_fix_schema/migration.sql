-- AlterTable
ALTER TABLE "club_admins" ADD COLUMN     "login_otp" VARCHAR(32),
ADD COLUMN     "login_otp_expires" TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "coaches" ADD COLUMN     "login_otp" VARCHAR(32),
ADD COLUMN     "login_otp_expires" TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "super_admins" ADD COLUMN     "login_otp" VARCHAR(32),
ADD COLUMN     "login_otp_expires" TIMESTAMPTZ(6);
