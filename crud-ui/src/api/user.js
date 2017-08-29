import APIManager from './apiManager';
import {
  USER_SCHEMA,
  USERS_SCHEMA,
} from '../resources/schemas.js';

export const list = () => (
  APIManager({
    method: 'GET',
    endpoint: '/api/usuarios',
  }, USERS_SCHEMA)
);

export const getById = id => (
  APIManager({
    method: 'GET',
    endpoint: `/api/usuarios/${id}`,
  }, USER_SCHEMA)
);

export const update = (id, clave, nombre, apellido, fechanacimiento) => (
  APIManager({
    method: 'POST',
    endpoint: `/api/usuarios/${id}`,
    body: {
      clave,
      nombre,
      apellido,
      fechanacimiento,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
);

export const create = (clave, nombre, apellido, fechanacimiento) => (
  APIManager({
    method: 'PUT',
    endpoint: '/api/usuarios',
    body: {
      clave,
      nombre,
      apellido,
      fechanacimiento,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }, USER_SCHEMA)
);

export const remove = id => (
  APIManager({
    method: 'DELETE',
    endpoint: `/api/usuarios/${id}`,
  })
);

