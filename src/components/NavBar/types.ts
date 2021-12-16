import { ReactNode } from 'react';

export type NavBarLink = {
  name: string;
  text: string;
  icon: ReactNode;
  iconActive: ReactNode;
  link: string;
};
