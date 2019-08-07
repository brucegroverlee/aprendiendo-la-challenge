const db = require('../../../db');

/**
 * 
 * @param {Object} country 
 * @param {Object} res 
 * @returns {Boolean} - Returns True if all the attributes are ok. Otherwise, returns False.
 */
const areAttributesValid = (country, res) => {
  const {name, currency, phoneCode, isoCode} = country;
  if ( name==='' || name===undefined || 
      currency==='' || currency===undefined || 
      phoneCode==='' || phoneCode===undefined || 
      isoCode==='' || isoCode===undefined || isoCode.length!==2
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
 * @param {Object} country 
 * @param {Object} res 
 * @returns {Promise} - Returns True if the operation was successfully. Otherwise, throw an error.
 */
const createNewCountry = (country, res) => {
  return new Promise((resolve) => {
    const {name, currency, phoneCode, isoCode} = country;
    db.query(
        `INSERT INTO \`countries\` (\`name\`, \`currency\`, \`phoneCode\`, \`isoCode\`) VALUES (?, ?, ?, ?);`, 
        [name, currency, phoneCode, isoCode], 
        function (error, results, fields) {
      if (error) {
        throw error;
      }
      console.log(`The country ${name} was created`);
      resolve(true);
    });
  });
};

/**
 * @function create
 */
module.exports = async (req, res) => {
  try {
    const country = req.body;

    let createdSucsessfully = false;

    const areValid = areAttributesValid(country, res);

    if (areValid) {
      createdSucsessfully = await createNewCountry(country, res);
    }

    if (createdSucsessfully) {
      res.status(201);
      res.end();
    }
  } catch (error) {
    res.status(500);
    res.send({
      "message":"The query failed."
    });
  }
};