import {Effect, Reducer} from 'umi';
import {query,edit,deleteNav,queryList,editList} from './service';

export interface navData {
  name?: string;
  id?: number;
}

export interface modelState {
  navData?: [];
}

export interface ModelType {
  namespace: 'navManager';
  state: modelState;
  effects: {
    fetch: Effect;
    edit: Effect;
    delete:Effect;
    fetchList:Effect;
    // fetchCurrent: Effect;
    // getUser:Effect;
  };
  reducers: {
    save: Reducer<modelState>;

  };
}

const NavModel: ModelType = {
  namespace: 'navManager',

  state: {
    navData: [],
  },

  effects: {
    * fetch({payload, callback}, {call, put}) {
      const response = yield call(query, payload);
      if (response.code == 0&&callback) {
        callback(response.data)
      }
      yield put({
        type: 'save',
        payload: response,
      });
    },
    * edit({payload,callback},{call,put}){
      const response=yield call(edit,payload);
      if(callback&&response){
        callback(response);
      }
    },
    * delete({payload,callback},{call,put}){
      const response=yield call(deleteNav,payload);
      if(callback&&response){
        callback(response);
      }
    },
    * fetchList({payload, callback}, {call, put}) {
      const response = yield call(queryList, payload);
      if (response.code == 0&&callback) {
        callback(response)
      }
    },
    * editList({payload,callback},{call,put}){
      const response=yield call(editList,payload);
      if(callback&&response){
        callback(response);
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        navData: action.payload.data || {},
      };
    },
  }
};

export default NavModel;
