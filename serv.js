var exp=require("express");
var app=exp();

function checkout(req,resp) {
	resp.status(200);
	resp.json({status:"Received the cart"});
	console.log("==== Shopping Basket ======");
	console.log(req.query);
	console.log("===========================\n");
}

app.get("/checkout",checkout);
app.use("/libraries",exp.static(__dirname+"/bower_components"));
app.use(exp.static(__dirname+"/public"));
var port=parseInt(process.argv[2]) || parseInt(process.env.SERV_PORT) || 3000
app.listen(port,()=>console.log("Ready on port "+port))
