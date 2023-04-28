import { auth } from "@lib/firebase/server";
import type { APIRoute } from "astro";
import { registerSchema } from "@lib/schemas";
import prisma from "@lib/prisma";

export const post: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const result = registerSchema.safeParse(formData);

  /* Validate the data */
  if (!result.success) {
    return new Response(
      JSON.stringify({
        errors: result.error.flatten(),
      }),
      { status: 400 }
    );
  }

  /* Create the user */
  const { email, password, name, username, targetLanguage } = result.data;

  try {
    // create user in firebase
    const userData = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    // using the user id from firebase, create a user in prisma
    await prisma.user.create({
      data: {
        name: name,
        username: username,
        email: email,
        target_language: targetLanguage,
        id: userData.uid,
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: error.code,
      }),
      { status: 400 }
    );
  }
  return redirect("/login", 302);
};
