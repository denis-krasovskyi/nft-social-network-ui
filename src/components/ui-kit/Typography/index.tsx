import React from 'react';
import classNames from 'classnames';
import MuiTypography, { TypographyProps } from '@mui/material/Typography';

import styles from './Typography.module.scss';

export const EXTENDED_VARIANTS_MAPPING = {
  /** custom-variant: typography "component" prop value */
  display: 'h1',

  heading1: 'h5',
  heading2: 'h5',
  heading3: 'h5',
  heading4: 'h5',

  title1: 'h5',
  title2: 'h5',
  title3: 'h5',
  title4: 'h5',
  title5: 'h5',
  title6: 'h5',

  body1: 'p',
  body2: 'p',
  body3: 'p',

  tagline1: 'p',
  tagline2: 'p',

  caption1: 'span',
  caption2: 'span',
  caption3: 'span',
  /// // old one

  subtitle3: 'h6',
  subtitle4: 'h6',

  paragraph1: 'p',

  button2: 'p',
  button3: 'p',

  label1: 'span',

  link1: 'span',
  link2: 'span',

  additional1: 'span',
} as const;

const EXTENDED_VARIANTS_CLASSES_MAP = {
  display: styles.display,

  heading1: styles.heading1,
  heading2: styles.heading2,
  heading3: styles.heading3,
  heading4: styles.heading4,

  title1: styles.title1,
  title2: styles.title2,
  title3: styles.title3,
  title4: styles.title4,
  title5: styles.title5,
  title6: styles.title6,

  tagline1: styles.tagline1,
  tagline2: styles.tagline2,

  body1: styles.body1,
  body2: styles.body2,
  body3: styles.body3,

  caption1: styles.caption1,
  caption2: styles.caption2,
  caption3: styles.caption3,
  /// // old one

  subtitle3: styles.subtitle3,
  subtitle4: styles.subtitle4,

  paragraph1: styles.paragraph1,

  button2: styles.button2,
  button3: styles.button3,

  label1: styles.label1,

  link1: styles.link1,
  link2: styles.link2,

  additional1: styles.additional1,
};

const Typography: React.FC<Props> = ({ variant, component, ...otherProps }) => {
  const extendedVariantComponent = EXTENDED_VARIANTS_MAPPING[
    variant
  ] as ValueOf<typeof EXTENDED_VARIANTS_MAPPING>;

  const isExtendedVariant = Boolean(extendedVariantComponent);

  const finalVariant = isExtendedVariant
    ? undefined
    : (variant as Exclude<
        typeof variant,
        keyof typeof EXTENDED_VARIANTS_MAPPING
      >);

  return (
    <MuiTypography
      {...otherProps}
      variant={finalVariant}
      component={component || extendedVariantComponent}
      className={classNames(
        otherProps.className,
        EXTENDED_VARIANTS_CLASSES_MAP[variant],
      )}
    />
  );
};

type Props = Omit<TypographyProps, 'variant'> & {
  variant?: TypographyProps['variant'] | keyof typeof EXTENDED_VARIANTS_MAPPING;
  component?: React.ElementType;
};

type ValueOf<T> = T[keyof T];

export default Typography;
