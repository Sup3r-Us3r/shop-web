import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  z-index: 9999;
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

    h1 {
      color: var(--grey3);
      font-size: 16px;
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 20px;
    }

    svg {
      position: absolute;
      top: 10px;
      right: 10px;
      transition: fill .5s ease;
      cursor: pointer;

      &:hover {
        fill: var(--green2);
      }
    }

    form {
      display: flex;
      flex-direction: column;
      justify-content: center;

      > div:nth-child(1) {
        display: inline-flex;
        margin-bottom: 5px;

        input {
          padding: 10px;
          border: 2px solid var(--grey1);
          border-radius: 5px;
          color: var(--grey3);
          transition: border .5s ease;

          &::placeholder {
            color: var(--grey1);
          }

          &:focus {
            border: 2px solid var(--green1);
          }
        }

        input:nth-child(1) {
          width: 70%;
          margin-right: 5px;
        }

        input:nth-child(2) {
          width: 30%;
        }
      }

      > div:nth-child(2) {
        display: inline-flex;
        margin-bottom: 5px;

        select {
          width: 70%;
          background: var(--white1);
          padding: 10px 7px;
          margin-right: 5px;
          border: 2px solid var(--grey1);
          border-radius: 5px;
          color: var(--grey1);
          transition: border .5s ease;

          &:focus {
            border: 2px solid var(--green1);
          }
        }

        input {
          width: 30%;
          padding: 10px;
          border: 2px solid var(--grey1);
          border-radius: 5px;
          transition: border .5s ease;

          &::placeholder {
            color: var(--grey1);
          }

          &:focus {
            border: 2px solid var(--green1);
          }
        }
      }

      > div:nth-child(3) {
        margin-bottom: 5px;

        textarea {
          font-family: 'Roboto';
          font-size: 15px;
          height: 100px;
          width: 100%;
          padding: 10px;
          resize: none;
          color: var(--grey3);
          background: var(--white1);;
          border: 2px solid var(--grey1);
          border-radius: 5px;
          transition: border .5s ease;

          &::placeholder {
            color: var(--grey1);
          }

          &:focus {
            border: 2px solid var(--green1);
          }
        }
      }

      > div:nth-child(4) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        > div:nth-child(1) {
          display: flex;
          justify-content: center;
          align-items: center;

          width: 100%;
          background: var(--white2);
          border: 2px dashed var(--green1);
          border-radius: 5px;

          input {
            display: none;
          }

          label {
            width: 100%;
            padding: 10px;
            color: var(--green1);
            text-align: center;
            cursor: pointer;
          }
        }
      }

      > div:nth-child(5) {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        padding: 10px 0 5px 0;
        overflow-x: auto;

        /* Custom scroll height, width and color */
        ::-webkit-scrollbar {
          height: 5px;
          width: 5px;
        }

        ::-webkit-scrollbar-thumb {
          background: var(--grey1);
        }

        div {
          position: relative;

          img {
            height: 150px;
            width: 100px;
            border-radius: 5px;
            object-fit: cover;

            &:not(:last-child) {
              margin-right: 10px;
            }
          }

          svg {
            position: absolute;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 5px;
            top: 5px;
            right: 15px;
            transition: background .5s ease;
            cursor: pointer;

            &:hover {
              fill: var(--red-hover);
              background: rgba(255, 255, 255, 0.8);;
            }
          }
        }
      }

      button {
        margin-top: 10px;
        padding: 20px;
        background: var(--green1);
        color: var(--white1);
        font-weight: bold;
        transition: background .5s ease;

        &:hover {
          background: var(--green2);
          cursor: pointer;
        }
      }
    }
  }
`;
