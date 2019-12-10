-- phpMyAdmin SQL Dump
-- version 3.1.2deb1ubuntu0.2
-- http://www.phpmyadmin.net
--
-- Serveur: localhost
-- Généré le : Mar 19 Novembre 2019 à 18:10
-- Version du serveur: 5.0.75
-- Version de PHP: 5.2.6-3ubuntu4.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

CREATE DATABASE agourgue;

USE agourgue;

--
-- Base de données: `agourgue`
--

-- --------------------------------------------------------

--
-- Structure de la table `documentation`
--

CREATE TABLE IF NOT EXISTS `documentation` (
  `_id` int(11) NOT NULL,
  `filepath` text collate utf8_unicode_ci NOT NULL,
  `_project_id` int(11) NOT NULL,
  PRIMARY KEY  (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `documentation`
--


-- --------------------------------------------------------

--
-- Structure de la table `issues`
--

CREATE TABLE IF NOT EXISTS `issues` (
  `_issue_id` int(11) NOT NULL AUTO_INCREMENT,
  `description` text collate utf8_unicode_ci NOT NULL,
  `difficulty` int(11) NOT NULL,
  `priority` text collate utf8_unicode_ci NOT NULL,
  `us_num` text collate utf8_unicode_ci NOT NULL,
  `test_state` text collate utf8_unicode_ci NOT NULL,
  `_project_id` int(11) NOT NULL,
  PRIMARY KEY  (`_issue_id`,`_project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `issues`
--

-- --------------------------------------------------------

--
-- Structure de la table `projects`
--

CREATE TABLE IF NOT EXISTS `projects` (
  `_project_id` int(11) NOT NULL auto_increment,
  `_project_name` varchar(50) collate utf8_unicode_ci NOT NULL,
  `_owner_name` varchar(50) collate utf8_unicode_ci NOT NULL,
  `description` text collate utf8_unicode_ci,
  UNIQUE KEY `_project_id` (`_project_id`),
  KEY `_owner_name` (`_owner_name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

--
-- Contenu de la table `projects`
--


-- --------------------------------------------------------

--
-- Structure de la table `projects_users`
--

CREATE TABLE IF NOT EXISTS `projects_users` (
  `_user_name` varchar(50) collate utf8_unicode_ci NOT NULL,
  `_project_id` int(11) NOT NULL,
  PRIMARY KEY  (`_user_name`,`_project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `projects_users`
--


-- --------------------------------------------------------

--
-- Structure de la table `releases`
--

CREATE TABLE IF NOT EXISTS `releases` (
  `_id` int(11) NOT NULL auto_increment,
  `filepath` text collate utf8_unicode_ci NOT NULL,
  `creation_date` datetime NOT NULL,
  `version_num` int(11) NOT NULL,
  `description` text collate utf8_unicode_ci NOT NULL,
  `_project_id` int(11) NOT NULL,
  PRIMARY KEY  (`_id`,`_project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

--
-- Contenu de la table `releases`
--


-- --------------------------------------------------------

--
-- Structure de la table `releases_issues`
--

CREATE TABLE IF NOT EXISTS `releases_issues` (
  `_issue_id` int(11) NOT NULL,
  `_release_id` int(11) NOT NULL,
  PRIMARY KEY  (`_issue_id`,`_release_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `releases_issues`
--


-- --------------------------------------------------------

--
-- Structure de la table `sprints`
--

CREATE TABLE IF NOT EXISTS `sprints` (
  `_id` int(11) NOT NULL auto_increment,
  `name` varchar(50) collate utf8_unicode_ci NOT NULL,
  `starting_date` date NOT NULL,
  `ending_date` date NOT NULL,
  `description` text collate utf8_unicode_ci,
  `_project_id` int(11) NOT NULL,
  PRIMARY KEY  (`_id`,`_project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `sprints`
--


-- --------------------------------------------------------

--
-- Structure de la table `sprints_issues`
--

CREATE TABLE IF NOT EXISTS `sprints_issues` (
  `_issue_id` int(11) NOT NULL,
  `_sprint_id` int(11) NOT NULL,
  PRIMARY KEY  (`_issue_id`,`_sprint_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `sprints_issues`
--


-- --------------------------------------------------------

--
-- Structure de la table `sprints_releases`
--

CREATE TABLE IF NOT EXISTS `sprints_releases` (
  `_sprint_id` int(11) NOT NULL,
  `_release_id` int(11) NOT NULL,
  PRIMARY KEY  (`_sprint_id`,`_release_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `sprints_releases`
--


-- --------------------------------------------------------

--
-- Structure de la table `tasks`
--

CREATE TABLE IF NOT EXISTS `tasks` (
  `_task_id` int(11) NOT NULL,
  `description` text collate utf8_unicode_ci NOT NULL,
  `state` text collate utf8_unicode_ci NOT NULL,
  `_project_id` int(11) NOT NULL,
  PRIMARY KEY  (`_task_id`,`_project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `tasks`
--

-- --------------------------------------------------------

--
-- Structure de la table `tasks_issues`
--

CREATE TABLE IF NOT EXISTS `tasks_issues` (
  `_task_id` int(11) NOT NULL,
  `_issue_id` int(11) NOT NULL,
  PRIMARY KEY  (`_task_id`,`_issue_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `task_issues`
--

-- --------------------------------------------------------

--
-- Structure de la table `tasks_tasks`
--

CREATE TABLE IF NOT EXISTS `tasks_tasks` (
  `_task_id` int(11) NOT NULL,
  `_dependency_task_id` int(11) NOT NULL,
  PRIMARY KEY  (`_task_id`,`_dependency_task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `tasks_tasks`
--


-- --------------------------------------------------------

--
-- Structure de la table `tasks_users`
--

CREATE TABLE IF NOT EXISTS `tasks_users` (
  `_task_id` int(11) NOT NULL,
  `_user_name` varchar(50) collate utf8_unicode_ci NOT NULL,
  PRIMARY KEY  (`_task_id`,`_user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `tasks_users`
--


-- --------------------------------------------------------

--
-- Structure de la table `tests`
--

CREATE TABLE IF NOT EXISTS `tests` (
  `_id` int(11) NOT NULL auto_increment,
  `description` text collate utf8_unicode_ci NOT NULL,
  `state` text collate utf8_unicode_ci NOT NULL,
  `result_description` text collate utf8_unicode_ci,
  `_issue_id` int(11) NOT NULL,
  `_project_id` int(11) NOT NULL,
  PRIMARY KEY  (`_id`,`_project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

--
-- Contenu de la table `tests`
--


-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `username` varchar(50) collate utf8_unicode_ci NOT NULL,
  `email` text collate utf8_unicode_ci,
  `password` text collate utf8_unicode_ci,
  PRIMARY KEY  (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `users`
--

--
-- Insertion des valeurs dans la bdd
--

INSERT INTO `issues` (`_issue_id`, `description`, `difficulty`, `priority`, `us_num`, `test_state`, `_project_id`) VALUES
(1, 'gedgs', 9, 'undefined', 'ezsge', 'DONE', 1),
(6, 'En tant que chargé de projet je souhaite accéder à mes contacts', 2, 'Medium', 'US1', 'TODO', 6),
(8, 'En tant que participant au projet je souhaite accéder aux issues', 1, 'Low', 'US2', 'TODO', 6),
(16, 'En tant que participant au projet je souhaite accéder aux tasks', 3, 'Medium', 'US3', 'DONE', 6);

INSERT INTO `projects` (`_project_id`, `_project_name`, `_owner_name`, `description`) VALUES
(1, 'esdgs', 'jane', '<qsdfq'),
(2, 'qzs', 'bob', 'aq'),
(3, 'zaqeda', 'bob', 'aqdz'),
(6, 'projetTest', 'bob', 'description');

INSERT INTO `projects_users` (`_user_name`, `_project_id`) VALUES
('bob', 1),
('jane', 6);

INSERT INTO `sprints` (`_id`, `name`, `starting_date`, `ending_date`, `description`, `_project_id`) VALUES
(1, 'Sprint1', '2220-02-02', '2222-02-20', 'description', 2),
(2, 'Sprint2', '1010-02-02', '1111-03-02', 'description', 2),
(3, 'Sprint 1', '2019-12-03', '2019-12-12', 'Sprint 1', 6),
(6, 'Sprint 2', '2019-12-12', '2019-12-24', NULL, 6),
(8, 'Name', '0000-00-00', '0000-00-00', 'desc_test', 18),
(9, 'Name', '2010-04-02', '2010-04-11', 'desc_test', 18);

INSERT INTO `sprints_issues` (`_issue_id`, `_sprint_id`) VALUES
(6, 3),
(6, 6),
(8, 3),
(14, 7),
(16, 6);

INSERT INTO `tasks` (`_task_id`, `description`, `state`, `_project_id`) VALUES
(8, 'qezs', 'DOING', 1),
(12, 'Ecrire dans le fichier \"contacts.js\" la fonction d écriture dans la base de données', 'DONE', 6),
(121, 'Ecrire dans le fichier \"issues.js\" la fonction d écriture dans la base de données', 'TODO', 6),
(757, 'fdgrs', 'TODO', 1);

INSERT INTO `tasks_issues` (`_task_id`, `_issue_id`) VALUES
(121, 6),
(121, 16);

INSERT INTO `tasks_tasks` (`_task_id`, `_dependency_task_id`) VALUES
(8, 757);

INSERT INTO `tasks_users` (`_task_id`, `_user_name`) VALUES
(8, 'jane'),
(12, 'bob'),
(121, 'bob'),
(757, 'jane');

INSERT INTO `users` (`username`, `email`, `password`) VALUES
('bob', 'zsdfq', 'bob'),
('bobby', 'ok@ok.com', 'bob'),
('jane', 'edgs', 'JJ');


--
-- Insertion des valeurs
--

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes
-- Contraintes
ALTER TABLE `projects`
  ADD CONSTRAINT `primary_project_name` PRIMARY KEY (`_project_name`, `_owner_name`);
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`_owner_name`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `tasks_issues`
  ADD CONSTRAINT `tasks_issues_for_task` FOREIGN KEY (`_task_id`) REFERENCES `tasks` (`_task_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `tasks_issues`
  ADD CONSTRAINT `tasks_issues_for_issue` FOREIGN KEY (`_issue_id`) REFERENCES `issues` (`_issue_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `tasks_tasks`
   ADD CONSTRAINT `tasks_tasks_for_task` FOREIGN KEY (`_task_id`) REFERENCES `tasks` (`_task_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `tasks_tasks`
   ADD CONSTRAINT `tasks_tasks_for_dependencyTask` FOREIGN KEY (`_dependency_task_id`) REFERENCES `tasks` (`_task_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `tasks`
   ADD CONSTRAINT `task_project` FOREIGN KEY (`_project_id`) REFERENCES `projects` (`_project_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- ALTER TABLE `tests`
--    ADD CONSTRAINT `test_project` FOREIGN KEY (`_project_id`) REFERENCES `tests` (`_project_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `issues`
   ADD CONSTRAINT `issues_project` FOREIGN KEY (`_project_id`) REFERENCES `projects` (`_project_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `sprints`
   ADD CONSTRAINT `sprint_project` FOREIGN KEY (`_project_id`) REFERENCES `projects` (`_project_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `sprints_issues`
   ADD CONSTRAINT `sprint_issues` FOREIGN KEY (`_issue_id`) REFERENCES `issues` (`_issue_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `releases`
   ADD CONSTRAINT `releases_project` FOREIGN KEY (`_project_id`) REFERENCES `projects` (`_project_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `documentation`
   ADD CONSTRAINT `documentation_project` FOREIGN KEY (`_project_id`) REFERENCES `projects` (`_project_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `tasks_users`
   ADD CONSTRAINT `tasks_users` FOREIGN KEY (`_user_name`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `projects_users`
   ADD CONSTRAINT `add_user_project` FOREIGN KEY (`_user_name`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;
