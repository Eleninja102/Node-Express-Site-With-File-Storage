const express = require("express");
const fs = require("node:fs");

const router = express.Router();

const app = express();
/*
fs.watch("favoriteFoodData.txt", (eventType, filename) => { 
	console.log("\nThe file", filename, "was modified!"); 
	console.log("The type of change was:", eventType); 
	const tableData = fs.readFileSync("favoriteFoodData.txt", (err)=>{if(err){console.log(err)}})
	console.log(tableData)
}); */

router.get("/", (req, res) => {
const tableData = fs.readFileSync("favoriteFoodData.txt", (err)=>{if(err){console.log(err)}})
	res.setHeader("Content-Type", "text/html");

	res.write("hello")
	res.end()

	/*
res.send(
    `<!doctype html>
	<html lang="en">
	  <head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		
	</head>
	<body>
		<table class="table">
			<thead>
				<tr>
				<th scope="col">First Name</th>
				<th scope="col">Last Name</th>
				<th scope="col">Favorite Food</th>
				</tr>
			</thead>
			<tbody>
				${tableData}
			</tbody>
	  	</table>
		<script>

		</script>
	</body></html>`
  );
*/
});

module.exports = router;


// server side (if you use express)

app.get("/data", (req, res) => {
	const tableData = fs.readFileSync("favoriteFoodData.txt", (err)=>{if(err){console.log(err)}})
	res.json(tableData.toJSON)
  });
  
  
  // client side
  
 