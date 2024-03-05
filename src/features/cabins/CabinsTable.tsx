import Table from "../../ui/Table";
import CabinsRow from "./CabinsRow";
import { cabinsData } from "../../data/data";
import { ICabinTypes } from "../../types/cabinTypes";
import useWindowWidth from "../../hooks/UseWindowWidth";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCabins } from "./cabinsSlice";

function CabinsTable() {
  const windowWidth = useWindowWidth();

  const dispatch = useDispatch();
  const { cabins, status, error } = useSelector((state) => state.cabins);

  const { cabin_name, category, capacity, price, discount, img } = cabins;

  const cabin = {
    cabinName: cabin_name,
    category,
    capacity,
    price,
    discount,
    img: "avatar.jpeg",
  };

  useEffect(() => {
    dispatch(fetchCabins());
  }, [dispatch]);

  return (
    <>
      <Table
        columns="grid-cols-5 md:grid-cols-7"
        columnSpace={{
          col1: "",
          col2: "col-span-2",
          col3: "",
          col4: "",
          col5: "",
        }}
      >
        <Table.Header
          content={
            windowWidth > 768
              ? ["Zimmer", "Kapazität", "Preis", "Angebote"]
              : ["Zimmerinformationen"]
          }
        />
        {status === "loading" && <h1 className="text-2xl">Laden!</h1>}
        {status === "idle" && (
          <Table.Body
            data={cabinsData}
            render={(cabin: ICabinTypes) => (
              <CabinsRow
                cabins={cabin}
                key={cabin.id}
                windowWidth={windowWidth}
              />
            )}
          />
        )}
        {/* <Table.Body
          data={cabinsData}
          render={(cabin: ICabinTypes) => (
            <CabinsRow
              cabins={cabin}
              key={cabin.id}
              windowWidth={windowWidth}
            />
          )}
        /> */}
      </Table>
    </>
  );
}

export default CabinsTable;
