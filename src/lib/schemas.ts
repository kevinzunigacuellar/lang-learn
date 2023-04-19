// These schemas are used to validate the data sent to the server, ensuring that the data is of the correct format so that our 
// database doesn't get corrupted. This is for securtiy of our database and to ensure that the data is in the correct format.
import { zfd } from "zod-form-data";
import { z } from "zod";

// validate data sent for creating a new post
export const postSchema = zfd.formData({
  question: zfd.text(z.string().min(5).max(255)),
  difficulty: zfd.text(z.enum(["Easy", "Medium", "Hard"])),
  topic: zfd.text(z.enum(["Politics", "Daily Life", "Philosophy"])),
  language: zfd.text(z.enum(["Spanish", "French", "English"])),
});

// validate data sent for creating a new answer/response to a post
export const answerSchema = zfd.formData({
  answer_content: zfd.text(z.string().min(0).max(255)),
  post_id: zfd.text(z.string().min(5).max(255))
});

// validate user passwords
const userPasswordSchema = z.object({
  email: zfd.text(z.string().email()),
  password: zfd.text(
    z.string().min(8, "Password must be at least 8 characters long")
  ),
});

// validate fields for a new user registering
const register = userPasswordSchema
  .extend({
    name: zfd.text(z.string().min(2, "Name must be at least 2 character long")),
    username: zfd.text(z.string().min(2, "Username must be at least 2 character long")),
    targetLanguage: zfd.text(z.string().min(2, "Target Language must be at least 2 character long")),
    confirmPassword: zfd.text(
      z.string().min(8, "Password must be at least 8 characters long")
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = zfd.formData(userPasswordSchema);
export const registerSchema = zfd.formData(register);
