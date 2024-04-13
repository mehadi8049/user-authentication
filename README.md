

## About User Authentication

It is a user authentication web application. The application has built with backend laravel API and frontend reactJs.

## Need for Laravel (Backend)

To begin with, You need to clone project and entry into backend and run:
```sh
composer install
```

```sh
cp .env.example .env
```
```php
php artisan key:generate
```

```sh
php artisan migrate
```

```sh
php artisan passport:install
```

## Need for ReactJS (Frontend)

To begin with, You need to entry into fronend and must be create .env file and set:
```sh
APP_REACT_API_BASE_URL= base_url/api
```
Example:APP_REACT_API_BASE_URL=http://127.0.0.1:8000/api

Run this command:
```sh
npm install
```
