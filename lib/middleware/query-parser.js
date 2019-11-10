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
          let format = value.replace('%20', ' ').replace('+', ' ');
          if(key === 'width' || key === 'height' || key === 'solutionLength' || key === 'connectivity' || key === 'averagePathLength') {
            format = Number(format);
          }
          acc[key] = format;
          return acc;
        }

        key = keyOperator[0];
        let operator = keyOperator[1];

        if(acc[key]) {
          const values = acc[key];
          values[`$${operator}`] = Number(value);
          acc[key] = values;
          return acc;
        }

        const values = {};
        values[`$${operator}`] = Number(value);
        acc[key] = values;
        return acc;

      }, {});

      const formattedQuery = Object.keys(query).reduce((acc, key) => {
        if(key === 'height' || key === 'width') {
          const newKey = `dimensions.${key}`;
          acc[newKey] = query[key];
          return acc;
        }
        acc[key] = query[key];
        return acc;
      }, {});

      req.query = formattedQuery;
    }
    next();
  };
};



/*

{height: 4,
width: 4}


{{ 'dimensions.height': 3 }}



{height: {$lt: 10},
width: {$gt: 10}}

{dimensions: { height: {$lt: 10}, width: {$gt: 100} } }


*/