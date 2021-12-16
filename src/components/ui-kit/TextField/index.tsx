import React from 'react';
import classNames from 'classnames';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';

import styles from './TextField.module.scss';

const TextField: React.FC<Props> = ({ size, ...textFieldProps }) => {
  return (
    <MuiTextField
      {...(textFieldProps as TextFieldProps)}
      size={size === 'large' ? undefined : size}
      className={classNames(textFieldProps.className, {
        [styles.smallRoot]: size === 'small',
        [styles.mediumRoot]: size === 'medium',
        [styles.largeRoot]: size === 'large',
      })}
      InputProps={{
        ...textFieldProps.InputProps,
        classes: {
          ...textFieldProps.InputProps?.classes,
          input: classNames(textFieldProps.InputProps?.classes?.input, {
            [styles.smallInput]: size === 'small',
            [styles.mediumInput]: size === 'medium',
          }),
        },
      }}
      InputLabelProps={{
        ...textFieldProps.InputLabelProps,
        className: classNames(textFieldProps.InputLabelProps?.className, {
          [styles.smallLabel]: size === 'small',
          [styles.mediumLabel]: size === 'medium',
        }),
      }}
    />
  );
};

type Props = Omit<TextFieldProps, 'size'> & {
  size?: 'small' | 'medium' | 'large';
};

TextField.defaultProps = {
  size: 'medium',
};

export default TextField;
