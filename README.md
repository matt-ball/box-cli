# Box CLI

The beginnings of a CLI for use with [Box](https://box.com).

## Pre-reqs

1. If you do not already have a Box account, [create one for free](https://account.box.com/signup/personal?tc=annual)

1. Create a 'Custom App' in the [Box Developer Console](https://app.box.com/developers/console) with whatever information you like

2. Configure your app to use 'OAuth 2.0 (User or Client Authentication)'

3. Set the 'OAuth 2.0 Redirect URI' to `http://localhost:3000/oauth`

4. Under 'Application Scopes', check 'Write all files and folders stored in Box'

## Install

1. Fork/clone this repo and `cd` into it

2. Run `npm install`

3. Run `npm link` such that the `box` command is available in your path

## Configure

1. Run `box setup` to configure your Box CLI

2. Run `box user` to see if you are authenticated

## Test it out

1. Run `box file upload <~/path/to/file.pdf> --folder 0` to upload a file to the root folder of your Box account

## Folders Commands

The CLI includes comprehensive folder management commands:

### Basic Operations
- `box folders get <folderId>` - Get folder information
- `box folders create <name> --parent <parentId>` - Create a new folder
- `box folders update <folderId> --name <newName>` - Update folder name/description
- `box folders delete <folderId>` - Delete a folder
- `box folders get-items <folderId>` - List items in a folder

### Advanced Operations
- `box folders copy <folderId> --parent <parentId> --name <newName>` - Copy folder to new location
- `box folders move <folderId> --parent <parentId>` - Move folder to different parent
- `box folders share <folderId> --access <open|company|collaborators> --password <password>` - Create/update shared link
- `box folders add-collaboration <folderId> --email <email> --role <viewer|editor|co-owner>` - Add collaborator
- `box folders list-collaborations <folderId>` - List folder collaborations

### Examples
```bash
# Create a new folder in root
box folders create "My Documents" --parent 0

# Move folder to different parent
box folders move 123456789 --parent 987654321

# Share folder with public link
box folders share 123456789 --access open

# Add collaborator with editor access
box folders add-collaboration 123456789 --email user@example.com --role editor

# List all collaborators on folder
box folders list-collaborations 123456789
```

## Notes

After some time your access token will expire. You can refresh it by running `box setup` again.
