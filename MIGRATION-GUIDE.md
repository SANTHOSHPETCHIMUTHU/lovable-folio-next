# Next.js 14 Portfolio with WordPress CMS - Migration Guide

## Migration Complete

Your Vite + React portfolio has been successfully migrated to Next.js 14 App Router with WordPress as a headless CMS.

## Project Structure

```
project/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with Navigation
│   ├── page.tsx                 # Home page (/)
│   ├── globals.css              # Global styles (from Vite)
│   ├── about/                   # About page (/about)
│   ├── skills/                  # Skills page (/skills)
│   ├── projects/                # Projects listing (/projects)
│   │   └── [slug]/             # Dynamic project details (/projects/[slug])
│   ├── contact/                 # Contact page (/contact)
│   └── api/
│       └── contact/            # Contact form API route
├── components/                   # React components
│   ├── Navigation.tsx           # Main navigation (client component)
│   ├── Hero.tsx                 # Hero section
│   └── ui/                      # shadcn/ui components
├── lib/
│   ├── wp-api.ts               # WordPress REST API helpers
│   ├── types.ts                 # TypeScript types for WP content
│   └── utils.ts                 # Utility functions
├── hooks/                        # Custom React hooks
├── .env.local                    # Environment variables
├── next.config.mjs              # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

## WordPress Setup Instructions

### 1. Local Development with LocalWP

1. **Install LocalWP**: Download from https://localwp.com
2. **Create New Site**:
   - Site Name: `portfolio-cms` (or any name)
   - PHP Version: 7.4+ or 8.0+
   - Choose WordPress version (latest recommended)

3. **Install Required Plugins**:
   ```
   - Advanced Custom Fields (ACF) PRO
   - Custom Post Type UI
   - WP REST API
   ```

4. **Create Custom Post Types**:

   **Skills Post Type**:
   - Slug: `skills`
   - Add ACF fields:
     - `skill_name` (Text)
     - `skill_icon` (Text) - icon name from lucide-react
     - `skill_level` (Number) - 0-100
     - `skill_category` (Select) - Options: technical, soft

   **Projects Post Type**:
   - Slug: `projects`
   - Add ACF fields:
     - `screenshot` (Image URL or upload)
     - `short_description` (Text Area)
     - `github_link` (URL)
     - `live_demo` (URL)
     - `features` (Repeater - text fields)
     - `challenges` (Text Area)
     - `solutions` (Text Area)
     - `technologies` (Repeater - text fields)
     - `screenshots` (Repeater - image URLs)

5. **Create Pages**:
   - Create page with slug `home`
   - Create page with slug `about`
   - Add ACF fields to pages as needed

6. **ACF Options Page** (for contact info):
   - Create ACF Options page
   - Add fields:
     - `email` (Email)
     - `phone` (Text)
     - `linkedin` (URL)
     - `github` (URL)
     - `location` (Text)

### 2. Deploy WordPress to Render

1. **Prepare for Deployment**:
   - Export WordPress database
   - Collect all WordPress files

2. **Deploy on Render**:
   - Sign up at https://render.com
   - Create new **Web Service**
   - Connect GitHub repo (or manual deployment)
   - Configure:
     - Build Command: (none for PHP)
     - Start Command: (Render auto-detects PHP)
   - Add database (MySQL/MariaDB)
   - Configure environment variables:
     - Database credentials
     - WordPress keys and salts

3. **Update WordPress URLs**:
   - After deployment, update site URL in WordPress settings
   - Update `.env.local` with new WordPress URL

## Environment Variables

Update `.env.local` with your WordPress URL:

```env
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-render-wordpress-domain.com/wp-json
```

For Vercel deployment, add this in Vercel dashboard under Environment Variables.

## Development

```bash
# Install dependencies (already done)
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deploy to Vercel

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Migrated to Next.js 14 with WordPress CMS"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to https://vercel.com
   - Import your GitHub repository
   - Configure:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: `npm run build`
     - Output Directory: (leave default)
   - Add Environment Variable:
     - Key: `NEXT_PUBLIC_WORDPRESS_API_URL`
     - Value: Your Render WordPress URL
   - Click **Deploy**

## Key Features

### Pages & Routes
- **Home (/)**: Hero section with data from WordPress page `home`
- **About (/about)**: Professional summary and contact details from ACF
- **Skills (/skills)**: Technical and soft skills from WordPress custom post type
- **Projects (/projects)**: Project cards from WordPress CPT
- **Project Detail (/projects/[slug])**: Full project details with dynamic routing
- **Contact (/contact)**: Contact form with API route + contact info from ACF

### WordPress Integration
- All content is fetched from WordPress REST API
- Fallback data displayed when WordPress is not configured
- Data revalidation every 60 seconds (configurable)
- Dynamic rendering for all pages

### API Routes
- **/api/contact**: Handles contact form submissions (currently logs to console)
  - Ready to integrate with email service (e.g., SendGrid, Resend)

## WordPress REST API Endpoints Used

- `GET /wp/v2/pages?slug=home` - Home page content
- `GET /wp/v2/pages?slug=about` - About page content
- `GET /wp/v2/skills` - Skills list
- `GET /wp/v2/projects` - Projects list
- `GET /wp/v2/projects?slug=<slug>` - Single project
- `GET /acf/v3/options/options` - ACF options (contact info)

## Design & Animations

All existing design, animations, and styling have been preserved:
- Framer Motion animations
- Tailwind CSS with custom design system
- Glass-morphism effects
- Gradient text and backgrounds
- Responsive design
- Dark theme

## Next Steps

1. **Set up LocalWP** with WordPress and required plugins
2. **Create custom post types** and add ACF fields
3. **Add content** in WordPress (pages, skills, projects)
4. **Update .env.local** with your LocalWP site URL
5. **Test locally** with `npm run dev`
6. **Deploy WordPress** to Render
7. **Deploy Next.js** to Vercel
8. **Update production environment** variables in Vercel

## Troubleshooting

### WordPress API not responding
- Ensure WordPress site is running
- Check CORS settings in WordPress
- Verify REST API is enabled

### Build errors
- Clear `.next` folder: `rm -rf .next`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check environment variables are set correctly

### Images not loading
- Ensure image URLs in WordPress are accessible
- Check Next.js Image domain configuration in `next.config.mjs`

## Support

For issues or questions about:
- **Next.js**: https://nextjs.org/docs
- **WordPress REST API**: https://developer.wordpress.org/rest-api/
- **ACF**: https://www.advancedcustomfields.com/resources/
