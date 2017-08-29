import { schema } from 'normalizr';

const comment = new schema.Entity('comments');

const user = new schema.Entity('users', {
  comentarios: [comment],
});

export const USER_SCHEMA = user;
export const USERS_SCHEMA = [user];
export const COMMENT_SCHEMA = comment;
export const COMMENTS_SCHEMA = [comment];
