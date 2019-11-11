module.exports = function queryParser() {

  return (req, res, next) => {

    const url = req.url.split('?')[1];

    if(url) {
      const searchParams = url.split('&');

      const query = searchParams.reduce((acc, val) => {
        let [param, value] = val.split('=');
        const paramArr = param.split('_');

        if(paramArr.length === 1) {
          value = value.replace('%20', ' ').replace('+', ' ');
          if(param === 'width' || param === 'height' || param === 'solutionLength' || param === 'connectivity' || param === 'averagePathLength') {
            value = Number(value);
          }
          acc[param] = value;
          return acc;
        }

        let [key, operator] = paramArr;
        
        const values = (acc[key]) ? acc[key] : {};
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