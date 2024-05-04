/** @format */

import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "All", label: "All" },
          { value: "no-discount", label: "no-discount" },
          { value: "with-discount", label: "with-discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regular_price-asc", label: "Sort by price(low first)" },
          { value: "regular_price-desc", label: "Sort by price(high first)" },
          {
            value: "max_capcity-asc",
            label: "Sort by max-capacity(Low first)",
          },
          {
            value: "max_capcity-desc",
            label: "Sort by max-capacity(Max first)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
