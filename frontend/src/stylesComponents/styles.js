import styled, { css } from "styled-components";

export const CircelButton = styled.button`
  outline: none;
  border: 2px solid white;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  transition: all 200ms;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;

  ${({ outline, color }) => {
    if (outline) {
      return css`
        border: 2px solid ${color};
        color: ${color};
        background-color: transparent;
      `;
    } else {
      return css`
        background-color: ${color};
        color: white;
      `;
    }
  }}

  ${({ rounded }) => {
    if (rounded) {
      return css`
        border-radius: 2rem;
      `;
    } else {
      return css`
        border-radius: 1rem;
      `;
    }
  }}


${({ color }) => {
    return css`
      &:hover,
      &:focus {
        box-shadow: 0 0 0 2px ${color};
      }
    `;
  }}
`;

export const DateChip = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-size: 11px;
  font-weight: 600;
  border: 2px solid white;

  ${({ due, complete }) => {
    if (complete) {
      return css`
        background-color: #63c05b;
        color: white;
      `;
    } else if (due) {
      return css`
        background-color: #cf3636;
        color: white;
      `;
    } else {
      return css`
        background-color: #dbdbdb;
        color: #5a5a5a;
      `;
    }
  }}
`;

export const SmallBtn = styled.button`
  background-color: #eeecec;
  color: #767575;
  transition: all 200ms;
  border: 2px solid white;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;

  &:hover,
  &:focus {
    box-shadow: 0 0 0 2px #767575;
  }
`;

export const IconButton = styled.button`
  display: flex;
  border: 0;
  outline: none;
  background-color: transparent;
  transition: all 200ms;
  border-radius: 0.5rem;

  &:hover {
    background-color: #eeecec;
  }
`;

export const PriorityChip = styled.div`
  border-radius: 0.75rem;
  padding: 0.5rem 0.75rem;
  transition: all 200ms;
  border: 2px solid white;
  cursor: pointer;
  ${({ select }) => {
    if (select) {
      return css`
        background-color: #e2e2e2;
      `;
    } else {
      return css`
        border: 2px solid #e2e2e2;
      `;
    }
  }}

  &:hover, &:focus {
    box-shadow: 0 0 0 2px #767575;
  }
`;
