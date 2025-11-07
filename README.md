# Peer Talk

A web application for peer-to-peer text and voice communication with an open marketplace of embedded single page applications.

## Setup

1. Install [PNPM](https://pnpm.io/installation).
2. Create a [Metered](https://dashboard.metered.ca/signup?tool=turnserver) account and then create a TURN server.
3. Create a `.env.local` file.
4. Insert the Metered API key for the TURN server into the `.env.local` file, where the key for the username is `VITE_METERED_API_KEY` and the value is the key.
5. Run `pnpm run dev --host`

## Production

```
npm build
npm start
```
