import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  z-index: 10;

  > div {
    display: flex;
    flex-direction: column;

    max-width: 350px;
    padding: 20px;
    background: var(--white1);
    border-radius: 5px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

    p:nth-child(1) {
      color: var(--grey3);
      font-size: 16px;
      text-transform: uppercase;
      margin-bottom: 5px;
    }

    p:nth-child(2) {
      color: var(--grey1);
      font-size: 15px;
      margin-bottom: 20px;
    }

    button {
      padding: 10px;
      border-radius: 5px;
      color: var(--white1);
      font-weight: bold;
      cursor: pointer;
      transition: background .5s ease;

      &:not(:last-child) {
        margin-bottom: 5px;
      }
    }

    button:nth-child(3) {
      background: var(--green1);

      &:hover {
        background: var(--green2);
      }
    }

    button:nth-child(4) {
      background: var(--grey2);

      &:hover {
        background: var(--grey1);
      }
    }
  }
`;
