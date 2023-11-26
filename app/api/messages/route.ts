import getCurrentUser from '@/app/actions/getCurrentUser';
import client from '@/app/libs/prismadb';
import { pusherServer } from '@/app/libs/pusher';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();
    const { message, image, conversationId } = body;
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', {
        status: 401,
      });
    }
    const newMessage = await client.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: currentUser.id,
          },
        },
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    });
    const updateConversation =
      await client.conversation.update({
        where: {
          id: conversationId,
        },
        data: {
          lastMessageAt: new Date(),
          messages: {
            connect: {
              id: newMessage.id,
            },
          },
        },
        include: {
          users: true,
          messages: {
            include: {
              seen: true,
              sender: true,
            },
          },
        },
      });
    await pusherServer.trigger(
      conversationId,
      'messages:new',
      newMessage
    );
    const lastMessage =
      updateConversation.messages[
        updateConversation.messages.length - 1
      ];
    updateConversation.users.map((user) => {
      pusherServer.trigger(
        user.email!,
        'conversation:update',
        {
          id: conversationId,
          messages: [lastMessage],
        }
      );
    });
    return NextResponse.json(newMessage);
  } catch (error: any) {
    console.log(error, 'ERROR_MESSAGES');
    return new NextResponse('InternalError', {
      status: 500,
    });
  }
}
