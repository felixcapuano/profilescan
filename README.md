# profilescan

This application is use to quickly gather information on a play in Counter-Strike matchmaking. At this point it redirect you towards [faceitfinder](https://faceitfinder.com). Future change will give you access to more data about the player

## Use

Go on a steam account page :

_e.g. :_ https://steamcommunity.com/profiles/76561198069504185/

then add "**scan**" in the url as following :

https://**scan**steamcommunity.com/profiles/76561198069504185/

It will provide you every useful faceit and steam stats of a steam community account.

## Installation

### Environment variables

`cp .env.example .env`

```
PORT=
REACT_APP_SERVER_PORT=
STEAM_API_KEY=
FACEIT_API_KEY=

REDIS_HOST=
REDIS_PORT=
REDIS_USERNAME=
REDIS_PASSWORD=
REDIS_DATABASE=
```

### Development

`npm install`

`npm run dev-front`

`npm run dev-back`

### Production

`npm run test`

`npm run build`

`npm start`
