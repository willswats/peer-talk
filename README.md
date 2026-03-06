# Peer Talk

A web app for peer-to-peer text and voice communication, featuring collaborative apps that can be used whilst in a call.

## Contributing an App to the App Marketplace

### Requirements

- Must be open-source.
- Must be able to collaborate on it in real time.
- Must be able to create a room within the app by providing the URL with a UUID.

### Contributing

1. Fork the repository and create a branch with the app name
2. Add the `id`, `title` and `url` to `src/apps.json`, ensuring that the supplied URL will create a room in the app after appending it with a UUID.
3. Run Peer Talk locally within two separate browser instances (open one as a private window) and connect them to the same room, ensure that the collaboration features of the app still works and everything functions as it should.
4. Commit the change with the following title `feat(apps): add APP_NAME`, replacing APP_NAME with the app name.
5. Create a pull request with the same title as the commit.

## Setup

1. Install [PNPM](https://pnpm.io/installation).
2. Run `pnpm i` to install dependencies.
3. Run `pnpm run dev --host`.

## Production

```bash
npm build
npm start
```

## Acknowledgements

The SVGs are from [Remix Icon](https://remixicon.com).
