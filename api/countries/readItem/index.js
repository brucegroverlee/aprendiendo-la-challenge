const db = require('../../../db');

/**
 * 
 * @param {Object} country 
 * @param {Object} res 
 * @returns {Boolean} - Returns True if all the attributes are ok. Otherwise, returns False.
 */
const areAttributesValid = (country, res) => {
  const {name} = country;
  if ( name==='' || name===undefined ) {
    res.status(406);
    res.send({
      "message":"The name is empty or undefined"
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
 * @returns {Promise} - Returns True if the operation was successfully. Otherwise, throw an error.
 */
const readItemCountry = (country, res) => {
  return new Promise((resolve) => {
    const {name} = country;
    db.query(
        'SELECT * FROM `countries` WHERE `name` LIKE ?', 
        [name], 
        function (error, results, fields
      ) {
      if (error) {
        throw error;
      }
      if (results.length === 0) {
        console.log(`The country ${name} doesn\'t exist`);
        resolve([true, {}]);
      } else {
        console.log(`The country ${name} was read`);
        resolve([true, results[0]]);
      }
    });
  });
};

/**
 * @function readItem
 */
module.exports = async (req, res) => {
  try {
    const country = req.params;

    let readItemSucsessfully = false;
    let result = {};

    const areValid = areAttributesValid(country, res);

    if (areValid) {
      [readItemSucsessfully, result] = await readItemCountry(country, res);
    }

    if (readItemSucsessfully) {
      res.status(200);
      res.send(result);
    }
  } catch (error) {
    res.status(500);
    res.send({
      "message":"The query failed."
    });
  }
};