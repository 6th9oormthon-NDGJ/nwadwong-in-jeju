import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

const Return = () => {
  const { id } = useParams();
  const [completed, setCompleted] = useState<boolean>(false);
  const [point, setPoint] = useState<number>(0);

  return (
    <Container>
      <div className="filebox">
        <input
          type="file"
          id="file"
          onChange={(e) => {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files![0]);
            reader.onload = async () => {
              const req = await fetch('https://goormtone6th.com/upload-image', {
                method: 'POST',
                headers: {
                  Authorization: localStorage.getItem('token')!,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  file: null,
                  cupStoreId: +id!,
                }),
              });
              const result = await req.json();
              setPoint(result.gainPoint);
              setCompleted(true);
            };
          }}
        ></input>
        <label htmlFor="file"></label>
        {completed && (
          <>
            <img
              src="/images/completed.png"
              className="completed"
            ></img>
            <p className="completed-comment">{point}</p>
          </>
        )}
      </div>
      <button className="sumbit-picture">반납하기</button>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  .filebox .upload-name {
    display: inline-block;
    width: 100%;
    height: 400px;
    padding: 0 10px;
    vertical-align: middle;
    border: 1px solid #dddddd;
    width: 78%;
    color: #999999;
  }

  .filebox label {
    display: flex;
    width: 100%;
    height: 400px;
    padding: 10px 20px;
    color: #fff;
    vertical-align: middle;
    background-color: #999999;
    cursor: pointer;
  }

  .filebox input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }

  .sumbit-picture {
    width: 100%;
    height: 30px;
    border: none;
    background-color: #b4f3a8;
  }

  .completed {
    width: 100%;
    aspect-ratio: 1/1;
    position: fixed;
    left: 20px;
    top: 140px;
  }
`;

export default Return;
