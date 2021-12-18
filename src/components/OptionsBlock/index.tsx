import React from 'react';
import classNames from 'classnames';
import { useToggle } from 'react-use';

import Typography from 'components/ui-kit/Typography';

import styles from './OptionsBlock.module.scss';

const OptionsBlock: React.FC<OptionsBlockProps> = ({
  className,
  firstOptionName,
  firstOptionCallback,
  secondOptionName,
  secondOptionCallback,
  firstOptionCaption,
  secondOptionCaption,
}) => {
  const [isFirstOptionActive, setIsFirstOptionActive] = useToggle(true);

  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.optionsBlock}>
        <button
          type="button"
          onClick={() => {
            firstOptionCallback();

            setIsFirstOptionActive(true);
          }}
          className={classNames(styles.optionsLink, {
            [styles.active]: isFirstOptionActive,
          })}
        >
          <Typography variant="title7" className={styles.optionsLinkTitle}>
            {firstOptionName}

            {firstOptionCaption && (
              <Typography
                variant="body2"
                component="span"
                className={styles.optionsLinkCaption}
              >
                {firstOptionCaption}
              </Typography>
            )}
          </Typography>
        </button>

        <button
          type="button"
          onClick={() => {
            secondOptionCallback();

            setIsFirstOptionActive(false);
          }}
          className={classNames(styles.optionsLink, {
            [styles.active]: !isFirstOptionActive,
          })}
        >
          <Typography variant="title7" className={styles.optionsLinkTitle}>
            {secondOptionName}

            {secondOptionCaption && (
              <Typography
                variant="body2"
                component="span"
                className={styles.optionsLinkCaption}
              >
                {secondOptionCaption}
              </Typography>
            )}
          </Typography>
        </button>
      </div>
    </div>
  );
};

type OptionsBlockProps = {
  className?: string;
  firstOptionName: string;
  firstOptionCaption?: string;
  firstOptionCallback: () => void;
  secondOptionName: string;
  secondOptionCaption?: string;
  secondOptionCallback: () => void;
};

export default OptionsBlock;
