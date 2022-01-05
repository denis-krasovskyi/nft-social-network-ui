import React, { useRef, useEffect } from 'react';
import { useToggle } from 'react-use';

import Button from 'components/ui-kit/Button';
import ScreenHeader from 'components/ScreenHeader';
import { BottomSheet } from 'components/ui-kit/ModalSheet';

import EmptyAvatar from 'assets/images/empty-avatar.svg';
import { ReactComponent as EditIcon } from 'assets/icons/icon-edit-alternative.svg';

import styles from './AvatarUpload.module.scss';

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  onChange,
  onError,
  preview,
  fieldName = 'avatar',
  error = false,
  accept,
}) => {
  const [isOpen, toggleOpen] = useToggle(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error) onError?.();
  }, [error, onError]);

  const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files?.[0]) return;
    toggleOpen(false);
    onChange?.(e.currentTarget.files[0]);
  };

  const openFileDialog = () => inputRef.current?.click();

  return (
    <>
      <div className={styles.editImageRoot}>
        <button
          type="button"
          className={styles.imagePlaceholder}
          onClick={toggleOpen}
        >
          <input
            type="file"
            ref={inputRef}
            className={styles.imageInput}
            accept={accept || '.jpg, .png, .gif'}
            name={fieldName}
            onChange={handleImageInputChange}
          />

          <img
            src={preview || EmptyAvatar}
            alt="User avatar"
            className={styles.imagePreview}
          />

          <EditIcon className={styles.editIcon} />
        </button>
      </div>

      <BottomSheet
        open={isOpen}
        snapPoints={({ minHeight }) => minHeight}
        onDismiss={toggleOpen}
        initialFocusRef={false}
      >
        <ScreenHeader title="Edit Avatar" onBackButtonClick={toggleOpen} />
        <div className={styles.sheetContent}>
          <Button variant="outlined" onClick={openFileDialog} fullWidth>
            Take photo
          </Button>

          <Button
            variant="outlined"
            onClick={openFileDialog}
            fullWidth
            className={styles.sheetButton}
          >
            Choose from library
          </Button>

          <Button variant="ghostError" onClick={openFileDialog} fullWidth>
            Delete
          </Button>
        </div>
      </BottomSheet>
    </>
  );
};

export type AvatarUploadProps = {
  onChange?(img: File): void;
  onError?(): void;
  preview?: string;
  fieldName: string;
  error?: boolean;
  accept?: string;
};

export default AvatarUpload;
