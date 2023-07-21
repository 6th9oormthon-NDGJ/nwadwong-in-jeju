import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import ShadowButton from '../../components/Button/ShadowButton';
import { useNavigate } from 'react-router-dom';
import { useGetAllOrganizations } from '../../api/organizationApi';
import { Organization } from '../../types/organization';
import DonationList from './OrganizationList';

const Donation = () => {
  const navigate = useNavigate();
  const [currrentOrganization, setCurrrentOrganization] = useState<Organization | null>(null);
  const [currentId, setCurrentId] = useState<string>('');
  const { data: allOrganization, isLoading } = useGetAllOrganizations({
    onSuccess: (result: { organizations: Organization[] }) => setCurrentId(result.organizations[0].id),
  });

  const changeOrganizationHandler = (organization: Organization) => {
    setCurrrentOrganization(organization);
  };

  useEffect(() => {
    const current = allOrganization?.organizations.find((organization) => organization.id === currentId);
    if (current) {
      setCurrrentOrganization(current);
    }
  }, [currentId]);

  if (isLoading) {
    return <></>;
  }

  if (!currrentOrganization) {
    return <></>;
  }

  return (
    <>
      <Container
        accprice={currrentOrganization ? currrentOrganization.point * 30000 : 10000}
        maxpoint={currrentOrganization ? currrentOrganization.maxPoint : 10000}
      >
        <div className="cup">
          <div className="badge">{currrentOrganization.name} 주관 기부 캠페인</div>
          <div className="title">{currrentOrganization.description}</div>
          <div className="link">
            <ShadowButton onClick={() => navigate(`/donation/${currrentOrganization.id}/submit`)}>
              포인트 기부하기
            </ShadowButton>
          </div>
          <p className="target-price">{`목표 포인트 ${currrentOrganization.maxPoint.toLocaleString()}`}</p>
          <div className="liquor">
            <div className="point">
              <p>{currrentOrganization.point?.toLocaleString()}</p>
              <strong>POINT</strong>
            </div>
          </div>
          <img
            src="/images/indicator.png"
            className="indigator"
            alt="indigator"
          />
          <div className="rank-cup"></div>
        </div>

        <div className="space">
          <div className="background" />
          <div className="background" />
        </div>
      </Container>
      {allOrganization?.organizations && (
        <DonationList
          onClick={changeOrganizationHandler}
          organizations={allOrganization.organizations}
        />
      )}
    </>
  );
};

const Container = styled.div<{ accprice: number; maxpoint: number }>`
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
    height: 581px;

    .badge {
      position: absolute;
      width: fit-content;
      top: 30px;
      left: 50%;
      padding: 8px 10px 6px 10px;
      border-radius: 10px;
      border: 1px solid #c0c0c0;
      background-color: #f0f0f0;
      text-align: center;
      white-space: nowrap;
      transform: translateX(-50%);
      z-index: 999;
    }

    .title {
      position: absolute;
      width: 100%;
      top: 80px;
      text-align: center;
      font-weight: 700;
      font-size: 32px;
      z-index: 999;
      font-family: Jeju Hallasan;
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
      bottom: 20px;
      z-index: 999;
    }

    .liquor {
      position: absolute;
      right: 0;
      bottom: 10px;
      width: 300px;
      height: calc(140px + (220px * ${(props) => props.accprice / props.maxpoint}));
      background-color: #b4f3a8;
      z-index: 10;
      animation: fill 1s forwards;

      .point {
        position: absolute;
        left: 135px;
        bottom: 220px;
        font-size: 20px;
        font-weight: 700;
        text-align: center;
        opacity: 0;
        animation: appear 0.5s 0.5s forwards;

        strong {
          font-size: 20px;
        }
      }
    }

    .indigator {
      position: absolute;
      bottom: calc(145px + (220px * ${(props) => props.accprice / props.maxpoint}));
      left: 69px;
      z-index: 999;
      animation: fillIndigator 1s forwards;
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
    height: 581px;
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

  @keyframes fill {
    0% {
      height: 150px;
    }
    100% {
      height: calc(140px + (220px * ${(props) => props.accprice / props.maxpoint}));
    }
  }

  @keyframes fillIndigator {
    0% {
      opacity: 0;
      bottom: 148px;
    }
    100% {
      opacity: 1;
      bottom: calc(145px + (220px * ${(props) => props.accprice / props.maxpoint}));
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
