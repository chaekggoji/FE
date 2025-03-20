import Button from '@components/common/Button';
import useOutsideClick from '@hooks/useOutsideClick';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

const PhraseWrite = () => {
  const formRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm();

  const handleCancle = (event) => {
    event.preventDefault();
    setIsOpen(false);
  };

  useOutsideClick(formRef, () => {
    setIsOpen(false);
  });

  const onSubmit = (formData) => {
    window.alert(JSON.stringify(formData));
    setIsOpen(false);
  };

  return (
    <div className="ml-auto">
      <Button onClick={() => setIsOpen((prev) => !prev)}>구절 작성</Button>
      {isOpen && (
        <form
          className="w-[400px] absolute top-full right-6 ring-slate-500 ring-1 bg-white p-6 z-10 flex flex-col gap-4 rounded-2xl"
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="w-full ring-2 ring-slate-300 focus:outline-none focus:ring-primary-400 rounded-2xl px-4 py-3 font-gowunbatang"
            type="text"
            placeholder="페이지"
            {...register('page')}
          />
          <textarea
            className="w-full ring-2 ring-slate-300 focus:outline-none focus:ring-primary-400 rounded-2xl resize-none px-4 py-3 min-h-[180px] font-gowunbatang"
            placeholder="공유하고 싶은 구절 내용을 작성해주세요."
            {...register('content')}
          />
          <div className="flex ml-auto gap-4">
            <Button type="CTA Lined" onClick={handleCancle}>
              취소
            </Button>
            <Button>저장</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PhraseWrite;
