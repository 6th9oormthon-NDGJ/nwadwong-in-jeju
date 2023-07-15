import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import ShadowButton from '../../components/Button/ShadowButton';
import { useNavigate } from 'react-router-dom';
import { useGetAllOrganizations, useGetOrganizationById } from '../../api/organizationApi';
import { Organization } from '../../types/organization';

const Donataion = () => {
  const navigate = useNavigate();
  const [currrentOrganization, setCurrrentOrganization] = useState<Organization | null>(null);
  const [currentId, setCurrentId] = useState<string>('');
  const { data: allOrganization, isLoading } = useGetAllOrganizations({
    onSuccess: (result: { organizations: Organization[] }) => setCurrentId(result.organizations[0].id),
  });
  console.log(allOrganization);

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
    <Container
      accprice={currrentOrganization ? currrentOrganization.point : 0}
      maxpoint={currrentOrganization ? currrentOrganization.maxPoint : 0}
    >
      <div className="cup">
        <div className="badge">제주도청 주관 기부 캠페인</div>
        <div className="title">제주 환경 보호함쪄</div>
        <div className="link">
          <ShadowButton onClick={() => navigate(`/donation/${currrentOrganization.id}/submit`)}>
            포인트 기부하기
          </ShadowButton>
        </div>
        <p className="target-price">{`목표 포인트 ${currrentOrganization.maxPoint.toLocaleString()}`}</p>
        <div className="liquor">
          <div className="point">
            <p>{currrentOrganization!.point?.toLocaleString()}</p>
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
  );
};

const Container = styled.div<{ accprice: number; maxpoint: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;

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
      width: 200px;
      top: 40px;
      left: 70px;
      padding: 4px 8px;
      border-radius: 10px;
      border: 1px solid #e1e1e8;
      text-align: center;
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
      height: 150px;
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
      bottom: 148px;
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

export default Donataion;
