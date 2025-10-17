// JavaScript for GitHub user creation date fetcher

document.getElementById('github-user-r8s2').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  // Hide previous results/errors
  document.getElementById('result').classList.add('d-none');
  document.getElementById('error').classList.add('d-none');
  
  const username = document.getElementById('username').value.trim();
  if (!username) return;
  
  try {
    // Get token from URL parameters if present
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    // Build API URL
    const apiUrl = `https://api.github.com/users/${encodeURIComponent(username)}`;
    
    // Configure fetch options
    const options = {};
    if (token) {
      options.headers = {
        'Authorization': `token ${token}`
      };
    }
    
    // Fetch user data
    const response = await fetch(apiUrl, options);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('User not found');
      } else if (response.status === 403) {
        throw new Error('Rate limit exceeded. Try again later or provide a token.');
      } else {
        throw new Error(`API error: ${response.status}`);
      }
    }
    
    const userData = await response.json();
    
    // Parse and format the creation date
    const createdAt = new Date(userData.created_at);
    const formattedDate = createdAt.toISOString().split('T')[0]; // YYYY-MM-DD
    
    // Display result
    document.getElementById('github-created-at').textContent = formattedDate;
    document.getElementById('result').classList.remove('d-none');
  } catch (error) {
    // Display error
    document.getElementById('error-message').textContent = error.message;
    document.getElementById('error').classList.remove('d-none');
  }
});