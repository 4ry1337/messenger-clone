import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { HiChat } from 'react-icons/hi';
import {
  HiArrowLeftOnRectangle,
  HiUsers,
} from 'react-icons/hi2';
import useConversation from './useConversation';

const useRoutes = () => {
  const path = usePathname();
  const { conversationId } = useConversation();
  const routes = useMemo(
    () => [
      {
        label: 'Chat',
        href: '/converstaions',
        icon: HiChat,
        active:
          path === '/conversations' || !!conversationId,
      },
      {
        label: 'Users',
        href: '/users',
        icon: HiUsers,
        active: path === '/users',
      },
      {
        label: 'Logout',
        href: '#',
        onClick: () => signOut(),
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [path, conversationId]
  );
  return routes;
};

export default useRoutes;
