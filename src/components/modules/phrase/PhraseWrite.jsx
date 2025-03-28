import Button from '@components/common/Button';
import useMediaQuery from '@hooks/useMediaQuery';
import useModalDismiss from '@hooks/useModalDismiss';
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

  useModalDismiss(formRef, () => {
    setIsOpen(false);
  });

  const onSubmit = (formData) => {
    window.alert(JSON.stringify(formData));
    setIsOpen(false);
  };

  const md = useMediaQuery('(min-width: 768px)');

  return (
    <div className="ml-auto" ref={formRef}>
      <Button
        size={md ? 'medium' : 'small'}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        구절 작성
      </Button>
      <form
        className={`md:w-1/2 w-2/3 absolute top-full lg:right-10 md:right-8 right-6 ring-slate-500 ring-1 bg-white p-6 z-10 flex flex-col gap-4 rounded-2xl transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="w-full ring-2 ring-slate-300 focus:outline-none focus:ring-primary-400 rounded-2xl px-4 py-3 font-gowunbatang sm:text-sm"
          type="text"
          placeholder="페이지"
          {...register('page')}
        />
        <textarea
          className="w-full ring-2 ring-slate-300 focus:outline-none focus:ring-primary-400 rounded-2xl resize-none px-4 py-3 min-h-[180px] font-gowunbatang sm:text-sm"
          placeholder="공유하고 싶은 구절 내용을 작성해주세요."
          {...register('content')}
        />
        <div className="flex ml-auto gap-4">
          <Button
            size={md ? 'medium' : 'small'}
            type="CTA Lined"
            onClick={handleCancle}
          >
            취소
          </Button>
          <Button size={md ? 'medium' : 'small'}>저장</Button>
        </div>
      </form>
    </div>
  );
};

export default PhraseWrite;
