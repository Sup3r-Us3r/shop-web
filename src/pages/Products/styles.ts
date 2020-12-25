import styled from 'styled-components';

export const Grid = styled.div`
  /* display: grid;
  grid-template-areas: 'menuBar mainContent';
  grid-template-columns: 70px 1fr; */

  display: flex;
  justify-content: space-between;

  height: 100vh;
`;

export const Wrapper = styled.main`
  /* grid-area: mainContent; */
  width: calc(100% - 70px);
  margin-left: 70px;

  background: var(--white1);
`;

interface ITabsMenuProps {
  activeButtonCategory: number;
}

export const TabsMenu = styled.div`
  display: flex;
  flex-wrap: wrap;

  width: 100%;
  padding: 0 50px;
  background: var(--white2);

  button:nth-child(
    ${({activeButtonCategory}: ITabsMenuProps) => activeButtonCategory}
  ) {
    color: var(--grey3);
    border-bottom: 2px solid var(--green1);
  }

  button {
    color: var(--grey1);
    font-weight: bold;
    padding: 8px 0;
    background: transparent;
    border-bottom: 2px solid transparent;
    transition: color 0.5s ease, border-bottom 0.5s ease;
    cursor: pointer;

    &:not(:last-child) {
      margin-right: 15px;
    }
  }
`;

export const TableItemsList = styled.div`
  width: auto;
  margin: 30px 50px;
  overflow-x: auto;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

  /* Custom scroll height and width */
  ::-webkit-scrollbar {
    height: 5px;
    width: 5px;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    tbody {
      background: var(--white1);

      tr {
        border-bottom: 1px solid var(--grey2-hover);
        transition: background .5s;

        &:last-child {
          border-bottom: 1.5px solid transparent;
        }

        &:hover {
          background: var(--white2);
        }

        td {
          text-align: left;
          white-space: nowrap;
          overflow: auto;
          padding: 10px 20px;
        }
      }

      tr td:nth-child(1) {
        svg {
          cursor: pointer;
        }
      }

      tr td:nth-child(2) {
        div {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          pointer-events: none;

          img {
            height: 50px;
            width: 50px;
            border-radius: ${50 / 2}px;
            user-select: none;
          }

          div {
            display: block;
            margin-left: 10px;

            h1 {
              font-size: 16px;
              color: var(--grey3);
              line-height: 15px;
            }

            span {
              font-size: 13px;
              color: var(--grey2);
            }
          }
        }
      }

      tr td:nth-child(3) {
        p {
          color: var(--grey2);
        }
      }

      tr td:nth-child(4) {
        strong {
          color: var(--grey3);
        }

        span {
          margin-left: 5px;
          color: var(--grey2);
        }
      }

      tr td:nth-child(5) {
        div {
          display: flex;
          justify-content: center;
          align-items: center;

          span {
            margin-left: 5px;
            color: var(--grey2);
          }
        }
      }

      tr td:nth-child(6) {
        button {
          height: 25px;
          width: 80px;
          font-size: 10px;
          font-weight: bold;
          text-transform: uppercase;
          border-radius: ${(25 / 2) + (70 / 2)}px;
          cursor: pointer;
        }

        button:nth-child(1) {
          margin-right: 5px;
          color: var(--blue);
          background: #e0e9ff;
        }

        button:nth-child(2) {
          color: var(--red);
          background: #ffeaea;
        }
      }
    }
  }
`;
