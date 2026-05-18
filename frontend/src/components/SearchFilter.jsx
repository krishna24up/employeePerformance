import { useState } from 'react';

export default function SearchFilter({ onSearch }) {
  const [department, setDepartment] = useState('');
  const [name, setName] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ department: department.trim(), name: name.trim() });
  };

  return (
    <section className="card small-card">
      <h3>Search & Filter</h3>
      <form onSubmit={handleSearch} className="grid-grid">
        <div>
          <label>Department</label>
          <input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Development" />
        </div>
        <div>
          <label>Employee Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Aman" />
        </div>
        <button type="submit">Search</button>
      </form>
    </section>
  );
}
