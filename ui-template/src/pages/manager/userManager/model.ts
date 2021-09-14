import {AnyAction, Reducer} from 'redux';
import {EffectsCommandMap} from 'dva';
import {fetchData,searchTable,deleteUsers,editUsers} from './service';

import {TableData} from './data.d';

export interface StateType {
  data: Array<TableData>;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    searchTable:Effect;
    deleteUsers:Effect;
    editUsers:Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'classManager',
  state: {
    data: [],
  },
  effects: {
    * fetch(_, {call, put}) {
      const response = yield call(fetchData);
      yield put({
        type: 'save',
        payload: response,
      })
    },
    * searchTable({payload},{call,put}){
      const response=yield call(searchTable,payload);
      yield put({
        type:'save',
        payload:response,
      })
    },
    * editUsers({payload,callback},{call,put}){
      const response=yield call(editUsers,payload);
      if(callback&&response){
        callback(response);
      }
    },
    * deleteUsers({payload,callback},{call,put}){
      const response=yield call(deleteUsers,payload);
      if(callback&&response){
         callback(response);
      }
    }
  },
  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        data: payload.data,
      };
    }
  },
}
export default Model;
