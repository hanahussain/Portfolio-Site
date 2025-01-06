const githubUsername = "hanahussain";
const projectContainer = document.getElementById("project-container");
const videoFolderPath = "assets/videos/";
const backToTopButton = document.getElementById("back-to-top");

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

    function displayProjects(repos) {
        repos.forEach(repo => {
          const projectLink = document.createElement("a");
          projectLink.href = repo.html_url;
          projectLink.target = "_blank";
          projectLink.classList.add("project-link");
      
          const project = document.createElement("div");
          project.classList.add("project");
      
          // Check if a video file exists for the project
          const videoFile = `${videoFolderPath}${repo.name}.mp4`;
      
          // Create project HTML structure
          project.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || "No description provided"}</p>
            ${checkVideoFile(videoFile) ? 
              `<video controls class="project-video">
                <source src="${videoFile}" type="video/mp4">
                Your browser does not support the video tag.
              </video>` 
              : "<p>No video demo available</p>"}
          `;
      
          // Add play/pause toggle and prevent navigation
          const videoElement = project.querySelector("video");
          if (videoElement) {
            videoElement.addEventListener("click", (event) => {
              event.preventDefault(); // Prevent navigation
              event.stopPropagation(); // Stop event from bubbling up
              if (videoElement.paused) {
                videoElement.play();
              } else {
                videoElement.pause();
              }
            });
          }
      
          projectLink.appendChild(project); // Wrap the project card with the link
          projectContainer.appendChild(projectLink);
        });
      }
      
  
  // Function to check if a video file exists (returns true or false)
  function checkVideoFile(videoFilePath) {
    const http = new XMLHttpRequest();
    http.open('HEAD', videoFilePath, false); // Synchronous request to check file
    http.send();
    return http.status === 200;
  }

  const text = ["a Software Developer.", "a Creative Thinker.", "an Innovator."];
  let index = 0;
  
  function flashText() {
    const animatedText = document.querySelector(".animated-text");
    
    // Update the text content
    animatedText.textContent = text[index];
    animatedText.style.opacity = "1"; // Make text visible
    
    // Hide text after 2 seconds
    setTimeout(() => {
      animatedText.style.opacity = "0";
    }, 2000);
  
    // Move to the next index, cycling back to 0
    index = (index + 1) % text.length;
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    flashText(); // Start immediately
    setInterval(flashText, 3000); // Run every 4.5 seconds (2s visible + 1s pause)
  });

  document.querySelector('.arrow-down').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
  });  
  
  document.getElementById("toggle-mode").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
  });

  // Send contact form message to personal email
  document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission
  
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
  
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    if (!name || !message) {
      alert("Please fill out all fields.");
      return;
    }
  
    // Construct the mailto link
    const mailtoLink = `mailto:hussain_hana@yahoo.com?subject=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(email)}`;
  
    // Open the mailto link
    window.location.href = mailtoLink;
  });
  
  // Function to validate email format
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
 

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


  
// Fetch and display repositories when the page loads
fetchGitHubRepos();
