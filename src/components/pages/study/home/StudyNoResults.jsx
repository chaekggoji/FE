import studyNoResults from '@/assets/images/studyNoresults.svg';

export const StudyNoResults = ({ key }) => {
  return (
    <div className='no-results items-center justify-center'>
      <img src={studyNoResults} alt='No Results' />
      <p>`${key}에 해당되는 스터디가 없어요.`</p>
    </div>)
}