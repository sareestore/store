-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 27, 2017 at 10:23 AM
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
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
CREATE TABLE IF NOT EXISTS `colors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `color` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `color` (`color`),
  UNIQUE KEY `color_2` (`color`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `color`, `created_at`, `updated_at`) VALUES
  (1, 'red', '2017-01-11 16:03:43', '2017-01-11 16:03:43'),
  (2, 'blue', '2017-01-11 16:03:43', '2017-01-11 16:03:43'),
  (3, 'yellow', '2017-01-11 16:04:07', '2017-01-11 16:04:07'),
  (4, 'white', '2017-01-11 16:04:07', '2017-01-11 16:04:07'),
  (5, 'black', '2017-01-11 17:06:58', '2017-01-11 17:06:58'),
  (6, 'pink', '2017-01-11 17:09:30', '2017-01-11 17:09:30'),
  (7, 'orange', '2017-01-11 17:14:05', '2017-01-11 17:14:05');

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
-- Table structure for table `occasions`
--

DROP TABLE IF EXISTS `occasions`;
CREATE TABLE IF NOT EXISTS `occasions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occasion` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `occasion` (`occasion`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `occasions`
--

INSERT INTO `occasions` (`id`, `occasion`, `created_at`, `updated_at`) VALUES
  (1, 'office', '2017-01-11 16:04:59', '2017-01-11 16:04:59'),
  (2, 'casual', '2017-01-11 16:04:59', '2017-01-11 16:04:59'),
  (3, 'party', '2017-01-11 16:05:37', '2017-01-11 16:05:37'),
  (4, 'traditional', '2017-01-11 16:05:37', '2017-01-11 16:05:37'),
  (5, 'function', '2017-01-11 16:44:42', '2017-01-11 16:44:42'),
  (6, 'ethnic', '2017-01-11 23:49:26', '2017-01-11 23:49:26'),
  (7, 'funky', '2017-01-14 11:54:02', '2017-01-14 11:54:02'),
  (8, 'school', '2017-01-14 11:56:02', '2017-01-14 11:56:02'),
  (9, 'college', '2017-01-14 11:56:45', '2017-01-14 11:56:45');

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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(300) DEFAULT NULL,
  `price` varchar(50) DEFAULT NULL,
  `size` varchar(30) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `description`, `price`, `size`, `created_at`, `updated_at`) VALUES
  (6, 'It is Awesome co''z its random', '500', '15', '2017-01-15 23:00:37', '2017-01-15 23:00:37'),
  (7, 'afafdga', '4564', '156', '2017-01-15 23:01:48', '2017-01-15 23:01:48'),
  (9, 'kjdhfgjahlg', '500', '', '2017-01-21 20:56:55', '2017-01-21 20:56:55');

-- --------------------------------------------------------

--
-- Table structure for table `products_colors`
--

DROP TABLE IF EXISTS `products_colors`;
CREATE TABLE IF NOT EXISTS `products_colors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `products_id` int(11) NOT NULL,
  `colors_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_id` (`products_id`,`colors_id`),
  KEY `colors_id` (`colors_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products_colors`
--

INSERT INTO `products_colors` (`id`, `products_id`, `colors_id`, `created_at`, `updated_at`) VALUES
  (13, 6, 3, '2017-01-15 23:00:37', '2017-01-15 23:00:37'),
  (14, 6, 4, '2017-01-15 23:00:37', '2017-01-15 23:00:37'),
  (15, 7, 2, '2017-01-15 23:01:48', '2017-01-15 23:01:48'),
  (16, 7, 6, '2017-01-15 23:01:48', '2017-01-15 23:01:48'),
  (20, 9, 3, '2017-01-21 20:56:55', '2017-01-21 20:56:55');

-- --------------------------------------------------------

--
-- Table structure for table `products_images`
--

DROP TABLE IF EXISTS `products_images`;
CREATE TABLE IF NOT EXISTS `products_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `products_id` int(11) NOT NULL,
  `image_url` varchar(250) NOT NULL,
  `is_default` int(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_id` (`products_id`,`image_url`),
  UNIQUE KEY `products_id_2` (`products_id`,`image_url`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products_images`
--

INSERT INTO `products_images` (`id`, `products_id`, `image_url`, `is_default`, `created_at`, `updated_at`) VALUES
  (25, 6, 'product_images-1484501437278', 0, '2017-01-15 23:00:37', '2017-01-15 23:00:37'),
  (26, 6, 'product_images-1484501437294', 0, '2017-01-15 23:00:37', '2017-01-15 23:00:37'),
  (27, 7, 'product_images-1484501508807', 0, '2017-01-15 23:01:48', '2017-01-15 23:01:48'),
  (28, 7, 'product_images-1484501508825', 0, '2017-01-15 23:01:49', '2017-01-15 23:01:49'),
  (29, 7, 'product_images-1484501508841', 0, '2017-01-15 23:01:49', '2017-01-15 23:01:49'),
  (30, 7, 'product_images-1484501508844', 0, '2017-01-15 23:01:49', '2017-01-15 23:01:49'),
  (40, 9, 'product_images-1485012415525', 0, '2017-01-21 20:56:55', '2017-01-21 20:56:55'),
  (41, 9, 'product_images-1485012415527', 0, '2017-01-21 20:56:55', '2017-01-21 20:56:55');

-- --------------------------------------------------------

--
-- Table structure for table `products_occasions`
--

DROP TABLE IF EXISTS `products_occasions`;
CREATE TABLE IF NOT EXISTS `products_occasions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `products_id` int(11) NOT NULL,
  `occasions_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_id` (`products_id`,`occasions_id`),
  KEY `occasions_id` (`occasions_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products_occasions`
--

INSERT INTO `products_occasions` (`id`, `products_id`, `occasions_id`, `created_at`, `updated_at`) VALUES
  (10, 6, 4, '2017-01-15 23:00:37', '2017-01-15 23:00:37'),
  (11, 6, 5, '2017-01-15 23:00:37', '2017-01-15 23:00:37'),
  (12, 7, 1, '2017-01-15 23:01:49', '2017-01-15 23:01:49'),
  (13, 7, 6, '2017-01-15 23:01:49', '2017-01-15 23:01:49'),
  (17, 9, 2, '2017-01-21 20:56:55', '2017-01-21 20:56:55'),
  (18, 9, 5, '2017-01-21 20:56:55', '2017-01-21 20:56:55');

-- --------------------------------------------------------

--
-- Table structure for table `products_tags`
--

DROP TABLE IF EXISTS `products_tags`;
CREATE TABLE IF NOT EXISTS `products_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `products_id` int(11) NOT NULL,
  `tags_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_id` (`products_id`,`tags_id`),
  KEY `tags_id` (`tags_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products_tags`
--

INSERT INTO `products_tags` (`id`, `products_id`, `tags_id`, `created_at`, `updated_at`) VALUES
  (3, 6, 1, '2017-01-15 23:00:37', '2017-01-15 23:00:37'),
  (4, 7, 1, '2017-01-15 23:01:49', '2017-01-15 23:01:49'),
  (6, 9, 5, '2017-01-21 20:56:55', '2017-01-21 20:56:55');

-- --------------------------------------------------------

--
-- Table structure for table `products_types`
--

DROP TABLE IF EXISTS `products_types`;
CREATE TABLE IF NOT EXISTS `products_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `products_id` int(11) NOT NULL,
  `product_types_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_id` (`products_id`,`product_types_id`),
  KEY `product_types_id` (`product_types_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products_types`
--

INSERT INTO `products_types` (`id`, `products_id`, `product_types_id`, `created_at`, `updated_at`) VALUES
  (6, 6, 2, '2017-01-15 23:00:37', '2017-01-15 23:00:37'),
  (7, 6, 4, '2017-01-15 23:00:37', '2017-01-15 23:00:37'),
  (8, 7, 1, '2017-01-15 23:01:49', '2017-01-15 23:01:49'),
  (9, 7, 6, '2017-01-15 23:01:49', '2017-01-15 23:01:49'),
  (13, 9, 1, '2017-01-21 20:56:55', '2017-01-21 20:56:55');

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
CREATE TABLE IF NOT EXISTS `product_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image_address` varchar(500) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_types`
--

DROP TABLE IF EXISTS `product_types`;
CREATE TABLE IF NOT EXISTS `product_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `type` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_types`
--

INSERT INTO `product_types` (`id`, `type`, `created_at`, `updated_at`) VALUES
  (1, 'saree', '2017-01-11 16:07:18', '2017-01-11 16:07:18'),
  (2, 'kurtas & kurtis', '2017-01-11 16:07:18', '2017-01-11 16:07:18'),
  (3, 'salwar suits', '2017-01-11 16:08:02', '2017-01-11 16:08:02'),
  (4, 'shirt', '2017-01-11 16:34:27', '2017-01-11 16:34:27'),
  (5, 'trouser', '2017-01-11 16:39:38', '2017-01-11 16:39:38'),
  (6, 'silksaree', '2017-01-11 16:40:49', '2017-01-11 16:40:49');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
CREATE TABLE IF NOT EXISTS `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tag` (`tag`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `tag`, `created_at`, `updated_at`) VALUES
  (1, 'cool', '2017-01-11 17:19:53', '2017-01-11 17:19:53'),
  (2, 'floral', '2017-01-21 19:58:59', '2017-01-21 19:58:59'),
  (3, 'geometrical', '2017-01-21 19:59:13', '2017-01-21 19:59:13'),
  (4, 'checks', '2017-01-21 20:55:35', '2017-01-21 20:55:35'),
  (5, 'geometric figures', '2017-01-21 20:55:49', '2017-01-21 20:55:49');

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
-- Constraints for table `products_colors`
--
ALTER TABLE `products_colors`
ADD CONSTRAINT `products_colors_ibfk_1` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `products_colors_ibfk_2` FOREIGN KEY (`colors_id`) REFERENCES `colors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products_images`
--
ALTER TABLE `products_images`
ADD CONSTRAINT `products_images_ibfk_1` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products_occasions`
--
ALTER TABLE `products_occasions`
ADD CONSTRAINT `products_occasions_ibfk_1` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `products_occasions_ibfk_2` FOREIGN KEY (`occasions_id`) REFERENCES `occasions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products_tags`
--
ALTER TABLE `products_tags`
ADD CONSTRAINT `products_tags_ibfk_1` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `products_tags_ibfk_2` FOREIGN KEY (`tags_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products_types`
--
ALTER TABLE `products_types`
ADD CONSTRAINT `products_types_ibfk_1` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `products_types_ibfk_2` FOREIGN KEY (`product_types_id`) REFERENCES `product_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users_verification`
--
ALTER TABLE `users_verification`
ADD CONSTRAINT `users_verification_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
