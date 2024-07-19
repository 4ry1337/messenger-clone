import getCurrentUser from '@/app/actions/getCurrentUser';
import client from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', {
        status: 400,
      });
    }
    const body = await req.json();
    const { name, image } = body;
    console.log(name, image);
    const updatedUser = await client.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        image,
        name,
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.log(error, 'ERROR_SETTINGS');
    return new NextResponse('Internal Error', {
      status: 500,
    });
  }
}
