const db = require('../../../db');


/**
 * 
 * @param {String} name 
 * @param {Object} res 
 * @returns {Boolean} - Returns True if all the name is ok. Otherwise, returns False.
 */
const isNameValid = (name, res) => {
  if ( name==='' || name===undefined ) {
    res.status(406);
    res.send({
      "message":"There is a field empty or undefined"
    });
    return false;
  }
  else {
    return true;
  }
};

/**
 * 
 * @param {Object} country 
 * @param {Object} res 
 * @returns {Boolean} - Returns True if all the attributes are ok. Otherwise, returns False.
 */
const areAttributesValid = (country, res) => {
  const {currency, phoneCode, isoCode} = country;
  if ( currency==='' || currency===undefined || 
      phoneCode==='' || phoneCode===undefined || 
      isoCode==='' || isoCode===undefined
  ) {
    res.status(406);
    res.send({
      "message":"There is a field empty or undefined"
    });
    return false;
  }
  else {
    return true;
  }
};

/**
 * 
 * @param {Object} name 
 * @param {Object} res 
 * @returns {Promise} - Returns True if the country exists. Otherwise, returns false.
 */
const doesCountryExist = (name, res) => {
  return new Promise((resolve) => {
    db.query(
        'SELECT * FROM `countries` WHERE `name` LIKE ?', 
        [name], 
        function (error, results, fields) {
      if (error) {
        throw error;
      }
      if (results.length===0) {
        // is available
        res.status(406);
        res.send({
          "message":"The country doesn\'t exist."
        });
        resolve(false);
      } else  {
        // is not
        resolve(true);
      }
    });
  });
};

/**
 * 
 * @param {Object} country 
 * @param {Object} res 
 * @returns {Promise} - Returns True if the operation was successfully. Otherwise, throw an error.
 */
const updateCountry = (name, country, res) => {
  return new Promise((resolve) => {
    const {currency, phoneCode, isoCode} = country;
    db.query(
        'UPDATE `countries` SET `currency` = ?, `phoneCode` = ?, `isoCode` = ? WHERE `countries`.`name` = ?;', 
        [currency, phoneCode, isoCode, name], 
        function (error, results, fields) {
      if (error) {
        throw error;
      }
      console.log(`The country ${name} was updated`);
      resolve(true);
    });
  });
};

/**
 * @function update
 */
module.exports = async (req, res) => {
  try {
    const countryName = req.params.name;
    const countryAttributes = req.body;

    let areValid = false;
    let countryExist = false;
    let updatedSucsessfully = false;


    const isValid = isNameValid(countryName, res);

    if (isValid) {
      areValid = areAttributesValid(countryAttributes, res);
    }

    if (areValid) {
      countryExist = await doesCountryExist(countryName, res);
    }

    if (countryExist) {
      updatedSucsessfully = await updateCountry(countryName, countryAttributes, res);
    }

    if (updatedSucsessfully) {
      res.status(202);
      res.end();
    }
  } catch (error) {
    res.status(500);
    res.send({
      "message":"The query failed."
    });
  }
};