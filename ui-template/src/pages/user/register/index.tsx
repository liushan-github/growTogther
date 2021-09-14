import { Form, Button,  Input, Popover, Progress,  Select} from 'antd';
import React, { FC, useState } from 'react';
import { Link, connect, FormattedMessage,  Dispatch,useIntl  } from 'umi';

import { StateType } from './model';
import styles from './style.less';

const FormItem = Form.Item;
const {Option}=Select;
const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="userandregister.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="userandregister.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="userandregister.strength.short" />
    </div>
  ),
};

const passwordProgressMap: {
  ok: 'success';
  pass: 'normal';
  poor: 'exception';
} = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

interface RegisterProps {
  dispatch: Dispatch;
  userAndregister: StateType;
  submitting: boolean;
}

export interface UserRegisterParams {
  userName: string;
  pwd: string;
  confirm: string;
  status?:0;
}

const Register: FC<RegisterProps> = ({
  dispatch,
}) => {
  const [visible, setvisible]: [boolean, any] = useState(false);
  const [popover, setpopover]: [boolean, any] = useState(false);
  const confirmDirty = false;
  // let interval: number | undefined;
  const [form] = Form.useForm();
  const intl = useIntl();
  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };
  const onFinish = (values: { [key: string]: any }) => {
    dispatch({
      type: 'userAndregister/submit',
      payload: {
        ...values,
      },
    });
  };
  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue('password')) {
      return promise.reject(intl.formatMessage({ id: 'userandregister.password.twice' }));
    }
    return promise.resolve();
  };
  const checkPassword = (_: any, value: string) => {
    const promise = Promise;
    // 没有值的情况
    if (!value) {
      setvisible(!!value);
      return promise.reject(intl.formatMessage({ id: 'userandregister.password.required' }));
    }
    // 有值的情况
    if (!visible) {
      setvisible(!!value);
    }
    setpopover(!popover);
    if (value.length < 6) {
      return promise.reject('');
    }
    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }
    return promise.resolve();
  };
  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  return (
    <div className={styles.main}>
      <Form form={form} name="UserRegister" onFinish={onFinish}>
        <FormItem
          name="userName"
          rules={[
            {
              required: true,
              message: '请填写用户名',
            },
          ]}
        >
          <Input size="large" placeholder={'用户名'} />
        </FormItem>
        <Popover
          getPopupContainer={(node) => {
            if (node && node.parentNode) {
              return node.parentNode as HTMLElement;
            }
            return node;
          }}
          content={
            visible && (
              <div style={{ padding: '4px 0' }}>
                {passwordStatusMap[getPasswordStatus()]}
                {renderPasswordProgress()}
                <div style={{ marginTop: 10 }}>
                  <FormattedMessage id="userandregister.strength.msg" />
                </div>
              </div>
            )
          }
          overlayStyle={{ width: 240 }}
          placement="right"
          visible={visible}
        >
          <FormItem
            name="password"
            className={
              form.getFieldValue('password') &&
              form.getFieldValue('password').length > 0 &&
              styles.password
            }
            rules={[
              {
                validator: checkPassword,
              },
            ]}
          >
            <Input
              size="large"
              type="password"
              placeholder={intl.formatMessage({ id: 'userandregister.password.placeholder' })}
            />
          </FormItem>
        </Popover>
        <FormItem
          name="confirm"
          rules={[
            {
              required: true,
              message: '请输入确认密码',
            },
            {
              validator: checkConfirm,
            },
          ]}
        >
          <Input
            size="large"
            type="password"
            placeholder='确认密码'
          />
        </FormItem>
        <FormItem
          name="status"
          rules={[
            {
              required: true,
              message: '请选择身份',
            },
          ]}
        >
          <Select  style={{ width: '100%'}} placeholder={'请选择身份'} size={"large"}>
            <Option value="1">用户</Option>
            <Option value="2">游客</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button
            size="large"
            // loading={submitting}
            className={styles.submit}
            type="primary"
            htmlType="submit"
          >
            <FormattedMessage id="userandregister.register.register" />
          </Button>
          <Link className={styles.login} to="/user/login">
            <FormattedMessage id="userandregister.register.sign-in" />
          </Link>
        </FormItem>
      </Form>
    </div>
  );
};
export default connect(
  ({
    userAndregister,
  }: {
    userAndregister: StateType;

  }) => ({
    userAndregister,

  }),
)(Register);
