import {
  BLOG_POSTS,
  BlogPostImage,
} from '../../shared/components/blog-post-dialog/blog-posts';

export type Project = {
  title: string;
  description: string;
  href: string;
  opensDialog?: boolean;
  dialogType?: 'moodtune' | 'blog';
  content?: string;
  images?: BlogPostImage[];
  imagesCaption?: string;
};

export const HOME_PROJECTS: Project[] = [
  {
    title: 'MoodTune',
    description: 'A mood-based music recommendation app.',
    href: 'https://moodtune.kokkin.is',
    opensDialog: true,
  },
  {
    title: 'παρασκήνιο',
    description: 'A community space for theatre in Athens.',
    href: 'https://paraskinio.app',
  },
  {
    title: 'Kōdon',
    description:
      'A Sonner-inspired toast component for Angular, ' +
      'built on top of ng-primitives.',
    href: 'https://kodon.kokkin.is',
  },
];

export const HOME_POSTS: Project[] = [
  {
    title: BLOG_POSTS.paraskinio.title,
    description: 'A community space for theatre in Athens',
    href: 'https://kokkin.is/building-paraskinio',
    opensDialog: true,
    dialogType: 'blog',
    content: BLOG_POSTS.paraskinio.content,
    images: BLOG_POSTS.paraskinio.images,
    imagesCaption: BLOG_POSTS.paraskinio.imagesCaption,
  },
  {
    title: BLOG_POSTS.vakaiRedesign.title,
    description: 'Rebuilding a biogas landing page around one story',
    href: 'https://kokkin.is/redesigning-vakai',
    opensDialog: true,
    dialogType: 'blog',
    content: BLOG_POSTS.vakaiRedesign.content,
    images: BLOG_POSTS.vakaiRedesign.images,
  },
  {
    title: 'Josh W. Comeau Student Showcase',
    description:
      "My app's animation got featured on Josh W. Comeau's newsletter!",
    href: 'https://www.joshwcomeau.com/email/wham-launch-009-student-showcase/',
  },
  {
    title: BLOG_POSTS.aiSkills.title,
    description: 'My favorite AI skills as of right now',
    href: 'https://kokkin.is/my-favorite-ai-skills-so-far',
    opensDialog: true,
    dialogType: 'blog',
    content: BLOG_POSTS.aiSkills.content,
  },
];
