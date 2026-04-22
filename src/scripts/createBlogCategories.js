import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load blog index and data
const blogIndex = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/blog-index.json'), 'utf8'));
const blogData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/blog-structures.json'), 'utf8'));

class BlogCategoryGenerator {
  constructor() {
    this.locations = blogData.locations;
    this.services = blogData.services;
    this.topics = blogData.topics;
    this.categories = new Map();
    this.tags = new Map();
  }

  generateCategories() {
    console.log('Generating blog categories and tags...');
    
    // Process all blogs to extract categories and tags
    blogIndex.forEach(blog => {
      // Add to topic category
      if (!this.categories.has(blog.topic)) {
        this.categories.set(blog.topic, {
          name: blog.topic,
          slug: blog.topic.toLowerCase().replace(/\s+/g, '-'),
          description: this.getCategoryDescription(blog.topic),
          count: 0,
          blogs: []
        });
      }
      this.categories.get(blog.topic).count++;
      this.categories.get(blog.topic).blogs.push(blog);

      // Add service tags
      const serviceTag = blog.service;
      if (!this.tags.has(serviceTag)) {
        this.tags.set(serviceTag, {
          name: serviceTag,
          slug: serviceTag.toLowerCase().replace(/\s+/g, '-'),
          description: this.getServiceDescription(serviceTag),
          count: 0,
          blogs: []
        });
      }
      this.tags.get(serviceTag).count++;
      this.tags.get(serviceTag).blogs.push(blog);

      // Add location tags
      const locationTag = blog.location;
      if (!this.tags.has(locationTag)) {
        this.tags.set(locationTag, {
          name: locationTag,
          slug: locationTag.toLowerCase().replace(/\s+/g, '-'),
          description: this.getLocationDescription(locationTag),
          count: 0,
          blogs: []
        });
      }
      this.tags.get(locationTag).count++;
      this.tags.get(locationTag).blogs.push(blog);
    });

    console.log(`Generated ${this.categories.size} categories and ${this.tags.size} tags`);
  }

  getCategoryDescription(topic) {
    const descriptions = {
      'how-to': 'Step-by-step guides and tutorials for e-waste management, recycling processes, and proper disposal methods.',
      'pricing': 'Comprehensive pricing guides, cost breakdowns, and affordable options for e-waste services.',
      'comparison': 'Detailed comparisons between different e-waste services, providers, and disposal methods.',
      'legal': 'Legal requirements, compliance guidelines, and regulatory information for e-waste management.',
      'benefits': 'Environmental and economic benefits of proper e-waste recycling and responsible disposal.',
      'troubleshooting': 'Common issues, problems, and solutions related to e-waste management and recycling.',
      'seasonal': 'Seasonal trends, timing considerations, and period-specific e-waste management tips.',
      'business': 'Corporate and business-focused e-waste solutions, ITAD services, and enterprise recycling.'
    };
    return descriptions[topic] || 'Articles and guides related to e-waste management and recycling.';
  }

  getServiceDescription(service) {
    const serviceDescriptions = {
      'e-waste-collection': 'Professional e-waste collection services, pickup solutions, and electronic waste gathering.',
      'laptop-buyback': 'Laptop buyback programs, used laptop selling, and computer trade-in services.',
      'phone-buyback': 'Mobile phone buyback services, smartphone selling, and device trade-in programs.',
      'data-destruction': 'Secure data destruction, hard drive shredding, and confidential data disposal.',
      'itad': 'IT Asset Disposition services, corporate e-waste management, and enterprise recycling.',
      'battery-recycling': 'Battery disposal services, power cell recycling, and energy storage solutions.',
      'server-recycling': 'Server disposal, data center recycling, and enterprise hardware management.',
      'monitor-recycling': 'Display recycling, screen disposal, and monitor e-waste management.',
      'printer-recycling': 'Office equipment recycling, printer disposal, and peripheral device management.',
      'cable-recycling': 'Wire recycling, cable disposal, and electronic component recovery.'
    };
    return serviceDescriptions[service] || 'E-waste management and recycling services.';
  }

  getLocationDescription(location) {
    const locationData = this.locations.find(l => l.slug === location);
    if (locationData) {
      return `E-waste services, recycling solutions, and electronic disposal options in ${locationData.name}, Kerala. Serving areas including ${locationData.landmarks.join(', ')}.`;
    }
    return `E-waste management and recycling services in ${location}.`;
  }

  generateCategoryPages() {
    console.log('Generating category pages...');
    
    const pagesDir = path.join(__dirname, '../../src/pages/blog');
    
    // Ensure directory exists
    if (!fs.existsSync(pagesDir)) {
      fs.mkdirSync(pagesDir, { recursive: true });
    }

    // Generate category index page
    const categoryIndex = this.generateCategoryIndex();
    fs.writeFileSync(path.join(pagesDir, 'categories.astro'), categoryIndex);

    // Generate individual category pages
    this.categories.forEach((category) => {
      const categoryPage = this.generateCategoryPage(category);
      fs.writeFileSync(path.join(pagesDir, `category-${category.slug}.astro`), categoryPage);
    });

    // Generate tag pages
    this.tags.forEach((tag) => {
      const tagPage = this.generateTagPage(tag);
      fs.writeFileSync(path.join(pagesDir, `tag-${tag.slug}.astro`), tagPage);
    });

    console.log(`Created ${this.categories.size} category pages and ${this.tags.size} tag pages`);
  }

  generateCategoryIndex() {
    return `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

const title = "Blog Categories - EWaste Kochi";
const description = "Explore our comprehensive blog categories covering e-waste management, recycling services, and environmental solutions in Kerala.";

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog/" },
  { name: "Categories", url: "/blog/categories/" }
];

// Get all categories with counts
const categories = [
${Array.from(this.categories.values()).map(cat => `  {
    name: "${cat.name}",
    slug: "${cat.slug}",
    description: "${cat.description}",
    count: ${cat.count},
    url: "/blog/category-${cat.slug}/"
  }`).join(',\n')}
];

// Get popular tags
const popularTags = [
${Array.from(this.tags.values())
  .sort((a, b) => b.count - a.count)
  .slice(0, 10)
  .map(tag => `  {
    name: "${tag.name}",
    slug: "${tag.slug}",
    count: ${tag.count},
    url: "/blog/tag-${tag.slug}/"
  }`).join(',\n')}
];
---

<BaseLayout title={title} description={description} pageType="website" breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <header class="mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Blog Categories</h1>
      <p class="text-xl text-gray-700 leading-relaxed">
        Explore our comprehensive blog categories covering e-waste management, recycling services, and environmental solutions in Kerala.
      </p>
    </header>

    <section class="categories-section mb-12">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">Browse by Category</h2>
      <div class="grid md:grid-cols-2 gap-6">
        {categories.map(category => (
          <article class="category-card bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              <a href={category.url} class="text-amber-600 hover:text-amber-700">
                {category.name}
              </a>
            </h3>
            <p class="text-gray-700 mb-4">{category.description}</p>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500">{category.count} articles</span>
              <a href={category.url} class="text-amber-600 hover:text-amber-700 font-medium">
                View all articles
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>

    <section class="popular-tags-section">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">Popular Tags</h2>
      <div class="flex flex-wrap gap-3">
        {popularTags.map(tag => (
          <a 
            href={tag.url} 
            class="px-4 py-2 bg-amber-100 text-amber-800 rounded-full hover:bg-amber-200 transition-colors"
          >
            {tag.name} ({tag.count})
          </a>
        ))}
      </div>
    </section>
  </div>

  <style>
    .category-card {
      transition: all 0.3s ease;
    }
    .category-card:hover {
      transform: translateY(-2px);
    }
  </style>
</BaseLayout>`;
  }

  generateCategoryPage(category) {
    const recentBlogs = category.blogs
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
      .slice(0, 10);

    return `---
import BaseLayout from '../../layouts/BaseLayout.astro';

const title = "${category.name} Articles - EWaste Kochi";
const description = "${category.description}";

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog/" },
  { name: "Categories", url: "/blog/categories/" },
  { name: "${category.name}", url: "/blog/category-${category.slug}/" }
];

// Get category blogs
const categoryBlogs = [
${recentBlogs.map(blog => `  {
    title: "${blog.title}",
    slug: "${blog.slug}",
    publishDate: "${blog.publishDate}",
    description: "${blog.description}",
    service: "${blog.service}",
    location: "${blog.location}"
  }`).join(',\n')}
];

// Get related categories
const relatedCategories = [
${Array.from(this.categories.values())
  .filter(cat => cat.slug !== category.slug)
  .slice(0, 5)
  .map(cat => `  {
    name: "${cat.name}",
    slug: "${cat.slug}",
    count: ${cat.count},
    url: "/blog/category-${cat.slug}/"
  }`).join(',\n')}
];
---

<BaseLayout title={title} description={description} pageType="website" breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <header class="mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">${category.name}</h1>
      <p class="text-xl text-gray-700 leading-relaxed mb-4">
        ${category.description}
      </p>
      <div class="bg-amber-50 p-4 rounded-lg">
        <p class="text-amber-800 font-medium">
          <span class="font-bold">{category.blogs.length}</span> articles in this category
        </p>
      </div>
    </header>

    <section class="blog-list mb-12">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">Recent Articles</h2>
      <div class="space-y-6">
        {categoryBlogs.map(blog => (
          <article class="blog-card bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between mb-3">
              <span class="text-sm text-gray-500">
                {new Date(blog.publishDate).toLocaleDateString('en-IN', { 
                  year: 'numeric', 
                  month: 'long', 
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
            <a 
              href={\`/blog/\${blog.slug}/\`} 
              class="text-amber-600 hover:text-amber-700 font-medium"
            >
              Read more
            </a>
          </article>
        ))}
      </div>
    </section>

    <section class="related-categories">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Related Categories</h2>
      <div class="grid md:grid-cols-3 gap-4">
        {relatedCategories.map(category => (
          <a 
            href={category.url} 
            class="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <h3 class="font-semibold text-gray-900 mb-2">{category.name}</h3>
            <p class="text-sm text-gray-600">{category.count} articles</p>
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
  }

  generateTagPage(tag) {
    const recentBlogs = tag.blogs
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
      .slice(0, 10);

    return `---
import BaseLayout from '../../layouts/BaseLayout.astro';

const title = "${tag.name} Articles - EWaste Kochi";
const description = "${tag.description}";

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog/" },
  { name: "${tag.name}", url: "/blog/tag-${tag.slug}/" }
];

// Get tag blogs
const tagBlogs = [
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

// Get related tags
const relatedTags = [
${Array.from(this.tags.values())
  .filter(t => t.slug !== tag.slug)
  .sort((a, b) => b.count - a.count)
  .slice(0, 8)
  .map(t => `  {
    name: "${t.name}",
    slug: "${t.slug}",
    count: ${t.count},
    url: "/blog/tag-${t.slug}/"
  }`).join(',\n')}
];
---

<BaseLayout title={title} description={description} pageType="website" breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <header class="mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">${tag.name}</h1>
      <p class="text-xl text-gray-700 leading-relaxed mb-4">
        ${tag.description}
      </p>
      <div class="bg-amber-50 p-4 rounded-lg">
        <p class="text-amber-800 font-medium">
          <span class="font-bold">{tag.blogs.length}</span> articles tagged with "${tag.name}"
        </p>
      </div>
    </header>

    <section class="blog-list mb-12">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">Recent Articles</h2>
      <div class="space-y-6">
        {tagBlogs.map(blog => (
          <article class="blog-card bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between mb-3">
              <span class="text-sm text-gray-500">
                {new Date(blog.publishDate).toLocaleDateString('en-IN', { 
                  year: 'numeric', 
                  month: 'long', 
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
            <a 
              href={\`/blog/\${blog.slug}/\`} 
              class="text-amber-600 hover:text-amber-700 font-medium"
            >
              Read more
            </a>
          </article>
        ))}
      </div>
    </section>

    <section class="related-tags">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Related Tags</h2>
      <div class="flex flex-wrap gap-3">
        {relatedTags.map(tag => (
          <a 
            href={tag.url} 
            class="px-4 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors"
          >
            {tag.name} ({tag.count})
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
  }

  generate() {
    this.generateCategories();
    this.generateCategoryPages();
    
    // Save category and tag data for sitemap
    const categoryData = {
      categories: Array.from(this.categories.values()).map(cat => ({
        name: cat.name,
        slug: cat.slug,
        count: cat.count,
        url: `/blog/category-${cat.slug}/`
      })),
      tags: Array.from(this.tags.values()).map(tag => ({
        name: tag.name,
        slug: tag.slug,
        count: tag.count,
        url: `/blog/tag-${tag.slug}/`
      }))
    };
    
    fs.writeFileSync(
      path.join(__dirname, '../../data/blog-categories.json'),
      JSON.stringify(categoryData, null, 2)
    );
    
    console.log('Blog categories and tags generated successfully!');
    console.log(`Created ${categoryData.categories.length} category pages`);
    console.log(`Created ${categoryData.tags.length} tag pages`);
  }
}

// Generate categories and tags
const generator = new BlogCategoryGenerator();
generator.generate();
