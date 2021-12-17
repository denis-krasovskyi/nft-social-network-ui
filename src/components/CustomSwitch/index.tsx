import React from 'react';

import './CustomSwitch.scss';

const ToggleSwitch: React.FC<NFTCardProps> = ({
  name,
  checked,
  onChange,
  optionLabels = ['Yes', 'No'],
}) => {
  return (
    <div className="toggle-switch">
      <input
        type="checkbox"
        name={name}
        className="toggle-switch-checkbox"
        id={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="toggle-switch-label" htmlFor={name}>
        <span
          className="toggle-switch-inner"
          data-yes={optionLabels[0]}
          data-no={optionLabels[1]}
        />
        <span className="toggle-switch-switch" />
      </label>
    </div>
  );
};

type NFTCardProps = {
  checked: boolean;
  onChange: (e: boolean) => void;
  name: string;
  optionLabels: string[];
};

export default ToggleSwitch;
