import React, { memo } from 'react';
import styled from 'styled-components';

import CheckIcon from '@assets/check-box.svg?react';

export const CheckBox = memo(({ checked, onChange, label, ...props }) => {
  return (
    <div>
      <AbstractCheckBox checked={checked} onChange={onChange} {...props} />
      <CheckBoxWrapper onClick={onChange}>
        {checked && <CheckIcon />}
      </CheckBoxWrapper>
      {label}
    </div>
  );
});

const AbstractCheckBox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  border: 2px solid #ccc;
  border-radius: 4px;

  transition: all 150ms;

  ${AbstractCheckBox}:checked + & {
    background: #007bff;
    border: 2px solid #007bff;
  }
`;
