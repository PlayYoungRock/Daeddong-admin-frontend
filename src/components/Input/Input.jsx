import React from 'react';
import styled from 'styled-components';

export const Input = ({ width = '100%', height = 32, ...props }) => {
  return <StyledInput {...props} $width={width} />;
};

const StyledInput = styled.input`
  border: none;
  outline: none;
  padding: 8px;
  font-size: 16px;
  border-bottom: 1px solid #ccc;

  width: ${(props) =>
    Number.isInteger(props.$width)
      ? `${props.$width - 16}px`
      : `calc(${props.$width} - 16px)`};
  height: ${(props) =>
    Number.isInteger(props.$height) ? `${props.$height}px` : props.$height};
`;
