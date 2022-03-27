import { css } from '@emotion/react';

/* *************************** */
/*    Global Styles            */
/* *************************** */

export const globalStyleBody = (theme) => css`
  :root {
    --backgroundColor: #e9e7f1;
    --fontColorDark: #0e081c;
    --fontColorParagraphAndLinks: #0e081c;
    --backgroundColorLightGreen: #b4e5bd;
    --backgroundColorLightGray: #f0f3f9;
    --backgroundColorLightBlue: #189fdd;
    --backGroundColorWhite: #fff;
    --fontColorWhite: #fff;
    --colorMainBlue: #030a45;
    --fontColorGrey: #333333;
    --backGroundColorGrey: #e6e6e6;
    --highlightsPink: #ec184a;
    --outLineMenue: #44496b;
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

  h1 {
    font-size: 2.5rem;
  }

  /* set up the body */
  body {
    line-height: 1.5; /* default for browser: 1.4 tends to be very small*/
    font-size: ${theme.typography.medium};
    min-height: 100vh;
    /* max-width: 1350px; */
    font-family: ${theme.font};
    background-color: var(--colorMainBlue);
    margin: 0 auto;
    color: var(--colorMainBlue);
  }

  /* make img easier to work with*/
  img {
    max-width: 100%; /* ensure that the img gets narrow when viewoprt shrinks*/
    display: block;
  }

  /* form elements should have same font as body */
  input,
  textarea,
  select {
    font: inherit;
    font-size: 0.9rem;
    line-height: 1.5;
    color: var(--outLineMenue);
  }

  input,
  select {
    min-height: 3.5rem;
    padding: 1rem;
    border: 1px solid var(--backGroundColorGrey);
  }

  label {
    color: var(--colorMainBlue);
  }

  button {
    font: inherit;
    line-height: 1.5;
    letter-spacing: 0.5px;
    border-radius: 20px;
    /* text-transform: uppercase; */
    font-weight: bold;
    display: block;
    min-height: 2.5rem;
    background-color: var(--highlightsPink);
    color: var(--fontColorWhite);
    border: none;

    :hover {
      background-color: var(--colorMainBlue);
    }
  }
`;

export const showForm = css`
  display: flex;
  flex-direction: column;
`;

export const hideForm = css`
  display: none;
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
  min-height: 100vh;
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
  /* margin: 1rem 0 auto; */
  /* border-radius: 15px; */

  /* border: 2px solid blue; */

  nav {
    max-width: 95%;
    /* width: inherit; */
    ${marginCenter}
    /* margin: 0 auto; */
    gap: 60px;
    align-items: center;
    display: flex;
    height: 4rem;

    justify-content: space-between;

    div {
      ${flexCenter} gap: .5rem;
    }

    div:nth-of-type(1) {
      margin-left: 1rem;
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
/*            Login            */
/* *************************** */

export const flexCenterWithWidthAndHeight = css`
  ${flexCenter}
  width: 70%;
  height: 100vh;

  margin: 0 auto;

  section {
    ${flexCenter}
    width: 100%;
    height: 80%;
    border-radius: 1rem;

    -webkit-box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.16);
    box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.16);
    background-color: var(--backGroundColorWhite);

    a {
      text-decoration: none;
    }

    article:first-of-type {
      position: relative;
      /* display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center; */
      width: 30%;
      height: 100%;
      padding: 1rem;
      background-color: var(--highlightsPink);

      /* margin: 0.2rem 0 0 0.2rem; */
      border-radius: 1rem 0 0 1rem;

      div {
        display: block;
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }

    article:nth-of-type(2) {
      width: 70%;
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

      div > div {
        margin-top: 1rem;
      }

      h1 {
        margin-top: 1rem;
        text-align: left;
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
          }

          input {
            width: 100%;
          }
        }

        button {
          width: 100%;
          min-height: 3rem;
          margin-top: 1.2rem;

          font-size: 1.8rem;
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
/*        Register             */
/* *************************** */

export const registerFlexCenterWithWidthAndHeight = css`
  ${flexCenter}
  width: 70%;
  height: 100vh;

  margin: 0 auto;

  section {
    ${flexCenter}
    width: 100%;
    height: 80%;
    border-radius: 1rem;

    -webkit-box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.16);
    box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.16);
    background-color: var(--backGroundColorWhite);

    a {
      text-decoration: none;
    }

    article:first-of-type {
      position: relative;
      /* display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center; */
      width: 30%;
      height: 100%;
      padding: 1rem;
      background-color: var(--highlightsPink);

      /* margin: 0.2rem 0 0 0.2rem; */
      border-radius: 1rem 0 0 1rem;

      div {
        display: block;
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }

    article:nth-of-type(2) {
      width: 70%;
      height: 100%;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
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

      > div {
        margin-top: 1rem;
      }
      div + div {
        margin-top: 1rem;
      }

      h1 {
        margin-top: 1rem;
        text-align: left;
        width: 100%;
      }

      p {
        width: 100%;
        margin: none;
      }

      form {
        ${flexCenterColumn}
        /* width: 60%; */

         /* div + div {
          margin-bottom: 1rem;
        } */

        div {
          ${displayFlex('flex', 'row', 'space-around', 'center')}
          gap: 1rem;

          /* margin-top: 1.2rem; */
          width: 100%;

          label {
            width: 100%;
            margin-bottom: 0.3rem;
          }

          input {
            width: 100%;
          }
        }

        button {
          width: 100%;
          min-height: 3rem;
          margin-top: 1.2rem;
          font-size: 1.8rem;
          margin: 1rem 0;
        }

        p {
          width: 100%;
          margin-top: 0.5rem;
        }
      }
    }
  }
`;

/* *************************** */
/*           Navigation        */
/* *************************** */
export const navigationStyle = css`
  ul {
    margin-top: 3rem;
    height: 100%;
    display: flex;
    /* gap: 2rem; */
    flex-direction: column;
    justify-content: center;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      list-style: none;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      line-height: 4rem;
      border-bottom: 1px solid var(--outLineMenue);
      padding-left: 1rem;

      :hover {
        border-left: 5px solid var(--highlightsPink);
      }

      a {
        text-decoration: none;
        color: var(--fontColorWhite);
        display: block;
        width: 100%;
      }
      a:link,
      a:visited,
      a:active {
        color: var(--fontColorWhite);
      }
    }
  }
`;

/* *************************** */
/*           Index           */
/* *************************** */

export const sectionOneLayout = css`
  width: 15rem;
  min-height: 100%;
  background-color: var(--colorMainBlue);
`;

export const sectionTwoLayout = css`
  min-width: 85%;
  background-color: #eae9ee;
  padding: 1.5rem;

  /* -webkit-box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.16);
  box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.16); */

  > div {
    background-color: #fff;
    height: 95%;
    padding: 1.5rem;
    border: 1px solid red;

    h1 {
      margin: 0 0 1.5rem 0;
      font-size: 20px;
      background-color: #30b565;
    }

    div {
      ${displayFlex()}
      border: 2px solid pink;
      margin: 0 auto;

      h2 {
        font-size: 16px;
      }

      /* article:nth-of-type(1) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-width: 30%;
        /* border: 1px solid pink; */
      width: 18rem;
      height: 24rem;
      border-radius: 20px;
      background-color: var(--backgroundColorLightGray);
    }
    */ article:nth-of-type(2) {
      width: 28.75rem;
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
        background-color: var(--backgroundColorLightGray);
        /* border-radius: 25px; */
        width: 18rem;
        height: 12rem;
        border-radius: 20px;
        padding: 1rem;

        /* box-shadow: 0 2px 21px 0 rgb(0 0 0 / 10%); */

        button {
          width: 100%;
          /* background-color: #43964f; */

          font-size: 12px;
          font-weight: 400;
          border-radius: 5px;

          min-height: 30px;
          margin: 0 1rem;
        }
      }
    }
  }
`;

export const indexSectionTwoLayout = css`
  min-width: 85%;
  background-color: #eae9ee;
  padding: 1.5rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;

  > div {
    /* height: 100%; */
    /* margin: 0 auto; */
    /* padding: 1.5rem; */
    display: flex;
    margin: 0.5rem;
    gap: 1.5rem;
    /* border: 1px solid red; */
    div {
      /* margin: 0 auto; */

      /* article:nth-of-type(1) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-width: 30%;
        /* border: 1px solid pink; */
      width: 28.75rem;
      /* width: 18rem;
      height: 24rem; */
      border-radius: 20px;
    }
    article {
      width: 28.75rem;
      display: flex;
      flex-direction: column;
      /* flex-wrap: wrap; */
      /* gap: 1rem; */
      align-items: center;
      justify-content: center;
      border: 2px solid yellow;
      background-color: var(--fontColorWhite);

      div:nth-of-type(2) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        /* gap: 1rem; */
        height: 100%;
        padding: 1rem;

        h2 {
          width: 100%;
          font-size: 1rem;
          text-align: left;
        }

        p {
          color: var(--fontColorGrey);
          font-size: 0.75rem;
          /* margin: 1rem 0; */
        }
      }

      button {
        width: 9.5rem;
        font-size: 12px;
        font-weight: 400;

        min-height: 2.1rem;
        margin: 0 1rem;
        align-self: flex-end;
        display: flex;
        gap: 0.15rem;
        padding-left: 0.8rem;
        span {
          display: inline-block;
          display: flex;
          align-items: center;
          height: 100%;
        }
        span:nth-of-type(2) {
          font-weight: 600;
        }
      }
    }
  }
`;

/* *************************** */
/*   Profile / UserProfile     */
/* *************************** */

export const userProfileSectionTwoLayout = css`
  width: 100%;
  background-color: var(--backGroundColorGrey);
  padding: 1.5rem;

  > div:first-of-type {
    width: 70%;
    ${displayFlex('flex', 'row', '', 'center')}
    /* border: 2px solid red; */
    gap: 4rem;

    article:nth-of-type(1) {
      ${displayFlex('flex', 'column', 'flex-start', 'center')};
      width: 15rem;
      height: 26rem;
      border-radius: 20px;
      /* background-color: var(--backgroundColorLightGray); */
      /* padding: 1rem; */
      /* border: 5px solid lightblue; */

      div:first-of-type {
        width: 250px;
        height: 250px;
        border-radius: 50%;
        /* border: 1px solid grey; */
        margin-bottom: 1rem;
        position: relative;
        padding: 1rem;

        img {
          display: block;
          border-radius: 50%;
          width: 400px;
          height: auto;
          margin: 1rem;
        }
      }

      div:nth-of-type(2) {
        display: flex;
        flex-direction: column;
        align-items: center;

        input[type='file'] {
          border: none;
          width: 15rem;
        }

        button {
          width: 10rem;
          /* height: 1rem; */
          /* border-radius: 50%; */
          /* font-size: 1rem; */
        }
      }
    }

    p:first-of-type {
      font-weight: 800;
    }

    article:nth-of-type(2) {
      width: 30rem;
      height: 100%;

      ${displayFlex('flex', 'column', 'flex-end', 'center')};
      /* border: 5px solid lightblue; */

      h2 {
        width: 100%;
        text-align: left;
        background-color: var(--colorMainBlue);
        color: var(--backGroundColorGrey);
        padding: 1.5rem;
        border-radius: 12px 12px 0 0;
      }

      ul {
        background-color: var(--fontColorWhite);
        width: 100%;
        padding: 0;
        list-style: none;
        margin: 0;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 3rem;
        border-radius: 0 0 12px 12px;

        div {
          display: flex;
          align-items: center;
          gap: 3rem;
          border-radius: 5px;

          li {
            width: 7rem;
          }
          li:nth-of-type(odd) {
            font-weight: 700;
          }
        }
      }
    }
  }
`;

/* *************************** */
/*          Documents          */
/* *************************** */

export const sectionTwoLayoutForm = css`
  min-width: 85%;

  background-color: #eae9ee;
  padding: 1.5rem;

  > div {
    background-color: #fff;
    width: 85%;
    min-width: 57.5rem;
    height: 95%;
    padding: 1.5rem;
    border-radius: 20px;

    h1 {
      margin: 0 0 1.5rem 0;
      font-size: 20px;
      /* background-color: #30b565; */
    }

    div {
      h2 {
        font-size: 16px;
      }
    }
  }
`;

export const formStyleContainer = css`
  /* border: 2px solid yellow; */
  height: 85%;

  button {
    ${size('17.65rem', '1.47rem')}
  }
`;

export const formStyle = css`
  ${displayFlex('flex', 'column', 'space-between', 'center')}
  gap: 1rem;
  margin-top: 2rem;
  /* width: 65rem; */
  min-width: 100%;

  section {
    width: 100%;
    /* background-color: #eae9ee; */
    /* padding: 1rem; */
    /* border-radius: 20px; */
    /* border: 5px solid var(--backGroundColorWhite); */
    /* margin: 0 auto; */
  }

  p,
  label,
  input {
    margin-bottom: 16px;
  }

  input,
  select {
    width: 100%;
    /* height: 40px; */
    border: 1px solid grey;
    border-radius: 12px;
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

export const uploadFormStyle = css`
  margin: 0 auto;

  div {
    display: flex;
    gap: 1rem;
    justify-content: center;

    p {
      width: 60%;
    }

    p + p {
      width: 30%;
      align-self: center;
      margin-top: 0.8rem;
    }
  }
`;

/* *************************** */
/*        FormCompleted        */
/* *************************** */

export const sectionFormCompletedLayout = css`
  min-width: 85%;
  /* background-color: #eae9ee; */
  padding: 1.5rem;
  display: flex;

  gap: 1.5rem;

  /* -webkit-box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.16);
  box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.16); */

  h1 {
    margin: 0 0 1.5rem 0;
    font-size: 20px;
    background-color: #30b565;
  }

  article {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    width: 15rem;
    height: 95%;
    /* padding: 1.5rem; */
    /* border: 1px solid var(--backGroundColorGrey); */
    gap: 1.8rem;
    /* flex-wrap: wrap; */
    margin-bottom: 3rem;

    label {
      font-weight: bold;
      font-size: 0.9rem;
    }

    div {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }

    input,
    select {
      /* border-radius: 14px; */
      padding: 0.5rem;
      border: 1px solid var(--backGroundColorGrey);
      min-height: 2.5rem;
      border: none;
      background-color: #eae9ee;
    }

    p {
      display: flex;
      flex-direction: column;
    }

    button {
      width: 100%;
      font-size: 12px;
      font-weight: 400;
      border-radius: 5px;
      min-height: 30px;
      margin: 0 1rem;
    }
  }
`;

/* *************************** */
/*         AddNewJoiner        */
/* *************************** */

export const addNewJoinerSectionTwoLayout = css`
  width: 100%;
  background-color: var(--backGroundColorGrey);
  padding: 1.5rem;
  display: flex;
  gap: 3rem;
  /*
  > div:first-of-type {
    width: 70%;
    ${displayFlex('flex', 'row', '', 'flex-start')}
    border: 2px solid red;
    gap: 2rem;

    h2 {
      font-size: 16px;
    }

    h2 {
      width: 100%;
      text-align: left;
      background-color: var(--colorMainBlue);
      color: var(--backGroundColorGrey);
      padding: 1.5rem;
      border-radius: 12px 12px 0 0;
    }

    ul {
      background-color: var(--fontColorWhite);
      width: 100%;
      padding: 0;
      list-style: none;
      margin: 0;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 3rem;
      border-radius: 0 0 12px 12px;
      div {
        display: flex;
        align-items: center;
        gap: 4rem;
        border-radius: 5px;
      }
    }
  } */
`;

export const formAddNewJoiner = css`
  article {
    width: 30rem;
    height: 100%;

    ${displayFlex('flex', 'column', 'flex-start', 'flex-start')};
    /* border: 5px solid lightblue; */

    h2 {
      /* font-size: 2rem; */
      width: 100%;
      /* text-align: center; */
      background-color: var(--colorMainBlue);
      color: var(--backGroundColorGrey);
      padding: 1.5rem;
      border-radius: 12px 12px 0 0;
    }

    ul {
      background-color: var(--fontColorWhite);
      width: 100%;
      padding: 0;
      list-style: none;
      margin: 0;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 3rem;
      border-radius: 0 0 12px 12px;
      div {
        display: flex;
        align-items: center;
        gap: 4rem;
        border-radius: 5px;

        li:nth-of-type(odd) {
          font-weight: 700;
        }

        li {
          width: 8rem;
        }
      }
      div:last-child {
        width: 100%;
        display: flex;
        justify-content: center;

        button {
          display: block;
          width: 50%;
        }
      }
    }
  }
`;
