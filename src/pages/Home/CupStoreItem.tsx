import { styled } from 'styled-components';
import { CupStore } from '../../types/CupStore';
import { Link, useNavigate } from 'react-router-dom';

interface Props {
  cupStore: CupStore;
}

const CupStoreItem = ({ cupStore }: Props) => {
  const navigate = useNavigate();
  const today = new Date();
  const hours = today.getHours();

  if (!cupStore) return <></>;

  const [start, end] = cupStore.hours.split('~');

  const isOpen = +start < hours && +end > hours;

  return (
    <Link to={`/detail/${cupStore.cupStoreId}`}>
      <Container>
        <img src={cupStore.imageUrl} alt="store-thumbnail" />
        <div className="cupstore-info">
          <h3 className="cupstore-name">{cupStore.name}</h3>
          <div className="cupstore-row">
            <div className="is-open-badge">
              {isOpen ? '운영중' : '운영종료'}
            </div>
          </div>
          <button
            className="return-btn"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/uploadImage/${cupStore.cupStoreId}`);
            }}
          >
            반납 인증
          </button>
        </div>
      </Container>
    </Link>
  );
};

const Container = styled.div`
  display: flex;
  gap: 20px;
  position: absolute;
  bottom: 92px;
  /* margin: 0 calc((100% - 335px) / 4); */
  width: 335px;
  height: 150px;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #36bf9f;
  z-index: 9999;
  left: 50%;
  transform: translate(-50%, 0%);

  img {
    height: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
  }

  .cupstore-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    padding: 10px 0;

    .cupstore-name {
      width: 160px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 18px;
      font-weight: 700;
    }

    .cupstore-row {
      .is-open-badge {
        width: fit-content;
        padding: 4px 8px 3px 8px;
        background-color: rgba(205, 206, 214, 0.08);
        border: 1px solid #e1e1e8;
        border-radius: 6px;
        font-size: 12px;
        color: #525463;
      }
    }

    .return-btn {
      width: 100%;
      padding: 14px 0;
      border: none;
      border-radius: 8px;
      background-color: #b4f3a8;
      font-size: 16px;

      &:hover {
        cursor: pointer;
      }
    }
  }
`;

export default CupStoreItem;
