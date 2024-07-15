"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setProperty } from "@/store/slices/formSlice";
import Footer from "./Footer";
import Header from "./Header";

const DescriptionStep = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const dispatch = useDispatch();
  const property = useSelector((state: RootState) => state.form.property);
  const [description, setDescription] = useState<string>(property.description || "");

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = event.target.value;
    if (newDescription.length <= 500) {
      setDescription(newDescription);
      dispatch(setProperty({ ...property, description: newDescription }));
    }
  };

  const isComplete = description.length > 0;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow flex justify-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Create your description
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Share what makes your place special.
            </p>
          </div>
          <div>
            <textarea
              name="description"
              id="property-description"
              className="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-lg border-solid border-gray-300 rounded-md p-4"
              placeholder="You'll have a great time at this comfortable place to stay."
              value={description}
              onChange={handleTextareaChange}
              rows={8}
              maxLength={500}
              style={{ resize: 'none' }}
            />
            <p className="mt-1 text-right text-sm text-gray-500">{description.length}/500</p>
          </div>
        </div>
      </main>
      <Footer onBack={onBack} onNext={onNext} isNextDisabled={!isComplete} />
    </div>
  );
};

export default DescriptionStep;
