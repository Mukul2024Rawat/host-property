"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setPrice } from "@/store/slices/formSlice";
import Footer from "./Footer";
import Header from "./Header";

const TaxesStep = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const dispatch = useDispatch();
  const priceFromState = useSelector((state: RootState) => state.form.price);
  const [tax, setTax] = useState<number | string>(priceFromState.tax || "");
  const [serviceFee, setServiceFee] = useState<number | string>(priceFromState.service_fee || "");
  const [cleaningFee, setCleaningFee] = useState<number | string>(priceFromState.cleaning_fee || "");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setTax(priceFromState.tax || "");
    setServiceFee(priceFromState.service_fee || "");
    setCleaningFee(priceFromState.cleaning_fee || "");
  }, [priceFromState]);

  const handleTaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!isNaN(Number(value)) && Number(value) >= 0) {
      setTax(value);
      setError("");
    }
  };

  const handleServiceFeeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!isNaN(Number(value)) && Number(value) >= 0) {
      setServiceFee(value);
      setError("");
    }
  };

  const handleCleaningFeeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!isNaN(Number(value)) && Number(value) >= 0) {
      setCleaningFee(value);
      setError("");
    }
  };

  const handleNext = () => {
    dispatch(
      setPrice({
        ...priceFromState,
        tax: Number(tax),
        service_fee: Number(serviceFee),
        cleaning_fee: Number(cleaningFee),
      })
    );
    onNext();
  };

  const isComplete =
    tax !== "" &&
    serviceFee !== "" &&
    cleaningFee !== "" &&
    !isNaN(Number(tax)) &&
    !isNaN(Number(serviceFee)) &&
    !isNaN(Number(cleaningFee));

  return (
    <div className="flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow flex justify-center px-4 py-8 bg-zinc-200">
        <div className="max-w-xl w-full space-y-8 p-8 m-12 h-fit rounded-lg shadow-xl bg-white">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900 py-4">
              Set your taxes and fees
            </h2>
            <p className="mt-2 text-center text-lg text-gray-600">
              Enter the applicable taxes and fees for your property.
            </p>
          </div>
          <div>
            <label
              htmlFor="property-tax"
              className="block text-sm font-medium text-gray-700"
            >
              Tax (%)
            </label>
            <input
              type="number"
              name="tax"
              id="property-tax"
              className="mt-1 block w-full border-2 rounded-md p-4 shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-lg"
              placeholder="Enter tax"
              value={tax}
              onChange={handleTaxChange}
              min="0"
              step="0.1"
            />
          </div>
          <div>
            <label
              htmlFor="service-fee"
              className="block text-sm font-medium text-gray-700"
            >
              Service Fee (%)
            </label>
            <input
              type="number"
              name="service-fee"
              id="service-fee"
              className="mt-1 block w-full border-2 rounded-md p-4 shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-lg"
              placeholder="Enter service fee"
              value={serviceFee}
              onChange={handleServiceFeeChange}
              min="0"
              step="0.1"
            />
          </div>
          <div>
            <label
              htmlFor="cleaning-fee"
              className="block text-sm font-medium text-gray-700"
            >
              Cleaning Fee (%)
            </label>
            <input
              type="number"
              name="cleaning-fee"
              id="cleaning-fee"
              className="mt-1 block w-full border-2 rounded-md p-4 shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-lg"
              placeholder="Enter cleaning fee"
              value={cleaningFee}
              onChange={handleCleaningFeeChange}
              min="0"
              step="0.1"
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>
        </div>
      </main>
      <Footer
        onBack={onBack}
        onNext={handleNext} // Use handleNext instead of onNext directly
        isNextDisabled={!isComplete}
      />
    </div>
  );
};

export default TaxesStep;
