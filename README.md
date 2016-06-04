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


## Todo
* Open Google Maps when notification is clicked
* Geofencing, only allow notifications inside the building
* Rate limiting
* Admin panel
* Native apps? Would be pretty easy
* Beacon integration? Are those a thing in webland?
