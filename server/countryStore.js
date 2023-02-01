const t = new Date();
const countriesData = require("../data/countries_final.json");

const getCountries = async (name, cap, region) => {
  const filteredResults = await countriesData.filter((item) => {
    if (
      item.fields.name.toLowerCase().includes(name) &&
      item.fields.region.toLowerCase().includes(region) &&
      item.fields.capital.toLowerCase().startsWith(cap)
    ) {
      return item;
    }
  });
  return filteredResults;
};

module.exports = class routes {
  constructor() {
    this.data = [];
  }

  async getAll(query) {
    try {
      if (query) {
        const queryFilter = await getCountries(
          query.name.toLowerCase(),
          query.capitol.toLowerCase(),
          query.region.toLowerCase()
        );

        this.data = {
          countries: queryFilter.map((item) => item.fields),
          time_date: t.toLocaleString("en-ZA"),
        };
        if (queryFilter.length != 0) {
          return this.data;
        } else {
          return "Sorry, nothing matches your search";
        }
      } else {
        return "Sorry, cannot find that country.";
      }
    } catch (err) {
      return err.message;
    }
  }

  async getCountry(id) {
    console.log("ID", id);
    const countries = await getCountries("", "", "");
    const country = await countries.find((item) => {
      if (item.pk === parseInt(id)) {
        return item;
      }
    });
    console.log("Country", country);
    return country;
  }
};
