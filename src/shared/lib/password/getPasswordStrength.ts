export const getPasswordStrength = (password: string): number => {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/(?=.*\d)/.test(password)) strength++;
  if (/(?=.*\W)/.test(password)) strength++;
  if (/(?=.*[A-Z])/.test(password)) strength++;
  if (/(?=.*[a-z])/.test(password)) strength++;

  return strength;
};
