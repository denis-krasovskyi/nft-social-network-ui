import { createTheme } from '@mui/material/styles';

import { MUI_TYPOGRAPHY_LIGHT_THEME } from 'components/ui-kit/Typography/themes';
import { MUI_TABS_COMPONENTS_OVERRIDES } from 'components/ui-kit/Tabs/muiUtils';
import { MUI_BUTTON_BASE_COMPONENTS_OVERRIDES } from 'components/ui-kit/ButtonBase/themes';
import { MUI_BUTTON_COMPONENTS_OVERRIDES } from 'components/ui-kit/Button/themes';
import { MUI_SWITCH_COMPONENTS_OVERRIDES } from 'components/ui-kit/Switch/themes';
import { MUI_CHECKBOX_COMPONENTS_OVERRIDES } from 'components/ui-kit/Checkbox/themes';
import { MUI_CHIP_COMPONENTS_OVERRIDES } from 'components/ui-kit/Chip/themes';
import { MUI_DIVIDER_COMPONENTS_OVERRIDES } from 'components/ui-kit/Divider/themes';
import { MUI_MENU_ITEM_COMPONENTS_OVERRIDES } from 'components/ui-kit/MenuItem/themes';
import { MUI_MENU_COMPONENTS_OVERRIDES } from 'components/ui-kit/Menu/themes';
import { MUI_POPOVER_COMPONENTS_OVERRIDES } from 'components/ui-kit/Popover/themes';
import { MUI_TEXT_FIELD_COMPONENTS_OVERRIDES } from 'components/ui-kit/TextField/themes';
import { MUI_INPUT_OUTLINED_COMPONENTS_OVERRIDES } from 'components/ui-kit/OutlinedInput/themes';
import { MUI_INPUT_LABEL_COMPONENTS_OVERRIDES } from 'components/ui-kit/InputLabel/themes';
import { MUI_AVATAR_COMPONENTS_OVERRIDES } from 'components/ui-kit/Avatar/themes';
import {
  MUI_PAGINATION_COMPONENTS_OVERRIDES,
  MUI_PAGINATION_ITEM_COMPONENTS_OVERRIDES,
} from 'components/ui-kit/Pagination/themes';

export const lightMuiTheme = createTheme({
  typography: MUI_TYPOGRAPHY_LIGHT_THEME,
  components: {
    MuiButtonBase: MUI_BUTTON_BASE_COMPONENTS_OVERRIDES,
    MuiPopover: MUI_POPOVER_COMPONENTS_OVERRIDES,
    MuiButton: MUI_BUTTON_COMPONENTS_OVERRIDES,
    MuiTab: MUI_TABS_COMPONENTS_OVERRIDES.MuiTab,
    MuiTabs: MUI_TABS_COMPONENTS_OVERRIDES.MuiTabs,
    MuiSwitch: MUI_SWITCH_COMPONENTS_OVERRIDES,
    MuiCheckbox: MUI_CHECKBOX_COMPONENTS_OVERRIDES,
    MuiChip: MUI_CHIP_COMPONENTS_OVERRIDES,
    MuiDivider: MUI_DIVIDER_COMPONENTS_OVERRIDES,
    MuiMenu: MUI_MENU_COMPONENTS_OVERRIDES,
    MuiMenuItem: MUI_MENU_ITEM_COMPONENTS_OVERRIDES,
    MuiTextField: MUI_TEXT_FIELD_COMPONENTS_OVERRIDES,
    MuiOutlinedInput: MUI_INPUT_OUTLINED_COMPONENTS_OVERRIDES,
    MuiInputLabel: MUI_INPUT_LABEL_COMPONENTS_OVERRIDES,
    MuiAvatar: MUI_AVATAR_COMPONENTS_OVERRIDES,
    MuiPagination: MUI_PAGINATION_COMPONENTS_OVERRIDES,
    MuiPaginationItem: MUI_PAGINATION_ITEM_COMPONENTS_OVERRIDES,
  },
});
