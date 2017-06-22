(function() {

var inventory = [
	[ "acorn_squash.png", "Acorn Squash", 1 ], [ "apple.png", "Apple", .5 ], 
	[ "bell_pepper.png", "Bell Pepper", .3 ], [ "blueberries.png", "Blueberries", .2 ], 
	[ "broccoli.png", "Broccoli", 2 ], [ "carrot.png", "Carrot", 1 ], 
	[ "celery.png", "Celery", 1 ], [ "chili_pepper.png", "Chili Pepper", .5 ], 
	[ "corn.png", "Corn", 1 ], [ "eggplant.png", "Eggplant", .75 ], 
	[ "lettuce.png", "Lettuce", 1 ], [ "mushroom.png", "Mushroom", 2 ], 
	[ "onion.png", "Onion", 2], [ "potato.png", "Potato", 1 ], 
	[ "pumpkin.png", "Pumpkin", 1 ], [ "radish.png", "Radish", .5 ], 
	[ "squash.png", "Squash", 2 ], [ "strawberry.png", "Strawberry", 1.5 ], 
	[ "sugar_snap.png", "Sugar Snap", 1 ], [ "tomato.png", "Tomato", 1 ], 
	[ "zucchini.png", "Zucchini", 1 ] 
];

var CartApp=angular.module("CartApp",[]);

var CartCtl=function ($http) {
	var cartCtl=this;
	cartCtl.cart=[];
	cartCtl.chosen_index=-1;
	cartCtl.chosen_name="";
	cartCtl.chosen_qty=1;
	cartCtl.chosen_price=0;
	cartCtl.filterText="";
	cartCtl.message="";
	cartCtl.inventory=[];
	cartCtl.clear=function() {
		cartCtl.cart=[];
		cartCtl.chosen_index=-1;
		cartCtl.chosen_name="";
		cartCtl.chosen_qty=1;
		cartCtl.chosen_price=0;
		cartCtl.filterText="";
		cartCtl.message="";
	}
	cartCtl.choiceMade=function() {
		console.log(cartCtl.chosen_index);
 		cartCtl.chosen_pic=inventory[cartCtl.chosen_index][0];
 		cartCtl.chosen_name=inventory[cartCtl.chosen_index][1];
 		cartCtl.chosen_price=inventory[cartCtl.chosen_index][2];
	}
	cartCtl.addItem=function() {
		var x={name:cartCtl.chosen_name,qty:cartCtl.chosen_qty,price:cartCtl.chosen_price}
		var found=false;
		for (i in cartCtl.cart) {
			if (cartCtl.cart[i].name==x.name) {
				found=true;
				x.qty+=cartCtl.cart[i].qty;
				cartCtl.cart[i]=x;
				break;
			}
		}
		if (!found) {
			cartCtl.cart.push(x);
		}
	}
	cartCtl.submit=function() {
		var p=$http.get("/checkout",{params:{itemlist:cartCtl.cart}});
		p.then(function(success){
				cartCtl.message="Message from server: "+success.data.status;
			},
			function(fail){
				cartCtl.message="ERROR submitting your cart";
			});
	}
   for (i in inventory) {
		cartCtl.inventory.push(inventory[i][1]);
	}
}
CartCtl.$inject=["$http"];
CartApp.controller("CartCtl",CartCtl);

})();
