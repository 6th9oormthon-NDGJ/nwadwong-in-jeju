import { styled } from 'styled-components';
import { CupStore } from '../../types/CupStore';
import { Link, useNavigate } from 'react-router-dom';
import { useGetCupStoreDetailById } from '../../api/cupStoreApi';
import machine from '/images/cup-store.png';

interface Props {
  cupStore: CupStore;
}

const CupStoreItem = ({ cupStore }: Props) => {
  const navigate = useNavigate();
  const today = new Date();
  const hours = today.getHours() - 5;
  const { data } = useGetCupStoreDetailById(String(cupStore?.cupStoreId));

  if (!cupStore) return <></>;

  const [start, end] = cupStore.hours.split('~');

  const isOpen = +start < hours && +end > hours;

  return (
    <Link to={`/detail/${cupStore.cupStoreId}`}>
      <Container>
        <img src={machine} alt="store-thumbnail" />
        <div className="cupstore-info">
          <h3 className="cupstore-name">{cupStore.name}</h3>
          <div className="cupstore-row">
            <div className="is-open-badge">
              {isOpen ? '운영중' : '운영종료'}
            </div>
            <div className="rating">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M8.00779 2.97498L6.53279 5.96404L3.23279 6.44373L5.62029 8.77185L5.05623 12.0578L8.00779 10.5062L10.9594 12.0562L10.3953 8.77029L12.7828 6.44373L9.48279 5.96404L8.00779 2.97498Z"
                  fill="#96B490"
                />
                <path
                  d="M14.1969 5.51251L10.2297 4.93594L8.45628 1.34063C8.40784 1.24219 8.32815 1.16251 8.22972 1.11407C7.98284 0.992193 7.68284 1.09376 7.5594 1.34063L5.78597 4.93594L1.81878 5.51251C1.7094 5.52813 1.6094 5.57969 1.53284 5.65782C1.44028 5.75295 1.38928 5.88094 1.39104 6.01366C1.39279 6.14639 1.44717 6.27298 1.54222 6.36563L4.41253 9.16407L3.7344 13.1156C3.7185 13.2076 3.72867 13.3021 3.76377 13.3885C3.79886 13.475 3.85747 13.5498 3.93295 13.6047C4.00843 13.6595 4.09776 13.692 4.19081 13.6987C4.28386 13.7053 4.37691 13.6857 4.4594 13.6422L8.00784 11.7766L11.5563 13.6422C11.6532 13.6938 11.7657 13.7109 11.8735 13.6922C12.1453 13.6453 12.3282 13.3875 12.2813 13.1156L11.6032 9.16407L14.4735 6.36563C14.5516 6.28907 14.6032 6.18907 14.6188 6.07969C14.661 5.80626 14.4703 5.55313 14.1969 5.51251ZM10.3953 8.77032L10.9594 12.0563L8.00784 10.5063L5.05628 12.0578L5.62034 8.77188L3.23284 6.44376L6.53284 5.96407L8.00784 2.97501L9.48284 5.96407L12.7828 6.44376L10.3953 8.77032Z"
                  fill="#96B490"
                />
              </svg>
              <p>{data?.averageRating.toFixed(1)}</p>
              <strong>
                더보기
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.31538 15.8776L7.16663 14.7276L11.8954 10.0001L7.16663 5.27131L8.31538 4.12256L14.1941 10.0001L8.31538 15.8776Z"
                    fill="#B3B3B3"
                  />
                </svg>
              </strong>
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
  width: 335px;
  height: 150px;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #b4f3a8;
  z-index: 9999;
  left: 50%;
  transform: translate(-50%, 0%);
  box-shadow: 8px 8px 7px 0px rgba(0, 0, 0, 0.15);

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
    padding: 5px 0;

    .cupstore-name {
      width: 170px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 18px;
      font-weight: 700;
    }

    .cupstore-row {
      display: flex;
      align-items: center;
      white-space: nowrap;

      .is-open-badge {
        width: fit-content;
        margin-right: 5px;
        padding: 4px 8px 3px 8px;
        background-color: rgba(205, 206, 214, 0.08);
        border: 1px solid #e1e1e8;
        border-radius: 6px;
        font-size: 12px;
        color: #525463;
      }

      .rating {
        display: flex;
        align-items: center;
        color: var(--gray-600, #858899);
        font-size: 12px;

        p {
          margin-left: 2px;
          margin-right: 20px;
        }

        strong {
          display: flex;
          align-items: center;

          svg {
            transform: translateX(-3px);
          }
        }
      }
    }

    .return-btn {
      width: 100%;
      padding: 14px 0;
      border: none;
      border-radius: 8px;
      background-color: #b4f3a8;
      font-size: 16px;
      font-weight: 500;

      &:hover {
        cursor: pointer;
      }
    }
  }
`;

export default CupStoreItem;
