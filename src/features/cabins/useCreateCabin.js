/** @format */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createcabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryclient = useQueryClient();

  const { mutate: Createcabin, isLoading: iscreating } = useMutation({
    mutationFn: createcabin,
    onSuccess: () => {
      toast.success("New cabin succesfully created");

      queryclient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { iscreating, Createcabin };
}
