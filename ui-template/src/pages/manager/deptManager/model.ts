import {Effect, Reducer} from 'umi';
import {query} from '@/services/dept';

export interface CurrentDept {
  deptName?: string;
  id?: number;
  step?: number;
  deptOriginId?: number,
}

export interface UserModelState {
  currentDept?: [];
}

export interface DeptModelType {
  namespace: 'deptManager';
  state: UserModelState;
  effects: {
    fetch: Effect;
    // fetchCurrent: Effect;
    // getUser:Effect;
  };
  reducers: {
    save: Reducer<UserModelState>;
  };
}

const DeptModel: DeptModelType = {
  namespace: 'deptManager',

  state: {
    currentDept: [],
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

  },

  reducers: {
    save(state, action) {
      console.log(action)
      return {
        ...state,
        currentDept: action.payload.data || {},
      };
    },
  }
};

export default DeptModel;
