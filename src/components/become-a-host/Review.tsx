"use client";
import { api } from "@/api/index";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setPropertyId, resetForm } from "@/store/slices/formSlice";
import { useRouter } from "next/navigation";
import React from "react";
import Header from "./Header";

const ReviewStep = ({ onBack }: { onBack: () => void }) => {
  const dispatch = useDispatch();
  const form = useSelector((state: RootState) => state.form);
  const router = useRouter();

  const handlePublish = async () => {
    try {
      console.log("Form data to be sent:", form);

      // Submit property details first
      const propertyResponse = await api.post("/property", {
        property: form.property,
        rules: form.rules,
        amenities: form.amenities,
        price: form.price,
        address: form.address,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (propertyResponse.status === 200 || propertyResponse.status === 201) {
        const propertyId = propertyResponse.data.id;
        dispatch(setPropertyId(propertyId));

        // Then upload images using the received propertyId
        const formData = new FormData();
        form.images.slice(0, 10).forEach((image) => {
          formData.append("image", image.file);
        });

        const imagesResponse = await api.post(`/property/${propertyId}/images`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (imagesResponse.status === 200 || imagesResponse.status === 201) {
          alert("Data and images published successfully!");
          dispatch(resetForm());
          router.push("/"); // Navigate to another page after successful submission
        } else {
          alert("Failed to upload images.");
        }
      } else {
        alert("Failed to save property details.");
      }
    } catch (error) {
      console.error("Error publishing data", error);
      alert("Failed to publish data.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Review Your Listing</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Property Details</h2>
          <p>Title: {form.property.title}</p>
          <p>Subtitle: {form.property.subtitle}</p>
          <p>Description: {form.property.description}</p>
          <p>Capacity: {form.property.capacity}</p>
          <p>Availability: {form.property.is_available ? "Yes" : "No"}</p>
          <p>Cancellation Policy: {form.property.is_cancellable ? "Yes" : "No"}</p>
          <p>Cancellation Days: {form.property.cancellation_days}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Rules</h2>
          <p>Check-in Time: {form.rules.check_in_time}</p>
          <p>Check-out Time: {form.rules.check_out_time}</p>
          <p>Self Check-in: {form.rules.self_check_in ? "Yes" : "No"}</p>
          <p>No Smoking: {form.rules.no_smoking ? "Yes" : "No"}</p>
          <p>No Parties or Events: {form.rules.no_parties_or_events ? "Yes" : "No"}</p>
          <p>Carbon Monoxide Alarm: {form.rules.carbon_monoxide_alarm ? "Yes" : "No"}</p>
          <p>Smoke Alarm: {form.rules.smoke_alarm ? "Yes" : "No"}</p>
          <p>Security Deposit: {form.rules.security_deposit}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Amenities</h2>
          <ul>
            {form.amenities.map((amenity, index) => (
              <li key={index}>{amenity.amenity_id}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Price Details</h2>
          <p>Price: {form.price.price}</p>
          <p>Daily Discount: {form.price.daily_discount}%</p>
          <p>Weekly Discount: {form.price.weekly_discount}%</p>
          <p>Cleaning Fee: {form.price.cleaning_fee}</p>
          <p>Service Fee: {form.price.service_fee}</p>
          <p>Tax: {form.price.tax}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Address</h2>
          <p>Country: {form.address.country}</p>
          <p>State: {form.address.state}</p>
          <p>City: {form.address.city}</p>
          <p>Locality: {form.address.locality}</p>
          <p>Nearest Landmark: {form.address.nearest_landmark}</p>
          <p>Pincode: {form.address.pincode}</p>
          <p>Latitude: {form.address.latitude}</p>
          <p>Longitude: {form.address.longitude}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {form.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image.preview}
                  alt={`Property Image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button onClick={onBack} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500">
            Back
          </button>
          <button onClick={handlePublish} className="bg-[#DE3151] text-white px-4 py-2 rounded-md hover:bg-[#a0233a]">
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
