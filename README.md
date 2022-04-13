# Library Seat Reservation System

## Setup

Make sure the following packages or equivalent are installed:

-   php8.1
-   php8.1-curl
-   php8.1-mysql
-   php8.1-xml
-   composer
-   docker
-   docker-compose

For WSL system, install Docker Desktop and make sure WSL2 integeration has been enabled.

It is recommended that you add `sail` to your shell shortcut, shown [here](https://laravel.com/docs/9.x/sail#configuring-a-bash-alias).

For initial cloning, do the following:

-   `composer install`
-   `cp .env.example .env` (do not use in active deployment)
-   `sail artisan key:generate`

If `sail artisan` fails, you may need to first run it once.

To setup the corresponding react environment, do the following:

-  `sail bash`
-  `npm install`
-  `npm run dev`

## Running the app

Run by doing `sail up -d`.

If for some reason, you need to run bash command in the Laravel Docker, do `sail bash`.
