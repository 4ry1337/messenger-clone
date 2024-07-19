'use client';

import useRoutes from '@/app/hooks/useRoutes';
import { User } from '@prisma/client';
import { useState } from 'react';
import Avatar from '../Avatar';
import DescktopItem from './DescktopItem';
import SettingsModal from './SettingsModal';

interface DescktopSidebarProps {
  currentUser: User;
}

const DescktopSidebar: React.FC<DescktopSidebarProps> = ({
  currentUser,
}) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div
        className='
        hidden 
        justify-between 
        lg:fixed 
        lg:inset-y-0 
        lg:left-0 
        lg:z-40 
        lg:flex
        lg:w-20 
        lg:flex-col 
        lg:overflow-y-auto
        lg:border-r-[1px]
        lg:bg-white
        lg:pb-4
        xl:px-6
    '
      >
        <nav className='mt-4 flex flex-col justify-between'>
          <ul
            role='list'
            className='
            flex
            flex-col
            items-center
            space-y-1
          '
          >
            {routes.map((item) => (
              <DescktopItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav
          className='
          mt-4
          flex
          flex-col
          items-center
          justify-between
        '
        >
          <div
            onClick={() => setIsOpen(true)}
            className='
            haver:opacity-75
            cursor-pointer
            transition
          '
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>
  );
};

export default DescktopSidebar;
