import React, { memo, useCallback, useRef } from 'react';
import { styled } from 'styled-components';

export const Button = memo(
  ({
    buttonType = 'contained',
    variant = 'primary',
    size = 'medium',
    block = false,
    throttleTime = 3000,
    onClick,
    css,
    children,
    ...props
  }) => {
    const throttle = useRef(false);

    const handleOnClick = useCallback(() => {
      if (throttle.current || !onClick) return;

      throttle.current = true;
      onClick();

      setTimeout(() => {
        throttle.current = false;
      }, throttleTime);
    }, [onClick, throttleTime]);

    return (
      <ButtonWrapper
        {...props}
        $buttonType={buttonType}
        $variant={variant}
        $size={size}
        $isBlock={block}
        $css={css}
        onClick={handleOnClick}
      >
        {children}
      </ButtonWrapper>
    );
  },
);

const BUTTON_SIZE = {
  small: '4px 10px',
  medium: '6px 16px',
  large: '8px 22px',
};

const COLOR_TABLE = {
  contained: {
    primary: {
      enabled: '#2196F3',
      hover: '#1A78C2',
      active: '#1769AA',
    },
    error: {
      enabled: '#D32F2F',
      hover: '#A82525',
      active: '#932020',
    },
  },
  outlined: {
    primary: {
      enabled: '#ffffff',
      hover: '#D2EAFC',
      active: '#E8F4FD',
    },
    error: {
      enabled: '#ffffff',
      hover: '#F6D5D5',
      active: '#FAEAEA',
    },
  },
};

const ButtonWrapper = styled.button`
  border-radius: 5px;
  cursor: pointer;

  width: ${({ $isBlock }) => ($isBlock ? '100%' : 'auto')};
  padding: ${({ $size }) => BUTTON_SIZE[$size]};

  background-color: ${({ $buttonType, $variant }) =>
    COLOR_TABLE[$buttonType][$variant].enabled};

  &:hover {
    background-color: ${({ $buttonType, $variant }) =>
      COLOR_TABLE[$buttonType][$variant].hover};
  }

  &:active {
    background-color: ${({ $buttonType, $variant }) =>
      COLOR_TABLE[$buttonType][$variant].active};
  }

  &:disabled {
    background-color: rgba(0, 0, 0, 0.12);
    color: rgba(0, 0, 0, 0.38);
    cursor: not-allowed;
  }

  border: ${({ $buttonType, $variant }) =>
    $buttonType === 'contained'
      ? 'none'
      : `1px solid ${COLOR_TABLE.contained[$variant].enabled}}`};

  color: ${({ $buttonType }) =>
    $buttonType === 'contained' ? '#ffffff' : 'black'};

  ${({ $css }) => $css};
`;
