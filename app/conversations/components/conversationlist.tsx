'use client';

import useConversation from '@/app/hooks/useConversation';
import { pusherClient } from '@/app/libs/pusher';
import { FullConversationType } from '@/app/types';
import { User } from '@prisma/client';
import clsx from 'clsx';
import { find } from 'lodash';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { MdOutlineGroupAdd } from 'react-icons/md';
import ConversationBox from './ConversationBox';
import GroupChatModal from './GroupChatModal';

interface ConversationListProps {
  users: User[];
  initialConversations: FullConversationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  users,
  initialConversations,
}) => {
  const [conversations, setConversations] = useState(
    initialConversations
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  const session = useSession();
  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }
    pusherClient.subscribe(pusherKey);
    const newConversationHandler = (
      conversation: FullConversationType
    ) => {
      setConversations((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }
        return [conversation, ...current];
      });
    };
    const updateConversationHandler = (
      conversation: FullConversationType
    ) => {
      setConversations((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }
          return currentConversation;
        })
      );
    };
    const deleteConversationHandler = (
      deletedConversation: FullConversationType
    ) => {
      setConversations((current) => {
        return [
          ...current.filter(
            (conversation) =>
              deletedConversation.id !== conversation.id
          ),
        ];
      });
      if (deletedConversation.id === conversationId) {
        router.push('/conversations');
      }
    };
    pusherClient.bind(
      'conversation:new',
      newConversationHandler
    );
    pusherClient.bind(
      'conversation:update',
      updateConversationHandler
    );
    pusherClient.bind(
      'conversation:delete',
      deleteConversationHandler
    );
    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind(
        'conversation:new',
        newConversationHandler
      );
      pusherClient.unbind(
        'conversation:update',
        updateConversationHandler
      );
      pusherClient.unbind(
        'conversation:delete',
        deleteConversationHandler
      );
    };
  }, [pusherKey, router, conversationId]);

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          `
        fixed
        inset-y-0
        overflow-y-auto
        border-r
        border-gray-200
        pb-20
        lg:left-20
        lg:block
        lg:w-80
        lg:pb-0
    `,
          isOpen ? 'hidden' : 'left-0 block w-full'
        )}
      >
        <div className='px-5'>
          <div className='mb-4 flex justify-between pt-4'>
            <div
              className='
              text-2xl
              font-bold
              text-neutral-200
            '
            >
              Messages
            </div>
            <div
              onClick={() => setIsModalOpen(true)}
              className='
            cursor-pointer
            rounded-full
            bg-gray-100
            p-2
            text-gray-600
            transition
            hover:opacity-75
            '
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {conversations.map((conversation) => (
            <ConversationBox
              key={conversation.id}
              data={conversation}
              selected={conversationId === conversation.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
