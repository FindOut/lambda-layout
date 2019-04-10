export default function lambdaLayout(graph) {
  // send REST request to lambda and return promise with layouted graph
  return fetch('layoutedGraphExample.json')
    .then(function(response) {
      console.log('from server: ', response);
      return response.json();
    });
}
