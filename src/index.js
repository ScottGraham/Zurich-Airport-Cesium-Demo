import {
  Cartesian2,
  Cartesian3,
  Cesium3DTileset,
  Color,
  Ion,
  IonGeocodeProviderType,
  JulianDate,
  SkyAtmosphere,
  VerticalOrigin,
  Viewer
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import "./css/main.css";

Ion.defaultAccessToken = "<Replace with your own access token>";

const viewer = new Viewer("cesiumContainer", {
  globe: false,
  skyAtmosphere: new SkyAtmosphere(),
  sceneModePicker: false,
  baseLayerPicker: false,
  geocoder: IonGeocodeProviderType.GOOGLE,
});

// Load Google Photorealistic 3D Tiles from Cesium Ion
try {
  const tileset = await Cesium3DTileset.fromIonAssetId(2275207);
  viewer.scene.primitives.add(tileset);
} catch (error) {
  console.log(error);
}

viewer.camera.flyTo({
  destination : new Cartesian3(4272089.0326987505, 644863.0339315742, 4677238.759494365),
  orientation : {
      direction : new Cartesian3(0.3807418284592854, -0.8321307054834621, -0.40322964803332084),
      up : new Cartesian3(0.7225230786953327, -0.004411679091236617, 0.6913327258565256),
  },
  duration : 3
});

// Fetch data from OpenSky Network API
fetch('https://opensky-network.org/api/states/all?lamin=45.8389&lomin=5.9962&lamax=47.8229&lomax=10.5226')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    try {
      // Create a point in geospace for each aircraft with callsign as label
      for (const state of data["states"]) {
        const callsign = state[1];
        const longitude = state[5];
        const latitude = state[6];
        var baro_altitude = state[7];

        // Landed aircraft are displaying below the ground, so adding this code here as a quick fix
        if (baro_altitude < 480 || baro_altitude === null) {
          baro_altitude = 480
        }

        viewer.entities.add({
          name: callsign,
          position: Cartesian3.fromDegrees(longitude, latitude, baro_altitude),
          point: {
            pixelSize: 5,
            color: Color.WHITE,
            outlineColor: Color.fromRandom({
              alpha : 1.0
              }),
            outlineWidth: 2,
          },
          label: {
            text: callsign,
            font: "14pt monospace",
            outlineWidth: 2,
            verticalOrigin: VerticalOrigin.BOTTOM,
            pixelOffset: new Cartesian2(0, -9),
          },
        });
      }
    } catch (error) {
      console.error("Error parsing JSON:", error.message);
    }
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

// Load uploaded 3D model of airport addition from Cesium Ion
const airportAdditionTileset = await Cesium3DTileset.fromIonAssetId(/*Replace with your own asset ID*/);
viewer.scene.primitives.add(airportAdditionTileset);
airportAdditionTileset.show = false;

// Setting time to match Google maps lighting in Zurich
viewer.clock.currentTime  = JulianDate.fromDate(new Date(Date.UTC(2025, 8, 4, 9, 37)));

// Toggle the airport addition show property when the button is clicked.
document.querySelector('#toggle-airport-addition').onclick = function() {
  airportAdditionTileset.show = !airportAdditionTileset.show;
};

document.querySelector('#view-airport-center').onclick = function() {
  viewer.camera.flyTo({
    destination : new Cartesian3(4273240.6500694845, 643712.6921567313, 4676058.742346924),
    orientation : {
        direction : new Cartesian3(-0.3032456126538965, -0.9480043445613617, 0.09659120611601274),
        up : new Cartesian3(0.6159300434794835, -0.11765435790178441, 0.7789657461057452),
    },
    duration : 3
  });
};

document.querySelector('#view-runway').onclick = function() {
  viewer.camera.flyTo({
    destination : new Cartesian3(4272089.0326987505, 644863.0339315742, 4677238.759494365),
    orientation : {
        direction : new Cartesian3(0.3807418284592854, -0.8321307054834621, -0.40322964803332084),
        up : new Cartesian3(0.7225230786953327, -0.004411679091236617, 0.6913327258565256),
    },
    duration : 3
  });
};

document.querySelector('#view-airspace').onclick = function() {
  viewer.camera.flyTo({
    destination : new Cartesian3(4244731.6295845825, 701007.6679390412, 4717837.635554468),
    orientation : {
        direction : new Cartesian3(0.41713501464286684, -0.7555289023648862, -0.5051479558012737),
        up : new Cartesian3(0.7519652289055301, -0.025253134600807543, 0.6587188882291803),
    },
    duration : 3
  });
};