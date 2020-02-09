#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import json
import requests

end_point_url_posts ="http://rebase.network/wp-json/wp/v2/posts"
web3_excel_url = "https://sheet.best/api/sheets/237303bb-7468-4aeb-a385-51c0a81eac54"

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
    p_featured_media = "647" # 封面图片的id
    p_categories = "27" # 类别id

    payload = {
        'title': p_title,
        'content' : p_content,
        'author' : p_author,
        'status' : p_status,
        'format': p_format,
        'featured_media' : p_featured_media,
        'categories' : p_categories,
    }

    headers = {'content-type': "Application/json"}

    r = requests.post(end_point_url_posts, auth=(u_id, u_passwd), headers=headers, data=json.dumps(payload))

    print(r.text) # 返回json格式的文章详细数据


if __name__ == '__main__':
    u_id = "" # 用户名
    u_passwd = "" # 使用 https://wordpress.org/plugins/application-passwords/ 得到密码

    p_author = "2" # 作者id
    p_title = "文章标题" # 文章标题
    # p_content = "" # 文章內容

    p_content = get_web3_content(web3_excel_url)
    print(p_content)

    create_wp_post(u_id, u_passwd, p_author, p_title, p_content)

# https://www.yannyann.site/2018/09/wp-rest-api-create-new-post-and-upload-image/
# https://gist.githubusercontent.com/a2d8a4v/ecb2843621aa9f5287b1b2a6c0c6e400/raw/4b405917e6eeede6ddab78f88191c58c6d5f8055/WP%20REST%20API%20by%20Python%203.5%20-%20Create%20a%20new%20post
# https://developer.wordpress.org/rest-api/reference/posts/#create-a-post
# http://www.bagualu.net/wordpress/archives/5408
# https://github.com/liushooter/google-appscript#%E4%BA%A7%E5%93%81

