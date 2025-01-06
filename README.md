[![NPM Version](https://img.shields.io/npm/v/notion-random-pick.svg)](https://www.npmjs.com/package/notion-random-pick)
[![GitHub Repository](https://img.shields.io/badge/github-notion--random--pick-blue.svg)](https://github.com/mathewhany/notion-random-pick)

# Notion Random Pick

A command-line tool to pick random items from a Notion database.

## Installation

```sh
npm install -g notion-random-pick
```

## Usage

Run the command with the required options:

```sh
notion-random-pick --count <number> --database-id <string> --notion-api-key <string>
```

You can also set environment variables to avoid passing options every time:

```env
NOTION_DATABASE_ID=your_database_id
```

### Options

- `-n, --count <number>`: Number of random items to pick (default: 3)
- `-d, --database-id <string>`: Notion database ID
- `-k, --notion-api-key <string>`: Notion API key or access token. Leave empty for authentication in browser.

### Example

```sh
notion-random-pick --count 5 --database-id your_database_id --notion-api-key your_notion_api_key_or_token
```

This will output 5 random items from the specified Notion database.

### Authentication Using Notion OAuth

If you have a Notion integration with OAuth, you can use the `NOTION_OAUTH_CLIENT_ID` and `NOTION_OAUTH_CLIENT_SECRET` environment variables to authenticate, instead of using the API key.

### Aliases

You can add aliases to your zsh configuration file (`~/.zshrc`) for different databases to simplify usage. For example:

```sh
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
