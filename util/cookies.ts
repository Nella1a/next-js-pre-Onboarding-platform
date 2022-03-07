import cookie from 'cookie';

export function createSerializedRegisterSessionTokenCookie(token: string) {
  // check if we are in production e.g. Heroku
  const isProduction = process.env.NODE_ENV === 'production';

  const maxAge = 60 * 10; // 10 minutes

  return cookie.serialize('sessionToken', token, {
    maxAge: maxAge,
    expires: new Date(Date.now() + maxAge * 1000),
    // only for use in development
    httpOnly: true,
    // set secure cookies on production (eg. Heroku)
    secure: isProduction,
    // cookie set in the root, thus set on all pages
    path: '/',
    // can be lax or strict, if strict cookie won't be send to third-party pages?
    sameSite: 'lax',
  });
}
