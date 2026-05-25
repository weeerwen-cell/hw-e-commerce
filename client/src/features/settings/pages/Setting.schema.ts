import {z} from "zod"

export const SettingSchema = z.object({
firstName: z.string().trim().min(3),
lastName: z.string().trim().min(3),   
username: z.string().trim().min(3),
phone: z.string().trim().regex(/^\d{10,}$/, "Phone must be at least 10 digits"), 
//need to be string and at least 3 letter
email: z.string().email(" invalid input")

})
export type SettingFormValue = z.infer<typeof SettingSchema>