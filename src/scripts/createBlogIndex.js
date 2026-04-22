import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load blog index and data
const blogIndex = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/blog-index.json'), 'utf8'));
const blogData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/blog-structures.json'), 'utf8'));

class BlogIndexGenerator {
  constructor() {
    this.locations = blogData.locations;
    this.services = blogData.services;
    this.topics = blogData.topics;
    this.brands = blogData.brands;
  }

  generateBlogIndex() {
    console.log('Creating comprehensive blog index and archive pages...');
    
    const pagesDir = path.join(__dirname, '../../src/pages/blog');
    
    // Ensure directory exists
    if (!fs.existsSync(pagesDir)) {
      fs.mkdirSync(pagesDir, { recursive: true });
    }

    // Generate main blog index page
    const blogIndexPage = this.generateMainBlogIndex();
    fs.writeFileSync(path.join(pagesDir, 'index.astro'), blogIndexPage);

    // Generate archive pages by year and month
    this.generateArchivePages(pagesDir);

    // Generate service-specific blog indexes
    this.generateServiceIndexes(pagesDir);

    // Generate location-specific blog indexes
    this.generateLocationIndexes(pagesDir);

    console.log('Blog index and archive pages created successfully!');
  }

  generateMainBlogIndex() {
    const recentBlogs = blogIndex
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
      .slice(0, 12);

    const featuredBlogs = blogIndex
      .filter(blog => blog.topic === 'how-to' || blog.topic === 'benefits')
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
      .slice(0, 6);

    const popularBlogs = blogIndex
      .sort((a, b) => Math.random() - 0.5) // Random selection for demo
      .slice(0, 8);

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
    description: "${blog.description}",
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
    description: "${blog.description}",
    service: "${blog.service}",
    location: "${blog.location}"
  }`).join(',\n')}
];

// Popular articles
const popularBlogs = [
${popularBlogs.map(blog => `  {
    title: "${blog.title}",
    slug: "${blog.slug}",
    publishDate: "${blog.publishDate}",
    description: "${blog.description}",
    service: "${blog.service}",
    location: "${blog.location}"
  }`).join(',\n')}
];

// Blog statistics
const totalBlogs = ${blogIndex.length};
const totalServices = ${this.services.length};
const totalLocations = ${this.locations.length};
const totalTopics = ${this.topics.length};
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
            <p class="text-gray-700 mb-4 line-clamp-3">{blog.description}</p>
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
            <p class="text-gray-700 mb-4 line-clamp-3">{blog.description}</p>
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

    <!-- Popular Articles -->
    <section class="popular-section mb-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">Popular Articles</h2>
      <div class="grid md:grid-cols-2 gap-6">
        {popularBlogs.map(blog => (
          <article class="popular-card bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">
                  <a href={\`/blog/\${blog.slug}/\`} class="text-amber-600 hover:text-amber-700">
                    {blog.title}
                  </a>
                </h3>
                <p class="text-gray-700 mb-3 line-clamp-2">{blog.description}</p>
                <div class="flex items-center justify-between">
                  <div class="flex gap-2">
                    <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {blog.service}
                    </span>
                    <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                      {blog.location}
                    </span>
                  </div>
                  <span class="text-sm text-gray-500">
                    {new Date(blog.publishDate).toLocaleDateString('en-IN', { 
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>

    <!-- Quick Links -->
    <section class="quick-links-section">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Explore by Category</h2>
      <div class="grid md:grid-cols-3 gap-4">
        <a href="/blog/categories/" class="block p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
          <h3 class="font-semibold text-amber-800 mb-2">All Categories</h3>
          <p class="text-amber-700 text-sm">Browse articles by topic and category</p>
        </a>
        <a href="/blog/archives/" class="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
          <h3 class="font-semibold text-blue-800 mb-2">Monthly Archives</h3>
          <p class="text-blue-700 text-sm">View articles by date and time</p>
        </a>
        <a href="/blog/tags/" class="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
          <h3 class="font-semibold text-green-800 mb-2">Popular Tags</h3>
          <p class="text-green-700 text-sm">Explore by services and locations</p>
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
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  </style>
</BaseLayout>`;
  }

  generateArchivePages(pagesDir) {
    // Group blogs by year and month
    const archives = {};
    
    blogIndex.forEach(blog => {
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

    // Generate main archive page
    const archiveIndex = this.generateArchiveIndex(archives);
    fs.writeFileSync(path.join(pagesDir, 'archives.astro'), archiveIndex);

    // Generate yearly archive pages
    Object.keys(archives).forEach(year => {
      const yearPage = this.generateYearArchive(year, archives[year]);
      fs.writeFileSync(path.join(pagesDir, `archive-${year}.astro`), yearPage);
    });
  }

  generateArchiveIndex(archives) {
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

  generateYearArchive(year, yearData) {
    const months = Object.keys(yearData).sort((a, b) => b - a);
    
    return `---
import BaseLayout from '../../layouts/BaseLayout.astro';

const title = "Blog Archives: ${year} - EWaste Kochi";
const description = "Browse our ${year} blog archives. Find e-waste management guides, recycling tips, and ITAD solutions published in ${year}.";

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog/" },
  { name: "Archives", url: "/blog/archives/" },
  { name: "${year}", url: "/blog/archive-${year}/" }
];

// Year data
const yearBlogs = [
${months.flatMap(month => yearData[month]).map(blog => `  {
    title: "${blog.title}",
    slug: "${blog.slug}",
    publishDate: "${blog.publishDate}",
    description: "${blog.description}",
    service: "${blog.service}",
    location: "${blog.location}",
    topic: "${blog.topic}"
  }`).join(',\n')}
];

// Monthly breakdown
const months = [
${months.map(month => `  {
    month: ${month},
    name: "${new Date(year, month - 1).toLocaleDateString('en-US', { month: 'long' })}",
    count: ${yearData[month].length},
    blogs: [
${yearData[month].map(blog => `      {
        title: "${blog.title}",
        slug: "${blog.slug}",
        publishDate: "${blog.publishDate}",
        description: "${blog.description}"
      }`).join(',\n')}
    ]
  }`).join(',\n')}
];
---

<BaseLayout title={title} description={description} pageType="website" breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <header class="mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Blog Archives: ${year}</h1>
      <p class="text-xl text-gray-700 leading-relaxed">
        Browse our ${year} blog archives. Find e-waste management guides, recycling tips, 
        and ITAD solutions published in ${year}.
      </p>
    </header>

    <section class="year-section">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">Monthly Breakdown</h2>
      <div class="space-y-8">
        {months.map(month => (
          <div class="month-section">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-semibold text-gray-900">
                {month.name} ${year}
              </h3>
              <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {month.count} articles
              </span>
            </div>
            <div class="space-y-4">
              {month.blogs.map(blog => (
                <article class="blog-item bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">
                      {new Date(blog.publishDate).toLocaleDateString('en-IN', { 
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <div class="flex gap-2">
                      <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                        {blog.topic}
                      </span>
                    </div>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-2">
                    <a href={\`/blog/\${blog.slug}/\`} class="text-amber-600 hover:text-amber-700">
                      {blog.title}
                    </a>
                  </h4>
                  <p class="text-gray-700 mb-3">{blog.description}</p>
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
          </div>
        ))}
      </div>
    </section>
  </div>
</BaseLayout>`;
  }

  generateServiceIndexes(pagesDir) {
    this.services.forEach(service => {
      const serviceBlogs = blogIndex.filter(blog => blog.service === service.slug);
      const servicePage = this.generateServiceIndex(service, serviceBlogs);
      fs.writeFileSync(path.join(pagesDir, `service-${service.slug}.astro`), servicePage);
    });
  }

  generateServiceIndex(service, serviceBlogs) {
    const recentBlogs = serviceBlogs
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
      .slice(0, 12);

    return `---
import BaseLayout from '../../layouts/BaseLayout.astro';

const title = "${service.name} Articles - EWaste Kochi";
const description = "Expert guides and articles on ${service.name.toLowerCase()} in Kerala. Learn about pricing, process, and best practices for ${service.name.toLowerCase()}.";

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog/" },
  { name: "${service.name}", url: "/blog/service-${service.slug}/" }
];

// Service blogs
const serviceBlogs = [
${recentBlogs.map(blog => `  {
    title: "${blog.title}",
    slug: "${blog.slug}",
    publishDate: "${blog.publishDate}",
    description: "${blog.description}",
    location: "${blog.location}",
    topic: "${blog.topic}"
  }`).join(',\n')}
];

// Service statistics
const totalArticles = ${serviceBlogs.length};
const locations = [...new Set(serviceBlogs.map(blog => blog.location))];
---

<BaseLayout title={title} description={description} pageType="website" breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <header class="mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">${service.name} Articles</h1>
      <p class="text-xl text-gray-700 leading-relaxed mb-4">
        Expert guides and articles on ${service.name.toLowerCase()} in Kerala. 
        Learn about pricing, process, and best practices for ${service.name.toLowerCase()}.
      </p>
      <div class="bg-amber-50 p-4 rounded-lg">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <span class="font-bold text-amber-800">{totalArticles}</span>
            <span class="text-amber-700"> articles</span>
          </div>
          <div>
            <span class="font-bold text-amber-800">{locations.length}</span>
            <span class="text-amber-700"> locations</span>
          </div>
        </div>
      </div>
    </header>

    <section class="blog-list">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">Recent Articles</h2>
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
  }

  generateLocationIndexes(pagesDir) {
    this.locations.forEach(location => {
      const locationBlogs = blogIndex.filter(blog => blog.location === location.slug);
      const locationPage = this.generateLocationIndex(location, locationBlogs);
      fs.writeFileSync(path.join(pagesDir, `location-${location.slug}.astro`), locationPage);
    });
  }

  generateLocationIndex(location, locationBlogs) {
    const recentBlogs = locationBlogs
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
      .slice(0, 12);

    return `---
import BaseLayout from '../../layouts/BaseLayout.astro';

const title = "${location.name} Articles - EWaste Kochi";
const description = "E-waste management guides and articles for ${location.name}. Find local recycling services, pickup options, and environmental solutions in ${location.name}.";

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog/" },
  { name: "${location.name}", url: "/blog/location-${location.slug}/" }
];

// Location blogs
const locationBlogs = [
${recentBlogs.map(blog => `  {
    title: "${blog.title}",
    slug: "${blog.slug}",
    publishDate: "${blog.publishDate}",
    description: "${blog.description}",
    service: "${blog.service}",
    topic: "${blog.topic}"
  }`).join(',\n')}
];

// Location statistics
const totalArticles = ${locationBlogs.length};
const services = [...new Set(locationBlogs.map(blog => blog.service))];
---

<BaseLayout title={title} description={description} pageType="website" breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <header class="mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">${location.name} Articles</h1>
      <p class="text-xl text-gray-700 leading-relaxed mb-4">
        E-waste management guides and articles for ${location.name}. Find local recycling services, 
        pickup options, and environmental solutions in ${location.name}.
      </p>
      <div class="bg-blue-50 p-4 rounded-lg">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <span class="font-bold text-blue-800">{totalArticles}</span>
            <span class="text-blue-700"> articles</span>
          </div>
          <div>
            <span class="font-bold text-blue-800">{services.length}</span>
            <span class="text-blue-700"> services</span>
          </div>
        </div>
      </div>
    </header>

    <section class="blog-list">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">Recent Articles</h2>
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
                <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                  {blog.topic}
                </span>
                <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                  {blog.service}
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
  }
}

// Generate blog index and archive pages
const generator = new BlogIndexGenerator();
generator.generateBlogIndex();

console.log('Blog index and archive pages generated successfully!');
console.log('Created:');
console.log('- Main blog index page');
console.log('- Archive pages by year and month');
console.log('- Service-specific blog indexes');
console.log('- Location-specific blog indexes');
