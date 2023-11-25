import client from '../libs/prismadb';
import gerCurrentUser from './getCurrentUser';

export default async function getConversations() {
  const currentUser = await gerCurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  try {
    const conversations =
      await client.conversation.findMany({
        orderBy: {
          lastMessageAt: 'desc',
        },
        where: {
          userIds: {
            has: currentUser.id,
          },
        },
        include: {
          users: true,
          messages: {
            include: {
              sender: true,
              seen: true,
            },
          },
        },
      });
    return conversations;
  } catch (error: any) {
    return [];
  }
}
