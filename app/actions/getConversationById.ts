import client from '../libs/prismadb';
import getCurrentUser from './getCurrentUser';

export default async function getConversationByID(
  conversationId: string
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return null;
    }

    const conversation =
      await client.conversation.findUnique({
        where: {
          id: conversationId,
        },
        include: {
          users: true,
        },
      });
    return conversation;
  } catch (error: any) {
    return null;
  }
}
