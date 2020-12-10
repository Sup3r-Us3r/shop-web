import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-areas: 'menuBar mainContent';
  grid-template-columns: 70px 1fr;

  height: 100vh;
`;

export const Wrapper = styled.main`
  grid-area: mainContent;

  background: var(--white1);
`;

export const Search = styled.div`
  position: relative;
  padding: 20px 50px;

  svg {
    position: absolute;
    top: 32px;
    left: 60px;
  }

  input {
    padding: 15px 20px 15px 40px;
    width: 100%;
    color: var(--grey3);
    border-radius: 20px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

    &::placeholder {
      color: var(--grey2);
    }
  }
`;

export const GridItemsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  /* grid-template-columns: repeat(auto-fit, 300px); */
  justify-content: flex-start;
  align-items: center;
  gap: 30px;

  padding: 20px 50px;

  div {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    position: relative;
    height: 160px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.05);

    img {
      height: 100%;
      width: 100px;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }

    div {
      display: block;

      background: var(--white1);
      padding: 10px;
      height: 100%;
      width: 100%;

      h1 {
        font-size: 20px;
        color: var(--grey3);
        margin-bottom: 10px;
      }

      p {
        color: var(--grey1);
        font-size: 16px;
        min-height: 50px;
        max-height: 60px;
        overflow-y: auto;
        -ms-overflow-style: none;
        scrollbar-width: none;

        &::-webkit-scrollbar {
          display: none;
        }
      }

      section {
        display: inline-flex;

        position: absolute;
        bottom: 10px;
        right: 15px;

        button {
          display: flex;
          justify-content: flex-end;
          align-items: center;
  
          background: transparent;
          border-radius: 10px;
          margin-left: 10px;
          cursor: pointer;
  
          span {
            margin-left: 5px;
          }

          &:nth-child(1) {
            svg {
              transition: fill 0.5s;
            }

            span {
              color: var(--blue);
              transition: color 0.5s;
            }

            &:hover {
              svg {
                fill: var(--blue-hover);
              }

              span {
                color: var(--blue-hover);
              }
            }
          }

          &:nth-child(2) {
            svg {
              transition: fill 0.5s;
            }

            span {
              color: var(--red);
              transition: color 0.5s;
            }

            &:hover {
              svg {
                fill: var(--red-hover);
              }
              
              span {
                color: var(--red-hover);
              }
            }
          }
        }
      }
    }
  }
`;
