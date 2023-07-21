import { atom } from 'recoil';
import { ReportDataType } from '../pages/Report/Report';

export const reportDataState = atom<ReportDataType>({
  key: 'reportDataState',
  default: { cupStoreId: 0, reportType: undefined, content: '', name: '' },
});
