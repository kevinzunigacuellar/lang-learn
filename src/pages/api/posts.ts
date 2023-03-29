import type { APIRoute } from "astro";
import { postSchema } from "../../lib/schemas";
import prisma from "../../lib/prisma";

export const post: APIRoute = async ({ request }) => {
  const postData = await request.formData();
  console.log(postData);
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
  const user = prisma.user.findUnique({
    where: {
      id: "0",
    },
  });

  // send data to db
  await prisma.posts.create({
    data: {
      question: question,
      post_language: language,
      has_response: false,
      user_id: "cleyl3tpx0000o7uo25vuq383",
    },
  });

  return new Response(
    JSON.stringify({
      message: "Successfully created post & saved to DB",
    }),
    { status: 200 }
  );
};
