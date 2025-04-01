import Button from '@components/common/Button';
import CreateComplete from '@components/pages/study/create/CreateComplete';
import ProgressBar from '@components/pages/study/create/ProgressBar';
import SearchBook from '@components/pages/study/create/SearchBook';
import StudyForm from '@components/pages/study/create/StudyForm';
import StudyPreview from '@components/pages/study/create/StudyPreview';
import supabase from '@libs/supabase';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Create = () => {
  const navigate = useNavigate();

  // 현재 작성 중인 step 상태로 지정
  const [currentStep, setCurrentStep] = useState(0);

  // 전체 작성 완료 상태
  const [isComplete, setIsComplete] = useState('');

  // 도서 검색 결과 리스트 상태
  const [bookList, setBookList] = useState();

  // 선택 도서 상태
  const [isBookSelected, setIsBookSelected] = useState(null);

  // 스터디 정보 Form 입력 상태
  const [studyForm, setStudyForm] = useState(null);

  // 카테고리 선택 상태
  const [categoryValue, setCategoryValue] = useState(null);

  // step 2의 모든 입력란 입력이 완료된 경우, true 로 지정
  const isStepOneFilled = studyForm !== null && categoryValue;

  const isStepFilled =
    (currentStep === 0 && isBookSelected) ||
    (currentStep === 1 && isStepOneFilled);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleCancelCreate = () => {
    const cancelCreate = confirm('스터디 생성을 취소하시겠어요?');
    if (cancelCreate) navigate(-1);
  };

  const handleSaveStudy = async () => {
    console.log(studyForm);
    console.log({ ...isBookSelected, category_id: categoryValue.id });
    console.log(categoryValue);
    let bookId;

    // 선택한 도서 데이터 조회
    try {
      const { data: books, error } = await supabase
        .from('books')
        .select('*')
        .eq('isbn', isBookSelected.isbn);
      console.log(books);

      if (error) {
        throw new Error(`도서 정보 조회 오류: ${error.message}`);
      }

      console.log('조회된 도서', books);

      // 선택한 도서가 없으면 새로운 도서 등록
      if (books.length === 0) {
        const { data, error } = await supabase
          .from('books')
          .insert([
            {
              isbn: isBookSelected.isbn,
              title: isBookSelected.title,
              publisher: isBookSelected.publisher,
              author: isBookSelected.author.join(', '),
              description: isBookSelected.description,
              url: isBookSelected.url,
              thumb_url: isBookSelected.thumb_url,
              category_id: categoryValue.id,
            },
          ])
          .select();

        if (error) {
          throw new Error(`도서 데이터 등록 오류: ${error.message}`);
        }

        // 신규 등록된 도서 id 반환
        bookId = data[0].id;
        console.log('신규 등록 도서 id', bookId);
      } else {
        // 이미 등록된 도서가 있으면 기존 도서 사용
        bookId = books[0].id;
        console.log('기존 도서 id', bookId);
      }
    } catch (err) {
      console.error(err.message);
      alert(err.message);
      return;
    }

    try {
      // 도서 id 를 포함하여 입력한 스터디 정보와 함께 스터디 등록
      const { data, error } = await supabase
        .from('studies')
        .insert([
          {
            title: studyForm.title,
            description: studyForm.description,
            rule: studyForm.rule,
            start_date: studyForm.start_date,
            end_date: studyForm.end_date,
            capacity: studyForm.capacity,
            book_id: bookId,
          },
        ])
        .select();
      console.log(data);

      if (error) {
        throw new Error(`스터디 등록 오류: ${error.message}`);
      }

      // 스터디 id 를 상태에 저장
      setIsComplete(data[0].id);
    } catch (err) {
      console.error('스터디 등록 오류: ', err.message);
      alert('스터디 등록 오류: ', err.message);
      return;
    }
  };

  return (
    <>
      <div className="my-6 md:my-10 md:mx-auto w-full max-w-[1100px] md:p-15 flex flex-col gap-y-7 sm:gap-y-10">
        {!isComplete ? (
          <>
            <ProgressBar
              currentStep={currentStep}
              isBookSelected={isBookSelected}
              isStepOneFilled={isStepOneFilled}
              setCurrentStep={setCurrentStep}
            />
            {currentStep === 0 && (
              <SearchBook
                isBookSelected={isBookSelected}
                setIsBookSelected={setIsBookSelected}
                bookList={bookList}
                setBookList={setBookList}
              />
            )}
            {currentStep === 1 && (
              <StudyForm
                studyForm={studyForm}
                setStudyForm={setStudyForm}
                categoryValue={categoryValue}
                setCategoryValue={setCategoryValue}
              />
            )}
            {currentStep === 2 && (
              <StudyPreview
                isBookSelected={isBookSelected}
                studyForm={studyForm}
                categoryValue={categoryValue}
              />
            )}
            <div className="flex justify-between">
              {currentStep === 0 ? (
                <Button
                  size="large"
                  type="CTA Lined"
                  onClick={handleCancelCreate}
                >
                  취소
                </Button>
              ) : (
                <Button
                  size="large"
                  type="CTA Lined"
                  onClick={handlePreviousStep}
                >
                  <img src="/src/assets/icons/icon_arrow_left_24.svg" />
                  이전
                </Button>
              )}
              {currentStep < 2 ? (
                <Button
                  size="large"
                  type={
                    // step 1, 2의 모든 내용이 입력 완료된 경우에만 버튼 활성화
                    isStepFilled ? 'CTA Abled' : 'CTA Disabled'
                  }
                  onClick={isStepFilled ? handleNextStep : null}
                >
                  다음
                  <img src="/src/assets/icons/icon_arrow_right_24.svg" />
                </Button>
              ) : (
                <Button size="large" type="CTA Abled" onClick={handleSaveStudy}>
                  스터디 생성
                </Button>
              )}
            </div>
          </>
        ) : (
          <CreateComplete />
        )}
      </div>
    </>
  );
};

export default Create;
