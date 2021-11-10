/* eslint-disable guard-for-in */
/* eslint-disable space-before-blocks */
/* eslint-disable no-restricted-syntax */
import axios from 'axios';
import { tomtomSearch } from '../graphql/queries';
import url from '../graphql/endpoint';

import {
  GET_DATAS_FROM_API,
  GET_DATAS_FROM_API_SUCCESS,
  GET_DATAS_FROM_API_ERROR,
  GET_ISOCHRONE,
  GET_ISOCHRONE_SUCCESS,
  GET_ISOCHRONE_ERROR,
  GET_DATA_AIR_POLLUTION,
  GET_DATA_AIR_POLLUTION_SUCCESS,
  GET_DATA_AIR_POLLUTION_ERROR,
} from '../actions';

const getDateApi = (store) => (next) => (action) => {
  if (action.type === GET_DATAS_FROM_API) {
    const state = store.getState();
    axios({
      url,
      method: 'post',
      data: {
        query: tomtomSearch(
          action.keyword,
          state.map.currentPos[0],
          state.map.currentPos[1],
          state.search.inputValueMiles,
          1000,
        ),
      },
    }).then((result) => {
      console.log(result.data.data);
      store.dispatch({
        type: GET_DATAS_FROM_API_SUCCESS,
        payload: result,
        keyword: action.keyword,
      });
    }).catch((error) => {
      console.log(error);
      store.dispatch({ type: GET_DATAS_FROM_API_ERROR, payload: error });
    });
  }

  else if (action.type === GET_ISOCHRONE) {
    const state = store.getState();
    store.dispatch({ type: 'RESET_ISOCHRONE' });
    const data = JSON.stringify({
      locations: [state.map.currentPosOrs],
      range: [
        state.search.inputValueTime,
      ],
      area_units: 'm',
      units: 'm',
    });

    const config = {
      method: 'post',
      url: 'https://api.openrouteservice.org/v2/isochrones/driving-car?profile=driving-car',
      headers: {
        Authorization: '5b3ce3597851110001cf62485f363f8354464494b0854dbe8271c39e',
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        store.dispatch({
          type: GET_ISOCHRONE_SUCCESS,
          data: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  else if (action.type === GET_DATA_AIR_POLLUTION) {
    axios({
      url: 'https://api.openweathermap.org/data/2.5/air_pollution?lat=48.79000111056284&lon=2.258023334337732&appid=20f05e618a16e58b7a3297b0a5b68b66',
    })
      .then((result) => {
        if (result.data.list[0].components){
          const airComponentsValues = Object.values(result.data.list[0].components);
          console.log(result.data.list[0]);
          store.dispatch({
            type: GET_DATA_AIR_POLLUTION_SUCCESS,
            values: airComponentsValues,
            airQualityNote: 5,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  else {
    next(action);
  }
};

export default getDateApi;
