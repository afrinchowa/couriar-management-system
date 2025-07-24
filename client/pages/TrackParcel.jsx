import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import api from '../services/api';

export default function TrackParcel({ parcelId }) {
  const [location, setLocation] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY"
  });

  useEffect(() => {
    const fetchLocation = async () => {
      const res = await api.get(`/parcels/${parcelId}`);
      setLocation(res.data.currentLocation);
    };

    fetchLocation();

    const interval = setInterval(fetchLocation, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, [parcelId]);

  if (!isLoaded || !location) return <div>Loading map...</div>;

  return (
    <GoogleMap
      center={location}
      zoom={12}
      mapContainerStyle={{ width: '100%', height: '400px' }}
    >
      <Marker position={location} />
    </GoogleMap>
  );
}
