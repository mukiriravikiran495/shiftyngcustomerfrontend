import React from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

interface FromInputProps {
  onSelect: (address: string, lat: number, lng: number) => void;
}

const FromInput: React.FC<FromInputProps> = ({ onSelect }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300 });

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      onSelect(address, lat, lng);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="relative flex flex-col bg-gray-100 px-4 py-2 flex-1">
      {/* Label */}
      <span className="text-xs text-gray-500">FROM</span>

      {/* Input */}
      <input
        value={value}
        disabled={!ready}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter Pickup Location"
        autoComplete="off"
        className="font-semibold text-gray-900 bg-transparent outline-none text-sm"
      />

      {/* Suggestions */}
      {status === "OK" && (
        <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow mt-1 z-50 max-h-60 overflow-y-auto">
          {data.map(({ place_id, description }) => (
            <li
              key={place_id}
              onClick={() => handleSelect(description)}
              className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>

    
  );
};

export default FromInput;
