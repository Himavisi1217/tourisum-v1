import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

const containerStyle = {
  width: '100%',
  height: '350px',
  borderRadius: 'var(--border-radius-lg)',
  border: '1.5px solid var(--color-input-border)'
};

// Sri Lanka center
const defaultCenter = { lat: 7.8731, lng: 80.7718 };

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
  styles: [
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#a8d4e6' }] },
    { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#f5f5f0' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
    { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }
  ]
};

const MapPicker = ({ onLocationSelect, selectedLocation, markers = [], zoom = 8, height }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleClick = useCallback((event) => {
    if (!onLocationSelect) return;
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    onLocationSelect({ lat, lng });
  }, [onLocationSelect]);

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div style={{
        ...containerStyle,
        height: height || containerStyle.height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-very-light)',
        color: 'var(--color-muted)',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        <span style={{ fontSize: '2rem' }}>🗺️</span>
        <p style={{ fontSize: '0.9rem', textAlign: 'center', padding: '0 1rem' }}>
          Google Maps API key not configured.<br />
          Add <code>VITE_GOOGLE_MAPS_API_KEY</code> to your .env file.
        </p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div style={{
        ...containerStyle,
        height: height || containerStyle.height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-error-bg)',
        color: 'var(--color-error)'
      }}>
        Failed to load Google Maps
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div style={{
        ...containerStyle,
        height: height || containerStyle.height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-very-light)',
        color: 'var(--color-muted)'
      }}>
        Loading map...
      </div>
    );
  }

  const center = selectedLocation || (markers.length > 0 ? markers[0] : defaultCenter);

  return (
    <GoogleMap
      mapContainerStyle={{ ...containerStyle, height: height || containerStyle.height }}
      center={center}
      zoom={zoom}
      options={mapOptions}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={handleClick}
    >
      {selectedLocation && (
        <Marker
          position={selectedLocation}
          animation={2}
        />
      )}
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={{ lat: marker.lat, lng: marker.lng }}
          label={marker.label || undefined}
          title={marker.title || ''}
        />
      ))}
    </GoogleMap>
  );
};

export default MapPicker;
