import { atom } from 'recoil';
import { IReportData } from '../pages/Report/Report';

export const reportDataState = atom<IReportData>({
  key: 'reportDataState',
  default: { cupStoreId: 0, reportType: undefined, content: '', name: '' },
});
