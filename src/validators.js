export const validateUser = (data) => {
  const fieldErrors = {};

  if (!data.name) fieldErrors.name = "Name is required.";
  if (!data.email) fieldErrors.email = "Email is required.";

  return {
    isValid: Object.keys(fieldErrors).length === 0,
    fieldErrors,
  };
};
