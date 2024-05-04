/** @format */

import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchedParams, setSerchedParams] = useSearchParams();

  const sortby = searchedParams.get("sortBy") || "";

  function handlechange(e) {
    searchedParams.set("sortBy", e.target.value);
    setSerchedParams(searchedParams);
  }

  return (
    <Select
      options={options}
      value={sortby}
      type="white"
      onChange={handlechange}></Select>
  );
}

export default SortBy;
