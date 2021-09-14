import React from 'react';
import {Table, Space,Button} from 'antd';
import {connect} from 'dva';
import {Dispatch} from 'redux';
import {CurrentDept} from './model'
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

interface myProps {
  loading: boolean,
  dispatch: Dispatch,
  deptManager:{currentDept:CurrentDept}
}

interface myStates {

}
@connect((
  {
    deptManager,
    loading
  }:
    {
      deptManager: any,
      loading: {
        effects: {
          [key: string]: string;
        };
      };
    }
) => ({
  deptManager,
  loading: loading.effects['deptManager/fetch'],
}))
class DeptManager extends React.Component<myProps, myStates> {
  state:myStates = {

  }
  componentDidMount(): void {
    this.reloadDeptData();
  }
  //加载部门数据
  reloadDeptData=()=>{
    const {dispatch} = this.props;
    dispatch({
      type: 'deptManager/fetch',
    })
  }

  //订阅用户
  handleSubUser=()=>{

  }
  //新增部门
  handleAdd=()=>{

  }
  //编辑部门
  handleEdit=()=>{

  }
  //删除部门
  handleDelete=(id:number)=>{

  }
  render() {
    const {deptManager:{currentDept}}=this.props;
    const rowSelection:any = {
      type:'radio',
      // onChange: (selectedRowKeys:Key[], selectedRows:object):void=> {
      //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      // },
    };
    const columns:ProColumns<CurrentDept>[] = [
      {
        title: '部门',
        dataIndex: 'deptName',
        align:'center',
        key: 'name',
      },
      {
        title: '操作',
        dataIndex: 'id',
        align:'center',
        key: 'id',
        render:(text:number)=>{
          return   <Button onClick={()=>this.handleDelete(text)}>删除</Button>
        }
      }
    ];
    return (<>
      <Space align="center" style={{ marginBottom: 16,marginRight:8 }}>
        <Button onClick={this.handleSubUser}>订阅用户</Button>
      </Space>
      <Space align="center" style={{ marginBottom: 16,marginRight:8 }}>
        <Button onClick={this.handleAdd}>新增部门</Button>
      </Space>
      <Space align="center" style={{ marginBottom: 16,marginRight:8 }}>
        <Button onClick={this.handleEdit}>编辑部门</Button>
      </Space>
      <Table
        columns={columns}
        rowSelection={{ ...rowSelection}}
        dataSource={currentDept}
        rowKey='id'
      />
    </>)
  }
}

export default DeptManager;
