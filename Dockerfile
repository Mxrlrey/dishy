FROM dunglas/frankenphp:latest

# Instala dependências do sistema
RUN apt-get update && apt-get install -y \
    unzip \
    git \
    curl \
    libicu-dev

# Instala extensões do PHP
RUN install-php-extensions \
    pcntl \
    bcmath \
    gd \
    intl \
    zip \
    opcache \
    pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Garante que o usuário 1000 possa escrever no cache do composer
RUN mkdir -p /.cache/composer && chown -R 1000:1000 /.cache/composer

WORKDIR /app
