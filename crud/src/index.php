<?php

use Phalcon\DI\FactoryDefault;
use Phalcon\Mvc\Micro;
use Phalcon\Mvc\Micro\Collection as MicroCollection;
use Phalcon\Db\Adapter\Pdo\Mysql as DbAdapter;
use Phalcon\Events\Manager as EventsManager;
use Coppel\CRUD\Controllers\ProveedorController;

$di = new FactoryDefault();

$di->set('collections', function(){
	return include('routes/routesLoader.php');
});

$di->set('db', function(){
	return new \Phalcon\Db\Adapter\Pdo\MySql([
		'host' => '127.0.0.1',
        'username' => 'root',
        #'password' => '',
        'dbname' => 'coppel',
    ]);
});

$di->setShared('response', function () {
    $response = new \Phalcon\Http\Response();
    $response->setHeader('Access-Control-Allow-Origin', '*');
    $response->setHeader('Access-Control-Allow-Credentials', true);
    $response->sendHeaders();

    return $response;
});

$app = new Micro($di);

foreach($di->get('collections') as $collection){
	$app->mount($collection);
}

$app->notFound(function() use ($app) {
    return "Not found...";
});

$eventsManager = new EventsManager();

$eventsManager->attach(
    'application:beforeSendResponse',
    function (Event $event, $app) {
        // $app->response->redirect('/404');
        // $app->response->sendHeaders();
        return "asdsda";

        # return $app->response;
    }
);

$app->setEventsManager($eventsManager);

$app->before(function() use ($app) {
    #$origin = $app->request->getHeader("ORIGIN") ? $app->request->getHeader("ORIGIN") : '*';
    
    $app->response->setHeader("Access-Control-Allow-Origin", '*')
        ->setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,OPTIONS')
        ->setHeader("Access-Control-Allow-Headers", 'Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Authorization, Cache-Control, X-Requested-With, Pragma')
        ->setHeader("Access-Control-Allow-Credentials", true);
});
    
$app->options('/{catch:(.*)}', function() use ($app) { 
    $app->response->setStatusCode(200, "OK")->send();
});

set_exception_handler(function($exception) use ($app){
	//HTTPException's send method provides the correct response headers and body
	if(is_a($exception, 'PhalconRest\\Exceptions\\HTTPException')){
		$exception->send();
	}
	error_log($exception);
    error_log($exception->getTraceAsString());
    echo "<pre>";
    print_r($exception);
    #echo $exception->getTraceAsString();
    echo "</pre>";
});

$app->handle();
