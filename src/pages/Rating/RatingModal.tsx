import { useRecoilState, useSetRecoilState } from 'recoil';
import { averageRatingState, modalState, starIndexState } from '../../recoil/detailState';
import useAxios from '../../hooks/useAxios';
import { useNavigate, useParams } from 'react-router-dom';
import RatingContent from './components/RatingContent';
import SlideModal from '../../components/Modal/SlideModal';

export default function Rating() {
  const params = useParams();
  const cupStoreId = Number(params.id);
  const [, , , fetchData] = useAxios();
  const [starIndex, setStarIndex] = useRecoilState(starIndexState);
  const setIsRatingModalOpen = useSetRecoilState(modalState);
  const setAverageRating = useSetRecoilState(averageRatingState);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const ratingHandler = () => {
    fetchData({
      url: 'https://goormtone6th.com/rating',
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': `application/json`,
      },
      data: { cupStoreId: cupStoreId, rating: starIndex },
    }).then((result: { averageRating: number }) => {
      setAverageRating(result.averageRating.toFixed(1));
      setIsRatingModalOpen(false);
      navigate(`/detail/${params.id}`);

      setStarIndex(0);
    });
  };

  return (
    <SlideModal
      modalText="반납 경험이 어떠셨나요?"
      modalContent={RatingContent}
      closeEvent={() => setStarIndex(0)}
      buttonRightText="별점 등록"
      buttonRightEvent={ratingHandler}
      desactiveCondition={starIndex === 0}
    />
  );
}
