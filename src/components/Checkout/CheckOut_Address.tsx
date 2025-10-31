import { MapPin } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  fullName: string;
  setFullName: Dispatch<SetStateAction<string>>;
  addressLine1: string;
  setAddressLine1: Dispatch<SetStateAction<string>>;
  addressLine2?: string;
  setAddressLine2: Dispatch<SetStateAction<string>>;
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  pincode: string;
  setPincode: Dispatch<SetStateAction<string>>;
  addressErrors: Record<string, boolean>;
  setAddressErrors: Dispatch<SetStateAction<Record<string, boolean>>>;
  handleAddressContinue: () => void;
  setCurrentStep: (s: "contact" | "address" | "payment") => void;
};

const CheckOut_Address = ({
  fullName,
  setFullName,
  addressLine1,
  setAddressLine1,
  addressLine2 = "",
  setAddressLine2,
  city,
  setCity,
  state,
  setState,
  pincode,
  setPincode,
  setCurrentStep,
  handleAddressContinue,
  addressErrors,
  setAddressErrors,
}: Props) => {
  return (
    <div className="max-w-xl">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <MapPin className="w-8 h-8 text-gray-600" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Delivery address</h2>
      <p className="text-gray-600 text-center mb-8">Enter your delivery address</p>

      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              setAddressErrors((s) => ({ ...s, fullName: false }));
            }}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
              addressErrors.fullName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {addressErrors.fullName && (
            <p className="text-red-500 text-sm mt-1">Please enter your full name</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Address line 1"
            value={addressLine1}
            onChange={(e) => {
              setAddressLine1(e.target.value);
              setAddressErrors((s) => ({ ...s, addressLine1: false }));
            }}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
              addressErrors.addressLine1 ? "border-red-500" : "border-gray-300"
            }`}
          />
          {addressErrors.addressLine1 && (
            <p className="text-red-500 text-sm mt-1">Please enter your address</p>
          )}
        </div>

        <input
          type="text"
          placeholder="Address line 2 (Optional)"
          value={addressLine2}
          onChange={(e) => setAddressLine2(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setAddressErrors((s) => ({ ...s, city: false }));
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                addressErrors.city ? "border-red-500" : "border-gray-300"
              }`}
            />
            {addressErrors.city && <p className="text-red-500 text-sm mt-1">Required</p>}
          </div>
          <div>
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                setAddressErrors((s) => ({ ...s, state: false }));
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                addressErrors.state ? "border-red-500" : "border-gray-300"
              }`}
            />
            {addressErrors.state && <p className="text-red-500 text-sm mt-1">Required</p>}
          </div>
        </div>

        <div>
          <input
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value);
              setAddressErrors((s) => ({ ...s, pincode: false }));
            }}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
              addressErrors.pincode ? "border-red-500" : "border-gray-300"
            }`}
          />
          {addressErrors.pincode && (
            <p className="text-red-500 text-sm mt-1">Please enter a valid 6-digit pincode</p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setCurrentStep("contact")}
            className="flex-1 bg-gray-200 text-gray-800 py-4 rounded-lg font-semibold text-lg hover:bg-gray-300 transition-colors mt-6"
          >
            Back
          </button>
          <button
            onClick={handleAddressContinue}
            className="flex-1 bg-black text-white py-4 rounded-lg font-semibold text-lg hover:bg-gray-900 transition-colors mt-6"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut_Address;
