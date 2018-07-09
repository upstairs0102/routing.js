/* 
 * Routing Javascript Lirary v0.1.0 (Beta)
 */

var routing = (function(){
   
    var _config = {};
        
    function doRouteTask(routeSetting){
        var currentPath = window.location.pathname;
        
        for(var no in routeSetting){
            var obj = routeSetting[no];
            var routePathWithParam = obj["path"];
            var routePath = returnRoutePathName(routePathWithParam);
            
            if(currentPath.indexOf(routePath) >= 0){
                var paramNameArr = returnParamNameArr(routePathWithParam);
                var paramDict = {};
                var isMatch = true;
                for(var no in paramNameArr){
                    var name = paramNameArr[no];
                    var value = getParamValue(name);
                    if(value == null){
                        isMatch = false;
                        break;// 任一參數不存在即跳過
                    }
                    paramDict[name] = value;
                }
                if(isMatch == true){
                    obj["task"](routePath, paramDict);
                    return;
                }
            }
        }
          
        function returnRoutePathName(path){
            
            if(path.indexOf("?") > 0){
                path = path.split("?")[0];
            }
            return path;
        }

        function returnParamNameArr(str){
            var paramArr = [];
            var index = 0;
            findParam(str,index);
            function findParam(str,index){
                var left = str.indexOf("{",index)
                var right = str.indexOf("}",index)
                if(left!=-1 && right!=-1){
                    var param = str.slice(left+1,right);
                    paramArr.push(param);
                    index = right + 1;
                findParam(str,index);
                }else{
                    return paramArr;
                }
            }
            
            return paramArr;
        }
        function getParamValue(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]); return null;
        }
    }

    return {
        config: function(rs){
            _config = rs;
            doRouteTask(_config);
        },
        dispatch: function(){
            doRouteTask(_config);
        }
    }

    
}())
