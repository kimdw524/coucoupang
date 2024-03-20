/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { ReactNode } from 'react';

interface ButtonGroupProps extends React.ComponentProps<'div'> {
  vertical?: boolean;
  separatorColor?: string;
  children?: ReactNode;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  vertical = false,
  separatorColor = '',
  style,
  ...props
}: ButtonGroupProps) => {
  return (
    <div style={{ ...style }} css={buttonGroupStyle(vertical, separatorColor)} {...props}>
      {props.children}
    </div>
  );
};

const buttonGroupStyle = (vertical: boolean, separatorColor: string) => css`
  display: flex;

  ${vertical
    ? css`
        flex-direction: column;
        button:first-child {
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
          ${separatorColor &&
          css`
            border-bottom-color: ${separatorColor};
          `}
          :hover {
            z-index: 2;
          }
        }
        button:last-child {
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          ${separatorColor &&
          css`
            border-top-color: ${separatorColor};
          `}
          margin-top: -1px;
          :hover {
            z-index: 2;
          }
        }
        button:not(:first-child):not(:last-child) {
          border-radius: 0;
          margin-top: -1px;
          ${separatorColor &&
          css`
            border-top-color: ${separatorColor};
          `}
          :hover {
            z-index: 2;
          }
        }
      `
    : css`
        flex-direction: row;
        button:first-child {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
        button:last-child {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          border-left-color: transparent;
        }
        button:not(:first-child):not(:last-child) {
          border-radius: 0;
          border-left-color: transparent;
        }
      `}
`;

export default ButtonGroup;