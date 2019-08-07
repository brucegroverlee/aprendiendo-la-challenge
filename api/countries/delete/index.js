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
 * @returns {Promise} - Returns True if the operation was successfully. Otherwise, throw an error.
 */
const deleteACountry = (country, res) => {
  return new Promise((resolve) => {
    const {name} = country;
    db.query(
        'DELETE FROM `countries` WHERE `countries`.`name` = ?', 
        [name], 
        function (error, results, fields
      ) {
      if (error) {
        throw error;
      }
      console.log(`The country ${name} was deleted`);
      resolve(true);
    });
  });
};

/**
 * @function delete
 */
module.exports = async (req, res) => {
  try {
    const country = req.params;

    let deletedSucsessfully = false;

    const areValid = areAttributesValid(country, res);

    if (areValid) {
      deletedSucsessfully = await deleteACountry(country, res);
    }

    if (deletedSucsessfully) {
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