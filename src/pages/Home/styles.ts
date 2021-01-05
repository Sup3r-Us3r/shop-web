import styled from 'styled-components';

export const Grid = styled.div`
  display: flex;
  justify-content: space-between;

  height: 100vh;
`;

export const Wrapper = styled.main`
  width: calc(100% - 70px);
  margin-left: 70px;
  background: var(--white1);
`;

export const GridItemsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  /* grid-template-columns: repeat(auto-fit, 300px); */
  justify-content: flex-start;
  align-items: center;
  gap: 30px;

  padding: 20px 50px;

  > div {
    display: grid;
    grid-template-areas:  'image title'
                          'image description'
                          'image action';
    grid-template-columns: 100px 1fr;
    grid-template-rows: 30px 1fr 30px;

    height: 160px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.05);

    img {
      grid-area: image;

      height: 100%;
      width: 100px;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      object-fit: cover;
      user-select: none;
    }

    h1 {
      grid-area: title;

      font-size: 20px;
      color: var(--grey3);
      margin: 0 0 10px 10px;
    }

    p {
      grid-area: description;

      color: var(--grey1);
      padding: 5px 0;
      font-size: 16px;
      margin: 0 0 10px 10px;
      overflow-y: auto;
      -ms-overflow-style: none;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        width: 3px;
      }
    }

    button {
      grid-area: action;
      
      text-align: right;
      padding-right: 10px;
      background: var(--white1);
      cursor: pointer;
    }
  }
`;
