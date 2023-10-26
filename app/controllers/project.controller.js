const ProjectService = require("../services/project.service");

// Create a new project
exports.create = async (req, res) => {
  const projectData = req.body;

  try {
    const project = await ProjectService.createProject(projectData);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
  }
};

// Retrieve all projects
exports.findAll = async (req, res) => {
  const projects = await ProjectService.getAllProjects();
  res.json(projects);
};

// Retrieve a single project by ID
exports.findOne = async (req, res) => {
  const projectId = req.params.id;
  const project = await ProjectService.getProjectById(projectId);

  if (!project) {
    res.status(404).json({ message: "Project not found." });
  } else {
    res.json(project);
  }
};

// Update a project by ID
exports.update = async (req, res) => {
  const projectId = req.params.id;
  const projectData = req.body;

  const updatedProject = await ProjectService.updateProject(projectId, projectData);

  if (!updatedProject) {
    res.status(404).json({ message: "Project not found." });
  } else {
    res.json(updatedProject);
  }
};

// Delete a project by ID
exports.delete = async (req, res) => {
  const projectId = req.params.id;

  const result = await ProjectService.deleteProject(projectId);

  if (result) {
    res.json({ message: "Project was successfully deleted." });
  } else {
    res.status(404).json({ message: "Project not found." });
  }
};
