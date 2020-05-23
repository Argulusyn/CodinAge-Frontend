import client from "@/api/client.js";

const registerUser = registrationData =>
  client.post("/authentication/register", registrationData);

const loginUser = loginData => client.post("/authentication/login", loginData);

export { registerUser, loginUser };
