#!/usr/bin/env node
const { getCode } = require("country-list");
const axios = require("axios");
const chalk = require("chalk");
const center = require("center-align");
const figlet = require("figlet");

const args = process.argv.slice(2);
const country = getCode(args[0]);
const year = args[1] ? args[1] : new Date().getFullYear();

axios
  .get(`https://date.nager.at/Api/v1/Get/${country}/${year}`)
  .then((response) => handleResponse(response.data))
  .catch((err) => console.log(err));

handleResponse = (holidays) => {
  holidays.map((holiday) => {
    console.log(
      center(
        chalk.bgGreenBright.red(
          `Holiday: ${holiday.name}\nDate: ${holiday.date}\n`
        )
      )
    );
  });
};
figlet("Holidates", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log("\x1b[34m%s\x1b[0m", data);
});
