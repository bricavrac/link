import type { FC } from 'react';
import type { ReactDatePickerProps } from 'react-datepicker';
import { STANDARD_DATE_AND_TIME_FORMAT } from '../helpers/date';
import { DateInput } from './DateInput';

export type DateTimeInputProps = Omit<ReactDatePickerProps, 'showTimeSelect' | 'dateFormat' | 'timeIntervals'>;

export const DateTimeInput: FC<DateTimeInputProps> = (props) => (
  <DateInput
    {...props}
    dateFormat={STANDARD_DATE_AND_TIME_FORMAT}
    showTimeSelect
    timeIntervals={10}
  />
);
