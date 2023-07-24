import { styled } from 'styled-components';
import { Organization } from '../../types/organization';
import Badge from '../../components/Badge/Badge';
import ProgressBadge from '../../components/Badge/ProgressBadge';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { Link } from 'react-router-dom';

interface Props {
  organizations: Organization[];
}

const ParticipateList = ({ organizations }: Props) => {
  return (
    <Container>
      <h3>참여한 수눌음</h3>
      <ul>
        {organizations.map((organization) => {
          const isEnded = new Date(organization.end) < new Date();
          const isSmile = (organization.point / organization.maxPoint) * 100 > 50;
          return (
            <Link
              to={`/donation/${organization.id}/submit`}
              key={organization.id}
            >
              <OrganizationItem>
                <div className="info">
                  <div className="header">
                    <ProgressBadge isEnd={isEnded} />
                    <Badge>{organization.name}</Badge>
                  </div>
                  <p className="title">{organization.description}</p>
                  <div className="progress-bar">
                    <ProgressBar
                      point={organization.point}
                      maxPoint={organization.maxPoint}
                    />
                  </div>
                </div>
                <img
                  src={`/images/smiles/${isEnded ? 'gray.png' : isSmile ? 'good.png' : 'normal.png'}`}
                  className="smile"
                />
              </OrganizationItem>
            </Link>
          );
        })}
      </ul>
    </Container>
  );
};

const Container = styled.div`
  ul {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 100px;
  }

  h3 {
    margin: 20px 0;
    font-family: Pretendard;
    font-size: 148x;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 157.143% */
    letter-spacing: -0.1px;
    background-color: #fff;
  }
`;

const OrganizationItem = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  height: fit-content;
  border-radius: 8px;
  background-color: #f7f7fa;
  padding: 16px;

  .info {
    flex-grow: 1;

    .header {
      display: flex;
      gap: 5px;
      margin-bottom: 10px;
      color: #525463;
    }

    .title {
      margin: 10px 0;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 30px; /* 150% */
      letter-spacing: -0.2px;
    }
  }

  .smile {
    height: 70px;
    aspect-ratio: 1/1;
  }
`;

export default ParticipateList;
