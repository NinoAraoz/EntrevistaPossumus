import { cleanCommodityData, GET_COMMODITYDATA } from './actions';
import { DELETE_COMMODITYDATA } from './actions';


const initialState = {
    commodityPrices: {}
};

const commoditiesOfInterest = ['Oil Dubai', 'Coal', 'Uranium', 'Copper'];

const getCommodityPrices = (records, commodityPrices) => {
    commoditiesOfInterest.forEach(commodity => {
        const filteredRecords = records
            .filter(record => record.fields.commodity === commodity)
            .map(record => {
                return {
                    date: record.fields.date.substring(0, 4),
                    price: record.fields.price_index,
                    recordid: record.recordid
                }
            })
            ;

        if (filteredRecords && filteredRecords.length > 0) {
            if (commodityPrices[commodity]) {
                commodityPrices[commodity] = commodityPrices[commodity].concat(filteredRecords);
            } else {
                commodityPrices[commodity] = filteredRecords;
            }
        }
    });
    return commodityPrices;

}

function commodityReducer(state = initialState, action) {
    console.log (`commodityReducer; action = ${JSON.stringify (action)}`);
    switch (action.type) {
        case DELETE_COMMODITYDATA:
            return { ...state, commodityPrices: {}};
        case GET_COMMODITYDATA:
            return { ...state, commodityPrices: getCommodityPrices(action.payload, state.commodityPrices) };
        default:
            console.log(`returning default state = ${JSON.stringify(state)}`);
            return state;
    }
}
export default commodityReducer;