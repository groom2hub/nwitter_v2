import fetch from "node-fetch";

const response = await fetch("http://localhost:8000/usertbl");
let res = await response.json();
console.log(res);


// const id = "1"
// const passwd = "1"

// const response = await fetch(`http://localhost:8000/login/${id}/${passwd}`);
// let res = await response.json();
// console.log(res);