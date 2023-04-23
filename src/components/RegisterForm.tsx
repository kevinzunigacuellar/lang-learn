import {
    createSignal,
    Show,
    createResource,
    Suspense,
    Switch,
    Match,
  } from "solid-js";
  import { registerSchema } from "../lib/schemas";
  import ErrorPlaceholder from "./ErrorPlaceholder";
  import Error from "./Error";
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
          <label for="name" class="font-medium text-zinc-300 text-sm">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            class="rounded-md py-1 px-3 bg-zinc-800 text-zinc-300 border border-zinc-700 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:bg-zinc-900 focus:ring-opacity-60"
          />
          <Show
            when={clientErrors()?.fieldErrors.name}
            fallback={<ErrorPlaceholder />}
          >
            <Error message={clientErrors()?.fieldErrors.name} />
          </Show>
        </div>

        <div class="grid grid-cols-1 gap-2">
          <label for="email" class="font-medium text-zinc-300 text-sm">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            class="rounded-md py-1 px-3 bg-zinc-800 text-zinc-300 border border-zinc-700 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:bg-zinc-900 focus:ring-opacity-60"
          />
          <Show
            when={clientErrors()?.fieldErrors.email}
            fallback={<ErrorPlaceholder />}
          >
            <Error message={clientErrors()?.fieldErrors.email} />
          </Show>
        </div>

        <div class="grid grid-cols-1 gap-2">
          <label for="username" class="font-medium text-zinc-300 text-sm">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            class="rounded-md py-1 px-3 bg-zinc-800 text-zinc-300 border border-zinc-700 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:bg-zinc-900 focus:ring-opacity-60"
          />
          <Show
            when={clientErrors()?.fieldErrors.username}
            fallback={<ErrorPlaceholder />}
          >
            <Error message={clientErrors()?.fieldErrors.username} />
          </Show>
        </div>
        <div class="grid grid-cols-1 gap-2">
          <label for="targetLanguage" class="font-medium text-zinc-300 text-sm">
            Target Language
          </label>
          <input
            type="text"
            id="targetLanguage"
            name="targetLanguage"
            class="rounded-md py-1 px-3 bg-zinc-800 text-zinc-300 border border-zinc-700 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:bg-zinc-900 focus:ring-opacity-60"
          />
          <Show
            when={clientErrors()?.fieldErrors.targetLanguage}
            fallback={<ErrorPlaceholder />}
          >
            <Error message={clientErrors()?.fieldErrors.targetLanguage} />
          </Show>
        </div>

        <div class="grid grid-cols-1 gap-2">
          <label for="password" class="font-medium text-zinc-300 text-sm">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            class="rounded-md py-1 px-3 bg-zinc-800 text-zinc-300 border border-zinc-700 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:bg-zinc-900 focus:ring-opacity-60"
          />
          <Show
            when={clientErrors()?.fieldErrors.password}
            fallback={<ErrorPlaceholder />}
          >
            <Error message={clientErrors()?.fieldErrors.password} />
          </Show>
        </div>

        <div class="grid grid-cols-1 gap-2">
          <label for="confirmPassword" class="font-medium text-zinc-300 text-sm">
            Confirm password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            class="rounded-md py-1 px-3 bg-zinc-800 text-zinc-300 border border-zinc-700 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:bg-zinc-900 focus:ring-opacity-60"
          />
          <Show
            when={clientErrors()?.fieldErrors.confirmPassword}
            fallback={<ErrorPlaceholder />}
          >
            <Error message={clientErrors()?.fieldErrors.confirmPassword} />
          </Show>
        </div>

        <button
          class="bg-zinc-100 py-1.5 border border-zinc-100 rounded-md mt-2 text-black font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-600 focus:ring-offset-zinc-900"
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