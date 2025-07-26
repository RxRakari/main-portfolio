interface BlogData {
  title: string;
  subtitle: string;
  slug: string;
  coverImage: string;
  intro: string;
}

interface ProjectData {
  title: string;
  slug: string;
  description: string;
  images: { url: string }[];
}

interface GalleryData {
  title: string;
  description: string;
  imageUrl: string;
}

interface ExperienceData {
  title: string;
  company: string;
  description: string;
}

/**
 * Generate blog newsletter template
 */
export const getBlogNewsletterTemplate = (blog: BlogData, unsubscribeUrl: string): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Blog Post: ${blog.title}</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #000;
        }
        .title {
          font-size: 28px;
          font-weight: bold;
          margin: 20px 0 10px;
        }
        .subtitle {
          font-size: 18px;
          color: #666;
          margin-bottom: 20px;
        }
        .cover-image {
          width: 100%;
          height: auto;
          margin-bottom: 20px;
          border-radius: 8px;
        }
        .content {
          margin-bottom: 30px;
        }
        .cta-button {
          display: inline-block;
          background-color: #000;
          color: #fff;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 4px;
          font-weight: bold;
        }
        .footer {
          margin-top: 40px;
          font-size: 12px;
          color: #999;
          text-align: center;
        }
        .unsubscribe {
          color: #999;
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">Caleb Kalejaiye</div>
        <p>Portfolio & Blog</p>
      </div>
      
      <p>Hey there!</p>
      
      <p>Caleb just published a new blog post that you might enjoy:</p>
      
      <div class="title">${blog.title}</div>
      <div class="subtitle">${blog.subtitle}</div>
      
      <img src="${blog.coverImage}" alt="${blog.title}" class="cover-image">
      
      <div class="content">
        ${blog.intro}
      </div>
      
      <a href="${process.env.API_URL}/blogs/${blog.slug}" class="cta-button">Read the Full Article</a>
      
      <div class="footer">
        <p>You're receiving this email because you subscribed to Caleb's newsletter.</p>
        <p><a href="${unsubscribeUrl}" class="unsubscribe">Unsubscribe</a></p>
      </div>
    </body>
    </html>
  `;
};

/**
 * Generate project newsletter template
 */
export const getProjectNewsletterTemplate = (project: ProjectData, unsubscribeUrl: string): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Project: ${project.title}</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #000;
        }
        .title {
          font-size: 28px;
          font-weight: bold;
          margin: 20px 0 10px;
        }
        .project-image {
          width: 100%;
          height: auto;
          margin-bottom: 20px;
          border-radius: 8px;
        }
        .content {
          margin-bottom: 30px;
        }
        .cta-button {
          display: inline-block;
          background-color: #000;
          color: #fff;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 4px;
          font-weight: bold;
        }
        .footer {
          margin-top: 40px;
          font-size: 12px;
          color: #999;
          text-align: center;
        }
        .unsubscribe {
          color: #999;
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">Caleb Kalejaiye</div>
        <p>Portfolio & Projects</p>
      </div>
      
      <p>Hey there!</p>
      
      <p>Caleb just added a new project to his portfolio:</p>
      
      <div class="title">${project.title}</div>
      
      <img src="${project.images[0]?.url || ''}" alt="${project.title}" class="project-image">
      
      <div class="content">
        ${project.description}
      </div>
      
      <a href="${process.env.API_URL}/projects/${project.slug}" class="cta-button">View Project Details</a>
      
      <div class="footer">
        <p>You're receiving this email because you subscribed to Caleb's newsletter.</p>
        <p><a href="${unsubscribeUrl}" class="unsubscribe">Unsubscribe</a></p>
      </div>
    </body>
    </html>
  `;
};

/**
 * Generate gallery newsletter template
 */
export const getGalleryNewsletterTemplate = (gallery: GalleryData, unsubscribeUrl: string): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Gallery Addition: ${gallery.title}</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #000;
        }
        .title {
          font-size: 28px;
          font-weight: bold;
          margin: 20px 0 10px;
        }
        .gallery-image {
          width: 100%;
          height: auto;
          margin-bottom: 20px;
          border-radius: 8px;
        }
        .content {
          margin-bottom: 30px;
        }
        .cta-button {
          display: inline-block;
          background-color: #000;
          color: #fff;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 4px;
          font-weight: bold;
        }
        .footer {
          margin-top: 40px;
          font-size: 12px;
          color: #999;
          text-align: center;
        }
        .unsubscribe {
          color: #999;
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">Caleb Kalejaiye</div>
        <p>Portfolio Gallery</p>
      </div>
      
      <p>Hey there!</p>
      
      <p>Caleb just added a new image to his gallery:</p>
      
      <div class="title">${gallery.title}</div>
      
      <img src="${gallery.imageUrl}" alt="${gallery.title}" class="gallery-image">
      
      <div class="content">
        ${gallery.description}
      </div>
      
      <a href="${process.env.API_URL}/gallery" class="cta-button">View Full Gallery</a>
      
      <div class="footer">
        <p>You're receiving this email because you subscribed to Caleb's newsletter.</p>
        <p><a href="${unsubscribeUrl}" class="unsubscribe">Unsubscribe</a></p>
      </div>
    </body>
    </html>
  `;
};

/**
 * Generate welcome newsletter template
 */
export const getWelcomeNewsletterTemplate = (unsubscribeUrl: string): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Caleb's Newsletter</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #000;
        }
        .title {
          font-size: 28px;
          font-weight: bold;
          margin: 20px 0;
        }
        .content {
          margin-bottom: 30px;
        }
        .cta-button {
          display: inline-block;
          background-color: #000;
          color: #fff;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 4px;
          font-weight: bold;
        }
        .footer {
          margin-top: 40px;
          font-size: 12px;
          color: #999;
          text-align: center;
        }
        .unsubscribe {
          color: #999;
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">Caleb Kalejaiye</div>
        <p>Portfolio & Blog</p>
      </div>
      
      <div class="title">Welcome to My Newsletter!</div>
      
      <div class="content">
        <p>Hey there!</p>
        
        <p>Thank you for subscribing to my newsletter. I'm excited to share my latest projects, blog posts, and updates with you.</p>
        
        <p>You'll be the first to know when I publish new content or launch new projects.</p>
        
        <p>Feel free to explore my portfolio and check out some of my existing work:</p>
      </div>
      
      <a href="${process.env.API_URL}" class="cta-button">Visit My Portfolio</a>
      
      <div class="footer">
        <p>You're receiving this email because you subscribed to Caleb's newsletter.</p>
        <p><a href="${unsubscribeUrl}" class="unsubscribe">Unsubscribe</a></p>
      </div>
    </body>
    </html>
  `;
};
