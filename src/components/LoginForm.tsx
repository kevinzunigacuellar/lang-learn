import { Suspense, createSignal, createResource, Show } from "solid-js";
import { loginSchema } from "../lib/schemas";

async function postFormData(formData: FormData) {
  const response = await fetch("/api/login", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
}

export default function LoginForm() {
  const [formData, setFormData] = createSignal<FormData>();
  const [errors, setErrors] = createSignal();
  const [response] = createResource(formData, postFormData);

  function submit(e: SubmitEvent) {
    e.preventDefault();
    setErrors(null);
    const data = new FormData(e.currentTarget as HTMLFormElement);
    const result = loginSchema.safeParse(data);
    if (!result.success) {
      const errors = result.error.flatten();
      setErrors(errors);
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
        {errors().fieldErrors.username && (
          <pre>{errors().fieldErrors.username}</pre>
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
        {errors().fieldErrors.password && (
          <pre>{errors().fieldErrors.password}</pre>
        )}
      </Show>
      <button class="bg-gray-900 p-2 rounded-md mt-4 text-white">Send</button>
      <Suspense>{response() && <p>{response().message}</p>}</Suspense>
    </form>
  );
}
