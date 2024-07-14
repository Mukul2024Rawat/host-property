"use client";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setAddress } from '@/store/slices/formSlice';
import MapComponent from '@/components/host/become-a-host/Map';
import Footer from './Footer';
import Header from './Header';

interface LocationData {
  country: string;
  state: string;
  city: string;
  locality: string;
  nearest_landmark: string;
  postalCode: string;
  lat: number;
  lng: number;
}

const LocationStep = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const dispatch = useDispatch();
  const address = useSelector((state: RootState) => state.form.address);
  const [locationData, setLocationData] = useState<LocationData>({
    country: address.country,
    state: address.state,
    city: address.city,
    locality: address.locality,
    nearest_landmark: address.nearest_landmark,
    postalCode: address.pincode,
    lat: address.latitude,
    lng: address.longitude,
  });

  const handleLocationChange = (data: LocationData) => {
    setLocationData(data);
    dispatch(setAddress({
      country: data.country,
      state: data.state,
      city: data.city,
      locality: data.locality,
      nearest_landmark: data.nearest_landmark,
      pincode: data.postalCode,
      latitude: data.lat,
      longitude: data.lng,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocationData((prev) => ({ ...prev, [name]: value }));
    dispatch(setAddress({ ...address, [name]: value }));
  };

  const isComplete = Object.values(locationData).every(field => field !== '');

  return (
    <div className="flex flex-col h-screen bg-zinc-100">
         <Header />
      <main className="flex-grow overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Where's your place located?</h1>
            <p className="text-gray-600">Your address is only shared with guests after they've made a reservation.</p>
          </div>
          <div className="mb-8 border-2 border-gray-300 rounded-lg overflow-hidden">
            <MapComponent onLocationChange={handleLocationChange} />
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={locationData.country}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                readOnly
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={locationData.state}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                readOnly
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={locationData.city}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="locality" className="block text-sm font-medium text-gray-700 mb-1">Locality</label>
              <input
                type="text"
                id="locality"
                name="locality"
                value={locationData.locality}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="nearest_landmark" className="block text-sm font-medium text-gray-700 mb-1">Nearby Landmark</label>
              <input
                type="text"
                id="nearest_landmark"
                name="nearest_landmark"
                value={locationData.nearest_landmark}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={locationData.postalCode}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="lat" className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
              <input
                type="number"
                id="lat"
                name="lat"
                value={locationData.lat}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                step="0.000001"
                readOnly
              />
            </div>
            <div>
              <label htmlFor="lng" className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
              <input
                type="number"
                id="lng"
                name="lng"
                value={locationData.lng}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                step="0.000001"
                readOnly
              />
            </div>
          </form>
        </div>
      </main>
      <Footer onBack={onBack} onNext={onNext} isNextDisabled={!isComplete} />
    </div>
  );
};

export default LocationStep;