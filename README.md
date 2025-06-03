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

## Folder Commands

The Box CLI provides comprehensive folder management capabilities:

### Basic Operations

```bash
# Get folder information
box folders get <folderId>

# Create a new folder
box folders create "My New Folder" --parent 0

# Update folder name and description
box folders update <folderId> --name "Updated Name" --description "New description"

# Delete a folder
box folders delete <folderId>

# List items in a folder
box folders get-items <folderId>

# Copy a folder
box folders copy <folderId> --parent <destinationFolderId> --name "Copy Name"
```

### Advanced Operations

```bash
# Move folder to a different parent
box folders move <folderId> --parent <newParentId>

# Restore folder from trash
box folders restore <folderId> --parent <parentId> --name "Restored Name"
```

### Sharing & Collaboration

```bash
# Create shared link with access control
box folders share <folderId> --access company --password secret --can-download true

# Remove shared link
box folders unshare <folderId>

# Add collaborator with specific role
box folders collaborate <folderId> --email user@example.com --role editor --can-view-path true

# List folder collaborations
box folders collaborations <folderId>
```

### Watermarks

```bash
# Apply watermark to folder
box folders watermark <folderId>

# Remove watermark from folder
box folders remove-watermark <folderId>
```

### Metadata Management

```bash
# Get metadata from folder
box folders get-metadata <folderId> --scope global --template properties

# Set metadata on folder
box folders set-metadata <folderId> --metadata '{"department": "Engineering", "project": "Box CLI"}'

# Update metadata using JSON Patch operations
box folders update-metadata <folderId> --operations '[{"op": "replace", "path": "/project", "value": "Updated Project"}]'

# Delete metadata from folder
box folders delete-metadata <folderId> --scope global --template properties
```

### Command Options

#### Sharing Access Levels
- `open` - Anyone with the link can access
- `company` - Only people in your company can access
- `collaborators` - Only collaborators can access

#### Collaboration Roles
- `viewer` - Can view and download
- `previewer` - Can preview only
- `uploader` - Can upload files
- `previewer_uploader` - Can preview and upload
- `viewer_uploader` - Can view, download, and upload
- `co-owner` - Can edit and manage
- `editor` - Can edit

## Notes

After some time your access token will expire. You can refresh it by running `box setup` again.
