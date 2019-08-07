let db = {};

let __mockError = false;
const __setMockError = (newMockError) => {
  __mockError = newMockError;
};

let __mockResults = {};
const __setMockResults = (newMockResults) => {
  __mockResults = newMockResults;
};

let __mockFields = {};
const __setMockFields = (newMockFields) => {
  __mockFields = newMockFields;
};

db.__setMockError = __setMockError;
db.__setMockResults = __setMockResults;
db.__setMockFields = __setMockFields;
db.query = (query, values, callback) => {
  callback(__mockError, __mockResults, __mockFields);
};
module.exports = db;