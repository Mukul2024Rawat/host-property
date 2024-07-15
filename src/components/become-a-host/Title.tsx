"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setProperty } from "@/store/slices/formSlice";
import Footer from "./Footer";
import Header from "./Header";

const TitleStep = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const dispatch = useDispatch();
  const property = useSelector((state: RootState) => state.form.property);
  const [title, setTitle] = useState<string>(property.title || "");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    if (newTitle.length <= 32) {
      setTitle(newTitle);
      dispatch(setProperty({ ...property, title: newTitle }));
    }
  };

  const isComplete = title.length > 0;

  return (
    <div className="bg-zinc-100">
      <Header />
      <main className="flex-grow flex justify-center px-4 py-14 bg-white">
        <div className="max-w-xl w-full space-y-8 p-8 m-12  rounded-lg shadow-xl">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900 py-4">
              Now let's give your property a title
            </h2>
            <p className="mt-2 text-center text-lg text-gray-600">
              Short titles work best. Have fun with it - you can always change it later.
            </p>
          </div>
          <div>
            <input
              type="text"
              name="title"
              id="property-title"
              className="block w-full border-2 rounded-md p-4"
              placeholder="Enter your property title"
              value={title}
              onChange={handleInputChange}
            />
            <p className="mt-1 text-right text-sm text-gray-500">{title.length}/32</p>
          </div>
        </div>
      </main>
      <Footer onBack={onBack} onNext={onNext} isNextDisabled={!isComplete} />
    </div>
  );
};

export default TitleStep;
