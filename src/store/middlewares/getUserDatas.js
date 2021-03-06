import axios from 'axios';
import {
  GET_USER_DATAS,
  UPDATE_USER_DATAS,
  MODIFY_USER_DATAS,
  TEST_USER_DATAS,
} from '../actions';

import url from '../graphql/endpoint';
import { getUserDatas, updateUserDatas } from '../graphql/queries';

const getUserMiddleware = (store) => (next) => (action) => {
  if (action.type === GET_USER_DATAS) {
    const state = store.getState();
    // on prépare la requete
    const config = {
      method: 'post',
      url,
      data: {
        query: getUserDatas(
          state.user.mail,
        ),
      },
    };
    // on joue la requête avec axios
    axios(config)
      // si réussite
      .then(({ data }) => {
        store.dispatch({
          type: UPDATE_USER_DATAS,
          payload: data.data.user,
        });
      })
      .catch((error) => {
        console.log(error);
        // store.dispatch({ type: GET_USER_TOKEN_ERROR });
      });
  }
  else if (action.type === 'GET_USER_DATAS_REFRESH') {
    // on prépare la requete
    const config = {
      method: 'post',
      url,
      data: {
        query: getUserDatas(
          action.mail,
        ),
      },
    };
    // on joue la requête avec axios
    axios(config)
      // si réussite
      .then(({ data }) => {
        store.dispatch({
          type: UPDATE_USER_DATAS,
          payload: data.data.user,
        });
      })
      .catch((error) => {
        console.log(error);
        // store.dispatch({ type: GET_USER_TOKEN_ERROR });
      });
  }
  // TODO Need to be fix
  else if (action.type === MODIFY_USER_DATAS) {
    const state = store.getState();
    console.log(' id la personnne', state.user.id);
    // on prépare la requete
    const config = {
      method: 'post',
      url,
      data: {
        query: updateUserDatas({
          id: Number(state.user.id),
          toUpdate: { ...state.account.toUpdate },
          response: [
            'first_name',
            'username',
            'last_name',
            'civility',
            'email',
            'password',
            'address',
            'city_code',
            'city',
            'phone',
            'id',
          ],
        }),
      },
    };
    console.log('state.account.toUpdate', state.account.toUpdate);
    console.log('middleWare GraphQl Query:', config.data.query);
    // on joue la requête avec axios
    axios(config)
    // si réussite
      .then(({ data }) => {
        store.dispatch({
          type: TEST_USER_DATAS,
          // payload: data.updateUser,
          ...data.data.updateUser,
        });
        store.dispatch({ type: 'TOGGLE_INPUT_ACCOUNT' });
      })
      .catch((error) => {
        console.log(error);
        // store.dispatch({ type: GET_USER_TOKEN_ERROR });
      });
  }
  else {
    next(action);
  }
};

export default getUserMiddleware;
