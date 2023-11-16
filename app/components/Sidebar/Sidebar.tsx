import getCurrentUser from '@/app/actions/getCurrentUser';
import DescktopSidebar from './DescktopSidebar';
import MobileFooter from './ModileFooter';

async function Sidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <div className='h-full'>
      <DescktopSidebar currentUser={currentUser!} />
      <MobileFooter />
      <main className='h-full lg:pl-20'>{children}</main>
    </div>
  );
}

export default Sidebar;
