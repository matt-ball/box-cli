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

## Available Commands

### Folder Commands

The CLI provides comprehensive folder management capabilities:

#### Basic Operations
- `box folders get <folderId>` - Get folder information
- `box folders create <name> --parent <parentId>` - Create a new folder
- `box folders update <folderId> --name <name> --description <description>` - Update folder name/description
- `box folders delete <folderId>` - Delete folder
- `box folders get-items <folderId>` - List items in folder
- `box folders copy <folderId> --parent <parentId> --name <name>` - Copy folder

#### Advanced Operations
- `box folders move <folderId> --parent <parentId>` - Move folder to different parent
- `box folders restore <folderId> --parent <parentId> --name <name>` - Restore folder from trash

#### Sharing & Collaboration
- `box folders share <folderId> --access <level> --password <password>` - Create shared link
  - Access levels: `open`, `company`, `collaborators`
  - Optional: `--can-download`, `--can-preview`, `--can-edit` flags
- `box folders unshare <folderId>` - Remove shared link
- `box folders collaborate <folderId> --email <email> --role <role>` - Add collaborator
  - Roles: `viewer`, `previewer`, `uploader`, `previewer_uploader`, `viewer_uploader`, `co-owner`, `editor`
- `box folders collaborations <folderId>` - List folder collaborations

#### Watermarks
- `box folders watermark <folderId>` - Apply watermark to folder
- `box folders remove-watermark <folderId>` - Remove watermark from folder

#### Metadata
- `box folders get-metadata <folderId> --scope <scope> --template <template>` - Get metadata
- `box folders set-metadata <folderId> --metadata <json>` - Set metadata
- `box folders update-metadata <folderId> --operations <json>` - Update metadata
- `box folders delete-metadata <folderId>` - Delete metadata

### Examples

```bash
# Create a new folder
box folders create "My Documents" --parent 0

# Move a folder to a different location
box folders move 12345 --parent 67890

# Share a folder with password protection
box folders share 12345 --access company --password mypassword --can-download true

# Add a collaborator with editor permissions
box folders collaborate 12345 --email user@example.com --role editor

# Apply watermark to a folder
box folders watermark 12345

# Set custom metadata
box folders set-metadata 12345 --metadata '{"department": "Engineering", "project": "Q1-2024"}'
```

## Notes

After some time your access token will expire. You can refresh it by running `box setup` again.
