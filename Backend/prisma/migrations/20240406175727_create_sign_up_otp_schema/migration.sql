-- CreateTable
CREATE TABLE "SignUpOTP" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "email" VARCHAR(40) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "otp" INTEGER NOT NULL,
    "validity" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SignUpOTP_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SignUpOTP_email_key" ON "SignUpOTP"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SignUpOTP_otp_key" ON "SignUpOTP"("otp");
