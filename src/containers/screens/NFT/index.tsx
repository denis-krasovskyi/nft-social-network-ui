import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useToggle } from 'react-use';
import { Avatar } from '@mui/material';

import { calculateTimeDiff, simulateHttpRequest } from 'utils';

import { NFT } from 'api/nfts';
import { mockNfts } from 'store/user/mocks';

import ScreenHeader from 'components/ScreenHeader';
import NFTCard from 'components/NFTCard';
import Spinner from 'components/Spinner';
import Typography from 'components/ui-kit/Typography';
import AddNewComment from 'components/AddNewComment';

import styles from './NFT.module.scss';

const fetchNftData = async () => {
  await simulateHttpRequest();

  return mockNfts[0];
};

const NFTScreen: React.FC = () => {
  const history = useHistory();

  const [isLoading, setIsLoading] = useToggle(true);
  const [nft, setNft] = useState<NFT | null>(null);

  useEffect(() => {
    const getNftData = async () => {
      fetchNftData().then((res) => {
        setNft(res);

        setIsLoading(false);
      });
    };

    getNftData();
  }, [history.location.pathname, setIsLoading]);

  return (
    <div className={styles.root}>
      <ScreenHeader
        onBackButtonClick={() => {
          history.goBack();
        }}
        title={nft?.nftName || ''}
        className={styles.head}
      />

      {isLoading ? (
        <div className={styles.spinnerWrapper}>
          <Spinner className={styles.spinner} />
        </div>
      ) : (
        nft && (
          <>
            <NFTCard
              id={nft.id}
              showOwnerInfo
              userName={nft.userName}
              userAvatar={nft.userAvatar}
              likesCount={nft.likesCount}
              commentsCount={nft.comments.length}
              isLiked={nft.isLiked}
              nftName={nft.nftName}
              nftLink={nft.nftLink}
              assetLink={nft.assetLink}
              userId={nft.userId}
              className={styles.candidateCardRoot}
              showExtraControls={false}
            />

            {nft.comments.length > 0 && (
              <div className={styles.commentsList}>
                {nft.comments.map((comment) => (
                  <div className={styles.comment} key={comment.timestamp}>
                    <Avatar
                      alt={comment.authorName}
                      src={comment.authorAvatar}
                      className={styles.commentAvatar}
                    />

                    <div className={styles.commentContent}>
                      <Link to={`/cabinet/profile/${comment.authorId}`}>
                        <Typography
                          variant="heading5"
                          className={styles.commentAuthor}
                        >
                          {comment.authorName}
                        </Typography>
                      </Link>

                      <Typography variant="body3">{comment.text}</Typography>

                      <Typography
                        variant="label2"
                        className={styles.commentLabel}
                      >
                        {calculateTimeDiff(comment.timestamp)}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )
      )}

      <AddNewComment
        className={styles.addCommentWrapper}
        handleOnSubmit={() => null}
      />
    </div>
  );
};

export default NFTScreen;
