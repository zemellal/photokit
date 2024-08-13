import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const me = await prisma.user.upsert({
    where: { id: "g9om23d7o0rdpigl81e2tl50" },
    update: { name: "Ansel Adams" },
    create: { id: "g9om23d7o0rdpigl81e2tl50", name: "Ansel Adams" },
  });

  const productLensNZ = await prisma.product.upsert({
    where: { name: "Nikon Nikkor Z 40mm F/2" },
    update: {},
    create: {
      name: "Nikon Nikkor Z 40mm F/2",
      price: 300,
      releaseDate: new Date("2021-09-14"),
      weight: 170,
      Brand: {
        connectOrCreate: {
          where: { name: "Nikon" },
          create: { name: "Nikon" },
        },
      },
      type: "lens",
      lens: {
        create: {
          mounts: {
            connectOrCreate: {
              where: { name: "Nikon Z" },
              create: { name: "Nikon Z" },
            },
          },
          zoom_prime: "prime",
          minFl: 40,
          maxAperture: 2,
          filterThread: 52,
        },
      },
    },
  });

  const productLensNF = await prisma.product.upsert({
    where: { name: "Nikon AF-S Nikkor 200-500mm F/5.6E ED VR" },
    update: {},
    create: {
      name: "Nikon AF-S Nikkor 200-500mm F/5.6E ED VR",
      price: 1057,
      releaseDate: new Date("2015-08-04"),
      weight: 2300,
      Brand: {
        connectOrCreate: {
          where: { name: "Nikon" },
          create: { name: "Nikon" },
        },
      },
      type: "lens",
      lens: {
        create: {
          mounts: {
            connectOrCreate: {
              where: { name: "Nikon F" },
              create: { name: "Nikon F" },
            },
          },
          zoom_prime: "zoom",
          minFl: 200,
          maxFl: 500,
          maxAperture: 5.6,
          filterThread: 95,
        },
      },
    },
  });

  const productLensCR = await prisma.product.upsert({
    where: { name: "Canon RF 28-70mm F/2L USM" },
    update: {},
    create: {
      name: "Canon RF 28-70mm F/2L USM",
      price: 3000,
      releaseDate: new Date("2018-09-01"),
      weight: 1430,
      Brand: {
        connectOrCreate: {
          where: { name: "Canon" },
          create: { name: "Canon" },
        },
      },
      type: "lens",
      lens: {
        create: {
          mounts: {
            connectOrCreate: {
              where: { name: "Canon RF" },
              create: { name: "Canon RF" },
            },
          },
          zoom_prime: "zoom",
          minFl: 28,
          maxFl: 70,
          maxAperture: 2,
          filterThread: 95,
        },
      },
    },
  });

  const productCameraNZ = await prisma.product.upsert({
    where: { name: "Nikon Z6" },
    update: {},
    create: {
      name: "Nikon Z6",
      price: 2000,
      releaseDate: new Date("2018-08-23"),
      weight: 675,
      Brand: {
        connectOrCreate: {
          where: { name: "Nikon" },
          create: { name: "Nikon" },
        },
      },
      type: "camera",
      camera: {
        create: {
          megapixels: 24,
          cropFactor: 1,
          mounts: {
            connectOrCreate: {
              where: { name: "Nikon Z" },
              create: { name: "Nikon Z" },
            },
          },
        },
      },
    },
  });

  const productCameraNF = await prisma.product.upsert({
    where: { name: "Nikon D600" },
    update: {},
    create: {
      name: "Nikon D600",
      price: 2000,
      releaseDate: new Date("2012-09-01"),
      weight: 850,
      Brand: {
        connectOrCreate: {
          where: { name: "Nikon" },
          create: { name: "Nikon" },
        },
      },
      type: "camera",
      camera: {
        create: {
          megapixels: 24,
          cropFactor: 1,
          mounts: {
            connectOrCreate: {
              where: { name: "Nikon F" },
              create: { name: "Nikon F" },
            },
          },
        },
      },
    },
  });

  const productCameraCR = await prisma.product.upsert({
    where: { name: "Canon EOS R5" },
    update: {},
    create: {
      name: "Canon EOS R5",
      price: 2900,
      releaseDate: new Date("2020-07-09"),
      weight: 738,
      Brand: {
        connectOrCreate: {
          where: { name: "Canon" },
          create: { name: "Canon" },
        },
      },
      type: "camera",
      camera: {
        create: {
          megapixels: 45,
          cropFactor: 1,
          mounts: {
            connectOrCreate: {
              where: { name: "Canon RF" },
              create: { name: "Canon RF" },
            },
          },
        },
      },
    },
  });

  const productAccessory = await prisma.product.upsert({
    where: { name: "Nikon FTZ II Mount Adapter" },
    update: {},
    create: {
      name: "Nikon FTZ II Mount Adapter",
      price: 250,
      releaseDate: new Date("2021-10-28"),
      type: "accessory",
      Brand: {
        connectOrCreate: {
          where: { name: "Nikon" },
          create: { name: "Nikon" },
        },
      },
    },
  });
}

main()
  .then(async () => {
    console.info("[SEED] Succussfully created user and products");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
