<?php
namespace Coppel\CRUD\Models;

use Phalcon\Mvc\Model;
use Phalcon\Db\Column;
use Phalcon\Mvc\Model\MetaData;

class Comentario extends Model
{
    public function initialize()
    {
        $this->setSource('Comentario');
    }

    public function columnMap()
    {
        return [
            'ComentarioID' => 'id',
            'Descripcion' => 'descripcion',
            'Estatus' => 'estatus',
            'UsuarioID' => 'usuarioId',
        ];
    }
}
