import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load existing blog index and analysis
const blogIndex = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/blog-index.json'), 'utf8'));
const analysis = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/blog-analysis.json'), 'utf8'));

class BlogIndexCreator {
  constructor() {
    this.blogs = blogIndex;
    this.analysis = analysis;
  }

  createMainBlogIndex() {
    const recentBlogs = this.blogs
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
      .slice(0, 12);

    const featuredBlogs = this.blogs
      .filter(blog => blog.topic === 'how-to' || blog.topic === 'benefits')
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
      .slice(0, 6);

    return `---
import BaseLayout from '../../layouts/BaseLayout.astro';

const title = "EWaste Kochi Blog - E-Waste Management & Recycling Guide";
const description = "Expert guides on e-waste management, recycling services, and ITAD solutions in Kerala. Learn about proper electronic waste disposal, data destruction, and environmental compliance.";

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog/" }
];

// Recent blog posts
const recentBlogs = [
${recentBlogs.map(blog => `  {
    title: "${blog.title}",
    slug: "${blog.slug}",
    publishDate: "${blog.publishDate}",
    service: "${blog.service}",
    location: "${blog.location}",
    topic: "${blog.topic}"
  }`).join(',\n')}
];

// Featured articles
const featuredBlogs = [
${featuredBlogs.map(blog => `  {
    title: "${blog.title}",
    slug: "${blog.slug}",
    publishDate: "${blog.publishDate}",
    service: "${blog.service}",
    location: "${blog.location}"
  }`).join(',\n')}
];

// Blog statistics
const totalBlogs = ${this.blogs.length};
const totalServices = ${Object.keys(this.analysis.services).length};
const totalLocations = ${Object.keys(this.analysis.locations).length};
const totalTopics = ${Object.keys(this.analysis.topics).length};
---

<BaseLayout title={title} description={description} pageType="website" breadcrumbs={breadcrumbs}>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <!-- Blog Hero Section -->
    <header class="mb-12 text-center">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        EWaste Kochi Blog
      </h1>
      <p class="text-xl text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
        Expert guides on e-waste management, recycling services, and ITAD solutions in Kerala. 
        Learn about proper electronic waste disposal, data destruction, and environmental compliance.
      </p>
      
      <!-- Blog Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-amber-50 p-4 rounded-lg">
          <div class="text-2xl font-bold text-amber-800">{totalBlogs}+</div>
          <div class="text-sm text-amber-700">Articles</div>
        </div>
        <div class="bg-blue-50 p-4 rounded-lg">
          <div class="text-2xl font-bold text-blue-800">{totalServices}</div>
          <div class="text-sm text-blue-700">Services</div>
        </div>
        <div class="bg-green-50 p-4 rounded-lg">
          <div class="text-2xl font-bold text-green-800">{totalLocations}</div>
          <div class="text-sm text-green-700">Locations</div>
        </div>
        <div class="bg-purple-50 p-4 rounded-lg">
          <div class="text-2xl font-bold text-purple-800">{totalTopics}</div>
          <div class="text-sm text-purple-700">Topics</div>
        </div>
      </div>
    </header>

    <!-- Featured Articles -->
    <section class="featured-section mb-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">Featured Articles</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredBlogs.map(blog => (
          <article class="featured-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div class="flex items-center justify-between mb-3">
              <span class="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                Featured
              </span>
              <span class="text-sm text-gray-500">
                {new Date(blog.publishDate).toLocaleDateString('en-IN', { 
                  year: 'numeric', 
                  month: 'short' 
                })}
              </span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              <a href={\`/blog/\${blog.slug}/\`} class="text-amber-600 hover:text-amber-700">
                {blog.title}
              </a>
            </h3>
            <div class="flex items-center justify-between">
              <div class="flex gap-2">
                <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                  {blog.service}
                </span>
                <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                  {blog.location}
                </span>
              </div>
              <a href={\`/blog/\${blog.slug}/\`} class="text-amber-600 hover:text-amber-700 font-medium text-sm">
                Read more
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>

    <!-- Recent Articles -->
    <section class="recent-section mb-12">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-bold text-gray-900">Recent Articles</h2>
        <a href="/blog/archives/" class="text-amber-600 hover:text-amber-700 font-medium">
          View all archives
        </a>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentBlogs.map(blog => (
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
              </div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              <a href={\`/blog/\${blog.slug}/\`} class="text-amber-600 hover:text-amber-700">
                {blog.title}
              </a>
            </h3>
            <div class="flex items-center justify-between">
              <div class="flex gap-2">
                <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                  {blog.service}
                </span>
                <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                  {blog.location}
                </span>
              </div>
              <a href={\`/blog/\${blog.slug}/\`} class="text-amber-600 hover:text-amber-700 font-medium text-sm">
                Read more
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>

    <!-- Quick Links -->
    <section class="quick-links-section">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Explore by Category</h2>
      <div class="grid md:grid-cols-3 gap-4">
        <a href="/blog/topics/" class="block p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
          <h3 class="font-semibold text-amber-800 mb-2">Browse Topics</h3>
          <p class="text-amber-700 text-sm">Explore articles by topic and category</p>
        </a>
        <a href="/blog/services/" class="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
          <h3 class="font-semibold text-blue-800 mb-2">Services</h3>
          <p class="text-blue-700 text-sm">Find articles by service type</p>
        </a>
        <a href="/blog/locations/" class="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
          <h3 class="font-semibold text-green-800 mb-2">Locations</h3>
          <p class="text-green-700 text-sm">Browse by location in Kerala</p>
        </a>
      </div>
    </section>
  </div>

  <style>
    .blog-card, .featured-card {
      transition: all 0.3s ease;
    }
    .blog-card:hover, .featured-card:hover {
      transform: translateY(-2px);
    }
  </style>
</BaseLayout>`;
  }

  createArchiveIndex() {
    // Group blogs by year and month
    const archives = {};
    
    this.blogs.forEach(blog => {
      const date = new Date(blog.publishDate);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      
      if (!archives[year]) {
        archives[year] = {};
      }
      if (!archives[year][month]) {
        archives[year][month] = [];
      }
      archives[year][month].push(blog);
    });

    const years = Object.keys(archives).sort((a, b) => b - a);
    
    return `---
import BaseLayout from '../../layouts/BaseLayout.astro';

const title = "Blog Archives - EWaste Kochi";
const description = "Browse our complete blog archives by year and month. Find e-waste management guides, recycling tips, and ITAD solutions from our extensive article collection.";

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog/" },
  { name: "Archives", url: "/blog/archives/" }
];

// Archive data
const archives = {
${Object.keys(archives).sort((a, b) => b - a).map(year => `  "${year}": {
    months: [
${Object.keys(archives[year]).sort((a, b) => b - a).map(month => `      {
        month: ${month},
        count: ${archives[year][month].length},
        url: "/blog/archive-${year}-${month}/"
      }`).join(',\n')}
    ],
    total: ${Object.values(archives[year]).reduce((sum, blogs) => sum + blogs.length, 0)}
  }`).join(',\n')}
};

const years = [${years.map(year => `"${year}"`)}];
---

<BaseLayout title={title} description={description} pageType="website" breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <header class="mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Blog Archives</h1>
      <p class="text-xl text-gray-700 leading-relaxed">
        Browse our complete blog archives by year and month. Find e-waste management guides, 
        recycling tips, and ITAD solutions from our extensive article collection.
      </p>
    </header>

    <section class="archives-section">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">Browse by Year</h2>
      <div class="space-y-8">
        {years.map(year => {
          const yearData = archives[year];
          return (
            <div class="year-section">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-semibold text-gray-900">
                  <a href={\`/blog/archive-\${year}/\`} class="text-amber-600 hover:text-amber-700">
                    {year}
                  </a>
                </h3>
                <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {yearData.total} articles
                </span>
              </div>
              <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
                {yearData.months.map(month => (
                  <a 
                    href={month.url} 
                    class="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                  >
                    <div class="font-medium text-gray-900">
                      {new Date(year, month.month - 1).toLocaleDateString('en-US', { month: 'long' })}
                    </div>
                    <div class="text-sm text-gray-600">{month.count} articles</div>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  </div>
</BaseLayout>`;
  }

  createTopicsIndex() {
    const topicData = Object.entries(this.analysis.topics)
      .map(([topic, count]) => ({
        name: topic.charAt(0).toUpperCase() + topic.slice(1),
        slug: topic,
        count: count,
        blogs: this.blogs.filter(blog => blog.topic === topic).slice(0, 6)
      }))
      .sort((a, b) => b.count - a.count);

    return `---
import BaseLayout from '../../layouts/BaseLayout.astro';

const title = "Blog Topics - EWaste Kochi";
const description = "Explore our blog articles by topic. Find comprehensive guides on e-waste management, recycling processes, legal requirements, and more.";

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog/" },
  { name: "Topics", url: "/blog/topics/" }
];

// Topics data
const topics = [
${topicData.map(topic => `  {
    name: "${topic.name}",
    slug: "${topic.slug}",
    count: ${topic.count},
    blogs: [
${topic.blogs.map(blog => `      {
        title: "${blog.title}",
        slug: "${blog.slug}",
        publishDate: "${blog.publishDate}",
        service: "${blog.service}",
        location: "${blog.location}"
      }`).join(',\n')}
    ]
  }`).join(',\n')}
];
---

<BaseLayout title={title} description={description} pageType="website" breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <header class="mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Blog Topics</h1>
      <p class="text-xl text-gray-700 leading-relaxed">
        Explore our blog articles by topic. Find comprehensive guides on e-waste management, 
        recycling processes, legal requirements, and more.
      </p>
    </header>

    <section class="topics-section">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">Browse by Topic</h2>
      <div class="space-y-12">
        {topics.map(topic => (
          <div class="topic-section">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-2xl font-semibold text-gray-900">
                <a href={\`/blog/topic-\${topic.slug}/\`} class="text-amber-600 hover:text-amber-700">
                  {topic.name}
                </a>
              </h3>
              <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {topic.count} articles
              </span>
            </div>
            
            <div class="grid md:grid-cols-2 gap-4 mb-6">
              {topic.blogs.map(blog => (
                <article class="blog-item bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">
                      {new Date(blog.publishDate).toLocaleDateString('en-IN', { 
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-2">
                    <a href={\`/blog/\${blog.slug}/\`} class="text-amber-600 hover:text-amber-700">
                      {blog.title}
                    </a>
                  </h4>
                  <div class="flex gap-2">
                    <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {blog.service}
                    </span>
                    <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                      {blog.location}
                    </span>
                  </div>
                </article>
              ))}
            </div>
            
            <a href={\`/blog/topic-\${topic.slug}/\`} class="text-amber-600 hover:text-amber-700 font-medium">
              View all {topic.name.toLowerCase()} articles
            </a>
          </div>
        ))}
      </div>
    </section>
  </div>

  <style>
    .blog-item {
      transition: all 0.3s ease;
    }
    .blog-item:hover {
      transform: translateY(-1px);
    }
  </style>
</BaseLayout>`;
  }

  createServicesIndex() {
    const serviceData = Object.entries(this.analysis.services)
      .map(([service, count]) => ({
        name: service.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        slug: service,
        count: count,
        blogs: this.blogs.filter(blog => blog.service === service).slice(0, 6)
      }))
      .sort((a, b) => b.count - a.count);

    return `---
import BaseLayout from '../../layouts/BaseLayout.astro';

const title = "Blog Services - EWaste Kochi";
const description = "Explore our blog articles by service type. Find detailed guides on e-waste collection, laptop buyback, data destruction, and more.";

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog/" },
  { name: "Services", url: "/blog/services/" }
];

// Services data
const services = [
${serviceData.map(service => `  {
    name: "${service.name}",
    slug: "${service.slug}",
    count: ${service.count},
    blogs: [
${service.blogs.map(blog => `      {
        title: "${blog.title}",
        slug: "${blog.slug}",
        publishDate: "${blog.publishDate}",
        location: "${blog.location}",
        topic: "${blog.topic}"
      }`).join(',\n')}
    ]
  }`).join(',\n')}
];
---

<BaseLayout title={title} description={description} pageType="website" breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <header class="mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Blog Services</h1>
      <p class="text-xl text-gray-700 leading-relaxed">
        Explore our blog articles by service type. Find detailed guides on e-waste collection, 
        laptop buyback, data destruction, and more.
      </p>
    </header>

    <section class="services-section">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">Browse by Service</h2>
      <div class="space-y-12">
        {services.map(service => (
          <div class="service-section">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-2xl font-semibold text-gray-900">
                <a href={\`/blog/service-\${service.slug}/\`} class="text-amber-600 hover:text-amber-700">
                  {service.name}
                </a>
              </h3>
              <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {service.count} articles
              </span>
            </div>
            
            <div class="grid md:grid-cols-2 gap-4 mb-6">
              {service.blogs.map(blog => (
                <article class="blog-item bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">
                      {new Date(blog.publishDate).toLocaleDateString('en-IN', { 
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-2">
                    <a href={\`/blog/\${blog.slug}/\`} class="text-amber-600 hover:text-amber-700">
                      {blog.title}
                    </a>
                  </h4>
                  <div class="flex gap-2">
                    <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                      {blog.topic}
                    </span>
                    <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                      {blog.location}
                    </span>
                  </div>
                </article>
              ))}
            </div>
            
            <a href={\`/blog/service-\${service.slug}/\`} class="text-amber-600 hover:text-amber-700 font-medium">
              View all {service.name.toLowerCase()} articles
            </a>
          </div>
        ))}
      </div>
    </section>
  </div>

  <style>
    .blog-item {
      transition: all 0.3s ease;
    }
    .blog-item:hover {
      transform: translateY(-1px);
    }
  </style>
</BaseLayout>`;
  }

  createLocationsIndex() {
    const locationData = Object.entries(this.analysis.locations)
      .map(([location, count]) => ({
        name: location.charAt(0).toUpperCase() + location.slice(1),
        slug: location,
        count: count,
        blogs: this.blogs.filter(blog => blog.location === location).slice(0, 6)
      }))
      .sort((a, b) => b.count - a.count);

    return `---
import BaseLayout from '../../layouts/BaseLayout.astro';

const title = "Blog Locations - EWaste Kochi";
const description: "Explore our blog articles by location in Kerala. Find local e-waste management guides, recycling services, and ITAD solutions for your area.";

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog/" },
  { name: "Locations", url: "/blog/locations/" }
];

// Locations data
const locations = [
${locationData.map(location => `  {
    name: "${location.name}",
    slug: "${location.slug}",
    count: ${location.count},
    blogs: [
${location.blogs.map(blog => `      {
        title: "${blog.title}",
        slug: "${blog.slug}",
        publishDate: "${blog.publishDate}",
        service: "${blog.service}",
        topic: "${blog.topic}"
      }`).join(',\n')}
    ]
  }`).join(',\n')}
];
---

<BaseLayout title={title} description={description} pageType="website" breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <header class="mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Blog Locations</h1>
      <p class="text-xl text-gray-700 leading-relaxed">
        Explore our blog articles by location in Kerala. Find local e-waste management guides, 
        recycling services, and ITAD solutions for your area.
      </p>
    </header>

    <section class="locations-section">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">Browse by Location</h2>
      <div class="space-y-12">
        {locations.map(location => (
          <div class="location-section">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-2xl font-semibold text-gray-900">
                <a href={\`/blog/location-\${location.slug}/\`} class="text-amber-600 hover:text-amber-700">
                  {location.name}
                </a>
              </h3>
              <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {location.count} articles
              </span>
            </div>
            
            <div class="grid md:grid-cols-2 gap-4 mb-6">
              {location.blogs.map(blog => (
                <article class="blog-item bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">
                      {new Date(blog.publishDate).toLocaleDateString('en-IN', { 
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-2">
                    <a href={\`/blog/\${blog.slug}/\`} class="text-amber-600 hover:text-amber-700">
                      {blog.title}
                    </a>
                  </h4>
                  <div class="flex gap-2">
                    <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {blog.service}
                    </span>
                    <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                      {blog.topic}
                    </span>
                  </div>
                </article>
              ))}
            </div>
            
            <a href={\`/blog/location-\${location.slug}/\`} class="text-amber-600 hover:text-amber-700 font-medium">
              View all {location.name} articles
            </a>
          </div>
        ))}
      </div>
    </section>
  </div>

  <style>
    .blog-item {
      transition: all 0.3s ease;
    }
    .blog-item:hover {
      transform: translateY(-1px);
    }
  </style>
</BaseLayout>`;
  }

  saveAllPages() {
    const pagesDir = path.join(__dirname, '../../src/pages/blog');
    
    // Ensure directory exists
    if (!fs.existsSync(pagesDir)) {
      fs.mkdirSync(pagesDir, { recursive: true });
    }

    // Create main blog index
    const mainIndex = this.createMainBlogIndex();
    fs.writeFileSync(path.join(pagesDir, 'index.astro'), mainIndex);
    console.log('Created: /src/pages/blog/index.astro');

    // Create archive index
    const archiveIndex = this.createArchiveIndex();
    fs.writeFileSync(path.join(pagesDir, 'archives.astro'), archiveIndex);
    console.log('Created: /src/pages/blog/archives.astro');

    // Create topics index
    const topicsIndex = this.createTopicsIndex();
    fs.writeFileSync(path.join(pagesDir, 'topics.astro'), topicsIndex);
    console.log('Created: /src/pages/blog/topics.astro');

    // Create services index
    const servicesIndex = this.createServicesIndex();
    fs.writeFileSync(path.join(pagesDir, 'services.astro'), servicesIndex);
    console.log('Created: /src/pages/blog/services.astro');

    // Create locations index
    const locationsIndex = this.createLocationsIndex();
    fs.writeFileSync(path.join(pagesDir, 'locations.astro'), locationsIndex);
    console.log('Created: /src/pages/blog/locations.astro');
  }
}

// Create all blog index pages
const creator = new BlogIndexCreator();
creator.saveAllPages();

console.log('\nBlog index and archive pages created successfully!');
console.log('Pages created:');
console.log('- Main blog index (/blog/)');
console.log('- Archives index (/blog/archives/)');
console.log('- Topics index (/blog/topics/)');
console.log('- Services index (/blog/services/)');
console.log('- Locations index (/blog/locations/)');
