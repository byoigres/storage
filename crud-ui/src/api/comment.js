import APIManager from './apiManager';
import {
  COMMENT_SCHEMA,
} from '../resources/schemas.js';

export const create = (descripcion, usuarioid) => (
  APIManager({
    method: 'PUT',
    endpoint: '/api/comentarios',
    body: {
      descripcion,
      usuarioid,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }, COMMENT_SCHEMA)
);

export const update = (commentId, userId, descripcion) => (
  APIManager({
    method: 'POST',
    endpoint: `/api/comentarios/${commentId}/usuarios/${userId}`,
    body: {
      descripcion,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }, COMMENT_SCHEMA)
);

export const getByCommentAndUserId = (commentId, userId) => (
  APIManager({
    method: 'GET',
    endpoint: `/api/comentarios/${commentId}/usuarios/${userId}`,
  }, COMMENT_SCHEMA)
);

export const remove = id => (
  APIManager({
    method: 'DELETE',
    endpoint: `/api/comentarios/${id}`,
  })
);
