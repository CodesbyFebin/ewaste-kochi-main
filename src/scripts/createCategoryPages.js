import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load existing blog index and analysis
const blogIndex = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/blog-index.json'), 'utf8'));
const analysis = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/blog-analysis.json'), 'utf8'));

class CategoryPageCreator {
  constructor() {
    this.blogs = blogIndex;
    this.analysis = analysis;
  }

  createTopicPages() {
    const pagesDir = path.join(__dirname, '../../src/pages/blog');
    
    // Ensure directory exists
    if (!fs.existsSync(pagesDir)) {
      fs.mkdirSync(pagesDir, { recursive: true });
    }

    Object.entries(this.analysis.topics).forEach(([topic, count]) => {
      const topicBlogs = this.blogs.filter(blog => blog.topic === topic);
      const recentBlogs = topicBlogs
        .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
        .slice(0, 20);

      const topicName = topic.charAt(0).toUpperCase() + topic.slice(1);
      
      const pageContent = `---
import BaseLayout from '../../../layouts/BaseLayout.astro';

const title = "${topicName} Articles - EWaste Kochi";
const description = "Expert guides and articles on ${topicName.toLowerCase()} in e-waste management. Learn about ${topicName.toLowerCase()} processes, best practices, and solutions in Kerala.";

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog/" },
  { name: "Topics", url: "/blog/topics/" },
  { name: "${topicName}", url: "/blog/topic-${topic}/" }
];

// Topic blogs
const topicBlogs = [
${recentBlogs.map(blog => `  {
    title: "${blog.title}",
    slug: "${blog.slug}",
    publishDate: "${blog.publishDate}",
    description: "${blog.description || ''}",
    service: "${blog.service}",
    location: "${blog.location}"
  }`).join(',\n')}
];

// Topic statistics
const totalArticles = ${topicBlogs.length};
const services = [...new Set(topicBlogs.map(blog => blog.service))];
const locations = [...new Set(topicBlogs.map(blog => blog.location))];
---

<BaseLayout title={title} description={description} pageType="website" breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <header class="mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">${topicName} Articles</h1>
      <p class="text-xl text-gray-700 leading-relaxed mb-4">
        Expert guides and articles on ${topicName.toLowerCase()} in e-waste management. 
        Learn about ${topicName.toLowerCase()} processes, best practices, and solutions in Kerala.
      </p>
      <div class="bg-purple-50 p-4 rounded-lg">
        <div class="grid grid-cols-3 gap-4">
          <div>
            <span class="font-bold text-purple-800">{totalArticles}</span>
            <span class="text-purple-700"> articles</span>
          </div>
          <div>
            <span class="font-bold text-purple-800">{services.length}</span>
            <span class="text-purple-700"> services</span>
          </div>
          <div>
            <span class="font-bold text-purple-800">{locations.length}</span>
            <span class="text-purple-700"> locations</span>
          </div>
        </div>
      </div>
    </header>

    <section class="blog-list">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">Recent ${topicName} Articles</h2>
      <div class="grid md:grid-cols-2 gap-6">
        {topicBlogs.map(blog => (
          <article class="blog-card bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between mb-3">
              <span class="text-sm text-gray-500">
                {new Date(blog.publishDate).toLocaleDateString('en-IN', { 
                  year: 'numeric', 
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
              <div class="flex gap-2">
                <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                  {blog.service}
                </span>
                <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                  {blog.location}
                </span>
              </div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              <a href={\`/blog/\${blog.slug}/\`} class="text-amber-600 hover:text-amber-700">
                {blog.title}
              </a>
            </h3>
            <p class="text-gray-700 mb-4">{blog.description}</p>
            <a href={\`/blog/\${blog.slug}/\`} class="text-amber-600 hover:text-amber-700 font-medium">
              Read more
            </a>
          </article>
        ))}
      </div>
    </section>

    <section class="related-section mt-12">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Browse by Service</h2>
      <div class="grid md:grid-cols-3 gap-4">
        {services.map(service => (
          <a 
            href={\`/blog/service-\${service}/\`} 
            class="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <h3 class="font-semibold text-blue-800 mb-2">
              {service.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </h3>
            <p class="text-blue-700 text-sm">{topicName.toLowerCase()} articles</p>
          </a>
        ))}
      </div>
    </section>
  </div>

  <style>
    .blog-card {
      transition: all 0.3s ease;
    }
    .blog-card:hover {
      transform: translateY(-2px);
    }
  </style>
</BaseLayout>`;

      fs.writeFileSync(path.join(pagesDir, `topic-${topic}.astro`), pageContent);
      console.log(`Created: /src/pages/blog/topic-${topic}.astro`);
    });
  }

  createServicePages() {
    const pagesDir = path.join(__dirname, '../../src/pages/blog');

    Object.entries(this.analysis.services).forEach(([service, count]) => {
      const serviceBlogs = this.blogs.filter(blog => blog.service === service);
      const recentBlogs = serviceBlogs
        .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
        .slice(0, 20);

      const serviceName = service.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      
      const pageContent = `---
import BaseLayout from '../../../layouts/BaseLayout.astro';

const title = "${serviceName} Articles - EWaste Kochi";
const description = "Expert guides and articles on ${serviceName.toLowerCase()} in Kerala. Learn about pricing, process, and best practices for ${serviceName.toLowerCase()}.";

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog/" },
  { name: "Services", url: "/blog/services/" },
  { name: "${serviceName}", url: "/blog/service-${service}/" }
];

// Service blogs
const serviceBlogs = [
${recentBlogs.map(blog => `  {
    title: "${blog.title}",
    slug: "${blog.slug}",
    publishDate: "${blog.publishDate}",
    description: "${blog.description || ''}",
    location: "${blog.location}",
    topic: "${blog.topic}"
  }`).join(',\n')}
];

// Service statistics
const totalArticles = ${serviceBlogs.length};
const locations = [...new Set(serviceBlogs.map(blog => blog.location))];
const topics = [...new Set(serviceBlogs.map(blog => blog.topic))];
---

<BaseLayout title={title} description={description} pageType="website" breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <header class="mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">${serviceName} Articles</h1>
      <p class="text-xl text-gray-700 leading-relaxed mb-4">
        Expert guides and articles on ${serviceName.toLowerCase()} in Kerala. 
        Learn about pricing, process, and best practices for ${serviceName.toLowerCase()}.
      </p>
      <div class="bg-blue-50 p-4 rounded-lg">
        <div class="grid grid-cols-3 gap-4">
          <div>
            <span class="font-bold text-blue-800">{totalArticles}</span>
            <span class="text-blue-700"> articles</span>
          </div>
          <div>
            <span class="font-bold text-blue-800">{locations.length}</span>
            <span class="text-blue-700"> locations</span>
          </div>
          <div>
            <span class="font-bold text-blue-800">{topics.length}</span>
            <span class="text-blue-700"> topics</span>
          </div>
        </div>
      </div>
    </header>

    <section class="blog-list">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">Recent ${serviceName} Articles</h2>
      <div class="grid md:grid-cols-2 gap-6">
        {serviceBlogs.map(blog => (
          <article class="blog-card bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between mb-3">
              <span class="text-sm text-gray-500">
                {new Date(blog.publishDate).toLocaleDateString('en-IN', { 
                  year: 'numeric', 
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
              <div class="flex gap-2">
                <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                  {blog.topic}
                </span>
                <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                  {blog.location}
                </span>
              </div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              <a href={\`/blog/\${blog.slug}/\`} class="text-amber-600 hover:text-amber-700">
                {blog.title}
              </a>
            </h3>
            <p class="text-gray-700 mb-4">{blog.description}</p>
            <a href={\`/blog/\${blog.slug}/\`} class="text-amber-600 hover:text-amber-700 font-medium">
              Read more
            </a>
          </article>
        ))}
      </div>
    </section>

    <section class="related-section mt-12">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Browse by Location</h2>
      <div class="grid md:grid-cols-3 gap-4">
        {locations.map(location => (
          <a 
            href={\`/blog/location-\${location}/\`} 
            class="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <h3 class="font-semibold text-green-800 mb-2">
              {location.charAt(0).toUpperCase() + location.slice(1)}
            </h3>
            <p class="text-green-700 text-sm">{serviceName.toLowerCase()} articles</p>
          </a>
        ))}
      </div>
    </section>
  </div>

  <style>
    .blog-card {
      transition: all 0.3s ease;
    }
    .blog-card:hover {
      transform: translateY(-2px);
    }
  </style>
</BaseLayout>`;

      fs.writeFileSync(path.join(pagesDir, `service-${service}.astro`), pageContent);
      console.log(`Created: /src/pages/blog/service-${service}.astro`);
    });
  }

  createLocationPages() {
    const pagesDir = path.join(__dirname, '../../src/pages/blog');

    Object.entries(this.analysis.locations).forEach(([location, count]) => {
      const locationBlogs = this.blogs.filter(blog => blog.location === location);
      const recentBlogs = locationBlogs
        .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
        .slice(0, 20);

      const locationName = location.charAt(0).toUpperCase() + location.slice(1);
      
      const pageContent = `---
import BaseLayout from '../../../layouts/BaseLayout.astro';

const title = "${locationName} Articles - EWaste Kochi";
const description = "E-waste management guides and articles for ${locationName}. Find local recycling services, pickup options, and environmental solutions in ${locationName}.";

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog/" },
  { name: "Locations", url: "/blog/locations/" },
  { name: "${locationName}", url: "/blog/location-${location}/" }
];

// Location blogs
const locationBlogs = [
${recentBlogs.map(blog => `  {
    title: "${blog.title}",
    slug: "${blog.slug}",
    publishDate: "${blog.publishDate}",
    description: "${blog.description || ''}",
    service: "${blog.service}",
    topic: "${blog.topic}"
  }`).join(',\n')}
];

// Location statistics
const totalArticles = ${locationBlogs.length};
const services = [...new Set(locationBlogs.map(blog => blog.service))];
const topics = [...new Set(locationBlogs.map(blog => blog.topic))];
---

<BaseLayout title={title} description={description} pageType="website" breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <header class="mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">${locationName} Articles</h1>
      <p class="text-xl text-gray-700 leading-relaxed mb-4">
        E-waste management guides and articles for ${locationName}. Find local recycling services, 
        pickup options, and environmental solutions in ${locationName}.
      </p>
      <div class="bg-green-50 p-4 rounded-lg">
        <div class="grid grid-cols-3 gap-4">
          <div>
            <span class="font-bold text-green-800">{totalArticles}</span>
            <span class="text-green-700"> articles</span>
          </div>
          <div>
            <span class="font-bold text-green-800">{services.length}</span>
            <span class="text-green-700"> services</span>
          </div>
          <div>
            <span class="font-bold text-green-800">{topics.length}</span>
            <span class="text-green-700"> topics</span>
          </div>
        </div>
      </div>
    </header>

    <section class="blog-list">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">Recent ${locationName} Articles</h2>
      <div class="grid md:grid-cols-2 gap-6">
        {locationBlogs.map(blog => (
          <article class="blog-card bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between mb-3">
              <span class="text-sm text-gray-500">
                {new Date(blog.publishDate).toLocaleDateString('en-IN', { 
                  year: 'numeric', 
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
              <div class="flex gap-2">
                <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                  {blog.service}
                </span>
                <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                  {blog.topic}
                </span>
              </div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              <a href={\`/blog/\${blog.slug}/\`} class="text-amber-600 hover:text-amber-700">
                {blog.title}
              </a>
            </h3>
            <p class="text-gray-700 mb-4">{blog.description}</p>
            <a href={\`/blog/\${blog.slug}/\`} class="text-amber-600 hover:text-amber-700 font-medium">
              Read more
            </a>
          </article>
        ))}
      </div>
    </section>

    <section class="related-section mt-12">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Browse by Service</h2>
      <div class="grid md:grid-cols-3 gap-4">
        {services.map(service => (
          <a 
            href={\`/blog/service-\${service}/\`} 
            class="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <h3 class="font-semibold text-blue-800 mb-2">
              {service.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </h3>
            <p class="text-blue-700 text-sm">{locationName.toLowerCase()} articles</p>
          </a>
        ))}
      </div>
    </section>
  </div>

  <style>
    .blog-card {
      transition: all 0.3s ease;
    }
    .blog-card:hover {
      transform: translateY(-2px);
    }
  </style>
</BaseLayout>`;

      fs.writeFileSync(path.join(pagesDir, `location-${location}.astro`), pageContent);
      console.log(`Created: /src/pages/blog/location-${location}.astro`);
    });
  }

  createAllPages() {
    console.log('Creating category and tag pages...');
    
    this.createTopicPages();
    console.log(`Created ${Object.keys(this.analysis.topics).length} topic pages`);
    
    this.createServicePages();
    console.log(`Created ${Object.keys(this.analysis.services).length} service pages`);
    
    this.createLocationPages();
    console.log(`Created ${Object.keys(this.analysis.locations).length} location pages`);
    
    console.log('\nAll category and tag pages created successfully!');
  }
}

// Create all category pages
const creator = new CategoryPageCreator();
creator.createAllPages();
