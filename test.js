fetch('http://127.0.0.1:8000/api/posts/399/comments', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json', // Optional: for API responses
    'Authorization': 'Bearer 88|oFnFsr2JTsKlf4F8FTmIObZxOyZL7yBv4UJSwNKO4f2eefa4' // Optional: if using auth
  },
  body: JSON.stringify({
    comment: "" // 👈 You can change this to "something" or leave it empty
  })
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch(error => {
  console.error('Error:', error);
});