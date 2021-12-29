import React, { FC, useRef, useState, useCallback, useEffect } from 'react';

import Button from 'components/ui-kit/Button';
import ScreenHeader from 'components/ScreenHeader';
import { BottomSheet } from 'components/ui-kit/ModalSheet';

import EmptyAvatar from 'assets/images/empty-avatar.svg';
import { ReactComponent as EditIcon } from 'assets/icons/icon-edit-alternative.svg';

import styles from './AvatarUpload.module.scss';

const AvatarUpload: FC<AvatarUploadProps> = ({
  onChange,
  onError,
  value,
  fieldName = 'avatar',
  error = false,
}) => {
  const [isOpen, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!imageFile) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.onloadend = () => {
      onChange(fileReader.result as string);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile]);

  useEffect(() => {
    if (error && onError) onError();
  }, [error, onError]);

  const openSheet = useCallback(() => setOpen(true), []);

  const closeSheet = useCallback(() => setOpen(false), []);

  const handleImageInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.currentTarget.files?.[0]) return;
      closeSheet();
      setImageFile(e.currentTarget.files[0]);
    },
    [closeSheet],
  );

  const openFileDialog = useCallback(() => inputRef.current?.click(), []);

  return (
    <>
      <div className={styles.editImageRoot}>
        <button
          type="button"
          className={styles.imagePlaceholder}
          onClick={openSheet}
        >
          <input
            type="file"
            className={styles.imageInput}
            ref={inputRef}
            accept=".jpg, .png, .gif"
            name={fieldName}
            onChange={handleImageInputChange}
          />

          <img
            src={value || EmptyAvatar}
            alt="User avatar"
            className={styles.imagePreview}
          />

          <EditIcon className={styles.editIcon} />
        </button>
      </div>

      <BottomSheet
        open={isOpen}
        snapPoints={({ minHeight }) => minHeight}
        onDismiss={closeSheet}
        initialFocusRef={false}
      >
        <ScreenHeader title="Edit Avatar" onBackButtonClick={closeSheet} />
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
  onChange(img: string): void;
  onError?(): void;
  value?: string;
  fieldName?: string;
  error?: boolean;
};

export default AvatarUpload;
