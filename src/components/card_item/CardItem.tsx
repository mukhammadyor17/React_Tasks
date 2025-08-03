import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toggleFavorite } from '../../store/features/favorites/favorites_slice';

import type { RootState } from '../../store';
import { type Post } from '../../models/post.interface';

interface CardItemProps {
  post: Post;
}

// Custom hook for favorites logic
const useFavorites = (post: Post) => {
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  const isFavorite = useMemo(
    () => favorites.some((fav) => fav.id === post.id),
    [favorites, post.id]
  );

  const handleToggleFavorite = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      dispatch(toggleFavorite(post));
    },
    [dispatch, post]
  );

  return { isFavorite, handleToggleFavorite };
};

// Extracted styles for better maintainability
const cardStyles = {
  container:
    'bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xs hover:shadow-md dark:shadow-gray-900/50 transition-all duration-200 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600',
  title: 'font-bold mb-2 text-gray-900 dark:text-white line-clamp-2',
  body: 'text-sm text-gray-600 dark:text-gray-300 line-clamp-3',
  footer:
    'pt-2 mt-2 border-t border-gray-200 dark:border-gray-700 flex justify-end',
  checkbox:
    'w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600',
};

const CardItem = React.memo(({ post }: CardItemProps) => {
  const { title, body, id } = post;
  const { isFavorite, handleToggleFavorite } = useFavorites(post);

  return (
    <article className={cardStyles.container}>
      <NavLink
        to={`post/${id}`}
        className="block"
        aria-label={`View details for ${title}`}
      >
        <h3 className={cardStyles.title}>{title}</h3>
        <p className={cardStyles.body}>{body}</p>
      </NavLink>

      <footer className={cardStyles.footer}>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isFavorite}
            onChange={handleToggleFavorite}
            className={cardStyles.checkbox}
            aria-label={`${isFavorite ? 'Remove from' : 'Add to'} favorites`}
          />
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
            {isFavorite ? 'Favorited' : 'Add to favorites'}
          </span>
        </label>
      </footer>
    </article>
  );
});

CardItem.displayName = 'CardItem';

export default CardItem;
