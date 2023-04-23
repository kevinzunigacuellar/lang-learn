import { Suspense, createSignal, createResource, Show } from "solid-js";
import { answerSchema } from "../lib/schemas";
import "./style.css"

async function answerFormData(formData: FormData) {
  const response = await fetch("/api/answer", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
}

export default function AnswerForm({post_id}) {
  const [formData, setFormData] = createSignal<FormData>();
  const [errors, setErrors] = createSignal();
  const [response] = createResource(formData, answerFormData);

  function submit(e: SubmitEvent) {
    e.preventDefault();
    setErrors(null);
    const data = new FormData(e.currentTarget as HTMLFormElement);
    data.append("post_id", post_id)
    const result = answerSchema.safeParse(data);
    console.log(result);
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
