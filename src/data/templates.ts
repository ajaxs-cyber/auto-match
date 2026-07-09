import type { Template } from '@/types';

const now = new Date().toISOString();

export const DEFAULT_TEMPLATES: Template[] = [
  {
    id: 'tpl-cafe-1',
    name: 'Lumière Café',
    description: 'A warm, inviting coffee shop website with artisanal aesthetics',
    image: '/images/template-lumiere-cafe.jpg',
    category: 'Coffee & Food',
    tags: ['Food', 'Cozy', 'Warm'],
    isFavorite: false,
    createdAt: now,
    colors: { primary: '#6B3A2A', accent: '#D4A574', background: '#F5E6D3', text: '#3D2B1F' },
    fonts: { heading: 'Playfair Display', body: 'Inter' },
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        slug: '/',
        isHome: true,
        modules: [
          {
            id: 'mod-nav-1', type: 'navbar', name: 'Navigation', visible: true,
            styles: { bgColor: 'transparent', textColor: '#FFFFFF' },
            content: { logo: 'Lumière', links: [{ label: 'Home', href: '#' }, { label: 'Menu', href: '#menu' }, { label: 'About', href: '#about' }, { label: 'Gallery', href: '#gallery' }, { label: 'Contact', href: '#contact' }], ctaText: 'Order Now', ctaLink: '#order' }
          },
          {
            id: 'mod-hero-1', type: 'hero', name: 'Hero Section', visible: true,
            styles: { bgColor: '#6B3A2A', textColor: '#FFFFFF', textAlign: 'center' },
            content: { title: 'Lumière Café', subtitle: 'Where every cup tells a story. Artisanal coffee, handcrafted with love since 2015.', buttonText: 'Explore Our Menu', buttonLink: '#menu', secondaryButtonText: 'Our Story', secondaryButtonLink: '#about', overlay: true }
          },
          {
            id: 'mod-text-1', type: 'text', name: 'About Section', visible: true,
            styles: { bgColor: '#F5E6D3', textColor: '#3D2B1F', textAlign: 'center', padding: '80px 24px' },
            content: { title: 'Our Story', body: 'Founded in 2015, Lumière Café began with a simple mission: to serve the perfect cup of coffee. We source our beans directly from sustainable farms across Ethiopia, Colombia, and Guatemala, roasting them in small batches to preserve their unique character.', buttonText: 'Learn More', buttonLink: '#about' }
          },
          {
            id: 'mod-features-1', type: 'features', name: 'Features', visible: true,
            styles: { bgColor: '#FFFFFF', textColor: '#3D2B1F', padding: '80px 24px' },
            content: { title: 'Why Choose Us', subtitle: 'Experience the Lumière difference', items: [{ icon: 'coffee', title: 'Single Origin', description: 'Ethically sourced beans from top farms worldwide' }, { icon: 'chef-hat', title: 'Fresh Pastries', description: 'Baked daily by our in-house pastry chef' }, { icon: 'wifi', title: 'Free Wi-Fi', description: 'Stay connected while you enjoy your coffee' }, { icon: 'clock', title: 'Open Late', description: 'Serving until 10 PM every day' }] }
          },
          {
            id: 'mod-gallery-1', type: 'gallery', name: 'Gallery', visible: true,
            styles: { bgColor: '#F5E6D3', textColor: '#3D2B1F', padding: '80px 24px' },
            content: { title: 'Gallery', images: [{ src: '/images/template-lumiere-cafe.jpg', alt: 'Café interior' }, { src: '/images/album-autumn-breeze.jpg', alt: 'Autumn special' }, { src: '/images/album-sunday-morning.jpg', alt: 'Sunday brunch' }], columns: 3 }
          },
          {
            id: 'mod-contact-1', type: 'contact', name: 'Contact', visible: true,
            styles: { bgColor: '#6B3A2A', textColor: '#FFFFFF', padding: '80px 24px' },
            content: { title: 'Visit Us', subtitle: 'We would love to see you', email: 'hello@lumiere.cafe', phone: '+1 (555) 234-5678', address: '123 Coffee Lane, Portland, OR 97201', showForm: true }
          },
          {
            id: 'mod-footer-1', type: 'footer', name: 'Footer', visible: true,
            styles: { bgColor: '#3D2B1F', textColor: '#FFFFFF' },
            content: { logo: 'Lumière', tagline: 'Crafted with love, served with warmth.', links: [{ label: 'Home', href: '#' }, { label: 'Menu', href: '#' }, { label: 'About', href: '#' }, { label: 'Contact', href: '#' }], social: [{ platform: 'instagram', url: '#' }, { platform: 'facebook', url: '#' }, { platform: 'twitter', url: '#' }], copyright: '© 2025 Lumière Café. All rights reserved.' }
          }
        ]
      }
    ]
  },
  {
    id: 'tpl-photo-1',
    name: 'Frame Studio',
    description: 'Photography portfolio with dramatic, gallery-like layouts',
    image: '/images/template-frame-studio.jpg',
    category: 'Creative',
    tags: ['Creative', 'Portfolio', 'Dark'],
    isFavorite: false,
    createdAt: now,
    colors: { primary: '#1A1A1A', accent: '#E85D4C', background: '#0A0A0A', text: '#F5F5F5' },
    fonts: { heading: 'Playfair Display', body: 'Inter' },
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        slug: '/',
        isHome: true,
        modules: [
          {
            id: 'mod-nav-1', type: 'navbar', name: 'Navigation', visible: true,
            styles: { bgColor: 'transparent', textColor: '#FFFFFF' },
            content: { logo: 'FRAME', links: [{ label: 'Work', href: '#' }, { label: 'About', href: '#' }, { label: 'Services', href: '#' }, { label: 'Contact', href: '#' }], ctaText: 'Book a Session', ctaLink: '#' }
          },
          {
            id: 'mod-hero-1', type: 'hero', name: 'Hero Section', visible: true,
            styles: { bgColor: '#0A0A0A', textColor: '#FFFFFF', textAlign: 'center' },
            content: { title: 'Capturing Moments', subtitle: 'Professional photography for those who appreciate the art of visual storytelling.', buttonText: 'View Portfolio', buttonLink: '#gallery', overlay: false }
          },
          {
            id: 'mod-gallery-1', type: 'gallery', name: 'Portfolio Gallery', visible: true,
            styles: { bgColor: '#0A0A0A', textColor: '#F5F5F5', padding: '60px 24px' },
            content: { images: [{ src: '/images/template-frame-studio.jpg', alt: 'Work 1' }, { src: '/images/template-atelier.jpg', alt: 'Work 2' }, { src: '/images/template-bistro-moderne.jpg', alt: 'Work 3' }, { src: '/images/template-nexa-labs.jpg', alt: 'Work 4' }, { src: '/images/template-zenith-fitness.jpg', alt: 'Work 5' }, { src: '/images/template-lumiere-cafe.jpg', alt: 'Work 6' }], columns: 3 }
          },
          {
            id: 'mod-services-1', type: 'services', name: 'Services', visible: true,
            styles: { bgColor: '#1A1A1A', textColor: '#F5F5F5', padding: '80px 24px' },
            content: { title: 'Services', items: [{ icon: 'camera', title: 'Portrait', description: 'Professional portrait sessions' }, { icon: 'building', title: 'Commercial', description: 'Brand and product photography' }, { icon: 'heart', title: 'Wedding', description: 'Capture your special day' }, { icon: 'video', title: 'Video', description: 'Cinematic video production' }] }
          },
          {
            id: 'mod-contact-1', type: 'contact', name: 'Contact', visible: true,
            styles: { bgColor: '#0A0A0A', textColor: '#FFFFFF', padding: '80px 24px' },
            content: { title: 'Get in Touch', email: 'hello@framestudio.com', phone: '+1 (555) 987-6543', showForm: true }
          },
          {
            id: 'mod-footer-1', type: 'footer', name: 'Footer', visible: true,
            styles: { bgColor: '#000000', textColor: '#666666' },
            content: { logo: 'FRAME', tagline: 'Visual storytelling at its finest.', links: [{ label: 'Work', href: '#' }, { label: 'About', href: '#' }, { label: 'Services', href: '#' }, { label: 'Contact', href: '#' }], social: [{ platform: 'instagram', url: '#' }, { platform: 'twitter', url: '#' }], copyright: '© 2025 Frame Studio. All rights reserved.' }
          }
        ]
      }
    ]
  },
  {
    id: 'tpl-tech-1',
    name: 'Nexa Labs',
    description: 'Clean tech startup landing page with modern SaaS aesthetics',
    image: '/images/template-nexa-labs.jpg',
    category: 'Tech',
    tags: ['Tech', 'SaaS', 'Modern'],
    isFavorite: false,
    createdAt: now,
    colors: { primary: '#0E243C', accent: '#3B82F6', background: '#F8FAFC', text: '#1E293B' },
    fonts: { heading: 'Inter', body: 'Inter' },
    pages: [
      {
        id: 'page-home',
        name: 'Home',
        slug: '/',
        isHome: true,
        modules: [
          {
            id: 'mod-nav-1', type: 'navbar', name: 'Navigation', visible: true,
            styles: { bgColor: 'transparent', textColor: '#FFFFFF' },
            content: { logo: 'NEXA', links: [{ label: 'Features', href: '#' }, { label: 'Pricing', href: '#' }, { label: 'About', href: '#' }, { label: 'Docs', href: '#' }], ctaText: 'Get Started', ctaLink: '#' }
          },
          {
            id: 'mod-hero-1', type: 'hero', name: 'Hero Section', visible: true,
            styles: { bgColor: '#0E243C', textColor: '#FFFFFF', textAlign: 'center' },
            content: { title: 'Build Faster with Nexa', subtitle: 'The all-in-one platform for modern development teams. Ship features 10x faster.', buttonText: 'Start Free Trial', buttonLink: '#', secondaryButtonText: 'Watch Demo', secondaryButtonLink: '#' }
          },
          {
            id: 'mod-features-1', type: 'features', name: 'Features', visible: true,
            styles: { bgColor: '#F8FAFC', textColor: '#1E293B', padding: '80px 24px' },
            content: { title: 'Everything You Need', subtitle: 'Powerful features for modern teams', items: [{ icon: 'zap', title: 'Lightning Fast', description: 'Deploy in seconds, not hours' }, { icon: 'shield', title: 'Enterprise Security', description: 'SOC 2 compliant with end-to-end encryption' }, { icon: 'users', title: 'Team Collaboration', description: 'Real-time collaboration for your entire team' }, { icon: 'bar-chart', title: 'Advanced Analytics', description: 'Deep insights into your application performance' }] }
          },
          {
            id: 'mod-pricing-1', type: 'pricing', name: 'Pricing', visible: true,
            styles: { bgColor: '#FFFFFF', textColor: '#1E293B', padding: '80px 24px' },
            content: { title: 'Simple Pricing', subtitle: 'Start free, scale as you grow', plans: [{ name: 'Starter', price: '$0', period: '/mo', features: ['5 projects', '1GB storage', 'Community support'] }, { name: 'Pro', price: '$29', period: '/mo', features: ['Unlimited projects', '100GB storage', 'Priority support', 'Custom domains'], highlighted: true }, { name: 'Enterprise', price: '$99', period: '/mo', features: ['Everything in Pro', 'SSO & SAML', 'Dedicated support', 'SLA guarantee'] }] }
          },
          {
            id: 'mod-faq-1', type: 'faq', name: 'FAQ', visible: true,
            styles: { bgColor: '#F8FAFC', textColor: '#1E293B', padding: '80px 24px' },
            content: { title: 'Frequently Asked Questions', items: [{ question: 'How does the free tier work?', answer: 'The free tier includes 5 projects and 1GB of storage. Perfect for personal projects and experimenting.' }, { question: 'Can I upgrade or downgrade anytime?', answer: 'Yes, you can change your plan at any time. Changes take effect at the start of your next billing cycle.' }, { question: 'Do you offer refunds?', answer: 'We offer a 30-day money-back guarantee on all paid plans. No questions asked.' }] }
          },
          {
            id: 'mod-footer-1', type: 'footer', name: 'Footer', visible: true,
            styles: { bgColor: '#0E243C', textColor: '#FFFFFF' },
            content: { logo: 'NEXA', tagline: 'Build the future, faster.', links: [{ label: 'Features', href: '#' }, { label: 'Pricing', href: '#' }, { label: 'Docs', href: '#' }, { label: 'Blog', href: '#' }], social: [{ platform: 'github', url: '#' }, { platform: 'twitter', url: '#' }, { platform: 'linkedin', url: '#' }], copyright: '© 2025 Nexa Labs. All rights reserved.' }
          }
        ]
      }
    ]
  },
  {
    id: 'tpl-fitness-1',
    name: 'Zenith Fitness',
    description: 'Energetic gym and wellness site with dynamic visuals',
    image: '/images/template-zenith-fitness.jpg',
    category: 'Health',
    tags: ['Health', 'Energy', 'Fitness'],
    isFavorite: false,
    createdAt: now,
    colors: { primary: '#1A2E1A', accent: '#4ADE80', background: '#F0FDF4', text: '#14532D' },
    fonts: { heading: 'Inter', body: 'Inter' },
    pages: [
      {
        id: 'page-home', name: 'Home', slug: '/', isHome: true,
        modules: [
          { id: 'mod-nav-1', type: 'navbar', name: 'Navigation', visible: true, styles: { bgColor: 'transparent', textColor: '#FFFFFF' }, content: { logo: 'ZENITH', links: [{ label: 'Classes', href: '#' }, { label: 'Trainers', href: '#' }, { label: 'Membership', href: '#' }, { label: 'Contact', href: '#' }], ctaText: 'Join Now', ctaLink: '#' } },
          { id: 'mod-hero-1', type: 'hero', name: 'Hero Section', visible: true, styles: { bgColor: '#1A2E1A', textColor: '#FFFFFF', textAlign: 'center' }, content: { title: 'Push Your Limits', subtitle: 'State-of-the-art facilities, world-class trainers, and a community that keeps you motivated.', buttonText: 'Start Your Journey', buttonLink: '#', secondaryButtonText: 'View Classes', secondaryButtonLink: '#' } },
          { id: 'mod-services-1', type: 'services', name: 'Classes', visible: true, styles: { bgColor: '#F0FDF4', textColor: '#14532D', padding: '80px 24px' }, content: { title: 'Our Classes', subtitle: 'Something for everyone', items: [{ icon: 'dumbbell', title: 'Strength', description: 'Build muscle and power' }, { icon: 'heart', title: 'Cardio', description: 'Boost endurance and stamina' }, { icon: 'sparkles', title: 'Yoga', description: 'Find balance and flexibility' }, { icon: 'flame', title: 'HIIT', description: 'High-intensity interval training' }] } },
          { id: 'mod-pricing-1', type: 'pricing', name: 'Membership', visible: true, styles: { bgColor: '#FFFFFF', textColor: '#14532D', padding: '80px 24px' }, content: { title: 'Membership Plans', subtitle: 'Choose what works for you', plans: [{ name: 'Basic', price: '$29', period: '/mo', features: ['Gym access', '2 classes/week', 'Locker room'] }, { name: 'Premium', price: '$59', period: '/mo', features: ['Unlimited classes', 'Personal trainer', 'Sauna & spa', 'Nutrition plan'], highlighted: true }, { name: 'Elite', price: '$99', period: '/mo', features: ['Everything in Premium', 'Priority booking', 'Recovery lounge', 'Guest passes'] }] } },
          { id: 'mod-contact-1', type: 'contact', name: 'Contact', visible: true, styles: { bgColor: '#1A2E1A', textColor: '#FFFFFF', padding: '80px 24px' }, content: { title: 'Visit Zenith', subtitle: 'Your transformation starts here', email: 'info@zenith.fitness', phone: '+1 (555) 456-7890', address: '789 Fitness Blvd, Los Angeles, CA 90001', showForm: true } },
          { id: 'mod-footer-1', type: 'footer', name: 'Footer', visible: true, styles: { bgColor: '#0F1F0F', textColor: '#FFFFFF' }, content: { logo: 'ZENITH', tagline: 'Elevate your fitness journey.', links: [{ label: 'Classes', href: '#' }, { label: 'Trainers', href: '#' }, { label: 'Membership', href: '#' }, { label: 'Contact', href: '#' }], social: [{ platform: 'instagram', url: '#' }, { platform: 'youtube', url: '#' }], copyright: '© 2025 Zenith Fitness. All rights reserved.' } }
        ]
      }
    ]
  },
  {
    id: 'tpl-studio-1',
    name: 'Atelier Design',
    description: 'Elegant design studio showcase with refined aesthetics',
    image: '/images/template-atelier.jpg',
    category: 'Creative',
    tags: ['Creative', 'Studio', 'Elegant'],
    isFavorite: false,
    createdAt: now,
    colors: { primary: '#8B6F5E', accent: '#C9A87C', background: '#FDF8F3', text: '#4A3728' },
    fonts: { heading: 'Playfair Display', body: 'Inter' },
    pages: [
      {
        id: 'page-home', name: 'Home', slug: '/', isHome: true,
        modules: [
          { id: 'mod-nav-1', type: 'navbar', name: 'Navigation', visible: true, styles: { bgColor: 'transparent', textColor: '#4A3728' }, content: { logo: 'Atelier', links: [{ label: 'Work', href: '#' }, { label: 'Services', href: '#' }, { label: 'About', href: '#' }, { label: 'Contact', href: '#' }], ctaText: 'Start a Project', ctaLink: '#' } },
          { id: 'mod-hero-1', type: 'hero', name: 'Hero Section', visible: true, styles: { bgColor: '#FDF8F3', textColor: '#4A3728', textAlign: 'center' }, content: { title: 'Design That Inspires', subtitle: 'We create meaningful brand experiences through thoughtful design and strategic thinking.', buttonText: 'View Our Work', buttonLink: '#' } },
          { id: 'mod-gallery-1', type: 'gallery', name: 'Selected Work', visible: true, styles: { bgColor: '#FFFFFF', textColor: '#4A3728', padding: '80px 24px' }, content: { title: 'Selected Work', images: [{ src: '/images/template-atelier.jpg', alt: 'Project 1' }, { src: '/images/template-lumiere-cafe.jpg', alt: 'Project 2' }, { src: '/images/template-bistro-moderne.jpg', alt: 'Project 3' }], columns: 3 } },
          { id: 'mod-testimonials-1', type: 'testimonials', name: 'Testimonials', visible: true, styles: { bgColor: '#FDF8F3', textColor: '#4A3728', padding: '80px 24px' }, content: { title: 'What Clients Say', items: [{ name: 'Sarah Chen', role: 'CEO, Bloom Co', text: 'Atelier transformed our brand completely. Their attention to detail is unmatched.' }, { name: 'Marcus Webb', role: 'Founder, NextGen', text: 'Working with Atelier was a dream. They understood our vision from day one.' }] } },
          { id: 'mod-contact-1', type: 'contact', name: 'Contact', visible: true, styles: { bgColor: '#4A3728', textColor: '#FFFFFF', padding: '80px 24px' }, content: { title: 'Let\'s Create Together', subtitle: 'We would love to hear about your project', email: 'hello@atelier.design', phone: '+1 (555) 345-6789', showForm: true } },
          { id: 'mod-footer-1', type: 'footer', name: 'Footer', visible: true, styles: { bgColor: '#3A2B1F', textColor: '#C9A87C' }, content: { logo: 'Atelier', tagline: 'Crafted with intention.', links: [{ label: 'Work', href: '#' }, { label: 'Services', href: '#' }, { label: 'About', href: '#' }, { label: 'Contact', href: '#' }], social: [{ platform: 'instagram', url: '#' }, { platform: 'dribbble', url: '#' }], copyright: '© 2025 Atelier Design. All rights reserved.' } }
        ]
      }
    ]
  },
  {
    id: 'tpl-restaurant-1',
    name: 'Bistro Moderne',
    description: 'Sophisticated fine dining restaurant experience',
    image: '/images/template-bistro-moderne.jpg',
    category: 'Coffee & Food',
    tags: ['Food', 'Fine Dining', 'Luxury'],
    isFavorite: false,
    createdAt: now,
    colors: { primary: '#1C0F0A', accent: '#C8A97E', background: '#0D0806', text: '#F5E6D3' },
    fonts: { heading: 'Playfair Display', body: 'Inter' },
    pages: [
      {
        id: 'page-home', name: 'Home', slug: '/', isHome: true,
        modules: [
          { id: 'mod-nav-1', type: 'navbar', name: 'Navigation', visible: true, styles: { bgColor: 'transparent', textColor: '#F5E6D3' }, content: { logo: 'BISTRO', links: [{ label: 'Menu', href: '#' }, { label: 'Reservations', href: '#' }, { label: 'About', href: '#' }, { label: 'Contact', href: '#' }], ctaText: 'Reserve Table', ctaLink: '#' } },
          { id: 'mod-hero-1', type: 'hero', name: 'Hero Section', visible: true, styles: { bgColor: '#0D0806', textColor: '#F5E6D3', textAlign: 'center' }, content: { title: 'Bistro Moderne', subtitle: 'An intimate culinary journey where French tradition meets modern innovation.', buttonText: 'Reserve a Table', buttonLink: '#', secondaryButtonText: 'View Menu', secondaryButtonLink: '#' } },
          { id: 'mod-products-1', type: 'products', name: 'Menu Highlights', visible: true, styles: { bgColor: '#1C0F0A', textColor: '#F5E6D3', padding: '80px 24px' }, content: { title: 'Signature Dishes', subtitle: 'Curated by Chef Antoine', items: [{ name: 'Filet Mignon', price: '$48', description: 'Aged 45 days, truffle jus' }, { name: 'Lobster Bisque', price: '$24', description: 'Cognac cream, chive oil' }, { name: 'Duck Confit', price: '$38', description: 'Cherry gastrique, parsnip puree' }] } },
          { id: 'mod-testimonials-1', type: 'testimonials', name: 'Reviews', visible: true, styles: { bgColor: '#0D0806', textColor: '#F5E6D3', padding: '80px 24px' }, content: { title: 'Guest Reviews', items: [{ name: 'James Mitchell', role: 'Food Critic', text: 'A transcendent dining experience. The tasting menu is a work of art.' }, { name: 'Elena Rossi', role: 'Regular Guest', text: 'Every visit feels special. The attention to detail is extraordinary.' }] } },
          { id: 'mod-contact-1', type: 'contact', name: 'Reservations', visible: true, styles: { bgColor: '#1C0F0A', textColor: '#F5E6D3', padding: '80px 24px' }, content: { title: 'Make a Reservation', subtitle: 'Join us for an unforgettable evening', email: 'reservations@bistromoderne.com', phone: '+1 (555) 876-5432', address: '456 Gourmet Avenue, New York, NY 10001', showForm: true } },
          { id: 'mod-footer-1', type: 'footer', name: 'Footer', visible: true, styles: { bgColor: '#0D0806', textColor: '#8B7355' }, content: { logo: 'BISTRO', tagline: 'Fine dining, redefined.', links: [{ label: 'Menu', href: '#' }, { label: 'Reservations', href: '#' }, { label: 'About', href: '#' }, { label: 'Contact', href: '#' }], social: [{ platform: 'instagram', url: '#' }], copyright: '© 2025 Bistro Moderne. All rights reserved.' } }
        ]
      }
    ]
  }
];

export const CATEGORIES = ['All', 'Coffee & Food', 'Creative', 'Tech', 'Health'];

export function generateWebsiteFromTemplate(template: typeof DEFAULT_TEMPLATES[0]) {
  const id = `site-${Date.now()}`;
  return {
    id,
    name: template.name,
    pages: template.pages.map(p => ({ ...p, id: `page-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` })),
    colors: { ...template.colors },
    fonts: { ...template.fonts },
  };
}

export function generateEmptyWebsite(name: string = 'My Website') {
  const pageId = `page-${Date.now()}`;
  return {
    id: `site-${Date.now()}`,
    name,
    pages: [{
      id: pageId,
      name: 'Home',
      slug: '/',
      isHome: true,
      modules: [
        { id: `mod-${Date.now()}-nav`, type: 'navbar' as const, name: 'Navigation', visible: true, styles: { bgColor: '#FFFFFF', textColor: '#1A2B3C' }, content: { logo: name, links: [{ label: 'Home', href: '#' }, { label: 'About', href: '#' }, { label: 'Contact', href: '#' }], ctaText: 'Get Started', ctaLink: '#' } },
        { id: `mod-${Date.now()}-hero`, type: 'hero' as const, name: 'Hero Section', visible: true, styles: { bgColor: '#1A2B3C', textColor: '#FFFFFF', textAlign: 'center' as const }, content: { title: 'Welcome to ' + name, subtitle: 'Your amazing website starts here.', buttonText: 'Learn More', buttonLink: '#' } },
        { id: `mod-${Date.now()}-footer`, type: 'footer' as const, name: 'Footer', visible: true, styles: { bgColor: '#1A2B3C', textColor: '#FFFFFF' }, content: { logo: name, tagline: 'Built with AutoMatch.', links: [{ label: 'Home', href: '#' }, { label: 'About', href: '#' }, { label: 'Contact', href: '#' }], social: [], copyright: `© 2025 ${name}. All rights reserved.` } }
      ]
    }],
    colors: { primary: '#1A2B3C', accent: '#E85D4C', background: '#F5F3EE', text: '#1A2B3C' },
    fonts: { heading: 'Inter', body: 'Inter' },
  };
}
