import React from 'react';
import {
  ApertureIcon,
  CodeIcon,
  PaletteIcon,
  PencilRulerIcon,
  Share2Icon,
  SmileIcon,
} from 'lucide-react';
import diffAnimExample from '@/assets/diff-anim-example.webm';
import editorExample from '@/assets/editor-example.png';
import previewExample from '@/assets/preview-example.png';

export const features = [
  {
    icon: React.createElement(ApertureIcon),
    title: 'Diff Animation',
    description:
      'A video of diff animation to follow-up the code changes smoothly.',
  },
  {
    icon: React.createElement(PaletteIcon),
    title: 'Customization',
    description: 'Customize the themes, size, frame rate, width, and more.',
  },
  {
    icon: React.createElement(SmileIcon),
    title: 'Free',
    description: 'Absolutely free, no cost, no catches or conditions. enjoy!',
  },
  {
    icon: React.createElement(CodeIcon),
    title: 'Editor',
    description:
      'Code with in-browser editor powered by CodeMirror. undo, redo..',
  },
  {
    icon: React.createElement(Share2Icon),
    title: 'Collab',
    status: 'soon',
    description:
      'Real-time collaboration with tailored perms, choose who can view or edit',
  },
  {
    icon: React.createElement(PencilRulerIcon),
    title: 'Draw',
    status: 'soon',
    description:
      'A canvas layerd over the code to use pencils, shapes, and more to express more',
  },
];

export const examples = [
  {
    icon: 'ApertureIcon',
    title: 'Diff Animation',
    description:
      'Video-enabled to provides a dynamic visual representation of code changes, allows your audience to track and understand the changes over the snapshots, w/ customization: frame-rate - font-size...',
    media: diffAnimExample,
    type: 'video',
  },
  {
    icon: 'CodeIcon',
    title: 'Editor',
    description:
      'In-browser Editor, powered by CodeMirror, and it comes equipped with usual features such as syntax highlighting - undo - redo - pairing... mimics the functionality of an IDE',
    media: editorExample,
    type: 'image',
  },
  {
    icon: 'PreviewIcon',
    title: 'Preview',
    description:
      'Allows you to preview your work before exporting it, comes with a controllable player equipped with a slider to easily navigate through your code snapshots',
    media: previewExample,
    type: 'image',
  },
];

export const faqs = [
  {
    question: 'What video formats are available?',
    answer: 'Currently supports the WebM video format.',
  },
  {
    question: 'How is the video quality ensured?',
    answer: 'Good quality by using canvas, currently HD (1280 x 720p).',
  },
  {
    question: 'What themes are supported?',
    answer:
      'Variety of themes check react-codemirror docs: https://uiwjs.github.io/react-codemirror/#/theme/home',
  },
  {
    question: 'What about privacy and security?',
    answer:
      "We're planning to move to an offline-first approach, which means there will be no servers involved, and all your work will be stored in your local storage.",
  },
];
