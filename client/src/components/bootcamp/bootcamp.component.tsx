import { useState } from 'react';
import './bootcamp.styles.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Bootcamp } from '../../core/types/bootcamp';
import { setcurrentBootcamp } from '../../core/datasource/localDataSource/currentBootcamp/currentBootcampSlice';
type BootcampProps = {
  bootcamp: Bootcamp;
};

const BootcampC = ({ bootcamp }: BootcampProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const dispatch = useDispatch()
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="bootcamp">
      <div className="image-holder">
        {imageLoaded ? null : <SkeletonTheme baseColor="#ccc" highlightColor="#eee">
          <p>
            <Skeleton count={12} width={450} />
          </p>
        </SkeletonTheme>}
        <img
          src={`http://localhost:8000/images/Subtract.png`}
          alt=""
          onLoad={handleImageLoad}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
      </div>
      <div className="name-details-holder">
        <div className="name">{bootcamp.name}</div>
        <div className="details">
          <Link to={"/dashboard"} onClick={() => {
            dispatch(setcurrentBootcamp(bootcamp))
          }}  >Enter</Link>
        </div>
      </div>
    </div>
  );
};

export default BootcampC;