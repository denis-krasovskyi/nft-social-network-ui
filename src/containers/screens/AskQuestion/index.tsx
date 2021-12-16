import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import AskQuestionForm from 'containers/forms/AskQuestion';

import ScreenHeader from 'components/ScreenHeader';
import Button from 'components/ui-kit/Button';
import Typography from 'components/ui-kit/Typography';

import styles from './AskQuestion.module.scss';

const AskQuestionScreen: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const history = useHistory();

  return (
    <div className={styles.root}>
      <ScreenHeader
        title="Ask a Question"
        onBackButtonClick={() => history.push('/sign-in')}
      />
      {isSubmitted ? (
        <>
          <div className={styles.results}>
            <Typography
              variant="h2"
              align="center"
              className={styles.resultsTitle}
            >
              Thanks for your report
            </Typography>

            <Typography
              variant="body2"
              align="center"
              className={styles.resultsText}
            >
              We’ll answer you soon.
            </Typography>

            <Button
              variant="tertiary"
              fullWidth
              className={styles.openApp}
              onClick={() => setIsSubmitted(false)}
            >
              Ask one more question
            </Button>
          </div>
        </>
      ) : (
        <div className={styles.formRoot}>
          <AskQuestionForm onSuccess={() => setIsSubmitted(true)} />
        </div>
      )}
    </div>
  );
};

export default AskQuestionScreen;
