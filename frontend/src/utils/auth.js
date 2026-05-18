export const saveToken = (user) => {
  localStorage.setItem('employee_perf_token', user.token);
  localStorage.setItem('employee_perf_name', user.name);
};

export const getToken = () => {
  const token = localStorage.getItem('employee_perf_token');
  const name = localStorage.getItem('employee_perf_name');
  return token ? { token, name } : null;
};

export const removeToken = () => {
  localStorage.removeItem('employee_perf_token');
  localStorage.removeItem('employee_perf_name');
};
