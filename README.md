# Gestion de projet / Equipe 4 / Time2Bee


FRISSON Pierre-Alexandre / SUBLET Tom / BLOT Tristan / TOUBON Julien / WILT Lilian

# Time2Bee server

## Accès panneau de config :

https://oxypomme.fr/time2bee/

## Developpement

```sh
cd server
npm i
npm run dev
```

## Production

```sh
cd server
npm ci --production
npm run start
```

## Deployement

```sh
cd server
docker build --pull --rm -f "Dockerfile" -t time2bee:latest .
docker run -p 8083:3000 -d time2bee
```

# Time2Bee client

## Development

```sh
cd app
npm i
npm run dev
```

## Tests

```sh
cd app
npm i
npm run start:android # Nécéssite Android Studio
# ou
npm run start:ios # Nécéssite XCode
```

## Production

```sh
cd app
npm i
npm run build:production
```
