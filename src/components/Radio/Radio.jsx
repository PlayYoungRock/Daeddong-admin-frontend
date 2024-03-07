import React from 'react';
import styled from 'styled-components';

import Inactive from '@assets/inactive-radio.svg?react';
import Active from '@assets/active-radio.svg?react';
import { Text } from '../Text';

export const Radio = ({ options, className, ...props }) => {
  return (
    <Container className={className}>
      {options.map(({ label, value }, i) => (
        <Label key={`radio-${props.name}-${label}-${value}-${i}`}>
          {props.value === value ? <Active /> : <Inactive />}
          <Text>{label}</Text>
          {!props.readOnly && (
            <UnVisibleInput
              {...props}
              type="radio"
              checked={props.value === value}
              value={value}
            />
          )}
        </Label>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 8px;
`;

const Label = styled.label`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const UnVisibleInput = styled.input`
  display: none;
`;
