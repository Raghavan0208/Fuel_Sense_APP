import axios from 'axios';

export const getAddressFromLatLng = async (latitude, longitude) => {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyClEJhfMqEtTy6dcofhkDL1RvfhVTO2wss';
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_APIKEY}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === 'OK') {
      const address = response.data.results[0].formatted_address;
      return address;
    } else {
      throw new Error('Failed to get address');
    }
  } catch (error) {
    console.error('Error fetching address:', error);
    return null;
  }
};
