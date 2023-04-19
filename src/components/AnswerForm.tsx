import { Suspense, createSignal, createResource, Show } from "solid-js";
import { answerSchema } from "../lib/schemas";

// Server request that submits a user's answer to a question
async function answerFormData(formData: FormData) {
  const response = await fetch("/api/answer", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
}

// Form for submitting an answer to a question
export default function AnswerForm({post_id}) { // post_id is passed in from the documentId in the question page
  // Create a signal for the form data and errors
  const [formData, setFormData] = createSignal<FormData>();
  const [errors, setErrors] = createSignal();
  const [response] = createResource(formData, answerFormData);

  // Called to sumbit the form data to the server
  function submit(e: SubmitEvent) {
    e.preventDefault();
    setErrors(null);
    const data = new FormData(e.currentTarget as HTMLFormElement);
    data.append("post_id", post_id)
    const result = answerSchema.safeParse(data);
    console.log(result);
    // Handle errors
    if (!result.success) {
      const errors = result.error.flatten();
      setErrors(errors);
      console.log(errors);
    }
    // else, submit the form data to the server
    setFormData(data);
  }
  
  // The HTML for the question response form
  return (
    <form onSubmit={submit}>
      <div class="flex-container">
        <div class="input">
          <label class="selector-label" for="question">
            Respond to the Question: 
          </label>
          <input type="text" id="answer_content" name="answer_content">
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
