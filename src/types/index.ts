// ============================================
// AutoMatch - Complete Type Definitions
// ============================================

export interface ColorPalette {
  primary: string;
  accent: string;
  background: string;
  text: string;
}

export interface FontPair {
  heading: string;
  body: string;
}

export type ModuleType =
  | 'hero'
  | 'navbar'
  | 'text'
  | 'features'
  | 'gallery'
  | 'products'
  | 'services'
  | 'testimonials'
  | 'team'
  | 'pricing'
  | 'faq'
  | 'contact'
  | 'footer'
  | 'carousel'
  | 'video'
  | 'button'
  | 'divider'
  | 'music';

export interface BaseModule {
  id: string;
  type: ModuleType;
  name: string;
  visible: boolean;
  styles: ModuleStyles;
}

export interface ModuleStyles {
  bgColor?: string;
  bgImage?: string;
  textColor?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  textAlign?: 'left' | 'center' | 'right';
}

export interface HeroModule extends BaseModule {
  type: 'hero';
  content: {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    image?: string;
    overlay?: boolean;
  };
}

export interface NavbarModule extends BaseModule {
  type: 'navbar';
  content: {
    logo: string;
    links: { label: string; href: string }[];
    ctaText: string;
    ctaLink: string;
  };
}

export interface TextModule extends BaseModule {
  type: 'text';
  content: {
    title: string;
    body: string;
    buttonText?: string;
    buttonLink?: string;
  };
}

export interface FeaturesModule extends BaseModule {
  type: 'features';
  content: {
    title: string;
    subtitle?: string;
    items: { icon: string; title: string; description: string }[];
  };
}

export interface GalleryModule extends BaseModule {
  type: 'gallery';
  content: {
    title?: string;
    images: { src: string; alt: string }[];
    columns: 2 | 3 | 4;
  };
}

export interface ProductsModule extends BaseModule {
  type: 'products';
  content: {
    title: string;
    subtitle?: string;
    items: { name: string; price: string; description: string; image?: string }[];
  };
}

export interface ServicesModule extends BaseModule {
  type: 'services';
  content: {
    title: string;
    subtitle?: string;
    items: { title: string; description: string; icon: string }[];
  };
}

export interface TestimonialsModule extends BaseModule {
  type: 'testimonials';
  content: {
    title?: string;
    items: { name: string; role: string; text: string; avatar?: string }[];
  };
}

export interface TeamModule extends BaseModule {
  type: 'team';
  content: {
    title: string;
    subtitle?: string;
    members: { name: string; role: string; bio: string; avatar?: string }[];
  };
}

export interface PricingModule extends BaseModule {
  type: 'pricing';
  content: {
    title: string;
    subtitle?: string;
    plans: { name: string; price: string; period: string; features: string[]; highlighted?: boolean }[];
  };
}

export interface FAQModule extends BaseModule {
  type: 'faq';
  content: {
    title: string;
    items: { question: string; answer: string }[];
  };
}

export interface ContactModule extends BaseModule {
  type: 'contact';
  content: {
    title: string;
    subtitle?: string;
    email?: string;
    phone?: string;
    address?: string;
    showForm: boolean;
  };
}

export interface FooterModule extends BaseModule {
  type: 'footer';
  content: {
    logo: string;
    tagline: string;
    links: { label: string; href: string }[];
    social: { platform: string; url: string }[];
    copyright: string;
  };
}

export interface CarouselModule extends BaseModule {
  type: 'carousel';
  content: {
    slides: { image: string; title?: string; subtitle?: string }[];
    autoplay: boolean;
    interval: number;
  };
}

export interface VideoModule extends BaseModule {
  type: 'video';
  content: {
    url: string;
    title?: string;
    autoplay: boolean;
    muted: boolean;
  };
}

export interface ButtonModule extends BaseModule {
  type: 'button';
  content: {
    text: string;
    link: string;
    variant: 'primary' | 'secondary' | 'outline';
    size: 'small' | 'medium' | 'large';
    align: 'left' | 'center' | 'right';
  };
}

export interface DividerModule extends BaseModule {
  type: 'divider';
  content: {
    style: 'line' | 'dashed' | 'dotted' | 'space';
    label?: string;
  };
}

export interface MusicModule extends BaseModule {
  type: 'music';
  content: {
    title: string;
    trackId: string;
    autoplay: boolean;
    loop: boolean;
    showControls: boolean;
  };
}

export type WebsiteModule =
  | HeroModule
  | NavbarModule
  | TextModule
  | FeaturesModule
  | GalleryModule
  | ProductsModule
  | ServicesModule
  | TestimonialsModule
  | TeamModule
  | PricingModule
  | FAQModule
  | ContactModule
  | FooterModule
  | CarouselModule
  | VideoModule
  | ButtonModule
  | DividerModule
  | MusicModule;

export interface Page {
  id: string;
  name: string;
  slug: string;
  isHome: boolean;
  modules: WebsiteModule[];
}

export interface Website {
  id: string;
  name: string;
  pages: Page[];
  colors: ColorPalette;
  fonts: FontPair;
  favicon?: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover: string;
  moods: string[];
  genre: string;
  bpm: number;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  pages: Page[];
  colors: ColorPalette;
  fonts: FontPair;
  isFavorite: boolean;
  createdAt: string;
}

export type EditorView = 'landing' | 'editor' | 'preview';

export interface EditorState {
  website: Website;
  currentPageId: string;
  selectedModuleId: string | null;
  undoStack: Website[];
  redoStack: Website[];
  leftPanelOpen: boolean;
  rightPanelOpen: boolean;
  musicPanelOpen: boolean;
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  saved: boolean;
  lastSaved: Date | null;
}

export type EditorAction =
  | { type: 'INIT_WEBSITE'; website: Website }
  | { type: 'SELECT_PAGE'; pageId: string }
  | { type: 'SELECT_MODULE'; moduleId: string | null }
  | { type: 'ADD_PAGE'; page: Page }
  | { type: 'DELETE_PAGE'; pageId: string }
  | { type: 'DUPLICATE_PAGE'; pageId: string }
  | { type: 'SET_HOME_PAGE'; pageId: string }
  | { type: 'REORDER_PAGES'; pageIds: string[] }
  | { type: 'RENAME_PAGE'; pageId: string; name: string }
  | { type: 'ADD_MODULE'; pageId: string; module: WebsiteModule; index?: number }
  | { type: 'DELETE_MODULE'; pageId: string; moduleId: string }
  | { type: 'DUPLICATE_MODULE'; pageId: string; moduleId: string }
  | { type: 'UPDATE_MODULE'; pageId: string; moduleId: string; updates: Partial<WebsiteModule> }
  | { type: 'REORDER_MODULES'; pageId: string; moduleIds: string[] }
  | { type: 'TOGGLE_MODULE_VISIBILITY'; pageId: string; moduleId: string }
  | { type: 'UPDATE_COLORS'; colors: Partial<ColorPalette> }
  | { type: 'UPDATE_FONTS'; fonts: Partial<FontPair> }
  | { type: 'UPDATE_WEBSITE_NAME'; name: string }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'SAVE' }
  | { type: 'TOGGLE_LEFT_PANEL' }
  | { type: 'TOGGLE_RIGHT_PANEL' }
  | { type: 'TOGGLE_MUSIC_PANEL' }
  | { type: 'SET_PREVIEW_DEVICE'; device: 'desktop' | 'tablet' | 'mobile' };
