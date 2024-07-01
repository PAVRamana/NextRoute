import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px 25px 0px 12px;
  .MuiCardContent-root {
    padding: 0;
  }
  .top-section {
    display: flex;
    gap: 20px;
    > div {
      border: 1px solid #cecccc;
      padding: 10px;
      border-radius: 5px;
      height: 50px;
      width: 100px;
      cursor: pointer;
    }
  }
  .MuiCardActions-spacing {
    display: block;
  }
  .btn-container {
    display: flex;
    justify-content: space-between;
    padding: 5px;
  }
  .last-container {
    display: flex;
    gap: 10px;
  }
  .divider___max-x {
    border: 1px solid #ececec;
    width: 100%;
  }

  .progress {
    display: flex;
    height: 100%;
    border: 1px solid #d6d6d6;
    margin: 0 0 1em;
    padding: 0;
    cursor: pointer;
  }

  .progress > li {
    width: 100% !important;
    height: 100% !important;
    border-radius: 0 !important;
    list-style: none;
    font-size: 14px;
    background-color: #f4f6f8;
    position: relative;
  }

  .progress > li:last-child {
    border-right: 0;
  }

  .progress > li.completed {
    background-color: #3a765a;
    color: #fff !important;
  }

  .progress > li:not(.completed) {
    padding-left: 20px;
  }

  .progress > li span {
    position: relative;
    margin-left: 20px;
  }

  .progress > li span .order {
    display: inline-block;
    border: 2px solid #555;
    border-radius: 27px;
    width: 27px;
    height: 27px;
    background-color: #fff;
    color: #555;
    margin: 0 5px 0 10px;
    font-weight: bold;
    text-align: center;
    position: relative;
    top: -1px;
    line-height: 25px;
  }

  .diagonal {
    width: 0;
    height: 0;
    border-top: 38px solid transparent;
    border-bottom: 38px solid transparent;
    border-left: 15px solid #f4f6f8;
    top: 0;
    right: 0;
    position: absolute;
    transform: translateX(100%);
    z-index: 1;
  }
  .completed .diagonal {
    border-left-color: #3a765a;
  }
  .incompleted {
    opacity: 1;
  }
  .content {
    display: grid;
    gap: 8px;
    padding: 10px 5px;
    text-align: start;
  }
  .addi {
    border-right: 1px solid #d6d6d6;
    border-radius: 0 20px 20px 0;
  }
`;
