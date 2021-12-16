import React, { FC, useRef, useState, useCallback, useEffect } from 'react';

import Button from 'components/ui-kit/Button';
import Typography from 'components/ui-kit/Typography';
import ScreenHeader from 'components/ScreenHeader';
import { BottomSheet } from 'components/ui-kit/ModalSheet';

import EmptyAvatar from 'assets/images/empty-avatar.svg';
import { ReactComponent as EditIcon } from 'assets/icons/icon-edit.svg';

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
      if (!e.currentTarget.files[0]) return;
      closeSheet();
      setImageFile(e.currentTarget.files[0]);
    },
    [closeSheet],
  );

  const openFileDialog = useCallback(() => inputRef.current.click(), []);

  return (
    <>
      <div className={styles.editImageRoot}>
        <div className={styles.imagePlaceholder}>
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
          <Button
            variant="ghost"
            className={styles.editImageBtn}
            onClick={openSheet}
          >
            <EditIcon className={styles.editIcon} />
          </Button>
        </div>
        <div className={styles.labels}>
          <div className={styles.labelWrapper}>
            <Typography variant="label1" className={styles.label}>
              File format
            </Typography>
            <Typography variant="caption">JPEG, PNG, GIF</Typography>
          </div>
          <div className={styles.labelWrapper}>
            <Typography variant="label1" className={styles.label}>
              Max size
            </Typography>
            <Typography variant="caption">256x256, max 10MB</Typography>
          </div>
        </div>
      </div>
      <BottomSheet
        open={isOpen}
        snapPoints={({ minHeight }) => minHeight}
        onDismiss={closeSheet}
        initialFocusRef={false}
      >
        <ScreenHeader
          title="Change profile photo"
          onBackButtonClick={closeSheet}
        />
        <div className={styles.sheetContent}>
          <Button variant="ghost" onClick={openFileDialog}>
            New profile photo
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
