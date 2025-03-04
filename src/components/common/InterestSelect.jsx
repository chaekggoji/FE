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
  gap: 6px;
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
  display: ${({ isDropdownOpen }) => (isDropdownOpen ? 'block' : 'none')};
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

const SelectionInfo = styled.span`
  margin-left: auto;
  font-size: ${({ theme }) => theme.fontSizes.text.xs};
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const InterestSelect = ({ selectedInterestList, setSelectedInterestList }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const selectBoxRef = useRef(null);

  const interestOptions = [
    '관심분야 1',
    '관심분야 2',
    '관심분야 3',
    '관심분야 4',
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleInterestSelect = (option) => {
    if (selectedInterestList.includes(option)) {
      setSelectedInterestList(
        selectedInterestList.filter((item) => item !== option),
      );
    } else if (selectedInterestList.length < 3) {
      const newSelection = [...selectedInterestList, option];
      setSelectedInterestList(newSelection);

      // 하나 이상 선택되면 드롭다운 닫기
      setIsDropdownOpen(false);
    }
  };

  const handleRemoveInterestTag = (option, e) => {
    e.stopPropagation(); // 드롭다운이 열리는 것을 방지
    const updateSelection = selectedInterestList.filter(
      (item) => item !== option,
    );
    setSelectedInterestList(updateSelection);
  };

  return (
    <MultiSelectContainer>
      <SelectBox ref={selectBoxRef} onClick={toggleDropdown}>
        {selectedInterestList.length > 0 ? (
          <>
            {selectedInterestList.map((item) => (
              <Tag key={item}>
                {item}
                <img
                  src={tagDelete}
                  alt="삭제"
                  onClick={(e) => handleRemoveInterestTag(item, e)}
                />
              </Tag>
            ))}
            <SelectionInfo>{selectedInterestList.length}/3</SelectionInfo>
          </>
        ) : (
          '관심 분야를 선택하세요'
        )}
      </SelectBox>
      <DropdownList isDropdownOpen={isDropdownOpen}>
        {interestOptions.map((option) => (
          <DropdownItem
            key={option}
            isSelected={selectedInterestList.includes(option)}
            onClick={() => handleInterestSelect(option)}
          >
            {option}
          </DropdownItem>
        ))}
      </DropdownList>
    </MultiSelectContainer>
  );
};

export default InterestSelect;
