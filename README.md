## Development guide

```sh
# install dependencies
npm install

# start local dev server
npm run serve
```

## Run as a docker image

```
# build
docker build -t vite-explorer .

# run
docker run -p 80:80 --rm vite-explorer
```
