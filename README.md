[![NPM Version](https://img.shields.io/npm/v/notion-random-pick.svg)](https://www.npmjs.com/package/notion-random-pick)
[![GitHub Repository](https://img.shields.io/badge/github-notion--random--pick-blue.svg)](https://github.com/mathewhany/notion-random-pick)

# Notion Random Pick

A command-line tool to pick random items from a Notion database.

## Installation

```sh
npm install -g notion-random-pick
```

### Notion API Integration Setup
- This is not an official published Notion integration
- Without connecting your database to the integration, API access will not work

1. Create a Notion integration:
  - Go to https://www.notion.so/my-integrations
  - Create a new integration
  - Save the Integration Token (API Key)

2. Get Database ID:
  - Open your Notion database in browser
  - Copy the database ID from URL:
    - URL format: `https://www.notion.so/{workspace}/{database_id}?v={view_id}`
    - Database ID is the string between workspace name and "?v"

3. Connect Database with Integration:
  - Open your database in Notion
  - Click on the "..." menu in the top-right corner
  - Select "Add connections"
  - Find and select your integration from the list
  - Click "Confirm" to grant access

## Usage

Run the command with the required options:

```sh
notion-random-pick --count <number> --database-id <string> --notion-api-key <string>
```

You can also set environment variables to avoid passing options every time:

```env
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_database_id
```

### Options

- `-n, --count <number>`: Number of random items to pick (default: 3)
- `-d, --database-id <string>`: Notion database ID
- `-k, --notion-api-key <string>`: Notion API key

### Example

```sh
notion-random-pick --count 5 --database-id your_database_id --notion-api-key your_notion_api_key
```

This will output 5 random items from the specified Notion database.

### Aliases

You can add aliases to your zsh configuration file (`~/.zshrc`) for different databases to simplify usage. For example:

```sh
export NOTION_API_KEY=your_notion_api_key
alias pick-work="notion-random-pick --database-id your_work_database_id"
alias pick-personal="notion-random-pick --database-id your_personal_database_id"
```

After adding the aliases, reload your zsh configuration:

```sh
source ~/.zshrc
```

Now you can use the aliases to pick random items from different databases:

```sh
pick-work --count 5
pick-personal --count 3
```
