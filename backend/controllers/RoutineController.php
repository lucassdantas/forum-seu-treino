<?php

class RoutineController {
    // Simulação de dados de rotinas (substitua com sua própria lógica de persistência de dados)
    private $routines = [];

    // Função para criar uma nova rotina
    public function createRoutine($title, $description) {
        // Verifica se o usuário está logado ou tem permissão para criar rotinas (você pode adicionar verificação de autenticação aqui)
        // Simula a criação de uma nova rotina (substitua com sua própria lógica de persistência de dados)
        // Por exemplo, você pode inserir a rotina no banco de dados ou em qualquer outro armazenamento
        // Retorna o ID da rotina recém-criada ou retorna um erro em caso de falha

        // Aqui, apenas simularemos a criação da rotina e retornaremos um ID de rotina aleatório
        $routineId = mt_rand(1000, 9999); // Simula um ID de rotina
        $this->routines[$routineId] = ['title' => $title, 'description' => $description]; // Adiciona a rotina à lista de rotinas
        return ['routine_id' => $routineId];
    }

    // Função para recuperar uma rotina específica
    public function getRoutine($routineId) {
        // Verifica se a rotina existe
        if (isset($this->routines[$routineId])) {
            return $this->routines[$routineId]; // Retorna os dados da rotina
        } else {
            return ['error' => 'Rotina não encontrada'];
        }
    }

    // Função para atualizar uma rotina existente
    public function updateRoutine($routineId, $title, $description) {
        // Verifica se a rotina existe
        if (isset($this->routines[$routineId])) {
            // Atualiza os dados da rotina
            $this->routines[$routineId] = ['title' => $title, 'description' => $description];
            return true; // Retorna true se a rotina foi atualizada com sucesso
        } else {
            return ['error' => 'Rotina não encontrada'];
        }
    }

    // Função para excluir uma rotina existente
    public function deleteRoutine($routineId) {
        // Verifica se a rotina existe
        if (isset($this->routines[$routineId])) {
            unset($this->routines[$routineId]); // Remove a rotina da lista de rotinas
            return true; // Retorna true se a rotina foi excluída com sucesso
        } else {
            return ['error' => 'Rotina não encontrada'];
        }
    }
}

?>
