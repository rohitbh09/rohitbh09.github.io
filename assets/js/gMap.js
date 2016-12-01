// Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.

var myLocationMap = "";
var myLocationMapPos = "";
      function initMap() {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            

            myLocationMapPos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            myLocationMap = new google.maps.Map(document.getElementById('map'), {
                  center: myLocationMapPos,
                  zoom: 18,
                  mapTypeId: 'terrain'
                });
            var image = {
                  url: 'assets/img/location_pin.png',
                  // This marker is 20 pixels wide by 32 pixels high.
                  size: new google.maps.Size(20, 32),
                };
            var shape = {
                  coords: [1, 1, 1, 20, 18, 20, 18, 1],
                  type: 'poly'
                }
            var marker = new google.maps.Marker({
              position: myLocationMapPos,
              map: myLocationMap,
              shape: shape,
            });
          }, function() {
            handleLocationError(true, marker, myLocationMap.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, marker, myLocationMap.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, marker, pos) {
        marker.setPosition(pos);
        marker.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }

function getNames( Type ) {
  // body...
  function callback(results, status) {
     if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        console.log(results[i].name);
      }
    }
  }
   var request = {
      location: myLocationMapPos,
      radius: '500',
      query: Type
    };
  service = new google.maps.places.PlacesService(myLocationMap);
  service.textSearch(request, callback);
}