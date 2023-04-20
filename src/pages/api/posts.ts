import type { APIRoute } from "astro";
import { postSchema } from "../../lib/schemas";
import prisma from "../../lib/prisma";
import { getUserIdFromCookie } from "../../lib/utils";

export const post: APIRoute = async ({ request, cookies, redirect }) => {
  const postData = await request.formData();
  // console.log(postData);

  const result = postSchema.safeParse(postData);

  if (!result.success) {
    return new Response(
      JSON.stringify({
        errors: result.error.flatten(),
      }),
      { status: 400 }
    );
  }

  // gather post data
  const { question, difficulty, topic, language } = result.data;

  /* get user */
  const session_cookie = cookies.get("session").value;
  if (!session_cookie) {
    return new Response();
  }
  const user = await getUserIdFromCookie(session_cookie);
  if (!user) {
    return new Response(
      JSON.stringify({
        errors: "User not found",
      }),
      { status: 400 }
    );
  }

  // send data to db
  await prisma.posts.create({
    data: {
      question: question,
      post_language: language,
      has_response: false,
      user_id: user,
    },
  });

  // redirect to home page
  return redirect("/", 301);
};
