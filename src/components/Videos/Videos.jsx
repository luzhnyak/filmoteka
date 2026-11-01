import { Loader } from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchMovieVideosByIdQuery } from 'redux/api';
import ReactPlayer from 'react-player';
import toast from 'react-hot-toast';

const Videos = () => {
  const { movieId } = useParams();
  const [playingVideoKey, setPlayingVideoKey] = useState(null);

  const { data, isLoading, error } = useFetchMovieVideosByIdQuery(movieId, {
    skip: !movieId,
  });

  // Виводимо помилку
  useEffect(() => {
    if (error) toast.error(error.data.message);
  }, [error]);

  const videos = data?.results ?? [];

  if (isLoading) {
    return <Loader />;
  }

  // Render a YouTube video player

  return (
    <div>
      <h3 className="mt-3 mb-3">Videos</h3>
      <div className="row g-2">
        {videos.slice(0, 10).map(video => {
          return (
            <ReactPlayer
              key={video.key}
              src={`https://www.youtube.com/watch?v=${video.key}`}
              playing={playingVideoKey === video.key}
              onPlay={() => setPlayingVideoKey(video.key)}
              onPause={() =>
                setPlayingVideoKey(current =>
                  current === video.key ? null : current
                )
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default Videos;
