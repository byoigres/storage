<?php
namespace Coppel\CRUD\Controllers;

use Phalcon\Mvc\Controller;
use Coppel\CRUD\Models\Usuario;

class UsuarioController extends Controller
{
    private function serializeUser($data)
    {
        $user = $data->usuario->toArray();
        $user['comentarios'] = [];
        $comment = $data->comentario->toArray();

        if ($comment['id'] !== NULL) {
            $user['comentarios'][] = $data->comentario->toArray();
        }

        return $user;
    }

    private function serializeUsers($data, $returnFirst = FALSE)
    {
        $result = [];

        foreach($data as $row) {
            $userKey = NULL;
            foreach($result as $key => $value) {
                if ($value['id'] == $row->usuario->id) {
                    $userKey = $key;
                    break;
                }
            }
            
            if ($userKey !== NULL) {
                $result[$userKey]['comentarios'][] = $row->comentario->toArray();
            } else {
                array_push($result, $this->serializeUser($row));
            }
        }

        if ($returnFirst) {
            if (count($result) > 0) {
                return $result[0];
            }

            return $result;
        }
        
        return $result;
    }

    public function createAction()
    {
        $clave = $this->request->getPut('clave', 'string');
        $nombre = $this->request->getPut('nombre', 'string');
        $apellido = $this->request->getPut('apellido', 'string');
        $fechanacimiento = $this->request->getPut('fechanacimiento');
        # $estatus = $this->request->getPut('estatus', 'string');

        $result = $this->modelsManager->executeQuery(
            "
                INSERT INTO Coppel\CRUD\Models\Usuario (clave, nombre, apellido, fechanacimiento, estatus)
                VALUES (:clave:, :nombre:, :apellido:, :fechanacimiento:, :estatus:)
            ",
            [
                'clave' => $clave,
                'nombre' => $nombre,
                'apellido' => $apellido,
                'fechanacimiento' => $fechanacimiento,
                'estatus' => 1
            ]
        );

        if (!$result->success()) {
            $errors = [];
            
            foreach ($result->getMessages() as $message) {
                $errors[$message->getField()] = $message->getMessage();
            }

            $this->response->setStatusCode(406, "Not Acceptable");
            return $this->response->setJsonContent(
                [
                    '_meta' => [
                        'status' => 'error'
                    ],
                    'errors' => $errors,
                ]
            );
        }

        return $this->response->setJsonContent($result->getModel());
    }

    public function updateAction($id)
    {
        $clave = $this->request->getPost('clave', 'string');
        $nombre = $this->request->getPost('nombre', 'string');
        $apellido = $this->request->getPost('apellido', 'string');
        $fechanacimiento = $this->request->getPost('fechanacimiento');

        $result = $this->modelsManager->executeQuery(
            "
                UPDATE Coppel\CRUD\Models\Usuario
                SET
                    clave = :clave:,
                    nombre = :nombre:,
                    apellido = :apellido:,
                    fechanacimiento = :fechanacimiento:
                WHERE id = :id:
            ",
            [
                'id' => $id,
                'clave' => $clave,
                'nombre' => $nombre,
                'apellido' => $apellido,
                'fechanacimiento' => $fechanacimiento
            ]
        );

        if (!$result->success()) {
            $errors = [];
            
            foreach ($result->getMessages() as $message) {
                $errors[$message->getField()] = $message->getMessage();
            }

            return $this->response->setJsonContent(
                [
                    '_meta' => [
                        'status' => 'error'
                    ],
                    'errors' => $errors,
                ]
            );
        }

        return $this->response->setJsonContent([]);
    }

    public function removeAction($id)
    {
        $result = $this->modelsManager->executeQuery(
            "
                DELETE FROM Coppel\CRUD\Models\Usuario
                WHERE id = :id:
            ",
            [
                'id' => $id,
            ]
        );

        return $this->response->setJsonContent($result);
    }

    public function listAction()
    {
        $query = $this->modelsManager->createQuery("
            SELECT usuario.*, comentario.* 
            FROM Coppel\CRUD\Models\Usuario AS usuario
            LEFT JOIN Coppel\CRUD\Models\Comentario AS comentario
                ON usuario.id = comentario.usuarioId
        ");

        $data  = $query->execute();

        return $this->response->setJsonContent($this->serializeUsers($data));
    }

    public function getUserByIdAction($id)
    {
        $data = $this->modelsManager->executeQuery("
            SELECT usuario.*, comentario.* 
            FROM Coppel\CRUD\Models\Usuario AS usuario
            LEFT JOIN Coppel\CRUD\Models\Comentario AS comentario
                ON usuario.id = comentario.usuarioId
            WHERE usuario.id = :id:
        ",
        [
            'id' => $id
        ]);

        if ($data->count() === 0) {
            $this->response->setStatusCode(404, "Not Found");
            return $this->response->setJsonContent(
                [
                    '_meta' => [
                        'status' => 'error'
                    ],
                    'error' => 'El usuario no se encuentra',
                ]
            );
        }

        return $this->response->setJsonContent($this->serializeUsers($data, true));
    }

    public function getUserAction($id)
    {
        $query = $this->modelsManager->executeQuery("
            SELECT usuario.*, comentario.* 
            FROM Coppel\CRUD\Models\Usuario AS usuario
            LEFT JOIN Coppel\CRUD\Models\Comentario AS comentario
                ON usuario.id = comentario.usuarioId
            WHERE usuario.id = :id:
        ",
        [
            'id' => $id
        ]);

        $result = $query->getFirst();

        if ($result === FALSE) {
            $result = [];
        }

        return $this->response->setJsonContent($result);
    }
}
