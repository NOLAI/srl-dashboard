# SRL Dashboard

The SRL Dashboard is a web interface for viewing self-regulated learning (SRL) information collected while a user writes an essay. It presents learning processes and goals for one or more essay sessions.

This repository contains the Vue frontend. The backend is provided by the separate `srl-api` repository. The dashboard requires a running API whose endpoints are available through the URL configured in `VITE_API_URL`.

## Features

- Look up a user by username.
- Select and compare essay sessions.
- Display cognitive and metacognitive processes on a timeline.
- Show process goals and questionnaire responses.
- Show progress towards product goals.
- Switch between Dutch and English.
- Optionally record interactions with OpenReplay.

## Technology

The dashboard is built with:

- Vue 3 and Vite;
- Vue Router and Vue I18n;
- Vuetify and Tailwind CSS;
- `vue-timeline-chart`;
- OpenReplay for optional interaction tracking.

## Requirements

- a running instance of `srl-api` with access to its required databases and services.
- Docker with Docker Compose.

See the README in the `srl-api` repository for backend installation and configuration instructions.

## Local development

First ensure that the API is running and that its endpoints are accessible. The default local configuration expects the API at `http://localhost/api`.

Create the local environment file:

```sh
cp .env.example .env
```

Build and start the development container:

```sh
docker compose -f docker-compose.dev.yml up --build
```

The source directory is mounted into the container, so Vite reloads the application when files change.

Open `http://localhost:8000/dashboard/` in a browser.

## Configuration

The dashboard uses the following Vite environment variables:

| Variable                       | Description                                                     |
| ------------------------------ | --------------------------------------------------------------- |
| `VITE_SUPPORTED_LOCALES`       | Comma-separated list of available interface locales.            |
| `VITE_DEFAULT_LOCALE`          | Locale used when the user has no stored preference.             |
| `VITE_API_URL`                 | Base URL of the SRL API, including its `/api` prefix.           |
| `VITE_OPENREPLAY_PROJECT_KEY`  | OpenReplay project key. Leave empty to disable tracking.        |
| `VITE_OPENREPLAY_INGEST_POINT` | OpenReplay ingestion endpoint. Leave empty to disable tracking. |

OpenReplay tracking is enabled only when both OpenReplay variables have a value.

## Docker

The production Docker image builds the frontend and serves it with nginx:

```sh
docker build -t srl-dashboard .
docker run --rm -p 8080:80 srl-dashboard
```

Open `http://localhost:8080/dashboard/` in a browser.

The production build uses `.env.production` and expects the API to be available at `/api` on the same host. Route `/api` to the `srl-api` service in the deployment environment.

## Application routes

| Route               | Description                                           |
| ------------------- | ----------------------------------------------------- |
| `/dashboard/signin` | Username entry screen.                                |
| `/dashboard/`       | Essay selector, process timeline and goals dashboard. |
