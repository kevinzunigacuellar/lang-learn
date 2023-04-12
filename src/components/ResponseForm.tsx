import { Suspense, createSignal, createResource, Show } from "solid-js";
import { responseSchema } from "../lib/schemas";

async function responseFormData(formData: FormData) {
  const response = await fetch("/api/response", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
}

export default function ResponseForm() {
  const [formData, setFormData] = createSignal<FormData>();
  const [errors, setErrors] = createSignal();
  const [response] = createResource(formData, responseFormData);

  function submit(e: SubmitEvent) {
    e.preventDefault();
    setErrors(null);
    const data = new FormData(e.currentTarget as HTMLFormElement);
    const result = responseSchema.safeParse(data);
    if (!result.success) {
      const errors = result.error.flatten();
      setErrors(errors);
      console.log(errors);
    }
    setFormData(data);
  }

  return (
    <form onSubmit={submit}>
      <div class="flex-container">
        <div class="input">
          <label class="selector-label" for="quesion">
            Response to the Question:
          </label>
          <input type="text" id="question" name="question">
            {" "}
          </input>
        </div>
      </div>
      <button type="submit" class="post-button">
        Post
      </button>
    </form>
  );
}
