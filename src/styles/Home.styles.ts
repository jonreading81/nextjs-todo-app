import styled from "styled-components";

export const container = styled.div`
  margin: 1rem;
`;

export const title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  display: block;
  margin-bottom: 1rem;
`;

export const formGroup = styled.div`
  display: flex;
  button {
    margin: 0 0.5rem;
  }
`;

export const button = styled.button`
  margin: 0;
  padding: 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: rgba(51, 51, 51, 0.05);
  border-radius: 0.5rem;
  border-width: 0;
  color: #333333;
`;

export const textInput = styled.input`
  padding: 10px;
`;

export const todo = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
