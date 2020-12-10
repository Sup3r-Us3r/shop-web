import styled from 'styled-components';

export const Wrapper = styled.header`
  display: flex;
  flex-direction: column;

  padding: 20px 50px;
  background: var(--white2);

  section:nth-child(1) {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    i {
      display: flex;
      justify-content: center;
      align-items: center;

      position: relative;

      &::after {
        content: '';
        position: absolute;
        height: 8px;
        width: 8px;
        right: 1px;
        top: -3px;
        background: var(--green1);
        border-radius: ${8 / 2}px;
      }

      &:hover {
        cursor: pointer;

        svg {
          stroke: var(--grey2-hover);
        }
      }
    }
    
    img {
      margin-left: 20px;
      height: 30px;
      width: 30px;
      border-radius: ${30 / 2}px;
      pointer-events: none;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
  }

  section:nth-child(2) {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 30px 0;

    p {
      font-size: 40px;
      color: var(--grey3);
    }

    /* Button from children */
    button {
      padding: 10px 20px;
      background: var(--green1);
      font-weight: bold;
      color: var(--white1);
      border-radius: 5px;
      transition: background .5s ease;

      &:hover {
        background: var(--green2);
        cursor: pointer;
      }
    }
  }
`;