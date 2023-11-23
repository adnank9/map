import React, { useEffect } from 'react';

const Map = ({ selectedCity, path }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDUgI6QR0bJmD7a7WOpf1E1QHdPc--FiVs&libraries=places`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 20.5937, lng: 78.9629 }, // India (centered)
        zoom: 5,
      });

      new window.google.maps.Marker({
        position: { lat: 17.3850, lng: 78.4867 }, 
        map: map,
        title: 'Hyderabad',
      });

      if (path && path.length > 0) {
        console.log(path,"path")
        const pathCoordinates = path.map(city => ({
          lat: parseFloat(city.lat),
          lng: parseFloat(city.lon),
        }));

        const polyline = new window.google.maps.Polyline({
          path: pathCoordinates,
          geodesic: true,
          strokeColor: '#0800FE', 
          strokeOpacity: 1.0,
          strokeWeight: 3,
        });

        polyline.setMap(map);

        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);

        const waypoints = path.slice(1, -1).map(city => ({
          location: new window.google.maps.LatLng(parseFloat(city.lat), parseFloat(city.lon)),
          stopover: true,
        }));

        const request = {
          origin: new window.google.maps.LatLng(parseFloat(path[0].lat), parseFloat(path[0].lon)),
          destination: new window.google.maps.LatLng(parseFloat(path[path.length - 1].lat), parseFloat(path[path.length - 1].lon)),
          waypoints: waypoints,
          travelMode: window.google.maps.TravelMode.DRIVING,
        };

        directionsService.route(request, (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
          } else {
            console.error(`Directions request failed: ${status}`);
          }
        });
      }
    };

    script.onerror = () => {
      console.error('Error loading Google Maps API.');
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup the script when the component is unmounted
      document.head.removeChild(script);
    };
  }, [selectedCity, path]);

  return <div id="map" style={{ height: '500px' }} />;
};

export default Map;
