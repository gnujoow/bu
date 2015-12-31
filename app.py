#! /usr/bin.python
# -*- coding: utf-8 -*-
from flask import Flask,render_template, Response, request
from flaskext.mysql import MySQL

import json, urllib, lxml
from bs4 import BeautifulSoup

mysql = MySQL()
app = Flask(__name__)
#MySQL configuration
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'q1w2e3r4'
app.config['MYSQL_DATABASE_HOST'] = 'homework.clqs4ekatbc7.ap-northeast-1.rds.amazonaws.com'
app.config['MYSQL_DATABASE_DB'] = 'budongsan'
mysql.init_app(app)

@app.route('/')
def index():
	return render_template('index.html')

#API
@app.route('/getGu', methods=["GET"])
def loadGu():
	sql = "SELECT * FROM gu;"
	return loadSql(sql)

@app.route('/getDanji',methods=['GET','POST'])
def loadDanji():
	if request.method == 'GET':
		sql = "SELECT * FROM danji LIMIT 300;"
	elif request.method == 'POST':
		bounds = request.form.to_dict()
		sql = "SELECT * FROM danji where (%s BETWEEN %s and %s) and (%s BETWEEN %s and %s);"\
		 %('x',bounds['ca'],bounds['ba'],'y',bounds['T'],bounds['aa'])
		print sql

	return loadSql(sql)

@app.route('/getMemul/<int:danji>',methods=["get"])
def loadMemul(danji):
	cursor = mysql.get_db().cursor()
	sql = "SELECT * FROM danji WHERE id = %d;" % (danji)
	cursor.execute(sql)
	raw = cursor.fetchall();
	return crawlPrice(int(raw[0][2]))


def loadSql(sql):
	cursor = mysql.get_db().cursor()
	cursor.execute(sql)

	result=[]
	columns = tuple(d[0] for d in cursor.description) #value에 description 달기
	for row in cursor:
		result.append(dict(zip(columns, row)))

	return json.dumps(result)

#해당 단지의 매물을 보여줌 / 아파트이면서 매매인것만
def crawlPrice(id):
	url = 'http://land.naver.com/article/articleList.nhn?rletNo=%d&rletTypeCd=A01&tradeTypeCd=A1' % (id) #단지번호
	html = urllib.urlopen(url)
	soup = BeautifulSoup(html,'lxml')
	soup =  soup.find('tbody')
	soup = soup.find_all('tr')

	#가격
	result=[]
	idx = 0
	for s in soup:
		a = {}
		if not isinstance(s.find('',{"class":"calc_area"}),type(None)):
			string = s.find('',{"class":"calc_area"}).text.encode('utf-8')#.replace('\t', "")
			arr = string.replace('\t', "").replace('\n', "").replace('\r', "").split('㎡')
			a.update({'supply':arr[0]})# 공급면적#더 나누고 싶은데 [Decode error - output not utf-8]가 뜬
			a.update({'only':arr[1]})#전용면적
		if not isinstance(s.find('strong'),type(None)):
			a.update({'price':s.find('strong').text.encode('utf-8')})
		if a:#null이 아니면
			idx = idx+1
			a.update({'id':idx})
			result.append(a)
	return json.dumps(result)

if __name__ == "__main__":
	app.run(debug=True)