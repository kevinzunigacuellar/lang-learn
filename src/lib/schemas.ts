import { zfd } from "zod-form-data";
import { z } from "zod";

export const loginSchema = zfd.formData({
  username: zfd.text(z.string().min(3).max(20)),
  password: zfd.text(z.string().min(8).max(10)),
});

export const postSchema = zfd.formData({
  question: zfd.text(z.string().min(5).max(255)),
  difficulty: zfd.text(z.enum(["Easy", "Medium", "Hard"])),
  topic: zfd.text(z.enum(["Politics", "Daily Life", "Philosophy"])),
  language: zfd.text(z.enum(["Spanish", "French", "English"])),
});
