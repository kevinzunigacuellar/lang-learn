import { Suspense, createSignal, createResource, Show } from "solid-js";
import { answerSchema } from "../lib/schemas";
import "./style.css"

// Server request that submits a user's answer to a question
async function answerFormData(formData: FormData) {
  const response = await fetch("/api/answer", {
    method: "POST",
    body: formData,
  });

  if (response.redirected){
    window.location.assign(response.url);
  }
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
    setFormData(data);
    
  }
  

  // HTML for the form
  return (
    <form onSubmit={submit}>
      <div class="flex-container">
        <div class="input p-4">
          <label class="selector-label" for="question">
            Respond to the Question: 
          </label>
          <textarea
            id="answer_content"
            name="answer_content"
            rows={6}
            class="block w-full mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          />
        </div>
      </div>
      <div class="text-center" style="display: flex; justify-content: center;">
        <button type="submit" class="btn-97">
          Post
        </button>
      </div>
    </form>
  );
}
