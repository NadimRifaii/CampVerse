import { useState } from 'react';
import './bootcamp.styles.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type BootcampProps = {
  name: string;
};

const Bootcamp = ({ name }: BootcampProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="bootcamp">
      <div className="image-holder">
        {imageLoaded ? null : <SkeletonTheme baseColor="#ccc" highlightColor="#eee">
          <p>
            <Skeleton count={10} width={400} />
          </p>
        </SkeletonTheme>}
        <img
          src={`http://localhost:8000/images/Subtract.png`}
          alt=""
          onLoad={handleImageLoad}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
      </div>
      <div className="name">{name}</div>
    </div>
  );
};

export default Bootcamp;
