import { styled } from 'styled-components';
import { Organization } from '../../types/organization';

interface Props {
  organizations: Organization[];
  onClick: (organization: Organization) => void;
}

const OrganizationList = ({ organizations, onClick }: Props) => {
  return (
    <Container>
      <ul>
        {organizations.map((organization) => {
          return (
            <OrganizationItem
              onClick={() => onClick(organization)}
              key={organization.id}
            >
              <ProgressBar percent={organization.point / organization.maxPoint}>
                <div className="bar">
                  <div className="bar-fill"></div>
                </div>
                <span className="point">
                  <span className="current-point">{organization.point.toLocaleString()}</span>/
                  <span className="max-point">{organization.maxPoint.toLocaleString()} POINT</span>
                </span>
              </ProgressBar>
              <div className="group">{organization.name}</div>
              <div className="title">{organization.description}</div>
            </OrganizationItem>
          );
        })}
      </ul>
    </Container>
  );
};

const Container = styled.div`
  overflow-x: scroll;
  margin-bottom: 20px;

  ul {
    display: flex;
    gap: 20px;
    width: fit-content;
    height: fit-content;
  }

  @media (max-width: 800px) {
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const OrganizationItem = styled.li`
  position: relative;
  width: 290px;
  height: 170px;
  padding: 20px 15px;
  background-color: #90c378;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
  }

  .title {
    position: absolute;
    bottom: 14px;
    font-size: 24px;
    font-weight: 700;
  }

  .group {
    position: absolute;
    bottom: 45px;
    padding: 6px;
    border-radius: 10px;
    color: #b4f3a8;
    font-size: 12px;
    border: 1px solid #b4f3a8;
  }
`;

const ProgressBar = styled.div<{ percent: number }>`
  .bar {
    width: 150px;
    height: 6px;
    margin-bottom: 6px;
    background-color: #e6e6e6;
    overflow: hidden;

    .bar-fill {
      width: ${({ percent }) => percent * 100}%;
      height: 100%;
      background-color: #b4f3a8;
    }
  }

  .point {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #fff;
    font-size: 16px;

    .current-point {
      color: #fff;
    }

    .max-point {
      font-size: 12px;
    }
  }
`;

export default OrganizationList;
