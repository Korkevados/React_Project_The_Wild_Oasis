/** @format */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createcabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

/** @format */
export function useEditCabin() {
  const queryclient = useQueryClient();

  const { mutate: EditCabin, isLoading: isediting } = useMutation({
    mutationFn: ({ newcabindata, id }) => createcabin(newcabindata, id),
    onSuccess: () => {
      toast.success("Cabin succesfully Edited");
      queryclient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isediting, EditCabin };
}
