import React, { memo, useCallback, useRef } from 'react';
import styled from 'styled-components';

export const Button = memo(
  ({
    size = 'medium',
    width = '100%',
    buttonType = 'contained',
    variant = 'primary',
    onClick,
    throttleTime = 1000,
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

    return buttonType === 'contained' ? (
      <ContainedButton
        $width={width}
        $size={size}
        $variant={variant}
        onClick={handleOnClick}
        {...props}
      >
        {children}
      </ContainedButton>
    ) : (
      <OutlinedButton
        $width={width}
        $size={size}
        $variant={variant}
        onClick={handleOnClick}
        {...props}
      >
        {children}
      </OutlinedButton>
    );
  },
);

const buttonSize = {
  small: '4px 10px',
  medium: '6px 16px',
  large: '8px 22px',
};

const BaseButton = styled.button`
  width: ${(props) => props.$width};
  padding: ${(props) => buttonSize[props.$size]};
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: rgba(0, 0, 0, 0.12);
    color: rgba(0, 0, 0, 0.38);
    cursor: not-allowed;
  }
`;

const containedColor = {
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
};

const ContainedButton = styled(BaseButton)`
  color: #ffffff;
  background-color: ${(props) => containedColor[props.$variant].enabled};
  border: 1px solid ${(props) => containedColor[props.$variant].enabled};

  &:hover {
    background-color: ${(props) => containedColor[props.$variant].hover};
  }

  &:active {
    background-color: ${(props) => containedColor[props.$variant].active};
  }

  &:disabled,
  &:hover:disabled {
    border: 1px solid rgba(0, 0, 0, 0.38);
    background-color: rgba(0, 0, 0, 0.12);
  }
`;

const outlinedColor = {
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
};

const OutlinedButton = styled(BaseButton)`
  background-color: ${(props) => outlinedColor[props.$variant].enabled};
  border: 1px solid ${(props) => containedColor[props.$variant].enabled};

  &:hover {
    background-color: ${(props) => outlinedColor[props.$variant].hover};
  }

  &:active {
    background-color: ${(props) => outlinedColor[props.$variant].active};
  }

  &:disabled,
  &:hover:disabled {
    border: 1px solid rgba(0, 0, 0, 0.38);
    background-color: rgba(0, 0, 0, 0.12);
  }
`;
