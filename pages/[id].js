import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const EditTodo = (props) => {
  const [selectedCountry, setSelectedCountry] = useState();
  const [countryId, setCountryId] = useState();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    console.log("PROPS:", props);
    // setSelectedCountry(props.fields);
  }, [props]);

  // useEffect(() => {
  //   console.log("ID: ", id);
  //   if (id === undefined) {
  //     setCountryId(id);
  //   } else if (id !== undefined) {
  //     fetchCountry(countryId);
  //   }
  // }, [id]);

  useEffect(() => {
    console.log("SELECTED: ", selectedCountry);
  }, [selectedCountry]);

  const fetchCountry = async (cid) => {
    try {
      const response = await fetch(`/api/countries/${cid}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }).then((resp) => resp.json());
      console.log("COUNTRY", response.fields);
      setSelectedCountry(response.fields);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="form-control min-w-full">
      <div className="m-2">
        <label className="label">
          <span className="label-text">{props.name}</span>
        </label>
        {/* <input
          type="text"
          placeholder="Add todo...!!"
          value={selectedCountry.todo}
          onChange={(e) =>
            setSelectedTodo({ ...selectedTodo, todo: e.target.value })
          }
          className="input input-bordered min-w-full"
        /> */}
      </div>
      <div className="m-2">
        <label className="label">
          <span className="label-text">Pick the best todo status</span>
        </label>
        {/* <select
          onChange={(e) =>
            setSelectedTodo({ ...selectedTodo, status: e.target.value })
          }
          className="select select-bordered min-w-full"
        >
          <option selected value="New">
            New
          </option>
          <option value="Started">Started</option>
          <option value="Completed">Completed</option>
        </select> */}
      </div>
      <div className="flex justify-end  min-w-full m-2">
        {/* <button
          className="btn btn-sm btn-success"
          disabled={!selectedTodo.todo || !selectedTodo.status}
          onClick={handleOnSave}
        >
          Save
        </button> */}
      </div>
    </div>
  );
};

export default EditTodo;

export async function getServerSideProps(context) {
  const { query } = context;
  console.log("QUERY", query.id);
  const res = await fetch(`http://localhost:3000/api/countries/${query.id}`);

  const country = await res.json();
  if (!country) {
    console.log(`Fetching country`);
    return {
      notFound: true,
    };
  }
  return {
    props: { country: { error: "NOT FOUND", country: country } },
  };
}
