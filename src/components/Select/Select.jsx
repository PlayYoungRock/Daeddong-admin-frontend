import React, { useState } from 'react';
import styled from 'styled-components';

export const Select = ({width = '100%', height = 32, options = ['hi','he','te'] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <SelectContainer $width={width} $height={height} onClick={toggleDropdown}>
    {selectedOption}
    <Dropdown $isOpen={isOpen}>
      {options.map((option, index) => (
        <Option key={index} onClick={() => handleOptionClick(option)}>
          {option}
        </Option>
      ))}
    </Dropdown>
    </SelectContainer>
  );
};


const SelectContainer = styled.div`
  position: relative;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: ${props=> Number.isInteger(props.$width) ? `${props.$width}px` : props.$width};
  height: ${props=> Number.isInteger(props.$height) ? `${props.$height}px` : props.$height};
  cursor: pointer;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  background-color: #fff;
  display: ${props => (props.$isOpen ? 'block' : 'none')};
`;

const Option = styled.div`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;