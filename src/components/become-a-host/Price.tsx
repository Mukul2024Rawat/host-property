import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setPrice } from "@/store/slices/formSlice";
import Footer from "./Footer";
import Header from "./Header";

const PriceStep = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const dispatch = useDispatch();
  const priceFromState = useSelector((state: RootState) => state.form.price);
  const [price, setPriceState] = useState<string>(priceFromState.price.toString());

  useEffect(() => {
    setPriceState(priceFromState.price.toString());
  }, [priceFromState]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = event.target.value;


      setPriceState(newPrice);
      dispatch(setPrice({ ...priceFromState, price: parseFloat(newPrice) }));

  };

  const isComplete = price !== "" && parseFloat(price) > 0;

  return (
    <div className="flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow flex justify-center px-4 py-16 bg-zinc-200">
        <div className="max-w-xl w-full space-y-8 p-8 m-12 h-fit rounded-lg shadow-xl bg-white">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900 py-4">
              Now, set your price
            </h2>
            <p className="mt-2 text-center text-lg text-gray-600">
              You can change it anytime.
            </p>
          </div>
          <div>
            <label htmlFor="property-price" className="block text-sm font-medium text-gray-700">
              Price per night
            </label>
            <input
              type="number"
              name="price"
              id="property-price"
              className="mt-1 block w-full border-2 rounded-md p-4 shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-lg"
              placeholder="Enter your price"
              value={price}
              onChange={handleInputChange}
              step="1.00"
            />
          </div>
        </div>
      </main>
      <Footer onBack={onBack} onNext={onNext} isNextDisabled={!isComplete} />
    </div>
  );
};

export default PriceStep;
