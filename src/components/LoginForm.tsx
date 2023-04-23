/** @jsxImportSource solid-js */

import {
  createSignal,
  Show,
  createResource,
  Suspense,
  Switch,
  Match,
} from "solid-js";
import { loginSchema } from "@lib/schemas";
import {
  signInWithEmailAndPassword,
  inMemoryPersistence,
  getAuth,
} from "firebase/auth";
import { app } from "@lib/firebase/client";
import ErrorPlaceholder from "@components/ErrorPlaceholder";
import Error from "@components/Error";
import type { z } from "zod";

type Errors = z.typeToFlattenedError<z.inferFormattedError<typeof loginSchema>>;
type SucessForm = z.infer<typeof loginSchema>;

// takes in the login pages form data and sends it to the server
async function postFormData(formData: SucessForm) {
  const { email, password } = formData;
  const auth = getAuth(app);

  // Set the persistence to browser session
  const userCredential = await auth
    .setPersistence(inMemoryPersistence)
    .then(() => signInWithEmailAndPassword(auth, email, password));
  const idToken = await userCredential.user.getIdToken();

  // Runs the login api
  const res = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ idToken }),
  });

  // If the response is not ok, return the error
  if (!res.ok) {
    const data = await res.json();
    return data;
  }
  // If the response is ok, redirect to the home page
  if (res.redirected) {
    window.location.assign(res.url);
  }
}

// The login form
export default function LoginForm() {
  const [formData, setFormData] = createSignal<SucessForm>();
  const [response] = createResource(formData, postFormData);
  const [clientErrors, setClientErrors] = createSignal<Errors>();

  // Called when the login form is submitted
  async function submit(e: SubmitEvent) {
    e.preventDefault();
    setClientErrors();
    const data = new FormData(e.currentTarget as HTMLFormElement);
    // runs the data through the schema to ensure it is valid
    const result = loginSchema.safeParse(data);

    // error handling
    if (!result.success) {
      // @ts-ignore
      const errors = result.error.flatten() as Errors;
      setClientErrors(errors);
      return;
    }
    setFormData(result.data);
  }

  // The HTML for the login form
  return (
    <form class="grid grid-cols-1 gap-3 w-full" onSubmit={submit}>
      <div class="grid grid-cols-1 gap-2">
        <label for="email" class="font-medium text-sm text-zinc-800">
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          class="rounded-md py-1 px-3 bg-zinc-50 text-zinc-600 border border-zinc-300 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white"
        />
        <Show
          when={clientErrors()?.fieldErrors.email}
          fallback={<ErrorPlaceholder />}
        >
          <Error message={clientErrors()?.fieldErrors.email} />
        </Show>
      </div>
      <div class="grid grid-cols-1 gap-2">
        <label for="password" class="font-medium text-sm text-zinc-800">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          class="rounded-md py-1 px-3 bg-zinc-50 text-zinc-600 border border-zinc-300 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white"
        />
        <Show
          when={clientErrors()?.fieldErrors.password}
          fallback={<ErrorPlaceholder />}
        >
          <Error message={clientErrors()?.fieldErrors.password} />
        </Show>
      </div>
      <button
        class="bg-pink-500 py-1.5 rounded-md mt-1 text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pink-600"
        type="submit"
        disabled={response.loading}
      >
        <Show fallback="Sign in" when={response.loading}>
          Signing in...
        </Show>
      </button>
      <Suspense>
        <Switch>
          <Match when={response.error?.code === "auth/wrong-password"}>
            <Error message="Your password is incorrect" />
          </Match>
          <Match when={response.error?.code === "auth/user-not-found"}>
            <Error message="You don't have an account with this email" />
          </Match>
          {/* Fallback error */}
          <Match when={response()?.error}>
            <Error message={response().error} />
          </Match>
        </Switch>
      </Suspense>
    </form>
  );
}
