import type { APIRoute, AstroGlobal } from "astro";
import { answerSchema } from "../../lib/schemas";
import prisma from "../../lib/prisma";
import { getUserIdFromCookie } from "../../lib/utils";

export const post: APIRoute = async ({ request, cookies }) => {
    const answerData = await request.formData();
    // answerData.append("post_id", request.);
    const result = answerSchema.safeParse(answerData);
    
    if (!result.success) {
      return new Response(
        JSON.stringify({
          errors: result.error.flatten(),
        }),
        { status: 400 }
      );
    }

    const { post_id, answer_content } = result.data;

    // console.log(getUserIdFromCookie(document.cookie))
    const session_cookie = cookies.get("session")
    if (!session_cookie) {
        return new Response ()
    }
    const user = getUserIdFromCookie(String(session_cookie))
    console.log(user);


    await prisma.responses.create({
        data: {
            response_content: answer_content, 
            response_comment: "",
            post_id: post_id,
            user_id: String(user),
        },
    });

    return new Response(
        JSON.stringify({
          message: "Successfully responded to post & saved to DB",
        }),
        { status: 200 }
      );





};