import styled from 'styled-components';

export const Wrapper = styled.aside`
  grid-area: menuBar;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  position: fixed;
  height: 100vh;

  padding: 30px 0;
  background: var(--grey3);

  nav ul {
    li:nth-child(1) {
      a img {
        height: 40px;
        width: 40px;
        border-radius: ${40 / 2}px;
        pointer-events: none;
      }
    }

    li {
      transition: background .5s ease;

      a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        height: 70px;
        width: 70px;

        &.active{
          svg {
            stroke: var(--green1) !important;
            fill: var(--green1) !important;
          }
        }
      }

      &:hover:not(:nth-child(1)) {
        a svg {
          stroke: var(--green1);
          fill: var(--green1);
        }

        background: var(--grey3-hover);
        cursor: pointer;
      }
    }
  }
`;
