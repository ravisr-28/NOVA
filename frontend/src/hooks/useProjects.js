import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/projects');
      setProjects(res.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const createProject = async (data) => {
    const res = await api.post('/projects', data);
    setProjects((prev) => [res.data.data, ...prev]);
    return res.data.data;
  };

  const updateProject = async (id, data) => {
    const res = await api.put(`/projects/${id}`, data);
    setProjects((prev) =>
      prev.map((p) => (p._id === id ? { ...p, ...res.data.data } : p))
    );
    return res.data.data;
  };

  const deleteProject = async (id) => {
    await api.delete(`/projects/${id}`);
    setProjects((prev) => prev.filter((p) => p._id !== id));
  };

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  };
};

export default useProjects;
