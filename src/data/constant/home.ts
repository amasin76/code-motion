import React from 'react';
import {
  ApertureIcon,
  CodeIcon,
  PaletteIcon,
  PencilRulerIcon,
  Share2Icon,
  SmileIcon,
} from 'lucide-react';

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
