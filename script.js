const githubUsername = "hanahussain";
const projectContainer = document.getElementById("project-container");
const videoFolderPath = "assets/videos/";

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

// Display repositories with linked videos
function displayProjects(repos) {
    repos.forEach(repo => {
      const project = document.createElement("div");
      project.classList.add("project");
  
      // Check if a video file exists for the project
      const videoFile = `${videoFolderPath}${repo.name}.mp4`;
  
      // Create project HTML structure
      project.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description provided"}</p>
        ${checkVideoFile(videoFile) ? 
          `<video controls>
            <source src="${videoFile}" type="video/mp4">
            Your browser does not support the video tag.
          </video>` 
          : "<p>No video demo available</p>"}
        <a href="${repo.html_url}" target="_blank">View on GitHub</a>
      `;
  
      projectContainer.appendChild(project);
    });
  }
  
  // Function to check if a video file exists (returns true or false)
  function checkVideoFile(videoFilePath) {
    const http = new XMLHttpRequest();
    http.open('HEAD', videoFilePath, false); // Synchronous request to check file
    http.send();
    return http.status === 200;
  }

// Fetch and display repositories when the page loads
fetchGitHubRepos();
