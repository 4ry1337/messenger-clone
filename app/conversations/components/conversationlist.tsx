'use client';

import useConversation from '@/app/hooks/useConversation';
import { FullConversationType } from '@/app/types';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdOutlineGroupAdd } from 'react-icons/md';
import ConversationBox from './conversationbox';

interface ConversationListProps {
  initialConversations: FullConversationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialConversations,
}) => {
  const [conversations, setConversations] = useState(
    initialConversations
  );
  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  return (
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
  );
};

export default ConversationList;
