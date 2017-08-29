<?php
namespace Coppel\CRUD\Controllers;

use Phalcon\Mvc\Controller;
use Coppel\CRUD\Models\Producto;

class ComentarioController extends Controller
{
    public function createAction()
    {
        $usuarioId = $this->request->getPut('usuarioid', 'string');
        $descripcion = $this->request->getPut('descripcion', 'string');

        $result = $this->modelsManager->executeQuery(
            "
                INSERT INTO Coppel\CRUD\Models\Comentario (descripcion, estatus, usuarioId)
                VALUES (:descripcion:, :estatus:, :usuarioId:)
            ",
            [
                'descripcion' => $descripcion,
                'estatus' => 1,
                'usuarioId' => $usuarioId
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

    public function updateAction($commentId, $userId)
    {
        $descripcion = $this->request->getPost('descripcion', 'string');

        $result = $this->modelsManager->executeQuery(
            "
                UPDATE Coppel\CRUD\Models\Comentario
                SET
                    descripcion = :descripcion:
                WHERE id = :id: and usuarioId = :usuarioId:
            ",
            [
                'id' => $commentId,
                'usuarioId' => $userId,
                'descripcion' => $descripcion,
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
                DELETE FROM Coppel\CRUD\Models\Comentario
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
            SELECT *
            FROM Coppel\CRUD\Models\Comentario AS comentario
        ");
        $comments  = $query->execute();

        return $this->response->setJsonContent($comments);
    }

    public function getCommentAction($commentId, $userId)
    {
        $query = $this->modelsManager->executeQuery("
            SELECT *
            FROM Coppel\CRUD\Models\Comentario AS comentario
            WHERE id = :commentId: AND usuarioId = :userId:
        ",
        [
            'userId' => $userId,
            'commentId' => $commentId
        ]);

        $result = $query->getFirst();

        if ($result === FALSE) {
            $result = [];
        }

        return $this->response->setJsonContent($result);
    }
}
