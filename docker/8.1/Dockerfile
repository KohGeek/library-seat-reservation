FROM ubuntu:22.04

LABEL maintainer="Taylor Otwell"

ARG WWWGROUP
ARG NODE_VERSION=16

WORKDIR /var/www/html

ENV DEBIAN_FRONTEND noninteractive
ENV TZ=UTC

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN echo 'deb http://ossmirror.mycloud.services/os/linux/ubuntu/ jammy main' > /etc/apt/sources.list \
    && echo 'deb http://ossmirror.mycloud.services/os/linux/ubuntu/ jammy multiverse' >> /etc/apt/sources.list \
    && echo 'deb http://ossmirror.mycloud.services/os/linux/ubuntu/ jammy restricted' >> /etc/apt/sources.list \
    && echo 'deb http://ossmirror.mycloud.services/os/linux/ubuntu/ jammy universe' >> /etc/apt/sources.list \
    && echo 'deb http://ossmirror.mycloud.services/os/linux/ubuntu/ jammy-updates main' >> /etc/apt/sources.list \
    && echo 'deb http://ossmirror.mycloud.services/os/linux/ubuntu/ jammy-updates multiverse' >> /etc/apt/sources.list \
    && echo 'deb http://ossmirror.mycloud.services/os/linux/ubuntu/ jammy-updates restricted' >> /etc/apt/sources.list \
    && echo 'deb http://ossmirror.mycloud.services/os/linux/ubuntu/ jammy-updates universe' >> /etc/apt/sources.list \
    && apt-get update \
    && apt-get install -y software-properties-common \
    && add-apt-repository ppa:apt-fast/stable \
    && apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y apt-fast \
    && echo debconf apt-fast/maxdownloads string 16 | debconf-set-selections \
    && echo debconf apt-fast/dlflag boolean true | debconf-set-selections \
    && echo debconf apt-fast/aptmanager string apt-get | debconf-set-selections \
    && apt-fast install -y gnupg gosu curl ca-certificates zip unzip git supervisor sqlite3 libcap2-bin libpng-dev python2 \
    && mkdir -p ~/.gnupg \
    && chmod 600 ~/.gnupg \
    && echo "disable-ipv6" >> ~/.gnupg/dirmngr.conf \
    && apt-key adv --homedir ~/.gnupg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys E5267A6C \
    && apt-key adv --homedir ~/.gnupg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C300EE8C \
    && add-apt-repository ppa:ondrej/php \
    && apt-fast update \
    && apt-fast install -y php8.1-cli php8.1 \
       php8.1-pgsql php8.1-sqlite3 php8.1-gd \
       php8.1-curl \
       php8.1-imap php8.1-mysql php8.1-mbstring \
       php8.1-xml php8.1-zip php8.1-bcmath php8.1-soap \
       php8.1-intl php8.1-readline \
       php8.1-ldap \
       php8.1-msgpack php8.1-igbinary php8.1-redis php8.1-swoole \
       php8.1-memcached php8.1-pcov php8.1-xdebug \
    && php -r "readfile('https://getcomposer.org/installer');" | php -- --install-dir=/usr/bin/ --filename=composer \
    && curl -sL https://deb.nodesource.com/setup_$NODE_VERSION.x | bash - \
    && apt-fast install -y nodejs \
    && npm install -g npm \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list \
    && apt-fast update \
    && apt-fast install -y yarn \
    && apt-fast install -y mysql-client \
    && apt-fast install -y postgresql-client \
    && apt-fast -y autoremove \
    && apt-fast clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN setcap "cap_net_bind_service=+ep" /usr/bin/php8.1

RUN groupadd --force -g $WWWGROUP sail
RUN useradd -ms /bin/bash --no-user-group -g $WWWGROUP -u 1337 sail

COPY start-container /usr/local/bin/start-container
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY php.ini /etc/php/8.1/cli/conf.d/99-sail.ini
RUN chmod +x /usr/local/bin/start-container

EXPOSE 8000

ENTRYPOINT ["start-container"]
