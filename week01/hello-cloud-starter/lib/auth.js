export function authenticate(request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Basic ")) {
    return null;
  }

  try {
    const encodedCredentials = authHeader.slice("Basic ".length);
    const decodedCredentials = Buffer.from(
      encodedCredentials,
      "base64",
    ).toString("utf-8");

    const separatorIndex = decodedCredentials.indexOf(":");
    if (separatorIndex === -1) {
      return null;
    }

    const username = decodedCredentials.slice(0, separatorIndex);
    const password = decodedCredentials.slice(separatorIndex + 1);
    const isValidAdmin =
      username === "admin" &&
      password === process.env.ADMIN_PASSWORD;

    if (!isValidAdmin) {
      return null;
    }

    return {
      username,
      role: "admin",
    };
  } catch {
    return null;
  }
}
