/** @format */

import Spinner from "../../ui/Spinner";

import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) {
    return <Spinner />;
  }

  // 1) FILTER
  const filtervalue = searchParams.get("discount") || "All";

  let filterCabins;

  if (filtervalue === "All") filterCabins = cabins;
  if (filtervalue === "no-discount")
    filterCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filtervalue === "with-discount")
    filterCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2)SORT-BY
  const sortby = searchParams.get("sortBy") || "Startdate-asc";
  const [field, direction] = sortby.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filterCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
