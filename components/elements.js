import { css } from '@emotion/react';

/* *************************** */
/*    Global Styles            */
/* *************************** */

export const globalStyleBody = (theme) => css`
  :root {
    /* --backgroundColor: #fff; */
    /* --backgroundColor: #eae9ee; */
    --backgroundColor: #dad3f4;
    /* --backgroundColor: #6242e7; */
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
    color: #000;
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
    margin: 1rem 0;
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

/* *************************** */
/*   Header: Navigation Bar    */
/* *************************** */

export const headerStyle = css`
  /* max-width: 95%; */
  width: 100%;
  /* ${marginCenter} */
  /* position: fixed; */
  background-color: #fff;
  ${marginCenter}
  margin: 1rem auto;

  nav {
    max-width: 95%;
    width: inherit;
    ${marginCenter}
    /* margin: 0 auto; */
    gap: 20px;
    align-items: center;
    display: flex;
    height: 4rem;
    color: #43964f;
    justify-content: space-around;

    img {
      width: 80%;
      height: auto;
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
      color: #522d95;
      border: none;
      border-radius: 4px;
    }

    a:first-of-type {
      margin-left: auto;

      &:hover {
        border-bottom: 3px solid red;
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
    background-color: #fff;

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
      gap: 5rem;
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

        div {
          ${flexCenterColumn}
          margin-top: 1.2rem;
          width: 100%;

          label {
            width: 100%;
            margin-bottom: 0.3rem;
            color: grey;
          }

          input {
            width: 100%;
            min-height: 40px;
            border: none;
            background-color: #eae9ee;

            /* height: 3rem; */
          }
        }

        button {
          width: 100%;
          margin-top: 1.2rem;
          background-color: #30b565;
          border-radius: 4px;
          color: #fff;
          font-weight: 400;
          font-size: 12px;
        }

        p {
          width: 100%;
          margin-top: 3rem;
        }
      }
    }
  }
`;

/* *************************** */
/*           Welcome           */
/* *************************** */

export const sectionLayout = css`
  ${flexCenter}
  background-color:#fff;
  border: 1px solid red;
  border-radius: 5px;

  article {
    width: 50%;
    width: 100%;
    border: 1px solid yellow;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #f3f2f9;
      border-radius: 25px;
      width: 20rem;
      height: 10rem;

      button {
        width: 80%;
        /* background-color: #43964f; */
        background-color: #30b565;
        font-size: 12px;
        font-weight: 400;
      }
    }
  }
`;
