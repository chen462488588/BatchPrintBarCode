function generatePage() {
    var startNum = $("#startCode").val();
    var endNum = $("#endCode").val();

    var startBarCodeNum = "15C7-1" + startNum;
    //存储条形码的编号
    var barCodeNums = new Array();
    //临时存储每个条形码的div包含的html
    var barCodeDIVs = new Array();

    var temp = "";
    for (var i = 1; i <= endNum - startNum + 1; i++) {
        barCodeNums[i] = "15C7-1-" + i;
        console.log(barCodeNums[i]);
        if (i % 2 != 0) {
            barCodeDIVs[i] = generateOneDIV("barCodeBox mr-10", "img" + i, barCodeNums[i]);
        } else {
            barCodeDIVs[i] = generateOneDIV("barCodeBox", "img" + i, barCodeNums[i]);
        }

        temp = temp + barCodeDIVs[i];
    }
    //把拼接后的div一次性填充到条码容器div
    $("#BarCodeContainer").html(temp);
    //填充div后给每个div填充条形码
    for (var i = 1; i <= endNum - startNum + 1; i++) {
        JsBarcode(document.getElementById('img' + i), barCodeNums[i], options);
    }
}

//生成一个条形码的div
function generateOneDIV(divClass, imgID) {
    /*	var divContent = " <div class=\""+divClass+"\">\n" +
            "        <div class=\"img\">\n" +
            "            <img id=\""+imgID+"\"/>\n" +
            "        </div>\n" +
            "        <script>\n" +
            "            var "+imgID+" = document.getElementById('"+imgID+"'),\n" +
            "            JsBarcode("+imgID+","+barCode+", options);//原生\n" +
            "        </script>\n" +
            "    </div>";*/
    var divContent = " <div class=\"" + divClass + "\">\n" +
        "        <div class=\"img\">\n" +
        "            <img id=\"" + imgID + "\"/>\n" +
        "        </div>\n" +
        "    </div>";
    return divContent;
}
