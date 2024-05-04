/** @format */

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoadingsetting,
    settings: {
      minimumBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isupdating, updateSetting } = useUpdateSetting();

  if (isLoadingsetting) return <Spinner />;

  function handleupdate(e, field) {
    const { value } = e.target;

    if (!value) return;
    updateSetting({ [field]: value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minimumBookingLength}
          disabled={isupdating}
          onBlur={(e) => handleupdate(e, "minimumBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isupdating}
          onBlur={(e) => handleupdate(e, "Maximum nights/booking")}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isupdating}
          onBlur={(e) => handleupdate(e, "Maximum guests/booking")}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakdefaultValue={minBookingLength}fast-price"
          defaultValue={breakfastPrice}
          disabled={isupdating}
          onBlur={(e) => handleupdate(e, "Breakfast price")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
