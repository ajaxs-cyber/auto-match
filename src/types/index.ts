// ============================================
// AutoMatch v2 — Enhanced Type Definitions
// ============================================

export interface ColorPalette {
  primary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  textMuted: string;
}

export interface FontPair {
  heading: string;
  body: string;
}

export type ModuleType =
  | 'hero' | 'navbar' | 'text' | 'features' | 'gallery'
  | 'products' | 'services' | 'testimonials' | 'team'
  | 'pricing' | 'faq' | 'contact' | 'footer'
  | 'carousel' | 'video' | 'button' | 'divider' | 'music'
  | 'stats' | 'logos' | 'cta' | 'timeline' | 'map';

// Element-level styles for inline editing
export interface ElementStyle {
  fontSize?: string;
  fontWeight?: number;
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  lineHeight?: string;
  letterSpacing?: string;
  opacity?: number;
  borderRadius?: string;
  borderWidth?: string;
  borderColor?: string;
  borderStyle?: string;
  shadow?: string;
  width?: string;
  height?: string;
  maxWidth?: string;
  background?: string;
  display?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
}

export interface ModuleStyles {
  bgColor?: string;
  bgImage?: string;
  textColor?: string;
  padding?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  margin?: string;
  borderRadius?: string;
  textAlign?: 'left' | 'center' | 'right';
  layout?: 'column' | 'row' | 'grid';
  columns?: number;
  gap?: string;
  justifyContent?: string;
  alignItems?: string;
  maxWidth?: string;
  fullWidth?: boolean;
}

export interface ElementConfig {
  id: string;
  type: 'text' | 'heading' | 'button' | 'image' | 'subtext' | 'link' | 'icon';
  content: string;
  styles?: ElementStyle;
}

export interface BaseModule {
  id: string;
  type: ModuleType;
  name: string;
  visible: boolean;
  styles: ModuleStyles;
  elements?: Record<string, ElementConfig>;
}

// Hero with flexible element positioning
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
    overlayOpacity?: number;
  };
  layout?: {
    titlePosition?: 'top' | 'center' | 'bottom' | 'left' | 'right';
    imagePosition?: 'background' | 'left' | 'right' | 'none';
    buttonLayout?: 'stacked' | 'horizontal';
    alignment?: 'left' | 'center' | 'right';
    minHeight?: string;
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
  layout?: { position?: 'static' | 'sticky' | 'fixed'; style?: 'transparent' | 'solid' | 'glass' };
}

export interface TextModule extends BaseModule {
  type: 'text';
  content: { title: string; body: string; buttonText?: string; buttonLink?: string };
  layout?: { alignment?: 'left' | 'center' | 'right'; maxWidth?: string };
}

export interface FeaturesModule extends BaseModule {
  type: 'features';
  content: { title: string; subtitle?: string; items: { icon: string; title: string; description: string }[] };
  layout?: { columns?: number; cardStyle?: 'flat' | 'elevated' | 'bordered' };
}

export interface GalleryModule extends BaseModule {
  type: 'gallery';
  content: { title?: string; images: { src: string; alt: string }[]; columns: number };
  layout?: { style?: 'grid' | 'masonry'; columns?: number; gap?: string };
}

export interface ProductsModule extends BaseModule {
  type: 'products';
  content: { title: string; subtitle?: string; items: { name: string; price: string; description: string; image?: string }[] };
  layout?: { columns?: number; cardStyle?: string };
}

export interface ServicesModule extends BaseModule {
  type: 'services';
  content: { title: string; subtitle?: string; items: { title: string; description: string; icon: string }[] };
  layout?: { columns?: number; layout?: 'grid' | 'list' };
}

export interface TestimonialsModule extends BaseModule {
  type: 'testimonials';
  content: { title?: string; items: { name: string; role: string; text: string; avatar?: string }[] };
  layout?: { columns?: number; style?: 'cards' | 'quotes' };
}

export interface TeamModule extends BaseModule {
  type: 'team';
  content: { title: string; subtitle?: string; members: { name: string; role: string; bio: string }[] };
  layout?: { columns?: number; showAvatars?: boolean };
}

export interface PricingModule extends BaseModule {
  type: 'pricing';
  content: { title: string; subtitle?: string; plans: { name: string; price: string; period: string; features: string[]; highlighted?: boolean }[] };
  layout?: { columns?: number; style?: 'cards' | 'table' };
}

export interface FAQModule extends BaseModule {
  type: 'faq';
  content: { title: string; items: { question: string; answer: string }[] };
  layout?: { style?: 'accordion' | 'list' };
}

export interface ContactModule extends BaseModule {
  type: 'contact';
  content: { title: string; subtitle?: string; email?: string; phone?: string; address?: string; showForm: boolean; formFields?: string[] };
  layout?: { layout?: 'centered' | 'split'; showMap?: boolean };
}

export interface FooterModule extends BaseModule {
  type: 'footer';
  content: { logo: string; tagline: string; links: { label: string; href: string }[]; social: { platform: string; url: string }[]; copyright: string; columns?: { title: string; links: { label: string; href: string }[] }[] };
  layout?: { columns?: number; style?: 'simple' | 'multi-column' };
}

export interface CarouselModule extends BaseModule {
  type: 'carousel';
  content: { slides: { image: string; title?: string; subtitle?: string }[]; autoplay: boolean; interval: number };
}

export interface VideoModule extends BaseModule {
  type: 'video';
  content: { url: string; title?: string; autoplay: boolean; muted: boolean };
  layout?: { aspectRatio?: string; fullWidth?: boolean };
}

export interface ButtonModule extends BaseModule {
  type: 'button';
  content: { text: string; link: string; variant: 'primary' | 'secondary' | 'outline' | 'ghost'; size: 'small' | 'medium' | 'large'; icon?: string };
  layout?: { align?: 'left' | 'center' | 'right'; fullWidth?: boolean };
}

export interface DividerModule extends BaseModule {
  type: 'divider';
  content: { style: 'line' | 'dashed' | 'dotted' | 'space'; label?: string };
  layout?: { width?: string; align?: 'left' | 'center' | 'right' };
}

export interface MusicModule extends BaseModule {
  type: 'music';
  content: { title: string; trackId: string; autoplay: boolean; loop: boolean; showControls: boolean; volume?: number; fadeIn?: number; fadeOut?: number };
  layout?: { style?: 'minimal' | 'full' | 'floating' };
}

export interface StatsModule extends BaseModule {
  type: 'stats';
  content: { title?: string; items: { value: string; label: string }[] };
  layout?: { columns?: number; style?: 'simple' | 'cards' | 'animated' };
}

export interface LogosModule extends BaseModule {
  type: 'logos';
  content: { title?: string; logos: { name: string }[] };
  layout?: { columns?: number; grayscale?: boolean };
}

export interface CTAModule extends BaseModule {
  type: 'cta';
  content: { title: string; subtitle?: string; buttonText: string; buttonLink: string };
  layout?: { style?: 'simple' | 'boxed' | 'gradient' };
}

export interface TimelineModule extends BaseModule {
  type: 'timeline';
  content: { title?: string; events: { date: string; title: string; description: string }[] };
  layout?: { style?: 'vertical' | 'horizontal' };
}

export interface MapModule extends BaseModule {
  type: 'map';
  content: { address: string; zoom?: number };
  layout?: { height?: string; fullWidth?: boolean };
}

export type WebsiteModule =
  | HeroModule | NavbarModule | TextModule | FeaturesModule | GalleryModule
  | ProductsModule | ServicesModule | TestimonialsModule | TeamModule
  | PricingModule | FAQModule | ContactModule | FooterModule
  | CarouselModule | VideoModule | ButtonModule | DividerModule
  | MusicModule | StatsModule | LogosModule | CTAModule
  | TimelineModule | MapModule;

export interface Page {
  id: string;
  name: string;
  slug: string;
  isHome: boolean;
  modules: WebsiteModule[];
  musicTrackId?: string;
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
  reason?: string;
}

export interface BrandMoodProfile {
  warmth: number;
  energy: number;
  professionalism: number;
  creativity: number;
  sophistication: number;
}

export interface MusicRecommendation {
  primary: MusicTrack;
  alternatives: MusicTrack[];
  reasoning: string;
  moodProfile: BrandMoodProfile;
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
  recommendedGenre: string;
  musicReason: string;
}

export type EditorView = 'landing' | 'editor' | 'preview';

export type EditorPanel = 'components' | 'pages' | 'music' | 'styles';

export interface EditorState {
  website: Website;
  currentPageId: string;
  selectedModuleId: string | null;
  selectedElementId: string | null;
  activePanel: EditorPanel;
  undoStack: Website[];
  redoStack: Website[];
  leftPanelOpen: boolean;
  rightPanelOpen: boolean;
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  saved: boolean;
  lastSaved: Date | null;
  inlineEditing: string | null;
}

export type EditorAction =
  | { type: 'INIT_WEBSITE'; website: Website }
  | { type: 'SELECT_PAGE'; pageId: string }
  | { type: 'SELECT_MODULE'; moduleId: string | null }
  | { type: 'SELECT_ELEMENT'; elementId: string | null }
  | { type: 'SET_ACTIVE_PANEL'; panel: EditorPanel }
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
  | { type: 'UPDATE_MODULE_CONTENT'; pageId: string; moduleId: string; content: Record<string, any> }
  | { type: 'UPDATE_MODULE_LAYOUT'; pageId: string; moduleId: string; layout: Record<string, any> }
  | { type: 'UPDATE_ELEMENT'; pageId: string; moduleId: string; elementId: string; updates: Partial<ElementConfig> }
  | { type: 'REORDER_MODULES'; pageId: string; moduleIds: string[] }
  | { type: 'TOGGLE_MODULE_VISIBILITY'; pageId: string; moduleId: string }
  | { type: 'UPDATE_COLORS'; colors: Partial<ColorPalette> }
  | { type: 'UPDATE_FONTS'; fonts: Partial<FontPair> }
  | { type: 'UPDATE_WEBSITE_NAME'; name: string }
  | { type: 'SET_PAGE_MUSIC'; pageId: string; trackId: string }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'SAVE' }
  | { type: 'TOGGLE_LEFT_PANEL' }
  | { type: 'TOGGLE_RIGHT_PANEL' }
  | { type: 'SET_PREVIEW_DEVICE'; device: 'desktop' | 'tablet' | 'mobile' }
  | { type: 'SET_INLINE_EDITING'; elementId: string | null };
