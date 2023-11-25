'use client';

import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';

interface MessageInputProps {
  id: string;
  placeholder?: string;
  type?: string;
  required: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const MessageInput: React.FC<MessageInputProps> = ({
  id,
  placeholder,
  type,
  required,
  register,
  errors,
}) => {
  return (
    <div className='relative w-full'>
      <input
        className='
          focus:outlint-none
          w-full
          rounded-full
          bg-neutral-100
          px-4
          py-2
          font-light
          text-black'
        id='id'
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
      />
    </div>
  );
};

export default MessageInput;
