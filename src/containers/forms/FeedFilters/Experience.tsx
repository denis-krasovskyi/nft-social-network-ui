import React from 'react';
import classNames from 'classnames';

import TextField from 'components/ui-kit/TextField';
import Button from 'components/ui-kit/Button';
import Chip from 'components/ui-kit/Chip';

import { ReactComponent as AddIcon } from 'assets/icons/icon-add.svg';
import { ReactComponent as DoneIcon } from 'assets/icons/icon-done.svg';

import styles from './FeedFilters.module.scss';

export const EXPERIENCE = {
  '<1': { from: 0, to: 1 },
  '1-3': { from: 1, to: 3 },
  '3-5': { from: 3, to: 5 },
  '5-7': { from: 5, to: 7 },
  '7-10': { from: 7, to: 10 },
} as const;

const Experience: React.FC<ExperienceProps> = ({
  currentValue,
  onValueChange,
  onCustomValueChange,
  list,
  onResetClick,
}) => {
  const customExperienceIndex = currentValue.findIndex((i) => i.isCustom);
  const customExperienceIsSelected = customExperienceIndex > -1;

  return (
    <>
      <div className={classNames(styles.paddingSide, styles.mgBottomM)}>
        <Chip
          variant="outlined"
          clickable
          selected={currentValue.length === 0}
          label="Any Years of experience"
          className={classNames(
            styles.chip,
            styles.mgBottomSm,
            styles.chipDisabled,
          )}
          onClick={() => {
            onValueChange([]);
          }}
          disabled={currentValue.length === 0}
        />

        {list.map((item) => {
          const selectedIndex = currentValue.findIndex(
            (i) => JSON.stringify(i) === JSON.stringify(item.value),
          );
          const selected = selectedIndex > -1;

          return (
            <Chip
              key={item.label}
              variant="outlined"
              clickable
              selected={selected}
              label={item.label}
              icon={selected ? <DoneIcon /> : <AddIcon />}
              onClick={() => {
                if (selected) {
                  onValueChange(
                    currentValue.filter((_, i) => i !== selectedIndex),
                  );
                  return;
                }

                onValueChange([...currentValue, item.value]);
              }}
              className={classNames(styles.chip, styles.mgBottomSm)}
              classes={{
                icon: styles.workRightsChipIcon,
              }}
            />
          );
        })}

        <Chip
          variant="outlined"
          clickable
          selected={customExperienceIsSelected}
          label="Custom..."
          className={classNames(styles.chip, styles.mgBottomSm)}
          onClick={() => {
            if (customExperienceIsSelected) {
              onValueChange(currentValue.filter((i) => !i.isCustom));
              return;
            }

            onValueChange([...currentValue, { isCustom: true }]);
          }}
        />
      </div>

      {customExperienceIsSelected && (
        <div className={classNames(styles.mgBottomL, styles.customExpRange)}>
          <div className={styles.customExpRangeFields}>
            <TextField
              InputProps={{
                name: `experience[${customExperienceIndex}].from`,
                value: currentValue[customExperienceIndex].from ?? '',
                onChange: (e) => {
                  onCustomValueChange(e.target.value.replace(/\D/g, ''), {
                    type: 'from',
                    index: customExperienceIndex,
                  });
                },
              }}
              label="Min"
              size="medium"
              className={styles.customRangeField}
            />
            {' - '}
            <TextField
              InputProps={{
                name: `experience[${customExperienceIndex}].to`,
                value: currentValue[customExperienceIndex].to ?? '',
                onChange: (e) => {
                  onCustomValueChange(e.target.value.replace(/\D/g, ''), {
                    type: 'to',
                    index: customExperienceIndex,
                  });
                },
              }}
              label="Max"
              size="medium"
              className={styles.customRangeField}
            />
          </div>

          <Button
            type="button"
            variant="ghost"
            onClick={(e) => onResetClick?.(e, customExperienceIndex)}
            className={styles.resetCustomExpRangeFieldsBtn}
          >
            Reset
          </Button>
        </div>
      )}
    </>
  );
};

export type ExperienceValue = {
  from?: number | string;
  to?: number | string;
  isCustom?: boolean;
};

type ExperienceProps = {
  list: { label: string; value: ExperienceValue }[];
  currentValue: ExperienceValue[];
  onValueChange: (nextValue: ExperienceValue[]) => void;
  onCustomValueChange: (
    nextValue: string,
    aux: { type?: 'to' | 'from'; index: number },
  ) => void;
  onResetClick?: (e: React.MouseEvent, index: number) => void;
};

export default Experience;
