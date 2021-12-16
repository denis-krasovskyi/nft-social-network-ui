import React from 'react';
import classNames from 'classnames';
import MuiChip, { ChipProps } from '@mui/material/Chip';

import styles from './Chip.module.scss';

const Chip: React.FC<Props> = ({ selected, ...muiChipProps }) => {
  return (
    <MuiChip
      {...muiChipProps}
      classes={{
        ...muiChipProps.classes,
        root: classNames(muiChipProps.classes?.root, {
          [styles.filledRoot]: muiChipProps.variant === 'filled',
          [styles.filledRootSelected]:
            selected && muiChipProps.variant === 'filled',

          [styles.outlinedRoot]: muiChipProps.variant === 'outlined',
          [styles.selectedOutlinedRoot]:
            selected && muiChipProps.variant === 'outlined',

          [styles.filledSecondaryRoot]: muiChipProps.color === 'secondary',
        }),
        label: classNames(muiChipProps.classes?.label, {
          [styles.filledLabel]: muiChipProps.variant === 'filled',

          [styles.outlinedLabel]: muiChipProps.variant === 'outlined',
          [styles.selectedOutlinedLabel]:
            selected && muiChipProps.variant === 'outlined',
        }),
      }}
    />
  );
};

type Props = ChipProps<'div', { selected?: boolean }>;

export default Chip;
