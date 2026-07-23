# Peer Talk

A web app for peer-to-peer text and voice communication, featuring collaborative apps that can be used whilst in a call.

## Setup

1. Install [PNPM](https://pnpm.io/installation).
2. Run `pnpm i` to install dependencies.
3. Run `pnpm run dev --host`.

### Nix Flake

Nix users can run `nix develop` to use the provided development flake, or if `nix-direnv` is installed, run `direnv allow`.

## Testing

1. Run `pnpm exec playwright install chromium`.
2. Run `pnpm run test`

## Contributing an App to the App Marketplace

The app features a marketplace of iframe applications that can be used to collaborate with other users in the call.

### Requirements

For an app to be added to the marketplace, it must fulfil the following:

- Must be open-source.
- Must be actively maintained.
- Must be able to collaborate on it in real time.
- Must be able to create a room within the app by providing the URL with a UUID (e.g. in Peer Talk, you can create a room by appending a UUID to `peer-talk.williamwatson.dev/room/`).

### Contributing To `apps.json`

1. Fork the repository and create a branch with the app name.
2. Add the `id`, `title` and `url` to `src/apps.json`, ensuring that the supplied URL will create a room in the app after appending it with a UUID.
3. Run Peer Talk locally within two separate browser instances (open one as a private window) and connect them to the same room, ensure that the collaboration features of the app still works and everything functions as it should.
4. Commit the change with the following title `feat(apps): add APP_NAME`, replacing APP_NAME with the app name.
5. Create a pull request with the same title as the commit.

## Acknowledgements

- The SVGs are from [Remix Icon](https://remixicon.com) and [Feather](https://feathericons.com/).
- [Catppuccin](https://catppuccin.com/) for the colorscheme.
