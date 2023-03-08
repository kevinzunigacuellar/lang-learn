import { zfd } from "zod-form-data";
import { z } from "zod";

export const loginSchema = zfd.formData({
  username: zfd.text(z.string().min(3).max(20)),
  password: zfd.text(z.string().min(8).max(10)),
});
