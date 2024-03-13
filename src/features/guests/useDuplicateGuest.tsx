import { FormValues } from "../../types/FormTypes";
import { IGuestTypes } from "../../types/GuestTypes";
import useCreateGuest from "./useCreateGuest";

function useDuplicateGuest(guest: IGuestTypes, onCloseModal?: () => void) {
  const { uploadNewGuest, uploadingStatus } = useCreateGuest(onCloseModal);

  const toDuplicate: FormValues = {
    fullName: `${guest.fullName} (Duplikat)`,
    address: guest.address,
    postalCode: guest.postalCode,
    city: guest.city,
    country: guest.country,
    email: guest.email,
    phone: guest.phone,
    information: guest.information,
  };

  const duplicateGuest = () => uploadNewGuest(toDuplicate);

  return { duplicateGuest, uploadingStatus };
}

export default useDuplicateGuest;
