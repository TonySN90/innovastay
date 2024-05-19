import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Select from "react-select";

import "react-datepicker/dist/react-datepicker.css";
import Button from "../../ui/Button";
import { FormValues, IFormRawValues } from "../../types/FormTypes";
import { LoadingTypes } from "../../types/GlobalTypes";

import SearchBar from "../bookings/SearchBar";
import useCabins from "../cabins/useCabins";
import useCreateBooking from "./useCreateBooking";
import DatePicker from "react-datepicker";
import { de } from "date-fns/locale/de";
import useUpdateBooking from "./useUpdateBooking";
import TotalsBox from "./TotalsBox";
import {
  getCabinData,
  getNextDay,
  getOption,
  getStatus,
  getDate,
  getPricePerNight,
  getNumNights,
  getExtrasPrice,
  getTotalPrice,
  getAllDaysPrice,
  getCabin,
  getHasBreakfast,
} from "../../utils/helper";
import FormRow from "../../ui/FormRow";
import { Link } from "react-router-dom";
import { IBookingTypes } from "../../types/BookingTypes";
import { IGuestTypes } from "../../types/GuestTypes";
import useSettings from "../settings/useSettings";

interface IBookingFormProps {
  onCloseModal?: () => void;
  bookingToUpdate: IBookingTypes;
}

const CreateBookingForm: React.FC<IBookingFormProps> = function ({
  onCloseModal,
  bookingToUpdate,
}) {
  const { id: updateId } = bookingToUpdate;

  const { settings, loadingStatus: settingsLoadingStatus } = useSettings();
  const { cabins } = useCabins();
  const isUpdatingSession = Boolean(bookingToUpdate && "id" in bookingToUpdate);
  const isLoading = settingsLoadingStatus === LoadingTypes.LOADING;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    control,
  } = useForm<IFormRawValues>({
    defaultValues: {
      cabinId: isUpdatingSession ? getCabinData(bookingToUpdate) : null,
      guest: isUpdatingSession ? bookingToUpdate?.guests : null,
      startDate: isUpdatingSession
        ? getDate(bookingToUpdate?.startDate)
        : new Date(),
      endDate: isUpdatingSession
        ? getDate(bookingToUpdate?.endDate)
        : getNextDay(),
      numGuests: isUpdatingSession ? bookingToUpdate?.numGuests : 1,
      hasBreakfast: isUpdatingSession
        ? getOption(bookingToUpdate?.hasBreakfast)
        : null,
      isPaid: isUpdatingSession ? getOption(bookingToUpdate?.isPaid) : null,
      status: isUpdatingSession ? getStatus(bookingToUpdate?.status) : null,
    },
  });

  const { uploadNewBooking, uploadingStatus } = useCreateBooking(
    reset,
    onCloseModal || (() => {})
  );

  const { updateBooking, updatingStatus } = useUpdateBooking(
    reset,
    onCloseModal || (() => {})
  );

  const isUploading = uploadingStatus === LoadingTypes.LOADING;
  const isUpdating = updatingStatus === LoadingTypes.LOADING;
  const isWorking = isUploading || isUpdating;

  const watchedValues = watch();

  const onSubmit: SubmitHandler<IFormRawValues> = (formData) => {
    const newBooking = {
      cabinId: formData.cabinId?.value,
      guestId: formData.guest?.id,
      fullName: formData.guest?.fullName,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
      numGuests: +formData.numGuests,
      status: formData.status?.value,
      hasBreakfast: formData.hasBreakfast?.value,
      isPaid: formData.isPaid?.value,
      cabinPrice: getPricePerNight(watchedValues, cabins),
      numNights: getNumNights(watchedValues),
      extrasPrice: getExtrasPrice(watchedValues, settings[0].breakfastPrice),
      totalPrice: getTotalPrice(
        watchedValues,
        cabins,
        settings[0].breakfastPrice
      ),
    };

    if (isUpdatingSession) {
      updateBooking(updateId as number, newBooking as FormValues);
      console.log(newBooking);
      return;
    }

    uploadNewBooking(newBooking as FormValues);
    console.log(newBooking);
  };

  return (
    <>
      <form
        className="p-3 md:p-5 transition-all"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="font-semibold text-lg mb-3">
          {isUpdatingSession ? "Buchung bearbeiten" : "Buchung erstellen"}
        </h2>

        <FormRow
          label="Zimmer"
          id="cabinId"
          error={errors as { [key: string]: { message: string } }}
        >
          <Controller
            control={control}
            name="cabinId"
            rules={{ required: "Eintrag erforderlich" }}
            render={({ field: { onChange, value } }) => (
              <Select
                className="select-container"
                classNamePrefix="react-select"
                onChange={onChange}
                value={value}
                options={cabins.map((cabin) => ({
                  value: cabin.id,
                  label: cabin.name,
                }))}
                placeholder="Zimmer auswählen"
              />
            )}
          />
        </FormRow>

        <FormRow
          label="Gast"
          id="guest"
          error={errors as { [key: string]: { message: string } }}
        >
          <Controller
            control={control}
            name="guest"
            rules={{ required: "Eintrag erforderlich" }}
            render={({ field: { onChange, value } }) => (
              <SearchBar
                onChange={onChange}
                defaultValue={value as IGuestTypes | null | undefined}
                isUpdatingSession={isUpdatingSession}
              />
            )}
          />
        </FormRow>

        <FormRow
          label="Anreisedatum"
          id="startDate"
          error={errors as { [key: string]: { message: string } }}
        >
          <Controller
            rules={{ required: "Eintrag erforderlich" }}
            control={control}
            name="startDate"
            render={({ field: { onChange, value } }) => (
              <DatePicker
                locale={de}
                minDate={new Date()}
                className="w-full md:w-[300px] bg-inherit border border-border rounded-md h-9 pl-2 text-text outline-none focus:border-active hover:border-active"
                disabled={isWorking}
                onChange={onChange}
                selected={value}
                dateFormat={"dd.MM.yyyy"}
                placeholderText="tt.mm.jjjj"
              />
            )}
          />
        </FormRow>

        <FormRow
          label="Abreisedatum"
          id="endDate"
          error={errors as { [key: string]: { message: string } }}
        >
          <Controller
            rules={{ required: "Eintrag erforderlich" }}
            control={control}
            name="endDate"
            render={({ field: { onChange, value } }) => (
              <DatePicker
                locale={de}
                minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                className="w-full md:w-[300px] bg-inherit border border-border rounded-md h-9 pl-2 text-text outline-none focus:border-active hover:border-active"
                disabled={isWorking}
                onChange={onChange}
                selected={value}
                dateFormat={"dd.MM.yyyy"}
                placeholderText="tt.mm.jjjj"
              />
            )}
          />
        </FormRow>

        <FormRow
          label={"Anzahl der Gäste"}
          id="numGuests"
          error={errors as { [key: string]: { message: string } }}
        >
          <input
            autoComplete="off"
            className="w-full md:w-[300px] border border-border rounded-md h-9 pl-2 text-text bg-inherit outline-none focus:border-active hover:border-active"
            type="number"
            id="numGuests"
            disabled={isWorking}
            {...register("numGuests", {
              required: "Eintrag erforderlich",
              min: 1,
            })}
          />
        </FormRow>

        <FormRow
          label={"Frühstück"}
          id="hasBreakfast"
          error={errors as { [key: string]: { message: string } }}
        >
          <Controller
            name="hasBreakfast"
            control={control}
            rules={{ required: "Eintrag erforderlich" }}
            render={({ field: { onChange, value } }) => (
              <Select
                className="select-container"
                classNamePrefix="react-select"
                onChange={onChange}
                value={value}
                options={[
                  { value: true, label: "Ja" },
                  { value: false, label: "Nein" },
                ]}
                placeholder="Wähle..."
              />
            )}
          />
        </FormRow>

        <FormRow
          label={"Bereits bezahlt"}
          id="isPaid"
          error={errors as { [key: string]: { message: string } }}
        >
          <Controller
            name="isPaid"
            control={control}
            rules={{ required: "Eintrag erforderlich" }}
            render={({ field: { onChange, value } }) => (
              <Select
                className="select-container"
                classNamePrefix="react-select"
                onChange={onChange}
                value={value}
                options={[
                  { value: true, label: "Ja" },
                  { value: false, label: "Nein" },
                ]}
                placeholder="Wähle..."
              />
            )}
          />
        </FormRow>

        <FormRow
          label={"Status"}
          id="status"
          error={errors as { [key: string]: { message: string } }}
        >
          <Controller
            name="status"
            control={control}
            rules={{ required: "Eintrag erforderlich" }}
            render={({ field: { onChange, value } }) => (
              <Select
                className="select-container"
                classNamePrefix="react-select"
                onChange={onChange}
                value={value}
                options={[
                  { value: "checkedIn", label: "Eingechecket" },
                  { value: "unconfirmed", label: "Ausstehend" },
                  // { value: "checkedOut", label: "Ausgechecket" },
                ]}
                placeholder="Wähle..."
              />
            )}
          />
        </FormRow>

        {isLoading || settings.length === 0 ? (
          <div>test</div>
        ) : (
          <TotalsBox
            numGuests={watchedValues.numGuests}
            allDaysPrice={getAllDaysPrice(watchedValues, cabins)}
            extrasPrice={getExtrasPrice(
              watchedValues,
              settings[0].breakfastPrice
            )}
            totalPrice={getTotalPrice(
              watchedValues,
              cabins,
              settings[0].breakfastPrice
            )}
            numNights={getNumNights(watchedValues)}
            pricePerNight={getPricePerNight(watchedValues, cabins)}
            hasBreakfast={getHasBreakfast(watchedValues)}
            cabin={getCabin(watchedValues, cabins)}
          />
        )}

        <div className="w-[full] flex md:justify-between mt-4">
          <Link
            className="text-sm font-semibold text-indigo-500 hover:text-indigo-300 transition-all flex items-center"
            to="/guests"
          >
            Neuen Gast anlegen
          </Link>
          <div>
            <Button
              type="reset"
              onClick={() => {
                reset();
              }}
              variation="inverted"
              size="md"
              extras="mr-2 rounded-lg"
              content="Zurücksetzen"
              disabled={isWorking}
            />
            <Button
              type="submit"
              onClick={() => null}
              variation="standard"
              size="md"
              extras="rounded-lg"
              content={isUpdatingSession ? "Aktualisieren" : "Hinzufügen"}
              disabled={isWorking}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateBookingForm;
