import { Suspense, createSignal, createResource, Show } from "solid-js";
import { postSchema } from "../lib/schemas";
import "./post-form.css"

async function postFormData(formData: FormData) {
  const response = await fetch("/api/posts", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
}

export default function PostForm() {
  const [formData, setFormData] = createSignal<FormData>();
  const [errors, setErrors] = createSignal();
  const [response] = createResource(formData, postFormData);

  function submit(e: SubmitEvent) {
    e.preventDefault();
    setErrors(null);
    const data = new FormData(e.currentTarget as HTMLFormElement);
    const result = postSchema.safeParse(data);
    if (!result.success) {
      const errors = result.error.flatten();
      setErrors(errors);
      console.log(errors);
    }
    setFormData(data);
  }

  return (
    <form onSubmit={submit}>
      <div class="input">
        <label class="selector-label" for="quesion">
          Type a Question:
        </label>
        <input type="text" id="question" name="question" />
      </div>

      <div class="flex-container">
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
      <button type="submit" class="post-button">
        Post
      </button>
    </form>
  );
}
