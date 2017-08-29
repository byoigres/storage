<?php
namespace Coppel\CRUD\Models;

use Phalcon\Mvc\Model;
use Phalcon\Db\Column;
use Phalcon\Mvc\Model\MetaData;

class Usuario extends Model
{
    public function initialize()
    {
        $this->setSource('Usuario');
    }

    public function columnMap()
    {
        return [
            'UsuarioID' => 'id',
            'Clave' => 'clave',
            'Nombre' => 'nombre',
            'Apellido' => 'apellido',
            'FechaNacimiento' => 'fechanacimiento',
            'Estatus' => 'estatus'
        ];
    }

    public function ____validation()
    {
        $validator = new \Phalcon\Validation();

        $validator->add(
            [
                'nombre',
                'rfc',
                'estatus'
            ],
            new \Phalcon\Validation\Validator\PresenceOf(
                [
                    'message' => [
                        'nombre'  => 'The name is required',
                        'rfc' => 'The email is required',
                        'estatus' => 'The email is required'
                    ],
                ]
            )
        );

        $validator->add(
            'nombre',
            new \Phalcon\Validation\Validator\StringLength(
                [
                    'max' => 90,
                    'min' => 5,
                    'messageMaximum' => 'La longitud del campo nombre no debe ser mayor a 90 caracteres',
                    'messageMinimum' => 'El nombre del proveedor es muy corto',
                ]
            )
        );
        
        $validator->add(
            'rfc',
            new \Phalcon\Validation\Validator\StringLength(
                [
                    'max' => 13,
                    'min' => 13,
                    'messageMaximum' => 'La longitud del campo RFC debe de ser de 13 caracteres',
                    'messageMinimum' => 'La longitud del campo RFC debe de ser de 13 caracteres',
                ]
            )
        );

        return $this->validate($validator);
    }
    
    public function __metaData()
    {
        return array(
            // Every column in the mapped table
            MetaData::MODELS_ATTRIBUTES => [
                'ProveedorID',
                'RFC',
                'Nombre',
                'Estatus'
            ],
            
            // Every column part of the primary key
            MetaData::MODELS_PRIMARY_KEY => [
                'ProveedorID'
            ],
            
            // Every column that isn't part of the primary key
            MetaData::MODELS_NON_PRIMARY_KEY => [
                'RFC',
                'Nombre',
                'Estatus'
            ],

            // Every column that doesn't allows null values
            MetaData::MODELS_NOT_NULL => [
                'ProveedorID',
                'RFC',
                'Nombre',
                'Estatus'
            ],

            // Every column and their data types
            MetaData::MODELS_DATA_TYPES => [
                'ProveedorID'   => Column::TYPE_INTEGER,
                'RFC' => Column::TYPE_VARCHAR,
                'Nombre' => Column::TYPE_VARCHAR,
                'Estatus' => Column::TYPE_BOOLEAN,
            ],
            
            // The identity column, use boolean false if the model doesn't have
            // an identity column
            MetaData::MODELS_IDENTITY_COLUMN => 'id',

            // How every column must be bound/casted
            MetaData::MODELS_DATA_TYPES_BIND => [
                'ProveedorID'   => Column::BIND_PARAM_INT,
                'RFC' => Column::BIND_PARAM_STR,
                'Nombre' => Column::BIND_PARAM_STR,
                'Estatus' => Column::BIND_PARAM_BOOL,
            ]
        );
    }
}
