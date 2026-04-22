import fs from 'fs';
import path from 'path';

// Load existing blog index
const blogIndex = JSON.parse(fs.readFileSync('./data/blog-index.json', 'utf8'));

function createTopicsIndex() {
  const topics = [...new Set(blogIndex.map(blog => blog.topic))];
  
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
${topics.map(topic => {
  const topicBlogs = blogIndex.filter(blog => blog.topic === topic).slice(0, 6);
  return `  {
    name: "${topic.charAt(0).toUpperCase() + topic.slice(1)}",
    slug: "${topic}",
    count: ${blogIndex.filter(blog => blog.topic === topic).length},
    blogs: [
${topicBlogs.map(blog => `      {
        title: "${blog.title}",
        slug: "${blog.slug}",
        publishDate: "${blog.publishDate}",
        service: "${blog.service}",
        location: "${blog.location}"
      }`).join(',\n')}
    ]
  }`;
}).join(',\n')}
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

function createServicesIndex() {
  const services = [...new Set(blogIndex.map(blog => blog.service))];
  
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
${services.map(service => {
  const serviceBlogs = blogIndex.filter(blog => blog.service === service).slice(0, 6);
  const serviceName = service.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return `  {
    name: "${serviceName}",
    slug: "${service}",
    count: ${blogIndex.filter(blog => blog.service === service).length},
    blogs: [
${serviceBlogs.map(blog => `      {
        title: "${blog.title}",
        slug: "${blog.slug}",
        publishDate: "${blog.publishDate}",
        location: "${blog.location}",
        topic: "${blog.topic}"
      }`).join(',\n')}
    ]
  }`;
}).join(',\n')}
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

function createLocationsIndex() {
  const locations = [...new Set(blogIndex.map(blog => blog.location))];
  
  return `---
import BaseLayout from '../../layouts/BaseLayout.astro';

const title = "Blog Locations - EWaste Kochi";
const description = "Explore our blog articles by location in Kerala. Find local e-waste management guides, recycling services, and ITAD solutions for your area.";

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog/" },
  { name: "Locations", url: "/blog/locations/" }
];

// Locations data
const locations = [
${locations.map(location => {
  const locationBlogs = blogIndex.filter(blog => blog.location === location).slice(0, 6);
  const locationName = location.charAt(0).toUpperCase() + location.slice(1);
  return `  {
    name: "${locationName}",
    slug: "${location}",
    count: ${blogIndex.filter(blog => blog.location === location).length},
    blogs: [
${locationBlogs.map(blog => `      {
        title: "${blog.title}",
        slug: "${blog.slug}",
        publishDate: "${blog.publishDate}",
        service: "${blog.service}",
        topic: "${blog.topic}"
      }`).join(',\n')}
    ]
  }`;
}).join(',\n')}
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

// Create all index pages
fs.writeFileSync('./src/pages/blog/topics.astro', createTopicsIndex());
console.log('Created: src/pages/blog/topics.astro');

fs.writeFileSync('./src/pages/blog/services.astro', createServicesIndex());
console.log('Created: src/pages/blog/services.astro');

fs.writeFileSync('./src/pages/blog/locations.astro', createLocationsIndex());
console.log('Created: src/pages/blog/locations.astro');
