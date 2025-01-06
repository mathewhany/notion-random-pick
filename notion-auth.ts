import fs from "fs";
import { waitForRequest } from "node-temp-server";
import open from "open";

const accessTokenFilePath = `${process.env.HOME}/.notion-access-token`;

async function getNewNotionAccessToken({
  clientId,
  clientSecret,
}: {
  clientId?: string;
  clientSecret?: string;
}) {
  if (!clientId || !clientSecret) {
    throw new Error("Notion Client ID and client secret are required");
  }

  const redirectUri = "https://redirectmeto.com/http://localhost:8080";
  const authorizationUrl =
    "https://api.notion.com/v1/oauth/authorize?" +
    new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      owner: "user",
    });

  await open(authorizationUrl);

  const { query } = await waitForRequest({
    port: 8080,
  });

  const code = query["code"];

  const response = await fetch("https://api.notion.com/v1/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(
        `${clientId}:${clientSecret}`
      ).toString("base64")}`,
    },
    body: JSON.stringify({
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
      code,
    }),
  });

  const responseData = await response.json();

  return responseData.access_token;
}

async function saveNotionAccessToken(accessToken: string) {
  fs.writeFileSync(accessTokenFilePath, accessToken);
}

async function getSavedNotionAccessToken() {
  return fs.readFileSync(accessTokenFilePath, "utf-8");
}

export async function getNotionAccessToken({
  clientId,
  clientSecret,
}: {
  clientId?: string;
  clientSecret?: string;
}) {
  if (fs.existsSync(accessTokenFilePath)) {
    return getSavedNotionAccessToken();
  }

  const accessToken = await getNewNotionAccessToken({ clientId, clientSecret });
  await saveNotionAccessToken(accessToken);
  return accessToken;
}
