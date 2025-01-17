import { getCookie } from "cookies-next";

export function getHeaders(): Headers {
  const headers = new Headers();
  headers.set("Content-type", "application/json");

  return headers;
}

export async function loginUser(email: string, password: string): Promise<any> {
  const input = `${process.env.api}/auth/security/login`;
  const response = await fetch(input, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: getHeaders(),
  });

  if (response.status !== 200) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}

export async function getMe(): Promise<any> {
  const headersBearer = new Headers();
  headersBearer.set("Content-type", "application/json");

  const input = `${process.env.api}/auth/security/me`;
  const response = await fetch(input, {
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
      accept: "application/json",
      "content-type": "application/json",
    },
  });

  if (response.status !== 200) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const json = await response.json();
  return json;
}

export async function disconnect(): Promise<any> {
  const input = `${process.env.api}/auth/security/logout`;
  const response = await fetch(input, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
      accept: "application/json",
      "content-type": "application/json",
    },
  });

  if (response.status !== 200) {
    const error = await response.json();
    throw new Error(error.message);
  }
}

export async function createUser(
  email: string,
  firstname: string,
  lastname: string
): Promise<any> {
  const input = `${process.env.api}/auth/security/register`;
  const response = await fetch(input, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      firstname: firstname,
      lastname: lastname,
    }),
    headers: getHeaders(),
  });

  if (response.status !== 201) {
    const error = await response.json();
    throw new Error(error.message);
  }
}

export async function createAccountant(
  email: string,
  firstname: string,
  lastname: string,
  restaurant: number
): Promise<any> {
  const input = `${process.env.api}/auth/users`;
  const response = await fetch(input, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      firstname: firstname,
      lastname: lastname,
      _role: "6552349a557ee5fa12fbfcdb",
      _restaurant: restaurant,
    }),
    headers: getHeaders(),
  });

  if (response.status !== 201) {
    const error = await response.json();
    throw new Error(error.message);
  }
}

export async function verifyEmail(
  token: string,
  password: string,
  confirmPassword: string
): Promise<any> {
  const input = `${process.env.api}/auth/security/verify?verificationToken=${token}`;
  const response = await fetch(input, {
    method: "POST",
    body: JSON.stringify({
      password: password,
      password_confirm: confirmPassword,
    }),
    headers: getHeaders(),
  });

  if (response.status !== 200) {
    const error = await response.json();
    throw new Error(error.message);
  }
}

export async function sendMailResetPassword(email: string): Promise<any> {
  const input = `${process.env.api}/auth/security/forgot`;
  const response = await fetch(input, {
    method: "POST",
    body: JSON.stringify({
      email: email,
    }),
    headers: getHeaders(),
  });

  if (response.status !== 200) {
    const error = await response.json();
    throw new Error(error.message);
  }
}

export async function resetPassword(
  token: string,
  password: string,
  confirmPassword: string
): Promise<any> {
  const input = `${process.env.api}/auth/security/reset?verificationToken=${token}`;
  const response = await fetch(input, {
    method: "POST",
    body: JSON.stringify({
      password: password,
      password_confirm: confirmPassword,
    }),
    headers: getHeaders(),
  });

  if (response.status !== 200) {
    const error = await response.json();
    throw new Error(error.message);
  }
}
