import type { APIRoute, AstroGlobal } from "astro";
import { postSchema } from "../../lib/schemas";
import prisma from "../../lib/prisma";
// import { auth } from "../../lib/firebase/server"

// get cookie
// TODO: get the cookie somehow


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

  // send data to db
  await prisma.posts.create({
    data: {
      question: question,
      post_language: language,
      has_response: false,

      user_id: "cleyl3tpx0000o7uo25vuq383",    // this is pull from the cookie data
    },
  });

  return new Response(
    JSON.stringify({
      message: "Successfully created post & saved to DB",
    }),
    { status: 200 }
  );
};
