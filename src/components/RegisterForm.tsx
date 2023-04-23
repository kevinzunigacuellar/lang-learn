/** @jsxImportSource solid-js */

import {
  createSignal,
  Show,
  createResource,
  Suspense,
  Switch,
  Match,
} from "solid-js";
import { registerSchema } from "@lib/schemas";
import ErrorPlaceholder from "@components/ErrorPlaceholder";
import Error from "@components/Error";
import type { z } from "zod";

type Errors = z.typeToFlattenedError<
  z.inferFormattedError<typeof registerSchema>
>;

// registers the user for the website
async function postFormData(formData: FormData) {
  const res = await fetch("/api/register", {
    method: "POST",
    body: formData,
  });

  // error handling
  if (!res.ok) {
    const data = await res.json();
    return data;
  }

  // if the response is ok, redirect to the home page
  if (res.redirected) {
    window.location.assign(res.url);
  }
}

// the form for registering as a new user
export default function SignupForm() {
  const [formData, setFormData] = createSignal<FormData>();
  const [response] = createResource(formData, postFormData);
  const [clientErrors, setClientErrors] = createSignal<Errors>();

  // called when the form is submitted
  async function submit(e: SubmitEvent) {
    e.preventDefault();
    setClientErrors();
    const data = new FormData(e.currentTarget as HTMLFormElement);
    const result = registerSchema.safeParse(data);

    // error handling
    if (!result.success) {
      // @ts-ignore
      const errors = result.error.flatten() as Errors;
      setClientErrors(errors);
      return;
    }
    setFormData(data);
  }

  // HTML for the registration form
  return (
    <form class="grid grid-cols-1 gap-3 w-full" onSubmit={submit}>
      <div class="grid grid-cols-1 gap-2">
        <label for="name" class="font-medium text-sm text-zinc-800">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          class="rounded-md py-1 px-3 bg-zinc-50 text-zinc-600 border border-zinc-300 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white"
        />
        <Show
          when={clientErrors()?.fieldErrors.name}
          fallback={<ErrorPlaceholder />}
        >
          <Error message={clientErrors()?.fieldErrors.name} />
        </Show>
      </div>

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
        <label for="username" class="font-medium text-sm text-zinc-800">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          class="rounded-md py-1 px-3 bg-zinc-50 text-zinc-600 border border-zinc-300 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white"
        />
        <Show
          when={clientErrors()?.fieldErrors.username}
          fallback={<ErrorPlaceholder />}
        >
          <Error message={clientErrors()?.fieldErrors.username} />
        </Show>
      </div>
      <div class="grid grid-cols-1 gap-2">
        <label for="targetLanguage" class="font-medium text-sm text-zinc-800">
          Target Language
        </label>
        <input
          type="text"
          id="targetLanguage"
          name="targetLanguage"
          class="rounded-md py-1 px-3 bg-zinc-50 text-zinc-600 border border-zinc-300 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white"
        />
        <Show
          when={clientErrors()?.fieldErrors.targetLanguage}
          fallback={<ErrorPlaceholder />}
        >
          <Error message={clientErrors()?.fieldErrors.targetLanguage} />
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

      <div class="grid grid-cols-1 gap-2">
        <label for="confirmPassword" class="font-medium text-sm text-zinc-800">
          Confirm password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          class="rounded-md py-1 px-3 bg-zinc-50 text-zinc-600 border border-zinc-300 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white"
        />
        <Show
          when={clientErrors()?.fieldErrors.confirmPassword}
          fallback={<ErrorPlaceholder />}
        >
          <Error message={clientErrors()?.fieldErrors.confirmPassword} />
        </Show>
      </div>

      <button
        class="bg-pink-500 py-1.5 rounded-md mt-1 text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pink-600"
        disabled={response.loading}
        type="submit"
      >
        <Show fallback="Sign up" when={response.loading}>
          Signing up...
        </Show>
      </button>
      <Suspense>
        <Switch>
          <Match when={response()?.error === "auth/email-already-exists"}>
            <Error message="The email address is already in use by another account" />
          </Match>
          <Match when={response()?.error}>
            <Error message={response().error} />
          </Match>
        </Switch>
      </Suspense>
    </form>
  );
}
