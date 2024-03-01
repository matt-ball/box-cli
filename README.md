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

## Notes

After some time your access token will expire. You can refresh it by running `box setup` again.
