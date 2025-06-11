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

## Folders Command

The `folders` command provides comprehensive folder management capabilities:

### Basic Operations
- `box folders get <folderId>` - Get folder information
- `box folders create <name> --parent <parentId>` - Create a new folder
- `box folders update <folderId> --name <newName> --description <description>` - Update folder
- `box folders delete <folderId>` - Delete folder
- `box folders get-items <folderId>` - List items in folder

### Copy and Move
- `box folders copy <folderId> --parent <parentId> --name <newName>` - Copy folder
- `box folders move <folderId> --parent <newParentId>` - Move folder to new parent

### Collaboration Management
- `box folders get-collaborations <folderId>` - Get folder collaborations
- `box folders add-collaboration <folderId> --user <userId> --role <role>` - Add collaboration
- `box folders remove-collaboration <folderId> --collaboration <collaborationId>` - Remove collaboration

#### Collaboration Roles
- `viewer` - Can view and download
- `editor` - Can view, download, and edit
- `uploader` - Can upload files
- `previewer` - Can preview files
- `viewer_uploader` - Can view and upload
- `co-owner` - Can manage folder and collaborations
- `owner` - Full control

## Notes

After some time your access token will expire. You can refresh it by running `box setup` again.
