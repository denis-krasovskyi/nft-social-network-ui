import React from 'react';
import { Meta, Story } from '@storybook/react';
import { useFormik } from 'formik';

import Typography from 'components/ui-kit/Typography';
import SearchAutocomplete from 'components/SearchAutocomplete';
import SearchItem from 'components/SearchAutocomplete/SearchItem';
import { SnackbarProvider, useSnackbar } from 'components/ui-kit/Snackbar';

export default {
  title: 'features/SearchAutocomplete',
  component: SearchAutocomplete,
  decorators: [
    (story) => (
      <div
        style={{
          maxWidth: '640px',
          background: 'white',
          padding: '10px',
        }}
      >
        {story()}
      </div>
    ),
  ],
} as Meta;

const Template: Story<React.ComponentProps<typeof SearchAutocomplete>> = () => {
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      location: '',
    },
    onSubmit: () => null,
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <SearchAutocomplete
        InputProps={{
          name: 'location',
          value: formik.values.location,
          onChange: formik.handleChange,
          placeholder: 'Search a location',
        }}
        hideLocationIcon
        onResetClick={() => {
          formik.setFieldValue('location', '');
        }}
        onValueChanged={() => {
          enqueueSnackbar(`updated value is "${formik.values.location}"`, {
            variant: 'info',
          });
        }}
      />

      <SearchItem>
        <Typography variant="body2">Butcher</Typography>
      </SearchItem>
      <SearchItem>
        <Typography variant="body2">Butcher</Typography>
      </SearchItem>
      <SearchItem>
        <Typography variant="body2">Butcher</Typography>
      </SearchItem>
    </form>
  );
};

export const Basic = Template.bind({});
Basic.decorators = [
  (OriginalStory) => (
    <SnackbarProvider>
      <OriginalStory />
    </SnackbarProvider>
  ),
];
