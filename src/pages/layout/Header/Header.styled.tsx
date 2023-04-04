import styled from 'styled-components';

const Wrapper = styled.div`
  /* border-bottom: 1px solid #2e2e2e; */

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  a {
    text-decoration: unset;
  }

  .rowLink {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .networkText {
    cursor: pointer;

    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 26px;
    margin-right: 16px;

    color: #898989;

    :hover {
      opacity: 0.7;
    }
  }

  .iconContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
  }

  .icon {
    width: 18px;
    height: 18px;
    cursor: pointer;

    :hover {
      opacity: 0.8;
    }
  }
`;

export { Wrapper };
