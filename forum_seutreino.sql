-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 25/07/2024 às 02:30
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
  `commentDateOfCreation` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `forum_comments`
--

INSERT INTO `forum_comments` (`commentId`, `commentPostId`, `commentAuthorId`, `commentAuthorName`, `commentContent`, `commentDateOfCreation`) VALUES
(1, 4, 1, 'Lucas', 'aaaaaaaaaa', '2024-07-25 00:21:17'),
(2, 4, 1, 'Lucas', 'aaaaaaa', '2024-07-25 00:23:04'),
(3, 4, 1, 'Lucas', 'bbbbbbbb', '2024-07-25 00:23:07'),
(4, 4, 1, 'Lucas', 'cccccccccc', '2024-07-25 00:23:16'),
(5, 17, 2, 'Usuário de teste', 'aaaaaaaaa', '2024-07-25 00:25:30');

-- --------------------------------------------------------

--
-- Estrutura para tabela `forum_followers`
--

CREATE TABLE `forum_followers` (
  `followerUserFollower` int(11) NOT NULL,
  `followerUserFollowed` int(11) NOT NULL,
  `followerDateOfCreation` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `postAuthorId` int(11) NOT NULL,
  `postContent` text NOT NULL,
  `postDateOfCreation` datetime NOT NULL DEFAULT current_timestamp(),
  `postImage` varchar(255) NOT NULL,
  `postLikesQuantity` int(11) NOT NULL,
  `postCommentsQuantity` int(11) NOT NULL,
  `postTopicId` int(11) NOT NULL,
  `postHasImage` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `forum_posts`
--

INSERT INTO `forum_posts` (`postId`, `postAuthorId`, `postContent`, `postDateOfCreation`, `postImage`, `postLikesQuantity`, `postCommentsQuantity`, `postTopicId`, `postHasImage`) VALUES
(1, 1, 'Conteúdo do post', '2024-07-17 19:46:36', '', 0, 0, 1, 0),
(2, 1, '', '2024-07-20 10:34:39', '', 0, 0, 1, 0),
(3, 1, '', '2024-07-20 10:34:40', '', 0, 0, 1, 0),
(4, 1, 'aaaaaaaaaaaaaaaaabbbbbbbbbbbbb', '2024-07-20 10:34:41', '', 4, 0, 1, 0),
(5, 1, '', '2024-07-20 10:34:41', '', 0, 0, 1, 0),
(17, 2, 'aaaaaaaaaaaaaaaaabbbbbbbbbbbbb', '2024-07-24 22:54:16', '', 4, 0, 1, 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `forum_topics`
--

CREATE TABLE `forum_topics` (
  `topicId` int(11) NOT NULL,
  `topicName` varchar(255) NOT NULL,
  `topicUrl` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `forum_topics`
--

INSERT INTO `forum_topics` (`topicId`, `topicName`, `topicUrl`) VALUES
(1, 'Postagem', 'postagem');

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
  `userCoverImage` varchar(255) NOT NULL DEFAULT '''/profileImage/default/imagem-padrao-do-usuario.png''',
  `userFollowers` int(11) NOT NULL DEFAULT 0,
  `userSubjects` int(11) NOT NULL DEFAULT 0,
  `userPassword` varchar(255) NOT NULL,
  `userDateOfCreation` datetime NOT NULL DEFAULT current_timestamp(),
  `userHarImage` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `forum_users`
--

INSERT INTO `forum_users` (`userId`, `userName`, `userEmail`, `userBirthday`, `userProfileImage`, `userCoverImage`, `userFollowers`, `userSubjects`, `userPassword`, `userDateOfCreation`, `userHarImage`) VALUES
(1, 'lucas', 'lucasdantasprogramador@gmail.com', '2002-01-07', '/profileImage/default/imagem-padrao-do-usuario.png', '/profileImage/default/imagem-padrao-do-usuario.png', 0, 0, '123456', '2024-07-17 19:32:49', 0),
(2, 'Usuário de teste', 'teste@teste.com', '2024-07-02', '/profileImage/default/imagem-padrao-do-usuario.png', '/profileImage/default/imagem-padrao-do-usuario.png', 0, 0, 'teste', '2024-07-18 10:16:42', 0);

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
  MODIFY `commentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `forum_posts`
--
ALTER TABLE `forum_posts`
  MODIFY `postId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de tabela `forum_topics`
--
ALTER TABLE `forum_topics`
  MODIFY `topicId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `forum_users`
--
ALTER TABLE `forum_users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
