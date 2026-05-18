import { useState } from 'react';

export default function EmployeeRegistrationForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    department: '',
    skills: '',
    performanceScore: 0,
    experience: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      skills: form.skills.split(',').map((skill) => skill.trim()).filter(Boolean),
      performanceScore: Number(form.performanceScore),
      experience: Number(form.experience),
    });
    setForm({ name: '', email: '', department: '', skills: '', performanceScore: 0, experience: 0 });
  };

  return (
    <section className="card">
      <h3>Employee Registration</h3>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} required />
        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
        <label>Department</label>
        <input name="department" value={form.department} onChange={handleChange} required />
        <label>Skills (comma separated)</label>
        <input name="skills" value={form.skills} onChange={handleChange} />
        <label>Performance Score</label>
        <input type="number" name="performanceScore" value={form.performanceScore} onChange={handleChange} min="0" max="100" required />
        <label>Years of Experience</label>
        <input type="number" name="experience" value={form.experience} onChange={handleChange} min="0" required />
        <button type="submit">Add Employee</button>
      </form>
    </section>
  );
}
