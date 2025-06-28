# Stage 1: Build the React app
FROM node:22-alpine as build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Stage 2: Serve the build
FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
RUN npm install -g serve
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
