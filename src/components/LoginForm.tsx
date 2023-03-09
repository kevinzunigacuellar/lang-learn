import { Suspense, createSignal, createResource, Show } from "solid-js";
import { loginSchema } from "../lib/schemas";
import type { z } from "zod";

async function postFormData(formData: FormData) {
  const response = await fetch("/api/login", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) {
    // customize server errors with status codes
    if (response.status === 400) {
      throw new Error(data.message);
    }
    throw new Error("Something went wrong");
  }
  return data;
}

type Errors = z.typeToFlattenedError<z.inferFormattedError<typeof loginSchema>>;

export default function LoginForm() {
  const [formData, setFormData] = createSignal<FormData>();
  const [errors, setErrors] = createSignal<Errors>();
  const [response] = createResource(formData, postFormData);

  function submit(e: SubmitEvent) {
    e.preventDefault();
    setErrors(undefined);
    const data = new FormData(e.currentTarget as HTMLFormElement);
    const result = loginSchema.safeParse(data);
    if (!result.success) {
      const errors = result.error.flatten() as Errors;
      setErrors(errors);
      return;
    }
    setFormData(data);
  }

  return (
    <form class="grid grid-cols-1 gap-1 max-w-lg" onSubmit={submit}>
      <label for="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        class="rounded-md"
        required
      />
      <Show when={errors()}>
        {errors()?.fieldErrors.username && (
          <pre>{errors()?.fieldErrors.username}</pre>
        )}
      </Show>
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        class="rounded-md"
        required
      />
      <Show when={errors()}>
        {errors()?.fieldErrors.password && (
          <pre>{errors()?.fieldErrors.password}</pre>
        )}
      </Show>
      <button class="bg-gray-900 p-2 rounded-md mt-4 text-white">Send</button>
      <Suspense>
        <Show when={!response.error} fallback={<p>{response.error.message}</p>}>
          <pre>{response()}</pre>
        </Show>
      </Suspense>
    </form>
  );
}
