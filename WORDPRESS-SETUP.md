# WordPress CMS Setup Guide

## Quick Reference

This guide provides step-by-step instructions to set up WordPress as a headless CMS for your Next.js portfolio.

## LocalWP Setup (Development)

### 1. Install LocalWP
Download and install LocalWP from https://localwp.com

### 2. Create WordPress Site
1. Open LocalWP
2. Click "Create a new site"
3. Enter site name: `portfolio-cms`
4. Choose environment (Preferred or Custom)
5. Set WordPress admin credentials
6. Click "Add Site"

### 3. Install Required Plugins

Go to WP Admin → Plugins → Add New:

1. **Advanced Custom Fields (ACF) PRO** or free version
2. **Custom Post Type UI** (for creating custom post types)

Alternatively install via WP-CLI:
```bash
cd ~/Local Sites/portfolio-cms/app/public
wp plugin install advanced-custom-fields --activate
wp plugin install custom-post-type-ui --activate
```

## WordPress Configuration

### 1. Create Custom Post Type: Skills

**Via Custom Post Type UI:**
1. Go to CPT UI → Add/Edit Post Types
2. Basic Settings:
   - Post Type Slug: `skills`
   - Plural Label: `Skills`
   - Singular Label: `Skill`
3. Settings:
   - Has Archive: Yes
   - Show in REST API: Yes
   - REST API base slug: `skills`
4. Save Post Type

**Add ACF Fields for Skills:**
1. Go to Custom Fields → Add New
2. Field Group Name: "Skill Fields"
3. Add Fields:
   ```
   Field 1:
   - Label: Skill Name
   - Name: skill_name
   - Type: Text

   Field 2:
   - Label: Skill Icon
   - Name: skill_icon
   - Type: Text
   - Instructions: Icon name from lucide-react (e.g., Code, Brain, Globe)

   Field 3:
   - Label: Skill Level
   - Name: skill_level
   - Type: Number
   - Instructions: Enter value between 0-100

   Field 4:
   - Label: Skill Category
   - Name: skill_category
   - Type: Select
   - Choices:
     technical : Technical
     soft : Soft
   ```
4. Location Rules: Post Type is equal to skills
5. Save

### 2. Create Custom Post Type: Projects

**Via Custom Post Type UI:**
1. Go to CPT UI → Add/Edit Post Types
2. Basic Settings:
   - Post Type Slug: `projects`
   - Plural Label: `Projects`
   - Singular Label: `Project`
3. Settings:
   - Has Archive: Yes
   - Show in REST API: Yes
   - REST API base slug: `projects`
4. Save Post Type

**Add ACF Fields for Projects:**
1. Go to Custom Fields → Add New
2. Field Group Name: "Project Fields"
3. Add Fields:
   ```
   Field 1:
   - Label: Screenshot
   - Name: screenshot
   - Type: Image or URL

   Field 2:
   - Label: Short Description
   - Name: short_description
   - Type: Text Area

   Field 3:
   - Label: GitHub Link
   - Name: github_link
   - Type: URL

   Field 4:
   - Label: Live Demo
   - Name: live_demo
   - Type: URL

   Field 5:
   - Label: Technologies
   - Name: technologies
   - Type: Repeater
   - Sub Field:
     - Label: Technology
     - Name: technology
     - Type: Text

   Field 6:
   - Label: Features
   - Name: features
   - Type: Repeater
   - Sub Field:
     - Label: Feature
     - Name: feature
     - Type: Text

   Field 7:
   - Label: Challenges
   - Name: challenges
   - Type: Text Area

   Field 8:
   - Label: Solutions
   - Name: solutions
   - Type: Text Area

   Field 9:
   - Label: Screenshots
   - Name: screenshots
   - Type: Repeater
   - Sub Field:
     - Label: Screenshot URL
     - Name: screenshot_url
     - Type: Image or URL
   ```
4. Location Rules: Post Type is equal to projects
5. Save

### 3. Create Pages

**Home Page:**
1. Go to Pages → Add New
2. Title: "Home"
3. Slug: `home` (edit permalink)
4. Add ACF Fields (optional):
   ```
   - hero_title: Text
   - hero_subtitle: Text
   - hero_description: Text Area
   - resume_url: URL
   ```
5. Publish

**About Page:**
1. Go to Pages → Add New
2. Title: "About"
3. Slug: `about`
4. Add ACF Fields (optional):
   ```
   - professional_summary: Text Area/WYSIWYG
   - certifications: Text
   - interests: Text
   - favorite_tools: Text
   - resume_url: URL
   ```
5. Publish

### 4. ACF Options Page (Contact Info)

**Create Options Page:**
1. Add to `functions.php`:
```php
if( function_exists('acf_add_options_page') ) {
    acf_add_options_page(array(
        'page_title'  => 'Contact Information',
        'menu_title'  => 'Contact Info',
        'menu_slug'   => 'contact-info',
        'capability'  => 'edit_posts',
        'redirect'    => false
    ));
}
```

**Add Fields:**
1. Go to Custom Fields → Add New
2. Field Group Name: "Contact Information"
3. Add Fields:
   ```
   - email: Email
   - phone: Text
   - linkedin: URL
   - github: URL
   - location: Text
   ```
4. Location Rules: Options Page is equal to Contact Info
5. Save

## Add Sample Content

### Sample Skill (Technical):
```
Title: Python
skill_name: Python
skill_icon: Code
skill_level: 95
skill_category: technical
```

### Sample Skill (Soft):
```
Title: Teamwork
skill_name: Teamwork
skill_icon: Users
skill_level: N/A
skill_category: soft
```

### Sample Project:
```
Title: AI Image Recognition System
screenshot: [Upload or URL]
short_description: Deep learning model for multi-class image classification
github_link: https://github.com/yourusername/project
live_demo: https://demo.com
technologies: Python, TensorFlow, OpenCV, Flask
features:
  - Real-time image classification
  - Multi-class support (50+ categories)
  - Accuracy rate of 94%
challenges: Handling diverse image quality and optimizing model performance
solutions: Implemented data augmentation, transfer learning with ResNet50
screenshots: [Multiple URLs or uploads]
```

## Enable REST API

WordPress REST API is enabled by default. Test it:

```bash
# Test Pages
curl http://portfolio-cms.local/wp-json/wp/v2/pages

# Test Skills
curl http://portfolio-cms.local/wp-json/wp/v2/skills

# Test Projects
curl http://portfolio-cms.local/wp-json/wp/v2/projects

# Test ACF Options
curl http://portfolio-cms.local/wp-json/acf/v3/options/options
```

## Connect to Next.js

Update `.env.local`:
```env
NEXT_PUBLIC_WORDPRESS_API_URL=http://portfolio-cms.local/wp-json
```

**Note:** Replace `portfolio-cms.local` with your LocalWP site URL.

## Deploy to Render

### Preparation:
1. Export WordPress database:
   - WP Admin → Tools → Export
   - Or use WP-CLI: `wp db export`

2. Backup files:
   ```bash
   zip -r wordpress-backup.zip ~/Local Sites/portfolio-cms/app/public
   ```

### Render Setup:
1. Sign up at https://render.com
2. Create new **Web Service**
3. Build Command: (leave empty for PHP)
4. Start Command: (auto-detected)
5. Add **PostgreSQL** or **MySQL Database**
6. Set Environment Variables:
   ```
   WORDPRESS_DB_HOST=<render-db-host>
   WORDPRESS_DB_NAME=<db-name>
   WORDPRESS_DB_USER=<db-user>
   WORDPRESS_DB_PASSWORD=<db-password>
   ```

### After Deployment:
1. Import database to Render database
2. Update WordPress site URL:
   ```sql
   UPDATE wp_options SET option_value='https://your-render-url.com'
   WHERE option_name='siteurl' OR option_name='home';
   ```
3. Update `.env.local` in Next.js:
   ```env
   NEXT_PUBLIC_WORDPRESS_API_URL=https://your-render-url.com/wp-json
   ```

## Troubleshooting

### REST API Not Working:
1. Check permalink settings (Settings → Permalinks)
2. Re-save permalink settings
3. Check .htaccess file permissions

### CORS Issues:
Add to `functions.php`:
```php
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        return $value;
    });
}, 15);
```

### ACF Fields Not Showing in API:
Enable in ACF settings:
1. ACF → Settings
2. Enable "Show in REST API"

## Resources

- [LocalWP Documentation](https://localwp.com/help-docs/)
- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [ACF Documentation](https://www.advancedcustomfields.com/resources/)
- [Custom Post Type UI](https://docs.pluginize.com/article-categories/custom-post-type-ui/)
