const axios = require('axios');
const async = require('async');

const CONCURRENCY = 100; // 并发请求的数量
const TOTAL_REQUESTS = 100000; // 总的请求次数

const GPT_API_URL = 'http://workspace.featurize.cn:51259/v1/chat/completions'; // API URL
const API_KEY = ''; // 你的 API key

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  }
}

let counter = 0;
let counterAll = 0;
async.timesLimit(TOTAL_REQUESTS, CONCURRENCY, async () => {
  counterAll++;
  const payload = {
    model: "baichuan-13b-chat",
    messages: [
      {"role": "user", "content": "你将得到一串聊天记录，希望你能够对这些记录进行摘要。要求简明扼要，以包含列表的大纲形式输出。王工: 好的，请将聊天记录提供给我，我会尽力为您生成简明扼要的摘要。王工: Baichuan-13B-Chat为Baichuan-13B系列模型中对齐后的版本，预训练模型可见Baichuan-13B-Base。Baichuan-13B 是由百川智能继 Baichuan-7B 之后开发的包含 130 亿参数的开源可商用的大规模语言模型，在权威的中文和英文 benchmark 上均取得同尺寸最好的效果。本次发布包含有预训练 (Baichuan-13B-Base) 和对齐 (Baichuan-13B-Chat) 两个版本。Baichuan-13B 有如下几个特点：王工: 为应对军校双化建设中的教学科研智能化应用需求,西安长城数字软件推出军校版基于知识大模型的系列智慧应用。 军校双化建设进展迅速,但依然缺少对教育教学水平、人才培养方式、教学模式优化转型升级相关的智慧应用。 在教学科研信息化智能化领域仍存在诸多挑战。知识库不成体系,知识库分散建设,且仅支持基本检索功能。 二是,知识应用形式单一,仅限于资源库和网络教学,不能支持对学员的精准及时的辅导。 三是,缺乏对优秀教学经验和科研思路的挖掘与传承。 四是,缺少互联网资源,无法享用迅速崛起的互联网知识信息服务。系统具备四类基本能力 一是 具备多类大语言模型能力集成融合的能力 为知识服务提供多个可适配的智慧大脑 二是 具备自建自由多元知识库的能力 可在封闭网络安全运行 可对接多类知识资源 如期刊库、教案库、论文库试题库、 战利库、项目库、成果库、开源情报库等 三是具备知识智能交互检索能力,基于自有知识库, 实现智能化的用户交互回应,并对知识进行汇聚融合重组,并确保知识准确且来源可靠。 四是,构建专业化的知识应用,提供智能知识问答、 智能学习辅导、智能协作辅导、智能管理助手等多类应用场景。王工: 好的，您的请求已经记录。一旦聊天记录结束，我将为您生成简明扼要的摘要。请随时提供更多信息或问题，让我们继续聊天。"},
    ],
    stream: false
  }
  try {
    const response = await axios.post(GPT_API_URL, payload, options);
    if (response.status === 200) {
      counter++;
      console.log(`Request ${counter}/${counterAll} was successful`);
    }
  } catch (error) {
    console.error(`Request failed: ${error.message}`,  `失败数据：${counterAll - counter}/${counterAll}`);
  }
}, (err) => {
  if (err) {

    console.error(err,  `失败数据：${counterAll - counter}/${counterAll}`);
  }
  console.log(`Completed ${counter} requests successfully.`);
});