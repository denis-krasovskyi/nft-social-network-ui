import React from 'react';
import {
  useWindowScroll,
  useAsync,
  useLocalStorage,
  useAsyncFn,
} from 'react-use';
import classNames from 'classnames';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Button from 'components/ui-kit/Button';
import FollowersBlock from 'components/FollowersBlock';
import Spinner from 'components/Spinner';
import UserBio from 'components/UserBio';
import Typography from 'components/ui-kit/Typography';
import { getMyNftsRequest, setPersonalNftVisibilityRequest } from 'api/nfts';
import {
  userSelector,
  defaultUserNearAccSelector,
  setUserNfts,
  setUserNftVisibility,
} from 'store/user';

import { ReactComponent as IconSettings } from 'assets/icons/icon-menu-2.svg';
import { ReactComponent as IconList } from 'assets/icons/icon-list.svg';
import { ReactComponent as IconListActive } from 'assets/icons/icon-list-active.svg';
import { ReactComponent as IconGrid } from 'assets/icons/icon-grid.svg';
import { ReactComponent as IconGridActive } from 'assets/icons/icon-grid-active.svg';
import { ReactComponent as IconLogo } from 'assets/icons/icon-logo.svg';
import { ReactComponent as IconWarning } from 'assets/icons/icon-warning.svg';

import NFTList from './NFTList';

import styles from './Account.module.scss';

const Account: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isListView, setIsListView] = useLocalStorage('accountListView', true);
  const { y: windowYScroll } = useWindowScroll();

  const user = useSelector(userSelector);
  const userNearAcc = useSelector(defaultUserNearAccSelector);

  useAsync(async () => {
    if (user.nfts?.list) return;

    const { data } = await getMyNftsRequest();

    dispatch(setUserNfts({ total: data.total, list: data.data }));
  }, [Boolean(user.nfts)]);

  const [{ loading: setUserNftVisibilityLoading }, setPersonalNftVisibility] =
    useAsyncFn(
      async (p: Parameters<typeof setPersonalNftVisibilityRequest>[0]) => {
        const { data } = await setPersonalNftVisibilityRequest(p);

        dispatch(
          setUserNftVisibility({ id: data.id, visible: Boolean(data.visible) }),
        );
      },
      [],
    );

  return (
    <div className={styles.root}>
      <div
        className={classNames(styles.header, {
          [styles.headerShadow]: windowYScroll > 5,
        })}
      >
        <IconLogo />

        <Button
          className={styles.headerButton}
          variant="ghost"
          component={Link}
          to="/cabinet/edit"
        >
          <IconSettings />
        </Button>
      </div>

      {userNearAcc?.enabled === false && (
        <div className={styles.errorBlock}>
          <IconWarning />

          <Typography variant="body3" className={styles.errorBlockText}>
            Your wallet is disabled. All NFTs from this wallet cannot be seen by
            other users.
          </Typography>
        </div>
      )}

      <UserBio
        showSubscribe={false}
        walletUrl={user.wallets?.[0].walletUrl || ''}
        walletName={user.wallets?.[0].walletName || ''}
        username={user.username || userNearAcc?.accountId || ''}
        bio={user.bio || ''}
        avatar={user.avatar || ''}
      />

      <div
        className={classNames(styles.viewControl, {
          [styles.viewControlListView]: isListView,
        })}
      >
        <FollowersBlock
          className={styles.followers}
          followers={user.followers || 0}
          following={user.following || 0}
          followersLink={`/cabinet/followers/${user.id}`}
          followingLink={`/cabinet/followers/${user.id}`}
        />

        <Button
          variant="ghost"
          onClick={() => setIsListView(true)}
          className={classNames(styles.control, {
            [styles.controlActive]: isListView,
          })}
        >
          {isListView ? <IconListActive /> : <IconList />}
        </Button>

        <Button
          variant="ghost"
          onClick={() => setIsListView(false)}
          className={classNames(styles.control, {
            [styles.controlActive]: !isListView,
          })}
        >
          {isListView ? <IconGrid /> : <IconGridActive />}
        </Button>
      </div>

      {!user.nfts && <Spinner className={styles.spinner} />}

      {user.nfts && (
        <NFTList
          total={user.nfts.total}
          list={user.nfts.list.map((item) => ({
            id: item.id,
            assetUrl: item.media,
            authorUsername: user.username || '',
            authorAvatarUrl: user.avatar || '',
            assetTitle: item.metadata?.title,
            visible: item.visible !== false,
          }))}
          gridViewEnabled={!isListView}
          onMore={(_, e) => {
            e?.preventDefault?.();
            e?.stopPropagation?.();
          }}
          onItemClick={({ id }) => {
            history.push(`/cabinet/nft/${id}`);
          }}
          onChangeNftVisibilityClick={({ id, visible }) => {
            setPersonalNftVisibility({ id, visible: !visible });
          }}
          onCopyNftClick={async ({ id }) => {
            await navigator.clipboard.writeText(`/cabinet/nft/${id}`);
          }}
          onShareNftClick={async ({ id }) => {
            await navigator.share?.(
              `/cabinet/nft/${id}` as unknown as ShareData,
            );
          }}
          toggleNftVisilibtyBtnDisabled={setUserNftVisibilityLoading}
        />
      )}
    </div>
  );
};

export default Account;
