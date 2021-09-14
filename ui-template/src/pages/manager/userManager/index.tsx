import React from 'react';
import BasicForm from './component/BasicForm';
// import VirtualTable from './component/VirtualTable';
import SearchForm from './component/SearchForm';
import DataTable from './component/DataTable';
import {message,Layout} from 'antd';
import EditModal from "@/pages/manager/userManager/component/EditModal";
import { connect } from 'umi';
import {Dispatch} from 'redux'
import md5 from 'blueimp-md5';
import './index.less'

// const { Header, Content, Footer, Sider } = Layout;
interface myProps {
  classManager: any,
  loading: boolean,
  dispatch: Dispatch,
}
interface myStates {
  rowData:undefined|object,
  visible:boolean,
  title:string,
}
@connect((
  {
    classManager,
    loading
  }:
    {
      classManager: any,
      loading: {
        effects: {
          [key: string]: string;
        };
      };
    }
) => ({
  classManager,
  loading: loading.effects['classManager/fetch'],
}))
class UserManager extends React.Component<myProps,myStates> {
  state={
    rowData:undefined,
    visible:false,
    title:'编辑',
  }
  //新增弹出框
  handleAdd=()=>{
    this.setState({
      rowData:undefined,
      visible:true,
      title:'新增',
    });
  }
  //弹出编辑框
  handleEdit=(rowData:object)=>{
    this.setState({
      rowData:rowData,
      visible:true,
      title:'编辑',
    });
  }
  //取消编辑
  onEditCancel=()=>{
    this.setState({
      rowData:undefined,
      visible:false,
      title:'编辑'
    });
  }
  //提交编辑数据
  onEditOk=(record:{pwd:string})=>{
    if(!!record){
      const {dispatch}=this.props;
      const {rowData}=this.state;
      if(record.pwd==null){
         record.pwd=rowData.pwd;
      }else{
         record.pwd=md5(record.pwd);
      }
        dispatch({
          type: 'classManager/editUsers',
          payload:{...record,id:rowData.id},
          callback:(res:{code:0|500,message:string})=>{
            if(res.code==0){
              message.success(res.message||'编辑成功');
              this.onEditCancel();
              dispatch({
                type: 'classManager/fetch'
              });
            }else{
              message.success(res.message||'编辑失败')
            }
          }
        })

    }
  }

  render() {
    const {visible,title,rowData}=this.state;
    const tableMethods={
      handleEdit:this.handleEdit,
      handleAdd:this.handleAdd,
    }
    const editProps={
      visible:visible,
      onEditCancel:this.onEditCancel,
      onEditOk:this.onEditOk,
      title:title,
      rowData: rowData,
    }
    return (<>
      {/*<BasicForm/>*/}
      <SearchForm />
      <DataTable  {...tableMethods} />
      <EditModal {...editProps} />
    </>)
  }
}

export default UserManager;
