# Peer Talk

A web application for peer-to-peer text and voice communication with an open marketplace of embedded single page applications.

## Setup

1. Install [PNPM](https://pnpm.io/installation).
2. Create a [Metered](https://dashboard.metered.ca) account and then create a TURN server.
3. Create a `.env.local` file.
4. Insert the Metered username and password for the TURN server into the `.env.local` file, where the key for the username is `METERED_USERNAME` and the key for the password is `METERED_CREDENTIAL`.
5. Run `pnpm run dev --host`
