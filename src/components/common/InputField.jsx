import styled from 'styled-components';

const InputField = styled.div`
  display: flex;
  justify-content: space-bewteen
  width: 100%;
  padding: 12px 24px;
  border: ${({ theme }) => {
    return theme.colors.gray[200];
  }}
    1px solid;
  font-size: ${({ theme, fontSize }) => {
    return theme.fontSizes.text[fontSize];
  }};
`;

const Input = styled.input`
  &::placeholder {
    color: ${({ theme }) => {
      return theme.colors.gray[300];
    }};
  }
`;

const InputLabel = styled.label`
  margin-bottom: 4px;
  font-size: ${({ theme, labelSize }) => {
    return theme.fontSizes.text[labelSize];
  }};
  color: ${({ theme }) => {
    return theme.colors.gray[400];
  }};
`;

const CustomInputField = ({
  type = 'text',
  placeholder = '텍스트 입력 필드',
  fontSize = 'xl',
  labelText,
  labelSize = '2xl',
  children,
}) => {
  return (
    <>
      <InputLabel labelSize={labelSize}>
        {labelText || null}
        <InputField fontSize={fontSize}>
          <Input
            type={type}
            placeholder={placeholder}
            style={{ width: '100%' }}
          />
          {children}
        </InputField>
      </InputLabel>
    </>
  );
};

export default CustomInputField;
