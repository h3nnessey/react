export const validatePasswordStrength = (password: string) => {
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*()_+{}|:"<>?~`\-=[\]\\;',./]/.test(password);

  const requirements = {
    hasLowercase,
    hasUppercase,
    hasNumber,
    hasSpecial,
  };

  const isValid = hasLowercase && hasUppercase && hasNumber && hasSpecial;

  const missingRequirements: string[] = [];
  if (!hasLowercase) missingRequirements.push('1 lowercase letter');
  if (!hasUppercase) missingRequirements.push('1 uppercase letter');
  if (!hasNumber) missingRequirements.push('1 number');
  if (!hasSpecial) missingRequirements.push('1 special character');

  const errorMessage =
    missingRequirements.length > 0
      ? `Password must contain: ${missingRequirements.join(', ')}`
      : undefined;

  return {
    isValid,
    errorMessage,
    requirements,
  };
};
