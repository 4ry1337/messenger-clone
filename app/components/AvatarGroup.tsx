'use client';

import { User } from '@prisma/client';
import Image from 'next/image';

interface AvatarGroupProps {
  users: User[];
}
const AvatarGroup: React.FC<AvatarGroupProps> = ({
  users,
}) => {
  const slicedUsers = users.slice(0, 3);
  const positionMap = {
    0: 'top-0 left-[12px]',
    1: 'bottom-0',
    2: 'bottom-0 right-0',
  };
  return (
    <div className='relative h-11 w-11'>
      {slicedUsers.map((users, index) => (
        <div
          key={users.id}
          className={`
            absolute
            inline-block
            h-[21px]
            w-[21px]
            overflow-hidden
            rounded-full
            ${
              positionMap[index as keyof typeof positionMap]
            }
            `}
        >
          <Image
            alt='Avatar'
            fill
            sizes='
            (min-width: 66em) 33vw,
            (min-width: 44em) 50vw,
            100vw
            '
            src={users?.image || '/images/placeholder.jpg'}
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
