import { prisma } from "../src/db";

async function main() {
  // Delete all `Note` and `Tag` records
  // Seems like you can't do nested creates with createMany
  await prisma.note.deleteMany({});
  await prisma.tag.deleteMany({});
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
      body: "Finish Spiderman 2. Try EAFC 24.",
      tags: {
        create: [
          {
            label: "PS5",
          },
          {
            label: "Video Games",
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
