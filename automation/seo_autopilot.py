import sys
import os
import json
import requests
from datetime import datetime, timedelta
from pathlib import Path

class GSCConnector:
    """Google Search Console API connector for fetching performance data"""
    
    def __init__(self, site_url):
        self.site_url = site_url
        self.api_key = os.getenv("GOOGLE_SEARCH_CONSOLE_API_KEY")
        self.service_account_key = os.getenv("GSC_SERVICE_ACCOUNT_KEY")
        
    def get_performance_data(self, days=28):
        """Fetch performance data from Google Search Console"""
        if not self.service_account_key:
            raise ValueError("GSC_SERVICE_ACCOUNT_KEY environment variable required")
            
        # Mock implementation - replace with actual GSC API call
        end_date = datetime.now().strftime('%Y-%m-%d')
        start_date = (datetime.now() - timedelta(days=days)).strftime('%Y-%m-%d')
        
        # This would be replaced with actual GSC API call
        return {
            'rows': [
                {'keys': ['/'], 'clicks': 150, 'impressions': 5000, 'ctr': 0.03, 'position': 3.2},
                {'keys': ['/services/laptop-recycling/'], 'clicks': 25, 'impressions': 800, 'ctr': 0.031, 'position': 5.1},
                {'keys': ['/locations/kakkanad/'], 'clicks': 8, 'impressions': 1200, 'ctr': 0.0067, 'position': 8.5},
                {'keys': ['/blog/e-waste-guide/'], 'clicks': 45, 'impressions': 600, 'ctr': 0.075, 'position': 2.8},
                {'keys': ['/services/data-destruction/'], 'clicks': 12, 'impressions': 1500, 'ctr': 0.008, 'position': 11.2}
            ]
        }

class AIRecommendationEngine:
    """AI-powered SEO recommendation engine"""
    
    def __init__(self, api_key=None):
        self.api_key = api_key or os.getenv("OPENAI_API_KEY")
        
    def generate_title_suggestions(self, page_url, current_title, current_description, ctr, position):
        """Generate AI-powered title and meta description suggestions"""
        if not self.api_key:
            return self._generate_fallback_suggestions(page_url, ctr, position)
            
        # This would be replaced with actual AI API call
        return {
            'title_suggestions': [
                f"E-Waste Recycling in Kochi | {self._extract_location(page_url)} Services",
                f"Professional Electronic Waste Disposal | {self._extract_service(page_url)}",
                f"Certified IT Asset Disposition | EWaste Kochi"
            ],
            'description_suggestions': [
                f"Professional e-waste recycling services in {self._extract_location(page_url)}. Free pickup, certified disposal, data destruction. Call now!",
                f"Electronic waste recycling and IT asset disposal in Kochi. Environmentally responsible, certified recycling services."
            ],
            'internal_link_suggestions': self._generate_internal_link_suggestions(page_url, position)
        }
    
    def _extract_location(self, url):
        """Extract location from URL for personalization"""
        if '/locations/' in url:
            return url.split('/locations/')[-1].replace('-', ' ').title()
        return 'Kochi'
    
    def _extract_service(self, url):
        """Extract service from URL for personalization"""
        if '/services/' in url:
            return url.split('/services/')[-1].replace('-', ' ').title()
        return 'E-Waste Recycling'
    
    def _generate_fallback_suggestions(self, url, ctr, position):
        """Generate fallback suggestions when AI is not available"""
        location = self._extract_location(url)
        service = self._extract_service(url)
        
        return {
            'title_suggestions': [
                f"{service} in {location} | EWaste Kochi",
                f"Professional {service.lower()} | {location} E-Waste",
                f"Certified Electronic Waste Recycling | {location}"
            ],
            'description_suggestions': [
                f"Professional {service.lower()} in {location}. Free pickup, certified recycling, data destruction. Call +91-9876543210.",
                f"Electronic waste disposal and IT asset recycling services in {location}. Environmentally responsible."
            ],
            'internal_link_suggestions': self._generate_internal_link_suggestions(url, position)
        }
    
    def _generate_internal_link_suggestions(self, url, position):
        """Generate internal linking suggestions based on position"""
        suggestions = []
        
        if position > 8:
            suggestions.extend([
                "Link from homepage hero section",
                "Add to main navigation menu",
                "Create dedicated blog post about this topic"
            ])
        
        if '/services/' in url:
            suggestions.extend([
                "Link from related service pages",
                "Add to location pages as available service",
                "Create FAQ cluster around this service"
            ])
        
        if '/locations/' in url:
            suggestions.extend([
                "Link from service pages as available location",
                "Add to service area pages",
                "Create location-specific blog content"
            ])
            
        return suggestions

class SEOAutopilot:
    def __init__(self, dry_run=False):
        self.site_url = "https://ewastekochi.com/"
        self.dry_run = dry_run
        self.ai_engine = AIRecommendationEngine()
        
        if not self.dry_run:
            self.connector = GSCConnector(self.site_url)
        
        # Configuration
        self.low_ctr_threshold = 0.02  # 2%
        self.min_impressions = 100
        self.striking_distance_min = 4
        self.striking_distance_max = 12

    def run(self):
        print("?? Starting AI SEO Autopilot...")
        
        # Fetch performance data
        if self.dry_run:
            print("?? DRY RUN MODE: Using mock data")
            rows = [
                {'keys': ['/recycling/'], 'clicks': 10, 'impressions': 2000, 'ctr': 0.005, 'position': 8.5},
                {'keys': ['/services/laptop-buyback-kochi/'], 'clicks': 5, 'impressions': 100, 'ctr': 0.05, 'position': 2.1},
                {'keys': ['/locations/kakkanad/'], 'clicks': 8, 'impressions': 1200, 'ctr': 0.0067, 'position': 8.5},
                {'keys': ['/blog/e-waste-guide/'], 'clicks': 45, 'impressions': 600, 'ctr': 0.075, 'position': 2.8},
                {'keys': ['/services/data-destruction/'], 'clicks': 12, 'impressions': 1500, 'ctr': 0.008, 'position': 11.2}
            ]
        else:
            print("?? Fetching Google Search Console data...")
            data = self.connector.get_performance_data()
            rows = data.get('rows', [])
        
        # Detect opportunities
        opportunities = self.detect_opportunities(rows)
        
        if not opportunities:
            print("?? No immediate SEO opportunities detected.")
            self.generate_success_report()
            return
        
        print(f"?? Found {len(opportunities)} SEO optimization opportunities")
        
        # Generate AI recommendations
        enriched_opportunities = self.enrich_opportunities_with_ai(opportunities)
        
        # Generate comprehensive report
        self.generate_comprehensive_report(enriched_opportunities)
        
        # Create optimization drafts
        if not self.dry_run:
            self.create_optimization_pull_requests(enriched_opportunities)
        else:
            print("?? DRY RUN: Skipping PR creation")
        
        # Ping Google about updates
        self.ping_google_sitemap()

    def detect_opportunities(self, rows):
        """Detect SEO opportunities from performance data"""
        opportunities = []
        
        for row in rows:
            page = row['keys'][0]
            clicks = row['clicks']
            impressions = row['impressions']
            ctr = row['ctr']
            position = row['position']
            
            # Opportunity 1: Low CTR (Impressions > 100, CTR < 2%)
            if impressions > self.min_impressions and ctr < self.low_ctr_threshold:
                opportunities.append({
                    'type': 'LOW_CTR',
                    'page': page,
                    'clicks': clicks,
                    'impressions': impressions,
                    'ctr': ctr,
                    'position': position,
                    'priority': 'HIGH' if ctr < 0.01 else 'MEDIUM',
                    'potential_impact': int(impressions * 0.02 - clicks)  # Potential clicks gained
                })
            
            # Opportunity 2: Striking Distance (Position between 4 and 12)
            elif self.striking_distance_min <= position <= self.striking_distance_max:
                opportunities.append({
                    'type': 'STRIKING_DISTANCE',
                    'page': page,
                    'clicks': clicks,
                    'impressions': impressions,
                    'ctr': ctr,
                    'position': position,
                    'priority': 'HIGH' if position <= 8 else 'MEDIUM',
                    'potential_impact': int(impressions * 0.15 - clicks)  # Estimated CTR at position 1-3
                })
        
        # Sort by priority and potential impact
        opportunities.sort(key=lambda x: (x['priority'] == 'HIGH', x['potential_impact']), reverse=True)
        
        return opportunities

    def enrich_opportunities_with_ai(self, opportunities):
        """Enrich opportunities with AI-powered recommendations"""
        enriched = []
        
        for opp in opportunities:
            print(f"?? Generating AI recommendations for {opp['page']}")
            
            # Get current page metadata (mock implementation)
            current_title, current_description = self.get_current_page_metadata(opp['page'])
            
            # Generate AI recommendations
            ai_recommendations = self.ai_engine.generate_title_suggestions(
                opp['page'], current_title, current_description, opp['ctr'], opp['position']
            )
            
            enriched_opp = {
                **opp,
                'current_title': current_title,
                'current_description': current_description,
                'ai_recommendations': ai_recommendations,
                'optimization_type': self.determine_optimization_type(opp),
                'estimated_effort': self.estimate_optimization_effort(opp)
            }
            
            enriched.append(enriched_opp)
        
        return enriched

    def get_current_page_metadata(self, page_url):
        """Get current page title and description (mock implementation)"""
        # This would fetch actual metadata from the page
        page_metadata = {
            '/': ('EWaste Kochi | Electronic Waste Recycling Services', 'Professional e-waste recycling and IT asset disposition services in Kochi, Kerala'),
            '/services/laptop-recycling/': ('Laptop Recycling Services | EWaste Kochi', 'Professional laptop recycling and data destruction services in Kochi'),
            '/locations/kakkanad/': ('E-Waste Recycling Kakkanad | EWaste Kochi', 'E-waste recycling and pickup services in Kakkanad, Kochi'),
            '/blog/e-waste-guide/': ('Complete E-Waste Guide 2026 | EWaste Kochi Blog', 'Comprehensive guide to electronic waste recycling and disposal in Kerala'),
            '/services/data-destruction/': ('Data Destruction Services | EWaste Kochi', 'Certified data destruction and secure IT asset disposal services')
        }
        
        return page_metadata.get(page_url, ('Page Title', 'Page description'))

    def determine_optimization_type(self, opportunity):
        """Determine the type of optimization needed"""
        if opportunity['type'] == 'LOW_CTR':
            return 'TITLE_META_OPTIMIZATION'
        elif opportunity['type'] == 'STRIKING_DISTANCE':
            return 'CONTENT_LINKING_OPTIMIZATION'
        else:
            return 'GENERAL_OPTIMIZATION'

    def estimate_optimization_effort(self, opportunity):
        """Estimate the effort required for optimization"""
        if opportunity['type'] == 'LOW_CTR':
            return 'LOW'  # Just title/meta changes
        elif opportunity['position'] <= 8:
            return 'MEDIUM'  # Some content and linking
        else:
            return 'HIGH'  # Significant content and linking work

    def generate_comprehensive_report(self, opportunities):
        """Generate comprehensive SEO optimization report"""
        report_path = "data/seo_autopilot_report.json"
        markdown_path = "data/seo_autopilot_report.md"
        
        # JSON report for API consumption
        report_data = {
            'generated_at': datetime.now().isoformat(),
            'site_url': self.site_url,
            'analysis_period': '28 days',
            'total_opportunities': len(opportunities),
            'high_priority_opportunities': len([o for o in opportunities if o['priority'] == 'HIGH']),
            'potential_total_impact': sum(o['potential_impact'] for o in opportunities),
            'opportunities': opportunities
        }
        
        # Ensure data directory exists
        Path('data').mkdir(exist_ok=True)
        
        with open(report_path, 'w') as f:
            json.dump(report_data, f, indent=2)
        
        # Markdown report for human readability
        self.generate_markdown_report(opportunities, markdown_path)
        
        print(f"?? Comprehensive report generated: {report_path}")
        print(f"?? Markdown report generated: {markdown_path}")

    def generate_markdown_report(self, opportunities, output_path):
        """Generate markdown report for human readability"""
        with open(output_path, 'w') as f:
            f.write("# ?? AI SEO Autopilot Report\n\n")
            f.write(f"**Generated:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write(f"**Analysis Period:** Last 28 days\n")
            f.write(f"**Total Opportunities:** {len(opportunities)}\n")
            f.write(f"**High Priority:** {len([o for o in opportunities if o['priority'] == 'HIGH'])}\n\n")
            
            # Summary table
            f.write("## ?? Opportunity Summary\n\n")
            f.write("| Page | Type | Current CTR | Position | Priority | Potential Impact |\n")
            f.write("|------|------|-------------|----------|----------|------------------|\n")
            
            for opp in opportunities:
                f.write(f"| {opp['page']} | {opp['type']} | {opp['ctr']:.2%} | {opp['position']:.1f} | {opp['priority']} | +{opp['potential_impact']} clicks |\n")
            
            # Detailed recommendations
            f.write("\n## ?? Detailed Recommendations\n\n")
            
            for i, opp in enumerate(opportunities, 1):
                f.write(f"### {i}. {opp['page']}\n\n")
                f.write(f"**Type:** {opp['type']} | **Priority:** {opp['priority']} | **Effort:** {opp['estimated_effort']}\n\n")
                f.write(f"**Current Performance:**\n")
                f.write(f"- Clicks: {opp['clicks']}\n")
                f.write(f"- Impressions: {opp['impressions']}\n")
                f.write(f"- CTR: {opp['ctr']:.2%}\n")
                f.write(f"- Position: {opp['position']:.1f}\n")
                f.write(f"- Potential Impact: +{opp['potential_impact']} clicks\n\n")
                
                f.write(f"**Current Title:** {opp['current_title']}\n\n")
                f.write(f"**Current Description:** {opp['current_description']}\n\n")
                
                f.write("**AI Recommendations:**\n\n")
                
                if opp['ai_recommendations']['title_suggestions']:
                    f.write("**Title Options:**\n")
                    for j, title in enumerate(opp['ai_recommendations']['title_suggestions'], 1):
                        f.write(f"{j}. {title}\n")
                    f.write("\n")
                
                if opp['ai_recommendations']['description_suggestions']:
                    f.write("**Description Options:**\n")
                    for j, desc in enumerate(opp['ai_recommendations']['description_suggestions'], 1):
                        f.write(f"{j}. {desc}\n")
                    f.write("\n")
                
                if opp['ai_recommendations']['internal_link_suggestions']:
                    f.write("**Internal Linking:**\n")
                    for suggestion in opp['ai_recommendations']['internal_link_suggestions']:
                        f.write(f"- {suggestion}\n")
                    f.write("\n")
                
                f.write("---\n\n")

    def create_optimization_pull_requests(self, opportunities):
        """Create pull requests with optimization suggestions"""
        print("?? Creating optimization pull requests...")
        
        # Group opportunities by type
        low_ctr_opps = [o for o in opportunities if o['type'] == 'LOW_CTR']
        striking_distance_opps = [o for o in opportunities if o['type'] == 'STRIKING_DISTANCE']
        
        # Create PR for low CTR optimizations
        if low_ctr_opps:
            self.create_title_meta_pr(low_ctr_opps)
        
        # Create PR for striking distance optimizations
        if striking_distance_opps:
            self.create_content_linking_pr(striking_distance_opps)
        
        print(f"?? Created {len(low_ctr_opps) + len(striking_distance_opps)} optimization pull requests")

    def create_title_meta_pr(self, opportunities):
        """Create PR for title and meta description optimizations"""
        pr_content = {
            'title': f'SEO: Optimize {len(opportunities)} pages with low CTR',
            'body': self.generate_title_meta_pr_body(opportunities),
            'branch': 'seo/low-ctr-optimization',
            'files': {}
        }
        
        # Generate file changes
        for opp in opportunities:
            if opp['ai_recommendations']['title_suggestions']:
                # This would create actual file changes
                pr_content['files'][f'optimizations/{opp["page"].replace("/", "_")}_meta.md'] = \
                    self.generate_meta_optimization_file(opp)
        
        # Mock PR creation
        print(f"?? Created PR: {pr_content['title']}")

    def create_content_linking_pr(self, opportunities):
        """Create PR for content and internal linking optimizations"""
        pr_content = {
            'title': f'SEO: Boost {len(opportunities)} pages in striking distance',
            'body': self.generate_content_linking_pr_body(opportunities),
            'branch': 'seo/striking-distance-boost',
            'files': {}
        }
        
        # Generate linking recommendations
        for opp in opportunities:
            pr_content['files'][f'optimizations/{opp["page"].replace("/", "_")}_linking.md'] = \
                self.generate_linking_optimization_file(opp)
        
        # Mock PR creation
        print(f"?? Created PR: {pr_content['title']}")

    def generate_meta_optimization_file(self, opportunity):
        """Generate metadata optimization file content"""
        content = f"# SEO Optimization: {opportunity['page']}\n\n"
        content += f"**Current Performance:** CTR {opportunity['ctr']:.2%}, Position {opportunity['position']:.1f}\n\n"
        content += f"**Current Title:** {opportunity['current_title']}\n\n"
        content += f"**Current Description:** {opportunity['current_description']}\n\n"
        content += "## Recommended Changes\n\n"
        
        if opportunity['ai_recommendations']['title_suggestions']:
            content += "### Title Options:\n"
            for i, title in enumerate(opportunity['ai_recommendations']['title_suggestions'], 1):
                content += f"{i}. {title}\n"
            content += "\n"
        
        if opportunity['ai_recommendations']['description_suggestions']:
            content += "### Description Options:\n"
            for i, desc in enumerate(opportunity['ai_recommendations']['description_suggestions'], 1):
                content += f"{i}. {desc}\n"
        
        return content

    def generate_linking_optimization_file(self, opportunity):
        """Generate internal linking optimization file content"""
        content = f"# SEO Linking Optimization: {opportunity['page']}\n\n"
        content += f"**Current Performance:** CTR {opportunity['ctr']:.2%}, Position {opportunity['position']:.1f}\n\n"
        content += "## Internal Linking Recommendations\n\n"
        
        for suggestion in opportunity['ai_recommendations']['internal_link_suggestions']:
            content += f"- {suggestion}\n"
        
        content += "\n## Content Enhancement Suggestions\n\n"
        content += "- Add FAQ section targeting related queries\n"
        content += "- Include location-specific keywords\n"
        content += "- Add service area information\n"
        content += "- Enhance with customer testimonials\n"
        
        return content

    def generate_title_meta_pr_body(self, opportunities):
        """Generate PR body for title/meta optimizations"""
        body = "## SEO Optimization: Low CTR Pages\n\n"
        body += f"This PR optimizes {len(opportunities)} pages with click-through rates below 2%.\n\n"
        body += "### Changes Summary:\n\n"
        
        for opp in opportunities:
            body += f"- **{opp['page']}**: CTR {opp['ctr']:.2%} -> Target 3%+ (+{opp['potential_impact']} potential clicks)\n"
        
        body += "\n### Implementation:\n\n"
        body += "1. Review and apply recommended title changes\n"
        body += "2. Update meta descriptions for better click-through intent\n"
        body += "3. Test changes and monitor performance\n\n"
        body += "### Expected Impact:\n\n"
        total_impact = sum(o['potential_impact'] for o in opportunities)
        body += f"- Estimated additional clicks: +{total_impact}\n"
        body += f"- Pages optimized: {len(opportunities)}\n"
        
        return body

    def generate_content_linking_pr_body(self, opportunities):
        """Generate PR body for content/linking optimizations"""
        body = "## SEO Optimization: Striking Distance Pages\n\n"
        body += f"This PR enhances {len(opportunities)} pages ranking in positions 4-12 to reach first page.\n\n"
        body += "### Changes Summary:\n\n"
        
        for opp in opportunities:
            body += f"- **{opp['page']}**: Position {opp['position']:.1f} -> Target Top 3 (+{opp['potential_impact']} potential clicks)\n"
        
        body += "\n### Implementation:\n\n"
        body += "1. Add internal links from high-authority pages\n"
        body += "2. Create FAQ clusters around target keywords\n"
        body += "3. Enhance content with related topics\n"
        body += "4. Add location-specific service information\n\n"
        body += "### Expected Impact:\n\n"
        total_impact = sum(o['potential_impact'] for o in opportunities)
        body += f"- Estimated additional clicks: +{total_impact}\n"
        body += f"- Pages boosted to first page: {len(opportunities)}\n"
        
        return body

    def ping_google_sitemap(self):
        """Ping Google about sitemap updates"""
        try:
            sitemap_url = f"{self.site_url.rstrip('/')}/sitemap-index.xml"
            ping_url = f"https://www.google.com/ping?sitemap={sitemap_url}"
            
            response = requests.get(ping_url, timeout=10)
            if response.status_code == 200:
                print("?? Successfully pinged Google about sitemap updates")
            else:
                print(f"?? Failed to ping Google: {response.status_code}")
        except Exception as e:
            print(f"?? Error pinging Google: {e}")

    def generate_success_report(self):
        """Generate report when no opportunities are found"""
        report_path = "data/seo_autopilot_success.json"
        
        success_data = {
            'generated_at': datetime.now().isoformat(),
            'site_url': self.site_url,
            'analysis_period': '28 days',
            'status': 'HEALTHY',
            'message': 'No immediate SEO optimization opportunities detected',
            'recommendation': 'Continue monitoring and focus on content creation'
        }
        
        Path('data').mkdir(exist_ok=True)
        
        with open(report_path, 'w') as f:
            json.dump(success_data, f, indent=2)
        
        print(f"?? Success report generated: {report_path}")

    def generate_report(self, opportunities):
        report_path = "backups/seo_audit_report.md"
        with open(report_path, "w") as f:
            f.write("# ?? AI SEO Autopilot Audit Report\n\n")
            f.write(f"Generated on {os.popen('date').read()}\n\n")
            f.write("## Detected Opportunities\n\n")
            for op in opportunities:
                f.write(f"- **[{op['type']}]** {op['page']}\n")
                f.write(f"  - Metric: {op['metric']}\n")
                f.write(f"  - Suggestion: {op['suggestion']}\n\n")
        print(f"📄 Audit report generated: {report_path}")

    def create_ai_fix_drafts(self, opportunities):
        # Logic to call LLM and draft potential title changes
        # Then create a PR or a suggestion file
        print("🧠 Drafting AI fixes for approved pages...")
        # Placeholder for AI call
        pass

if __name__ == "__main__":
    dry = "--dry-run" in sys.argv
    bot = SEOAutopilot(dry_run=dry)
    bot.run()
