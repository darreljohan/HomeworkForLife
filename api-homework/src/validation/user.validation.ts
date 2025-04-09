import { z, ZodType } from "zod";

export class UserValidationService {
  static readonly USER_ACCOUNT: ZodType = z.object({
    email: z.string().email().max(100),
    password: z.string().min(6).max(100),
  });

  static readonly REFRESH_TOKEN: ZodType = z.object({
    refreshToken: z.string(),
  });

  static readonly USER_CONFIG: ZodType = z.object({
    displayName: z.string(),
    birthDate: z.string().datetime(),
    ageExpentancy: z.number().int(),
  });
}
