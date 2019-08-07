const db = require('../../../db');

/**
 * 
 * @param {Object} res 
 * @returns {Promise} - Returns True if the operation was successfully. Otherwise, throw an error.
 */
const readListCountry = (res) => {
  return new Promise((resolve) => {
    db.query(
        'SELECT * FROM `countries`;', 
        [], 
        function (error, results, fields
      ) {
      if (error) {
        throw error;
      }
      resolve(results);
    });
  });
};

/**
 * @function readList
 */
module.exports = async (req, res) => {
  try {
    let result = {};

    result = await readListCountry(res);
    res.status(200);
    res.send(result);

  } catch (error) {
    res.status(500);
    res.send({
      "message":"The query failed."
    });
  }
};