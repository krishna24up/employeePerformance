import { useState } from 'react';

export default function EmployeeListPage({ employees, onDelete }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <section className="card">
      <h3>Employee List</h3>
      {employees.length === 0 ? (
        <p>No employees yet. Add one to view analytics.</p>
      ) : (
        <div className="table">
          <div className="table-header">
            <span>Name</span>
            <span>Department</span>
            <span>Score</span>
            <span>Experience</span>
            <span>Actions</span>
          </div>
          {employees.map((emp) => (
            <div key={emp._id} className="table-row">
              <span>{emp.name}</span>
              <span>{emp.department}</span>
              <span>{emp.performanceScore}</span>
              <span>{emp.experience}</span>
              <span>
                <button className="button small" onClick={() => setExpanded(expanded === emp._id ? null : emp._id)}>
                  {expanded === emp._id ? 'Hide' : 'Details'}
                </button>
                <button className="button small secondary" onClick={() => onDelete(emp._id)}>
                  Delete
                </button>
              </span>
              {expanded === emp._id && (
                <div className="details">
                  <p><strong>Email:</strong> {emp.email}</p>
                  <p><strong>Skills:</strong> {emp.skills.join(', ') || 'None'}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
