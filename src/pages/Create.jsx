import CustomButton from '@components/common/Button';
import CustomInputField from '@components/common/InputField';
import SearchField from '@components/common/SearchField';
import styled from 'styled-components';

const MainContainer = styled.div`
  margin: 80px clamp(0px, 9vw, 130px);
  border: ${({ theme }) => {
      return theme.colors.gray[200];
    }}
    1px solid;
  border-radius: 12px;
  padding: 60px;

  ${({ theme }) => {
    return theme.breakpoints.medium;
  }} {
    border: none;
    padding: 60px 0;
    margin: 0;
  }

  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const SearchResult = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  ${({ theme }) => {
    return theme.breakpoints.small;
  }} {
    gap: 24px;
  }
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

  ${({ theme }) => {
    return theme.breakpoints.small;
  }} {
    gap: 20px;
    padding: 16px;
  }
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  ${({ theme }) => {
    return theme.breakpoints.small;
  }} {
    gap: 15px;
  }
`;

const BookTitle = styled.h2`
  font-size: ${({ theme }) => {
    return theme.fontSizes.title['2xl'];
  }};

  ${({ theme }) => {
    return theme.breakpoints.small;
  }} {
    font-size: ${({ theme }) => {
      return theme.fontSizes.title['xl'];
    }};
  }
`;

const BookInfoText = styled.p`
  color: ${({ theme }) => {
    return theme.colors.gray[500];
  }};
  font-size: ${({ theme }) => {
    return theme.fontSizes.text['xl'];
  }};

  ${({ theme }) => {
    return theme.breakpoints.small;
  }} {
    font-size: ${({ theme }) => {
      return theme.fontSizes.text['md'];
    }};
  }
`;

const BookCover = styled.img`
  width: 100%;
  height: 100%;
  max-width: 112px;
  aspect-ratio: 7/10;
  object-fit: cover;

  ${({ theme }) => {
    return theme.breakpoints.small;
  }} {
    max-width: 76px;
    aspect-ratio: 7 / 10;
  }
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
            <BookCover src="https://picsum.photos/120/160" />
            <BookInfo>
              <BookTitle>도서 제목</BookTitle>
              <BookInfoText>저자 | 출판사</BookInfoText>
              <BookInfoText>도서 정보</BookInfoText>
            </BookInfo>
          </BookCard>
          <BookCard>
            <BookCover src="https://picsum.photos/120/160" />
            <BookInfo>
              <BookTitle>도서 제목</BookTitle>
              <BookInfoText>저자 | 출판사</BookInfoText>
              <BookInfoText>도서 정보</BookInfoText>
            </BookInfo>
          </BookCard>
          <BookCard>
            <BookCover src="https://picsum.photos/120/160" />
            <BookInfo>
              <BookTitle>도서 제목</BookTitle>
              <BookInfoText>저자 | 출판사</BookInfoText>
              <BookInfoText>도서 정보</BookInfoText>
            </BookInfo>
          </BookCard>
          <BookCard>
            <BookCover src="https://picsum.photos/120/160" />
            <BookInfo>
              <BookTitle>도서 제목</BookTitle>
              <BookInfoText>저자 | 출판사</BookInfoText>
              <BookInfoText>도서 정보</BookInfoText>
            </BookInfo>
          </BookCard>
          <BookCard>
            <BookCover src="https://picsum.photos/120/160" />
            <BookInfo>
              <BookTitle>도서 제목</BookTitle>
              <BookInfoText>저자 | 출판사</BookInfoText>
              <BookInfoText>도서 정보</BookInfoText>
            </BookInfo>
          </BookCard>
          <BookCard>
            <BookCover src="https://picsum.photos/120/160" />
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
          <CustomButton type="CTA Able" size="large" style={{ gap: '10px' }}>
            다음
            <img src="src/assets/icons/icon_arrow_right_24.svg" />
          </CustomButton>
        </div>

        <CustomInputField labelText="label 테스트" placeholder="placeholder" />
      </MainContainer>
    </>
  );
};

export default Create;
