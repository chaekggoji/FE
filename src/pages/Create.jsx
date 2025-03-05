import CustomButton from '@components/common/Button';
import SearchField from '@components/common/SearchField';
import styled from 'styled-components';

const MainContainer = styled.main`
  margin: 80px 130px;
  border: ${({ theme }) => {
      return theme.colors.gray[200];
    }}
    1px solid;
  border-radius: 12px;
  padding: 60px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const SearchResult = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const SectionTitle = styled.h2`
  ${({ theme }) => {
    const fontSize = theme.fontSizes;
    return `font-size: ${fontSize.title['2xl']}`;
  }}
`;

const BookCard = styled.article`
  display: flex;
  gap: 40px;
  align-items: center;
  padding: 32px;
  border: ${({ theme }) => {
      return theme.colors.gray[200];
    }}
    1px solid;
  border-radius: 12px;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const BookTitle = styled.h2`
  font-size: ${({ theme }) => {
    return theme.fontSizes.title['2xl'];
  }};
`;

const BookInfoText = styled.p`
  font-size: ${({ theme }) => {
    return theme.fontSizes.text['xl'];
  }};
`;

const Create = () => {
  return (
    <>
      <MainContainer>
        <div style={{ height: 80, backgroundColor: 'lightgray' }}>
          page navigation
        </div>
        <SearchField placeholder="검색어를 입력해주세요." />
        <SectionTitle>검색 결과</SectionTitle>
        <SearchResult>
          <BookCard>
            <img
              src="https://picsum.photos/120/160"
              style={{ width: 112, aspectRatio: '112 / 160' }}
            />
            <BookInfo>
              <BookTitle>도서 제목</BookTitle>
              <BookInfoText>저자 | 출판사</BookInfoText>
              <BookInfoText>도서 정보</BookInfoText>
            </BookInfo>
          </BookCard>
          <BookCard>
            <img
              src="https://picsum.photos/120/160"
              style={{ width: 112, aspectRatio: '112 / 160' }}
            />
            <BookInfo>
              <BookTitle>도서 제목</BookTitle>
              <BookInfoText>저자 | 출판사</BookInfoText>
              <BookInfoText>도서 정보</BookInfoText>
            </BookInfo>
          </BookCard>
          <BookCard>
            <img
              src="https://picsum.photos/120/160"
              style={{ width: 112, aspectRatio: '112 / 160' }}
            />
            <BookInfo>
              <BookTitle>도서 제목</BookTitle>
              <BookInfoText>저자 | 출판사</BookInfoText>
              <BookInfoText>도서 정보</BookInfoText>
            </BookInfo>
          </BookCard>
          <BookCard>
            <img
              src="https://picsum.photos/120/160"
              style={{ width: 112, aspectRatio: '112 / 160' }}
            />
            <BookInfo>
              <BookTitle>도서 제목</BookTitle>
              <BookInfoText>저자 | 출판사</BookInfoText>
              <BookInfoText>도서 정보</BookInfoText>
            </BookInfo>
          </BookCard>
          <BookCard>
            <img
              src="https://picsum.photos/120/160"
              style={{ width: 112, aspectRatio: '112 / 160' }}
            />
            <BookInfo>
              <BookTitle>도서 제목</BookTitle>
              <BookInfoText>저자 | 출판사</BookInfoText>
              <BookInfoText>도서 정보</BookInfoText>
            </BookInfo>
          </BookCard>
          <BookCard>
            <img
              src="https://picsum.photos/120/160"
              style={{ width: 112, aspectRatio: '112 / 160' }}
            />
            <BookInfo>
              <BookTitle>도서 제목</BookTitle>
              <BookInfoText>저자 | 출판사</BookInfoText>
              <BookInfoText>도서 정보</BookInfoText>
            </BookInfo>
          </BookCard>
        </SearchResult>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <CustomButton type="CTA Lined" size="large">
            취소
          </CustomButton>
          <CustomButton type="CTA Able" size="large">
            다음
            <img src="src/assets/icons/icon_arrow_right_24.svg" />
          </CustomButton>
        </div>
      </MainContainer>
    </>
  );
};

export default Create;
