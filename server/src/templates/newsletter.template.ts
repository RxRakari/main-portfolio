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
          line-height: 1.7;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 0;
          background-color: #fafafa;
        }
        
        .email-container {
          background-color: #ffffff;
          margin: 20px auto;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }
        
        .header {
          text-align: center;
          padding: 40px 30px 30px;
          position: relative;
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
        }
        
        .celebration-svg {
          position: absolute;
          top: 15px;
          left: 50%;
          transform: translateX(-50%);
          animation: bounce 2s infinite;
        }
        
        .logo {
          font-size: 32px;
          font-weight: 700;
          color: #000;
          margin: 20px 0 5px;
          letter-spacing: -0.5px;
        }
        
        .subtitle {
          font-size: 14px;
          color: #666;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0;
        }
        
        .title {
          font-size: 32px;
          font-weight: 700;
          margin: 30px 30px 0;
          text-align: center;
          color: #1a1a1a;
          line-height: 1.2;
        }
        
        .welcome-emoji {
          font-size: 24px;
          margin-left: 8px;
          display: inline-block;
          animation: wave 1s ease-in-out infinite alternate;
        }
        
        .content {
          padding: 30px;
          margin: 0;
        }
        
        .content p {
          margin: 0 0 20px;
          font-size: 16px;
          color: #444;
        }
        
        .content p:first-child {
          font-size: 18px;
          font-weight: 600;
          color: #333;
        }
        
        .highlight-box {
          background-color: #f8f9fa;
          border-left: 4px solid #000;
          padding: 20px 25px;
          margin: 25px 0;
          border-radius: 0 8px 8px 0;
        }
        
        .cta-container {
          text-align: center;
          margin: 40px 30px;
        }
        
        .cta-button {
          display: inline-block;
          background-color: #000;
          color: #fff;
          padding: 16px 32px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .cta-button:hover {
          background-color: #333;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }
        
        .divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #e0e0e0, transparent);
          margin: 30px 30px;
        }
        
        .footer {
          padding: 30px;
          font-size: 13px;
          color: #777;
          text-align: center;
          background-color: #f8f9fa;
        }
        
        .footer p {
          margin: 0 0 8px;
          line-height: 1.5;
        }
        
        .unsubscribe {
          color: #666;
          text-decoration: underline;
          transition: color 0.3s ease;
        }
        
        .unsubscribe:hover {
          color: #333;
        }
        
        .social-icons {
          margin: 20px 0 10px;
        }
        
        .social-icon {
          display: inline-block;
          margin: 0 8px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #f0f0f0;
          transition: all 0.3s ease;
        }
        
        .social-icon:hover {
          background-color: #e0e0e0;
          transform: translateY(-1px);
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }
        
        @keyframes wave {
          from { transform: rotate(0deg); }
          to { transform: rotate(15deg); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .content, .cta-container {
          animation: fadeInUp 0.6s ease-out;
        }
        
        @media only screen and (max-width: 600px) {
          .email-container {
            margin: 10px;
            border-radius: 8px;
          }
          
          .header {
            padding: 30px 20px 20px;
          }
          
          .title {
            font-size: 28px;
            margin: 20px 20px 0;
          }
          
          .content {
            padding: 20px;
          }
          
          .cta-container {
            margin: 30px 20px;
          }
          
          .footer {
            padding: 20px;
          }
          
          .divider {
            margin: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <svg class="celebration-svg" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 5L22.5 15H32.5L24.5 21L27 31L20 25L13 31L15.5 21L7.5 15H17.5L20 5Z" fill="#FFD700" stroke="#FFA500" stroke-width="1"/>
            <circle cx="8" cy="8" r="2" fill="#FF6B6B" opacity="0.8">
              <animate attributeName="r" values="1;3;1" dur="1.5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="32" cy="12" r="1.5" fill="#4ECDC4" opacity="0.8">
              <animate attributeName="r" values="1;2.5;1" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="35" cy="35" r="2" fill="#45B7D1" opacity="0.8">
              <animate attributeName="r" values="1.5;3;1.5" dur="1.8s" repeatCount="indefinite"/>
            </circle>
            <circle cx="5" cy="32" r="1.5" fill="#96CEB4" opacity="0.8">
              <animate attributeName="r" values="1;2;1" dur="2.2s" repeatCount="indefinite"/>
            </circle>
          </svg>
          
          <div class="logo">Rapto's</div>
          <p class="subtitle">Portfolio</p>
        </div>
        
        <div class="title">
          Welcome to My Newsletter!
          <span class="welcome-emoji">👋</span>
        </div>
        
        <div class="content">
          <p>Hey there! 🎉</p>
          
          <p>Thank you for subscribing to my newsletter. I'm excited to share my latest projects, blog posts, and updates with you.</p>
          
          <div class="highlight-box">
            <p style="margin: 0; font-weight: 600;">🚀 You'll be the first to know when I:</p>
            <p style="margin: 10px 0 0; font-size: 15px;">• Publish new content and tutorials<br>
            • Launch exciting new projects<br>
            • Share behind-the-scenes insights<br>
            • Release useful tools and resources</p>
          </div>
          
          <p>Feel free to explore my portfolio and check out some of my existing work. I'd love to hear your thoughts! 💭</p>
        </div>
        
        <div class="cta-container">
          <a href="${process.env.API_URL}" class="cta-button">
            Visit My Portfolio
          </a>
        </div>
        
        <div class="divider"></div>
        
        <div class="footer">
          <div class="social-icons">
            <div class="social-icon" title="Portfolio"></div>
            <div class="social-icon" title="Blog"></div>
            <div class="social-icon" title="Projects"></div>
          </div>
          
          <p>You're receiving this email because you subscribed to Caleb's newsletter.</p>
          <p>Thanks for being part of the journey! 🙏</p>
          <p><a href="${unsubscribeUrl}" class="unsubscribe">Unsubscribe</a> | <a href="#" class="unsubscribe">Update Preferences</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
};