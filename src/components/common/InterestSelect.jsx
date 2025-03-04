import { useRef, useState } from 'react';
import styled from 'styled-components';
import tagDelete from '@assets/icons/icon_x_24.svg';

const MultiSelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SelectBox = styled.div`
  width: 100%;
  min-height: 48px;
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 12px;
  font-size: ${({ theme }) => theme.fontSizes.text.md};
  color: rgba(102, 102, 102, 0.6);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  cursor: pointer;
  background-color: #fff;
  gap: 6px;
`;

const Tag = styled.span`
  background-color: ${({ theme }) => theme.colors.primary[300]};
  color: #fff;
  padding: 6px 10px;
  font-size: ${({ theme }) => theme.fontSizes.text.sm};
  border-radius: 8px;
  display: flex;
  align-items: center;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 12px;
  margin-top: 4px;
  padding: 8px 0;
  list-style: none;
  max-height: 200px;
  overflow-y: auto;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 1000;
`;

const DropdownItem = styled.li`
  padding: 10px 16px;
  font-size: ${({ theme }) => theme.fontSizes.text.md};
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? '#DDEEDC' : '#fff')};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }
`;

const InterestSelect = ({ selectedInterests, setSelectedInterests }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectBoxRef = useRef(null);

  const options = ['관심분야 1', '관심분야 2', '관심분야 3', '관심분야 4'];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    if (selectedInterests.includes(option)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== option));
    } else if (selectedInterests.length < 3) {
      const newSelection = [...selectedInterests, option];
      setSelectedInterests([...selectedInterests, option]);

      if (newSelection.length === 3) {
        setIsOpen(false); // 3개 선택되면 드롭다운 자동 닫기
      }
    }
  };

  const handleRemoveTag = (option) => {
    const updateSelection = selectedInterests.filter((item) => item !== option);
    setSelectedInterests(updateSelection);

    if (updateSelection.length < 3) {
      setIsOpen(true); // 하나라도 삭제되면 드롭다운 다시 열기
    }
  };

  return (
    <MultiSelectContainer>
      <SelectBox ref={selectBoxRef} onClick={toggleDropdown}>
        {selectedInterests.length > 0
          ? selectedInterests.map((item) => (
              <Tag key={item}>
                {item}
                <img
                  src={tagDelete}
                  alt="삭제"
                  onClick={(e) => {
                    e.stopPropagation(); // 드롭다운이 닫히는 것을 방지
                    handleRemoveTag(item);
                  }}
                />
              </Tag>
            ))
          : '관심 분야를 선택하세요'}
      </SelectBox>
      <DropdownList isOpen={isOpen}>
        {options.map((option) => (
          <DropdownItem
            key={option}
            isSelected={selectedInterests.includes(option)}
            onClick={() => handleSelect(option)}
          >
            {option}
          </DropdownItem>
        ))}
      </DropdownList>
    </MultiSelectContainer>
  );
};

export default InterestSelect;
