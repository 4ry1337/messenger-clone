import clsx from 'clsx';
import Link from 'next/link';

interface MobileItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const MobileItem: React.FC<MobileItemProps> = ({
  label,
  href,
  active,
  onClick,
  icon: Icon,
}) => {
  const handleClick = () => {
    if (onClick) return onClick();
  };
  return (
    <Link
      href={href}
      onClick={handleClick}
      className={clsx(
        `
        font-simebold
        group
        flex
        w-full
        justify-center
        gap-x-3
        p-4
        text-sm
        leading-6
        text-gray-500
        hover:bg-gray-100
        hover:text-black
      `,
        active && 'bg-gray-100 text-black'
      )}
    >
      <Icon className='h-6 w-6' />
    </Link>
  );
};

export default MobileItem;
