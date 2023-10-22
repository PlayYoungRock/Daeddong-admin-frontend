import React, { memo, useCallback, useId, useState } from 'react';
import styled from 'styled-components';

import Arrow from '@assets/arrow-drop-down-filled.svg?react';

export const Select = memo(
  ({ width = '100%', height = 32, value = null, options = [], onChange }) => {
    const uniqueId = useId();
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = useCallback(() => setIsOpen((state) => !state), []);

    return (
      <SelectContainer $width={width} $height={height} onClick={handleToggle}>
        {options.find(({ value: optionValue }) => optionValue === value)
          ?.label ?? null}
        <Wrapper $isOpen={isOpen}>
          <Arrow />
        </Wrapper>
        <Dropdown $isOpen={isOpen}>
          {options.map((option, index) => (
            <Option
              key={`${uniqueId}${index}}`}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </Option>
          ))}
        </Dropdown>
      </SelectContainer>
    );
  },
);

const SelectContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  width: ${(props) =>
    Number.isInteger(props.$width) ? `${props.$width}px` : props.$width};
  height: ${(props) =>
    Number.isInteger(props.$height) ? `${props.$height}px` : props.$height};
  border-radius: 4px;
  cursor: pointer;
`;

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  top: 50%;
  right: 0;
  transform: ${(props) =>
    props.$isOpen ? `translate(0, -50%) rotate(180deg)` : `translate(0, -50%)`};
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  max-height: 150px;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 4px;
  background-color: #fff;
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  overflow: auto;
`;

const Option = styled.div`
  padding: 8px;
  border-top: 1px solid #ccc;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
