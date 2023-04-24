import { createSignal, createResource, Show } from "solid-js";
import { correctionSchema } from "../lib/schemas";
import "./style.css"

// Server request that submits a user's correction to a response
async function correctionFormData(formData: FormData) {
    const response = await fetch("/api/correction", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  }

// Form for submitting a correction to a response
export default function CorrectionForm({response_id}) { // post_id is passed in from the documentId in the question page
    // Create a signal for the form data and errors
    const [formData, setFormData] = createSignal<FormData>();
    const [errors, setErrors] = createSignal();
    const [response] = createResource(formData, correctionFormData);
  
    // Called to sumbit the form data to the server
    function submit(e: SubmitEvent) {
      e.preventDefault();
      setErrors(null);
      const data = new FormData(e.currentTarget as HTMLFormElement);
      const result = correctionSchema.safeParse(data);
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
          <label class="selector-label" for="correction">
            Correct the reponse: 
          </label>
          <textarea
            id="correction_content"
            name="correction_content"
            rows={6}
            class="block w-full mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          >
            {/* todo: auto populate the user's reponse in the correction */}
            {/* {response?.post.answer_content} */}
            </textarea>
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