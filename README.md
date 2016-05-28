# food-finder

An app to help you report leftover food in conference rooms after lunch meetings.


## Quickstart

```
DEBUG=food-finder:* npm start
```

## Docker

```
docker build -t food-finder .
docker run -it --rm --name food-finder food-finder
```

## Tech

* Express + Sequelize
* Docker
* WebSockets
* Geolocation API
* Desktop Notifications
* Push notifications
