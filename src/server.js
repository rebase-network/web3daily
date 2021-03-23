const fs = require('fs');
const path = require("path");
const conf = require('config');

const Koa = require('koa');
const router = require('@koa/router')();
const bodyParser = require('koa-bodyparser');
const auth = require('koa-basic-auth');

const fetch = require('node-fetch');
const moment = require('moment');

const SteinStore = require("stein-js-client");

const app = new Koa();

// custom 401 handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.set('WWW-Authenticate', 'Basic');
      ctx.body = 'Access Denied';
    } else {
      throw err;
    }
  }
});

// require auth
app.use(auth({ name: conf.get('auth_name'), pass: conf.get('auth_passwd') }));

app.use(bodyParser());

router.get('/', (ctx, next) => {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream(path.join(__dirname, "/views/index.html"));
})

router.post('/pow', async (ctx, next) => {

  let postData = ctx.request.body;

  // https://stackoverflow.com/a/51616282/1240067
  Object.keys(postData).map(k => postData[k] = typeof postData[k] == 'string' ? postData[k].trim() : postData[k]);

  const steinhqApi = "https://api.steinhq.com/v1/storages/5e73b903b88d3d04ae0815bb";
  const store = new SteinStore(steinhqApi);

  const now = getCurrTime();
  const epi = "#" + postData.episode;

  const feedback = await crateWp(epi, postData.editor, postData);

  store.append("Summary", [
    {
      episode: epi,
      time: now,
      author: postData.author1,
      title: postData.title1,
      url: postData.url1,
      introduce: postData.introduce1,
    },
    {
      episode: epi,
      time: now,
      author: postData.author2,
      title: postData.title2,
      url: postData.url2,
      introduce: postData.introduce2,
    },
    {
      episode: epi,
      time: now,
      author: postData.author3,
      title: postData.title3,
      url: postData.url3,
      introduce: postData.introduce3,
    },
    ])
    .then(res => {
      console.log(res);
    });

    const wxcontent = gen_wx_content(feedback, postData)
    ctx.body = wxcontent;
})

app.use(router.routes(), router.allowedMethods());

const port = conf.get('port');

app.listen(port, () => console.log("\n\nrunning on port http://localhost:" + port));

function getCurrTime() { // 当前时间
  return moment(new Date()).format("YYYY-MM-DD")
}

function crateWp(epi, editor, dx) {

  const endpoint_url_posts = "https://rebase.network/wp-json/wp/v2/posts"

  const p_status = "publish" // 直接发布
  const p_format = "gallery" // 展示方式
  const p_featured_media = "1012" // 封面图片的id
  const p_categories = "27" // 类别id
  const p_tags = [30,32,31,28] // 类别id

  const editorid = "user." + editor
  const p_author = conf.get(editorid) // 作者id

  const p_title = "Web3极客日报 " + epi + " | Rebase Network | Rebase社区";

  const p_content = `
    <strong>1. ${dx.title1}</strong>
    <a href="${dx.url1}" target="_blank">${dx.url1}</a>

    @${dx.author1}：${dx.introduce1}
    &nbsp;

    <strong>2. ${dx.title2}</strong>
    <a href="${dx.url2}" target="_blank">${dx.url2}</a>

    @${dx.author2}：${dx.introduce2}
    &nbsp;

    <strong>3. ${dx.title3}</strong>
    <a href="${dx.url3}" target="_blank">${dx.url3}</a>

    @${dx.author3}：${dx.introduce3}
    &nbsp;

    <!--more-->

    <strong><span class="" data-raw-text="W" data-textnode-index="24" data-index="486">W</span><span class="" data-raw-text="e" data-textnode-index="24" data-index="487">e</span><span class="" data-raw-text="b" data-textnode-index="24" data-index="488">b</span><span class="" data-raw-text="3" data-textnode-index="24" data-index="489">3</span><span class="" data-raw-text="极" data-textnode-index="24" data-index="490">极</span><span class="" data-raw-text="客" data-textnode-index="24" data-index="491">客</span><span class="" data-raw-text="日" data-textnode-index="24" data-index="492">日</span><span class="" data-raw-text="报" data-textnode-index="24" data-index="493">报</span></strong><span class="" data-raw-text="是" data-textnode-index="25" data-index="494">是</span><span class="" data-raw-text="为" data-textnode-index="25" data-index="495">为</span><span class="" data-raw-text="W" data-textnode-index="25" data-index="496">W</span><span class="" data-raw-text="e" data-textnode-index="25" data-index="497">e</span><span class="" data-raw-text="b" data-textnode-index="25" data-index="498">b</span><span class="" data-raw-text="3" data-textnode-index="25" data-index="499">3</span><span class="" data-raw-text="时" data-textnode-index="25" data-index="500">时</span><span class="" data-raw-text="代" data-textnode-index="25" data-index="501">代</span><span class="" data-raw-text="的" data-textnode-index="25" data-index="502">的</span><span class="" data-raw-text="极" data-textnode-index="25" data-index="503">极</span><span class="" data-raw-text="客" data-textnode-index="25" data-index="504">客</span><span class="" data-raw-text="们" data-textnode-index="25" data-index="505">们</span><span class="" data-raw-text="准" data-textnode-index="25" data-index="506">准</span><span class="" data-raw-text="备" data-textnode-index="25" data-index="507">备</span><span class="" data-raw-text="的" data-textnode-index="25" data-index="508">的</span><span class="" data-raw-text="一" data-textnode-index="25" data-index="509">一</span><span class="" data-raw-text="份" data-textnode-index="25" data-index="510">份</span><span class="" data-raw-text="日" data-textnode-index="25" data-index="511">日</span><span class="" data-raw-text="报" data-textnode-index="25" data-index="512">报</span><span class="" data-raw-text="，" data-textnode-index="25" data-index="513">，</span><span class="" data-raw-text="它" data-textnode-index="25" data-index="514">它</span><span class="" data-raw-text="是" data-textnode-index="25" data-index="515">是</span><span class="" data-raw-text="由" data-textnode-index="25" data-index="516">由</span><span class="" data-raw-text="一" data-textnode-index="25" data-index="517">一</span><span class="" data-raw-text="群" data-textnode-index="25" data-index="518">群</span><span class="" data-raw-text="极" data-textnode-index="25" data-index="519">极</span><span class="" data-raw-text="客" data-textnode-index="25" data-index="520">客</span><span class="" data-raw-text="们" data-textnode-index="25" data-index="521">们</span><span class="" data-raw-text="推" data-textnode-index="25" data-index="522">推</span><span class="" data-raw-text="荐" data-textnode-index="25" data-index="523">荐</span><span class="" data-raw-text="他" data-textnode-index="25" data-index="524">他</span><span class="" data-raw-text="们" data-textnode-index="25" data-index="525">们</span><span class="" data-raw-text="认" data-textnode-index="25" data-index="526">认</span><span class="" data-raw-text="为" data-textnode-index="25" data-index="527">为</span><span class="" data-raw-text="有" data-textnode-index="25" data-index="528">有</span><span class="" data-raw-text="价" data-textnode-index="25" data-index="529">价</span><span class="" data-raw-text="值" data-textnode-index="25" data-index="530">值</span><span class="" data-raw-text="的" data-textnode-index="25" data-index="531">的</span><span class="" data-raw-text="内" data-textnode-index="25" data-index="532">内</span><span class="" data-raw-text="容" data-textnode-index="25" data-index="533">容</span><span class="" data-raw-text="并" data-textnode-index="25" data-index="534">并</span><span class="" data-raw-text="附" data-textnode-index="25" data-index="535">附</span><span class="" data-raw-text="上" data-textnode-index="25" data-index="536">上</span><span class="" data-raw-text="一" data-textnode-index="25" data-index="537">一</span><span class="" data-raw-text="段" data-textnode-index="25" data-index="538">段</span><span class="" data-raw-text="推" data-textnode-index="25" data-index="539">推</span><span class="" data-raw-text="荐" data-textnode-index="25" data-index="540">荐</span><span class="" data-raw-text="语" data-textnode-index="25" data-index="541">语</span><span class="" data-raw-text="，" data-textnode-index="25" data-index="542">，</span><span class="" data-raw-text="最" data-textnode-index="25" data-index="543">最</span><span class="" data-raw-text="后" data-textnode-index="25" data-index="544">后</span><span class="" data-raw-text="通" data-textnode-index="25" data-index="545">通</span><span class="" data-raw-text="过" data-textnode-index="25" data-index="546">过</span><span class="" data-raw-text="R" data-textnode-index="25" data-index="547">R</span><span class="" data-raw-text="e" data-textnode-index="25" data-index="548">e</span><span class="" data-raw-text="b" data-textnode-index="25" data-index="549">b</span><span class="" data-raw-text="a" data-textnode-index="25" data-index="550">a</span><span class="" data-raw-text="s" data-textnode-index="25" data-index="551">s</span><span class="" data-raw-text="e" data-textnode-index="25" data-index="552">e</span><span class="" data-raw-text="的" data-textnode-index="25" data-index="553">的</span><span class="" data-raw-text="成" data-textnode-index="25" data-index="554">成</span><span class="" data-raw-text="员" data-textnode-index="25" data-index="555">员</span><span class="" data-raw-text="整" data-textnode-index="25" data-index="556">整</span><span class="" data-raw-text="理" data-textnode-index="25" data-index="557">理</span><span class="" data-raw-text="编" data-textnode-index="25" data-index="558">编</span><span class="" data-raw-text="辑" data-textnode-index="25" data-index="559">辑</span><span class="" data-raw-text="。" data-textnode-index="25" data-index="560">。</span>

    网站：http://rebase.network
    公众号：rebase_network
  `
  const payload = {
    'title': p_title,
    'content': p_content,
    'author': p_author,
    'status': p_status,
    'format': p_format,
    'featured_media': p_featured_media,
    'categories': p_categories,
    'tags': p_tags,
  }

  const u_id = conf.get('u_id') // 用户名
  const u_passwd = conf.get('u_passwd') // 使用 https://wordpress.org/plugins/application-passwords/ 得到密码

  let headers = {
    'content-type': "Application/json",
  }

  headers['Authorization'] = 'Basic ' + Buffer.from(u_id + ":" + u_passwd).toString('base64');

  return fetch(endpoint_url_posts, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
    })
    .then(res => res.json())
    .then(json => {
      console.log("url =>", json.permalink_template)

      return `直接复制以下内容到微信公众号，标题：${p_title}，原文链接：${json.permalink_template}`;
    });

}

function gen_wx_content(content, dx){
  let wx_content =`
    <div>${content} </div>

    <div class="rich_media_content" id="js_content" style="visibility: visible;">
      <h2 style="margin-bottom: 14px;font-size: 22px;line-height: 1.4;font-family: -apple-system-font, system-ui, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif;letter-spacing: 0.544px;text-align: start;white-space: normal;background-color: rgb(255, 255, 255);">
          <span style="font-size: 15px;">微信不支持外部链接，可以点击文章底部的<strong data-darkmode-bgcolor="rgb(36, 36, 36)" data-darkmode-color="rgb(150, 162, 172)" data-style="max-width: 100%; background-color: rgb(255, 255, 255); color: rgb(61, 70, 77); font-family: suxingme, &quot;Open Sans&quot;, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, STHeiti, &quot;WenQuanYi Micro Hei&quot;, SimSun, sans-serif; letter-spacing: 0.544px; text-align: start; box-sizing: border-box !important; overflow-wrap: break-word !important;" class="js_darkmode__1" style="font-size: 15px;max-width: 100%;letter-spacing: 0.544px;color: rgb(61, 70, 77);font-family: suxingme, &quot;Open Sans&quot;, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, STHeiti, &quot;WenQuanYi Micro Hei&quot;, SimSun, sans-serif;visibility: visible;box-sizing: border-box !important;overflow-wrap: break-word !important;">阅读原文</strong><span data-darkmode-bgcolor="rgb(36, 36, 36)" data-darkmode-color="rgb(150, 162, 172)" data-style="max-width: 100%; background-color: rgb(255, 255, 255); color: rgb(61, 70, 77); font-family: suxingme, &quot;Open Sans&quot;, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, STHeiti, &quot;WenQuanYi Micro Hei&quot;, SimSun, sans-serif; letter-spacing: 0.544px; text-align: start;" class="js_darkmode__2" style="max-width: 100%;letter-spacing: 0.544px;color: rgb(61, 70, 77);font-family: suxingme, &quot;Open Sans&quot;, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, STHeiti, &quot;WenQuanYi Micro Hei&quot;, SimSun, sans-serif;visibility: visible;box-sizing: border-box !important;overflow-wrap: break-word !important;">
          ，方便阅读文中的链接，也可通过 http://daily.rebase.network/ 浏览每期日报内容。</span></span></h2>

      <section data-darkmode-bgcolor="rgb(36, 36, 36)" data-style="white-space: normal; max-width: 100%; letter-spacing: 0.544px; font-family: -apple-system-font, system-ui, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255); box-sizing: border-box !important; overflow-wrap: break-word !important;" class="js_darkmode__4" style="max-width: 100%;text-align: start;color: rgba(255, 255, 255, 0.8);letter-spacing: 0.544px;visibility: visible;box-sizing: border-box !important;overflow-wrap: break-word !important;">
        <section data-darkmode-bgcolor="rgb(36, 36, 36)" style="margin-top: 0.5em;margin-bottom: 0.5em;max-width: 100%;border-width: 0px;border-style: none;border-color: initial;visibility: visible;box-sizing: border-box !important;overflow-wrap: break-word !important;">
          <section data-darkmode-bgcolor="rgb(36, 36, 36)" style="max-width: 100%;width: 748px;border-width: 2px;border-style: solid;border-color: rgb(118, 163, 229);font-family: inherit;text-decoration: inherit;visibility: visible;box-sizing: border-box !important;overflow-wrap: break-word !important;">
            <section data-darkmode-bgcolor="rgb(36, 36, 36)" style="margin-top: 15px;margin-bottom: 15px;padding-right: 15px;padding-left: 15px;max-width: 100%;font-size: 1.5em;color: rgb(118, 163, 229);font-family: inherit;text-align: center;text-decoration: inherit;visibility: visible;box-sizing: border-box !important;overflow-wrap: break-word !important;">
              <section data-darkmode-bgcolor="rgb(36, 36, 36)" style="max-width: 100%;text-align: left;visibility: visible;box-sizing: border-box !important;overflow-wrap: break-word !important;"><span style="max-width: 100%;visibility: visible;font-size: 15px;box-sizing: border-box !important;overflow-wrap: break-word !important;">
                  1.&nbsp;${dx.title1}</span></section>
            </section>
            <section data-darkmode-bgcolor="rgb(36, 36, 36)" style="padding-right: 10px;padding-left: 10px;max-width: 100%;display: inline-block;height: 2em;border-top: 2px solid rgb(118, 163, 229);border-right: 2px solid rgb(118, 163, 229);border-bottom: 2px solid rgb(118, 163, 229);border-left-style: none;overflow: hidden;line-height: 2em;border-top-right-radius: 1em;border-bottom-right-radius: 1em;font-family: inherit;text-decoration: inherit;color: rgb(118, 163, 229);visibility: visible;box-sizing: border-box !important;overflow-wrap: break-word !important;">
              <span style="max-width: 100%;font-size: 15px;box-sizing: border-box !important;overflow-wrap: break-word !important;">
                  @${dx.author1}</span></section>
            <section data-darkmode-bgcolor="rgb(36, 36, 36)" style="margin-top: 20px;margin-bottom: 20px;padding-right: 15px;padding-left: 15px;max-width: 100%;color: rgb(121, 121, 121);visibility: visible;box-sizing: border-box !important;overflow-wrap: break-word !important;">
              <p style="margin-bottom: 25px;max-width: 100%;box-sizing: inherit;min-height: 1em;color: rgb(61, 70, 77);font-size: 16px;line-height: 1.8;font-family: suxingme, &quot;Open Sans&quot;, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, STHeiti, &quot;WenQuanYi Micro Hei&quot;, SimSun, sans-serif;overflow-wrap: break-word !important;"><span style="font-size: 15px;color: rgb(121, 121, 121);font-family: inherit;text-decoration: inherit;letter-spacing: 0.544px;">
                  ${dx.url1}</span></p>
              <p><span style="font-size: 15px;">
                  ${dx.introduce1}
              </span></p>
            </section>
          </section>
        </section>
      </section>
      <br/>

      <section data-darkmode-bgcolor="rgb(36, 36, 36)" data-style="white-space: normal; max-width: 100%; letter-spacing: 0.544px; font-family: -apple-system-font, system-ui, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255); box-sizing: border-box !important; overflow-wrap: break-word !important;" class="js_darkmode__5" style="max-width: 100%;text-align: start;color: rgba(255, 255, 255, 0.8);letter-spacing: 0.544px;visibility: visible;box-sizing: border-box !important;overflow-wrap: break-word !important;">
        <section data-darkmode-bgcolor="rgb(36, 36, 36)" style="margin-top: 0.5em;margin-bottom: 0.5em;max-width: 100%;border-width: 0px;border-style: none;border-color: initial;visibility: visible;box-sizing: border-box !important;overflow-wrap: break-word !important;">
          <section data-darkmode-bgcolor="rgb(36, 36, 36)" style="max-width: 100%;width: 748px;border-width: 2px;border-style: solid;border-color: rgb(118, 163, 229);font-family: inherit;text-decoration: inherit;visibility: visible;box-sizing: border-box !important;overflow-wrap: break-word !important;">
            <section data-darkmode-bgcolor="rgb(36, 36, 36)" style="margin-top: 15px;margin-bottom: 15px;padding-right: 15px;padding-left: 15px;max-width: 100%;font-size: 1.5em;color: rgb(118, 163, 229);font-family: inherit;text-align: center;text-decoration: inherit;visibility: visible;box-sizing: border-box !important;overflow-wrap: break-word !important;">
              <section data-darkmode-bgcolor="rgb(36, 36, 36)" style="max-width: 100%;text-align: left;visibility: visible;box-sizing: border-box !important;overflow-wrap: break-word !important;"><span style="max-width: 100%;visibility: visible;font-size: 15px;box-sizing: border-box !important;overflow-wrap: break-word !important;">
                  2.&nbsp;${dx.title2}</span></section>
            </section>
            <section data-darkmode-bgcolor="rgb(36, 36, 36)" style="padding-right: 10px;padding-left: 10px;max-width: 100%;font-size: 1.2em;display: inline-block;height: 2em;border-top: 2px solid rgb(118, 163, 229);border-right: 2px solid rgb(118, 163, 229);border-bottom: 2px solid rgb(118, 163, 229);border-left-style: none;overflow: hidden;line-height: 2em;border-top-right-radius: 1em;border-bottom-right-radius: 1em;font-family: inherit;text-decoration: inherit;color: rgb(118, 163, 229);visibility: visible;box-sizing: border-box !important;overflow-wrap: break-word !important;">
              <section data-darkmode-bgcolor="rgb(36, 36, 36)" style="max-width: 100%;visibility: visible;box-sizing: border-box !important;overflow-wrap: break-word !important;"><span style="max-width: 100%;visibility: visible;font-size: 15px;box-sizing: border-box !important;overflow-wrap: break-word !important;">
                  @${dx.author2}&nbsp;</span></section>
            </section>
            <section data-darkmode-bgcolor="rgb(36, 36, 36)" style="margin-top: 20px;margin-bottom: 20px;padding-right: 15px;padding-left: 15px;max-width: 100%;color: rgb(121, 121, 121);visibility: visible;box-sizing: border-box !important;overflow-wrap: break-word !important;">
              <p><span style="font-size: 15px;">
                ${dx.url2}
              </span></p>
              <p><br></p>
              <p style="text-align: justify;"><span style="font-size: 15px;">
                ${dx.introduce2}
              </span></p>
            </section>
          </section>
          <section data-darkmode-bgcolor="rgb(36, 36, 36)" style="max-width: 100%;font-size: 14px;width: 0px;height: 0px;clear: both;box-sizing: border-box !important;overflow-wrap: break-word !important;"><br></section>
        </section>
      </section>
      <br/>

      <section data-darkmode-bgcolor="rgb(36, 36, 36)" data-style="white-space: normal; max-width: 100%; letter-spacing: 0.544px; font-family: -apple-system-font, system-ui, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255); box-sizing: border-box !important; overflow-wrap: break-word !important;" class="js_darkmode__7" style="max-width: 100%;text-align: start;letter-spacing: 0.544px;box-sizing: border-box !important;overflow-wrap: break-word !important;">
        <section data-darkmode-bgcolor="rgb(36, 36, 36)" style="margin-top: 0.5em;margin-bottom: 0.5em;max-width: 100%;border-width: 0px;border-style: none;border-color: initial;box-sizing: border-box !important;overflow-wrap: break-word !important;">
          <section data-darkmode-bgcolor="rgb(36, 36, 36)" style="max-width: 100%;width: 748px;border-width: 2px;border-style: solid;border-color: rgb(118, 163, 229);font-family: inherit;text-decoration: inherit;box-sizing: border-box !important;overflow-wrap: break-word !important;">
            <section data-darkmode-bgcolor="rgb(36, 36, 36)" style="margin-top: 15px;margin-bottom: 15px;padding-right: 15px;padding-left: 15px;max-width: 100%;color: rgb(118, 163, 229);font-size: 1.5em;font-family: inherit;text-align: center;text-decoration: inherit;box-sizing: border-box !important;overflow-wrap: break-word !important;">
              <section data-darkmode-bgcolor="rgb(36, 36, 36)" style="max-width: 100%;text-align: left;box-sizing: border-box !important;overflow-wrap: break-word !important;"><span style="max-width: 100%;font-size: 15px;box-sizing: border-box !important;overflow-wrap: break-word !important;">
                  3.&nbsp;${dx.title3}</span></section>
            </section>
            <section data-darkmode-bgcolor="rgb(36, 36, 36)" style="padding-right: 10px;padding-left: 10px;max-width: 100%;color: rgb(118, 163, 229);font-size: 1.2em;display: inline-block;height: 2em;border-top: 2px solid rgb(118, 163, 229);border-right: 2px solid rgb(118, 163, 229);border-bottom: 2px solid rgb(118, 163, 229);border-left-style: none;overflow: hidden;line-height: 2em;border-top-right-radius: 1em;border-bottom-right-radius: 1em;font-family: inherit;text-decoration: inherit;box-sizing: border-box !important;overflow-wrap: break-word !important;">
              <section data-darkmode-bgcolor="rgb(36, 36, 36)" style="max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;"><span style="max-width: 100%;font-size: 15px;box-sizing: border-box !important;overflow-wrap: break-word !important;">
                  @${dx.author3}</span></section>
            </section>
            <section data-darkmode-bgcolor="rgb(36, 36, 36)" style="margin-top: 20px;margin-bottom: 20px;padding-right: 15px;padding-left: 15px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;">
              <p style="color: rgb(121, 121, 121);letter-spacing: 0.544px;text-align: start;white-space: normal;"><span style="font-size: 15px;">
                ${dx.url3}
              </span></p>
              <p style="color: rgb(121, 121, 121);letter-spacing: 0.544px;text-align: start;white-space: normal;"><br></p>
              <p style="color: rgb(121, 121, 121);letter-spacing: 0.544px;white-space: normal;"><span style="font-size: 15px;">
                ${dx.introduce3}
              </span></p>
            </section>
          </section>
          <section data-darkmode-bgcolor="rgb(36, 36, 36)" style="max-width: 100%;color: rgba(255, 255, 255, 0.8);font-size: 14px;width: 0px;height: 0px;clear: both;box-sizing: border-box !important;overflow-wrap: break-word !important;"><br data-darkmode-bgcolor="rgb(36, 36, 36)" style="max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;"></section>
        </section>
      </section>
      <br/>

      <p style="max-width: 100%;min-height: 1em;box-sizing: border-box !important;overflow-wrap: break-word !important;"><br style="max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;"></p>
      <hr style="max-width: 100%;border-style: solid;border-right-width: 0px;border-bottom-width: 0px;border-left-width: 0px;border-color: rgba(0, 0, 0, 0.098);transform-origin: 0px 0px 0px;transform: scale(1, 0.5);box-sizing: border-box !important;overflow-wrap: break-word !important;">
      <p style="max-width: 100%;min-height: 1em;color: rgb(53, 53, 53);font-size: 14px;text-align: start;letter-spacing: 0.544px;box-sizing: border-box !important;overflow-wrap: break-word !important;"><br style="max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;"></p>
      <p style="max-width: 100%;min-height: 1em;letter-spacing: 0.544px;color: rgb(53, 53, 53);font-size: 14px;text-align: start;box-sizing: border-box !important;overflow-wrap: break-word !important;"><span style="max-width: 100%;font-size: 15px;box-sizing: border-box !important;overflow-wrap: break-word !important;"><strong style="max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;">Web3极客日报</strong>是为Web3时代的极客们准备的一份日报，它是由一群极客们推荐他们认为有价值的内容并附上一段推荐语，最后通过Rebase的成员整理编辑。</span></p>
      <p style="max-width: 100%;min-height: 1em;letter-spacing: 0.544px;color: rgb(53, 53, 53);font-size: 14px;text-align: start;box-sizing: border-box !important;overflow-wrap: break-word !important;"><br style="max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;"></p>
      <p style="max-width: 100%;min-height: 1em;letter-spacing: 0.544px;color: rgb(53, 53, 53);font-size: 14px;text-align: start;box-sizing: border-box !important;overflow-wrap: break-word !important;"><br style="max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;"></p>
      <hr style="max-width: 100%;border-style: solid;border-right-width: 0px;border-bottom-width: 0px;border-left-width: 0px;border-color: rgba(0, 0, 0, 0.098);transform-origin: 0px 0px 0px;transform: scale(1, 0.5);box-sizing: border-box !important;overflow-wrap: break-word !important;">
      <p style="max-width: 100%;min-height: 1em;text-align: center;box-sizing: border-box !important;overflow-wrap: break-word !important;"><br style="max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;"></p>
      <p style="max-width: 100%;min-height: 1em;text-align: center;box-sizing: border-box !important;overflow-wrap: break-word !important;"><span style="max-width: 100%;font-size: 15px;box-sizing: border-box !important;overflow-wrap: break-word !important;"><strong style="max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;">网站：</strong><strong style="max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;">http://rebase.network</strong></span></p>
      <p style="max-width: 100%;min-height: 1em;text-align: center;box-sizing: border-box !important;overflow-wrap: break-word !important;"><span style="max-width: 100%;font-size: 15px;box-sizing: border-box !important;overflow-wrap: break-word !important;"><strong style="max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;">公众号：</strong><strong style="max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;">rebase_network</strong></span></p>
      <p style="max-width: 100%;min-height: 1em;box-sizing: border-box !important;overflow-wrap: break-word !important;"><br style="max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;"></p>
      <p style="max-width: 100%;min-height: 1em;color: rgb(53, 53, 53);font-size: 14px;text-align: center;letter-spacing: 0.544px;box-sizing: border-box !important;overflow-wrap: break-word !important;"><img class="rich_pages img_loading" data-ratio="1" data-s="300,640" data-type="png" data-w="372" data-src="https://mmbiz.qpic.cn/mmbiz_png/dQFmOEibdOIKVOj71RpnXzn8Tr4FaCggj0LDicic24267jickINQpwKjNSWo92oMn7M5phnyIuV5FIcbKzicMje0ZHw/640?wx_fmt=png" style="box-sizing: border-box !important; overflow-wrap: break-word !important; visibility: visible !important; width: 223px !important; height: 223px !important;" _width="223px" src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==" crossorigin="anonymous"></p>
    </div>
  `
  return wx_content;
}
