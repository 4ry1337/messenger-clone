const EmptyState = () => {
  return (
    <div className='justif-center flex h-full items-center bg-gray-100 px-4 py-10 sm:px-6 lg:px-8'>
      <div className='flex flex-col items-center text-center'>
        <h3 className='mt-2 text-2xl font-semibold text-gray-900'>
          Select a chat or start new converstaion
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
