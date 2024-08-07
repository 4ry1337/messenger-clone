import getConversationByID from '@/app/actions/getConversationById';
import getMessages from '@/app/actions/getMessages';
import EmptyState from '@/app/components/EmptyState';
import Body from './components/Body';
import Form from './components/Form';
import Header from './components/Header';

interface IParams {
  conversationId: string;
}

const ConversationId = async ({
  params,
}: {
  params: IParams;
}) => {
  const conversation = await getConversationByID(
    params.conversationId
  );
  const messages = await getMessages(params.conversationId);
  if (!conversation) {
    return (
      <div className='h-full lg:pl-80'>
        <div className='flex h-full flex-col'>
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className='h-full lg:pl-80'>
      <div className='flex h-full flex-col'>
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ConversationId;
