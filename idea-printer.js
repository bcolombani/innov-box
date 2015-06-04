var printer = require('printer') ;
var fs = require('fs') ;

var ZebraIdeaPrinter = function(cupsName, template) {
  this.cupsName = cupsName ;
  this.template = template ;
}

ZebraIdeaPrinter.prototype = {
  print : function(idea) {
    var printerName = this.cupsName ;
    fs.readFile(this.template, function read(err, data) {
      if (!err) {
        printer.printDirect({
          data:new Buffer(data).toString().replace(/\{\{idea\}\}/, idea),
          printer:printerName,
          type: "RAW",
          success:function(){
            console.log("printed new idea : "+ idea);
          }, 
          error:function(err){console.log(err);}
        });
      }
    }) ;
  }
}

exports.create = function(type, cupsName, template) {
  if(type === "Zebra") {
    return new ZebraIdeaPrinter(cupsName, template) ;
  }
  throw "Unknown / unsupported printer type" ;
}