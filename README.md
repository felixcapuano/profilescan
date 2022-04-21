# profilescan

This application is use to quickly gather information on a play in Counter-Strike matchmaking. At this point it redirect you towards [faceitfinder](https://faceitfinder.com). Future change will give you access to more data about the player

## Use

Go on a steam account page :

_e.g. :_ https://steamcommunity.com/profiles/76561198069504185/

then add "**scan**" in the url as following :

https://**scan**steamcommunity.com/profiles/76561198069504185/

It will provide you every useful faceit and steam stats of a steam community account.

## Development
### Installation

- *Frontend*
1. `git clone https://github.com/felixcapuano/profilescan`
1. `npm install`

- *Backend*
1. `git submodule update --init`
1. `cd profilescan-back`
1. `npm install`
1. `npm install -g nodemon` \* require to use next command

### Setup Environment variables

Some environments variables a require in the backend to start the project. start the project.

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

You can use this command to create a example .env file in the backend submodule.
1. `cd profilescan-back`
1. `cp .env.example .env`

### Start frontend and backend

In the root directory :

- frontend : `npm run dev-front`
- backend : `npm run dev-back`

## Run (Prod)
1. `git clone https://github.com/felixcapuano/profilescan`
1. `git submodule update --init`
1. `npm install`
1. `npm run test`
1. `npm run build`
1. `npm start`


## License

GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007
