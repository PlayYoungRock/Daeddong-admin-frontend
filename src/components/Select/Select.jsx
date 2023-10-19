import React, { memo, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

export const Select = memo(({width = '100%', height = 32, value = null, options = [], onChange}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectLabel = useMemo(()=> {
    const v = options.find(({value:optionValue})=> optionValue === value);
    return v?.value ? v.label : null;
  },[value, options])

  const handleToggle = useCallback(() => setIsOpen(state=> !state),[]);

  const handleOptionClick = useCallback((value) => {
    setIsOpen(false);
    onChange(value);
  }, [onChange]);

  return (
    <SelectContainer $width={width} $height={height} onClick={handleToggle}>
    {selectLabel}
    <Dropdown $isOpen={isOpen}>
      {options.map((option, index) => (
        <Option key={index} onClick={() => handleOptionClick(option.value)}>
          {option.label}
        </Option>
      ))}
    </Dropdown>
    </SelectContainer>
  );
})


const SelectContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  border: 1px solid #ccc;
  width: ${props=> Number.isInteger(props.$width) ? `${props.$width}px` : props.$width};
  height: ${props=> Number.isInteger(props.$height) ? `${props.$height}px` : props.$height};
  border-radius: 4px;
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