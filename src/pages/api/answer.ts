import type { APIRoute } from "astro";
import { answerSchema } from "@lib/schemas";
import prisma from "@lib/prisma";
import { getUserIdFromCookie } from "@lib/utils";

// Updates the database to create a response to a post
export const post: APIRoute = async ({ request, cookies, redirect }) => {
  const answerData = await request.formData();
  const result = answerSchema.safeParse(answerData); // validate data

  // Error handling
  if (!result.success) {
    return new Response(
      JSON.stringify({
        errors: result.error.flatten(),
      }),
      { status: 400 }
    );
  }

  const { post_id, answer_content } = result.data;

  // get the user's id to attribute the response to them
  const session_cookie = cookies.get("session");
  if (!session_cookie) {
    return new Response();
  }
  const user = getUserIdFromCookie(String(session_cookie));

  // creates a new entry to the responses table in the database
  await prisma.responses.create({
    data: {
      response_content: answer_content,
      response_comment: "",
      post_id: post_id,
      user_id: String(user),
    },
  });

  // Updates the post to show that it has a response
  await prisma.posts.update({
    where: {
      post_id: post_id,
    },
    data: {
      has_response: true,
    },
  });

  // returns a success message
  return redirect("/", 301);
};
