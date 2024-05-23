import { FormValues } from "../../../types/FormTypes";
import { ICabinTypes } from "../../../types/cabinTypes";

import useCreateCabin from "./useCreateCabin";

function useDuplicateCabin(cabin: ICabinTypes, onCloseModal?: () => void) {
  const { uploadNewCabin, uploadingStatus } = useCreateCabin(onCloseModal);

  const toDuplicate: FormValues = {
    name: `${cabin.name} (Duplikat)`,
    capacity: cabin.capacity,
    price: cabin.price,
    discount: cabin.discount,
    category: cabin.category,
    image: cabin.image,
    description: cabin.description,
  };

  const duplicateCabin = () => uploadNewCabin(toDuplicate);

  return { duplicateCabin, uploadingStatus };
}

export default useDuplicateCabin;
