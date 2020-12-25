import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 20px 50px;

  > div {
    position: relative;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

    svg {
      position: absolute;
      top: 13px;
      right: 10px;
      cursor: pointer;
    }

    input {
      z-index: 9999;
      padding: 15px 40px 15px 20px;
      width: 100%;
      color: var(--grey3);
      border-radius: 5px;

      &::placeholder {
        color: var(--grey2);
      }
    }

    section {
      position: absolute;
      z-index: 1;
      width: 100%;
      margin-top: -10px;
      padding: 15px 20px;
      background: var(--white1);
      border-radius: 5px;

      ul li {
        color: var(--grey2);
        padding: 5px 0;
        transition: color 0.5s ease;
        cursor: pointer;

        &:hover {
          color: var(--grey3);
        }
      }
    }
  }
`;