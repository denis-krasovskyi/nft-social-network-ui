import React, { FC, SVGProps } from 'react';

import { ReactComponent as LogoIcon } from './logo.svg';

const Logo: FC<SVGProps<SVGSVGElement>> = (props) => {
  return <LogoIcon {...props} />;
};

export default Logo;
