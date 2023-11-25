import client from '../libs/prismadb';

export default async function getMessages(
  conversationId: string
) {
  try {
    const messages = await client.message.findMany({
      where: {
        conversationId: conversationId,
      },
      include: {
        seen: true,
        sender: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return messages;
  } catch (error: any) {
    return [];
  }
}
