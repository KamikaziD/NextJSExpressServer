import React, { useState, useEffect } from "react";

export default function Home(props) {
  const [list, setList] = useState();
  const [error, setError] = useState(false);
  const [query, setQuery] = useState({
    country: "",
    capital: "",
    region: "",
  });

  const syncData = async () => {
    const countries = await fetch(
      `http://localhost:3000/api/countries?name=${query.country}&capitol=${query.capital}&region=${query.region}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ).then((resp) => resp.json());
    if (countries.data === "Sorry, nothing matches your search") {
      setError(true);
    } else {
      setList(countries.data);
      setError(false);
    }
  };

  useEffect(() => {
    syncData();
  }, [query]);

  return (
    <div className="flex">
      <div className="w-full m-2">
        <h2>Search</h2>
        <div className="flex flex-row w-full gap-5 mb-5">
          <div className="flex flex-col">
            <span>Country</span>
            <input
              className="p-2 text-gray-100 bg-gray-900 rounded-md cursor-pointer"
              type="text"
              value={query.country}
              onChange={(e) => {
                setQuery({ ...query, country: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col">
            <span>Capital</span>
            <input
              className="p-2 text-gray-100 bg-gray-900 rounded-md cursor-pointer"
              type="text"
              value={query.capital}
              onChange={(e) => {
                setQuery({ ...query, capital: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col">
            <span>Region</span>
            <input
              className="p-2 text-gray-100 bg-gray-900 rounded-md cursor-pointer"
              type="text"
              value={query.region}
              onChange={(e) => {
                setQuery({ ...query, region: e.target.value });
              }}
            />
          </div>
        </div>
        <table className="table border min-w-full text-sm overflow-y-scroll divide-gray-200">
          <thead>
            {/* */}
            <tr>
              <th className="p-4 font-medium text-left text-gray-100 whitespace-nowrap">
                Country Code
              </th>
              <th className="p-4 font-medium text-left text-gray-100 whitespace-nowrap">
                Country Name
              </th>
              <th className="p-4 font-medium text-left text-gray-100 whitespace-nowrap">
                Capital
              </th>
              <th className="p-4 font-medium text-left text-gray-100 whitespace-nowrap">
                ISO3
              </th>
              <th className="p-4 font-medium text-left text-gray-100 whitespace-nowrap">
                ISO2
              </th>
              <th className="p-4 font-medium text-left text-gray-100 whitespace-nowrap">
                TLD
              </th>
              <th className="p-4 font-medium text-left text-gray-100 whitespace-nowrap">
                Dialing Code
              </th>
              <th className="p-4 font-medium text-left text-gray-100 whitespace-nowrap">
                Region
              </th>
              <th className="p-4 font-medium text-left text-gray-100 whitespace-nowrap">
                Sub Region
              </th>
            </tr>
          </thead>
          <tbody>
            {!list ||
              (error && (
                <tr>
                  <td colSpan={9}>
                    <div className="flex justify-center items-center w-full text-red-500">
                      <h3 className="text-2xl font-medium">
                        No countries Found
                      </h3>
                    </div>
                  </td>
                </tr>
              ))}
            {list &&
              !error &&
              list.countries?.map((row, index) => {
                return (
                  <tr key={index + 1}>
                    <td className="p-4 text-white">{row.numeric_code}</td>
                    <td className="p-4 text-white whitespace-nowrap">
                      <a href={`/${row.county_id}`}>{row.name}</a>
                    </td>
                    <td className="p-4 text-white whitespace-nowrap">
                      {row.capital}
                    </td>
                    <td className="p-4 text-white whitespace-nowrap">
                      {row.iso3}
                    </td>
                    <td className="p-4 text-white whitespace-nowrap">
                      {row.iso2}
                    </td>
                    <td className="p-4 text-white whitespace-nowrap">
                      {row.tld}
                    </td>
                    <td className="p-4 text-white whitespace-nowrap">
                      {row.phone_code}
                    </td>
                    <td className="p-4 text-white whitespace-nowrap">
                      {row.region}
                    </td>
                    <td className="p-4 text-white whitespace-nowrap">
                      {row.sub_region}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/countries?name=&capitol=&region=`);
  const countries = await res.json();
  if (!countries) {
    return {
      notFound: true,
    };
  }
  return {
    props: { countries },
  };
}
