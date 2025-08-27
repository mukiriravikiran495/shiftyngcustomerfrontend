import React, { useEffect, useState } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { MdPlace } from "react-icons/md";

interface LocationInputProps {
  placeholder: string;
  iconColor?: string;
  value?: string;
  onSelect: (address: string, lat: number, lng: number) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({
  placeholder,
  iconColor = "black",
  value: externalValue,
  onSelect,
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
    requestOptions: {
      componentRestrictions: { country: "in" }, // ✅ restrict to India
      // ✅ proper LatLng object
      location: new google.maps.LatLng(17.3850, 78.4867), // Hyderabad
      radius: 50000 // ~1500 km to cover all India
    },
  });

  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (externalValue && externalValue.toLowerCase() !== value.toLowerCase()) {
      setValue(externalValue, false);
    }
  }, [externalValue, value, setValue]);

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();
    setActiveIndex(-1);

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      onSelect(address, lat, lng);
    } catch (error) {
      console.error("Error getting location details: ", error);
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
    <div className="relative">
      <div className="flex h-[80px] items-center bg-white rounded-lg px-3 py-2 border-[#A8A5A5] border-2">
        <MdPlace className="text-3xl mr-2 ml-2 w-6 h-6" style={{ color: iconColor }} />
        <input
          value={externalValue ?? value}
          disabled={!ready}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          className="flex-1 outline-none bg-transparent text-gray-700 text-lg"
        />
      </div>

      {status === "OK" && (
        <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-md mt-1 z-50 max-h-60 overflow-y-auto">
          {data.map(({ place_id, description }, index) => (
            <li
              key={place_id}
              className={`p-2 cursor-pointer text-sm ${index === activeIndex ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
              onMouseDown={() => handleSelect(description)}
            >
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationInput;
