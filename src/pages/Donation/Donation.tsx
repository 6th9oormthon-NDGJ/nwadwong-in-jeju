import { useEffect, useState } from 'react';
import { styled, keyframes } from 'styled-components';
import ShadowButton from '../../components/Button/ShadowButton';
import { useNavigate } from 'react-router-dom';
import { useGetAllOrganizations } from '../../api/organizationApi';
import { Organization } from '../../types/organization';
import DonationList from './OrganizationList';
import Badge from '../../components/Badge/Badge';
import DonationInfo from './DonationInfo';

const fillLiquor = (percent: number) => {
  return keyframes`
    0% {
      height: 109px;
    }
    100% {
      height: ${109 + percent * 160}px;
    }
  `;
};

const fillindicator = (percent: number) => {
  return keyframes`
    0% {
      opacity: 0;
      bottom: 115px;
    }
    100% {
      opacity: 1;
      bottom: ${115 + percent * 160}px;
    }
  `;
};

const Donation = () => {
  const navigate = useNavigate();
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);
  const [percent, setPercent] = useState<number>(0);
  const { data: allOrganization, isLoading } = useGetAllOrganizations({
    onSuccess: (result: { organizations: Organization[] }) => {
      setCurrentOrganization(result.organizations[0]);
    },
  });
  const changeOrganizationHandler = (organization: Organization) => {
    setCurrentOrganization(organization);
  };

  useEffect(() => {
    if (!currentOrganization) return;

    const percent = currentOrganization.point / currentOrganization.maxPoint;
    setPercent(percent);
  }, [currentOrganization]);

  if (isLoading) {
    return <></>;
  }

  if (!currentOrganization) {
    return <></>;
  }

  const DUMMY_DESCRIPTION = ['플라스틱 제로 섬, 제주', '청정 제주, 다회용 회수', '탄소 배출 감축'];

  allOrganization?.organizations.forEach((organization, idx) => {
    organization.description = DUMMY_DESCRIPTION[idx];
  });

  return (
    <>
      {allOrganization?.organizations && (
        <DonationList
          onClick={changeOrganizationHandler}
          organizations={allOrganization.organizations}
          currentOrganizationId={currentOrganization.id}
        />
      )}
      <Container percent={percent}>
        <div className="cup">
          <div className="badge">
            <Badge>{currentOrganization.name} 주관 기부 캠페인</Badge>
          </div>
          <div className="title">{currentOrganization.description}</div>
          <div className="info">
            <DonationInfo organization={currentOrganization} />
          </div>
          <div className="link">
            <ShadowButton onClick={() => navigate(`/donation/${currentOrganization.id}/submit`)}>
              바로 기부하기
            </ShadowButton>
          </div>
          <div className="ifo">{`목표 포인트 ${currentOrganization.maxPoint.toLocaleString()}`}</div>
          <div className="liquor">
            <div className="point">
              <p>{currentOrganization.point?.toLocaleString()}</p>
              <strong>POINT</strong>
            </div>
          </div>
          <img
            src="/images/indicator.png"
            className="indicator"
            alt="indicator"
          />
          <div className="rank-cup"></div>
        </div>

        <div className="space">
          <div className="background" />
          <div className="background" />
        </div>
      </Container>
    </>
  );
};

const Container = styled.div<{ percent: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    width: 100%;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .cup {
    position: relative;
    width: 335px;
    height: 500px;

    .badge {
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999;
    }

    .title {
      position: absolute;
      width: 100%;
      top: 57px;
      text-align: center;
      font-weight: 700;
      font-size: 28px;
      z-index: 999;
    }

    .info {
      position: absolute;
      width: 100%;
      top: 100px;
      z-index: 999;
    }

    .target-price {
      position: absolute;
      width: 100%;
      top: 130px;
      z-index: 999;
      text-align: center;
      font-size: 12px;
      color: #b3b3b3;
    }

    .link {
      display: flex;
      width: 100%;
      justify-content: center;
      position: absolute;
      bottom: 40px;
      z-index: 999;
    }

    .liquor {
      position: absolute;
      right: 0;
      bottom: 10px;
      width: 300px;
      height: calc(140px + (220px * ${(props) => props.percent}));
      background-color: #b4f3a8;
      z-index: 10;
      animation: 1s ${({ percent }) => fillLiquor(percent)} forwards;

      .point {
        position: absolute;
        width: 100px;
        left: 104px;
        bottom: 145px;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
        opacity: 0;
        animation: appear 0.5s 0.5s forwards;

        strong {
          font-size: 10px;
          font-weight: 500;
        }
      }
    }

    .indicator {
      position: absolute;
      bottom: calc(145px + (220px * ${(props) => props.percent}));
      left: 87px;
      z-index: 999;
      animation: ${({ percent }) => fillindicator(percent)} 1s forwards;
    }

    .rank-cup {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-image: url('/images/rank-cup.png');
      z-index: 99;
    }
  }

  .space {
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    padding: 0 20px;

    .background {
      width: 15%;
      height: 100%;
      background-color: #f7f7fa;
      border-radius: 8px;
    }
  }

  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default Donation;
