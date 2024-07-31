-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 01/08/2024 às 01:27
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `forum_seutreino`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `forum_comments`
--

CREATE TABLE `forum_comments` (
  `commentId` int(11) NOT NULL,
  `commentPostId` int(11) NOT NULL,
  `commentAuthorId` int(11) NOT NULL,
  `commentAuthorName` varchar(255) NOT NULL,
  `commentContent` text NOT NULL,
  `commentDateOfCreation` datetime NOT NULL,
  `commentStatus` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `forum_comments`
--

INSERT INTO `forum_comments` (`commentId`, `commentPostId`, `commentAuthorId`, `commentAuthorName`, `commentContent`, `commentDateOfCreation`, `commentStatus`) VALUES
(1, 4, 1, 'Lucas', 'aaaaaaaaaa', '2024-07-25 00:21:17', 1),
(5, 17, 2, 'Usuário de teste', 'aaaaaaaaa', '2024-07-25 00:25:30', 1),
(6, 17, 2, 'Usuário de teste', 'aaaaaaaaa', '2024-07-25 00:32:01', 1),
(7, 17, 2, 'Usuário de teste', 'bbbbbbbbbb', '2024-07-25 00:33:10', 1),
(8, 17, 2, 'Usuário de teste', 'aaaaaaaaaaaa', '2024-07-25 00:33:15', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `forum_followers`
--

CREATE TABLE `forum_followers` (
  `followerUserFollower` int(11) NOT NULL,
  `followerUserFollowed` int(11) NOT NULL,
  `followerDateOfCreation` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `forum_followers`
--

INSERT INTO `forum_followers` (`followerUserFollower`, `followerUserFollowed`, `followerDateOfCreation`) VALUES
(2, 1, 2024),
(4, 1, 2024),
(4, 2, 2024),
(4, 3, 2024);

-- --------------------------------------------------------

--
-- Estrutura para tabela `forum_likes`
--

CREATE TABLE `forum_likes` (
  `likeAuthorId` int(11) NOT NULL,
  `likePostId` int(11) NOT NULL,
  `likeDateOfCreation` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `forum_likes`
--

INSERT INTO `forum_likes` (`likeAuthorId`, `likePostId`, `likeDateOfCreation`) VALUES
(2, 17, 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `forum_posts`
--

CREATE TABLE `forum_posts` (
  `postId` int(11) NOT NULL,
  `postAuthorId` int(11) DEFAULT 1,
  `postContent` text NOT NULL,
  `postDateOfCreation` datetime NOT NULL DEFAULT current_timestamp(),
  `postImage` varchar(255) NOT NULL,
  `postLikesQuantity` int(11) NOT NULL,
  `postCommentsQuantity` int(11) NOT NULL,
  `postTopicId` int(11) NOT NULL,
  `postHasImage` tinyint(1) NOT NULL DEFAULT 0,
  `postStatus` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `forum_posts`
--

INSERT INTO `forum_posts` (`postId`, `postAuthorId`, `postContent`, `postDateOfCreation`, `postImage`, `postLikesQuantity`, `postCommentsQuantity`, `postTopicId`, `postHasImage`, `postStatus`) VALUES
(1, 1, 'Conteúdo do post', '2024-07-17 19:46:36', '', 0, 0, 1, 0, 0),
(2, 1, '', '2024-07-20 10:34:39', '', 0, 0, 1, 0, 0),
(3, 1, '', '2024-07-20 10:34:40', '', 0, 0, 1, 0, 0),
(4, 1, 'aaaaaaaaaaaaaaaaabbbbbbbbbbbbb', '2024-07-20 10:34:41', '', 4, 0, 1, 0, 1),
(5, 1, '', '2024-07-20 10:34:41', '', 0, 0, 1, 0, 1),
(17, 2, 'aaaaaaaaaaaaaaaaabbbbbbbbbbbbb', '2024-07-24 22:54:16', '', 4, 3, 1, 0, 0),
(18, 2, 'bbbbbbbbbbbb', '2024-07-31 02:41:10', '', 0, 0, 2, 0, 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `forum_routines`
--

CREATE TABLE `forum_routines` (
  `routineId` int(11) NOT NULL,
  `routineUserId` int(11) NOT NULL,
  `routineDescription` text NOT NULL,
  `routineDateToExecute` datetime NOT NULL,
  `routineDateOfCreation` datetime NOT NULL DEFAULT current_timestamp(),
  `routineStatus` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `forum_routines`
--

INSERT INTO `forum_routines` (`routineId`, `routineUserId`, `routineDescription`, `routineDateToExecute`, `routineDateOfCreation`, `routineStatus`) VALUES
(1, 1, 'aaaaaaaaaa', '2024-10-31 00:00:00', '2024-07-29 18:44:52', 0),
(2, 2, 'bbbbbbbbbbbbbbbbb', '2024-07-31 18:44:57', '2024-07-29 18:45:05', 1),
(4, 1, '1111111111', '1111-11-11 00:00:00', '2024-07-31 23:16:09', 1),
(5, 1, '1111111111', '1111-11-11 00:00:00', '2024-07-31 23:16:09', 1),
(6, 1, 'aaaaaaaaaaabbbbbbb', '2024-07-10 00:00:00', '2024-07-31 23:16:54', 0),
(7, 1, 'aaaaaaaaaabbbbbbbb', '2024-07-04 00:00:00', '2024-07-31 23:21:23', 0),
(8, 1, 'aa3123121212', '1232-02-13 00:00:00', '2024-07-31 23:22:22', 1),
(9, 1, '22222222', '0222-02-22 00:00:00', '2024-07-31 23:22:54', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `forum_topics`
--

CREATE TABLE `forum_topics` (
  `topicId` int(11) NOT NULL,
  `topicName` varchar(255) NOT NULL,
  `topicUrl` varchar(255) NOT NULL,
  `topicDateOfCreation` datetime NOT NULL DEFAULT current_timestamp(),
  `topicStatus` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `forum_topics`
--

INSERT INTO `forum_topics` (`topicId`, `topicName`, `topicUrl`, `topicDateOfCreation`, `topicStatus`) VALUES
(1, 'Todas as postagens', 'postagem', '2024-07-30 23:33:46', 1),
(2, 'aaaaaaaa', 'aaaaaaaa', '2024-07-31 02:34:05', 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `forum_users`
--

CREATE TABLE `forum_users` (
  `userId` int(11) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `userEmail` varchar(255) NOT NULL,
  `userBirthday` date NOT NULL,
  `userProfileImage` varchar(255) NOT NULL DEFAULT '''/profileImage/default/imagem-padrao-do-usuario.png''',
  `userPhone` varchar(255) NOT NULL,
  `userCoverImage` varchar(255) NOT NULL DEFAULT '''/profileImage/default/imagem-padrao-do-usuario.png''',
  `userFollowers` int(11) NOT NULL DEFAULT 0,
  `userSubjects` int(11) NOT NULL DEFAULT 0,
  `userPassword` varchar(255) NOT NULL,
  `userDateOfCreation` datetime NOT NULL DEFAULT current_timestamp(),
  `userHasImage` tinyint(1) NOT NULL DEFAULT 0,
  `userRole` varchar(255) DEFAULT NULL,
  `userStatus` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `forum_users`
--

INSERT INTO `forum_users` (`userId`, `userName`, `userEmail`, `userBirthday`, `userProfileImage`, `userPhone`, `userCoverImage`, `userFollowers`, `userSubjects`, `userPassword`, `userDateOfCreation`, `userHasImage`, `userRole`, `userStatus`) VALUES
(1, 'lucas', 'lucasdantasprogramador@gmail.com', '2002-01-07', '/profileImage/default/imagem-padrao-do-usuario.png', '', '/profileImage/default/imagem-padrao-do-usuario.png', 0, 0, '$2y$10$XgO/a7VGnn32Cr95auNb5eKbnyPO2GvrFTf97hkIA40WRJKgIa2mC', '2024-07-17 19:32:49', 0, NULL, 1),
(2, 'Lucas De Teste', 'teste@teste.com', '2024-07-04', '/profileImage/default/imagem-padrao-do-usuario.png', '212121', '/profileImage/default/imagem-padrao-do-usuario.png', 0, 0, '$2y$10$KiSEnjpRx6sPdlS5Htvp6uB0lhcHq3zcaZMIfey.4LM7TGKDeCJjK', '2024-07-18 10:16:42', 0, 'admin', 1),
(3, 'Lucas teste 03', 'lucas.danas@seutreino.com', '2024-07-10', '\'/profileImage/default/imagem-padrao-do-usuario.png\'', '1234', '\'/profileImage/default/imagem-padrao-do-usuario.png\'', 0, 0, '$2y$10$XgO/a7VGnn32Cr95auNb5eKbnyPO2GvrFTf97hkIA40WRJKgIa2mC', '2024-07-30 22:56:15', 1, NULL, 0),
(4, 'teste', '123@123.com', '2024-07-15', '\'/profileImage/default/imagem-padrao-do-usuario.png\'', '2131231212', '\'/profileImage/default/imagem-padrao-do-usuario.png\'', 0, 0, '$2y$10$XgO/a7VGnn32Cr95auNb5eKbnyPO2GvrFTf97hkIA40WRJKgIa2mC', '2024-07-30 22:57:39', 1, NULL, 0);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `forum_comments`
--
ALTER TABLE `forum_comments`
  ADD PRIMARY KEY (`commentId`),
  ADD KEY `commentAuthorId` (`commentAuthorId`),
  ADD KEY `commentPostId` (`commentPostId`);

--
-- Índices de tabela `forum_followers`
--
ALTER TABLE `forum_followers`
  ADD PRIMARY KEY (`followerUserFollower`,`followerUserFollowed`),
  ADD KEY `followerUserFollowed` (`followerUserFollowed`);

--
-- Índices de tabela `forum_likes`
--
ALTER TABLE `forum_likes`
  ADD PRIMARY KEY (`likeAuthorId`,`likePostId`),
  ADD KEY `likePostId` (`likePostId`);

--
-- Índices de tabela `forum_posts`
--
ALTER TABLE `forum_posts`
  ADD PRIMARY KEY (`postId`),
  ADD KEY `postAuthorId` (`postAuthorId`),
  ADD KEY `postTopicId` (`postTopicId`);

--
-- Índices de tabela `forum_routines`
--
ALTER TABLE `forum_routines`
  ADD PRIMARY KEY (`routineId`),
  ADD KEY `routineUserId` (`routineUserId`);

--
-- Índices de tabela `forum_topics`
--
ALTER TABLE `forum_topics`
  ADD PRIMARY KEY (`topicId`);

--
-- Índices de tabela `forum_users`
--
ALTER TABLE `forum_users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `forum_comments`
--
ALTER TABLE `forum_comments`
  MODIFY `commentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de tabela `forum_posts`
--
ALTER TABLE `forum_posts`
  MODIFY `postId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de tabela `forum_routines`
--
ALTER TABLE `forum_routines`
  MODIFY `routineId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `forum_topics`
--
ALTER TABLE `forum_topics`
  MODIFY `topicId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `forum_users`
--
ALTER TABLE `forum_users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `forum_comments`
--
ALTER TABLE `forum_comments`
  ADD CONSTRAINT `forum_comments_ibfk_1` FOREIGN KEY (`commentAuthorId`) REFERENCES `forum_users` (`userId`),
  ADD CONSTRAINT `forum_comments_ibfk_2` FOREIGN KEY (`commentPostId`) REFERENCES `forum_posts` (`postId`);

--
-- Restrições para tabelas `forum_followers`
--
ALTER TABLE `forum_followers`
  ADD CONSTRAINT `forum_followers_ibfk_1` FOREIGN KEY (`followerUserFollower`) REFERENCES `forum_users` (`userId`),
  ADD CONSTRAINT `forum_followers_ibfk_2` FOREIGN KEY (`followerUserFollowed`) REFERENCES `forum_users` (`userId`);

--
-- Restrições para tabelas `forum_likes`
--
ALTER TABLE `forum_likes`
  ADD CONSTRAINT `forum_likes_ibfk_1` FOREIGN KEY (`likeAuthorId`) REFERENCES `forum_users` (`userId`),
  ADD CONSTRAINT `forum_likes_ibfk_2` FOREIGN KEY (`likePostId`) REFERENCES `forum_posts` (`postId`);

--
-- Restrições para tabelas `forum_posts`
--
ALTER TABLE `forum_posts`
  ADD CONSTRAINT `forum_posts_ibfk_1` FOREIGN KEY (`postAuthorId`) REFERENCES `forum_users` (`userId`),
  ADD CONSTRAINT `forum_posts_ibfk_2` FOREIGN KEY (`postTopicId`) REFERENCES `forum_topics` (`topicId`);

--
-- Restrições para tabelas `forum_routines`
--
ALTER TABLE `forum_routines`
  ADD CONSTRAINT `forum_routines_ibfk_1` FOREIGN KEY (`routineUserId`) REFERENCES `forum_users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
