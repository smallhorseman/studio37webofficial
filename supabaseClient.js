import { createClient } from '@supabase/supabase-js'

// Get environment variables with validation
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate required environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase environment variables not found. Running in offline mode.')
  console.warn('Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.')
}

// Create Supabase client with optimized settings
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Since we're not using auth
    autoRefreshToken: false
  },
  realtime: {
    params: {
      eventsPerSecond: 2 // Limit realtime events for better performance
    }
  },
  global: {
    headers: {
      'x-client-info': 'studio37-web@1.0.0'
    }
  }
}) : null

// Connection status management
let connectionStatus = supabase ? 'checking' : 'unconfigured'
let lastConnectionCheck = 0
const CONNECTION_CHECK_INTERVAL = 30000 // 30 seconds

export const getConnectionStatus = () => connectionStatus

export const testConnection = async () => {
  if (!supabase) {
    connectionStatus = 'unconfigured'
    return false
  }

  const now = Date.now()
  
  // Use cached result if recent
  if (now - lastConnectionCheck < CONNECTION_CHECK_INTERVAL && connectionStatus !== 'error') {
    return connectionStatus === 'connected'
  }
  
  try {
    // Simple connection test
    const { data, error } = await supabase
      .from('portfolio_images')
      .select('count')
      .limit(1)

    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned" which is OK
      throw error
    }

    connectionStatus = 'connected'
    lastConnectionCheck = now
    return true
  } catch (error) {
    console.error('Supabase connection test failed:', error.message)
    connectionStatus = 'error'
    lastConnectionCheck = now
    return false
  }
}

// Analytics helper
export const trackAnalyticsEvent = async (eventType, eventData) => {
  if (!supabase || connectionStatus !== 'connected') {
    // Store locally if no connection
    try {
      const events = JSON.parse(localStorage.getItem('studio37_offline_events') || '[]')
      events.push({
        event_type: eventType,
        event_data: eventData,
        created_at: new Date().toISOString(),
        offline: true
      })
      localStorage.setItem('studio37_offline_events', JSON.stringify(events.slice(-50))) // Keep last 50
    } catch (error) {
      console.warn('Failed to store offline analytics:', error)
    }
    return
  }

  try {
    await supabase
      .from('analytics_events')
      .insert({
        event_type: eventType,
        event_data: eventData,
        page_url: window.location.href,
        user_agent: navigator.userAgent,
        created_at: new Date().toISOString()
      })
  } catch (error) {
    console.warn('Analytics tracking failed:', error)
  }
}

// Cached query helper for better performance
const queryCache = new Map()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export const cachedQuery = async (key, queryFn, maxAge = CACHE_DURATION) => {
  const cached = queryCache.get(key)
  
  if (cached && Date.now() - cached.timestamp < maxAge) {
    return cached.data
  }
  
  try {
    const data = await queryFn()
    queryCache.set(key, {
      data,
      timestamp: Date.now()
    })
    return data
  } catch (error) {
    // Return cached data if available, even if expired
    if (cached) {
      console.warn('Using stale cache due to error:', error)
      return cached.data
    }
    throw error
  }
}

// Initialize connection check
if (supabase) {
  testConnection()
}
