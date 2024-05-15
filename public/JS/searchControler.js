

export function fetchMostRecentData() {
	let input = ""
	//console.log(document.getElementById('searchfood').value)
	try {
		input = document.getElementById('searchfood').value
		console.log(input)
	} catch (error) {
		
	}
	console.log("Hello")
	fetch(`/data?searchfood=${input}`)
	  .then(response => response.json())
	  .then(data => updateView(data))
	  .catch(err => showError(err));
  }
  
  function updateView(data) {
	
	let container = document.querySelector('tbody');
	console.log(data)
	container.innerHTML = ""
	data.forEach((element, i) => {
		container.innerHTML += `
		<tr>
			<th scope="row">${i}</th>
			<td>${element.firstName}</td>
			<td>${element.lastName}</td>
			<td>${element.favoriteFood}</td>
	  	</tr>`
	});
  }
  
  function showError(err) {
	console.error(err);
	alert("Something went wrong");
  }

  //window.fetchMostRecentData = fetchMostRecentData
  //window.onload = fetchMostRecentData
  // call fetchMostRecentData once every 10s
  //setInterval(fetchMostRecentData, 10000);

//
/*
function fetchMostRecentData() {
	console.log("test")
	fetch("/data")
	  .then(response => console.log(response))
	//  .then(data => updateView(data))
	  .catch(err => showError(err));
  }

function updateView(data) {
	console.log(data)
	/*
let container = document.querySelector('tbody');
console.log(data)
container.innerHTML = ""
data.forEach(element => {
	container.innerHTML += `
	<tr>
		<td>${element.firstName}</td>
		<td>${element.lastName}</td>
		<td>${element.favoriteFood}</td>
	</tr>`
});
}

function showError(err) {
	console.error(err);
	alert("Something went wrong");
  }
document.getElementById('searchForm').onsubmit = fetchMostRecentData

*/