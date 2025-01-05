// Replace 'yourusername' with your GitHub username
const githubUsername = "hanahussain";
const projectContainer = document.getElementById("project-container");

// Fetch repositories using GitHub's API
async function fetchGitHubRepos() {
  try {
    const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
    if (!response.ok) {
      throw new Error("Failed to fetch GitHub repositories");
    }
    const repos = await response.json();

    // Filter and display repositories
    const filteredRepos = repos.filter(repo => !repo.fork); // Exclude forked repos
    displayProjects(filteredRepos);
  } catch (error) {
    console.error("Error fetching repositories:", error);
    projectContainer.innerHTML = `<p>Unable to load projects. Please try again later.</p>`;
  }
}

// Display repositories dynamically
function displayProjects(repos) {
  repos.forEach(repo => {
    const project = document.createElement("div");
    project.classList.add("project");

    // Create project HTML structure
    project.innerHTML = `
      <h3>${repo.name}</h3>
      <p>${repo.description || "No description provided"}</p>
      <p><strong>Language:</strong> ${repo.language || "Not specified"}</p>
      <a href="${repo.html_url}" target="_blank">View on GitHub</a>
    `;

    projectContainer.appendChild(project);
  });
}

// Fetch and display repositories when the page loads
fetchGitHubRepos();
