import { Global, ThemeProvider } from '@emotion/react';
import { useCallback, useEffect, useState } from 'react';
import { globalStyleBody } from '../components/elements';
import theme from '../components/theme';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();
  const [userFirstName, setUserFirstName] = useState();
  const [userHeaderImage, setUserHeaderImage] = useState(
    `/profile-placeholder.svg`,
  );

  const refreshUserProfile = useCallback(async () => {
    const response = await fetch('/api/profile');
    const data = await response.json();
    console.log('data_app:', data);

    if ('errors' in data) {
      console.log(data.errors);
      setUser(undefined);
      return;
    }

    setUser(data.user);
    setUserFirstName(data.user.firstName);
    // check api response: img-url
    if (data.profileImgUrl.imageUrl) {
      setUserHeaderImage(data.profileImgUrl.imageUrl);
      console.log('_app_Image:', data.profileImgUrl.imageUrl);
    }

    // setUserFirstName(usersFirstName);

    // if (!data.userImageUrlHeader.imgUrl) {
    //   setUserHeaderImage(`../public/imgTest.png`);
    // } else {
    //   setUserHeaderImage(data.userImageUrlHeader.imgUrl);
    // }
  }, []);

  console.log('userName _app:', userFirstName);
  useEffect(() => {
    refreshUserProfile().catch(() => {});
  }, [refreshUserProfile]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyleBody(theme)} />
        <Component
          {...pageProps}
          userObject={user}
          userFirstName={userFirstName}
          refreshUserProfile={refreshUserProfile}
          headerImage={userHeaderImage}
          setUserHeaderImage={setUserHeaderImage}
        />
        {/* </FormProvider> */}
      </ThemeProvider>
      ;
    </>
  );
}

export default MyApp;
