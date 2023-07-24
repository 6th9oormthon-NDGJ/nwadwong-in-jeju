import { styled } from 'styled-components';
import { Organization } from '../../types/organization';

interface Props {
  organizations: Organization[];
  currentOrganizationId: string;
  onClick: (organization: Organization) => void;
}

const OrganizationList = ({ organizations, currentOrganizationId, onClick }: Props) => {
  return (
    <Container>
      <ul>
        {organizations.map((organization) => {
          return (
            <OrganizationItem
              onClick={() => onClick(organization)}
              key={organization.id}
              className={currentOrganizationId === organization.id ? 'active' : ''}
            >
              <div className="group">{organization.name}</div>
              <div className="title">{organization.description}</div>
              <span className="point">
                <span className="current-point">{organization.point.toLocaleString()}</span>/
                <span className="max-point">{organization.maxPoint.toLocaleString()} POINT</span>
              </span>
            </OrganizationItem>
          );
        })}
      </ul>
      <div className="gradient"></div>
    </Container>
  );
};

const Container = styled.div`
  overflow-x: scroll;
  margin-bottom: 20px;

  ul {
    position: relative;
    display: flex;
    gap: 6px;
    width: fit-content;
    height: fit-content;

    li:last-child {
      margin-right: 30px;
    }
  }

  .gradient {
    position: absolute;
    top: 0;
    right: 0;
    width: 115px;
    height: 84px;
    background: linear-gradient(270deg, #fff 0%, rgba(255, 255, 255, 0) 100%);
    z-index: 999;
    pointer-events: none;
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
  width: 194px;
  height: 72px;
  padding: 7px 12px;
  border-radius: 8px;
  border: 1.5px solid #e1e1e8;
  transition: border 0.4s;

  .title {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px; /* 150% */
  }

  .point {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 9px;

    .current-point {
      color: #000;
    }

    .max-point {
      color: #a9abb8;
    }
  }

  .group {
    width: fit-content;
    bottom: 45px;
    padding: 6px;
    border-radius: 10px;
    font-size: 10px;
    color: #858899;
    background-color: #f5f5f7;
  }

  &.active {
    border: 1.5px solid #b4f3a8;
  }

  &:hover {
    cursor: pointer;
  }
`;

export default OrganizationList;
