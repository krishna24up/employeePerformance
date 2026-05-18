const asyncHandler = require('express-async-handler');
const Employee = require('../models/Employee');

const addEmployee = asyncHandler(async (req, res) => {
  const { name, email, department, skills, performanceScore, experience } = req.body;
  if (!name || !email || !department || performanceScore === undefined || experience === undefined) {
    res.status(400);
    throw new Error('All employee fields are required');
  }

  const existing = await Employee.findOne({ email });
  if (existing) {
    res.status(400);
    throw new Error('Employee with this email already exists');
  }

  const employee = await Employee.create({
    name,
    email,
    department,
    skills: Array.isArray(skills) ? skills : skills?.split(',').map((skill) => skill.trim()) || [],
    performanceScore,
    experience,
    createdBy: req.user._id,
  });

  res.status(201).json(employee);
});

const getEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find({ createdBy: req.user._id }).sort({ performanceScore: -1 });
  res.json(employees);
});

const searchEmployees = asyncHandler(async (req, res) => {
  const { department, name } = req.query;
  const filter = { createdBy: req.user._id };
  if (department) filter.department = department;
  if (name) filter.name = { $regex: name, $options: 'i' };
  const employees = await Employee.find(filter).sort({ performanceScore: -1 });
  res.json(employees);
});

const updateEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const employee = await Employee.findOne({ _id: id, createdBy: req.user._id });
  if (!employee) {
    res.status(404);
    throw new Error('Employee not found');
  }

  const { name, email, department, skills, performanceScore, experience } = req.body;
  employee.name = name ?? employee.name;
  employee.email = email ?? employee.email;
  employee.department = department ?? employee.department;
  employee.skills = skills ?? employee.skills;
  employee.performanceScore = performanceScore ?? employee.performanceScore;
  employee.experience = experience ?? employee.experience;

  const updated = await employee.save();
  res.json(updated);
});

const deleteEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const employee = await Employee.findOne({ _id: id, createdBy: req.user._id });
  if (!employee) {
    res.status(404);
    throw new Error('Employee not found');
  }
  await employee.remove();
  res.json({ message: 'Employee deleted successfully' });
});

module.exports = { addEmployee, getEmployees, searchEmployees, updateEmployee, deleteEmployee };
