import {theme} from '@/styles/theme';
import {Direction} from 'react-native-calendars/src/types';

export const DIARY_MARK_OPTION = {
  selected: true,
  marked: true,
  selectedColor: theme.colors.point.mintGreen,
};

export const CALENDER_DIRECTION_ICON: Record<Direction, string> = {
  left: 'chevron-left',
  right: 'chevron-right',
};
