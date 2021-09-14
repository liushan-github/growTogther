import React from "react";
import {Row, Col, Form, Button, Input} from "antd";
import { DownOutlined,UpOutlined} from '@ant-design/icons';
import {FormComponentProps} from 'antd/es/form';
import QueueAnim from 'rc-queue-anim';

const FormItem = Form.Item;

interface myState {
  expand: boolean;
}

interface myProps extends FormComponentProps {

}

class MyForm extends React.Component<myProps, myState> {
  state = {
    expand: false,
  }
  toggle = () => {
    const {expand,} = this.state;
    this.setState({
      expand: !expand,
    });
  }
  handleSearch = (e: Event) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {


    });
  }
  getFields = () => {
    const {getFieldDecorator} = this.props.form;
    const {expand} = this.state;
    const formLayout = {
      labelCol: {span: 8},
      wrapperCol: {span: 16},
    };
    return <QueueAnim animConfig={[
      {opacity: [1, 0], translateY: [0, 50]},
      {opacity: [1, 0], translateY: [0, -50]}
    ]}
    >
      {expand ?
        <Row gutter={{md: 8, lg: 24, xl: 48}} key="c">
          <Col md={8} sm={24}>
            <FormItem label="姓名" {...formLayout} style={{width: '100%'}}>
              {getFieldDecorator('name')(<Input placeholder="请输入" style={{width: '100%'}}/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="学号" {...formLayout} style={{width: '100%'}}>
              {getFieldDecorator('identity',{
                rules:[{
                  type:'number',
                  message:'请输入数字',
                }]
              })(<Input placeholder="请输入" style={{width: '100%'}}/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24} style={{padding: '4px 4px'}}>
            <span>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{marginLeft: 8}}>
                重置
              </Button>
            </span>
          </Col>
        </Row> : null}
    </QueueAnim>
  }

  render() {
    return (
      <Row style={{marginBottom: 10}}>
        <Form onSubmit={this.handleSearch} layout="inline">
          {this.getFields()}
        </Form>
        <Col span={24} style={{textAlign: 'center'}}>
          <a style={{marginLeft: 8, fontSize: 12}} onClick={this.toggle}>
            Collapse {this.state.expand ? <UpOutlined />: <DownOutlined />}
          </a>
        </Col>
      </Row>
    )
  }
}

const BasicForm = Form.create()(MyForm);
export default BasicForm;
