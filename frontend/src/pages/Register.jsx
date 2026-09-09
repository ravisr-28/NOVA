import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserPlus, FolderKanban, Users, BarChart3, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { registerSchema } from '../utils/validationSchemas';
import '../styles/auth.css';

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (data) => {
    setServerError('');
    setIsSubmitting(true);
    try {
      await registerUser(data.name, data.email, data.password);
      navigate('/', { replace: true });
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed. Please try again.';
      setServerError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Left Branding Panel */}
      <div className="auth-brand">
        <div className="auth-brand-content">
          <div className="auth-brand-logo">
            N<span>O</span>VA
          </div>
          <p className="auth-brand-tagline">
            A project management platform for teams to manage projects, tasks, members and productivity from a single application.
          </p>
          <div className="auth-brand-features">
            <div className="auth-brand-feature">
              <div className="auth-brand-feature-icon">
                <FolderKanban size={18} />
              </div>
              Manage projects with Kanban boards
            </div>
            <div className="auth-brand-feature">
              <div className="auth-brand-feature-icon">
                <Users size={18} />
              </div>
              Collaborate with your team
            </div>
            <div className="auth-brand-feature">
              <div className="auth-brand-feature-icon">
                <BarChart3 size={18} />
              </div>
              Track progress in real-time
            </div>
            <div className="auth-brand-feature">
              <div className="auth-brand-feature-icon">
                <CheckCircle size={18} />
              </div>
              Stay on top of deadlines
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="auth-form-panel">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <h1>Create account</h1>
            <p>Get started with NOVA today</p>
          </div>

          {serverError && (
            <div className="auth-alert error">
              {serverError}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="register-name">Full Name</label>
              <input
                id="register-name"
                type="text"
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="Ravi Shankar"
                autoComplete="name"
                {...register('name')}
              />
              {errors.name && <span className="form-error">{errors.name.message}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="register-email">Email</label>
              <input
                id="register-email"
                type="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="you@example.com"
                autoComplete="email"
                {...register('email')}
              />
              {errors.email && <span className="form-error">{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="register-password">Password</label>
              <input
                id="register-password"
                type="password"
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="At least 6 characters"
                autoComplete="new-password"
                {...register('password')}
              />
              {errors.password && <span className="form-error">{errors.password.message}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="register-confirm">Confirm Password</label>
              <input
                id="register-confirm"
                type="password"
                className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && <span className="form-error">{errors.confirmPassword.message}</span>}
            </div>

            <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="btn-spinner" />
              ) : (
                <>
                  <UserPlus size={18} />
                  Create Account
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            Already have an account?{' '}
            <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
