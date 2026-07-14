import type { Template } from '@/types';

const now = new Date().toISOString();

export const DEFAULT_TEMPLATES: Template[] = [
  // ===== Beauty & Skincare =====
  {
    id: 'tpl-skincare-1',
    name: 'Glow Ritual',
    description: 'A premium skincare brand site with elegant product showcase and calming aesthetics',
    image: '/images/template-lumiere-cafe.jpg',
    category: 'Beauty & Skincare',
    tags: ['Beauty', 'Skincare', 'Elegant'],
    isFavorite: false,
    recommendedGenre: 'Ambient',
    musicReason: 'Calming ambient tones complement the serene, spa-like atmosphere of premium skincare brands',
    createdAt: now,
    colors: { primary: '#B76E79', accent: '#E8B4C8', background: '#FFF5F7', surface: '#FFFFFF', text: '#4A2C3A', textSecondary: '#8B6F7E', textMuted: '#C4A8B5' },
    fonts: { heading: 'Playfair Display', body: 'Inter' },
    pages: [{
      id: 'page-home', name: 'Home', slug: '/', isHome: true,
      modules: [
        { id: 'mod-nav-1', type: 'navbar', name: 'Navigation', visible: true, styles: { bgColor: 'transparent', textColor: '#4A2C3A' }, content: { logo: 'GLOW', links: [{ label: 'Products', href: '#products' }, { label: 'About', href: '#about' }, { label: 'Routine', href: '#routine' }, { label: 'Contact', href: '#contact' }], ctaText: 'Shop Now', ctaLink: '#' } },
        { id: 'mod-hero-1', type: 'hero', name: 'Hero Section', visible: true, styles: { bgColor: '#FFF5F7', textColor: '#4A2C3A', textAlign: 'center' }, content: { title: 'Glow Ritual', subtitle: 'Clean beauty, powered by nature. Discover your perfect skincare routine with our dermatologist-tested formulations.', buttonText: 'Explore Products', buttonLink: '#products', secondaryButtonText: 'Our Story', secondaryButtonLink: '#about' } },
        { id: 'mod-features-1', type: 'features', name: 'Why Us', visible: true, styles: { bgColor: '#FFFFFF', textColor: '#4A2C3A', padding: '80px 24px' }, content: { title: 'Why Choose Glow', subtitle: 'Clean ingredients, visible results', items: [{ icon: 'leaf', title: 'Natural Ingredients', description: 'Plant-based formulas free from parabens and sulfates' }, { icon: 'flask', title: 'Dermatologist Tested', description: 'Clinically proven safe for all skin types' }, { icon: 'heart', title: 'Cruelty Free', description: 'Never tested on animals. PETA certified.' }, { icon: 'star', title: 'Premium Quality', description: 'Small-batch production for peak freshness' }] } },
        { id: 'mod-gallery-1', type: 'gallery', name: 'Product Gallery', visible: true, styles: { bgColor: '#FFF5F7', textColor: '#4A2C3A', padding: '80px 24px' }, content: { title: 'Our Collection', images: [{ src: '/images/template-lumiere-cafe.jpg', alt: 'Serum' }, { src: '/images/album-sunday-morning.jpg', alt: 'Moisturizer' }, { src: '/images/album-autumn-breeze.jpg', alt: 'Toner' }], columns: 3 } },
        { id: 'mod-contact-1', type: 'contact', name: 'Contact', visible: true, styles: { bgColor: '#B76E79', textColor: '#FFFFFF', padding: '80px 24px' }, content: { title: 'Get in Touch', subtitle: 'We\'d love to hear from you', email: 'hello@glowritual.com', phone: '+86 21 8888 6666', showForm: true } },
        { id: 'mod-footer-1', type: 'footer', name: 'Footer', visible: true, styles: { bgColor: '#4A2C3A', textColor: '#E8B4C8' }, content: { logo: 'GLOW', tagline: 'Radiant skin, naturally.', links: [{ label: 'Products', href: '#' }, { label: 'About', href: '#' }, { label: 'Contact', href: '#' }], social: [{ platform: 'instagram', url: '#' }], copyright: '© 2026 Glow Ritual. All rights reserved.' } }
      ]
    }]
  },
  {
    id: 'tpl-skincare-2',
    name: 'Bloom Beauty',
    description: 'A modern cosmetics brand with vibrant visuals and product-focused design',
    image: '/images/template-bistro-moderne.jpg',
    category: 'Beauty & Skincare',
    tags: ['Cosmetics', 'Vibrant', 'Modern'],
    isFavorite: false,
    recommendedGenre: 'Pop',
    musicReason: 'Uplifting pop melodies mirror the vibrant, confident energy of modern cosmetics brands',
    createdAt: now,
    colors: { primary: '#7C3AED', accent: '#A78BFA', background: '#FAF5FF', surface: '#FFFFFF', text: '#2D1B4E', textSecondary: '#6D5A8E', textMuted: '#A994BE' },
    fonts: { heading: 'Playfair Display', body: 'Inter' },
    pages: [{
      id: 'page-home', name: 'Home', slug: '/', isHome: true,
      modules: [
        { id: 'mod-nav-1', type: 'navbar', name: 'Navigation', visible: true, styles: { bgColor: 'transparent', textColor: '#FFFFFF' }, content: { logo: 'BLOOM', links: [{ label: 'Shop', href: '#' }, { label: 'Trends', href: '#' }, { label: 'About', href: '#' }, { label: 'Contact', href: '#' }], ctaText: 'Shop Now', ctaLink: '#' } },
        { id: 'mod-hero-1', type: 'hero', name: 'Hero Section', visible: true, styles: { bgColor: '#7C3AED', textColor: '#FFFFFF', textAlign: 'center' }, content: { title: 'Bloom Beauty', subtitle: 'Express yourself. Bold colors, clean ingredients, limitless possibilities.', buttonText: 'Discover More', buttonLink: '#', overlay: true } },
        { id: 'mod-services-1', type: 'services', name: 'Services', visible: true, styles: { bgColor: '#FAF5FF', textColor: '#2D1B4E', padding: '80px 24px' }, content: { title: 'Our Expertise', subtitle: 'Beauty services for everyone', items: [{ icon: 'sparkles', title: 'Makeup', description: 'Professional makeup products and tutorials' }, { icon: 'heart', title: 'Skincare', description: 'Clean, effective skincare routines' }, { icon: 'palette', title: 'Color Match', description: 'AI-powered shade matching' }, { icon: 'users', title: 'Consultation', description: 'Personal beauty consultation' }] } },
        { id: 'mod-contact-1', type: 'contact', name: 'Contact', visible: true, styles: { bgColor: '#2D1B4E', textColor: '#FFFFFF', padding: '80px 24px' }, content: { title: 'Stay Connected', email: 'hello@bloombeauty.com', phone: '+86 10 6666 8888', showForm: true } },
        { id: 'mod-footer-1', type: 'footer', name: 'Footer', visible: true, styles: { bgColor: '#1A0D30', textColor: '#A78BFA' }, content: { logo: 'BLOOM', tagline: 'Beauty in full color.', links: [{ label: 'Shop', href: '#' }, { label: 'About', href: '#' }, { label: 'Contact', href: '#' }], social: [{ platform: 'instagram', url: '#' }, { platform: 'weibo', url: '#' }], copyright: '© 2026 Bloom Beauty. All rights reserved.' } }
      ]
    }]
  },
  // ===== Pet Lifestyle =====
  {
    id: 'tpl-pet-1',
    name: 'Paws & Co.',
    description: 'A warm pet lifestyle brand site showcasing grooming, boarding, and pet care services',
    image: '/images/template-frame-studio.jpg',
    category: 'Pet Lifestyle',
    tags: ['Pet', 'Grooming', 'Lifestyle'],
    isFavorite: false,
    recommendedGenre: 'Acoustic',
    musicReason: 'Warm acoustic folk tones create a cozy, friendly atmosphere perfect for pet brands',
    createdAt: now,
    colors: { primary: '#D4835A', accent: '#F4A460', background: '#FFF8F0', surface: '#FFFFFF', text: '#3B2A1C', textSecondary: '#7A6555', textMuted: '#B5A396' },
    fonts: { heading: 'Playfair Display', body: 'Inter' },
    pages: [{
      id: 'page-home', name: 'Home', slug: '/', isHome: true,
      modules: [
        { id: 'mod-nav-1', type: 'navbar', name: 'Navigation', visible: true, styles: { bgColor: 'transparent', textColor: '#3B2A1C' }, content: { logo: 'PAWS', links: [{ label: 'Services', href: '#services' }, { label: 'Gallery', href: '#gallery' }, { label: 'About', href: '#about' }, { label: 'Contact', href: '#contact' }], ctaText: 'Book Now', ctaLink: '#' } },
        { id: 'mod-hero-1', type: 'hero', name: 'Hero Section', visible: true, styles: { bgColor: '#D4835A', textColor: '#FFFFFF', textAlign: 'center' }, content: { title: 'Paws & Co.', subtitle: 'Your pet deserves the best. Premium grooming, boarding, and care services in a loving environment.', buttonText: 'Our Services', buttonLink: '#services', secondaryButtonText: 'Visit Us', secondaryButtonLink: '#contact' } },
        { id: 'mod-features-1', type: 'features', name: 'Services', visible: true, styles: { bgColor: '#FFFFFF', textColor: '#3B2A1C', padding: '80px 24px' }, content: { title: 'What We Offer', subtitle: 'Everything your pet needs', items: [{ icon: 'scissors', title: 'Grooming', description: 'Professional grooming for all breeds' }, { icon: 'home', title: 'Boarding', description: 'Cozy overnight stays with care' }, { icon: 'heart', title: 'Daycare', description: 'Fun, supervised play sessions' }, { icon: 'cross', title: 'Vet Care', description: 'On-site veterinary services' }] } },
        { id: 'mod-gallery-1', type: 'gallery', name: 'Gallery', visible: true, styles: { bgColor: '#FFF8F0', textColor: '#3B2A1C', padding: '80px 24px' }, content: { title: 'Happy Pets', images: [{ src: '/images/template-frame-studio.jpg', alt: 'Happy dog' }, { src: '/images/template-atelier.jpg', alt: 'Grooming' }, { src: '/images/template-nexa-labs.jpg', alt: 'Play area' }], columns: 3 } },
        { id: 'mod-contact-1', type: 'contact', name: 'Contact', visible: true, styles: { bgColor: '#3B2A1C', textColor: '#FFFFFF', padding: '80px 24px' }, content: { title: 'Visit Paws & Co.', subtitle: 'We can\'t wait to meet your pet', email: 'hello@pawspet.com', phone: '+86 20 8888 7777', address: '上海市徐汇区宠物之家路 88 号', showForm: true } },
        { id: 'mod-footer-1', type: 'footer', name: 'Footer', visible: true, styles: { bgColor: '#2A1C10', textColor: '#F4A460' }, content: { logo: 'PAWS', tagline: 'Love them like we do.', links: [{ label: 'Services', href: '#' }, { label: 'Gallery', href: '#' }, { label: 'Contact', href: '#' }], social: [{ platform: 'instagram', url: '#' }, { platform: 'wechat', url: '#' }], copyright: '© 2026 Paws & Co. All rights reserved.' } }
      ]
    }]
  },
  {
    id: 'tpl-pet-2',
    name: 'Happy Tails Inn',
    description: 'A cheerful pet boarding and daycare center with fun, playful design',
    image: '/images/template-zenith-fitness.jpg',
    category: 'Pet Lifestyle',
    tags: ['Pet', 'Boarding', 'Playful'],
    isFavorite: false,
    recommendedGenre: 'Folk',
    musicReason: 'Lighthearted folk tunes evoke the joyful, playful energy of a happy pet care environment',
    createdAt: now,
    colors: { primary: '#2E8B57', accent: '#98D8C8', background: '#F0FFF4', surface: '#FFFFFF', text: '#1A3A2A', textSecondary: '#4A7A5A', textMuted: '#8AB8A0' },
    fonts: { heading: 'Inter', body: 'Inter' },
    pages: [{
      id: 'page-home', name: 'Home', slug: '/', isHome: true,
      modules: [
        { id: 'mod-nav-1', type: 'navbar', name: 'Navigation', visible: true, styles: { bgColor: 'transparent', textColor: '#FFFFFF' }, content: { logo: 'TAILS', links: [{ label: 'Services', href: '#' }, { label: 'Packages', href: '#' }, { label: 'Reviews', href: '#' }, { label: 'Contact', href: '#' }], ctaText: 'Book a Stay', ctaLink: '#' } },
        { id: 'mod-hero-1', type: 'hero', name: 'Hero Section', visible: true, styles: { bgColor: '#2E8B57', textColor: '#FFFFFF', textAlign: 'center' }, content: { title: 'Happy Tails Inn', subtitle: 'Where every tail wags. Premium pet boarding with love, care, and endless playtime.', buttonText: 'View Packages', buttonLink: '#', overlay: true } },
        { id: 'mod-testimonials-1', type: 'testimonials', name: 'Reviews', visible: true, styles: { bgColor: '#F0FFF4', textColor: '#1A3A2A', padding: '80px 24px' }, content: { title: 'What Pet Parents Say', items: [{ name: 'Lily Zhang', role: 'Dog Mom', text: 'Happy Tails took such good care of my Corgi! The updates and photos made my trip worry-free.' }, { name: 'Mike Chen', role: 'Cat Dad', text: 'My shy cat actually seemed happy when I picked her up. The staff truly cares about each animal.' }] } },
        { id: 'mod-contact-1', type: 'contact', name: 'Contact', visible: true, styles: { bgColor: '#1A3A2A', textColor: '#FFFFFF', padding: '80px 24px' }, content: { title: 'Book a Stay', email: 'hello@happytails.com', phone: '+86 755 8888 9999', showForm: true } },
        { id: 'mod-footer-1', type: 'footer', name: 'Footer', visible: true, styles: { bgColor: '#0F2A1A', textColor: '#98D8C8' }, content: { logo: 'TAILS', tagline: 'Where tails never stop wagging.', links: [{ label: 'Services', href: '#' }, { label: 'Packages', href: '#' }, { label: 'Contact', href: '#' }], social: [{ platform: 'instagram', url: '#' }], copyright: '© 2026 Happy Tails Inn. All rights reserved.' } }
      ]
    }]
  },
  // ===== Cultural & Creative =====
  {
    id: 'tpl-cultural-1',
    name: 'Ink & Hue',
    description: 'A cultural creative studio combining traditional artistry with modern design',
    image: '/images/template-atelier.jpg',
    category: 'Cultural & Creative',
    tags: ['Culture', 'Creative', 'Artisan'],
    isFavorite: false,
    recommendedGenre: 'World',
    musicReason: 'World music with traditional instruments bridges heritage and innovation, perfect for cultural brands',
    createdAt: now,
    colors: { primary: '#2D1B69', accent: '#C084FC', background: '#F8F6FF', surface: '#FFFFFF', text: '#1E1035', textSecondary: '#5A4E7A', textMuted: '#9288AA' },
    fonts: { heading: 'Playfair Display', body: 'Inter' },
    pages: [{
      id: 'page-home', name: 'Home', slug: '/', isHome: true,
      modules: [
        { id: 'mod-nav-1', type: 'navbar', name: 'Navigation', visible: true, styles: { bgColor: 'transparent', textColor: '#1E1035' }, content: { logo: 'INK&HUE', links: [{ label: 'Work', href: '#work' }, { label: 'About', href: '#about' }, { label: 'Services', href: '#services' }, { label: 'Contact', href: '#contact' }], ctaText: 'Start a Project', ctaLink: '#' } },
        { id: 'mod-hero-1', type: 'hero', name: 'Hero Section', visible: true, styles: { bgColor: '#2D1B69', textColor: '#FFFFFF', textAlign: 'center' }, content: { title: 'Ink & Hue', subtitle: 'Where cultural heritage meets contemporary design. We craft brand experiences that tell meaningful stories.', buttonText: 'View Our Work', buttonLink: '#work', overlay: true } },
        { id: 'mod-text-1', type: 'text', name: 'About', visible: true, styles: { bgColor: '#F8F6FF', textColor: '#1E1035', textAlign: 'center', padding: '80px 24px' }, content: { title: 'Our Philosophy', body: 'We believe every brand has a story rooted in culture. Our team of designers, artisans, and storytellers work together to create brand identities that honor tradition while embracing innovation. From visual identity to spatial design, we bring cultural narratives to life.', buttonText: 'Learn More', buttonLink: '#about' } },
        { id: 'mod-gallery-1', type: 'gallery', name: 'Portfolio', visible: true, styles: { bgColor: '#FFFFFF', textColor: '#1E1035', padding: '80px 24px' }, content: { title: 'Selected Works', images: [{ src: '/images/template-atelier.jpg', alt: 'Brand identity' }, { src: '/images/template-lumiere-cafe.jpg', alt: 'Packaging' }, { src: '/images/template-nexa-labs.jpg', alt: 'Exhibition' }], columns: 3 } },
        { id: 'mod-services-1', type: 'services', name: 'Services', visible: true, styles: { bgColor: '#F8F6FF', textColor: '#1E1035', padding: '80px 24px' }, content: { title: 'What We Do', items: [{ icon: 'palette', title: 'Brand Identity', description: 'Logo, color, typography systems' }, { icon: 'layout', title: 'Visual Design', description: 'Web, print, and spatial design' }, { icon: 'book-open', title: 'Storytelling', description: 'Brand narratives and content' }] } },
        { id: 'mod-contact-1', type: 'contact', name: 'Contact', visible: true, styles: { bgColor: '#1E1035', textColor: '#FFFFFF', padding: '80px 24px' }, content: { title: 'Let\'s Create', email: 'hello@inkandhue.com', phone: '+86 571 8888 5555', address: '杭州市西湖区文创路 66 号', showForm: true } },
        { id: 'mod-footer-1', type: 'footer', name: 'Footer', visible: true, styles: { bgColor: '#0F0820', textColor: '#C084FC' }, content: { logo: 'INK&HUE', tagline: 'Culture meets creativity.', links: [{ label: 'Work', href: '#' }, { label: 'About', href: '#' }, { label: 'Services', href: '#' }], social: [{ platform: 'instagram', url: '#' }, { platform: 'xiaohongshu', url: '#' }], copyright: '© 2026 Ink & Hue Studio. All rights reserved.' } }
      ]
    }]
  },
  // ===== Charity & Social Impact =====
  {
    id: 'tpl-charity-1',
    name: 'Hope Bridge',
    description: 'A heartwarming charity organization site focused on social impact and community building',
    image: '/images/template-nexa-labs.jpg',
    category: 'Charity & Social Impact',
    tags: ['Charity', 'Social Impact', 'Nonprofit'],
    isFavorite: false,
    recommendedGenre: 'Piano',
    musicReason: 'Warm piano compositions evoke empathy, hope, and the emotional resonance of charitable work',
    createdAt: now,
    colors: { primary: '#0D7C5E', accent: '#34D399', background: '#F0FDF4', surface: '#FFFFFF', text: '#064E3B', textSecondary: '#3B7A5E', textMuted: '#7AB89E' },
    fonts: { heading: 'Playfair Display', body: 'Inter' },
    pages: [{
      id: 'page-home', name: 'Home', slug: '/', isHome: true,
      modules: [
        { id: 'mod-nav-1', type: 'navbar', name: 'Navigation', visible: true, styles: { bgColor: 'transparent', textColor: '#FFFFFF' }, content: { logo: 'HOPE', links: [{ label: 'Our Mission', href: '#mission' }, { label: 'Projects', href: '#projects' }, { label: 'Impact', href: '#impact' }, { label: 'Donate', href: '#donate' }], ctaText: 'Donate Now', ctaLink: '#' } },
        { id: 'mod-hero-1', type: 'hero', name: 'Hero Section', visible: true, styles: { bgColor: '#064E3B', textColor: '#FFFFFF', textAlign: 'center' }, content: { title: 'Hope Bridge Foundation', subtitle: 'Building bridges of hope. Every donation brings education, clean water, and healthcare to communities in need.', buttonText: 'Make a Difference', buttonLink: '#donate', secondaryButtonText: 'Our Projects', secondaryButtonLink: '#projects', overlay: true } },
        { id: 'mod-features-1', type: 'features', name: 'Impact', visible: true, styles: { bgColor: '#FFFFFF', textColor: '#064E3B', padding: '80px 24px' }, content: { title: 'Our Impact', subtitle: 'Measurable change, real lives transformed', items: [{ icon: 'book-open', title: 'Education', description: 'Built 12 schools serving 5,000+ children' }, { icon: 'droplet', title: 'Clean Water', description: 'Installed 50+ wells in rural communities' }, { icon: 'heart', title: 'Healthcare', description: 'Provided medical aid to 10,000+ families' }, { icon: 'users', title: 'Community', description: 'Empowered 200+ local community leaders' }] } },
        { id: 'mod-text-1', type: 'text', name: 'Mission', visible: true, styles: { bgColor: '#F0FDF4', textColor: '#064E3B', textAlign: 'center', padding: '80px 24px' }, content: { title: 'Our Mission', body: 'Hope Bridge Foundation believes every person deserves access to basic necessities. Since 2018, we have been working across underserved communities to build sustainable infrastructure, provide educational resources, and create lasting positive change. With your support, we can reach even more families in need.' } },
        { id: 'mod-gallery-1', type: 'gallery', name: 'Our Work', visible: true, styles: { bgColor: '#FFFFFF', textColor: '#064E3B', padding: '80px 24px' }, content: { title: 'Projects in Action', images: [{ src: '/images/template-nexa-labs.jpg', alt: 'School building' }, { src: '/images/template-frame-studio.jpg', alt: 'Water well' }, { src: '/images/template-zenith-fitness.jpg', alt: 'Medical camp' }], columns: 3 } },
        { id: 'mod-contact-1', type: 'contact', name: 'Contact & Donate', visible: true, styles: { bgColor: '#064E3B', textColor: '#FFFFFF', padding: '80px 24px' }, content: { title: 'Join Our Mission', subtitle: 'Every contribution makes a difference', email: 'info@hopebridge.org', phone: '+86 10 8888 1111', address: '北京市朝阳区公益路 1 号', showForm: true } },
        { id: 'mod-footer-1', type: 'footer', name: 'Footer', visible: true, styles: { bgColor: '#03301F', textColor: '#34D399' }, content: { logo: 'HOPE', tagline: 'Together, we build hope.', links: [{ label: 'Mission', href: '#' }, { label: 'Projects', href: '#' }, { label: 'Donate', href: '#' }, { label: 'Contact', href: '#' }], social: [{ platform: 'wechat', url: '#' }, { platform: 'weibo', url: '#' }], copyright: '© 2026 Hope Bridge Foundation. All rights reserved.' } }
      ]
    }]
  }
];

export const CATEGORIES = ['All', 'Beauty & Skincare', 'Pet Lifestyle', 'Cultural & Creative', 'Charity & Social Impact'];

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
