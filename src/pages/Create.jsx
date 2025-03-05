import CustomInputField from '@components/common/InputField';
import SearchField from '@components/common/SearchField';
import styled from 'styled-components';

const MainContainer = styled.main`
  margin: 80px 130px;
  border: grey 1px solid;
  border-radius: 8px;
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

const Create = () => {
  return (
    <>
      <h1>스터디 생성 페이지 테스트</h1>
      <MainContainer>
        <div>page navigation</div>
        <SearchField placeholder="검색어를 입력해주세요." />
        <SectionTitle>검색 결과</SectionTitle>
        <SearchResult>
          <article>도서 카드</article>
          <article>도서 카드</article>
          <article>도서 카드</article>
          <article>도서 카드</article>
        </SearchResult>
        <CustomInputField
          labelText="텍스트 입력 필드"
          placeholder="텍스트 입력 필드"
        />
      </MainContainer>
    </>
  );
};

export default Create;
