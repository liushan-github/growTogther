
import { Effect, Reducer } from 'umi';

import { fakeRegister } from './service';
import {messageModal} from "@/utils/messageModal";

export interface StateType {
  status?: 0 ;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submit: Effect;
  };
  reducers: {
    registerHandle: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'userAndregister',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      try{
        const response = yield call(fakeRegister, payload);
        yield put({
          type: 'registerHandle',
          payload: response,
        });
        if(response.code==99){
          // @ts-ignore
          messageModal('error',response.message);
        }else{
          // @ts-ignore
          messageModal('success',response.message);
          yield put({
            type: 'registerHandle',
            payload: response,
          });
        }
      }catch (e) {
        console.log(e)
      }
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};

export default Model;
