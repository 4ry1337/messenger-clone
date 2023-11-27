'use cleint';

import Button from '@/app/components/Buttons/Button';
import Input from '@/app/components/Inputs/Input';
import Select from '@/app/components/Inputs/Select';
import Modal from '@/app/components/Modals/Modal';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import toast from 'react-hot-toast';

interface GroupChatModalProps {
  users: User[];
  isOpen?: boolean;
  onClose: () => void;
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({
  users,
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      members: [],
    },
  });
  const members = watch('members');
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post('/api/conversations', {
        ...data,
        isGroup: true,
      })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setIsLoading(false));
  };
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Create a group chat
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Create a chat more than 2 members
            </p>
            <div className='mt-10 flex flex-col gap-y-8'>
              <Input
                register={register}
                label='Name'
                id='name'
                disabled={isLoading}
                required
                errors={errors}
              />
              <Select
                disabled={isLoading}
                label='Members'
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(value) =>
                  setValue('members', value, {
                    shouldValidate: true,
                  })
                }
                value={members}
              />
            </div>
          </div>
        </div>
        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <Button
            onClick={onClose}
            secondary
            disabled={isLoading}
            type='button'
          >
            Cancel
          </Button>
          <Button
            type='submit'
            disabled={isLoading}
          >
            Create chat
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
