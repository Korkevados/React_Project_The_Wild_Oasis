/** @format */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryclient = useQueryClient();

  const { isLoading: isDeleting, mutate: deletebooking } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success("booking deleted succesfully");
      queryclient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deletebooking, isDeleting };
}
