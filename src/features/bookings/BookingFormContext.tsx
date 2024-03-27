import { createContext, useContext, useState } from "react";

const FormContext = createContext({});

function BookingFormProvider({ children }) {
  const [selectedCabin, setSelectedCabin] = useState(null);
  const [numGuests, setNumGuests] = useState(0);
  const [hasBreakfast, setHasBreakfast] = useState(null);
  const [numNights, setNumNights] = useState(1);
  const [pricePerNight, setPricePerNight] = useState(0);
  const [allDaysPrice, setAllDaysPrice] = useState(0);
  const [extrasPrice, setExtrasPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <FormContext.Provider
      value={{
        selectedCabin,
        setSelectedCabin,
        numGuests,
        setNumGuests,
        hasBreakfast,
        setHasBreakfast,
        numNights,
        setNumNights,
        pricePerNight,
        setPricePerNight,
        allDaysPrice,
        setAllDaysPrice,
        extrasPrice,
        setExtrasPrice,
        totalPrice,
        setTotalPrice,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export default BookingFormProvider;

const useBookingFormContext = function () {
  const context = useContext(FormContext);

  if (context === undefined)
    throw new Error("useFormContext was used outside of useFormProvider");

  return context;
};

export { BookingFormProvider, useBookingFormContext };
