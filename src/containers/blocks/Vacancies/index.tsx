import React, { FC } from 'react';
import { useToggle } from 'react-use';
import classNames from 'classnames';

import Button from 'components/ui-kit/Button';
import Filter from 'components/Filter';
import Typography from 'components/ui-kit/Typography';

import { ReactComponent as AddIcon } from 'assets/icons/icon-add.svg';
import { ReactComponent as GroupByIcon } from 'assets/icons/icon-group_by.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/icon-search.svg';

import styles from './Vacancies.module.scss';

const Vacancies: FC = () => {
  const [hasVacancies] = useToggle(true);
  const handleFilterClick = () => null;

  return (
    <>
      <div
        className={classNames(styles.contentSpaceBetween, {
          [styles.disabled]: !hasVacancies,
        })}
      >
        <Filter
          onClick={handleFilterClick}
          label="Group by"
          caption="Vacancy"
          icon={<GroupByIcon className={styles.iconBtn} />}
          className={styles.filterPreferences}
        />
        <Button variant="ghost">
          <SearchIcon />
        </Button>
      </div>

      {hasVacancies ? (
        <Typography className={styles.vacanciesTotal} variant="subtitle4">
          8 vacancies
        </Typography>
      ) : (
        <div className={styles.noVacancies}>
          <Typography variant="h2">No vacancies</Typography>
          <Typography variant="body2">Let’s add your first vacancy</Typography>
        </div>
      )}

      <Button
        variant="primary"
        size="large"
        className={styles.addVacancyBtn}
        startIcon={<AddIcon />}
        fullWidth
      >
        Add a vacancy
      </Button>
    </>
  );
};

export default Vacancies;
