/** @format */

import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import Checkbox from "../../ui/Checkbox";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useChecking } from "./useChecking";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmpaid, setConfirmpaid] = useState(false);
  const [addbreakfast, setAddbreakfast] = useState(false);
  const { isLoadingsetting, settings } = useSettings();
  const { booking, isLoading } = useBooking();
  const moveBack = useMoveBack();
  const { checkin, isCheckingin } = useChecking();

  const isPaid = booking ? booking.isPaid : "";

  useEffect(
    () => setConfirmpaid(booking ? booking.isPaid : false),
    [isPaid, booking]
  );

  const hasbreakfastt = booking ? booking.hasBreakfast : "";

  useEffect(
    () => setAddbreakfast(booking ? booking.hasBreakfast : false),
    [hasbreakfastt, booking]
  );
  if (isLoading || isLoadingsetting) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const OptionalBreakfastPrice = hasBreakfast
    ? 0
    : numGuests * numNights * settings.breakfastPrice;

  function handleCheckin() {
    if (!confirmpaid) return;

    if (addbreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: OptionalBreakfastPrice,
          totalPrice: totalPrice + OptionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addbreakfast}
            onChange={() => {
              setAddbreakfast((breakfast) => !breakfast);
              setConfirmpaid(false);
            }}
            id="breakfast">
            Does {guests.fullName} wants to add a Breakfast for{" "}
            {formatCurrency(OptionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmpaid}
          onChange={() => setConfirmpaid((confirm) => !confirm)}
          id="confirm"
          disabled={booking.status === "checked-in" || isCheckingin}>
          I Confirm that {guests.fullName} has paid the total amount of{" "}
          {!addbreakfast
            ? `${formatCurrency(totalPrice)} + ${formatCurrency(
                OptionalBreakfastPrice
              )}`
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmpaid || isCheckingin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
