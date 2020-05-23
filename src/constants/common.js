const STORAGE_KEY = "codinage";

const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const VALIDATION_RULES = {
  required: value => !!value || "Required",
  loginLengthMin: value => value.length >= 3 || "Min 3 characters",
  passwordLengthMin: value => value.length >= 8 || "Min 8 characters",
  email: value => EMAIL_REGEXP.test(value) || "Invalid e-mail."
};

const USER_ROLES = {
  USER: "USER",
  MODERATOR: "MODERATOR",
  ADMINISTRATOR: "ADMINISTRATOR"
};

export { STORAGE_KEY, VALIDATION_RULES, USER_ROLES };
