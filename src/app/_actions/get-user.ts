import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    throw error;
  }
}

async function getUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    throw error;
  }
}

// Exemplo de uso
async function main() {
  // Obter um usuário por ID
  const userById = await getUserById('exemplo-de-id-do-usuario');
  console.log('Usuário por ID:', userById);

  // Obter todos os usuários
  const allUsers = await getUsers();
  console.log('Todos os usuários:', allUsers);
}

main()
  .catch((error) => {
    console.error('Erro:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
