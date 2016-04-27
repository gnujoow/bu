# project : bu
네이버의 부동산 정보를 map에 보여주는 프로젝트

run

	cd /bu
	browserify -t [ babelify --presets [ react ] ] source.js -o static/js/app.js
	python app.py
	

### spec
| language  | pyhton, javascript, html, css |
| ------------- | ------------- |
| framework  | flask, reactjs, bootstrap  |
| api  | daum map(cluster), googel map  |
| db | MySQL |

---
 - `./crawl` : naver 부동산에서 데이터를 가지고오기 위해 작성한 `python`코드

   - library : `lxml`, `beautiful soup4`, `MySQLdb`
   - `crawl.py` : [네이버부동산](land.naver.com) 구 -> 동 -> 단지의 code와 좌표정보를 가져오고 db에 저장
   - `geoadd.py` : 위 파일에서 동 정보를 가져올 때 동에 대한 geocode정보가 없어 *google mapgeocoding api*를 이용하여 위치정보 db에 저장
   - `final.py` : 단지코드를 입력하면 해당 단지에 대한 매물정보를 리턴 : 아파트, 매매인 매물만 **실제로 사용하지 않는 코드**
 
 
  - `node_modules` : reactjs build를 위한 모듈이 들어있는 폴더
  - `./src` : reactjs 코드
  - `./static` 
    - `.css`
    - `.js` : 빌드된 reactjs가 들어있는 폴더
 - `templates`

 

---
#DB - mysql

### table 
####gu
   
| Feild			| Type			| Description   |
| :------------ | :----------- |: -------------|
| id			| tinyint(4)    | 아이디 		|
| name			| varchar(20)   | 이름			|
| code			| int(11)  		| 네이버에서 사용하는 구 코드|
| x, y			| float			| 좌표정보 lat,lng|


####dong
   
| Feild			| Type			| Description   |
| :------------ | :----------- |: -------------|
| id			| int(11)       | 아이디 		|
| name			| varchar(20)   | 이름			|
| gu			| varchar(20)	| 동이 속한 구의 이름 |
| code			| int(11)  		| 네이버에서 사용하는 동 코드|
| uppderCode	| tinyint(4)	| 구의 id		|
| x, y			| float			| 좌표정보 lat,lng|

####danji
   
| Feild			| Type			| Description   |
| :------------ | :----------- |: -------------|
| id			| int(11)       | 아이디 		|
| name			| varchar(20)   | 이름			|
| code			| int(11)  		| 네이버에서 사용하는 동 코드|
| uppderCode	| tinyint(4)	| 구의 id		|
| x, y			| float			| 좌표정보 lat,lng|
| fam			| varchar(20)	| 세대수			|
| brth			| varchar(20)	| 건립일			|
