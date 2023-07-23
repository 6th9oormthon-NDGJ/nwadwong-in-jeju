import styled from 'styled-components';
import PlainButton from '../../components/Button/PlainButton';
import { useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { modalState } from '../../recoil/detailState';
import { reportDataState } from '../../recoil/reportState';

export interface ReportDataType {
  cupStoreId: number;
  reportType: string | undefined;
  content: string;
  name: string;
}

export default function Report() {
  const params = useParams();
  const cupStoreId = Number(params.id);
  const token = localStorage.getItem('token');
  const setIsSlideModalOpen = useSetRecoilState(modalState);
  const [reportData, setReportData] = useRecoilState(reportDataState);

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReportData({ ...reportData, content: e.target.value });
  };

  return (
    <>
      <ReportBox>
        {REPORT_TYPE.map(({ id, name, reportType }) => {
          return (
            <ReportList
              key={id}
              onClick={() => {
                setReportData({
                  ...reportData,
                  cupStoreId,
                  reportType: reportType,
                  name,
                });
              }}
            >
              <ReportTitle>{name}</ReportTitle>
              <ReportCategory type="radio" value={reportType} name="category" />
            </ReportList>
          );
        })}
      </ReportBox>
      <InputBox>
        <InputPlace
          placeholder="의견을 남겨주세요."
          onChange={changeHandler}
          value={reportData.content}
          readOnly={!token}
        />
      </InputBox>
      <ButtonBox>
        <PlainButton
          width="half"
          event={() => setIsSlideModalOpen(true)}
          text="제보하기"
          style={reportData.reportType === undefined ? 'desactive' : 'default'}
          disabled={reportData.reportType === undefined && true}
        />
      </ButtonBox>
    </>
  );
}

const ReportBox = styled.div`
  margin-bottom: 5px;
`;

const ReportList = styled.label`
  padding: 0 20px;
  height: 78px;
  border-top: 0.25px solid #e1e1e8;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const ReportCategory = styled.input`
  width: 18px;
  height: 18px;
  margin: 0;
  appearance: none;
  border-radius: 50%;
  border: 1.5px solid #cdced6;

  &:hover {
    cursor: pointer;
  }

  &:checked {
    border: 1.5px solid #b4f3a8;
    width: 18px;
    height: 18px;
    background-color: #b4f3a8;
    box-shadow: 0 0 0 1.5px #fff inset;
  }
`;

const ReportTitle = styled.p`
  font-size: 16px;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const InputPlace = styled.textarea`
  width: 93%;
  height: 157px;
  padding-left: 15px;
  padding-top: 15px;
  border: 0.85px solid #e1e1e8;
  border-radius: 8px;
  outline: none;
  resize: none;
  font-family: inherit;
  background-color: transparent;
  color: #a1a1a1;
  font-size: 16px;

  &::placeholder {
    color: #a1a1a1;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;

const REPORT_TYPE = [
  { id: 1, name: '기기 고장 제보', reportType: 'DEVICE_BREAK' },
  { id: 2, name: '전원 불량 제보', reportType: 'DEVICE_ERROR' },
  { id: 3, name: '관리 소홀 제보', reportType: 'DEVICE_MANAGEMENT' },
  { id: 4, name: '기타 제보', reportType: 'OTHERS' },
];
