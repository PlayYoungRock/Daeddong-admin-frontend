import React, { memo } from 'react';
import styled from 'styled-components';

export const Text = memo(
  ({
    size = '16px',
    color = '#111',
    fontWeight = 500,
    lineHeight = 20,
    ...props
  }) => {
    return (
      <StyledText
        $size={size}
        $color={color}
        $fontWeight={fontWeight}
        $lineHeight={lineHeight}
        {...props}
      >
        {props.children}
      </StyledText>
    );
  },
);

const StyledText = styled.span`
  font-size: ${(props) =>
    Number.isInteger(props.$size) ? `${props.$size}px` : props.$size};
  color: ${(props) => props.$color};
  font-weight: ${(props) => props.$fontWeight};
  line-height: ${(props) =>
    Number.isInteger(props.$lineHeight)
      ? `${props.$lineHeight}px`
      : props.$lineHeight};
`;
