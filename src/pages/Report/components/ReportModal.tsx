import { useRecoilValue, useResetRecoilState } from 'recoil';
import SlideModal from '../../../components/Modal/SlideModal';
import useAxios from '../../../hooks/useAxios';
import ReportModalContent from './ReportModalContent';
import { reportDataState } from '../../../recoil/reportState';
import { useNavigate } from 'react-router-dom';

export default function ReportModal() {
  const navigate = useNavigate();
  const [, fetchData] = useAxios();
  const token = localStorage.getItem('token');
  const reportData = useRecoilValue(reportDataState);
  const resetReportData = useResetRecoilState(reportDataState);
  const { cupStoreId, reportType, content } = reportData;

  const reportHandler = () => {
    fetchData({
      url: '/api/report',
      method: 'POST',
      headers: {
        Authorization: token,
      },
      data: { cupStoreId, reportType, content },
    });
    navigate(`/detail/${cupStoreId}`);
    resetReportData();
  };

  return (
    <SlideModal
      modalContent={ReportModalContent}
      buttonRightText="제보하기"
      buttonRightEvent={reportHandler}
      desactiveCondition={null}
    />
  );
}
