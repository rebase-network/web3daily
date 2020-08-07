#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import json
import requests

end_point_url_posts ="https://rebase.network/wp-json/wp/v2/posts"
web3_excel_url = "https://sheet.best/api/sheets/c904c7be-955d-429e-9c29-376f4e31ecca"

def get_web3_content(url):
    headers = {'content-type': "Application/json"}
    resp = requests.get(url, headers=headers)
    # print(resp.text)

    objs = json.loads(resp.text)

    content = ""

    for post in objs[0:3]:
        url = post['url']
        title = post['title']
        intro = post['introduce']

        print(url)
        print(title)
        print(intro)
        print("-" * 50)

        _content = title + " \n" +  url + "\n" + intro + "\n" + "<br/><br/><br/>"
        content += _content

    return content

def create_wp_post(u_id, u_passwd, p_author, p_title, p_content):

    # 以下内容不用修改
    p_status = "publish" # 直接发布
    p_format = "gallery" # 展示方式
    p_featured_media = "1012" # 封面图片的id
    p_categories = "27" # 类别id
    p_tags = [30,32,31,28]
    payload = {
        'title': p_title,
        'content' : p_content,
        'author' : p_author,
        'status' : p_status,
        'format': p_format,
        'featured_media' : p_featured_media,
        'categories' : p_categories,
        'tags': p_tags,
    }

    headers = {'content-type': "Application/json"}

    resp = requests.post(end_point_url_posts, auth=(u_id, u_passwd), headers=headers, data=json.dumps(payload))
    result = json.loads(resp.text)
    # print(resp.text)
    print(result["permalink_template"])

def get_content():

    content = '''
        <strong>1. 题目</strong>
        <a href="https://terminal.co/" target="_blank">https://terminal.co/</a>

        @name：DeFiZap 将多个DeFi协议有机组合在一起，支持一键式的多种组合操作
        &nbsp;

        <strong>2. Embark初探：一款强大的DApp开发框架</strong>
        <a href="https://terminal.co/" target="_blank">https://terminal.co/</a>

        @zqw：Uniswap2.0 来了，包含了许多新特性和改进。&nbsp;

        <strong>3. Blockstack 公布新共识机制PoX</strong>
        <a href="https://www.reddit.com/r/dapps" target="_blank">https://www.reddit.com/r/dapps</a>

        @Sara：浏览器钱包叫做 Keplr，由Everret Protocol 团队开发，主打Cosmos生态内的区块链的互操作

        <!--more-->

        <strong><span class="" data-raw-text="W" data-textnode-index="24" data-index="486">W</span><span class="" data-raw-text="e" data-textnode-index="24" data-index="487">e</span><span class="" data-raw-text="b" data-textnode-index="24" data-index="488">b</span><span class="" data-raw-text="3" data-textnode-index="24" data-index="489">3</span><span class="" data-raw-text="极" data-textnode-index="24" data-index="490">极</span><span class="" data-raw-text="客" data-textnode-index="24" data-index="491">客</span><span class="" data-raw-text="日" data-textnode-index="24" data-index="492">日</span><span class="" data-raw-text="报" data-textnode-index="24" data-index="493">报</span></strong><span class="" data-raw-text="是" data-textnode-index="25" data-index="494">是</span><span class="" data-raw-text="为" data-textnode-index="25" data-index="495">为</span><span class="" data-raw-text="W" data-textnode-index="25" data-index="496">W</span><span class="" data-raw-text="e" data-textnode-index="25" data-index="497">e</span><span class="" data-raw-text="b" data-textnode-index="25" data-index="498">b</span><span class="" data-raw-text="3" data-textnode-index="25" data-index="499">3</span><span class="" data-raw-text="时" data-textnode-index="25" data-index="500">时</span><span class="" data-raw-text="代" data-textnode-index="25" data-index="501">代</span><span class="" data-raw-text="的" data-textnode-index="25" data-index="502">的</span><span class="" data-raw-text="极" data-textnode-index="25" data-index="503">极</span><span class="" data-raw-text="客" data-textnode-index="25" data-index="504">客</span><span class="" data-raw-text="们" data-textnode-index="25" data-index="505">们</span><span class="" data-raw-text="准" data-textnode-index="25" data-index="506">准</span><span class="" data-raw-text="备" data-textnode-index="25" data-index="507">备</span><span class="" data-raw-text="的" data-textnode-index="25" data-index="508">的</span><span class="" data-raw-text="一" data-textnode-index="25" data-index="509">一</span><span class="" data-raw-text="份" data-textnode-index="25" data-index="510">份</span><span class="" data-raw-text="日" data-textnode-index="25" data-index="511">日</span><span class="" data-raw-text="报" data-textnode-index="25" data-index="512">报</span><span class="" data-raw-text="，" data-textnode-index="25" data-index="513">，</span><span class="" data-raw-text="它" data-textnode-index="25" data-index="514">它</span><span class="" data-raw-text="是" data-textnode-index="25" data-index="515">是</span><span class="" data-raw-text="由" data-textnode-index="25" data-index="516">由</span><span class="" data-raw-text="一" data-textnode-index="25" data-index="517">一</span><span class="" data-raw-text="群" data-textnode-index="25" data-index="518">群</span><span class="" data-raw-text="极" data-textnode-index="25" data-index="519">极</span><span class="" data-raw-text="客" data-textnode-index="25" data-index="520">客</span><span class="" data-raw-text="们" data-textnode-index="25" data-index="521">们</span><span class="" data-raw-text="推" data-textnode-index="25" data-index="522">推</span><span class="" data-raw-text="荐" data-textnode-index="25" data-index="523">荐</span><span class="" data-raw-text="他" data-textnode-index="25" data-index="524">他</span><span class="" data-raw-text="们" data-textnode-index="25" data-index="525">们</span><span class="" data-raw-text="认" data-textnode-index="25" data-index="526">认</span><span class="" data-raw-text="为" data-textnode-index="25" data-index="527">为</span><span class="" data-raw-text="有" data-textnode-index="25" data-index="528">有</span><span class="" data-raw-text="价" data-textnode-index="25" data-index="529">价</span><span class="" data-raw-text="值" data-textnode-index="25" data-index="530">值</span><span class="" data-raw-text="的" data-textnode-index="25" data-index="531">的</span><span class="" data-raw-text="内" data-textnode-index="25" data-index="532">内</span><span class="" data-raw-text="容" data-textnode-index="25" data-index="533">容</span><span class="" data-raw-text="并" data-textnode-index="25" data-index="534">并</span><span class="" data-raw-text="附" data-textnode-index="25" data-index="535">附</span><span class="" data-raw-text="上" data-textnode-index="25" data-index="536">上</span><span class="" data-raw-text="一" data-textnode-index="25" data-index="537">一</span><span class="" data-raw-text="段" data-textnode-index="25" data-index="538">段</span><span class="" data-raw-text="推" data-textnode-index="25" data-index="539">推</span><span class="" data-raw-text="荐" data-textnode-index="25" data-index="540">荐</span><span class="" data-raw-text="语" data-textnode-index="25" data-index="541">语</span><span class="" data-raw-text="，" data-textnode-index="25" data-index="542">，</span><span class="" data-raw-text="最" data-textnode-index="25" data-index="543">最</span><span class="" data-raw-text="后" data-textnode-index="25" data-index="544">后</span><span class="" data-raw-text="通" data-textnode-index="25" data-index="545">通</span><span class="" data-raw-text="过" data-textnode-index="25" data-index="546">过</span><span class="" data-raw-text="R" data-textnode-index="25" data-index="547">R</span><span class="" data-raw-text="e" data-textnode-index="25" data-index="548">e</span><span class="" data-raw-text="b" data-textnode-index="25" data-index="549">b</span><span class="" data-raw-text="a" data-textnode-index="25" data-index="550">a</span><span class="" data-raw-text="s" data-textnode-index="25" data-index="551">s</span><span class="" data-raw-text="e" data-textnode-index="25" data-index="552">e</span><span class="" data-raw-text="的" data-textnode-index="25" data-index="553">的</span><span class="" data-raw-text="成" data-textnode-index="25" data-index="554">成</span><span class="" data-raw-text="员" data-textnode-index="25" data-index="555">员</span><span class="" data-raw-text="整" data-textnode-index="25" data-index="556">整</span><span class="" data-raw-text="理" data-textnode-index="25" data-index="557">理</span><span class="" data-raw-text="编" data-textnode-index="25" data-index="558">编</span><span class="" data-raw-text="辑" data-textnode-index="25" data-index="559">辑</span><span class="" data-raw-text="。" data-textnode-index="25" data-index="560">。</span>

        <span class="" data-raw-text="如" data-textnode-index="26" data-index="561">如</span><span class="" data-raw-text="果" data-textnode-index="26" data-index="562">果</span><span class="" data-raw-text="你" data-textnode-index="26" data-index="563">你</span><span class="" data-raw-text="是" data-textnode-index="26" data-index="564">是</span><span class="" data-raw-text="一" data-textnode-index="26" data-index="565">一</span><span class="" data-raw-text="名" data-textnode-index="26" data-index="566">名</span><span class="" data-raw-text="极" data-textnode-index="26" data-index="567">极</span><span class="" data-raw-text="客" data-textnode-index="26" data-index="568">客</span><span class="" data-raw-text="，" data-textnode-index="26" data-index="569">，</span><span class="" data-raw-text="你" data-textnode-index="26" data-index="570">你</span><span class="" data-raw-text="有" data-textnode-index="26" data-index="571">有</span><span class="" data-raw-text="好" data-textnode-index="26" data-index="572">好</span><span class="" data-raw-text="的" data-textnode-index="26" data-index="573">的</span><span class="" data-raw-text="工" data-textnode-index="26" data-index="574">工</span><span class="" data-raw-text="具" data-textnode-index="26" data-index="575">具</span><span class="" data-raw-text="、" data-textnode-index="26" data-index="576">、</span><span class="" data-raw-text="好" data-textnode-index="26" data-index="577">好</span><span class="" data-raw-text="的" data-textnode-index="26" data-index="578">的</span><span class="" data-raw-text="开" data-textnode-index="26" data-index="579">开</span><span class="" data-raw-text="源" data-textnode-index="26" data-index="580">源</span><span class="" data-raw-text="项" data-textnode-index="26" data-index="581">项</span><span class="" data-raw-text="目" data-textnode-index="26" data-index="582">目</span><span class="" data-raw-text="、" data-textnode-index="26" data-index="583">、</span><span class="" data-raw-text="好" data-textnode-index="26" data-index="584">好</span><span class="" data-raw-text="的" data-textnode-index="26" data-index="585">的</span><span class="" data-raw-text="文" data-textnode-index="26" data-index="586">文</span><span class="" data-raw-text="章" data-textnode-index="26" data-index="587">章</span><span class="" data-raw-text="和" data-textnode-index="26" data-index="588">和</span><span class="" data-raw-text="教" data-textnode-index="26" data-index="589">教</span><span class="" data-raw-text="程" data-textnode-index="26" data-index="590">程</span><span class="" data-raw-text="等" data-textnode-index="26" data-index="591">等</span><span class="" data-raw-text="想" data-textnode-index="26" data-index="592">想</span><span class="" data-raw-text="要" data-textnode-index="26" data-index="593">要</span><span class="" data-raw-text="分" data-textnode-index="26" data-index="594">分</span><span class="" data-raw-text="享" data-textnode-index="26" data-index="595">享</span><span class="" data-raw-text="给" data-textnode-index="26" data-index="596">给</span><span class="" data-raw-text="大" data-textnode-index="26" data-index="597">大</span><span class="" data-raw-text="家" data-textnode-index="26" data-index="598">家</span><span class="" data-raw-text="，" data-textnode-index="26" data-index="599">，</span><span class="" data-raw-text="请" data-textnode-index="26" data-index="600">请</span><span class="" data-raw-text="推" data-textnode-index="26" data-index="601">推</span><span class="" data-raw-text="荐" data-textnode-index="26" data-index="602">荐</span><span class="" data-raw-text="给" data-textnode-index="26" data-index="603">给</span><span class="" data-raw-text="我" data-textnode-index="26" data-index="604">我</span><span class="" data-raw-text="们" data-textnode-index="26" data-index="605">们</span><span class="" data-raw-text="！" data-textnode-index="26" data-index="606">！</span>

        <span class="" data-raw-text="如" data-textnode-index="27" data-index="607">如</span><span class="" data-raw-text="果" data-textnode-index="27" data-index="608">果</span><span class="" data-raw-text="你" data-textnode-index="27" data-index="609">你</span><span class="" data-raw-text="也" data-textnode-index="27" data-index="610">也</span><span class="" data-raw-text="想" data-textnode-index="27" data-index="611">想</span><span class="" data-raw-text="参" data-textnode-index="27" data-index="612">参</span><span class="" data-raw-text="与" data-textnode-index="27" data-index="613">与</span><span class="" data-raw-text="到" data-textnode-index="27" data-index="614">到</span><span class="" data-raw-text="W" data-textnode-index="27" data-index="615">W</span><span class="" data-raw-text="e" data-textnode-index="27" data-index="616">e</span><span class="" data-raw-text="b" data-textnode-index="27" data-index="617">b</span><span class="" data-raw-text="3" data-textnode-index="27" data-index="618">3</span><span class="" data-raw-text="极" data-textnode-index="27" data-index="619">极</span><span class="" data-raw-text="客" data-textnode-index="27" data-index="620">客</span><span class="" data-raw-text="日" data-textnode-index="27" data-index="621">日</span><span class="" data-raw-text="报" data-textnode-index="27" data-index="622">报</span><span class="" data-raw-text="的" data-textnode-index="27" data-index="623">的</span><span class="" data-raw-text="建" data-textnode-index="27" data-index="624">建</span><span class="" data-raw-text="设" data-textnode-index="27" data-index="625">设</span><span class="" data-raw-text="中" data-textnode-index="27" data-index="626">中</span><span class="" data-raw-text="，" data-textnode-index="27" data-index="627">，</span><span class="" data-raw-text="请" data-textnode-index="27" data-index="628">请</span><span class="" data-raw-text="在" data-textnode-index="27" data-index="629">在</span><span class="" data-raw-text="后" data-textnode-index="27" data-index="630">后</span><span class="" data-raw-text="台" data-textnode-index="27" data-index="631">台</span><span class="" data-raw-text="留" data-textnode-index="27" data-index="632">留</span><span class="" data-raw-text="下" data-textnode-index="27" data-index="633">下</span><span class="" data-raw-text="你" data-textnode-index="27" data-index="634">你</span><span class="" data-raw-text="的" data-textnode-index="27" data-index="635">的</span><span class="" data-raw-text="微" data-textnode-index="27" data-index="636">微</span><span class="" data-raw-text="信" data-textnode-index="27" data-index="637">信</span><span class="" data-raw-text="号" data-textnode-index="27" data-index="638">号</span><span class="" data-raw-text="和" data-textnode-index="27" data-index="639">和</span><span class="" data-raw-text="简" data-textnode-index="27" data-index="640">简</span><span class="" data-raw-text="单" data-textnode-index="27" data-index="641">单</span><span class="" data-raw-text="的" data-textnode-index="27" data-index="642">的</span><span class="" data-raw-text="介" data-textnode-index="27" data-index="643">介</span><span class="" data-raw-text="绍" data-textnode-index="27" data-index="644">绍</span><span class="" data-raw-text="，" data-textnode-index="27" data-index="645">，</span><span class="" data-raw-text="我" data-textnode-index="27" data-index="646">我</span><span class="" data-raw-text="们" data-textnode-index="27" data-index="647">们</span><span class="" data-raw-text="（" data-textnode-index="27" data-index="648">（</span><span class="" data-raw-text="一" data-textnode-index="27" data-index="649">一</span><span class="" data-raw-text="群" data-textnode-index="27" data-index="650">群</span><span class="" data-raw-text="闲" data-textnode-index="27" data-index="651">闲</span><span class="" data-raw-text="散" data-textnode-index="27" data-index="652">散</span><span class="" data-raw-text="的" data-textnode-index="27" data-index="653">的</span><span class="" data-raw-text="极" data-textnode-index="27" data-index="654">极</span><span class="" data-raw-text="客" data-textnode-index="27" data-index="655">客</span><span class="" data-raw-text="）" data-textnode-index="27" data-index="656">）</span><span class="" data-raw-text="会" data-textnode-index="27" data-index="657">会</span><span class="" data-raw-text="尽" data-textnode-index="27" data-index="658">尽</span><span class="" data-raw-text="快" data-textnode-index="27" data-index="659">快</span><span class="" data-raw-text="和" data-textnode-index="27" data-index="660">和</span><span class="" data-raw-text="你" data-textnode-index="27" data-index="661">你</span><span class="" data-raw-text="联" data-textnode-index="27" data-index="662">联</span><span class="" data-raw-text="系" data-textnode-index="27" data-index="663">系</span><span class="" data-raw-text="。" data-textnode-index="27" data-index="664">。</span>

        网站：http://rebase.network

        公众号：rebase_network
    '''
    return content

if __name__ == '__main__':
    u_id = "" # 用户名
    u_passwd = "" # 使用 https://wordpress.org/plugins/application-passwords/ 得到密码

    p_author = "2" # 作者id
    p_title = "Web3极客日报 #" # 文章标题
    p_content = get_content() # 文章內容

    # p_content = get_web3_content(web3_excel_url)

    create_wp_post(u_id, u_passwd, p_author, p_title, p_content)

# https://www.yannyann.com/2018/09/wp-rest-api-create-new-post-and-upload-image/
# https://gist.githubusercontent.com/a2d8a4v/ecb2843621aa9f5287b1b2a6c0c6e400/raw/4b405917e6eeede6ddab78f88191c58c6d5f8055/WP%20REST%20API%20by%20Python%203.5%20-%20Create%20a%20new%20post
# https://developer.wordpress.org/rest-api/reference/posts/#create-a-post
# http://www.bagualu.net/wordpress/archives/5408
