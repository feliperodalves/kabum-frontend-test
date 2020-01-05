import styled from 'styled-components';

export const Container = styled.div``;

export const Filter = styled.input`
  width: 100%;

  border: 0;
  border-radius: 23px;
  margin-bottom: 15px;
  padding: 15px 23px;

  color: #333;
  font-size: 14px;
  line-height: 16px;
`;

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  list-style: none;
`;
