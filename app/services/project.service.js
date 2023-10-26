const db = require("../models");
const Project = db.Project;
const ProjectRepository = require("../repositories/project.repository");

// Create a new project
exports.createProject = async (projectData) => {
  console.log(projectData)
  return ProjectRepository.createProject(projectData);
};

// Retrieve all projects
exports.getAllProjects = async () => {
  return ProjectRepository.getAllProjects();
};

// Retrieve a single project by ID
exports.getProjectById = async (projectId) => {
  return ProjectRepository.getProjectById(projectId);
};

// Update a project by ID
exports.updateProject = async (projectId, projectData) => {
  return ProjectRepository.updateProject(projectId, projectData);
};

// Delete a project by ID
exports.deleteProject = async (projectId) => {
  return ProjectRepository.deleteProject(projectId);
};
