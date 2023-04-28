/** @jsxImportSource solid-js */

import { createSignal, createResource } from "solid-js";
import { correctionSchema } from "@lib/schemas";

// Server request that submits a user's correction to a response
async function correctionFormData(formData: FormData) {
  const response = await fetch("/api/correction", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to submit correction");
  if (response.redirected) {
    window.location.assign(response.url);
  }
  const data = await response.json();
  return data;
}

// Form for submitting a correction to a response
export default function CorrectionForm({ response_id, response_content } : { response_id?: string, response_content?: string }) {
  // post_id is passed in from the documentId in the question page
  // Create a signal for the form data and errors
  const [formData, setFormData] = createSignal<FormData>();
  const [errors, setErrors] = createSignal();
  const [response] = createResource(formData, correctionFormData);

  // Called to sumbit the form data to the server
  function submit(e: SubmitEvent) {
    if (!response_id) return;
    e.preventDefault();
    setErrors(null);
    const data = new FormData(e.currentTarget as HTMLFormElement);
    data.append("response_id", response_id);
    const result = correctionSchema.safeParse(data);
    // Handle errors
    if (!result.success) {
      const errors = result.error.flatten();
      setErrors(errors);
    }
    setFormData(data);
  }

  return (
    <form onSubmit={submit}>
        <div class="flex flex-col mt-4 gap-3 p-2">
          <div class="flex flex-col">
          <label class="font-medium text-zinc-800 mb-1" for="correction">
            Correct the reponse:
          </label>
          <textarea
            id="correction_content"
            name="correction_content"
            value={response_content}
            rows={4}
            class="block w-full rounded-md text-zinc-700 border border-zinc-300 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white"
          >
          </textarea>
          </div>
        <button type="submit" 
          class="bg-pink-500 py-1.5 rounded-md mt-1 text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pink-600"
          >
          Post
        </button>
      </div>
    </form>
  );
}
