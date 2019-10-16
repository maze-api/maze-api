module.exports = function queryParser() {

  return (req, res, next) => {

    const url = req.url.split('?')[1];

    if(url) {
      const searchParams = url.split('&');
      const query = searchParams.reduce((acc, val) => {
        const entry = val.split('=');
        let key = entry[0];
        const value = entry[1];
        const keyOperator = key.split('_');

        if(keyOperator.length === 1) {
          acc[key] = value;
          return acc;
        }

        key = keyOperator[0];
        let operator = keyOperator[1];
        if(acc[key]) {
          const values = acc[key];
          values[`$${operator}`] = value;
          acc[key] = values;
          return acc;
        }

        const values = {};
        values[`$${operator}`] = value;
        acc[key] = values;
        return acc;

      }, {});

      req.query = query;
    }
    next();
  };
};