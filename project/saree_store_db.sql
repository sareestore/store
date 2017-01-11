-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 11, 2017 at 04:29 AM
-- Server version: 5.7.9
-- PHP Version: 5.6.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `saree_store_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `email_change_requests`
--

DROP TABLE IF EXISTS `email_change_requests`;
CREATE TABLE IF NOT EXISTS `email_change_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `customers_id` int(11) NOT NULL,
  `new_email` varchar(150) NOT NULL,
  `old_email` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_email_change_requests_customers1_idx` (`customers_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `password_change_requests`
--

DROP TABLE IF EXISTS `password_change_requests`;
CREATE TABLE IF NOT EXISTS `password_change_requests` (
  `token` varchar(150) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `users_id` int(11) NOT NULL,
  PRIMARY KEY (`token`),
  KEY `fk_password_change_requests_users1` (`users_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `password_change_requests`
--

INSERT INTO `password_change_requests` (`token`, `time`, `users_id`) VALUES
  ('bfcc362b068939816ce07a1841261e71477fb249', '2017-01-08 11:29:36', 7);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(150) NOT NULL,
  `emailid` varchar(200) NOT NULL,
  `password` varchar(300) NOT NULL,
  `fullname` varchar(150) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(300) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_verified` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `emailid` (`emailid`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `emailid`, `password`, `fullname`, `phone`, `address`, `created_at`, `updated_at`, `is_verified`) VALUES
  (7, 'sudhir', 'nagasudhirpulla@gmail', 'pullasudhir', 'NA', 'NA', 'NA', '2016-11-22 13:37:32', '2017-01-07 07:47:41', 1),
  (8, 'pradeep', 'psanodiya@gmail.com', 'abc123', 'NA', 'NA', 'NA', '2016-11-22 13:38:59', '2016-11-22 13:38:59', 0),
  (24, 'ghggj', 'nagasudhirpulla@gmail.co', 'gghgHGJHGH', 'NA', 'NA', 'NA', '2016-12-04 07:03:21', '2017-01-07 05:34:25', 0),
  (25, 'hgjh', 'ghgj@hjhjg.com', 'asdf', 'NA', 'NA', 'NA', '2017-01-07 07:04:40', '2017-01-07 07:04:40', 0),
  (30, 'ghgugj', 'nagasudhirpulla@gmail.com', 'asdf', 'NA', 'NA', 'NA', '2017-01-08 04:55:23', '2017-01-08 04:55:23', 0),
  (31, 'admin', 'admin@asd.com', 'abc123', '', '', '', '2017-01-11 04:22:00', '2017-01-11 04:22:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users_verification`
--

DROP TABLE IF EXISTS `users_verification`;
CREATE TABLE IF NOT EXISTS `users_verification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `users_id` int(11) NOT NULL,
  `token` varchar(300) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `users_id` (`users_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users_verification`
--

INSERT INTO `users_verification` (`id`, `users_id`, `token`, `created_at`) VALUES
  (2, 7, 'e3acd91b03ec3a2223d7fe90884d236f6c87f4c1', '2016-11-22 19:07:32'),
  (3, 8, '9684eaf385e2886f02b0c69a76e221e5366770d8', '2016-11-22 19:08:59'),
  (18, 24, 'c33de1210c7c9464c6b63136d986363b49e6b6f9', '2016-12-04 12:33:21'),
  (19, 25, '2b1595cc24c5cc944cbcebf92b9986784e743dda', '2017-01-07 12:34:40'),
  (22, 30, '079521da309de740966b1d4c3df6bf6c36032f22', '2017-01-08 10:25:23');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `email_change_requests`
--
ALTER TABLE `email_change_requests`
ADD CONSTRAINT `fk_email_change_requests_customers1` FOREIGN KEY (`customers_id`) REFERENCES `customers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `password_change_requests`
--
ALTER TABLE `password_change_requests`
ADD CONSTRAINT `fk_password_change_requests_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users_verification`
--
ALTER TABLE `users_verification`
ADD CONSTRAINT `users_verification_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;