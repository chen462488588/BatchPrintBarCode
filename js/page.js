function generatePage() {
    if (!checkIsNum()){
        return;
    } ;
    //隐藏form表单
    $("form.form-horizontal").hide();

    var startNum = parseInt($.trim($("#startCode").val()));
    var endNum = parseInt($.trim($("#endCode").val()));
    var preStr = $.trim($("#preStr").val());


    //要打印第几页
    var pageNum = 0;
    //总页数
    var totalPage = parseInt((endNum - startNum) / 6) + 1;
    //存储条形码的编号
    var barCodeNums = [];
    //临时存储每个条形码的div包含的html
    var barCodeDIVs = [];

    //每页包含的div
    var pageBarCodeDiv = [];

    //默认值设置为"" ，防止初始化数组拼接后产生undefined
    for (var i = 0; i < totalPage; i++) {
        pageBarCodeDiv[i] = "";
    }


    for (var i = 0; i <= endNum - startNum; i++) {
        barCodeNums[i] = preStr + (i + startNum);
        console.log(barCodeNums[i]);

        if (i % 2 != 0) {//条码若是奇数
            barCodeDIVs[i] = generateBarCodeDiv("barCodeBox mr-10", "img" + (i + 1));
        } else {
            barCodeDIVs[i] = generateBarCodeDiv("barCodeBox", "img" + (i + 1));
        }
        //每六个条码都要新增一页
        if (i % 6 == 0) {
            var pageDiv = generateOnePageDiv(++pageNum);
            //把生成的页div填充到条码容器
            $("#Container").append(pageDiv);


        }

        //用数组来缓存每页的div信息
        pageBarCodeDiv[pageNum - 1] = pageBarCodeDiv[pageNum - 1] + barCodeDIVs[i];
    }

    for (var i = 0; i < totalPage; i++) {
        //把每页拼接后的条形码div填充到条码容器div
        $("#PageBarCodeContainer" + (i + 1)).html(pageBarCodeDiv[i]);
    }

    //填充div后给每个div填充条形码
    for (var i = 0; i <= endNum - startNum; i++) {
        JsBarcode(document.getElementById('img' + (i + 1)), barCodeNums[i], options);
    }
}

//生成一个div用来装一页条形码
function generateOnePageDiv(page) {
    var pageDiv = "<div class=\"vertical-containers\" id=\"PageBarCodeContainer" + page + "\" style=\"page-break-after: always;\"" + " \">\n" +
        "</div>";
    return pageDiv;
}

//生成一个条形码的div
function generateBarCodeDiv(divClass, imgID) {

    var barCodeDiv = " <div class=\"" + divClass + "\">\n" +
        "        <div class=\"img\">\n" +
        "            <img id=\"" + imgID + "\"/>\n" +
        "        </div>\n" +
        "    </div>";
    return barCodeDiv;
}

//校验输入的内容是否为合法数字
function checkIsNum() {
    var startCode = $.trim($("#startCode").val());
    var endCode = $.trim($("#endCode").val());
    var preCode = $.trim($("#preStr").val());
    var regExp = new RegExp(/^\+?[1-9][0-9]*$/);


    console.log( regExp.test(endCode));
    console.log(regExp.test(startCode));
    console.log(!regExp.test(startCode) || !regExp.test(endCode));


    if (""==startCode || ""==endCode || "" == preCode){
        alert("不能输入空值！");
        return  false;
    }
    
    if (!regExp.test(startCode) || !regExp.test(endCode)){
        alert("请输入正确的数字！");
        return false;
    };
    if (parseInt(startCode)>parseInt(endCode)){
        alert("起始值不能大于终止值！");
        return  false;
    }
    return  true;
}
