import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const useTasks = (projectId) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    if (!projectId) return;
    try {
      setLoading(true);
      const res = await api.get(`/projects/${projectId}/tasks`);
      setTasks(res.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (data) => {
    const res = await api.post(`/projects/${projectId}/tasks`, data);
    setTasks((prev) => [res.data.data, ...prev]);
    return res.data.data;
  };

  const updateTask = async (taskId, data) => {
    const res = await api.put(`/tasks/${taskId}`, data);
    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? res.data.data : t))
    );
    return res.data.data;
  };

  const deleteTask = async (taskId) => {
    await api.delete(`/tasks/${taskId}`);
    setTasks((prev) => prev.filter((t) => t._id !== taskId));
  };

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
};

export default useTasks;
