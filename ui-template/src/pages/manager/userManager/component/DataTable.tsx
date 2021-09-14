import React from "react";
import {Table, Avatar, Tag, Button, Popconfirm, message} from 'antd';
import {connect} from 'dva';
import {Dispatch} from 'redux'
import {TableData} from '../data.d';
import {EditOutlined,MinusOutlined} from '@ant-design/icons'

interface myProps {
  classManager: any,
  loading: boolean,
  dispatch: Dispatch,
}

interface myStates {
  selectedRowKeys: Array<number> | null,
  markDeleteSingle:boolean,
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
class DataTable extends React.Component<myProps, myStates> {
  state = {
    selectedRowKeys: [],
    markDeleteSingle:true,
  }
  componentDidMount(): void {
   this.reloadUserData();
  }
  //加载用户数据
  reloadUserData=()=>{
    const {dispatch} = this.props;
    dispatch({
      type: 'classManager/fetch'
    })
  }
  showTag = (text: string) => {
    switch (text) {
      case '2':
        return <Tag color='#87d068'>{'游客'}</Tag>;
        break;
      case '1':
        return <Tag color='#f50'>{'用户'}</Tag>;
        break;
      case '0':
        return <Tag color='#108ee9'>{'管理员'}</Tag>;
        break;
      default:
        return <Tag color='#87d068'>{'游客'}</Tag>;
    }
  }
  //确认删除单条数据
  confirm = (object: object) => {
    // @ts-ignore
    this.deleteData({id:object.id})
  }
  //取消删除
  cancel = (e: React.MouseEvent<HTMLElement> | undefined) => {
    message.error('Click on No');
    return;
  }
  //统一删除数据
  deleteData=(params:object)=>{
    const {dispatch}=this.props;
    const {markDeleteSingle}=this.state;
    dispatch({
      type:'classManager/deleteUsers',
      payload:params,
      callback:(res:{code:0|500,message:string})=>{
        if(res.code==0){
          message.success(res.message||'删除成功');
          if(!markDeleteSingle){
            this.setState({
              selectedRowKeys:[],
              markDeleteSingle:true,
            })
          }
          this.reloadUserData();
        }else{
          message.success(res.message||'删除失败')
        }
      }
    })
  }
  //删除所有数据
  deleteAll=()=>{
    this.setState({
      markDeleteSingle:false,
    },()=>{
      this.deleteData({id:this.state.selectedRowKeys})
    })

  }
  //选择数据
  onSelectChange = (selectedRowKeys: Array<number>) => {
    this.setState({selectedRowKeys});
  };

  render() {
    const {classManager,loading,handleEdit} = this.props;
    const {data}: { data: TableData[] } = classManager;
    const {selectedRowKeys} = this.state;
    const columns = [
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'name',
        align: 'center',

      },
      {
        title: '头像',
        dataIndex: 'avatar',
        key: 'avatar',
        align: 'center',
        render: (text: string, record: object) => {
          return <Avatar shape='square' size={'large'}
                         src={text ? text : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}/>
        }
      },
      {
        title: '身份',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        filters: [
          {
            text: '管理员',
            value: 0,
          },
          {
            text: '用户',
            value: 1,
          },
          {
            text: '游客',
            value: 2,
          },
        ],
        filterMultiple: false,
        onFilter: (value:string , record: { status: string }) => record.status == value,
        render: (text:string ) => {
          return this.showTag(text);
        }
      },
      {
        title: '所属部门',
        dataIndex: 'deptName',
        key: 'deptName',
        align: 'center',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        render: (text: number, record: object) => {
          return (
            <>
              <Button type="default" onClick={()=>handleEdit(record)}><EditOutlined /></Button>
              <Popconfirm
                title="Are you sure delete?"
                onConfirm={()=>this.confirm(record)}
                onCancel={(e)=>this.cancel(e)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="danger" style={{marginLeft: 10}}><MinusOutlined /></Button>
              </Popconfirm>
            </>
          )
        }
      }
    ]
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [
        {
          key: 'odd',
          text: 'Select Odd Row',
          onSelect: (changableRowKeys: Array<number>) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key: number, index: number) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            this.setState({selectedRowKeys: newSelectedRowKeys});
          },
        },
        {
          key: 'even',
          text: 'Select Even Row',
          onSelect: (changableRowKeys: Array<number>) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            this.setState({selectedRowKeys: newSelectedRowKeys});
          },
        },
      ],
    };
    return (<>
      <p>
        <Button type="danger" style={{marginRight: 10}} disabled={!(selectedRowKeys.length > 1)} onClick={this.deleteAll}>
          批量删除
        </Button>
      </p>
      <Table
        loading={loading}
        dataSource={data.data}
        columns={columns}
        rowSelection={rowSelection}
        rowKey={(record:{id:number}) => {
          return (record.id);
        }}
        style={{background: 'white'}}
    />
    </>)
  }
}

export default DataTable;
