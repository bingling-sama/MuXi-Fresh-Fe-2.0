import { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { post, get } from '../../fetch';
import './index.less';
import type { PaginationProps } from 'antd';
import { ConfigProvider, message, Pagination, Radio, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { debounce } from '../../components/Debounce/debounce.ts';

function TestW() {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [user_idself, setuser_idself] = useState('');
  const [name, setname] = useState<string>('');
  const [done, setdone] = useState(false);
  const [check, setcheck] = useState(false);
  const [score, setscore] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [current, setCurrent] = useState(1);
  const [textarr, setTextarr] = useState<string[]>([]);
  const [answerSheet, setanswersheet] = useState<string[]>(Array(64).fill(''));
  const [finished, setfinished] = useState(0);
  useEffect(() => {
    let num = 0;
    for (let index = 0; index < answerSheet.length; index++) {
      if (answerSheet[index]) num++;
    }
    setfinished(num);
  }, [answerSheet]);
  interface Choiceitem {
    data: string;
    number: number;
  }
  interface PostSheet {
    choice: Choiceitem[];
  }
  interface response {
    code: number;
    data: {
      flag: boolean;
    };
  }
  interface FormData {
    code: number;
    data: {
      avatar: string;
      extra_question: string;
      gender: string;
      grade: string;
      group: string;
      knowledge: string;
      major: string;
      phone: string;
      reason: string;
      self_intro: string;
      form_id: string;
    };
  }
  const strnumber =
    '1 2 3 4 8 10 29 30 33 35 36 51 52 55 58 61 63 64 76 77 78 79 80 82 83 84 89 101 102 103 104 105 108 109 110 111 113 114 127 128 130 132 134 135 136 139 151 152 153 156 158 159 160 161 164 177 178 179 182 183 184 185 186 187';
  const numberforEach = strnumber.split(' ');
  async function submit() {
    const postSheet: PostSheet = {
      choice: [],
    };
    for (let index = 0; index < numberforEach.length; index++) {
      const newChoice: Choiceitem = {
        data: answerSheet[index],
        number: +numberforEach[index],
      };

      postSheet.choice.push(newChoice);
    }
    const submitRes = post(`/user/test/`, postSheet);
    await submitRes
      .then((data: response) => {
        if (data.code == 200) {
          void message.success('完成做答^_^');
        }
      })
      .catch((e) => console.error(e));
    const checkRes = post(`/user/test/result?user_id=myself`);
    checkRes
      .then((data: tesResModel) => {
        if (data.code == 200) {
          localStorage.removeItem(`${data.data.user_id}-tempAnswer`);
          localStorage.removeItem(`tempAnswer`);
          setdone(true);
          setname(data.data.name);
          setscore([
            data.data.le_qun_xing,
            data.data.cong_hui_xing,
            data.data.wen_ding_xing,
            data.data.xing_fen_fen_xing,
            data.data.you_heng_xing,
            data.data.jiao_ji_xing,
            data.data.huai_yi_xing,
          ]);
        }
      })
      .then(null)
      .catch((e) => console.error(e));
  }
  useEffect(() => {
    const fetchTextFile = async () => {
      try {
        const response = await fetch('/test-new.txt');
        const content = await response.text();
        const contentarr = content.split(/\s/);
        const contentarrNew = contentarr.filter((item) => {
          return item !== '';
        });
        setTextarr(contentarrNew);
      } catch (error) {
        console.error('Error reading text file:', error);
      }
    };
    // eslint-disable-next-line
    fetchTextFile();
    const formdata = get(`/form/view?entry_form_id=myself`);
    formdata
      .then((data: FormData) => {
        if (data.code != 200) {
          void message.info('先填写完报名表再来吧');
          setTimeout(() => {
            navigate('/app');
          }, 1000);
        }
      })
      .catch((data: FormData) => {
        if (data.code != 200) {
          void message.info('先填写完报名表再来吧');
          setTimeout(() => {
            navigate('/app');
          }, 1000);
        }
      })
      .catch((e) => console.error(e));
    if (user_id) {
      setCurrent(6);
    }
    const getRes = post(`/user/test/result?user_id=${user_id ? user_id : 'myself'}`);
    getRes
      .then((data: tesResModel) => {
        setloading(false);
        setuser_idself(data.data.user_id);
        if (data.code == 200 && data.data.choice.length != 0) {
          setdone(true);
          setcheck(true);
          setname(data.data.name);
          setscore([
            data.data.le_qun_xing,
            data.data.cong_hui_xing,
            data.data.wen_ding_xing,
            data.data.xing_fen_fen_xing,
            data.data.you_heng_xing,
            data.data.jiao_ji_xing,
            data.data.huai_yi_xing,
          ]);
          setanswersheet((pre) => {
            let newarr = pre;
            data.data.choice.forEach((element, index) => {
              newarr = pre;
              newarr[index] = element.data;
            });
            return newarr;
          });
        }
        const temp = localStorage.getItem(`${data.data.user_id}-tempAnswer`);
        if (temp) setanswersheet(JSON.parse(temp) as string[]);
      })
      .catch((e) => {
        setloading(false);
        console.error(e);
      });
  }, [user_id, navigate]);
  const onChangePage: PaginationProps['onChange'] = (page) => {
    setCurrent(page);
  };
  interface QuestionProps {
    num: number;
  }

  function Question(props: QuestionProps) {
    const num = props.num;
    return (
      <div className="termbox_testW">
        <div
          className="question_testW"
          style={{
            borderLeft:
              answerSheet[num] == '' ? '2px solid #FFB940' : '2px solid transparent',
          }}
        >
          {textarr[num * 4]}
        </div>
        <div className="answerbox_testW">
          <Radio.Group
            disabled={done}
            style={{ width: '600px', display: 'flex', justifyContent: 'space-between' }}
            buttonStyle="solid"
            name={`answer${num}`}
            onChange={(e) => {
              setanswersheet((pre) => {
                const newarr = [...pre];
                newarr[num] = e.target.value as string;
                localStorage.setItem(`${user_idself}-tempAnswer`, JSON.stringify(newarr));
                return newarr;
              });
            }}
            value={answerSheet[num]}
          >
            <Radio value={'A'}>{textarr[num * 4 + 1]}</Radio>
            <Radio value={'B'}>{textarr[num * 4 + 2]}</Radio>
            <Radio value={'C'}>{textarr[num * 4 + 3]}</Radio>
          </Radio.Group>
        </div>
      </div>
    );
  }
  interface tesResModel {
    data: testRes;
    msg: string;
    code: number;
  }
  interface testRes {
    choice: Choiceitem[];
    cong_hui_xing: number;
    gender: string;
    grade: string;
    user_id: string;
    huai_yi_xing: number;
    jiao_ji_xing: number;
    le_qun_xing: number;
    major: string;
    name: string;
    wen_ding_xing: number;
    xing_fen_fen_xing: number;
    you_heng_xing: number;
  }
  function TestRes(paras: testRes) {
    const le_qun_xing = paras.le_qun_xing;
    const cong_hui_xing = paras.cong_hui_xing;
    const wen_ding_xing = paras.wen_ding_xing;
    const xing_fen_fen_xing = paras.xing_fen_fen_xing;
    const you_heng_xing = paras.you_heng_xing;
    const jiao_ji_xing = paras.jiao_ji_xing;
    const huai_yi_xing = paras.huai_yi_xing;
    useEffect(() => {
      type EChartsOption = echarts.EChartsOption;
      const chartDom = document.getElementById('main')!;
      const myChart = echarts.init(chartDom);
      const option: EChartsOption = {
        title: {
          text: '测试雷达图',
        },
        legend: {
          data: [`${paras.name}的测试结果`],
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '乐群性', max: 12 },
            { name: '聪慧性', max: 10 },
            { name: '稳定性', max: 20 },
            { name: '兴奋性', max: 20 },
            { name: '有恒性', max: 14 },
            { name: '交际性', max: 20 },
            { name: '怀疑性', max: 14 },
          ],
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [
                  le_qun_xing,
                  cong_hui_xing,
                  wen_ding_xing,
                  xing_fen_fen_xing,
                  you_heng_xing,
                  jiao_ji_xing,
                  huai_yi_xing,
                ],
                name: `${paras.name}的测试结果`,
              },
            ],
          },
        ],
      };

      option && myChart.setOption(option);
    });

    return (
      <div className="resbox">
        <div id="main" style={{ width: '500px', height: '400px' }}></div>
        <div className="resultbox_testW">
          <div className="result_detail">
            乐群性:<span>{paras.le_qun_xing}</span>/12
          </div>
          <div className="result_detail">
            聪慧性:<span>{paras.cong_hui_xing}</span>/10
          </div>
          <div className="result_detail">
            稳定性:<span>{paras.wen_ding_xing}</span>/20
          </div>
          <div className="result_detail">
            兴奋性:<span>{paras.xing_fen_fen_xing}</span>/20
          </div>
          <div className="result_detail">
            有恒性:<span>{paras.you_heng_xing}</span>/14
          </div>
          <div className="result_detail">
            交际性:<span>{paras.jiao_ji_xing}</span>/20
          </div>
          <div className="result_detail">
            怀疑性:<span>{paras.huai_yi_xing}</span>/14
          </div>
        </div>
      </div>
    );
  }
  const element: JSX.Element[] = [];
  element[0] = (
    <div className="mainbox_testW">
      <div className="leftbox_testW">
        <div className="title_testW">前言</div>
        <div className="detail_testW">
          本测验将会测验您的职业性格特点，以了解您的性格与您的意愿职位之间的符合
          程度。本测验由卡特尔16PF测验改编而成，请受测者在测验过程中尽量保证连续
          性，本测验的结果仅将作为录取过程中的参考，因此请按照自己的真实想法进行
          填写，同时在测验过程中请仔细读题，在理解题目之后再作答，以防出现不符合
          您真实情况的测验结果。本测验共64题，预计用时7~9分钟,测验结果只能提交一次，
          请在确认后提交。
        </div>
        {Array.from([0, 1, 2, 3], (index) => {
          return (
            <div>
              <Question num={index} key={index} />
            </div>
          );
        })}
      </div>
      <div className="rightbox_testW">
        {Array.from([4, 5, 6, 7, 8, 9], (index) => {
          return (
            <div>
              <Question num={index} key={index} />
            </div>
          );
        })}
      </div>
    </div>
  );
  element[1] = (
    <div className="mainbox_testW">
      <div className="leftbox_testW">
        {Array.from([10, 11, 12, 13, 14, 15], (index) => {
          return (
            <div>
              <Question num={index} key={index} />
            </div>
          );
        })}
      </div>
      <div className="rightbox_testW">
        {Array.from([16, 17, 18, 19, 20, 21], (index) => {
          return (
            <div>
              <Question num={index} key={index} />
            </div>
          );
        })}
      </div>
    </div>
  );
  element[2] = (
    <div className="mainbox_testW">
      <div className="leftbox_testW">
        {Array.from([22, 23, 24, 25, 26, 27], (index) => {
          return (
            <div>
              <Question num={index} key={index} />
            </div>
          );
        })}
      </div>
      <div className="rightbox_testW">
        {Array.from([28, 29, 30, 31, 32, 33], (index) => {
          return (
            <div>
              <Question num={index} key={index} />
            </div>
          );
        })}
      </div>
    </div>
  );
  element[3] = (
    <div className="mainbox_testW">
      <div className="leftbox_testW">
        {Array.from([34, 35, 36, 37, 38, 39], (index) => {
          return (
            <div>
              <Question num={index} key={index} />
            </div>
          );
        })}
      </div>
      <div className="rightbox_testW">
        {Array.from([40, 41, 42, 43, 44, 45], (index) => {
          return (
            <div>
              <Question num={index} key={index} />
            </div>
          );
        })}
      </div>
    </div>
  );
  element[4] = (
    <div className="mainbox_testW">
      <div className="leftbox_testW">
        {Array.from([46, 47, 48, 49, 50, 51], (index) => {
          return (
            <div>
              <Question num={index} key={index} />
            </div>
          );
        })}
      </div>
      <div className="rightbox_testW">
        {Array.from([52, 53, 54, 55, 56, 57], (index) => {
          return (
            <div>
              <Question num={index} key={index} />
            </div>
          );
        })}
      </div>
    </div>
  );
  element[5] = (
    <div className="mainbox_testW">
      <div className="leftbox_testW">
        {Array.from([58, 59, 60, 61, 62, 63], (index) => {
          return (
            <div>
              <Question num={index} key={index} />
            </div>
          );
        })}
      </div>
      <div className="rightbox_testW">
        <div
          className="sendbox_testW"
          onClick={
            finished == 64 && !user_id
              ? debounce(() => {
                  submit().catch((e) => console.error(e));
                }, 400)
              : () => {
                  void message.info('请完成所有的题目再提交');
                }
          }
          style={{
            display: user_id || done ? 'none' : '',
            backgroundColor: finished == 64 ? '#FFB940' : '#DADADA',
          }}
        >
          完成作答
        </div>
        <TestRes
          choice={[]}
          cong_hui_xing={score[1]}
          gender={''}
          grade={''}
          huai_yi_xing={score[6]}
          jiao_ji_xing={score[5]}
          le_qun_xing={score[0]}
          major={''}
          name={name}
          wen_ding_xing={score[2]}
          xing_fen_fen_xing={score[3]}
          you_heng_xing={score[4]}
          user_id={''}
        ></TestRes>
      </div>
    </div>
  );

  const testPage = (
    <div className="TestForWeb">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ffb841',
          },
        }}
      >
        {element[current - 1]}
        <Pagination
          current={current}
          onChange={onChangePage}
          total={6}
          defaultPageSize={1}
        />
        <div style={{ display: user_id ? 'none' : '' }} className="finishedbox_testW">
          已完成<span className="finished_testW">{finished}</span>/64
        </div>
      </ConfigProvider>
    </div>
  );
  const resPage = (
    <div className="TestForWeb">
      <TestRes
        choice={[]}
        cong_hui_xing={score[1]}
        gender={''}
        grade={''}
        huai_yi_xing={score[6]}
        jiao_ji_xing={score[5]}
        le_qun_xing={score[0]}
        major={''}
        name={name}
        wen_ding_xing={score[2]}
        xing_fen_fen_xing={score[3]}
        you_heng_xing={score[4]}
        user_id={''}
      ></TestRes>
    </div>
  );
  const loadingpage = (
    <div className="TestForWeb">
      <Spin size="large" />
    </div>
  );

  return (
    <div className="TestWebpage">
      {loading ? loadingpage : !user_id && check ? resPage : testPage}
    </div>
  );
}
export default TestW;
