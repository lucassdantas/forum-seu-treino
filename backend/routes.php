<?php

// Inclua os arquivos necessários
require_once 'controllers/AuthController.php';
require_once 'controllers/UserController.php';
require_once 'controllers/PostController.php';
require_once 'controllers/CommentController.php';
require_once 'controllers/LikeController.php';
require_once 'controllers/RoutineController.php';
require_once 'controllers/AdminController.php';
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
        $userController->index(); // Listar usuários
        break;

    case 'posts':
        // Aplicar middleware de autenticação
        $middleware->authMiddleware();

        $postController = new PostController();
        $postController->index(); // Listar postagens
        break;

    case 'comments':
        // Aplicar middleware de autenticação
        $middleware->authMiddleware();

        $commentController = new CommentController();
        $commentController->index(); // Listar comentários
        break;

    case 'likes':
        // Aplicar middleware de autenticação
        $middleware->authMiddleware();

        $likeController = new LikeController();
        $likeController->index(); // Listar curtidas
        break;

    case 'routines':
        // Aplicar middleware de autenticação
        $middleware->authMiddleware();

        $routineController = new RoutineController();
        $routineController->index(); // Listar rotinas
        break;

    case 'admin':
        // Aplicar middleware de autenticação
        $middleware->authMiddleware();

        // Verificar se o usuário é um administrador (supondo que haja uma função isAdmin() no seu sistema)
        if ($authController->isAdmin()) {
            $adminController = new AdminController();
            $adminController->adminArea(); // Acessar área administrativa
        } else {
            echo 'Você não tem permissão para acessar esta página.';
        }
        break;

    default:
        // Rota padrão para página inicial ou tratamento de erro
        echo 'Página não encontrada';
        break;
}

?>
