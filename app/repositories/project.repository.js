const db = require("../models");
const Project = db.Project;

//Create new project
exports.createProject = async (projectData) => {
  return Project.create(projectData);
};

// Retrieve all projects
exports.getAllProjects = async () => {
  return Project.findAll();
};

// Retrieve a single project by ID
exports.getProjectById = async (projectId) => {
  return Project.findByPk(projectId);
};

// Update a project by ID
exports.updateProject = async (projectId, projectData) => {
  const project = await Project.findByPk(projectId);

  if (!project) {
    return null; // Handle the case where the project is not found
  }

  return project.save();
};

// Delete a project by ID
exports.deleteProject = async (projectId) => {
  const project = await Project.findByPk(projectId);

  if (!project) {
    return false; // Handle the case where the project is not found
  }

  return project.destroy();
};
