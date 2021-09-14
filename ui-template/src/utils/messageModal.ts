import { Modal } from 'antd';

/**
 * 消息弹框封装
 * @param modalType 消息弹框类型 info:信息 success:成功 error:失败 warning:警告 confirm:确认
 * @param title 标题
 * @param content 内容
 * @param onOk 成功回调函数
 * @param onCancel 取消回调函数
 * 没有参数要放null
 */
export function messageModal(modalType: string, title: string, content: string, onOk: () => void, onCancel: () => void) {
  // info:信息 error:失败 warning:警告弹框显示时间 3秒
  const waitingTime = 2 * 1000;
  // title长度超过22，截取至21位后面加...
  if (title && title.length > 20) {
    title = title.substring(0, 21) + '...';
  }
  if (content && content.length > 44) {
    content = content.substring(0, 43) + '...';
  }
  if (modalType === 'info') {
    Modal.info({
      centered: true,
      title,
      content,
      okButtonProps: { style: { display: 'none' } },
      maskClosable: true,
      mask: false,
    });
  }
  if (modalType === 'success') {
    const modal = Modal.success({
      centered: true,
      title,
      content,
      okButtonProps: { style: { display: 'none' } },
      maskClosable: true,
      mask: false,
    });
    // 成功弹框显示 1秒
    setTimeout(() => { modal.destroy(); }, 1000);
  }
  if (modalType === 'error') {
    const modal = Modal.error({
      centered: true,
      title,
      content,
      okButtonProps: { style: { display: 'none' } },
      maskClosable: true,
      mask: false,
    });
    setTimeout(() => { modal.destroy(); }, waitingTime);
  }
  if (modalType === 'warning') {
    const modal = Modal.warning({
      centered: true,
      title,
      content,
      okButtonProps: { style: { display: 'none' } },
      maskClosable: true,
      mask: false,

    });
    setTimeout(() => { modal.destroy(); }, waitingTime);
  }
  if (modalType === 'confirm') {
    Modal.confirm({
      centered: true,
      title,
      content,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        if (onOk) {
          onOk();
        }
      },
      onCancel() {
        if (onCancel) {
          onCancel();
        }
      },
    });
  }
}
