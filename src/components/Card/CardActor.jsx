import React from 'react';
import noPhoto from '../../images/no-photo.jpg';
import { Link } from 'react-router-dom';

export const CardActor = ({ actor: { name, character, profile_path, id } }) => {
  return (
    <div className="col-lg-2 col-md-3 col-sm-4 col-6 me-auto">
      <div className="card h-100">
        <Link to={`/people/${id}`}>
          <img
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w200/${profile_path}`
                : noPhoto
            }
            className="card-img-top"
            alt={name}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title overflow-hidden">{name}</h5>
          <p className="card-text overflow-hidden">{character}</p>
        </div>
      </div>
    </div>
  );
};
