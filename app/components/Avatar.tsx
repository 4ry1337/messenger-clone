'use client';

import { User } from '@prisma/client';
import Image from 'next/image';
import useActiveUsersList from '../hooks/useActiveUsersList';

interface AvatarProps {
  user?: User;
}
const Avatar: React.FC<AvatarProps> = ({ user }) => {
  const { members } = useActiveUsersList();
  const isActive = members.indexOf(user?.email!) !== -1;
  return (
    <div className='relative'>
      <div
        className='
        relative
        inline-block
        h-9
        w-9
        overflow-hidden
        rounded-full
        md:h-11
        md:w-11'
      >
        <Image
          alt='Avatar'
          src={user?.image || '/images/placeholder.jpg'}
          sizes='
            (min-width: 66em) 33vw,
            (min-width: 44em) 50vw,
            100vw
            '
          fill
        />
      </div>
      {isActive ? (
        <span
          className='
            absolute
            right-0
            top-0
            block
            h-2
            w-2
            rounded-full
            bg-green-500
            ring-2
            ring-white
            md:h-3
            md:w-3
            '
        />
      ) : null}
    </div>
  );
};

export default Avatar;
