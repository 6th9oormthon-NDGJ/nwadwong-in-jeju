import { styled } from 'styled-components';
import { Organization } from '../../types/organization';

interface Props {
  organization: Organization;
}

const DonationInfo = ({ organization }: Props) => {
  return (
    <Container>
      <div className="table">
        <p>목표 달성치</p>
        <p>{organization.maxPoint.toLocaleString()} 포인트</p>
        <p>캠페인 기한</p>
        <p>
          {organization.start} ~ {organization.end}
        </p>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 270px;
  height: fit-content;
  margin: 0 auto;
  padding: 9px 18px;
  border-radius: 8px;
  background-color: #fff;

  .table {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: 1fr 2fr;

    p {
      color: #a9abb8;
      font-size: 12px;
      line-height: 18px;
    }
  }
`;

export default DonationInfo;
