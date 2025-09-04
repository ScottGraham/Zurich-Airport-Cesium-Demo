# Zurich Airport - Cesium Demo

A [Cesium](https://cesium.com) demo using [Webpack](https://webpack.js.org/) featuring Switzerland's Zurich Airport.

This demo leverages the [OpenSky Network API](https://openskynetwork.github.io/opensky-api/) to display local aircrafts in geospace, and also visualizes a hypothetical addition to the Zurich Airport Center.

## Running this application

First, you'll need to replace the Cesium access token in index.js with your own access token. This can be found at https://ion.cesium.com/tokens.

Second, you'll need to upload a 3D model of the airport addition to Cesium Ion and replace the asset ID of the airport addition with your own asset ID.

A guide for uploading assets to Cesium Ion can be found here: https://cesium.com/learn/cesiumjs-learn/cesiumjs-interactive-building/

The 3D model I used for the airport addition is located here: https://sketchfab.com/3d-models/386-wabasha-street-north-44123441abb349ba9c1fb6cbdfc52f52

The geocoordinates for the airport addition are: 
* Longitude: 8.5631385151
* Latitude: 47.4492720122
* Height: 490.6627273613
* Heading: -23.4

The 3D model will also need to be scaled down to .01 size.

After the token is replaced and the asset ID is replaced, navigate to the project directory and execute the following commands:
```sh
npm install
npm start
```
Then navigate to `localhost:8080`.

## Building this application

```sh
npm run build
# To run the build
npm run start:built
```