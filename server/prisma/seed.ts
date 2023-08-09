import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Delete all `Note` and `Tag` records
  await prisma.note.deleteMany({});
  await prisma.tag.deleteMany({});
  // (Re-)Create dummy `User` and `Message` records
  await prisma.note.create({
    data: {
      title: "Homework Tasks",
      body: "Finish Maths and Science homework",
      tags: {
        create: [
          {
            label: "Homework",
          },
          {
            label: "Don't like",
          },
        ],
      },
    },
  });
  await prisma.note.create({
    data: {
      title: "Workouts",
      body: "Run 5km. Do 20 push ups. 4 sets of 10 dumbbell curls.",
      tags: {
        create: [
          {
            label: "Workout",
          },
          {
            label: "Free Time",
          },
        ],
      },
    },
  });
  await prisma.note.create({
    data: {
      title: "Games to play",
      body: "Finish Hogwarts Legacy. Try EAFC 24.",
      tags: {
        create: [
          {
            label: "Xbox",
          },
          {
            label: "Video Games",
          },
        ],
      },
    },
  });
}
main();
