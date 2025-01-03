# Notion Pick Random

A command-line tool to pick random items from a Notion database.

## Installation

```sh
npm install -g notion-pick-random
```

## Usage

Run the command with the required options:

```sh
notion-pick-random --count <number> --database-id <string> --notion-api-key <string>
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
notion-pick-random --count 5 --database-id your_database_id --notion-api-key your_notion_api_key
```

This will output 5 random items from the specified Notion database.

### Aliases

You can add aliases to your zsh configuration file (`~/.zshrc`) for different databases to simplify usage. For example:

```sh
export NOTION_API_KEY=your_notion_api_key
alias pick-work="notion-pick-random --database-id your_work_database_id"
alias pick-personal="notion-pick-random --database-id your_personal_database_id"
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
