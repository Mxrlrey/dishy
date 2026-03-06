FROM dunglas/frankenphp:latest

RUN install-php-extensions \
    pcntl \
    bcmath \
    gd \
    intl \
    zip \
    opcache \
    pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app
