import React from 'react';
import classNames from 'classnames';

import './Spinner.scss';

const Spinner: React.FC<SpinnerProps> = ({ className }) => (
  <div className={classNames('lds-default', className)}>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
);

type SpinnerProps = {
  className?: string;
};

export default Spinner;
