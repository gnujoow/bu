#-*- coding: utf-8 -*-
import urllib
from bs4 import BeautifulSoup
import lxml
import MySQLdb

db = MySQLdb.connect(host="homework.clqs4ekatbc7.ap-northeast-1.rds.amazonaws.com", port=3306, user="root", passwd="q1w2e3r4", db="budongsan")
cursor = db.cursor()

#구 정보
url = 'http://land.naver.com/'
html = urllib.urlopen(url)
soup = BeautifulSoup(html,'lxml')
gus =  soup.find_all('a','_dvsnItm') #infos는 구의 정보를 가지고있다.



i=0
j=0;
k=0;
#구에서 구의 위치 코드 x,y좌표추출
for gu in gus:#[17:18]
	i = i+1
	
	#print i, info.text.encode('utf-8'), int(info['dvsnno']), float(info['xcrdn']), float(info['ycrdn'])
	print i,gu.text.encode('utf-8')
	'''
	sql = "INSERT INTO gu (id, name,code,x,y) VALUES (%d,'%s',%d,%f,%f);" % (i,
																		info.text.encode('utf-8'),
																		int(info['dvsnno']),
																		float(info['xcrdn']),
																		float(info['ycrdn']))
	print sql;
	cursor.execute(sql)
	db.commit()

	'''

	#구의 코드로 검색
	url = 'http://land.naver.com/article/articleList.nhn?cortarNo=' + str(gu['dvsnno'].encode('utf-8'))
	html = urllib.urlopen(url)
	soup = BeautifulSoup(html,'lxml')
	dongs =  soup.find_all('option') #동의 정보를 가지고 있다.


	for dong in dongs[42:-2]:#[42:-2]: 
	#42부터 -2까지 동에는 주소코드밖에 정보가 없음
		j=j+1;
		print "\t",j,dong.text.encode('utf-8')
		'''
		print "\t",j, dong.text.encode('utf-8'),gu.text.encode('utf-8'),dong['value'].encode('utf-8'),i
		sql = "INSERT INTO dong (id, name,gu,code,upperCode) VALUES (%d,'%s','%s',%d,%d);" % (j,
																		dong.text.encode('utf-8'),
																		gu.text.encode('utf-8'),
																		int(dong['value']),
																		i)
		cursor.execute(sql)
		db.commit()
		'''

		#동 주소코드로 해당동의 매물검색 
		url = 'http://land.naver.com/article/articleList.nhn?cortarNo=' + str(dong['value'].encode('utf-8')+'&rletTypeCd=A01')
		html = urllib.urlopen(url)
		soup = BeautifulSoup(html,'lxml')
		complexlist =  soup.findAll('span',{"class":"list_name"})

		for comp in complexlist:
			memul = int(comp.find('em').text.encode('utf-8').split('/')[0][1:]) #매물의 갯수 전세 월세 거리고 매매만
			if not memul == 0:
				k=k+1;
				#단지 매매수, 단지코드, x좌표, y좌표
				data = comp.find('a')
				#print k,"\t\t",memul,data.text.encode('utf-8'),data['hscp_no'].encode('utf-8'),data['mapx'],data['mapy']

				print "\t\t",k,data.text.encode('utf-8')
				url= 'http://land.naver.com/article/complexInfo.nhn?rletNo=' + str(data['hscp_no'].encode('utf-8'))
				html = urllib.urlopen(url)
				soup = BeautifulSoup(html,'lxml')
				danji = soup.find('tbody')
				danji_infos =  danji.find_all('td')
				#단지에 여러정보가 있으나 파싱하기 여러정보가 있음

				offset=0
				#print "\t\t\t",danji_infos[0].text.encode('utf-8')
				if not len(danji_infos[2].text.encode('utf-8')) == 12:
					offset = 1

				#print "\t\t\t",danji_infos[2+offset].text.encode('utf-8')
				#print "\t\t\t\t",k,data.text.encode('utf-8'),data['hscp_no'],float(data['mapx']),float(data['mapy']),danji_infos[0].text.encode('utf-8'),danji_infos[2+offset].text.encode('utf-8'),j
				sql = "INSERT INTO danji (id,name,code,x,y,fam,brth,upperCode) VALUES (%d,'%s',%d,%f,%f,'%s','%s',%d);" % (k,
																											data.text.encode('utf-8'),
																											int(data['hscp_no']),
																											float(data['mapx']),
																											float(data['mapy']),
																											danji_infos[0].text.encode('utf-8')
																											,danji_infos[2+offset].text.encode('utf-8'),
																											j)
				print "\t\t\t\",sql
				cursor.execute(sql)
				db.commit()

#http://land.naver.com/article/complexInfo.nhn?rletNo=1004
#http://land.naver.com/article/complexInfo.nhn?rletNo=102432
'''
rletTypeCd= 매물타입
	A01 아파트
	A02 오피스텔
	B01 분양권
	C03 주택
	E03 토지
	C01 원룸
	D02 상가
	D01 사무실
	E02 공장
	F01 재개발
	D03 건물

tradeTypeCd=거래타입
	A1매매
	B1전세
	B2월세

atclRletTypeCd=뭔지 모르겠음
cortarNo=주소코드
rletNo= 단지
'''