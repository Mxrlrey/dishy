FROM dunglas/frankenphp:latest

RUN apt-get update && apt-get install -y \
    unzip \
    git \
    curl

RUN install-php-extensions \
    pcntl \
    bcmath \
    gd \
    intl \
    zip \
    opcache \
    pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN mkdir -p /.cache/composer && chown -R 1000:1000 /.cache/composer

WORKDIR /app
