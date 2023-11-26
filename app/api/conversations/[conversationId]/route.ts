import getCurrentUser from '@/app/actions/getCurrentUser';
import client from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

interface IParams {
  conversationId?: string;
}
export async function DELETE(
  req: Request,
  { params }: { params: IParams }
) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse('Unauthorized', {
        status: 400,
      });
    }
    const existingConversation =
      await client.conversation.findUnique({
        where: {
          id: conversationId,
        },
        include: {
          users: true,
        },
      });
    if (!existingConversation) {
      return new NextResponse('Invalid conversation ID', {
        status: 400,
      });
    }
    const deletedConversation =
      await client.conversation.deleteMany({
        where: {
          id: conversationId,
          userIds: {
            hasSome: [currentUser.id],
          },
        },
      });
    return NextResponse.json(deletedConversation);
  } catch (error: any) {
    console.log(error, 'ERROR_CONVERSATION_DELETE');
    return new NextResponse('Internal Error', {
      status: 500,
    });
  }
}
