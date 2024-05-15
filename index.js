const express = require("express")
const myCustomRoutes = require("./routes/user")
const dataTable = require("./routes/tabledData")

const fs = require('node:fs')

//Load express
const app = express();
const port = 3000

//Use routes in ./routes/user
app.use("/user_routes", myCustomRoutes)
app.use("/data_table", dataTable)

app.get("/", (req,res) => {
	res.send("Hello, World!")
});

app.get("/data", (req, res) => {
	
	let tableData;
	try {
		tableData = JSON.parse(fs.readFileSync("favoriteFoodData.txt", (err) => printError(err)))

	} catch (error) {
		tableData = []
	}
	const searchFood = req.query.searchfood
	
	//console.log(searchFood)
	if(!searchFood){
		res.json(tableData)	
		return
	}

	let requestItems = []
	let searchFoodReg = new RegExp(`${searchFood}`, "i")
	tableData.forEach(element => {
		if(searchFoodReg.test(element.favoriteFood)){
			requestItems.push(element)
		}
	});

	res.json(requestItems)
	
  });



//Normally wouldn't do this, normally use a front end project hosts html pages
app.use(express.static("public"))

//Run the server
app.listen(port, () =>
{
	console.log("Server started on port: " + port)
})


function printError(err){
	console.log(err)
}
