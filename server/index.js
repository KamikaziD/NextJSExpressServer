const express = require("express");
const bodyParser = require("body-parser");
const next = require("next");

const Store = require("./store");
const CountryStore = require("./countryStore");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const countries = new CountryStore();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.get("/api/countries", async (req, res) => {
      const query = req.query;
      const data = await countries.getAll(query);
      return res.status(200).send({ data });
    });

    server.get("/api/countries/:id", (req, res) => {
      const query = req.params.id;
      if (query !== undefined) {
        return res.send(countries.getCountry(query));
      }

      //   const query = req.params;
      //   return res.send(countries.getCountry(query));
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch((ex) => {
    process.exit(1);
  });
