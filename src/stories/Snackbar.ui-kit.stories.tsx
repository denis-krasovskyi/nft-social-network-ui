import React from 'react';
import { ComponentStory } from '@storybook/react';

import Typography from 'components/ui-kit/Typography';
import Button from 'components/ui-kit/Button';
import { SnackbarProvider, useSnackbar } from 'components/ui-kit/Snackbar';

export default {
  title: 'Components/Notifications',
  component: null,
};

const Template: ComponentStory<null> = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <div
      style={{
        maxWidth: '700px',
        background: 'var(--color-grey-100)',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: '0 20px',
      }}
    >
      <Typography variant="h2" style={{ marginBottom: '20px' }}>
        enqueue snackbar/show notification
      </Typography>

      <Button
        onClick={() => {
          enqueueSnackbar('Video is updated ', {
            variant: 'success',
          });
        }}
        variant="primary"
        style={{ marginBottom: '20px' }}
      >
        show success
      </Button>

      <Button
        onClick={() => {
          enqueueSnackbar('Video is updated ', {
            variant: 'info',
          });
        }}
        variant="secondary"
        style={{ marginBottom: '20px' }}
      >
        show info
      </Button>

      <Button
        onClick={() => {
          enqueueSnackbar('Video is updated', {
            variant: 'warning',
            autoHideDuration: null,
            action: (key) => (
              <Button
                variant="ghost"
                onClick={() => {
                  closeSnackbar(key);
                }}
              >
                Verify
              </Button>
            ),
          });
        }}
        variant="tertiary"
        style={{ marginBottom: '20px' }}
      >
        show warning
      </Button>

      <Button
        onClick={() => {
          enqueueSnackbar('Video is updated ', {
            variant: 'error',
            autoHideDuration: null,
          });
        }}
        variant="ghostError"
        style={{ marginBottom: '20px' }}
      >
        show error
      </Button>
    </div>
  );
};

export const Basic = Template.bind({});
Basic.decorators = [
  (Story) => (
    <SnackbarProvider>
      <Story />
    </SnackbarProvider>
  ),
];
