import fetch from 'node-fetch';


fetch('http://localhost:4000/graphql?query={customers{id,name}}')
  .then((res) => {
  return res.json();
}).then((body) => {
  console.log(JSON.stringify(body));
});
