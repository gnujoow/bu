#-*- coding: utf-8 -*-
'''
	동에서 누락된 위도 경도 정보를 DB에 저장한다.

'''
import urllib
import MySQLdb
import json
import time 

db = MySQLdb.connect(host="homework.clqs4ekatbc7.ap-northeast-1.rds.amazonaws.com", port=3306, user="root", passwd="q1w2e3r4", db="budongsan")
cursor = db.cursor()
sql = "SELECT * from dong;"
cursor.execute(sql)
rows = cursor.fetchall()

#지오코딩이랑 리버스지오코딩 37.479 | 127.061 
geo = 'http://maps.google.com/maps/api/geocode/json?sensor=false&address='
r_geo = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=37.479,127.061&sensor=false'

#저장
for r in rows:
	time.sleep(1)#안하면 값이 안넘어오더라..
	print r[0],r[2],r[1]
	url =  geo+str(r[2])+" "+str(r[1])
	html = urllib.urlopen(url)
	data = json.load(html) 
	ret = data['results'][0]['geometry']['location'].values()
	sql = "UPDATE dong SET x=%s, y=%s where id=%s;" % (str(ret[0]),str(ret[1]),str(r[0]))
	cursor.execute(sql)
	db.commit()

