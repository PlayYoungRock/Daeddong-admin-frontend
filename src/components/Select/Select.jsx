import React, { useEffect, useId, useRef, useState } from 'react';
import styled from 'styled-components';

import Arrow from '@assets/arrow-drop-down-filled.svg?react';

export const Select = ({
  width = '100%',
  height = 32,
  value = null,
  options = [],
  onChange,
}) => {
  const uniqueId = useId();
  const selectRef = useRef(null);
  const dropDownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!window || !dropDownRef.current || !selectRef.current) return;

    const handleClose = (e) => {
      if (!e.target) return;
      const isClickedSelect =
        selectRef.current.contains(e.target) ||
        dropDownRef.current.contains(e.target);

      if (isClickedSelect) return;
      setIsOpen(false);
    };

    document.body.addEventListener('click', handleClose);

    return () => {
      document.body.removeEventListener('click', handleClose);
    };
  }, []);

  return (
    <SelectContainer
      ref={selectRef}
      $width={width}
      $height={height}
      onClick={() => setIsOpen((state) => !state)}
    >
      {options.find(({ value: optionValue }) => optionValue === value)?.label ??
        null}
      <Wrapper>
        <Arrow />
      </Wrapper>
      <Dropdown $isOpen={isOpen} ref={dropDownRef}>
        {options.map((option, index) => (
          <Option
            key={`select-${uniqueId}-${index}-${option.value}}`}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </Option>
        ))}
      </Dropdown>
    </SelectContainer>
  );
};

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

const Dropdown = styled.ul`
  position: absolute;
  z-index: 100;
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

const Option = styled.li`
  padding: 8px;
  border-top: 1px solid #ccc;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
