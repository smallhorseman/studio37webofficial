// Environment validation and configuration
export const ENV_CONFIG = {
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  ADMIN_USERNAME: import.meta.env.VITE_ADMIN_USERNAME || 'admin',
  ADMIN_PASSWORD: import.meta.env.VITE_ADMIN_PASSWORD || 'studio37admin',
  IS_PRODUCTION: import.meta.env.PROD,
  IS_DEVELOPMENT: import.meta.env.DEV,
}

export const validateEnvironment = () => {
  const warnings = []
  const errors = []

  // Check required variables
  if (!ENV_CONFIG.SUPABASE_URL) {
    warnings.push('VITE_SUPABASE_URL not set - running in offline mode')
  }

  if (!ENV_CONFIG.SUPABASE_ANON_KEY) {
    warnings.push('VITE_SUPABASE_ANON_KEY not set - running in offline mode')
  }

  // Security checks for production
  if (ENV_CONFIG.IS_PRODUCTION) {
    if (ENV_CONFIG.ADMIN_PASSWORD === 'studio37admin') {
      errors.push('⚠️ SECURITY WARNING: Change default admin password!')
    }
    
    if (ENV_CONFIG.ADMIN_USERNAME === 'admin') {
      warnings.push('Consider changing default admin username for better security')
    }
  }

  return { warnings, errors, isValid: errors.length === 0 }
}

export const getEnvironmentInfo = () => {
  const validation = validateEnvironment()
  
  return {
    mode: ENV_CONFIG.IS_PRODUCTION ? 'production' : 'development',
    supabaseConfigured: !!(ENV_CONFIG.SUPABASE_URL && ENV_CONFIG.SUPABASE_ANON_KEY),
    validation,
    version: '1.0.0'
  }
}
