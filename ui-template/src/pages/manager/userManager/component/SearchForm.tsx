import React, { useState, useEffect } from 'react';
import { Form, Input, Button,Select } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Option } = Select;
const SearchForm = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values:object) => {
    console.log('Finish:', values);
  };

  return (
    <Form  form={form} name="horizontal_login" layout="inline" onFinish={onFinish} style={{marginBottom:10}}>
      <Form.Item
        name="userName"
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
      </Form.Item>
      <Form.Item name="status" >
        <Select   placeholder="身份">
          <Option value="1">用户</Option>
          <Option value="2">游客</Option>
        </Select>
      </Form.Item>
      <Form.Item >
        {() => (
          <Button
            type="primary"
            htmlType="submit"
          >
            查询
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};
export default SearchForm;
