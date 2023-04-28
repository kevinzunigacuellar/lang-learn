import type { APIRoute } from "astro";
import { postSchema } from "@lib/schemas";
import prisma from "@lib/prisma";
import { getUserIdFromCookie } from "@lib/utils";

export const post: APIRoute = async ({ request, cookies, redirect }) => {
  const postData = await request.formData();
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
  const { question, language } = result.data;

  /* get user */
  const session_cookie = cookies.get("session").value;
  if (!session_cookie) {
    return new Response();
  }
  const userId = await getUserIdFromCookie(session_cookie);
  if (!userId) {
    return new Response(
      JSON.stringify({
        errors: "User not found",
      }),
      { status: 400 }
    );
  }

  // send data to db
  await prisma.question.create({
    data: {
      question: question,
      post_language: language,
      user_id: userId,
    },
  });

  // redirect to home page
  return redirect("/inbox/", 301);
};
