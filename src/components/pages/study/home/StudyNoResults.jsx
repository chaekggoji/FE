import studyNoResults from '@/assets/images/studyNoresults.svg';

export const StudyNoResults = ({ keyword }) => {
  return (
    <div className='w-full flex flex-col items-center justify-center text-center py-10 col-span-full'>
      <img src={studyNoResults} alt='No Results' className='w-32 h-32 object-contain mb-4' />
      <p>'{keyword}'에 해당되는 스터디가 없어요.</p>
    </div>)
}