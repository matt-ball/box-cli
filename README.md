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

## Commands

### Folders

The `folders` command provides comprehensive folder management capabilities:

```bash
# Get folder information
box folders get <folderId>

# Create a new folder
box folders create "My New Folder" --parent <parentId>

# Update folder name or description
box folders update <folderId> --name "New Name" --description "New description"

# Delete a folder
box folders delete <folderId>

# List items in a folder
box folders get-items <folderId>

# Copy a folder
box folders copy <folderId> --parent <destinationParentId> --name "Copy Name"

# Move a folder to a different parent
box folders move <folderId> --parent <newParentId>

# List all folders accessible to you
box folders list-all

# Search for folders by name
box folders search "project"

# Get folder collaborations
box folders get-collaborations <folderId>

# Create a shared link for a folder
box folders share <folderId> --access open
```

## Notes

After some time your access token will expire. You can refresh it by running `box setup` again.
