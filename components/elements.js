import { css } from '@emotion/react';

/* *************************** */
/*    Global Styles            */
/* *************************** */

export const globalStyleBody = (theme) => css`
  :root {
    /* --backgroundColor: #fff; */
    /* --backgroundColor: #eae9ee; */
    /* --backgroundColor: #dad3f4; */
    /* --backgroundColor: #6242e7; */
    --backgroundColor: #e9e7f1;
    /* --backgroundColor: #f2f2f2; */
    --fontColorDark: #0e081c;
    /* --fontColorParagraphAndLinks: #b6b6b6; */
    --fontColorParagraphAndLinks: #0e081c;

    --backGroundColorWhite: #fff;
    --fontColorWhite: #fff;
  }

  /* Reset sizing   */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Reset margin */
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    margin: 0;
  }

  p {
    color: var(--fontColorParagraphAndLinks);
  }
  /* set up the body */
  body {
    line-height: 1.5; /* default for browser: 1.4 tends to be very small*/
    font-size: ${theme.typography.medium};
    min-height: 100vh;
    max-width: 1200px;
    font-family: ${theme.font};
    background-color: var(--backgroundColor);

    /* border: 1px solid black; */
    margin: 0 auto;
    color: var(--fontColorDark);
  }

  /* make img easier to work with*/
  img {
    max-width: 100%; /* ensure that the img gets narrow when viewoprt shrinks*/
    display: block;
  }

  /* form elements should have same font as body */
  input,
  button,
  textarea,
  select {
    font: inherit;
    line-height: 1.5;
  }

  button {
    letter-spacing: 0.5px;
    text-transform: uppercase;
    font-weight: bold;
    display: block;
    min-height: 40px;
    /* padding: 10px 16px; */
    border: none;
  }
`;

/* *************************** */
/*    Utility Styles?          */
/* *************************** */

const flexCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const flexCenterColumn = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const marginCenter = {
  margin: '0 auto',
};

const size = (width = '100%', height = '100%') => {
  return { width, height };
};

const displayFlex = (
  display = 'flex',
  flexDirection = 'row',
  justifyContent = 'center',
  alignItems = 'center',
) => {
  return { display, flexDirection, justifyContent, alignItems };
};

/* +* Layout ** */
export const styleMain = css`
  /* border: 2px solid black; */
  display: flex;
  height: 80vh;
`;

/* *************************** */
/*            Header           */
/* *************************** */

export const headerStyle = css`
  /* max-width: 95%; */
  width: 100%;
  /* ${marginCenter} */
  /* position: fixed; */
  /* background-color: #fff; */
  /* background-color: #dad3f4; */
  ${marginCenter}
  margin: 1rem auto;
  border-radius: 15px;
  color: darkgray;

  nav {
    max-width: 95%;
    /* width: inherit; */
    ${marginCenter}
    /* margin: 0 auto; */
    gap: 18px;
    align-items: center;
    display: flex;
    height: 4rem;
    color: #43964f;
    justify-content: space-between;

    /* img {
      width: 80%;
      height: auto;
    } */

    div {
      ${flexCenter} gap: .5rem;
    }

    div:nth-of-type(1) {
      margin-left: 12rem;
    }

    div:nth-of-type(2) {
      margin-left: auto;

      div {
        border: 1px solid black;
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }

      a {
        text-decoration: none;
        display: block;
        font-weight: bold;
        /* background-color: #43964f; */
        /* background-color: #522d95; */
        letter-spacing: 0.5px;
        line-height: 18px;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 12px;
        min-height: 40px;
        padding: 10px 16px;
        /* width: 5rem; */
        text-align: center;
        /* color: #522d95; */
        color: var(--fontColorParagraphAndLinks);
        border: none;
        border-radius: 4px;
      }
    }
  }
`;

/* *************************** */
/*    Login and Register       */
/* *************************** */

export const flexCenterWithWidthAndHeight = css`
  ${flexCenter}
  width: 95%;
  height: 100vh;
  /* border: 10px solid red; */
  margin: 0 auto;

  /* background: linear-gradient(
    to right,
    #e1dee8 0%,
    #e1dee8 30%,
    #fff 51%,
    #fff 51%,
    #eae9ee 52% #eae9ee 100%
  ); */

  /* background: #fff; */
  /* background: linear-gradient(
    90deg,
    rgba(225, 222, 232, 1) 38%,
    rgba(230, 229, 234, 1) 38%,
    rgba(230, 229, 234, 1) 100%
  ); */

  section {
    ${flexCenter}
    width: 100%;
    height: 80%;
    border-radius: 1rem;
    /* border: 10px solid yellow; */
    -webkit-box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.16);
    box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.16);
    background-color: var(--backGroundColorWhite);

    p {
      color: grey;
    }

    a {
      text-decoration: none;
    }

    article:first-of-type {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 50%;
      height: 100%;
      padding: 1rem;
      background-color: #eae9ee;
      /* border-radius: 5% 0 0 5%; */
      margin: 0.2rem 0 0 0.2rem;
      border-radius: 1rem 0 0 1rem;

      h2 {
        text-align: left;
        font-size: 2rem;
      }
    }

    article:nth-of-type(2) {
      width: 50%;
      height: 100%;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
      align-items: center;
      background-color: #f5f5f5;
      /* border-radius: 0 5% 5% 0; */
      /* margin: 0.5rem 0.5rem 0.5rem 0; */
      border-radius: 0 1rem 1rem 0;

      form,
      button,
      label,
      div {
        width: 80%;
      }

      h2 {
        margin-top: 1.2rem;
        text-align: left;
        font-size: 2.8rem;
        width: 100%;
      }

      p {
        width: 100%;
      }

      form {
        ${flexCenterColumn}
        /* width: 60%; */

        div + div {
          margin-top: 2rem;
        }

        div {
          ${flexCenterColumn}
          /* margin-top: 1.2rem; */
          width: 100%;

          label {
            width: 100%;
            margin-bottom: 0.3rem;
            color: grey;
          }

          input {
            width: 100%;
            /* min-height: 25px; */
            min-height: 40px;
            border: none;
            background-color: #eae9ee;
            /* background-color: transparent; */

            /* border-bottom: 1px solid lightgray; */
            /* height: 3rem; */
          }
        }

        button {
          width: 100%;
          margin-top: 1.2rem;
          background-color: #30b565;
          border-radius: 4px;
          color: var(--fontColorWhite);
          font-weight: 400;
          font-size: 12px;
          margin: 1rem 0;
        }

        p {
          width: 100%;
          margin-top: 3rem;
        }
      }
    }
  }
`;

export const errorStyles = css`
  color: red;
`;

/* *************************** */
/*           Navigation        */
/* *************************** */
export const navigationStyle = css`
  ul {
    margin-top: 3rem;
    height: 100%;
    display: flex;
    gap: 2rem;
    flex-direction: column;
    justify-content: center;

    li {
      list-style: none;
      display: flex;
      gap: 0.8rem;

      a {
        text-decoration: none;
        color: var(--fontColorParagraphAndLinks);
      }
      a:link,
      a:visited,
      a:active {
        color: var(--fontColorParagraphAndLinks);
      }
    }
  }
`;

/* *************************** */
/*           Index           */
/* *************************** */

export const sectionOneLayout = css`
  min-width: 20%;
  min-height: 100%;
`;

export const sectionTwoLayout = css`
  min-width: 80%;

  /* background-color: #dad3f4; */
  /* background-color: #f2f7f5; */
  background-color: #e9e7f1;
  /* background-color: #d9dedb; */
  border: 3px solid var(--fontColorWhite);
  border-radius: 30px 0 20px 0;
  /* padding: 2rem; */
  /* margin: 0 0.5rem 0.5rem 0; */
  /* border-right: 2px solid #fff;
  border-bottom: 2px solid #fff; */
  padding: 1.5rem;
  /* -webkit-box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.16);
  box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.16); */
  h1 {
    margin: 0 0 1.5rem 0;
    font-size: 20px;
  }

  div {
    ${displayFlex()}
    /* border: 2px solid pink; */

    h2 {
      font-size: 16px;
    }

    article:nth-of-type(1) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-width: 30%;
      /* border: 1px solid pink; */
      width: 18rem;
      height: 24rem;
      border-radius: 20px;
      background-color: #fff;
    }

    article:nth-of-type(2) {
      width: 100%;
      /* width: 100%; */
      /* border: 1px solid red; */
      display: flex;
      /* flex-direction: column; */
      flex-wrap: wrap;
      gap: 1rem;
      align-items: center;
      justify-content: flex-end;

      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        /* gap: 1rem; */
        /* background-color: #f3f2f9; */
        background-color: var(--backGroundColorWhite);
        /* border-radius: 25px; */
        width: 18rem;
        height: 12rem;
        border-radius: 20px;
        padding: 1rem;

        /* box-shadow: 0 2px 21px 0 rgb(0 0 0 / 10%); */

        button {
          width: 100%;
          /* background-color: #43964f; */
          background-color: #30b565;
          font-size: 12px;
          font-weight: 400;
          border-radius: 5px;
          color: var(--fontColorWhite);
          min-height: 30px;
          margin: 0 1rem;
        }
      }
    }
  }
`;

/* *************************** */
/*   Profile / UserProfile     */
/* *************************** */

export const userProfileSectionTwoLayout = css`
  min-width: 80%;
  background-color: #e9e7f1;
  border: 3px solid var(--fontColorWhite);
  border-radius: 30px 0 20px 0;
  padding: 1.5rem;

  h1 {
    margin: 1.5rem 0 1.5rem 0;
  }

  div {
    /* ${displayFlex()} */
    ${displayFlex('flex', 'row', 'space-around', 'center')}

    h2 {
      font-size: 16px;
    }

    article:nth-of-type(1) {
      ${displayFlex('flex', 'column', 'center', 'flex-start')};
      min-width: 30%;
      width: 18rem;
      height: 26rem;
      border-radius: 20px;
      /* background-color: var(--backGroundColorWhite); */
      padding: 1rem;

      div {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border: 1px solid grey;
      }
    }

    article:nth-of-type(2) {
      width: 100%;
      ${displayFlex('flex', 'column', 'flex-end', 'center')};
      /* width: 100%; */
      /* border: 1px solid red; */
      /* flex-direction: column; */
      flex-wrap: wrap;
      gap: 1rem;

      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        /* gap: 1rem; */
        /* background-color: #f3f2f9; */
        background-color: var(--backGroundColorWhite);
        /* border-radius: 25px; */
        width: 18rem;
        height: 12rem;
        border-radius: 20px;
        padding: 1rem;

        /* box-shadow: 0 2px 21px 0 rgb(0 0 0 / 10%); */

        button {
          width: 100%;
          /* background-color: #43964f; */
          background-color: #30b565;
          font-size: 12px;
          font-weight: 400;
          border-radius: 5px;
          color: var(--fontColorWhite);
          min-height: 30px;
          margin: 1rem 0;
        }
      }
    }
  }
`;

/* *************************** */
/*          Documents          */
/* *************************** */

export const formStyleContainer = css`
  /* border: 1px solid red; */
  height: 80%;
  button {
    ${size('17.65rem', '1.47rem')}
    background-color: #ed943b;
    border: none;

    &:hover {
      background-color: #ff6900;
    }
  }
`;

export const formStyle = css`
  ${displayFlex('flex', 'column', 'space-between', 'center')}
  gap: 1rem;
  margin-top: 4rem;

  section {
    width: 90%;
    background-color: #eae9ee;
    padding: 1rem;
    border-radius: 20px;
    border: 5px solid var(--backGroundColorWhite);
    margin: 0 auto;
  }

  p,
  label,
  input {
    margin-bottom: 16px;
  }

  input,
  select {
    width: 100%;
    height: 40px;
    border: none;
  }
`;

export const flexStyle = css`
  display: flex;
  gap: 16px;

  p {
    width: 50%;
  }
`;

/* *************************** */
/*             Uploads         */
/* *************************** */

export const uploadformStyle = css`
  ${displayFlex('flex', 'column', 'space-between', 'center')}
  gap: 1rem;
  margin-top: 4rem;
  width: 100%;

  section {
    width: 70%;
    background-color: #eae9ee;
    padding: 1rem;
    border-radius: 20px;
    border: 5px solid var(--backGroundColorWhite);
    margin: 0 auto;

    div {
      margin-bottom: 2.5rem;
    }
  }

  p,
  label,
  input {
    margin-bottom: 0;
  }

  input,
  select {
    width: 100%;
    height: 40px;
    border: none;
  }
`;
