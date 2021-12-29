import React, { useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { RootState } from 'store';

import Avatar from 'components/ui-kit/Avatar';
import Button from 'components/ui-kit/Button';

import { ReactComponent as IconSend } from 'assets/icons/icon-send.svg';

import styles from './AddNewComment.module.scss';

const AddNewComment: React.FC<AddNewCommentProps> = ({
  className,
  handleOnSubmit,
}) => {
  const { user } = useSelector((state: RootState) => state);
  const [newComment, setNewComment] = useState<string>('');

  const onSubmit = () => {
    handleOnSubmit(newComment);

    setNewComment('');
  };

  return (
    <div className={classNames(styles.addCommentWrapper, className)}>
      <div className={styles.addComment}>
        <Avatar
          alt={user.username || ''}
          src={user.avatar}
          className={styles.addCommentAvatar}
        />

        <input
          type="text"
          className={styles.addCommentInput}
          placeholder="Add your comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />

        <Button
          className={classNames(styles.addCommentButton, {
            [styles.visible]: newComment.length > 0,
          })}
          variant="ghost"
          onClick={onSubmit}
        >
          <IconSend />
        </Button>
      </div>
    </div>
  );
};

type AddNewCommentProps = {
  className?: string;
  handleOnSubmit: (e: string) => void;
};

export default AddNewComment;
