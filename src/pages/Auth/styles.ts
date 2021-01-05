import styled, {keyframes} from 'styled-components';

import linesImg from '../../assets/images/lines.png';

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
  justify-content: space-between;
  align-items: center;

  height: 100vh;
  background: var(--grey2);

  section:nth-child(1) {
    height: 100vh;
    width: 50%;
    overflow: hidden;
    background: url(${linesImg}) repeat top left var(--green1);
    background-size: cover;

    @media (max-width: 600px) {
      display: none;
    }
  }

  section:nth-child(2) {
    height: 100vh;
    width: 50%;

    @media (max-width: 600px) {
      width: 100%;
    }

    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      height: 100%;
      width: 100%;
      background: var(--white1);

      > img {
        height: 210px;
        width: 210px;
        margin: 0 auto;
        user-select: none;
      }

      div {
        margin: 30px auto;

        img {
          height: 210px;
          width: 210px;
          margin: 0 auto;
          border-radius: ${210 / 2}px;
          user-select: none;
          object-fit: cover;
        }

        input[type="file"] {
          display: none;
        }

        label {
          cursor: pointer;

          svg {
            transition: fill .5s ease;

            &:hover {
              fill: var(--green2);
            }
          }
        }
      }

      input {
        padding: 10px;
        border-bottom: 2px solid var(--grey1);
        color: var(--grey1);
        background: var(--white1);
        transition: border .5s ease;
        width: 70%;

        &::placeholder {
          color: var(--grey1);
        }

        &:focus {
          border-bottom: 2px solid var(--green1);
        }

        &:not(:last-child) {
          margin-bottom: 5px;
        }
      }

      button[type="submit"] {
        margin-top: 10px;
        height: 50px;
        padding: 0 20px;
        background: var(--green1);
        color: var(--white1);
        width: 70%;
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

      button[type="button"] {
        align-self: flex-end;
        margin-right: 15%;
        margin-top: 10px;
        color: var(--grey1);
        background: var(--white1);
        font-weight: bold;
        transition: color .5s ease;

        &:hover {
          color: var(--grey2);
          cursor: pointer;
        }
      }
    }
  }
`;
