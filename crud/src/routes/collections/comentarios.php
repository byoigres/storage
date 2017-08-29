<?php

return call_user_func(function(){
    $comentarios = new \Phalcon\Mvc\Micro\Collection();
    $comentarios
        ->setPrefix('/api/comentarios')
        ->setHandler('\Coppel\CRUD\Controllers\ComentarioController')
        ->setLazy(true);
    
    $comentarios->get('/', 'listAction');
    $comentarios->get('/{commentId}/usuarios/{userId}', 'getCommentAction');
    $comentarios->put('/', 'createAction');
    $comentarios->delete('/{id}', 'removeAction');
    $comentarios->post('/{commentId}/usuarios/{userId}', 'updateAction');

    return $comentarios;
});
