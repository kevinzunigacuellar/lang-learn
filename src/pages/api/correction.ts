import type { APIRoute } from "astro";
import { correctionSchema } from "@lib/schemas";
import prisma from "@lib/prisma";

// Updates the database to include a correction on a user's response
export const post: APIRoute = async ({ request, cookies }) => {
  const correctionData = await request.formData();
  const result = correctionSchema.safeParse(correctionData); // validate the data

  // Error handling
  if (!result.success) {
    return new Response(
      JSON.stringify({
        errors: result.error.flatten(),
      }),
      { status: 400 }
    );
  }

  const { response_id, correction_content } = result.data;

  // updates the database to include the correction
  await prisma.responses.update({
    where: {
      response_id: response_id,
    },
    data: {
      response_content: correction_content,
    },
  });

  // returns a success message
  return new Response(
    JSON.stringify({
      message: "Successfully responded to post & saved to DB",
    }),
    { status: 200 }
  );
};
