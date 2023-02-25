# Library Seat Reservation System

## Setup

Make sure the following packages or equivalent are installed:

- php8.1
- php8.1-curl
- php8.1-mysql
- php8.1-xml
- composer
- docker
- docker-compose

For WSL system, install Docker Desktop and make sure WSL2 integeration has been enabled.

It is recommended that you add `sail` to your shell shortcut, shown [here](https://laravel.com/docs/9.x/sail#configuring-a-bash-alias).

For initial cloning, do the following:

- `composer install`
- `cp .env.example .env` (do not use in active deployment)
- `sail artisan key:generate`
- `sail artisan migrate`

If `sail artisan` fails, you may need to first run `sail up -d` once.

To setup the corresponding react environment, do the following:

- `sail bash`
- `npm ci`
- `npm run dev`

## Running the app

Run by doing `sail up -d`.

If for some reason you need to run bash command in the Laravel Docker, do `sail bash`.

## Issues

- When accessing the website via `127.0.0.1` and `localhost`, the session is not shared.

On a browser, `127.0.0.1` and `localhost` are treated as different domains ([source](https://stackoverflow.com/a/10663798)), making domain sharing inherently more difficult. Additionally, the server side also stores the session separately. When the developer accesses the site via `localhost`, they may be able to login, but all subsequently API calls will be treated as unauthenticated. This is a documented behaviour, but there are no plans to resolve this. Please use `127.0.0.1` for all development purpose.
