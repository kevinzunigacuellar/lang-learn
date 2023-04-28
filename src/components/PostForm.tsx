/** @jsxImportSource solid-js */

import { createSignal, createResource } from "solid-js";
import { postSchema } from "@lib/schemas";
import type { z } from "zod";

type ErrorsT = z.typeToFlattenedError<z.inferFormattedError<typeof postSchema>>;

// Form for submitting a new question
export default function PostForm() {
  const [formData, setFormData] = createSignal<FormData>();
  const [errors, setErrors] = createSignal<ErrorsT>();
  const [response] = createResource(formData, postFormData);

  // Post form for creating a new question
async function postFormData(formData: FormData) {
  const response = await fetch("/api/posts", {
    method: "POST",
    body: formData,
  });

  if (response.redirected) {
    window.location.assign(response.url);
  }
}

  // Called to sumbit the form data to the server
  function submit(e: SubmitEvent) {
    e.preventDefault();
    setErrors();
    const data = new FormData(e.currentTarget as HTMLFormElement);
    const result = postSchema.safeParse(data); // Validate the form data using the schema
    // Handle errors
    if (!result.success) {
      const errors = result.error.flatten() as ErrorsT;
      setErrors(errors);
      return;
    }
    setFormData(data);
  }

  // The HTML for the question form
  return (
    <form onSubmit={submit} class="bg-white p-4 rounded-md max-w-3xl">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col">
          <label class="font-medium text-zinc-800 mb-1" for="question">
            Create a Question:
          </label>
          <textarea
            id="question"
            name="question"
            class="rounded-md text-zinc-700 border border-zinc-300 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white"
          />
        </div>
        <div class="flex flex-col">
          <label class="font-medium text-zinc-800 mb-1" for="difficulty">
            Choose a difficulty:
          </label>
          <select
            class="rounded-md text-zinc-700 border border-zinc-300 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white"
            id="difficulty"
            name="difficulty"
          >
            <option value="Select">Select an Option</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div class="flex flex-col">
          <label class="font-medium text-zinc-800 mb-1" for="topic">
            Choose a topic:
          </label>
          <select
            class="rounded-md text-zinc-700 border border-zinc-300 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white"
            name="topic"
            id="topic"
          >
            <option value="">Select an Option</option>
            <option value="Politics">Politics</option>
            <option value="Philosophy">Philosophy</option>
          </select>
        </div>

        <div class="flex flex-col">
          <label class="font-medium text-zinc-800 mb-1" for="language">
            Choose a language:
          </label>
          <select
            class="rounded-md text-zinc-700 border border-zinc-300 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white"
            name="language"
            id="language"
          >
            <option value="">Select an Option</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="English">English</option>
          </select>
        </div>
        <button
          class="bg-pink-500 py-1.5 rounded-md mt-1 text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pink-600"
          type="submit"
          disabled={response.loading}
        >
          Post
        </button>
      </div>
    </form>
  );
}
