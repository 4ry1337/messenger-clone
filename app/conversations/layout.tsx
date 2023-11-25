import getConversations from '../actions/getConversations';
import Sidebar from '../components/Sidebar/Sidebar';
import ConversationList from './components/conversationlist';

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  return (
    <Sidebar>
      <div className='h-full'>
        <ConversationList
          initialConversations={conversations}
        />
        {children}
      </div>
    </Sidebar>
  );
}
