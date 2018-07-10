# routing.js
Routing Javascript Lirary v0.1.0 (Beta)

routing.js是一個極簡易的網頁靜態路由，透過html原生方式擷取網址以及參數、並導向到指定function。此library以ECMA Script 5語法開發，一般主流瀏覽器皆適用（IE11可）

使用方式和一般js元件方式相同，一般建議放至<body>區域底部，例如

    <script src="routing.js"  type="text/javascript"></script>

## 載入頁面即導向

直接以範例說明：

    routing.config([
	    {
		    path:  "search.html?keyword={keyword}",
		    task:  search,
	    },
	    {
		    path:  "index.html?page={page}&type={type}",
		    task:  initPage,
	    },
    ])

此範例定義了兩個路由設定（可任意定義多個），各別以**path**定義網址，task定義指向的function。比如，當網頁開啟的網址為index.html?page=1&type=compony

進入**task**當中定義的function initPage

    function initPage(param){
    	//取得param..
    }

並取得參數

    param = {
      page: 1,
      type: "company"
    }

## 直接導向

使用方式大致和上述相同，首先也是要先定義 routing.config(..略..)

接著可使用此語法直接依照網址及參數進行導向

    routing.dispatch()

