/*
  Warnings:

  - The primary key for the `Service` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `specification` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Service` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Title]` on the table `Service` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Category` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Price` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Specification` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Title` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Service_title_key";

-- AlterTable
ALTER TABLE "Service" DROP CONSTRAINT "Service_pkey",
DROP COLUMN "category",
DROP COLUMN "id",
DROP COLUMN "price",
DROP COLUMN "specification",
DROP COLUMN "title",
ADD COLUMN     "Category" TEXT NOT NULL,
ADD COLUMN     "Id" SERIAL NOT NULL,
ADD COLUMN     "Price" INTEGER NOT NULL,
ADD COLUMN     "Specification" TEXT NOT NULL,
ADD COLUMN     "Title" TEXT NOT NULL,
ADD CONSTRAINT "Service_pkey" PRIMARY KEY ("Id");

-- CreateIndex
CREATE UNIQUE INDEX "Service_Title_key" ON "Service"("Title");
