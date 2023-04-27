/** @jsxImportSource solid-js */

import { createSignal, createResource } from "solid-js";
import { answerSchema } from "../lib/schemas";

// Server request that submits a user's answer to a question
async function answerFormData(formData: FormData) {
  const response = await fetch("/api/answer", {
    method: "POST",
    body: formData,
  });

  if (response.redirected) {
    window.location.assign(response.url);
  }
}

// Form for submitting an answer to a question
export default function AnswerForm({ post_id }: { post_id: string }) {
  // post_id is passed in from the documentId in the question page
  // Create a signal for the form data and errors
  const [formData, setFormData] = createSignal<FormData>();
  const [errors, setErrors] = createSignal();
  const [response] = createResource(formData, answerFormData);

  // Called to sumbit the form data to the server
  function submit(e: SubmitEvent) {
    e.preventDefault();
    setErrors(null);
    const data = new FormData(e.currentTarget as HTMLFormElement);
    data.append("post_id", post_id);
    const result = answerSchema.safeParse(data);
    // Handle errors
    if (!result.success) {
      const errors = result.error.flatten();
      setErrors(errors);
    }
    setFormData(data);
  }

  // HTML for the form
  return (
    <form onSubmit={submit} class="mt-4 flex flex-col gap-2">
      <label class="font-medium text-zinc-800" for="question">
        Respond to the Question:
      </label>
      <textarea
        id="answer_content"
        name="answer_content"
        rows={6}
        class="block w-full mt-1 rounded-md text-zinc-700 border border-zinc-300 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white"
      />
      <button type="submit"
      disabled={response.loading}
          class="bg-pink-500 py-1.5 rounded-md mt-1 text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pink-600"
          >
        Post
      </button>
    </form>
  );
}
