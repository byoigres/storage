<?php

return call_user_func(function(){
    $usuarios = new \Phalcon\Mvc\Micro\Collection();
    $usuarios
        ->setPrefix('/api/usuarios')
        ->setHandler('\Coppel\CRUD\Controllers\UsuarioController')
        ->setLazy(true);
    
    $usuarios->get('/', 'listAction');
    $usuarios->get('/{id}', 'getUserByIdAction');
    $usuarios->put('/', 'createAction');
    $usuarios->delete('/{id}', 'removeAction');
    $usuarios->post('/{id}', 'updateAction');

    return $usuarios;
});
