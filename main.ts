#!/usr/bin/env -S npx tsx

import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import dotenv from "dotenv";
import sampleSize from "lodash.samplesize";
import { program } from "commander";
import { getNotionAccessToken } from "./notion-auth";

dotenv.config();

interface PickRandomItemsOptions {
  notionApiKey: string;
  databaseId: string;
  count: number;
}

async function pickRandomItemsFromNotionDatabase({
  notionApiKey,
  databaseId,
  count,
}: PickRandomItemsOptions) {
  const notion = new Client({ auth: notionApiKey });
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  const items = response.results as PageObjectResponse[];

  return sampleSize(items, count);
}

async function main() {
  program
    .requiredOption(
      "-n, --count <number>",
      "Number of random items to pick",
      parseInt,
      3
    )
    .requiredOption(
      "-d, --database-id <string>",
      "Notion database ID",
      process.env.NOTION_DATABASE_ID
    )
    .requiredOption(
      "-k, --notion-api-key <string>",
      "Notion API key",
      await getNotionAccessToken({
        clientId: process.env.NOTION_OAUTH_CLIENT_ID,
        clientSecret: process.env.NOTION_OAUTH_CLIENT_SECRET,
      })
    )
    .parse();

  const { count, databaseId, notionApiKey } =
    program.opts<PickRandomItemsOptions>();

  const items = await pickRandomItemsFromNotionDatabase({
    notionApiKey,
    databaseId,
    count,
  });

  for (const item of items) {
    if (item.properties.Name.type !== "title") {
      throw new Error("Name is not a title");
    }

    const name = item.properties.Name.title[0].plain_text;
    const url = item.url;

    console.log(`[${name}](${url})`);
  }
}

main();
