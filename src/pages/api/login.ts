import type { APIRoute } from "astro";
import { loginSchema } from "../../lib/schemas";

export const post: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const result = loginSchema.safeParse(formData);

  if (!result.success) {
    return new Response(
      JSON.stringify({
        errors: result.error.flatten(),
      }),
      { status: 400 }
    );
  }

  const { username, password } = result.data;
  // TODO: Check if user exists
  // return new Response(
  //   JSON.stringify({
  //     message: "User is not registered",
  //   }),
  //   { status: 400 }
  // );
  // TODO: Authenticate user
  // TODO: Set session cookie
  // TODO: Redirect to dashboard

  return new Response(
    JSON.stringify({
      message: "Successfully logged in",
    }),
    { status: 200 }
  );
};
