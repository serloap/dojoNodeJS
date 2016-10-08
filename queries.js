var promise=require('bluebird');
var options={
	promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString='postgres://swnpdbxo:wNssotwxjm723-lXOvnltnEv4b0ol2ue@elmer-01.db.elephantsql.com:5432/swnpdbxo';
var db = pgp(connectionString);

function getAllRestaurants(req, res, next){
	db.any('select *from restaurant')
	.then(function(data){
		res.status(200)
		.json({
			status: 'Successful',
			data: data,
			message: 'Got all restaurants'
		});

	})
	.catch(function(err){
		return next(err);
	});

};

function getRestaurantByName(req, res, next){
	//nombre del restaurante
	var name = req.params.name;//ubicacion del paratmetro
	db.one('select * from restaurant where name = $1', name)
	.then(function(data){
	res.status(200)
	.json({
		status: 'Successful',
		data: data,
		message: 'Got a restaurant by its name'
	});
	})
	.catch(function(err){
		return next(err);
		});

};

function createRestaurant(req, res, next){
	
	db.any('insert into restaurant(name,city,address,phone)' + ' values($1,$2,$3,$4)',
		[req.body.name, req.body.city, req.body.address, parseInt(req.body.phone)])
	.then(function(data){
	res.status(200)
	.json({
		status: 'Successful',
		data: data,
		message: 'Restaurant inserted'
	});
	})
	.catch(function(err){
		return next(err);
		});

};

function removeRestaurant(req, res, next){

	var restaurantId = parseInt(req.params.id);
	db.result('delete  from restaurant where id = $1', restaurantId)
	.then(function(){
	res.status(200)
	.json({
		status: 'Successful',
		data: data,
		message: 'Restaurant removed'
	});
	})
	.catch(function(err){
		return next(err);
		});

};

function updateRestaurant(req, res, next){
	db.none('update resaturant set name=$1, city=$2, address=$3,phone=$4 where id=$5'),
	[req.body.name, req.body.city, req.body.address, parseInt(req.params.id)]
	.then(function(){
	res.status(200)
	.json({
		status: 'Successful',
		message: 'Restaurant updated'
	});
	})
	.catch(function(err){
		return next(err);
		});

};

module.exports = {
	getAllRestaurants : getAllRestaurants,
	getRestaurantByName : getRestaurantByName,
	createRestaurant : createRestaurant,
	removeRestaurant : removeRestaurant,
	updateRestaurant : updateRestaurant
}