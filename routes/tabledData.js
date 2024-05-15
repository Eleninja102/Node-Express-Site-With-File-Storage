const express = require("express");
const fs = require("node:fs");

const router = express.Router();

const app = express();

fs.watch("favoriteFoodData.txt", (eventType, filename) => { 
	console.log("\nThe file", filename, "was modified!"); 
	console.log("The type of change was:", eventType); 
	const tableData = fs.readFileSync("favoriteFoodData.txt", (err)=>{if(err){console.log(err)}})
	console.log(tableData)
}); 


router.get("/", (req, res) => {
	let tableData;
	try {
		tableData = JSON.parse(fs.readFileSync("favoriteFoodData.txt", (err) => printError(err)))
	} catch (error) {
		tableData = []
	}
	const searchFood = req.query.searchfood

	if(!searchFood){
		fileSender(tableData,res)	
		return
	}

	let requestItems = []
	let searchFoodReg = new RegExp(`${searchFood}`, "i")
	tableData.forEach(element => {
		if(searchFoodReg.test(element.favoriteFood)){
			requestItems.push(element)
		}
	});

	fileSender(requestItems, res)
	
});

function fileSender(data, res){
	console.log(data)
	container= ""
	data.forEach((element, i) => {
		container += `
		<tr>
			<th scope="row">${i}</th>
			<td>${element.firstName}</td>
			<td>${element.lastName}</td>
			<td>${element.favoriteFood}</td>
		  </tr>`
	});

	res.send(`<!doctype html>
	<html lang="en">
	  <head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
	</head>
	<body>
		<div class="container-sm py-5">			
			<table class="table" id="list">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">First Name</th>
						<th scope="col">Last Name</th>
						<th scope="col">Favorite Food</th>
					</tr>
				</thead>
				<tbody class="table-group-divider">
					${container}
				</tbody>
			</table>
		</div>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
	</body></html>`)
}


module.exports = router;

function printError(err){
	console.log(err)
}