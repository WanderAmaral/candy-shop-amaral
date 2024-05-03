const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const phones = [
      "+1234567890",
      "+1987654321",
      "+1555555555",
      "+1777777777",
      "+1888888888",
      "+1999999999",
      "+1666666666",
      "+1444444444",
      "+1222222222",
      "+1333333333",
    ];

    // Nomes criativos para as empresas de cupcakes
    const creativeNames = [
      "Dulce Delícia",
      "Confeitaria Encantada",
      "Doce Sonho Cupcakes",
      "Sabor Suntuoso",
      "Fantasia de Açúcar",
      "Arte em Cupcakes",
      "Delícias da Vovó",
      "Açúcar e Afeto",
      "Cupcake Mania",
      "Felicidade em Forma de Cupcake",
    ];

    // Endereços fictícios para as empresas de cupcakes
    const addresses = [
      "Rua dos Cupcakes, 123",
      "Avenida das Delícias, 456",
      "Praça da Confeitaria, 789",
      "Travessa do Doce, 101",
      "Alameda da Fantasia, 202",
      "Estrada da Arte, 303",
      "Avenida das Delícias, 404",
      "Praça do Açúcar, 505",
      "Rua dos Sonhos, 606",
      "Avenida da Felicidade, 707",
    ];

    const cupcakes = [
      {
        name: "Cupcake de Chocolate Com Coberturas De Morango Vermelho",
        price: 10.0,
        imageURL:
          "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Cupcake Coberto Com Cobertura Branca",
        price: 11.9,
        imageURL:
          "https://images.pexels.com/photos/1055271/pexels-photo-1055271.jpeg",
      },
      {
        name: "Cupcake Em Prato Cerâmico Cinzento",
        price: 14.49,
        imageURL:
          "https://images.pexels.com/photos/1028708/pexels-photo-1028708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Cupcake Com Chantilly E Frutas Por Cima",
        price: 23.79,
        imageURL:
          "https://images.pexels.com/photos/1055270/pexels-photo-1055270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Bolinho Três Assado Com Recheio De Morango Por Cim",
        price: 33.49,
        imageURL:
          "https://images.pexels.com/photos/853004/pexels-photo-853004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Cupcake De Chocolate",
        price: 14.99,
        imageURL:
          "https://images.pexels.com/photos/1775285/pexels-photo-1775285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ];

    // Criar 10 empresas de cupcakes com nomes e endereços fictícios
    const cupcakeCompanies = [];
    for (let i = 0; i < 10; i++) {
      const name = creativeNames[i];
      const adress = addresses[i];
      const phone = phones[i];

      const company = await prisma.company.create({
        data: {
          name,
          adress,
          phone,
        },
      });

      // criar for para cupcakes
      for (const cupcake of cupcakes) {
        await prisma.product.create({
          data: {
            name: cupcake.name,
            price: cupcake.price,
            imageURL: cupcake.imageURL,
            company: {
              connect: {
                id: company.id,
              },
            },
          },
        });
      }

      cupcakeCompanies.push(company);
    }

    // Fechar a conexão com o banco de dados
    await prisma.$disconnect();
  } catch (error) {
    console.error("Erro ao criar as empresas de cupcakes:", error);
  }
}

seedDatabase();
