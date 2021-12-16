import React from 'react';
import classNames from 'classnames';
import MuiButton, { ButtonProps } from '@mui/material/Button';

import styles from './Button.module.scss';

const EXTENDED_VARIANTS_CLASSES_MAP = {
  primary: styles.primary,
  secondary: styles.secondary,
  tertiary: styles.tertiary,
  ghost: styles.ghost,
  primaryError: styles.primaryError,
  tertiaryError: styles.tertiaryError,
  ghostError: styles.ghostError,
};

const Button: React.FC<Props> = ({ variant, ...otherProps }) => {
  const extendedVariantClassName = EXTENDED_VARIANTS_CLASSES_MAP[
    variant
  ] as string;

  const isExtendedVariant = Boolean(extendedVariantClassName);

  const finalVariant = isExtendedVariant
    ? undefined
    : (variant as Exclude<
        typeof variant,
        keyof typeof EXTENDED_VARIANTS_CLASSES_MAP
      >);

  return (
    <MuiButton
      {...otherProps}
      variant={finalVariant}
      className={classNames(otherProps.className, extendedVariantClassName)}
    />
  );
};

type Props = Omit<ButtonProps, 'variant'> & {
  variant?: ButtonProps['variant'] | keyof typeof EXTENDED_VARIANTS_CLASSES_MAP;
  component?: React.ElementType;
  to?: string;
};

export default Button;
