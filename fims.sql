-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2025 at 11:21 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fims`
--

-- --------------------------------------------------------

--
-- Table structure for table `crops`
--

CREATE TABLE `crops` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `crops`
--

INSERT INTO `crops` (`id`, `name`) VALUES
(1, 'Maize'),
(2, 'Rice'),
(3, 'Sorghum'),
(4, 'Cassava'),
(5, 'Sweet potatoes'),
(6, 'Beans'),
(7, 'Bambara nuts'),
(8, 'Groundnuts'),
(9, 'Cotton'),
(10, 'Sunflower'),
(11, 'Cowpea'),
(12, 'Chickpea'),
(13, 'Cabbage'),
(14, 'Chinese cabbage'),
(15, 'Cucumber'),
(16, 'Onion'),
(17, 'Amaranths'),
(18, 'Pawpaw'),
(19, 'Okra'),
(20, 'Tomatoes'),
(21, 'Watermelon'),
(22, 'Sweet pepper'),
(23, 'Eggplant'),
(24, 'African Egg Plant'),
(25, 'Bell Pepper'),
(26, 'Chili Pepper'),
(27, 'Butternut'),
(28, 'Grams'),
(29, 'Carrots'),
(30, 'Beetroot'),
(31, 'Mangoes'),
(32, 'Passion'),
(33, 'Avocado'),
(34, 'Guava'),
(35, 'Pineapple'),
(36, 'Oranges'),
(37, 'Lemon'),
(38, 'Lime'),
(39, 'Kale'),
(40, 'Spinach'),
(41, 'Lettuce'),
(42, 'Cowpea Leaves'),
(43, 'Potato Leaves'),
(44, 'Pumpkin Leaves'),
(45, 'Leek'),
(46, 'Black Night Shade');

-- --------------------------------------------------------

--
-- Table structure for table `district_officers`
--

CREATE TABLE `district_officers` (
  `id` int(11) NOT NULL,
  `officer_id` varchar(30) NOT NULL,
  `name` varchar(100) NOT NULL,
  `district` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `district_officers`
--

INSERT INTO `district_officers` (`id`, `officer_id`, `name`, `district`, `phone`, `email`, `password_hash`, `created_at`) VALUES
(1, 'DAO-KAHAMA-001', 'District Admin', 'Kahama', '+255 754 205 293', 'dao@kahamamc.go.tz', '$2y$10$oBQkVnr7ZWUtzqJ3rIBtteQGa1L3YQo77dXFKZuWTviAiRqU0d/MW', '2025-06-19 10:27:26');

-- --------------------------------------------------------

--
-- Table structure for table `extension_officers`
--

CREATE TABLE `extension_officers` (
  `id` int(11) NOT NULL,
  `officer_id` varchar(30) NOT NULL,
  `name` varchar(100) NOT NULL,
  `ward` varchar(100) DEFAULT NULL,
  `district` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `farmers`
--

CREATE TABLE `farmers` (
  `id` int(11) NOT NULL,
  `farmer_id` varchar(30) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `village` varchar(100) NOT NULL,
  `ward` varchar(100) NOT NULL,
  `district` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `farmers`
--

INSERT INTO `farmers` (`id`, `farmer_id`, `first_name`, `middle_name`, `last_name`, `village`, `ward`, `district`, `phone`, `email`, `password_hash`, `created_at`) VALUES
(2, 'FMR-62631-716', 'KELVIN', 'ALFRED', 'MHANGANYA', 'MAJENGO', 'MAJENGO', 'KAHAMA', '0754205293', 'alfredkelvin587@gmail.com', '$2y$10$BsibpKC3tD2Eq3IeaD65qOwFSP/diaHJu3HJDjJ6puujIL1LPXafq', '2025-06-18 16:03:51'),
(4, 'FMR-63569-974', 'RAPHAEL', 'ROBERT', 'MSIGWA', 'MANZESE', 'BUSOKA', 'KAHAMA', '+255747866975', '', '$2y$10$Ucxl3wCU44jVDnXcK6i3DuNiPWBs7XT81zzPwNOzJ8ZjE4g86SlzC', '2025-06-18 16:19:29'),
(5, 'FMR-22511-135', 'NICKSON', 'JAPHET', 'NDIMBO', 'MANZESE', 'BUSOKA', 'KAHAMA', '0616417442', '', '$2y$10$q/lxGlmg0Fu/BcFOzlqCbOPmKZCQaZZJ3Y4mVMr6Wtf/rzMY4D.lW', '2025-06-19 08:41:51');

-- --------------------------------------------------------

--
-- Table structure for table `farms`
--

CREATE TABLE `farms` (
  `id` int(11) NOT NULL,
  `farmer_id` varchar(30) NOT NULL,
  `farm_name` varchar(100) NOT NULL,
  `location` text DEFAULT NULL,
  `size` decimal(6,2) DEFAULT NULL,
  `crop_type` varchar(100) DEFAULT NULL,
  `status` enum('Pending','Verified') DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `market_prices`
--

CREATE TABLE `market_prices` (
  `id` int(11) NOT NULL,
  `crop_name` varchar(100) NOT NULL,
  `price_per_unit` decimal(10,2) NOT NULL,
  `unit` varchar(20) NOT NULL,
  `region` varchar(100) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `outputs`
--

CREATE TABLE `outputs` (
  `id` int(11) NOT NULL,
  `farm_id` int(11) NOT NULL,
  `crop_name` varchar(100) DEFAULT NULL,
  `quantity` decimal(10,2) DEFAULT NULL,
  `unit` varchar(20) DEFAULT NULL,
  `recorded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `regions`
--

CREATE TABLE `regions` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `regions`
--

INSERT INTO `regions` (`id`, `name`) VALUES
(1, 'Arusha'),
(2, 'Dar es Salaam'),
(3, 'Dodoma'),
(4, 'Geita'),
(5, 'Iringa'),
(6, 'Kagera'),
(7, 'Katavi'),
(8, 'Kigoma'),
(9, 'Kilimanjaro'),
(10, 'Lindi'),
(11, 'Manyara'),
(12, 'Mara'),
(13, 'Mbeya'),
(14, 'Morogoro'),
(15, 'Mtwara'),
(16, 'Mwanza'),
(17, 'Njombe'),
(18, 'Pemba North'),
(19, 'Pemba South'),
(20, 'Pwani'),
(21, 'Rukwa'),
(22, 'Ruvuma'),
(23, 'Shinyanga'),
(24, 'Simiyu'),
(25, 'Singida'),
(31, 'Songwe'),
(26, 'Tabora'),
(27, 'Tanga'),
(28, 'Zanzibar Central/South'),
(29, 'Zanzibar North'),
(30, 'Zanzibar Urban/West');

-- --------------------------------------------------------

--
-- Table structure for table `villages`
--

CREATE TABLE `villages` (
  `id` int(11) NOT NULL,
  `ward_id` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `villages`
--

INSERT INTO `villages` (`id`, `ward_id`, `name`) VALUES
(1, 1, 'Sunge'),
(2, 1, 'Kitwana'),
(3, 1, 'Busoka'),
(4, 2, 'Mhongolo'),
(5, 2, 'Nyashimbi'),
(6, 2, 'Mission'),
(7, 2, 'Mbulu'),
(8, 3, 'Busalala'),
(9, 3, 'Mwendakulima Kati'),
(10, 3, 'Chapulwa'),
(11, 3, 'Mwime'),
(12, 4, 'Seeke'),
(13, 4, 'Zongomera'),
(14, 4, 'Ilindi'),
(15, 5, 'Mtakuja'),
(16, 5, 'Shunu'),
(17, 5, 'Nyahanga'),
(18, 6, 'Igomelo'),
(19, 6, 'Korogwe'),
(20, 6, 'Malunga'),
(21, 7, 'Sokola'),
(22, 7, 'Majengo'),
(23, 8, 'Sango'),
(24, 8, 'Nyakato'),
(25, 8, 'Nyasubi Kati'),
(26, 9, 'Nyihogo'),
(27, 9, 'Sazia'),
(28, 10, 'Bukondamoyo'),
(29, 10, 'Mhungula'),
(30, 10, 'Inyanga'),
(31, 11, 'Igalilimi'),
(32, 11, 'Namanga'),
(33, 12, 'Ilungu'),
(34, 12, 'Ishiki'),
(35, 12, 'Kawe'),
(36, 12, 'Iyenze'),
(37, 12, 'Isalenge'),
(38, 13, 'Wame'),
(39, 13, 'Ufala'),
(40, 13, 'Nyanhembe'),
(41, 13, 'Kilago'),
(42, 13, 'Tulole'),
(43, 13, 'Shininga'),
(44, 14, 'Kilengwe'),
(45, 14, 'Chalya'),
(46, 14, 'Lowa'),
(47, 14, 'Kakebe'),
(48, 14, 'Nyandekwa'),
(49, 14, 'Buduba'),
(50, 14, 'Bujika'),
(51, 15, 'Tumaini'),
(52, 15, 'Katungulu'),
(53, 15, 'Wendele'),
(54, 15, 'Kahanga'),
(55, 16, 'Ngulu'),
(56, 16, 'Nyambula'),
(57, 16, 'Ngogwa'),
(58, 16, 'Nuja'),
(59, 17, 'Ubilimbi'),
(60, 17, 'Igung\'hwa'),
(61, 17, 'Kinaga'),
(62, 17, 'Nduku'),
(63, 17, 'Magobeko'),
(64, 18, 'Penzi'),
(65, 18, 'Mwanzwagi'),
(66, 18, 'Mondo'),
(67, 18, 'Sangilwa'),
(68, 18, 'Bumbiti'),
(69, 19, 'Kagongwa'),
(70, 19, 'Gembe'),
(71, 19, 'Kishima'),
(72, 19, 'Iponya'),
(73, 20, 'Mpera'),
(74, 20, 'Kidunyashi'),
(75, 20, 'Isagehe'),
(76, 20, 'Malenge'),
(77, 20, 'Bukooba');

-- --------------------------------------------------------

--
-- Table structure for table `wards`
--

CREATE TABLE `wards` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wards`
--

INSERT INTO `wards` (`id`, `name`) VALUES
(1, 'Busoka'),
(2, 'Mhongolo'),
(3, 'Mwendakulima'),
(4, 'Zongomera'),
(5, 'Nyahanga'),
(6, 'Malunga'),
(7, 'Majengo'),
(8, 'Nyasubi'),
(9, 'Nyihogo'),
(10, 'Mhungula'),
(11, 'Kahama Mjini'),
(12, 'Iyenze'),
(13, 'Kilago'),
(14, 'Nyandekwa'),
(15, 'Wendele'),
(16, 'Ngogwa'),
(17, 'Kinaga'),
(18, 'Mondo'),
(19, 'Kagongwa'),
(20, 'Isagehe');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `crops`
--
ALTER TABLE `crops`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `district_officers`
--
ALTER TABLE `district_officers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `officer_id` (`officer_id`);

--
-- Indexes for table `extension_officers`
--
ALTER TABLE `extension_officers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `officer_id` (`officer_id`);

--
-- Indexes for table `farmers`
--
ALTER TABLE `farmers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `farmer_id` (`farmer_id`);

--
-- Indexes for table `farms`
--
ALTER TABLE `farms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `farmer_id` (`farmer_id`);

--
-- Indexes for table `market_prices`
--
ALTER TABLE `market_prices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `outputs`
--
ALTER TABLE `outputs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `farm_id` (`farm_id`);

--
-- Indexes for table `regions`
--
ALTER TABLE `regions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `villages`
--
ALTER TABLE `villages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ward_id` (`ward_id`);

--
-- Indexes for table `wards`
--
ALTER TABLE `wards`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `crops`
--
ALTER TABLE `crops`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `district_officers`
--
ALTER TABLE `district_officers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `extension_officers`
--
ALTER TABLE `extension_officers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `farmers`
--
ALTER TABLE `farmers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `farms`
--
ALTER TABLE `farms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `market_prices`
--
ALTER TABLE `market_prices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `outputs`
--
ALTER TABLE `outputs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `regions`
--
ALTER TABLE `regions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `villages`
--
ALTER TABLE `villages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `wards`
--
ALTER TABLE `wards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `farms`
--
ALTER TABLE `farms`
  ADD CONSTRAINT `farms_ibfk_1` FOREIGN KEY (`farmer_id`) REFERENCES `farmers` (`farmer_id`) ON DELETE CASCADE;

--
-- Constraints for table `outputs`
--
ALTER TABLE `outputs`
  ADD CONSTRAINT `outputs_ibfk_1` FOREIGN KEY (`farm_id`) REFERENCES `farms` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `villages`
--
ALTER TABLE `villages`
  ADD CONSTRAINT `villages_ibfk_1` FOREIGN KEY (`ward_id`) REFERENCES `wards` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
