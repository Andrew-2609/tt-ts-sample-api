# BUILD STAGE
FROM node:20.9.0-alpine AS build

# Sets the working directory
WORKDIR /home/app

# Copy the project files necessary to run the project
COPY . .

# RUN STAGE
FROM node:20.9.0-alpine

# Sets a non-root user for the image
RUN addgroup -S user && adduser -S user -G user

# Uses non-root user
USER user

# Sets the working directory
WORKDIR /home/app

# Copies the package.json file from build stage to run stage
COPY --from=build /home/app/package.json ./package.json

# Copies the yarn.lock file from build stage to run stage
COPY --from=build /home/app/yarn.lock ./yarn.lock

# Copies the node_modules directory from build stage to run stage
COPY --from=build /home/app/node_modules/ ./node_modules

# Copies the dist directory file from build stage to run stage
COPY --from=build /home/app/dist/ ./dist

# Starts the application
CMD yarn start