import { z } from "zod";

export const SocialMediaSchema = z.array(
  z.object({
    label: z.string().min(1, {message: 'Please select social media name'}),
    url: z.string().url({message: "Should be valid url link"})
  })
);

export const DateOfBirthSchema = z.string().refine((value) => {
  const today = new Date();
  const birthDate = new Date(value);
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return (age -1) > 18;
  }
  return age > 18;
}, {message: "You must be at leat 18 years old"});

export const PasswordSchema = z.string()
.min(5, {message: "Password should be at least 5 digits"})
.regex(/[A-Z]/, {message: "Should be at least 1 digit in uppercase"})
.regex(/[0-9]/, {message: "Should be at least 1 number"});
