import fetch from 'node-fetch';


fetch('http://localhost:4500/helloworld').then((res) => {
  return res.text();
}).then((body) => {
  console.log(body);
});
