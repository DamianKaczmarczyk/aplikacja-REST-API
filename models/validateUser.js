import Joi from 'joi';

const schemaEmailPassword = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string().min(6),
});

export async function validateUser(email, password) {
  try {
    return await schemaEmailPassword.validateAsync({ email, password });
  } catch (error) {
    return { error: error.message };
  }
}