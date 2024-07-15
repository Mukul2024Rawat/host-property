"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setProperty } from "@/store/slices/formSlice";
import Footer from "./Footer";
import Header from "./Header";

const SubTitleStep = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const dispatch = useDispatch();
  const property = useSelector((state: RootState) => state.form.property);
  const [subtitle, setSubtitle] = useState<string>(property.subtitle || "");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSubtitle = event.target.value;
    if (newSubtitle.length <= 128) {
      setSubtitle(newSubtitle);
      dispatch(setProperty({ ...property, subtitle: newSubtitle }));
    }
  };

  const isComplete = subtitle.length > 0;

  return (
    <div className="h-screen">
      <Header />
      <main className="flex-grow flex justify-center px-4 py-12 bg-zinc-100">
        <div className="max-w-xl w-full space-y-8 p-8 m-12  rounded-lg shadow-xl bg-white">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900 py-4">
              Now let&#39;s give your property a subtitle
            </h2>
            <p className="mt-2 text-center text-lg text-gray-600">
              Provide a brief description of your property. You can always change it later.
            </p>
          </div>
          <div>
            <input
              type="text"
              name="subtitle"
              id="property-subtitle"
              className="block w-full border-2 rounded-md p-4"
              placeholder="Enter your property subtitle"
              value={subtitle}
              onChange={handleInputChange}
            />
            <p className="mt-1 text-right text-sm text-gray-500">{subtitle.length}/128</p>
          </div>
        </div>
      </main>
      <Footer onBack={onBack} onNext={onNext} isNextDisabled={!isComplete} />
    </div>
  );
};

export default SubTitleStep;
