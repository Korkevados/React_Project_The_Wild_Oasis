/** @format */

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchedParams] = useSearchParams();

  //Filter
  const filtervalue = searchedParams.get("status");
  const filter =
    !filtervalue || filtervalue === "All"
      ? null
      : { field: "status", value: filtervalue };

  //Sort

  const sortbyraw = searchedParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortbyraw.split("-");
  const sortby = { field, direction };

  //PAGINATION
  const page = !searchedParams.get("page")
    ? 1
    : Number(searchedParams.get("page"));

  //QUERY
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortby, page],
    queryFn: () => getBookings({ filter, sortby, page }),
  });

  //PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortby, page + 1],
      queryFn: () => getBookings({ filter, sortby, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortby, page - 1],
      queryFn: () => getBookings({ filter, sortby, page: page - 1 }),
    });
  return { bookings, isLoading, error, count };
}
