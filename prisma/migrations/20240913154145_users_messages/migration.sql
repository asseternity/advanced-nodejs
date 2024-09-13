-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR(255),
    "username" VARCHAR(255),
    "added" TIMESTAMP(6),

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255),
    "password" VARCHAR(255),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_messages" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR(255),
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "users_messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users_messages" ADD CONSTRAINT "users_messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
