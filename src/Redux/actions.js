export const GET_COMMODITYDATA = 'GET_COMMODITYDATA';

const API_URL = 'https://data.opendatasoft.com/api/records/1.0/search/?dataset=commodity-prices%40public&q=&';

export const DELETE_COMMODITYDATA = 'DELETE_COMMODITYDATA';

export const getCommodityData = (year) => {
  try {
    return async dispatch => {
      const result = await fetch(`${API_URL}refine.date=${[year]}%2F12`);
      const data = await result.json();
      const records = await data.records;

      if (records) {
        dispatch({
          type: GET_COMMODITYDATA,
          payload: records,
        });
      } else {
        console.log(`Unable to fetch commodity data for ${year}`);
      }
    };
  } catch (error) {
    console.error(`Error retrieving data from API server ${error}`);

  }
};

export const cleanCommodityData = () => {
  return async dispatch => {
    dispatch({
      type: DELETE_COMMODITYDATA
    }
    )
  };
};