import React from 'react';
import { Property } from '@/types/propertyDetail';

interface PropertyDetailsModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({ property, isOpen, onClose }) => {
  if (!isOpen) return null;

  const {
    title,
    subtitle,
    description,
    capacity,
    is_booked,
    is_cancellable,
    cancellation_days,
    property_address,
    property_price,
    property_amenities,
    property_images
  } = property;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black opacity-50 fixed inset-0"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-50 max-w-4xl w-full overflow-y-auto max-h-screen">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-2"><strong>Subtitle:</strong> {subtitle}</p>
        <p className="mb-2"><strong>Description:</strong> {description}</p>
        <p className="mb-2"><strong>Capacity:</strong> {capacity}</p>
        <p className="mb-2"><strong>Is Booked:</strong> {is_booked ? 'Yes' : 'No'}</p>
        <p className="mb-2"><strong>Is Cancellable:</strong> {is_cancellable ? 'Yes' : 'No'}</p>
        <p className="mb-2"><strong>Cancellation Days:</strong> {cancellation_days}</p>
        {property_address && (
          <>
            <h3 className="text-xl font-semibold mt-4 mb-2">Address</h3>
            <p className="mb-2">{`${property_address.locality}, ${property_address.city}, ${property_address.state}, ${property_address.country}`}</p>
            <p className="mb-2"><strong>Pincode:</strong> {property_address.pincode}</p>
            <p className="mb-2"><strong>Latitude:</strong> {property_address.latitude}</p>
            <p className="mb-2"><strong>Longitude:</strong> {property_address.longitude}</p>
          </>
        )}
        {property_price && (
          <>
            <h3 className="text-xl font-semibold mt-4 mb-2">Price Details</h3>
            <p className="mb-2"><strong>Price:</strong> {property_price.price}</p>
            <p className="mb-2"><strong>Daily Discount:</strong> {property_price.daily_discount}%</p>
            <p className="mb-2"><strong>Weekly Discount:</strong> {property_price.weekly_discount}%</p>
            <p className="mb-2"><strong>Cleaning Fee:</strong> {property_price.cleaning_fee}</p>
            <p className="mb-2"><strong>Service Fee:</strong> {property_price.service_fee}</p>
            <p className="mb-2"><strong>Tax:</strong> {property_price.tax}</p>
          </>
        )}
        {property_amenities && property_amenities.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mt-4 mb-2">Amenities</h3>
            <ul className="list-disc pl-5">
              {property_amenities.map((amenity) => (
                <li key={amenity.id}>{amenity.amenity.name}</li>
              ))}
            </ul>
          </>
        )}
        {property_images && property_images.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mt-4 mb-2">Images</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {property_images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.image}
                    alt={`Property Image ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                </div>
              ))}
            </div>
          </>
        )}
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PropertyDetailsModal;
