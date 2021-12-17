import React from 'react';
import classNames from 'classnames';
import { useToggle } from 'react-use';

import Avatar from 'components/ui-kit/Avatar';
import Typography from 'components/ui-kit/Typography';
import Button from 'components/ui-kit/Button';
import { BottomSheet } from 'components/ui-kit/ModalSheet';
import CustomSwitch from 'components/CustomSwitch';

import { ReactComponent as IconExternal } from 'assets/icons/icon-external.svg';
import { ReactComponent as IconChat } from 'assets/icons/icon-chat.svg';
import { ReactComponent as IconChatActive } from 'assets/icons/icon-chat-active.svg';
import { ReactComponent as IconLike } from 'assets/icons/icon-like.svg';
import { ReactComponent as IconLikeActive } from 'assets/icons/icon-like-active.svg';
import { ReactComponent as IconBox } from 'assets/icons/icon-box.svg';
import { ReactComponent as IconBoxActive } from 'assets/icons/icon-box-active.svg';
import { ReactComponent as IconDots } from 'assets/icons/icon-dots.svg';
import { ReactComponent as IconDotsActive } from 'assets/icons/icon-dots-active.svg';
import HiddenIcon from 'assets/images/hidden-object.png';

import styles from './NFTCard.module.scss';

const NFTCard: React.FC<NFTCardProps> = ({
  className,
  userName,
  userAvatar,
  likesCount,
  commentsCount,
  isLiked = false,
  isCommented = false,
  nftName,
  nftLink,
  assetLink,
  showOwnerInfo = false,
  id,
  showExtraControls = false,
}) => {
  const [showControlModalSheet, setShowControlModalSheet] = useToggle(false);
  const [showReportModalSheet, setShowReportModalSheet] = useToggle(false);
  const [hideCard, setHideCard] = useToggle(false);

  return (
    <div className={classNames(styles.card, className)}>
      <div className={styles.content}>
        {showOwnerInfo && (
          <div className={styles.cardHeader}>
            <Avatar alt={userName} src={userAvatar} className={styles.avatar} />

            <Typography variant="heading5" className={styles.cardHeaderText}>
              {userName}
            </Typography>

            <Button
              className={styles.moreButton}
              onClick={() => setShowReportModalSheet(true)}
            >
              {showControlModalSheet ? <IconDotsActive /> : <IconDots />}
            </Button>
          </div>
        )}

        <div className={styles.cardContent}>
          <img src={assetLink} alt={nftName} className={styles.asset} />

          {showExtraControls && (
            <Button
              className={styles.controlButton}
              onClick={() => setShowControlModalSheet(true)}
            >
              {showControlModalSheet ? <IconBoxActive /> : <IconBox />}
            </Button>
          )}

          {hideCard && (
            <div className={styles.hideOverlay}>
              <img src={HiddenIcon} alt="hide icon" />
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <Button
            href={nftLink}
            variant="ghost"
            className={styles.footerExternal}
          >
            <Typography variant="heading5">{nftName}</Typography>

            <IconExternal height={14} className={styles.footerExternalIcon} />
          </Button>

          <Button
            href={`#/cabinet/nft/${id}`}
            variant="ghost"
            className={styles.footerComment}
            startIcon={
              isCommented ? (
                <IconChatActive height={20} />
              ) : (
                <IconChat height={20} />
              )
            }
          >
            <Typography variant="body3">{commentsCount}</Typography>
          </Button>

          <Button variant="ghost">
            {isLiked ? <IconLikeActive /> : <IconLike />}

            <Typography variant="body3" className={styles.footerCommentText}>
              {likesCount}
            </Typography>
          </Button>
        </div>
      </div>

      <BottomSheet
        open={showControlModalSheet}
        snapPoints={({ minHeight }) => minHeight}
        onDismiss={() => setShowControlModalSheet(false)}
        initialFocusRef={false}
      >
        <div className={styles.sheetContent}>
          <Button
            variant="ghost"
            fullWidth
            className={styles.sheetContentButton}
          >
            <Typography
              variant="body2"
              className={styles.sheetContentButtonText}
            >
              Copy Link
            </Typography>
          </Button>

          <Button
            variant="ghost"
            fullWidth
            className={styles.sheetContentButton}
          >
            <Typography
              variant="body2"
              className={styles.sheetContentButtonText}
            >
              Share via...
            </Typography>
          </Button>

          <Button
            variant="ghost"
            fullWidth
            className={styles.sheetContentButton}
          >
            <Typography
              variant="body2"
              className={styles.sheetContentButtonText}
            >
              Post on Instagram
            </Typography>
          </Button>

          <div className={styles.sheetContentSeparator} />

          <div className={styles.hideControl}>
            <div className={styles.hideControlColumn}>
              <Typography
                variant="heading6"
                className={styles.sheetContentButtonText}
              >
                Hide NFT
              </Typography>

              <Typography
                variant="label1"
                className={styles.sheetContentButtonText}
              >
                If you don’t want this NFT to appear in your account switch to
                HIDE
              </Typography>
            </div>

            <CustomSwitch
              onChange={(e) => setHideCard(e)}
              name="hide"
              checked={hideCard}
              optionLabels={['Show', 'Hide']}
            />
          </div>
        </div>
      </BottomSheet>

      <BottomSheet
        open={showReportModalSheet}
        snapPoints={({ minHeight }) => minHeight}
        onDismiss={() => setShowReportModalSheet(false)}
        initialFocusRef={false}
      >
        <div
          className={classNames(styles.sheetContent, styles.reportSheetContent)}
        >
          <Button
            variant="ghost"
            fullWidth
            className={styles.sheetContentButton}
          >
            <Typography
              variant="body2"
              className={styles.sheetContentButtonText}
            >
              Copy Link
            </Typography>
          </Button>

          <Button
            variant="ghost"
            fullWidth
            className={styles.sheetContentButton}
          >
            <Typography
              variant="body2"
              className={styles.sheetContentButtonText}
            >
              Share via...
            </Typography>
          </Button>

          <Button
            variant="ghostError"
            fullWidth
            className={styles.sheetContentButton}
          >
            <Typography
              variant="body2"
              className={styles.sheetContentButtonText}
            >
              Report
            </Typography>
          </Button>
        </div>
      </BottomSheet>
    </div>
  );
};

type NFTCardProps = {
  className?: string;
  userName?: string;
  userAvatar?: string;
  showOwnerInfo: boolean;
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  isCommented?: boolean;
  nftName: string;
  nftLink: string;
  assetLink: string;
  id: number;
  showExtraControls?: boolean;
};

export default NFTCard;
