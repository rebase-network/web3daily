const fs = require('fs');
const path = require("path");
const conf = require('config');

const Koa = require('koa');
const router = require('@koa/router')();
const bodyParser = require('koa-bodyparser');
const auth = require('koa-basic-auth');

const fetch = require('node-fetch');
const dateFormat = require('dateformat');
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

  const steinhqApi = "https://api.steinhq.com/v1/storages/5e73b903b88d3d04ae0815bb";
  const store = new SteinStore(steinhqApi);

  const now = getCurrTime();
  const epi = "#" + postData.episode;

const feedbackurl = await crateWp(epi, postData);

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

    const wxcontent = gen_wx_content(feedbackurl, postData)
    ctx.body = wxcontent;
})

app.use(router.routes(), router.allowedMethods());

const port = conf.get('port');

app.listen(port, () => console.log("\n\nrunning on port http://localhost:" + port));

function getCurrTime() { // 当前时间
  return dateFormat(new Date(), "yyyy-mm-dd");
}

function crateWp(epi, dx) {

  const endpoint_url_posts = "http://rebase.network/wp-json/wp/v2/posts"

  const p_status = "publish" // 直接发布
  const p_format = "gallery" // 展示方式
  const p_featured_media = "647" // 封面图片的id
  const p_categories = "27" // 类别id
  const p_author = "2" // 作者id

  const p_title = "Web3极客日报 " + epi;

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
    <span class="" data-raw-text="如" data-textnode-index="26" data-index="561">如</span><span class="" data-raw-text="果" data-textnode-index="26" data-index="562">果</span><span class="" data-raw-text="你" data-textnode-index="26" data-index="563">你</span><span class="" data-raw-text="是" data-textnode-index="26" data-index="564">是</span><span class="" data-raw-text="一" data-textnode-index="26" data-index="565">一</span><span class="" data-raw-text="名" data-textnode-index="26" data-index="566">名</span><span class="" data-raw-text="极" data-textnode-index="26" data-index="567">极</span><span class="" data-raw-text="客" data-textnode-index="26" data-index="568">客</span><span class="" data-raw-text="，" data-textnode-index="26" data-index="569">，</span><span class="" data-raw-text="你" data-textnode-index="26" data-index="570">你</span><span class="" data-raw-text="有" data-textnode-index="26" data-index="571">有</span><span class="" data-raw-text="好" data-textnode-index="26" data-index="572">好</span><span class="" data-raw-text="的" data-textnode-index="26" data-index="573">的</span><span class="" data-raw-text="工" data-textnode-index="26" data-index="574">工</span><span class="" data-raw-text="具" data-textnode-index="26" data-index="575">具</span><span class="" data-raw-text="、" data-textnode-index="26" data-index="576">、</span><span class="" data-raw-text="好" data-textnode-index="26" data-index="577">好</span><span class="" data-raw-text="的" data-textnode-index="26" data-index="578">的</span><span class="" data-raw-text="开" data-textnode-index="26" data-index="579">开</span><span class="" data-raw-text="源" data-textnode-index="26" data-index="580">源</span><span class="" data-raw-text="项" data-textnode-index="26" data-index="581">项</span><span class="" data-raw-text="目" data-textnode-index="26" data-index="582">目</span><span class="" data-raw-text="、" data-textnode-index="26" data-index="583">、</span><span class="" data-raw-text="好" data-textnode-index="26" data-index="584">好</span><span class="" data-raw-text="的" data-textnode-index="26" data-index="585">的</span><span class="" data-raw-text="文" data-textnode-index="26" data-index="586">文</span><span class="" data-raw-text="章" data-textnode-index="26" data-index="587">章</span><span class="" data-raw-text="和" data-textnode-index="26" data-index="588">和</span><span class="" data-raw-text="教" data-textnode-index="26" data-index="589">教</span><span class="" data-raw-text="程" data-textnode-index="26" data-index="590">程</span><span class="" data-raw-text="等" data-textnode-index="26" data-index="591">等</span><span class="" data-raw-text="想" data-textnode-index="26" data-index="592">想</span><span class="" data-raw-text="要" data-textnode-index="26" data-index="593">要</span><span class="" data-raw-text="分" data-textnode-index="26" data-index="594">分</span><span class="" data-raw-text="享" data-textnode-index="26" data-index="595">享</span><span class="" data-raw-text="给" data-textnode-index="26" data-index="596">给</span><span class="" data-raw-text="大" data-textnode-index="26" data-index="597">大</span><span class="" data-raw-text="家" data-textnode-index="26" data-index="598">家</span><span class="" data-raw-text="，" data-textnode-index="26" data-index="599">，</span><span class="" data-raw-text="请" data-textnode-index="26" data-index="600">请</span><span class="" data-raw-text="推" data-textnode-index="26" data-index="601">推</span><span class="" data-raw-text="荐" data-textnode-index="26" data-index="602">荐</span><span class="" data-raw-text="给" data-textnode-index="26" data-index="603">给</span><span class="" data-raw-text="我" data-textnode-index="26" data-index="604">我</span><span class="" data-raw-text="们" data-textnode-index="26" data-index="605">们</span><span class="" data-raw-text="！" data-textnode-index="26" data-index="606">！</span>
    <span class="" data-raw-text="如" data-textnode-index="27" data-index="607">如</span><span class="" data-raw-text="果" data-textnode-index="27" data-index="608">果</span><span class="" data-raw-text="你" data-textnode-index="27" data-index="609">你</span><span class="" data-raw-text="也" data-textnode-index="27" data-index="610">也</span><span class="" data-raw-text="想" data-textnode-index="27" data-index="611">想</span><span class="" data-raw-text="参" data-textnode-index="27" data-index="612">参</span><span class="" data-raw-text="与" data-textnode-index="27" data-index="613">与</span><span class="" data-raw-text="到" data-textnode-index="27" data-index="614">到</span><span class="" data-raw-text="W" data-textnode-index="27" data-index="615">W</span><span class="" data-raw-text="e" data-textnode-index="27" data-index="616">e</span><span class="" data-raw-text="b" data-textnode-index="27" data-index="617">b</span><span class="" data-raw-text="3" data-textnode-index="27" data-index="618">3</span><span class="" data-raw-text="极" data-textnode-index="27" data-index="619">极</span><span class="" data-raw-text="客" data-textnode-index="27" data-index="620">客</span><span class="" data-raw-text="日" data-textnode-index="27" data-index="621">日</span><span class="" data-raw-text="报" data-textnode-index="27" data-index="622">报</span><span class="" data-raw-text="的" data-textnode-index="27" data-index="623">的</span><span class="" data-raw-text="建" data-textnode-index="27" data-index="624">建</span><span class="" data-raw-text="设" data-textnode-index="27" data-index="625">设</span><span class="" data-raw-text="中" data-textnode-index="27" data-index="626">中</span><span class="" data-raw-text="，" data-textnode-index="27" data-index="627">，</span><span class="" data-raw-text="请" data-textnode-index="27" data-index="628">请</span><span class="" data-raw-text="在" data-textnode-index="27" data-index="629">在</span><span class="" data-raw-text="后" data-textnode-index="27" data-index="630">后</span><span class="" data-raw-text="台" data-textnode-index="27" data-index="631">台</span><span class="" data-raw-text="留" data-textnode-index="27" data-index="632">留</span><span class="" data-raw-text="下" data-textnode-index="27" data-index="633">下</span><span class="" data-raw-text="你" data-textnode-index="27" data-index="634">你</span><span class="" data-raw-text="的" data-textnode-index="27" data-index="635">的</span><span class="" data-raw-text="微" data-textnode-index="27" data-index="636">微</span><span class="" data-raw-text="信" data-textnode-index="27" data-index="637">信</span><span class="" data-raw-text="号" data-textnode-index="27" data-index="638">号</span><span class="" data-raw-text="和" data-textnode-index="27" data-index="639">和</span><span class="" data-raw-text="简" data-textnode-index="27" data-index="640">简</span><span class="" data-raw-text="单" data-textnode-index="27" data-index="641">单</span><span class="" data-raw-text="的" data-textnode-index="27" data-index="642">的</span><span class="" data-raw-text="介" data-textnode-index="27" data-index="643">介</span><span class="" data-raw-text="绍" data-textnode-index="27" data-index="644">绍</span><span class="" data-raw-text="，" data-textnode-index="27" data-index="645">，</span><span class="" data-raw-text="我" data-textnode-index="27" data-index="646">我</span><span class="" data-raw-text="们" data-textnode-index="27" data-index="647">们</span><span class="" data-raw-text="（" data-textnode-index="27" data-index="648">（</span><span class="" data-raw-text="一" data-textnode-index="27" data-index="649">一</span><span class="" data-raw-text="群" data-textnode-index="27" data-index="650">群</span><span class="" data-raw-text="闲" data-textnode-index="27" data-index="651">闲</span><span class="" data-raw-text="散" data-textnode-index="27" data-index="652">散</span><span class="" data-raw-text="的" data-textnode-index="27" data-index="653">的</span><span class="" data-raw-text="极" data-textnode-index="27" data-index="654">极</span><span class="" data-raw-text="客" data-textnode-index="27" data-index="655">客</span><span class="" data-raw-text="）" data-textnode-index="27" data-index="656">）</span><span class="" data-raw-text="会" data-textnode-index="27" data-index="657">会</span><span class="" data-raw-text="尽" data-textnode-index="27" data-index="658">尽</span><span class="" data-raw-text="快" data-textnode-index="27" data-index="659">快</span><span class="" data-raw-text="和" data-textnode-index="27" data-index="660">和</span><span class="" data-raw-text="你" data-textnode-index="27" data-index="661">你</span><span class="" data-raw-text="联" data-textnode-index="27" data-index="662">联</span><span class="" data-raw-text="系" data-textnode-index="27" data-index="663">系</span><span class="" data-raw-text="。" data-textnode-index="27" data-index="664">。</span>

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
      console.log("url =>", json.permalink_template);

      return json.permalink_template;
    });

}

function gen_wx_content(url, dx){
  let wx_content =`

    <div>直接复制以下内容到微信公众号，原文链接：${url} </div>

    <div class="rich_media_content" id="js_content" style="visibility: visible;">
      <h2 style="margin-bottom: 14px;font-size: 22px;line-height: 1.4;font-family: -apple-system-font, system-ui, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif;letter-spacing: 0.544px;text-align: start;white-space: normal;background-color: rgb(255, 255, 255);">
          <span style="font-size: 15px;">微信不支持外部链接，可以点击文章底部的<strong data-darkmode-bgcolor="rgb(36, 36, 36)" data-darkmode-color="rgb(150, 162, 172)" data-style="max-width: 100%; background-color: rgb(255, 255, 255); color: rgb(61, 70, 77); font-family: suxingme, &quot;Open Sans&quot;, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, STHeiti, &quot;WenQuanYi Micro Hei&quot;, SimSun, sans-serif; letter-spacing: 0.544px; text-align: start; box-sizing: border-box !important; overflow-wrap: break-word !important;" class="js_darkmode__1" style="font-size: 15px;max-width: 100%;letter-spacing: 0.544px;color: rgb(61, 70, 77);font-family: suxingme, &quot;Open Sans&quot;, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, STHeiti, &quot;WenQuanYi Micro Hei&quot;, SimSun, sans-serif;visibility: visible;box-sizing: border-box !important;overflow-wrap: break-word !important;">阅读原文</strong><span data-darkmode-bgcolor="rgb(36, 36, 36)" data-darkmode-color="rgb(150, 162, 172)" data-style="max-width: 100%; background-color: rgb(255, 255, 255); color: rgb(61, 70, 77); font-family: suxingme, &quot;Open Sans&quot;, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, STHeiti, &quot;WenQuanYi Micro Hei&quot;, SimSun, sans-serif; letter-spacing: 0.544px; text-align: start;" class="js_darkmode__2" style="max-width: 100%;letter-spacing: 0.544px;color: rgb(61, 70, 77);font-family: suxingme, &quot;Open Sans&quot;, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, STHeiti, &quot;WenQuanYi Micro Hei&quot;, SimSun, sans-serif;visibility: visible;box-sizing: border-box !important;overflow-wrap: break-word !important;">，方便阅读文中的链接。</span></span></h2>

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

      <p><br></p>

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

      <p data-darkmode-bgcolor="rgb(36, 36, 36)" data-style="white-space: normal; max-width: 100%; min-height: 1em; letter-spacing: 0.544px; font-family: -apple-system-font, system-ui, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255); box-sizing: border-box !important; overflow-wrap: break-word !important;" class="js_darkmode__6" style="max-width: 100%;min-height: 1em;font-size: 14px;text-align: start;color: rgba(255, 255, 255, 0.8);letter-spacing: 0.544px;box-sizing: border-box !important;overflow-wrap: break-word !important;"><br></p>
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
      <p><br></p>
      <p style="max-width: 100%;min-height: 1em;box-sizing: border-box !important;overflow-wrap: break-word !important;"><br style="max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;"></p>
      <hr style="max-width: 100%;border-style: solid;border-right-width: 0px;border-bottom-width: 0px;border-left-width: 0px;border-color: rgba(0, 0, 0, 0.098);transform-origin: 0px 0px 0px;transform: scale(1, 0.5);box-sizing: border-box !important;overflow-wrap: break-word !important;">
      <p style="max-width: 100%;min-height: 1em;color: rgb(53, 53, 53);font-size: 14px;text-align: start;letter-spacing: 0.544px;box-sizing: border-box !important;overflow-wrap: break-word !important;"><br style="max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;"></p>
      <p style="max-width: 100%;min-height: 1em;letter-spacing: 0.544px;color: rgb(53, 53, 53);font-size: 14px;text-align: start;box-sizing: border-box !important;overflow-wrap: break-word !important;"><span style="max-width: 100%;font-size: 15px;box-sizing: border-box !important;overflow-wrap: break-word !important;"><strong style="max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;">Web3极客日报</strong>是为Web3时代的极客们准备的一份日报，它是由一群极客们推荐他们认为有价值的内容并附上一段推荐语，最后通过Rebase的成员整理编辑。</span></p>
      <p style="max-width: 100%;min-height: 1em;letter-spacing: 0.544px;color: rgb(53, 53, 53);font-size: 14px;text-align: start;box-sizing: border-box !important;overflow-wrap: break-word !important;"><br style="max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;"></p>
      <p style="max-width: 100%;min-height: 1em;letter-spacing: 0.544px;color: rgb(53, 53, 53);font-size: 14px;text-align: start;box-sizing: border-box !important;overflow-wrap: break-word !important;"><span style="max-width: 100%;font-size: 15px;box-sizing: border-box !important;overflow-wrap: break-word !important;">如果你是一名极客，你有好的工具、好的开源项目、好的文章和教程等想要分享给大家，请推荐给我们！<span style="max-width: 100%;letter-spacing: 0.544px;">如果你也想参与到Web3极客日报的建设中，请在后台留下你的微信号和简单的介绍，我们（一群闲散的极客）会尽快和你联系。</span></span></p>
      <p style="max-width: 100%;min-height: 1em;letter-spacing: 0.544px;color: rgb(53, 53, 53);font-size: 14px;text-align: start;box-sizing: border-box !important;overflow-wrap: break-word !important;"><br style="max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;"></p>
      <hr style="max-width: 100%;border-style: solid;border-right-width: 0px;border-bottom-width: 0px;border-left-width: 0px;border-color: rgba(0, 0, 0, 0.098);transform-origin: 0px 0px 0px;transform: scale(1, 0.5);box-sizing: border-box !important;overflow-wrap: break-word !important;">
      <p style="max-width: 100%;min-height: 1em;text-align: center;box-sizing: border-box !important;overflow-wrap: break-word !important;"><br style="max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;"></p>
      <p style="max-width: 100%;min-height: 1em;text-align: center;box-sizing: border-box !important;overflow-wrap: break-word !important;"><span style="max-width: 100%;font-size: 15px;box-sizing: border-box !important;overflow-wrap: break-word !important;"><strong style="max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;">网站：</strong><strong style="max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;">http://rebase.network</strong></span></p>
      <p style="max-width: 100%;min-height: 1em;text-align: center;box-sizing: border-box !important;overflow-wrap: break-word !important;"><span style="max-width: 100%;font-size: 15px;box-sizing: border-box !important;overflow-wrap: break-word !important;"><strong style="max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;">公众号：</strong><strong style="max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;">rebase_network</strong></span></p>
      <p style="max-width: 100%;min-height: 1em;box-sizing: border-box !important;overflow-wrap: break-word !important;"><br style="max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;"></p>
      <p style="max-width: 100%;min-height: 1em;color: rgb(53, 53, 53);font-size: 14px;text-align: center;letter-spacing: 0.544px;box-sizing: border-box !important;overflow-wrap: break-word !important;"><img class="rich_pages img_loading" data-ratio="1" data-s="300,640" data-type="png" data-w="372" data-src="https://mmbiz.qpic.cn/mmbiz_png/dQFmOEibdOILxKiaRicuntofrvicP1v2g48bIUcYsz5nWg06M9e67TcTLr6dw9V7wr2h7uQRYQnkqvPUaboedLOkPg/640?wx_fmt=png" style="box-sizing: border-box !important; overflow-wrap: break-word !important; visibility: visible !important; width: 223px !important; height: 223px !important;" _width="223px" src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==" crossorigin="anonymous"></p>
      <p><br></p>
    </div>
  `

  return wx_content;
}
