import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const AuthPage = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGitHubLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'github' });
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        await supabase.auth.signUp({ email, password });
      } else {
        await supabase.auth.signInWithPassword({ email, password });
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#0f0f0f',
      fontFamily: 'Inter, -apple-system, sans-serif',
      overflowY: 'auto',
      scrollBehavior: 'smooth',
      WebkitOverflowScrolling: 'touch'
    },
    leftSection: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 2rem'
    },
    formContainer: {
      width: '100%',
      maxWidth: '28rem'
    },
    header: {
      marginBottom: '2rem'
    },
    title: {
      fontSize: '1.875rem',
      fontWeight: 600,
      color: '#fff',
      marginBottom: '0.5rem'
    },
    subtitle: {
      color: '#9ca3af'
    },
    buttonGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      marginBottom: '1.5rem'
    },
    githubButton: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      padding: '0.75rem 1rem',
      backgroundColor: '#1a1a1a',
      color: '#fff',
      border: '1px solid #2a2a2a',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      fontSize: '0.95rem'
    },
    ssoButton: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      padding: '0.75rem 1rem',
      backgroundColor: 'transparent',
      color: '#fff',
      border: '1px solid #2a2a2a',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      fontSize: '0.95rem'
    },
    divider: {
      position: 'relative',
      margin: '1.5rem 0',
      textAlign: 'center'
    },
    dividerLine: {
      position: 'absolute',
      top: '50%',
      left: 0,
      right: 0,
      borderTop: '1px solid #2a2a2a'
    },
    dividerText: {
      position: 'relative',
      display: 'inline-block',
      padding: '0 0.5rem',
      backgroundColor: '#0f0f0f',
      color: '#6b7280',
      fontSize: '0.875rem'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      fontSize: '0.875rem',
      color: '#9ca3af',
      marginBottom: '0.5rem'
    },
    input: {
      width: '100%',
      padding: '0.75rem 1rem',
      backgroundColor: '#1a1a1a',
      border: '1px solid #2a2a2a',
      borderRadius: '0.5rem',
      color: '#fff',
      fontSize: '0.95rem',
      outline: 'none'
    },
    passwordContainer: {
      position: 'relative'
    },
    eyeButton: {
      position: 'absolute',
      right: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      color: '#9ca3af',
      cursor: 'pointer',
      padding: '0.25rem'
    },
    forgotPassword: {
      textAlign: 'right',
      fontSize: '0.875rem'
    },
    forgotLink: {
      color: '#9ca3af',
      textDecoration: 'none',
      transition: 'color 0.2s'
    },
    submitButton: {
      width: '100%',
      padding: '0.75rem 1rem',
      backgroundColor: '#16a34a',
      color: '#fff',
      border: 'none',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      fontWeight: 500,
      fontSize: '0.95rem',
      transition: 'background-color 0.2s'
    },
    footer: {
      marginTop: '1.5rem',
      textAlign: 'center',
      fontSize: '0.875rem',
      color: '#9ca3af'
    },
    footerLink: {
      color: '#fff',
      textDecoration: 'none',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      fontSize: '0.875rem'
    },
    verticalDivider: {
      width: '1px',
      backgroundColor: '#2a2a2a'
    },
    rightSection: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 2rem'
    },
    testimonialContainer: {
      maxWidth: '28rem'
    },
    quoteIcon: {
      width: '3rem',
      height: '3rem',
      color: '#4b5563',
      marginBottom: '1.5rem'
    },
    testimonialText: {
      fontSize: '1.25rem',
      color: '#d1d5db',
      lineHeight: 1.6,
      marginBottom: '2rem'
    },
    profile: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    avatar: {
      width: '2.5rem',
      height: '2.5rem',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #34d399 0%, #3b82f6 100%)'
    },
    username: {
      color: '#9ca3af'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftSection}>
        <div style={styles.formContainer}>
          <div style={styles.header}>
            <h1 style={styles.title}>Welcome back</h1>
            <p style={styles.subtitle}>Sign in to your account</p>
          </div>

          <div style={styles.buttonGroup}>
            <button
              onClick={handleGitHubLogin}
              style={styles.githubButton}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#252525'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#1a1a1a'}
            >
              <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Continue with GitHub
            </button>

            <button
              style={styles.ssoButton}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1a1a1a'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Continue with SSO
            </button>
          </div>

          <div style={styles.divider}>
            <div style={styles.dividerLine}></div>
            <span style={styles.dividerText}>or</span>
          </div>

          <form onSubmit={handleEmailAuth} style={styles.form}>
            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                placeholder="you@example.com"
                required
                onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <div style={styles.passwordContainer}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                  placeholder="••••••••"
                  required
                  onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                  onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                  onMouseEnter={(e) => e.target.style.color = '#d1d5db'}
                  onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
                >
                  {showPassword ? (
                    <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div style={styles.forgotPassword}>
              <a
                href="#"
                style={styles.forgotLink}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{...styles.submitButton, opacity: loading ? 0.5 : 1}}
              onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#15803d')}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#16a34a'}
            >
              {loading ? 'Loading...' : isSignUp ? 'Sign up' : 'Sign in'}
            </button>
          </form>

          <p style={styles.footer}>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              style={styles.footerLink}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>

          {!isSignUp && (
            <button
              onClick={() => setIsSignUp(true)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                backgroundColor: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '0.95rem',
                marginTop: '1rem',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              Sign up
            </button>
          )}
        </div>
      </div>

      <div style={styles.verticalDivider}></div>

      <div style={styles.rightSection}>
        <div style={styles.testimonialContainer}>
          <svg style={styles.quoteIcon} fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p style={styles.testimonialText}>
            I think you'll love it — Open-source, PostgreSQL-based & zero magic.
          </p>
          <div style={styles.profile}>
            <div style={styles.avatar}></div>
            <span style={styles.username}>@supabase_user</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
