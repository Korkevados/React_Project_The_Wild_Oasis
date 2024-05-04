/** @format */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
/** @format */

export function useUpdateSetting() {
  const queryclient = useQueryClient();

  const { mutate: updateSetting, isLoading: isupdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting succesfully Edited");
      queryclient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isupdating, updateSetting };
}
