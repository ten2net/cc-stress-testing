const { Builder, By, Key } = require('selenium-webdriver');

// 网站URL
const url = 'http://workspace.featurize.cn:47367/';

// 表单字段和值
const formData = {
  textarea: '你将得到一串聊天记录，希望你能够对这些记录进行摘要。要求简明扼要，以包含列表的大纲形式输出。王工: 好的，请将聊天记录提供给我，我会尽力为您生成简明扼要的摘要。王工: Baichuan-13B-Chat为Baichuan-13B系列模型中对齐后的版本，预训练模型可见Baichuan-13B-Base。Baichuan-13B 是由百川智能继 Baichuan-7B 之后开发的包含 130 亿参数的开源可商用的大规模语言模型，在权威的中文和英文 benchmark 上均取得同尺寸最好的效果。本次发布包含有预训练 (Baichuan-13B-Base) 和对齐 (Baichuan-13B-Chat) 两个版本。Baichuan-13B 有如下几个特点：王工: 为应对军校双化建设中的教学科研智能化应用需求,西安长城数字软件推出军校版基于知识大模型的系列智慧应用。 军校双化建设进展迅速,但依然缺少对教育教学水平、人才培养方式、教学模式优化转型升级相关的智慧应用。 在教学科研信息化智能化领域仍存在诸多挑战。知识库不成体系,知识库分散建设,且仅支持基本检索功能。 二是,知识应用形式单一,仅限于资源库和网络教学,不能支持对学员的精准及时的辅导。 三是,缺乏对优秀教学经验和科研思路的挖掘与传承。 四是,缺少互联网资源,无法享用迅速崛起的互联网知识信息服务。系统具备四类基本能力 一是 具备多类大语言模型能力集成融合的能力 为知识服务提供多个可适配的智慧大脑 二是 具备自建自由多元知识库的能力 可在封闭网络安全运行 可对接多类知识资源 如期刊库、教案库、论文库试题库、 战利库、项目库、成果库、开源情报库等 三是具备知识智能交互检索能力,基于自有知识库, 实现智能化的用户交互回应,并对知识进行汇聚融合重组,并确保知识准确且来源可靠。 四是,构建专业化的知识应用,提供智能知识问答、 智能学习辅导、智能协作辅导、智能管理助手等多类应用场景.'
};

// 并发请求数量和循环次数
const concurrency = 1; // 并发请求数量
const loopCount = 3; // 循环次数

// 执行e2e压力测试
async function runE2ePressureTest() {
  console.log(`开始进行e2e压力测试：${concurrency}个并发请求，共${concurrency * loopCount}个请求`);

  const startTime = Date.now();

  // 创建并发请求
  const requests = [];
  for (let i = 0; i < concurrency; i++) {
    for (let j = 0; j < loopCount; j++) {
      requests.push(sendFormData());
    }
  }

  // 等待所有请求完成
  const ret = await Promise.all(requests);
  console.log(ret)

  const endTime = Date.now();
  const duration = endTime - startTime;

  console.log(`e2e压力测试完成，共花费${duration}毫秒`);
}

// 发送表单数据的函数
async function sendFormData() {
  // 创建WebDriver实例
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // 导航到网站
    await driver.get(url);
    await driver.sleep(500);
    // 填写表单字段
    let textareaElement
    let buttonElement
    // while(! textareaElement) {
      textareaElement = await driver.findElement(By.css('textarea'));
      buttonElement = (await driver.findElements(By.css('button')))[1];
    // }
    await textareaElement.sendKeys(formData.textarea);

    // 点击按钮
    console.log("?????",await buttonElement.getAttribute("class"))
    await buttonElement.click();

    // 等待一段时间，模拟用户操作
    await driver.sleep(500);

    // 清除表单字段
    await textareaElement.clear();

    // 关闭浏览器
    await driver.quit();
  } catch (error) {
    console.error('e2e压力测试出错:', error);
    // 关闭浏览器（如果发生错误）
    await driver.quit();
  }
}

// 执行e2e压力测试
runE2ePressureTest();