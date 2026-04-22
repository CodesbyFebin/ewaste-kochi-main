import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load existing blog index and analysis
const blogIndex = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/blog-index.json'), 'utf8'));
const analysis = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/blog-analysis.json'), 'utf8'));

class InternalLinkingEnhancer {
  constructor() {
    this.blogs = blogIndex;
    this.analysis = analysis;
  }

  generateRelatedPosts(currentBlog) {
    const related = [];
    
    // Find blogs with same service
    const sameService = this.blogs.filter(blog => 
      blog.service === currentBlog.service && blog.slug !== currentBlog.slug
    ).slice(0, 3);
    
    // Find blogs with same location
    const sameLocation = this.blogs.filter(blog => 
      blog.location === currentBlog.location && blog.slug !== currentBlog.slug
    ).slice(0, 3);
    
    // Find blogs with same topic
    const sameTopic = this.blogs.filter(blog => 
      blog.topic === currentBlog.topic && blog.slug !== currentBlog.slug
    ).slice(0, 3);
    
    // Combine and deduplicate
    const allRelated = [...sameService, ...sameLocation, ...sameTopic];
    const uniqueRelated = allRelated.filter((blog, index, self) => 
      index === self.findIndex((b) => b.slug === blog.slug)
    );
    
    return uniqueRelated.slice(0, 6); // Return up to 6 related posts
  }

  createEnhancedBlogPost(blog) {
    const relatedPosts = this.generateRelatedPosts(blog);
    
    return `---
import BaseLayout from '../../../layouts/BaseLayout.astro';

const title = "${blog.title}";
const description = "${blog.description || ''}";
const publishDate = "${blog.publishDate}";
const category = "${blog.topic}";
const tags = ["${blog.service}", "${blog.location}"];
const service = "${blog.service}";
const location = "${blog.location}";

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog/" },
  { name: "${blog.topic.charAt(0).toUpperCase() + blog.topic.slice(1)}", url: "/blog/topic-${blog.topic}/" },
  { name: "${blog.title}", url: "/blog/${blog.slug}/" }
];

// Related posts
const relatedPosts = [
${relatedPosts.map(post => `  {
    title: "${post.title}",
    slug: "${post.slug}",
    publishDate: "${post.publishDate}",
    service: "${post.service}",
    location: "${post.location}",
    topic: "${post.topic}"
  }`).join(',\n')}
];

// Navigation links
const serviceLink = "/blog/service-${blog.service}/";
const locationLink = "/blog/location-${blog.location}/";
const topicLink = "/blog/topic-${blog.topic}/";
---

<BaseLayout title={title} description={description} pageType="blog" breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <article class="blog-post">
      <header class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <div class="flex gap-2">
            <a href={serviceLink} class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
              {service}
            </a>
            <a href={locationLink} class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium hover:bg-green-200 transition-colors">
              {location}
            </a>
            <a href={topicLink} class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors">
              {category}
            </a>
          </div>
          <time datetime={publishDate} class="text-gray-500">
            {new Date(publishDate).toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </time>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        <p class="text-xl text-gray-700 leading-relaxed">
          {description}
        </p>
      </header>

      <!-- Blog Content -->
      <div class="prose prose-lg max-w-none mb-12">
        <slot />
      </div>

      <!-- Navigation and Related Posts -->
      <footer class="border-t pt-8">
        <!-- Category Navigation -->
        <nav class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Browse More</h2>
          <div class="grid md:grid-cols-3 gap-4">
            <a href={serviceLink} class="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <h3 class="font-semibold text-blue-800 mb-2">
                More {service.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </h3>
              <p class="text-blue-700 text-sm">Explore similar services</p>
            </a>
            <a href={locationLink} class="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <h3 class="font-semibold text-green-800 mb-2">
                {location.charAt(0).toUpperCase() + location.slice(1)} Articles
              </h3>
              <p class="text-green-700 text-sm">Local guides and tips</p>
            </a>
            <a href={topicLink} class="block p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <h3 class="font-semibold text-purple-800 mb-2">
                {category.charAt(0).toUpperCase() + category.slice(1)} Guides
              </h3>
              <p class="text-purple-700 text-sm">Learn more about {category.toLowerCase()}</p>
            </a>
          </div>
        </nav>

        <!-- Related Posts -->
        {relatedPosts.length > 0 && (
          <section class="related-posts">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Related Articles</h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map(post => (
                <article class="related-post bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">
                      {new Date(post.publishDate).toLocaleDateString('en-IN', { 
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                    <div class="flex gap-2">
                      <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {post.service}
                      </span>
                      <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                        {post.location}
                      </span>
                    </div>
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">
                    <a href={\`/blog/\${post.slug}/\`} class="text-amber-600 hover:text-amber-700">
                      {post.title}
                    </a>
                  </h3>
                  <div class="flex gap-2">
                    <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                      {post.topic}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <!-- Back to Blog -->
        <div class="mt-8 text-center">
          <a href="/blog/" class="inline-flex items-center px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </a>
        </div>
      </footer>
    </article>
  </div>

  <style>
    .blog-post {
      line-height: 1.7;
    }
    
    .prose h2 {
      @apply text-2xl font-bold text-gray-900 mt-8 mb-4;
    }
    
    .prose h3 {
      @apply text-xl font-semibold text-gray-900 mt-6 mb-3;
    }
    
    .prose p {
      @apply mb-4 text-gray-700;
    }
    
    .prose ul, .prose ol {
      @apply mb-4 pl-6;
    }
    
    .prose li {
      @apply mb-2 text-gray-700;
    }
    
    .prose blockquote {
      @apply border-l-4 border-amber-500 pl-4 italic text-gray-600 my-4;
    }
    
    .prose code {
      @apply bg-gray-100 px-2 py-1 rounded text-sm;
    }
    
    .prose pre {
      @apply bg-gray-100 p-4 rounded-lg overflow-x-auto;
    }
    
    .prose table {
      @apply w-full border-collapse border border-gray-300 my-4;
    }
    
    .prose th, .prose td {
      @apply border border-gray-300 px-4 py-2 text-left;
    }
    
    .prose th {
      @apply bg-gray-100 font-semibold;
    }
    
    .related-post {
      transition: all 0.3s ease;
    }
    
    .related-post:hover {
      transform: translateY(-2px);
    }
  </style>
</BaseLayout>`;
  }

  enhanceBlogLayout() {
    console.log('Enhancing blog layout with internal linking...');
    
    const layoutPath = path.join(__dirname, '../../src/layouts/BlogPost.astro');
    
    // Create enhanced layout template
    const enhancedLayout = `---
import BaseLayout from './BaseLayout.astro';

export interface Props {
  title: string;
  description: string;
  publishDate: string;
  category: string;
  tags: string[];
  service: string;
  location: string;
}

const { title, description, publishDate, category, tags, service, location } = Astro.props;

// Generate breadcrumbs
const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog/" },
  { name: category.charAt(0).toUpperCase() + category.slice(1), url: \`/blog/topic-\${category}/\` },
  { name: title, url: \`/blog/\${Astro.url.pathname.split('/').pop()}/\` }
];

// Navigation links
const serviceLink = \`/blog/service-\${service}/\`;
const locationLink = \`/blog/location-\${location}/\`;
const topicLink = \`/blog/topic-\${category}/\`;
---

<BaseLayout title={title} description={description} pageType="blog" breadcrumbs={breadcrumbs}>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <article class="blog-post">
      <header class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <div class="flex gap-2">
            <a href={serviceLink} class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
              {service.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </a>
            <a href={locationLink} class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium hover:bg-green-200 transition-colors">
              {location.charAt(0).toUpperCase() + location.slice(1)}
            </a>
            <a href={topicLink} class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </a>
          </div>
          <time datetime={publishDate} class="text-gray-500">
            {new Date(publishDate).toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </time>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        <p class="text-xl text-gray-700 leading-relaxed">
          {description}
        </p>
      </header>

      <!-- Blog Content -->
      <div class="prose prose-lg max-w-none mb-12">
        <slot />
      </div>

      <!-- Navigation -->
      <footer class="border-t pt-8">
        <nav class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Browse More</h2>
          <div class="grid md:grid-cols-3 gap-4">
            <a href={serviceLink} class="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <h3 class="font-semibold text-blue-800 mb-2">
                More {service.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </h3>
              <p class="text-blue-700 text-sm">Explore similar services</p>
            </a>
            <a href={locationLink} class="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <h3 class="font-semibold text-green-800 mb-2">
                {location.charAt(0).toUpperCase() + location.slice(1)} Articles
              </h3>
              <p class="text-green-700 text-sm">Local guides and tips</p>
            </a>
            <a href={topicLink} class="block p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <h3 class="font-semibold text-purple-800 mb-2">
                {category.charAt(0).toUpperCase() + category.slice(1)} Guides
              </h3>
              <p class="text-purple-700 text-sm">Learn more about {category.toLowerCase()}</p>
            </a>
          </div>
        </nav>

        <!-- Back to Blog -->
        <div class="mt-8 text-center">
          <a href="/blog/" class="inline-flex items-center px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </a>
        </div>
      </footer>
    </article>
  </div>

  <style>
    .blog-post {
      line-height: 1.7;
    }
    
    .prose h2 {
      @apply text-2xl font-bold text-gray-900 mt-8 mb-4;
    }
    
    .prose h3 {
      @apply text-xl font-semibold text-gray-900 mt-6 mb-3;
    }
    
    .prose p {
      @apply mb-4 text-gray-700;
    }
    
    .prose ul, .prose ol {
      @apply mb-4 pl-6;
    }
    
    .prose li {
      @apply mb-2 text-gray-700;
    }
    
    .prose blockquote {
      @apply border-l-4 border-amber-500 pl-4 italic text-gray-600 my-4;
    }
    
    .prose code {
      @apply bg-gray-100 px-2 py-1 rounded text-sm;
    }
    
    .prose pre {
      @apply bg-gray-100 p-4 rounded-lg overflow-x-auto;
    }
    
    .prose table {
      @apply w-full border-collapse border border-gray-300 my-4;
    }
    
    .prose th, .prose td {
      @apply border border-gray-300 px-4 py-2 text-left;
    }
    
    .prose th {
      @apply bg-gray-100 font-semibold;
    }
  </style>
</BaseLayout>`;

    fs.writeFileSync(layoutPath, enhancedLayout);
    console.log('Enhanced BlogPost.astro layout with internal linking');
  }

  createRelatedPostsComponent() {
    const componentPath = path.join(__dirname, '../../src/components/RelatedPosts.astro');
    
    const componentContent = `---
interface Props {
  currentService: string;
  currentLocation: string;
  currentTopic: string;
  currentSlug: string;
  limit?: number;
}

const { currentService, currentLocation, currentTopic, currentSlug, limit = 6 } = Astro.props;

// In a real implementation, you would fetch these from your data source
// For now, we'll use a static approach
const relatedPosts = [
  {
    title: "Complete Guide to E-Waste Management",
    slug: "complete-guide-to-e-waste-management",
    publishDate: "2025-04-20",
    service: "e-waste-collection",
    location: "kochi",
    topic: "how-to"
  },
  {
    title: "Best Laptop Buyback Services in Kerala",
    slug: "best-laptop-buyback-services-kerala",
    publishDate: "2025-04-18",
    service: "laptop-buyback",
    location: "ernakulam",
    topic: "comparison"
  },
  {
    title: "Data Destruction Process Explained",
    slug: "data-destruction-process-explained",
    publishDate: "2025-04-15",
    service: "data-destruction",
    location: "kalamassery",
    topic: "how-to"
  }
].filter(post => post.slug !== currentSlug).slice(0, limit);
---

{relatedPosts.length > 0 && (
  <section class="related-posts">
    <h2 class="text-xl font-semibold text-gray-900 mb-4">Related Articles</h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {relatedPosts.map(post => (
        <article class="related-post bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-gray-500">
              {new Date(post.publishDate).toLocaleDateString('en-IN', { 
                month: 'short',
                year: 'numeric'
              })}
            </span>
            <div class="flex gap-2">
              <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                {post.service}
              </span>
              <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                {post.location}
              </span>
            </div>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            <a href={\`/blog/\${post.slug}/\`} class="text-amber-600 hover:text-amber-700">
              {post.title}
            </a>
          </h3>
          <div class="flex gap-2">
            <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
              {post.topic}
            </span>
          </div>
        </article>
      ))}
    </div>
  </section>
)}

<style>
  .related-post {
    transition: all 0.3s ease;
  }
  
  .related-post:hover {
    transform: translateY(-2px);
  }
</style>`;

    fs.writeFileSync(componentPath, componentContent);
    console.log('Created RelatedPosts.astro component');
  }

  enhanceAll() {
    console.log('Enhancing internal linking across the blog system...');
    
    this.enhanceBlogLayout();
    this.createRelatedPostsComponent();
    
    console.log('\nInternal linking enhancements completed!');
    console.log('Enhancements include:');
    console.log('- Enhanced BlogPost.astro layout with navigation');
    console.log('- RelatedPosts.astro component for related content');
    console.log('- Category navigation (service, location, topic)');
    console.log('- Breadcrumb navigation');
    console.log('- Cross-linking between related posts');
  }
}

// Run internal linking enhancements
const enhancer = new InternalLinkingEnhancer();
enhancer.enhanceAll();
