import { z } from 'zod'

export const Domain_Company_Data = {
    corporate_reason: z.string(),
    corporate_CNPJ: z.string(),
    corporate_email: z.string(),
    corporate_country: z.string(),
    corporate_state: z.string(),
    corporate_city: z.string(),
    corporate_street: z.string(),
    corporate_website_link: z.string()
}