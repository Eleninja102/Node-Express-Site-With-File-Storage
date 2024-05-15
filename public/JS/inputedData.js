
export function fetchMostRecentData() {
	const input = ""
	try {
		const input = document.getElementById('searchfood').value
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
	})
}

function showError(err) {
	console.error(err);
	alert("Something went wrong");
}
