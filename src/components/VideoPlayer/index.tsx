import React, { useRef, useState } from 'react';
import classNames from 'classnames';

import IconButton from 'components/ui-kit/IconButton';

import { ReactComponent as LogoHackathonFEIcon } from 'assets/icons/icon-logo.svg';

import styles from './VideoPlayer.module.scss';

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoLink, className }) => {
  const video$ = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const onPlayClickHandler = async () => {
    if (!playing) {
      await video$.current.play();
      return;
    }

    video$.current.pause();
  };

  return (
    <div className={classNames(className, styles.root)}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        src={videoLink}
        ref={video$}
        className={styles.video}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        playsInline
        preload="metadata"
      />

      <IconButton onClick={onPlayClickHandler} className={styles.playBtn}>
        <LogoHackathonFEIcon
          className={classNames(styles.playIcon, { [styles.opaque]: playing })}
        />
      </IconButton>
    </div>
  );
};

export type VideoPlayerProps = {
  className?: string;
  videoLink?: string;
};

export default VideoPlayer;
