import styled, { css } from 'styled-components';

type Props = {
  flex?: number;
  centered?: boolean;
};

export const Row = styled.div`
  display: flex;
  flex-grow: 1;
`;

const centeredCss = css`
  justify-content: center;
  align-items: center;
`;

export const Column = styled.div<Props>`
  display: flex;
  flex-direction: column;
  flex: ${({ flex }) => flex || 'unset'};
  ${({ centered }) => centered && centeredCss};
`;
