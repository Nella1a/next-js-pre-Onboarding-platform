import { Global, ThemeProvider } from '@emotion/react';
import { useCallback, useEffect, useState } from 'react';
import { globalStyleBody } from '../components/elements';
import theme from '../components/theme';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();

  const refreshUserProfile = useCallback(async () => {
    const response = await fetch('/api/profile');
    const data = await response.json();
    console.log(data);

    if ('errors' in data) {
      console.log(data.errors);
      setUser(undefined);
      return;
    }

    setUser(data.user);
  }, []);

  useEffect(() => {
    refreshUserProfile().catch(() => {});
  }, [refreshUserProfile]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyleBody(theme)} />

        {/* Passing to every component pagesProps, userObject and refresUserProfile */}
        {/* <FormProvider> */}
        <Component
          {...pageProps}
          userObject={user}
          refreshUserProfile={refreshUserProfile}
        />
        {/* </FormProvider> */}
      </ThemeProvider>
      ;
    </>
  );
}

export default MyApp;
