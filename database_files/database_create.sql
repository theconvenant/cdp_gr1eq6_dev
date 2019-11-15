-- phpMyAdmin SQL Dump
-- version 3.1.2deb1ubuntu0.2
-- http://www.phpmyadmin.net
--
-- Serveur: localhost
-- Généré le : Ven 15 Novembre 2019 à 13:00
-- Version du serveur: 5.0.75
-- Version de PHP: 5.2.6-3ubuntu4.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `issues`
--

CREATE TABLE IF NOT EXISTS `issues` (
  `_issue_id` int(11) NOT NULL,
  `description` text collate utf8_unicode_ci NOT NULL,
  `difficulty` int(11) NOT NULL,
  `priority` text collate utf8_unicode_ci NOT NULL,
  `us_num` text collate utf8_unicode_ci NOT NULL,
  `test_state` text collate utf8_unicode_ci NOT NULL,
  `_project_id` int(11) NOT NULL,
  PRIMARY KEY  (`_issue_id`,`_project_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `projects`
--

CREATE TABLE IF NOT EXISTS `projects` (
  `_project_id` int(11) NOT NULL auto_increment,
  `_project_name` varchar(50) collate utf8_unicode_ci NOT NULL,
  `_owner_name` varchar(30) collate utf8_unicode_ci NOT NULL,
  `description` text collate utf8_unicode_ci,
  PRIMARY KEY  (`_project_name`,`_owner_name`),
  UNIQUE KEY `_project_id` (`_project_id`),
  KEY `user_exists` (`_owner_name`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

-- --------------------------------------------------------

--
-- Structure de la table `projects_users`
--

CREATE TABLE IF NOT EXISTS `projects_users` (
  `_user_name` varchar(50) collate utf8_unicode_ci NOT NULL,
  `_project_id` int(11) NOT NULL,
  PRIMARY KEY  (`_user_name`,`_project_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `releases_issues`
--

CREATE TABLE IF NOT EXISTS `releases_issues` (
  `_issue_id` int(11) NOT NULL,
  `_release_id` int(11) NOT NULL,
  PRIMARY KEY  (`_issue_id`,`_release_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `sprints`
--

CREATE TABLE IF NOT EXISTS `sprints` (
  `_id` INT NOT NULL,
  `starting_date` date NOT NULL,
  `ending_date` date NOT NULL,
  `description` text collate utf8_unicode_ci,
  `_project_id` int(11) NOT NULL,
  PRIMARY KEY  (`_id`,`_project_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `sprints_issues`
--

CREATE TABLE IF NOT EXISTS `sprints_issues` (
  `_issue_id` int(11) NOT NULL,
  `_sprint_id` int(11) NOT NULL,
  PRIMARY KEY  (`_issue_id`,`_sprint_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `sprints_releases`
--

CREATE TABLE IF NOT EXISTS `sprints_releases` (
  `_sprint_id` int(11) NOT NULL,
  `_release_id` int(11) NOT NULL,
  PRIMARY KEY  (`_sprint_id`,`_release_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `tasks`
--

CREATE TABLE IF NOT EXISTS `tasks` (
  `_task_id` int(11) NOT NULL,
  `description` text collate utf8_unicode_ci NOT NULL,
  `state` text collate utf8_unicode_ci NOT NULL,
  `_issue_id` int(11) default NULL,
  `_project_id` int(11) NOT NULL,
  PRIMARY KEY  (`_task_id`,`_project_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `tasks_tasks`
--

CREATE TABLE IF NOT EXISTS `tasks_tasks` (
  `_task_id` int(11) NOT NULL,
  `_dependency_task_id` int(11) NOT NULL,
  PRIMARY KEY  (`_task_id`,`_dependency_task_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `tasks_users`
--

CREATE TABLE IF NOT EXISTS `tasks_users` (
  `_task_id` int(11) NOT NULL,
  `_user_name` varchar(50) collate utf8_unicode_ci NOT NULL,
  PRIMARY KEY  (`_task_id`,`_user_name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `username` varchar(30) collate utf8_unicode_ci NOT NULL,
  `email` text collate utf8_unicode_ci,
  `password` text collate utf8_unicode_ci,
  PRIMARY KEY  (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
