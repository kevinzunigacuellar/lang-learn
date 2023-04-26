import { auth } from "./firebase/server";

type UserId = string;

export async function getUserIdFromCookie(
  cookie: string
): Promise<UserId | null> {
  try {
    /* Verify the cookie. */
    const decodedToken = await auth.verifySessionCookie(cookie, true);
    /* Token is valid. Return the user's ID. */
    return decodedToken.uid;
  } catch (err) {
    /* Session cookie is unavailable or invalid */
    return null;
  }
}
