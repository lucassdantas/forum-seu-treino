<?php

// Inclua os arquivos necessários
require_once 'controllers/AuthController.php';
require_once 'controllers/UserController.php';
require_once 'controllers/PostController.php';
require_once 'controllers/CommentController.php';
require_once 'controllers/LikeController.php';
require_once 'controllers/RoutineController.php';
require_once 'backend/middleware.php';

// Crie uma instância do middleware
$middleware = new Middleware();

// Defina as rotas
$route = $_GET['route'] ?? ''; // Obtenha o parâmetro 'route' da URL

switch ($route) {
    case 'login':
        $authController = new AuthController();
        $authController->login();
        break;

    case 'logout':
        $authController = new AuthController();
        $authController->logout();
        break;

    case 'users':
        // Aplicar middleware de autenticação
        $middleware->authMiddleware();

        $userController = new UserController();
        $userController->index(); // Método para listar usuários
        break;

    case 'posts':
        // Aplicar middleware de autenticação
        $middleware->authMiddleware();

        $postController = new PostController();
        $postController->index(); // Método para listar postagens
        break;

    case 'comments':
        // Aplicar middleware de autenticação
        $middleware->authMiddleware();

        $commentController = new CommentController();
        $commentController->index(); // Método para listar comentários
        break;

    case 'likes':
        // Aplicar middleware de autenticação
        $middleware->authMiddleware();

        $likeController = new LikeController();
        $likeController->index(); // Método para listar curtidas
        break;

    case 'routines':
        // Aplicar middleware de autenticação
        $middleware->authMiddleware();

        $routineController = new RoutineController();
        $routineController->index(); // Método para listar rotinas
        break;

    default:
        // Rota padrão para página inicial ou tratamento de erro
        echo 'Página não encontrada';
        break;
}

?>
