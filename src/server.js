const fs = require('fs');
const path = require("path");
const Koa = require('koa');
const router = require('@koa/router')();
const bodyParser = require('koa-bodyparser');

const fetch = require('node-fetch');
const dateFormat = require('dateformat');
const SteinStore = require("stein-js-client");

const app = new Koa();

app.use(bodyParser());

router.get('/', (ctx, next) => {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream(path.join(__dirname, "/views/index.html"));
})

router.post('/upload', async (ctx, next) => {

  let postData = ctx.request.body;

  const steinhqApi = "https://api.steinhq.com/v1/storages/5e73b903b88d3d04ae0815bb";
  const store = new SteinStore(steinhqApi);

  const now = getCurrTime();
  const epi = "#" + postData.episode;

  await crateWp(epi, postData);

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

  ctx.body = postData;
})

app.use(router.routes(), router.allowedMethods());

app.listen(2300, () => console.log("\n\nrunning on port http://localhost:2300"));

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

    @${dx.author1}：${dx.introduce2}
    &nbsp;

    <strong>3. ${dx.title3}</strong>
    <a href="${dx.url3}" target="_blank">${dx.url3}</a>

    @${dx.author1}：${dx.introduce3}
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

  const u_id = "" // 用户名
  const u_passwd = "" // 使用 https://wordpress.org/plugins/application-passwords/ 得到密码

  let headers = {
    'content-type': "Application/json",
  }

  headers['Authorization'] = 'Basic ' + Buffer.from(u_id + ":" + u_passwd).toString('base64');

  fetch(endpoint_url_posts, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
    })
    .then(res => res.json())
    .then(json => console.log(json.permalink_template));
}
