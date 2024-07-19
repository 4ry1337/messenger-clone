import gerCurrentUser from '@/app/actions/getCurrentUser';
import client from '@/app/libs/prismadb';
import { pusherServer } from '@/app/libs/pusher';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const currentUser = await gerCurrentUser();
    const body = await req.json();
    const { userId, isGroup, members, name } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', {
        status: 401,
      });
    }

    if (
      isGroup &&
      (!members || members.length < 2 || !name)
    ) {
      return new NextResponse('Invalid data', {
        status: 400,
      });
    }

    if (isGroup) {
      const newConversation =
        await client.conversation.create({
          data: {
            name: name,
            isGroup,
            users: {
              connect: [
                ...members.map(
                  (member: { value: string }) => ({
                    id: member.value,
                  })
                ),
                {
                  id: currentUser.id,
                },
              ],
            },
          },
          include: {
            users: true,
          },
        });
      newConversation.users.forEach((user) => {
        if (user.email) {
          pusherServer.trigger(
            user.email,
            'conversation:new',
            newConversation
          );
        }
      });
      return NextResponse.json(newConversation);
    }
    const exisitingConversations =
      await client.conversation.findMany({
        where: {
          OR: [
            {
              userIds: {
                equals: [currentUser.id, userId],
              },
            },
            {
              userIds: {
                equals: [userId, currentUser.id],
              },
            },
          ],
        },
      });
    const conversation = exisitingConversations[0];
    if (conversation) {
      return NextResponse.json(conversation);
    }
    const newConversation =
      await client.conversation.create({
        data: {
          users: {
            connect: [
              {
                id: userId,
              },
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });
    newConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(
          user.email,
          'conversation:new',
          newConversation
        );
      }
    });
    return NextResponse.json(newConversation);
  } catch (error: any) {
    return new NextResponse('Internal Error', {
      status: 500,
    });
  }
}
