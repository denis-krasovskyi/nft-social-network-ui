import React from 'react';
import cn from 'classnames';
import MuiTooltip, { TooltipProps } from '@mui/material/Tooltip';
import s from './Tooltip.module.scss';

const Tooltip: React.FC<TooltipProps> = ({ ...props }) => (
  <MuiTooltip {...props} classes={{ ...props.classes, tooltip: cn(s.root) }} />
);

export default Tooltip;
