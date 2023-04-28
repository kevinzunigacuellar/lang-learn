import type { APIRoute } from "astro";
import { correctionSchema } from "@lib/schemas";
import prisma from "@lib/prisma";

// Updates the database to include a correction on a user's response
export const post: APIRoute = async ({ request, redirect }) => {
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
  console.log(response_id, correction_content);

  // updates the database to include the correction
  await prisma.response.update({
    where: {
      id: response_id,
    },
    data: {
      feedback: correction_content,
    },
  });

  // returns a success message
  return redirect("/inbox/")
};
