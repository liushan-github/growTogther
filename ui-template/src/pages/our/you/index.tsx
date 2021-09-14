import React, {useState} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {Alert, Divider, Collapse, Space, Radio, Button, Row, Col} from 'antd';
import {Dispatch} from 'umi';
import styles from './index.less'
import T20210415 from './20210415'
import T20210416 from './20210416'
import T20210419 from './20210419'
import T20210420 from './20210420'
import T20210421 from './20210421'
// import {ConnectState} from "@/models/connect";
const {Panel} = Collapse;

interface YouProps {
  dispatch: Dispatch;
}

// display: containerDisplay,
//   flexDirection: dic,
//   flexWrap: wrap,
//   width: containerWidth,
//   height: containerHeight,
//   justifyContent:justifyContent,
//   alignItems:alignItems,
//   alignContent:alignContent

const You: React.FC<YouProps> = (props) => {
  const [state, changeKey] = useState(['1'] as string | string[]);
  const [containerDisplay, setDisplay] = useState('flex');
  const [dic, setDisplayDic] = useState('row');
  const [wrap, setDisplayWrap] = useState('nowrap');
  const [containerWidth, setContainerWidth] = useState('600px');
  const [containerHeight, setContainerHeight] = useState('100px');
  const [justifyContent, setJustifyContent] = useState('flex-start');
  const [alignItems, setAlignItem] = useState('flex-start');
  const [alignContent, setAlignContent] = useState('flex-start');
  const [itemWidth, setItemWidth] = useState('100px');
  const [itemHeight, setItemHeight] = useState('100px');
  const [alignSelf, setAlignSelf] = useState('flex-start');
  // const [flexGrow, setFlexGrow] = useState(1);
  // const [flexShrink, setFlexShrink] = useState(0.1);
  const container = [{
    name: '宽度:',
    code: containerWidth,
    fun: setContainerWidth,
    value: ['600px', '800px', '1000px']
  }, {
    name: '高度:',
    code: containerHeight,
    fun: setContainerHeight,
    value: ['100px', '200px', '300px']
  }, {
    name: 'display:',
    code: containerDisplay,
    fun: setDisplay,
    value: ['flex', 'inline-flex']
  }, {
    name: 'display-dic:',
    code: dic,
    fun: setDisplayDic,
    value: ['row', 'row-reverse', 'column', 'column-reverse']
  },
    {
      name: 'flex-wrap:',
      code: wrap,
      fun: setDisplayWrap,
      value: ['nowrap', 'wrap', 'wrap-reverse']
    },
    {
      name: 'justify-content:',
      code:justifyContent,
      fun: setJustifyContent,
      value: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']
    },
    {
      name: 'align-items:',
      code: alignItems,
      fun: setAlignItem,
      value: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch']
    },
    {
      name: 'align-content:',
      code: alignContent,
      fun: setAlignContent,
      value: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly', 'stretch']
    }
  ]
  const itemBox=[{
    name: '宽度:',
    code: itemWidth,
    fun: setItemWidth,
    value: ['100px', '200px', '250px']
   },
    {
      name: '高度:',
      code: itemHeight,
      fun: setItemHeight,
      value: ['100px', '200px', '250px']
    },
    {
      name: 'align-self:',
      code: alignSelf,
      fun: setAlignSelf,
      value: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch']
    },
    // {
    //   name: 'flex-grow:',
    //   code: flexGrow,
    //   fun: setFlexGrow,
    //   value: [1, 2, 3]
    // },
    // {
    //   name: 'flex-shrink:',
    //   code: flexShrink,
    //   fun: setFlexShrink,
    //   value: [0.1,0.2,0.3]
    // }
  ];
  const divBox=[1,2,3]
  return (
    <PageHeaderWrapper>
      <Alert message={'双飞翼布局'}></Alert>
      <div className={styles.main}>
        <div className={styles.middle}>
          <div className={styles.content}>
            <Alert message={'圣杯布局'}></Alert>
            <div className={styles.contentMain}>
              <div className={styles.contentMiddle}>
                <Alert message={'弹性布局'}></Alert>
                <div className={styles.flexBox}>
                  <div className={styles.flexLeft}>
                    2
                  </div>
                  <div className={styles.flexMiddle}>
                    1
                  </div>
                  <div className={styles.flexRight}>
                    3
                  </div>
                </div>
              </div>
              <div className={styles.contentLeft}>
                2
              </div>
              <div className={styles.contentRight}>
                3
              </div>
            </div>
          </div>
        </div>
        <div className={styles.left}>
          2
        </div>
        <div className={styles.right}>
          3
        </div>
      </div>
      <Divider plain style={{color:'black'}}>分割线</Divider>
      <Alert message={<span>弹性布局总结:<a href={'https://www.runoob.com/w3cnote/flex-grammar.html'}
                                      target={'_blank'}>参考链接1</a>  <a href={'https://juejin.cn/post/6938292463605907492'}
                                      target={'_blank'}>详细链接2</a></span>}></Alert>
      <Space direction="vertical" style={{width: '100%'}}>
        <Collapse activeKey={state} onChange={(val) => changeKey(val)}>
          <Panel header="flex容器和flex项目" key="1">
            <Row gutter={10}>
              <Col span={16}>
                <p>容器</p>
                {
                  container.map((item) => {
                    return <div><strong>{item.name}</strong>&nbsp;&nbsp;
                      <Radio.Group value={item.code} onChange={e => item.fun(e.target.value)}>
                        {
                          item.value.map((item) => {
                            return <Radio value={item}>{item}</Radio>
                          })
                        }
                      </Radio.Group></div>
                  })
                }
              </Col>
              <Col span={8}>
                <p>盒子2</p>
                {
                  itemBox.map((item) => {
                    return <div><strong>{item.name}</strong>&nbsp;&nbsp;
                      <Radio.Group value={item.code} onChange={e => item.fun(e.target.value)}>
                        {
                          item.value.map((item) => {
                            return <Radio value={item}>{item}</Radio>
                          })
                        }
                      </Radio.Group></div>
                  })
                }
              </Col>
            </Row>
            <div className={styles.container} style={{
              display: containerDisplay,
              flexDirection: dic,
              flexWrap: wrap,
              width: containerWidth,
              height: containerHeight,
              justifyContent: justifyContent,
              alignItems: alignItems,
              alignContent: alignContent
            }}>
              {
              divBox.map((item)=>{
                return   item==2?<div style={{width: itemWidth,height:itemHeight,alignSelf:alignSelf}} className={styles.item}>{item}</div>:
                  <div style={{width: 100,height:100,alignSelf:alignSelf}} className={styles.item}>1</div>
              })
            }
            </div>
          </Panel>
          <Panel header="margin和padding" key="2">

          </Panel>
          <Panel header="前端笔记" key="3">
            <T20210415/>
            <T20210416/>
            <T20210419/>
            <T20210420/>
            <T20210421/>
          </Panel>
        </Collapse>
      </Space>


    </PageHeaderWrapper>
  );
}

export default You;
