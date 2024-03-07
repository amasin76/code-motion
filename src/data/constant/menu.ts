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
    title: 'Home',
    to: '',
  },
  {
    title: 'Empty',
    to: 'empty',
  },
];

export const sideMenu: NavItemWithChildren[] = [];
