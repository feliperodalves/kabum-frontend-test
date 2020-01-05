import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  padding: 30px;
  background: #fff;
  border-radius: 4px;

  > section {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;

    > img {
      align-self: center;
      max-width: 250px;
    }

    > div {
      padding-left: 15px;

      > span {
        font-size: 12px;
      }
      > p {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
      }
    }
  }
  button {
    background: #fc6b0f;
    color: #fff;
    border: 0;
    border-radius: 4px;
    overflow: hidden;
    margin-top: auto;

    display: flex;
    align-items: center;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.05, '#fc6b0f')};
    }

    div {
      display: flex;
      align-items: center;
      padding: 12px;
      background: rgba(0, 0, 0, 0.1);

      svg {
        margin-right: 5px;
      }
    }
    span {
      flex: 1;
      text-align: center;
      font-weight: bold;
      margin: 0 15px;
    }
  }
`;
