import nookies from 'nookies';
import { verifyIdToken } from '../firebaseAdmin';
export const handleTokenCookie = async (context: any) => {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    return token;
  } catch (err) {
    // If expired, user will be redirected to /refresh page, which will force a client-side
    // token refresh, and then redirect user back to the desired page
    const encodedPath = encodeURIComponent(context.req.url);
    context.res.writeHead(302, {
      Location: `/refresh`,
    });
    context.res.end();
  }
};
