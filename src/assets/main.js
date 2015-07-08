var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        });

$.getJSON("assets/data.geojson", function(data) {
    var geojson = L.geoJson(data, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup(feature.properties.status);
        }
    });
    var map = L.map('map').fitBounds(geojson.getBounds());
    tiles.addTo(map);
    geojson.addTo(map);
});
