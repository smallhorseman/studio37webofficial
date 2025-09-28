# Studio37 Deployment Guide

## Quick Start Deployment

### 1. Supabase Setup (5 minutes)
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for project to initialize (2-3 minutes)
3. Go to **Settings > API** and copy:
   - Project URL
   - `anon/public` key
4. Go to **SQL Editor** and run the contents of `supabase-schema.sql`

### 2. Netlify Deployment (3 minutes)
1. Go to [netlify.com](https://netlify.com) and connect your GitHub account
2. Click "New site from Git" and select your repository
3. Build settings are auto-configured via `netlify.toml`
4. Add environment variables in **Site settings > Environment variables**:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   VITE_ADMIN_USERNAME=admin
   VITE_ADMIN_PASSWORD=your-secure-password
   ```

### 3. Test Deployment
- Visit your Netlify URL
- Test portfolio unlock functionality
- Test admin login at `/admin-login`
- Submit a contact form to verify lead capture

## Environment Variables Required

```bash
# Required for Supabase integration
VITE_SUPABASE_URL=https://yourproject.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key

# Required for admin access
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=your_secure_password
```

## Features That Work Offline
- Portfolio viewing (after initial unlock)
- Contact form (saves locally, syncs when online)
- Admin interface (limited functionality)
- Analytics (stored locally, syncs when online)

## Post-Deployment Checklist
- [ ] Change default admin password
- [ ] Add portfolio images via admin panel
- [ ] Test contact form submissions
- [ ] Verify mobile responsiveness
- [ ] Check page load speeds
- [ ] Test offline functionality

## Troubleshooting

### Common Issues
1. **"Database not configured"** - Check environment variables
2. **Admin login fails** - Verify VITE_ADMIN_USERNAME and VITE_ADMIN_PASSWORD
3. **Portfolio images don't load** - Check Supabase RLS policies
4. **Contact forms don't save** - Verify Supabase connection

### Performance Optimization
- Images are lazy-loaded automatically
- Components are code-split for faster loading
- Offline functionality maintains user experience
- Cached queries reduce database calls

## Security Notes
- RLS policies protect database access
- Admin credentials are environment-based
- No sensitive data in client-side code
- HTTPS enforced by Netlify

## Support
For issues with deployment, check:
1. Netlify deploy logs
2. Browser console for errors
3. Supabase logs for database issues
