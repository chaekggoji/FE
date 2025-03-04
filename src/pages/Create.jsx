import styled from 'styled-components';

const MainContainer = styled.main`
  border: grey 1px solid;
  border-radius: 8px;
  max-width: 1100px;
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

const SearchField = styled.div`
  border: grey 1px solid;
  display: flex;
  justify-content: space-between;
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
        <SearchField>
          <input type="text" placeholder="검색어를 입력해주세요." />
          <button type="button">search</button>
        </SearchField>
        <SearchResult>
          <SectionTitle>검색 결과</SectionTitle>
          <article>도서 카드</article>
          <article>도서 카드</article>
          <article>도서 카드</article>
          <article>도서 카드</article>
        </SearchResult>
      </MainContainer>
    </>
  );
};

export default Create;
