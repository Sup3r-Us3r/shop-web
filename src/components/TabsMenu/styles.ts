import styled from 'styled-components';

export const TabsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  width: 100%;
  padding: 30px 50px;
  background: var(--white2);

  input {
    display: none;
  }

  label {
    padding: 5px 10px;
    text-align: center;
    color: var(--grey1);
    border-bottom: 2px solid transparent;
    cursor: pointer;
  }

  div {
    order: 1;
    width: 100%;
    padding-bottom: 30px;
    display: none;
  }

  input:checked + label {
    background: #7159c1;
    color: var(--grey3);
    border-bottom: 2px solid var(--green1);
  }

  input:checked + label + div {
    display: block;
  }
`;
