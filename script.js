const form = document.getElementById("projectForm");
const projectList = document.getElementById("projectList");

let projects = JSON.parse(localStorage.getItem("projects")) || [];

const placeholderImages = [
  "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80"
];

function saveProjects() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function showProjects() {
  projectList.innerHTML = "";

  projects.forEach(function(project, index) {
    const card = document.createElement("div");
    card.className = "project-card";

    const middle = (projects.length - 1) / 2;
    const offset = index - middle;

    card.style.transform = `translateX(${offset * 135}px) rotate(${offset * 8}deg)`;
    card.style.zIndex = index + 1;

    card.innerHTML = `
      <img src="${project.image}" alt="Project image">
      <h3>${project.title}</h3>
      <div class="line"></div>
      <p>${project.description}</p>
      <button class="delete-btn" onclick="deleteProject(${index})">Delete</button>
    `;

    projectList.appendChild(card);
  });
}

function deleteProject(index) {
  projects.splice(index, 1);
  saveProjects();
  showProjects();
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const title = document.getElementById("projectTitle").value;
  const description = document.getElementById("projectDescription").value;
  const imageFile = document.getElementById("projectImage").files[0];

  if (imageFile) {
    const reader = new FileReader();

    reader.onload = function() {
      addProject(title, description, reader.result);
    };

    reader.readAsDataURL(imageFile);
  } else {
    const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
    addProject(title, description, randomImage);
  }
});

function addProject(title, description, image) {
  const newProject = {
    title: title,
    description: description,
    image: image
  };

  projects.push(newProject);
  saveProjects();

  form.reset();
  showProjects();
}

showProjects();