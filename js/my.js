function initDatas(content,heigth){
		alert(content);
		alert(heigth);
	var barcode = document.getElementById('barcode');
	var options = {
		width : 2,//较细处条形码的宽度
		height : heigth, //条形码的宽度，无高度直接设置项，由位数决定，可以通过CSS去调整，见下
		quite : 10,
		format : "CODE128",
		displayValue : true,//是否在条形码下方显示文字
		font : "monospace",
		textAlign : "center",
		fontSize : 12,
		backgroundColor : "",
		lineColor : "#000"//条形码颜色
	};
	JsBarcode(barcode, content, options);//原生
}