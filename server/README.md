# Time2Bee server

## Accès panneau de config :

https://oxypomme.fr/time2bee/

## Developpement

```sh
npm i
npm run dev
```

## Production

```sh
npm ci --production
npm run start
```

## Deployement

```sh
docker build --pull --rm -f "Dockerfile" -t time2bee:latest .
docker run -p 8083:3000 -d time2bee
```
