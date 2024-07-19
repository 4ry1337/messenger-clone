'use client';

import EmptyState from '@/app/components/EmptyState';
import useConversation from '@/app/hooks/useConversation';
import clsx from 'clsx';

const Home = () => {
  const { isOpen } = useConversation();

  return (
    <div
      className={clsx(
        'h-full lg:block lg:pl-80',
        isOpen ? 'block' : 'hidden'
      )}
    >
      <EmptyState />
    </div>
  );
};

export default Home;
