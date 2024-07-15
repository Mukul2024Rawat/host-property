"use client"
import type { NextPage } from 'next';

import Head from 'next/head';
import { useEffect, useState } from 'react';
import Sidebar from '../../../components/host/Sidebar';
import Header from '../../../components/host/Header';
import PropertyDetailsModal from '../../../components/host/PropertyDetailsModal';
import { api } from '@/api/index';
import { Property } from '@/types/propertyDetail';

const Listings: NextPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.get('/property/host', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = response.data;
        if (Array.isArray(data)) {
          setProperties(data);
        } else {
          console.error('Unexpected response data:', data);
          setProperties([]);
        }
      } catch (error) {
        console.error('Error fetching properties', error);
        setProperties([]);
      }
    };

    fetchProperties();
  }, []);

  const handleViewDetails = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Head>
        <title>My Listings</title>
        <meta name="description" content="Air nb Host Listings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">My Listings</h1>
          {properties.length > 0 ? (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2">Property ID</th>
                  <th className="py-2">Title</th>
                  <th className="py-2">Subtitle</th>
                  <th className="py-2">Address</th>
                  <th className="py-2">Price</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property.id} className="border-t">
                    <td className="py-2">{property.id}</td>
                    <td className="py-2">{property.title}</td>
                    <td className="py-2">{property.subtitle}</td>
                    <td className="py-2">{property.property_address ? `${property.property_address.city}, ${property.property_address.state}, ${property.property_address.country}` : 'N/A'}</td>
                    <td className="py-2">{property.property_price ? property.property_price.price : 'N/A'}</td>
                    <td className="py-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleViewDetails(property)}
                      >
                        👁️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No properties found.</p>
          )}
        </div>
      </div>
      {selectedProperty && (
        <PropertyDetailsModal
          property={selectedProperty}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Listings;
