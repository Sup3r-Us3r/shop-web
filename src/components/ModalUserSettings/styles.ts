import styled, {keyframes} from 'styled-components';

const loadingAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  z-index: 10;
  height: 100vh;
  background: rgba(0, 0, 0, .1);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  > div {
    position: relative;
    padding: 20px;
    background: var(--white1);
    border-top: 3px solid var(--green1);
    border-bottom: 3px solid var(--green1);
    border-radius: 5px;
    max-width: 500px;
    min-width: 300px;

    > h1 {
      color: var(--grey3);
      font-size: 16px;
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 20px;
    }

    > svg {
      position: absolute;
      top: 10px;
      right: 10px;
      transition: fill .5s ease;
      cursor: pointer;

      &:hover {
        fill: var(--green2);
      }
    }

    > form {
      display: flex;
      flex-direction: column;

      background: var(--white1);
      max-width: 500px;

      img {
        height: 150px;
        width: 150px;
        margin: 0 auto;
        border-radius: ${150 / 2}px;
        user-select: none;
        object-fit: cover;
      }

      input {
        padding: 10px;
        border-bottom: 2px solid var(--grey1);
        color: var(--grey1);
        background: var(--white1);
        transition: border .5s ease;

        &::placeholder {
          color: var(--grey1);
        }

        &:focus {
          border-bottom: 2px solid var(--green1);
        }
      }

      input[type="file"] {
        display: none;
      }

      label {
        position: absolute;
        top: 185px;
        right: 70px;
        cursor: pointer;

        svg {
          transition: fill .5s ease;

          &:hover {
            fill: var(--green2);
          }
        }
      }

      button {
        margin-top: 10px;
        height: 50px;
        padding: 0 20px;
        background: var(--green1);
        color: var(--white1);
        font-weight: bold;
        transition: background .5s ease;

        &:hover {
          background: var(--green2);
          cursor: pointer;
        }

        &:disabled {
          cursor: not-allowed;
        }

        &:disabled:hover {
          background: var(--green1);
        }

        &.submitting {
          svg {
            animation: ${loadingAnimation} .8s linear infinite;
          }
        }
      }
    }
  }
`;
