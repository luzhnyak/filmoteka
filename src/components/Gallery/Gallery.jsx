import { Card } from 'components/Card/Card';

export const Gallery = ({ movies }) => {
  return (
    <div className="row g-4">
      {movies?.map(movie => {
        return <Card key={movie.id} movie={movie} />;
      })}
    </div>
  );
};
