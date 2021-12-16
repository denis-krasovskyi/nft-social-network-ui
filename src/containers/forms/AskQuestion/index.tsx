import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import TextField from 'components/ui-kit/TextField';
import Button from 'components/ui-kit/Button';
import Typography from 'components/ui-kit/Typography';

import styles from './AskQuestion.module.scss';

const validationSchema = Yup.object().shape({
  question: Yup.string().required('Please Enter your question'),
});

const AskQuestionForm: React.FC<AskQuestionFormProps> = ({ onSuccess }) => {
  const formik = useFormik({
    initialValues: {
      question: '',
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: async () => {
      await onSuccess?.();
    },
  });

  const questionError =
    formik.errors.question && formik.touched.question
      ? formik.errors.question
      : undefined;

  return (
    <form onSubmit={formik.handleSubmit} className={styles.root}>
      <Typography variant="title1" className={styles.title}>
        How we can help you?
      </Typography>

      <TextField
        name="question"
        value={formik.values.question}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        fullWidth
        label="Message"
        className={styles.inputWrapper}
        multiline
        rows={15}
        error={Boolean(questionError)}
        helperText={questionError}
      />

      <Button type="submit" variant="primary" fullWidth>
        Send question
      </Button>
    </form>
  );
};

type AskQuestionFormProps = {
  onSuccess?: () => Promise<void> | void;
};

export default AskQuestionForm;
