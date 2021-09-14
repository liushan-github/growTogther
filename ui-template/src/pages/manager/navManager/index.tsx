import React, {useEffect, useState} from 'react';
import {Button, Table, Modal, Form, Input, message, Typography, Select} from 'antd';
// @ts-ignore
import {ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {connect} from "dva";
import {formatDate} from "@/utils/utils";

const {Link} = Typography;
const {Option} = Select;

export type Status = {
  color: string;
  text: string;
};

const statusMap = {
  0: {
    color: 'blue',
    text: '进行中',
  },
  1: {
    color: 'green',
    text: '已完成',
  },
  2: {
    color: 'volcano',
    text: '警告',
  },
  3: {
    color: 'red',
    text: '失败',
  },
  4: {
    color: '',
    text: '未完成',
  },
};

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: Status;
  createdAt: number;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: statusMap[Math.floor(Math.random() * 10) % 5],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
  });
}


const navManager = (props: { dispatch: any; navManager: any; loading: any; }) => {
  const {dispatch, navManager, loading} = props;
  const [classifyVisible, addClassify] = useState(false);
  const [navList, getNavList] = useState([]);
  const [expandedRowKeys, handleExpandedRow] = useState([0]);
  const [isNavorList, openNavorList] = useState(0)//0代表应用，1代表列表
  const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
  };
  const expandedRowRender = () => {
    return (
      <Table
        columns={[
          {
            title: '名称',
            width: 120,
            dataIndex: 'name',
            align: 'center'

          },
          {
            title: 'url',
            width: 120,
            dataIndex: 'url',
            align: 'center',
            render: (text) => <Link href={text} target="_blank">
              {text}
            </Link>

          },
          {
            title: '描述',
            width: 120,
            dataIndex: 'dsc',
            align: 'center'

          },
          {
            title: '更新时间',
            width: 120,
            dataIndex: 'lastModifiedTime',
            align: 'center',
            render: (text: string) => formatDate(text)

          },
          {
            title: '操作',
            width: 164,
            key: 'option',
            align: 'center',
            render: (text: string, {id}: { id: number }) => [
              <a key="1" onClick={() => {
                handleDelete(id)
              }}>删除</a>,
              <a key="2">修改</a>,
            ],
          }]}
        dataSource={navList}
        pagination={false}
      />
    );
  };
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'navManager/fetch',
      });
    }
  }, []);
  // useEffect(() => {
  //   const {dispatch} = props;
  //   dispatch({
  //     type: 'deptManager/fetch',
  //   })
  // });
  const [form] = Form.useForm();
  const showModal = (mark: 0 | 1) => {
    form.resetFields();
    openNavorList(mark);
    addClassify(true);
  };

  const handleOk = () => {
    form.validateFields().then(value => {
      let type;
      if (isNavorList == 0) {
        type = 'navManager/edit'
      } else {
        type = 'navManager/editList'
      }
      dispatch({
        type,
        payload: value,
        callback: (res: { code: 0 | 500, message: string }) => {
          if (res.code == 0) {
            message.success(res.message || '编辑成功');
            dispatch({
              type: 'navManager/fetch',
            });
          } else {
            message.error(res.message || '编辑失败')
          }
        }

      });
      addClassify(false);
    }).catch(errorInfo => {
      console.log(errorInfo)
    });
  };

  const handleCancel = () => {
    addClassify(false);
  };
  const handleDelete = (id: number) => {
    dispatch({
      type: 'navManager/delete',
      payload: {id},
      callback: (res: { code: 0 | 500, message: string }) => {
        if (res.code == 0) {
          message.success(res.message || '删除成功');
          dispatch({
            type: 'navManager/fetch',
          });
        } else {
          message.error(res.message || '删除失败')
        }
      }
    });
  }
  const handleTableExpand = (isOpen: boolean, {id}: { id: number }) => {
    if (isOpen) {
      handleExpandedRow([id]);
      dispatch({
        type: 'navManager/fetchList',
        payload: {id},
        callback: (res: { code: 0 | 500, message: string, data: Array<object> }) => {
          if (res.code == 0) {
            getNavList(res?.data);
          } else {
            message.error(res.message || '请求失败')
          }
        }
      });
    } else {
      handleExpandedRow([]);
    }

  }
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '应用名称',
      width: 120,
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: '编码',
      width: 120,
      dataIndex: 'code',
      align: 'center'

    },
    {
      title: '更新时间',
      width: 120,
      dataIndex: 'lastModifiedTime',
      align: 'center',
      render: (text: string) => formatDate(text)

    },
    {
      title: '操作',
      width: 164,
      key: 'option',
      align: 'center',
      render: (text: string, {id}: { id: number }) => [
        <a key="1" onClick={() => {
          handleDelete(id)
        }}>删除</a>,
        <a key="2">修改</a>,
      ],
    },
    // {
    //   title: '状态',
    //   width: 120,
    //   dataIndex: 'status',
    //   render: (_, record) => <Tag color={record.status.color}>{record.status.text}</Tag>,
    // },
    // {
    //   title: '容器数量',
    //   width: 120,
    //   dataIndex: 'containers',
    //   align: 'right',
    //   sorter: (a, b) => a.containers - b.containers,
    // },
    //
    // {
    //   title: '创建者',
    //   width: 120,
    //   dataIndex: 'creator',
    //   valueEnum: {
    //     all: { text: '全部' },
    //     付小小: { text: '付小小' },
    //     曲丽丽: { text: '曲丽丽' },
    //     林东东: { text: '林东东' },
    //     陈帅帅: { text: '陈帅帅' },
    //     兼某某: { text: '兼某某' },
    //   },
    // },
    // {
    //   title: (
    //     <>
    //       创建时间
    //       <Tooltip placement="top" title="这是一段描述">
    //         <QuestionCircleOutlined style={{ marginLeft: 4 }} />
    //       </Tooltip>
    //     </>
    //   ),
    //   width: 140,
    //   key: 'since',
    //   dataIndex: 'createdAt',
    //   valueType: 'date',
    //   sorter: (a, b) => a.createdAt - b.createdAt,
    // },
    // {
    //   title: '操作',
    //   width: 164,
    //   key: 'option',
    //   valueType: 'option',
    //   render: () => [
    //     <a key="1">链路</a>,
    //     <a key="2">报警</a>,
    //     <a key="3">监控</a>,
    //     <a key="4">
    //       <EllipsisOutlined />
    //     </a>,
    //   ],
    // },
  ];
  return (
    <>
      <ProTable<TableListItem>
        columns={columns}
        dataSource={navManager.navData}
        loading={loading}
        rowKey="id"
        pagination={{
          showQuickJumper: true,
        }}
        expandable={{expandedRowRender}}
        onExpand={handleTableExpand}
        expandedRowKeys={expandedRowKeys}
        search={false}
        dateFormatter="string"
        headerTitle="嵌套表格"
        options={false}
        toolBarRender={() => [
          <Button key="show" onClick={() => showModal(0)}>新增类别</Button>,
          <Button key="primary" type="primary" onClick={() => showModal(1)}>
            新增菜单
          </Button>,
        ]}
      />
      <Modal title={isNavorList == 0 ? '新增类别' : '新增列表'} visible={classifyVisible} onOk={handleOk} destroyOnClose
             onCancel={handleCancel}>
        <Form
          {...layout}
          name="basic"
          form={form}
          initialValues={{name: ''}}
        >
          <Form.Item
            label="名称"
            name="name"
            rules={[{required: true, message: '请输入名称!'}]}
          >
            <Input/>
          </Form.Item>
          {isNavorList == 0 ? <Form.Item
            label="编码"
            name="code"
            rules={[{required: true, message: '请输入编码!'}]}
          >
            <Input/>
          </Form.Item> : <Form.Item
            label="类别"
            name="navId"
            rules={[{required: true, message: '请选择类别!'}]}
          >
            <Select>
              {
                navManager.navData.map((item: { id: number, name: string }, index: number) => {
                  return <Select.Option value={item.id} key={index}>{item.name}</Select.Option>
                })
              }

            </Select>
          </Form.Item>}
          {isNavorList == 1 ?
            <Form.Item
              name="url"
              label="url"
              rules={
                [
                  {required: true, message: '请输入地址!'}, {
                  pattern: new RegExp(/(^(http|https):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/, "g"),
                  message: '请输入合法地址'
                },]
              }>
              <Input/>
            </Form.Item> : null}
          {isNavorList == 1 ?
            <Form.Item
              name="dsc"
              label="描述"
              rules={
                [
                  {required: false, message: '请输入描述!'},]
              }>
              <Input/>
            </Form.Item> : null}
        </Form>
      </Modal>
    </>
  );
};
export default connect((
  {
    navManager,
    loading
  }:
    {
      navManager: any,
      loading: {
        effects: {
          [key: string]: string;
        };
      };
    }
) => ({
  navManager,
  loading: loading.effects['navManager/fetch'],
}))(navManager);
