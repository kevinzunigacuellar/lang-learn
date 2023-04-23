import { Suspense, createSignal, createResource, Show } from "solid-js";
import { postSchema } from "../lib/schemas";
import "./post-form.css"
import "./style.css"

// Post form for creating a new question
async function postFormData(formData: FormData) {
  const response = await fetch("/api/posts", {
    method: "POST",
    body: formData,
  });
   
  if (response.redirected){
    window.location.assign(response.url);
  }
}

// Form for submitting a new question
export default function PostForm() {
  const [formData, setFormData] = createSignal<FormData>();
  const [errors, setErrors] = createSignal();
  const [response] = createResource(formData, postFormData);

  // Called to sumbit the form data to the server
  function submit(e: SubmitEvent) {
    e.preventDefault();
    setErrors(null);
    const data = new FormData(e.currentTarget as HTMLFormElement);
    const result = postSchema.safeParse(data); // Validate the form data using the schema
    // Handle errors
    if (!result.success) {
      const errors = result.error.flatten();
      setErrors(errors);
      console.log(errors);
    }
    setFormData(data);
    window.location.href = "/..";
  }

  // The HTML for the question form
  return (
    <form onSubmit={submit}>
      <div class="flex-container">
          <label class="selector-label" for="question">Create a Question:</label>
          <input type="text" id="question" name="question">
            {" "}
          </input>


      
        <div class="selection-box">
          <label class="selector-label" for="difficulty">
            Choose a difficulty:
          </label>
          <select class="selection" name="difficulty" id="difficulty">
            <option value="Select">Select an Option</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div class="selection-box">
          <label class="selector-label" for="topic">
            Choose a topic:
          </label>
          <select class="selection" name="topic" id="topic">
            <option value="Select">Select an Option</option>
            <option value="Politics">Politics</option>
            <option value="DailyLife">Daily Life</option>
            <option value="Philosophy">Philosophy</option>
          </select>
        </div>

        <div class="selection-box">
          <label class="selector-label" for="language">
            Choose a langauge:
          </label>
          <select class="selection" name="language" id="language">
            <option value="Select">Select an Option</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="English">English</option>
          </select>
          </div>
      </div>
      <div class = "btn-container">
        <button class="btn-97">Post</button>
      </div>
    </form>
  );
}
