FROM php:8.2-apache

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install php extensions
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install zip

# Install pdo_mysql
RUN docker-php-ext-install pdo_mysql 

# Set working directory
WORKDIR /internme/backend

# Copy current directory to working directory
COPY . .

# Install dependencies
RUN composer install

# Start server
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"] 
