import { SVGProps } from 'react';

interface NavItem {
  title: string;
  to?: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: SVGProps<SVGSVGElement>;
  label?: string;
}

interface NavItemWithChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export const mainMenu: NavItemWithChildren[] = [
  {
    title: 'Studio',
    to: 'studio',
  },
  {
    title: 'About',
    to: 'about',
  },
  {
    title: 'Support',
    to: 'support',
  },
];

export const sideMenu: NavItemWithChildren[] = [];
