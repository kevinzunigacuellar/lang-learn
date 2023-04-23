// imports
import { auth } from "../../lib/firebase/server";
import type { APIRoute } from "astro";
import { registerSchema } from "../../lib/schemas";
import prisma from "../../lib/prisma";
import { getUserIdFromCookie } from "../../lib/utils";


// register function
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
    // add usr to firebase
    const userData = await auth.createUser({
      email,
      password,
      displayName: name,
    });
    
    // add user to database
    await prisma.user.create({
      data: {
        name: name,
        username: username,
        email: email,
        target_language: targetLanguage,
        firebase_id: userData.uid as string,
        id: userData.uid as string,
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