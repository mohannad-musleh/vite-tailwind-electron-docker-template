ARG NODE_VERSION=14.15.4
FROM node:$NODE_VERSION

# Install system dependencies required to electron js & x11docker
RUN apt-get update \
     && export DEBIAN_FRONTEND=noninteractive \
     && apt-get install -yq \
     libnss3 libatk-bridge2.0-0 libgtk-3.0 libasound2 mesa-utils mesa-utils-extra \
     libxv1 va-driver-all locales libcups2 libpulse0 dbus \
     libnotify-bin libnotify-dev libnotify4 \
     && rm -rf /var/lib/apt/lists/*

# Create yarn caching & app root directories (node_modules created to the owner)
RUN mkdir -p /usr/src/app-cache/.yarn && mkdir -p /usr/src/app/node_modules

# Change the app and app cache directories owner to 'node' user
RUN chown -R node:node /usr/src/app /usr/src/app-cache

WORKDIR /usr/src/app

USER node

RUN echo "yarn config set cache-folder /usr/src/app-cache/.yarn" >> "$HOME/.bashrc" && \
     echo "yarn config set cache-folder /usr/src/app-cache/.yarn" >> "$HOME/.profile"

####### Add notification demon start command in ~/.bashrc & ~/.profile  #######

## Uncomment these lines when using electron Notification class, or any other OS notifications package
# RUN echo "/usr/lib/notification-daemon/notification-daemon > /dev/null 2>&1 &" >> "$HOME/.bashrc" && \
#      echo "/usr/lib/notification-daemon/notification-daemon > /dev/null 2>&1 &" >> "$HOME/.profile"
