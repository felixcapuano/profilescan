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

Some environments variables a require to start the project. start the project.

```
PORT=
STEAM_API_KEY=
FACEIT_API_KEY=

REDIS_HOST=
REDIS_PORT=
REDIS_USERNAME=
REDIS_PASSWORD=
REDIS_DATABASE=
```

You can use this command to create a example .env file.

`cp .env.example .env`

### Development

1. `npm install`

1. `npm run dev-front`

1. `npm install -g nodemon` \* require to use next command

1. `npm run dev-back`

### Production

1. `npm run test`

1. `npm run build`

1. `npm start`

## License

GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007
