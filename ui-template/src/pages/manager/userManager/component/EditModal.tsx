import React, {useState} from 'react';
import { Modal,Form,Input,Select } from 'antd';
import {FormValueType} from "@/pages/ListTableList/components/UpdateForm";

const FormItem = Form.Item;
const { Option } = Select;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

interface CreateFormProps {
  visible: boolean;
  title:string;
  rowData:undefined|object;
  onEditCancel: () => void;
  onEditOk: () => void;
}

const EditModal: React.FC<CreateFormProps> = (props) => {
  const {onEditCancel,onEditOk,title,visible,rowData}= props;
  const [formVals, setFormVals] = useState<FormValueType>({
    userName: rowData&&rowData.userName,
    status: rowData&&rowData.status,
    pwd: rowData&&rowData.pwd,
  });
  const [form] = Form.useForm();
  const onhandle=async ()=>{
    const fieldsValue = await form.validateFields();
    onEditOk(fieldsValue);
  }
  console.log(rowData)
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={()=>onhandle()}
      onCancel={()=>onEditCancel()}
      destroyOnClose
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          userName: (visible&&rowData)?rowData.userName:null,
          status:(visible&&rowData)?rowData.status:null,
          pwd:null,
        }}
      >
        <FormItem
          name="userName"
          label="用户名"
          rules={[{ required: true, message: '请输入用户名！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <Form.Item
          label="密码重置"
          name="pwd"
          // rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password placeholder={'为空时是代表密码不重置'}/>
        </Form.Item>
        <FormItem name="status" label="身份">
          <Select style={{ width: '100%' }}>
            <Option value="0">管理员</Option>
            <Option value="1">用户</Option>
            <Option value="2">游客</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default EditModal;
