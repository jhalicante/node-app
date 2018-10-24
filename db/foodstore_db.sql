-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 21, 2018 at 01:44 PM
-- Server version: 5.6.38
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `fastfood_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `ID` bigint(20) UNSIGNED NOT NULL,
  `uid` varchar(50) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(40) NOT NULL,
  `fname` varchar(30) NOT NULL,
  `lname` varchar(30) NOT NULL,
  `createdDate` date NOT NULL,
  `type` enum('customer','delivery') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`ID`, `uid`, `email`, `password`, `fname`, `lname`, `createdDate`, `type`) VALUES
(1, '234567890a123123123', 'alicantemae09@gmail.com', '1234567890', 'Johnmark', 'Alicante', '2018-10-20', 'customer'),
(2, '234567890a12312312ds', 'jad@gmail.com', '1234567890', 'Jad', 'Alicante', '2018-10-20', 'delivery'),
(16, '379bdad00e726c306218a45fa2b244dbe216dee482bd8d3134', 'jessamae@gmail.com', '55dc87c474272f286919', 'Jessamae', 'alicante', '2018-10-21', 'customer');

-- --------------------------------------------------------

--
-- Table structure for table `foodmenu`
--

CREATE TABLE `foodmenu` (
  `ID` bigint(20) UNSIGNED NOT NULL,
  `foodstore_id` varchar(100) NOT NULL,
  `item_id` varchar(100) NOT NULL,
  `item_name` varchar(100) NOT NULL,
  `item_price` int(11) NOT NULL,
  `item_description` text NOT NULL,
  `photo_url` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `foodstore`
--

CREATE TABLE `foodstore` (
  `ID` bigint(20) UNSIGNED NOT NULL,
  `foodstore_id` varchar(150) NOT NULL,
  `name` varchar(150) NOT NULL,
  `photo_url` text NOT NULL,
  `rating_id` varchar(100) NOT NULL,
  `location` text NOT NULL,
  `latitude` varchar(30) NOT NULL,
  `longitude` varchar(30) NOT NULL,
  `delivery_personel` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `foodstore`
--

INSERT INTO `foodstore` (`ID`, `foodstore_id`, `name`, `photo_url`, `rating_id`, `location`, `latitude`, `longitude`, `delivery_personel`) VALUES
(1, '2345678', '', '', '', '', '', '', '234567890a12312312ds');

-- --------------------------------------------------------

--
-- Table structure for table `foodstore_rating`
--

CREATE TABLE `foodstore_rating` (
  `ID` bigint(20) UNSIGNED NOT NULL,
  `foodstore_id` varchar(100) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `rate_star` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD UNIQUE KEY `ID` (`ID`);

--
-- Indexes for table `foodmenu`
--
ALTER TABLE `foodmenu`
  ADD UNIQUE KEY `ID` (`ID`);

--
-- Indexes for table `foodstore`
--
ALTER TABLE `foodstore`
  ADD UNIQUE KEY `ID` (`ID`);

--
-- Indexes for table `foodstore_rating`
--
ALTER TABLE `foodstore_rating`
  ADD UNIQUE KEY `ID` (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `foodmenu`
--
ALTER TABLE `foodmenu`
  MODIFY `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `foodstore`
--
ALTER TABLE `foodstore`
  MODIFY `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `foodstore_rating`
--
ALTER TABLE `foodstore_rating`
  MODIFY `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
