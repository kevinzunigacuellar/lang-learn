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
  const session_cookie = cookies.get("session").value;
  if (!session_cookie) {
    return new Response();
  }
  const userId = await getUserIdFromCookie(session_cookie);
  console.log(userId, post_id, answer_content);
  if (!userId) {
    return new Response(
      JSON.stringify({
        errors: "User not found",
      }),
      { status: 400 }
    );
  }

  // creates a new entry to the responses table in the database
  await prisma.response.create({
    data: {
      content: answer_content,
      user_id: userId,
      feedback: "",
      question_id: post_id,
    },
  });

  // Updates the post to show that it has a response
  await prisma.question.update({
    where: {
      id: post_id,
    },
    data: {
      has_response: true,
    },
  });

  // returns a success message
  return redirect("/", 301);
};
