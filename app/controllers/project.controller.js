const ProjectService = require("../services/project.service");
const { logger } = require("../../server");

// Create a new project
exports.create = async (req, res) => {
  const projectData = req.body;

  try {
    const project = await ProjectService.createProject(projectData);
    logger.info(`New project created: ${project.id}`);
    res.status(201).json(project);
  } catch (error) {
    logger.error(`Error creating project: ${error.message}`);
    res.status(400).json({ message: "Invalid data" });
  }
};

// Retrieve all projects
exports.findAll = async (req, res) => {
  try {
    const projects = await ProjectService.getAllProjects();
    res.json(projects);
  } catch (error) {
    logger.error(`Error retrieving projects: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Retrieve a single project by ID
exports.findOne = async (req, res) => {
  const projectId = req.params.id;

  try {
    const project = await ProjectService.getProjectById(projectId);

    if (!project) {
      res.status(404).json({ message: "Project not found." });
    } else {
      res.json(project);
    }
  } catch (error) {
    logger.error(`Error retrieving project: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a project by ID
exports.update = async (req, res) => {
  const projectId = req.params.id;
  const projectData = req.body;

  try {
    const updatedProject = await ProjectService.updateProject(projectId, projectData);

    if (!updatedProject) {
      res.status(404).json({ message: "Project not found." });
    } else {
      res.json(updatedProject);
      logger.info(`Project updated: ${projectId}`);
    }
  } catch (error) {
    logger.error(`Error updating project: ${error.message}`);
    res.status(400).json({ message: "Invalid data" });
  }
};

// Delete a project by ID
exports.delete = async (req, res) => {
  const projectId = req.params.id;

  try {
    const result = await ProjectService.deleteProject(projectId);

    if (result) {
      res.json({ message: "Project was successfully deleted." });
      logger.info(`Project deleted: ${projectId}`);
    } else {
      res.status(404).json({ message: "Project not found." });
    }
  } catch (error) {
    logger.error(`Error deleting project: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
