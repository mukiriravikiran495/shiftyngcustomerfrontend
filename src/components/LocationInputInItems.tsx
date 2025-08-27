import React, { useEffect,useState } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

interface LocationInputProps {
  label: string; // "FROM" | "TO"
  placeholder: string;
  value?: string; // Redux value (preloaded)
  onSelect: (address: string, lat: number, lng: number) => void;
}

const LocationInputInItems: React.FC<LocationInputProps> = ({
  label,
  placeholder,
  value: externalValue,
  onSelect,
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300 });
  const [activeIndex, setActiveIndex] = useState(-1);
  // ✅ preload Redux value once when coming from BookingForm
  useEffect(() => {
    if (externalValue && externalValue !== value) {
      setValue(externalValue, false);
    }
  }, [externalValue, value, setValue]);

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      onSelect(address, lat, lng); // ✅ update Redux
    } catch (err) {
      console.error("Error:", err);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (status !== "OK" || data.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % data.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + data.length) % data.length);
    } else if (e.key === "Enter" || e.key === "Tab") {
      if (activeIndex >= 0 && data[activeIndex]) {
        e.preventDefault();
        handleSelect(data[activeIndex].description);
      }
    }
  };
  return (
    <div className="relative flex flex-col bg-gray-100 px-4 py-2 flex-1 rounded-lg">
      {/* Label */}
      <span className="text-xs text-gray-500">{label}</span>

      {/* Input */}
      <input
        value={value} // use hook state for typing
        onChange={(e) => setValue(e.target.value)} // ✅ typing allowed
        placeholder={placeholder}
        autoComplete="off"
        disabled={!ready}
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

export default LocationInputInItems;
