#-*- coding: utf-8 -*-
import urllib
from bs4 import BeautifulSoup
import lxml


'''
	db = MySQLdb.connect(host="homework.clqs4ekatbc7.ap-northeast-1.rds.amazonaws.com", port=3306, user="root", passwd="q1w2e3r4", db="budongsan")

	cursor = db.cursor()
	sql = "SELECT * FROM danji WHERE id = %d;" % (199)
	cursor.execute(sql)
	raw = cursor.fetchall();

int(raw[0][2])
'''
def crawlPrice(id):

	url = 'http://land.naver.com/article/articleList.nhn?rletNo=%d&rletTypeCd=A01&tradeTypeCd=A1' % (id) #단지번호
	html = urllib.urlopen(url)
	soup = BeautifulSoup(html,'lxml')
	soup =  soup.find('tbody')
	soup = soup.find_all('tr')

	#가격
	result=[]
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
			result.append(a)

	print url
	return result

crawlPrice(200)