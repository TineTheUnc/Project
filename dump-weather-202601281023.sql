-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: weather
-- ------------------------------------------------------
-- Server version	9.5.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;



--
-- Table structure for table `Rain`
--

DROP TABLE IF EXISTS `Rain`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rain` (
  `Rain_id` int NOT NULL AUTO_INCREMENT,
  `Rain_persent` float NOT NULL DEFAULT '0',
  `Rain_zone` int NOT NULL,
  `Rain_by` int NOT NULL,
  `Rain_create` varchar(10) NOT NULL,
  PRIMARY KEY (`Rain_id`),
  KEY `Rain_Rain_by_fkey` (`Rain_by`),
  KEY `Rain_Rain_zone_fkey` (`Rain_zone`),
  CONSTRAINT `Rain_Rain_by_fkey` FOREIGN KEY (`Rain_by`) REFERENCES `User` (`User_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Rain_Rain_zone_fkey` FOREIGN KEY (`Rain_zone`) REFERENCES `Zone` (`Zone_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=156 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rain`
--

LOCK TABLES `Rain` WRITE;
/*!40000 ALTER TABLE `Rain` DISABLE KEYS */;
INSERT INTO `Rain` VALUES (2,40,2,1,'2026-01-13'),(3,50,3,1,'2026-01-13'),(4,30,4,1,'2026-01-13'),(5,28,5,1,'2026-01-13'),(7,10,1,1,'2026-01-13'),(8,25,6,1,'2026-01-13'),(9,0,7,1,'2026-01-13'),(10,45,8,1,'2026-01-13'),(11,15,9,1,'2026-01-13'),(12,30,10,1,'2026-01-13'),(13,20,1,1,'2026-01-14'),(14,35,2,1,'2026-01-14'),(15,5,3,1,'2026-01-14'),(16,50,4,1,'2026-01-14'),(17,10,5,1,'2026-01-14'),(18,40,6,1,'2026-01-14'),(19,0,7,1,'2026-01-14'),(20,55,8,1,'2026-01-14'),(21,25,9,1,'2026-01-14'),(22,15,10,1,'2026-01-14'),(23,30,1,1,'2026-01-15'),(24,0,2,1,'2026-01-15'),(25,45,3,1,'2026-01-15'),(26,20,4,1,'2026-01-15'),(27,35,5,1,'2026-01-15'),(28,10,6,1,'2026-01-15'),(29,50,7,1,'2026-01-15'),(30,5,8,1,'2026-01-15'),(31,40,9,1,'2026-01-15'),(32,25,10,1,'2026-01-15'),(33,15,1,1,'2026-01-16'),(34,45,2,1,'2026-01-16'),(35,0,3,1,'2026-01-16'),(36,30,4,1,'2026-01-16'),(37,20,5,1,'2026-01-16'),(38,35,6,1,'2026-01-16'),(39,10,7,1,'2026-01-16'),(40,50,8,1,'2026-01-16'),(41,5,9,1,'2026-01-16'),(42,40,10,1,'2026-01-16'),(43,25,1,1,'2026-01-17'),(44,0,2,1,'2026-01-17'),(45,35,3,1,'2026-01-17'),(46,15,4,1,'2026-01-17'),(47,45,5,1,'2026-01-17'),(48,20,6,1,'2026-01-17'),(49,30,7,1,'2026-01-17'),(50,10,8,1,'2026-01-17'),(51,50,9,1,'2026-01-17'),(52,5,10,1,'2026-01-17'),(53,40,1,1,'2026-01-18'),(54,25,2,1,'2026-01-18'),(55,0,3,1,'2026-01-18'),(56,35,4,1,'2026-01-18'),(57,15,5,1,'2026-01-18'),(58,45,6,1,'2026-01-18'),(59,20,7,1,'2026-01-18'),(60,30,8,1,'2026-01-18'),(61,10,9,1,'2026-01-18'),(62,50,10,1,'2026-01-18'),(63,5,1,1,'2026-01-19'),(64,40,2,1,'2026-01-19'),(65,25,3,1,'2026-01-19'),(66,0,4,1,'2026-01-19'),(67,35,5,1,'2026-01-19'),(68,15,6,1,'2026-01-19'),(69,45,7,1,'2026-01-19'),(70,20,8,1,'2026-01-19'),(71,30,9,1,'2026-01-19'),(72,10,10,1,'2026-01-19'),(73,50,1,1,'2026-01-20'),(74,5,2,1,'2026-01-20'),(75,40,3,1,'2026-01-20'),(76,25,4,1,'2026-01-20'),(77,0,5,1,'2026-01-20'),(78,35,6,1,'2026-01-20'),(79,15,7,1,'2026-01-20'),(80,45,8,1,'2026-01-20'),(81,20,9,1,'2026-01-20'),(82,30,10,1,'2026-01-20'),(83,12,1,1,'2026-01-21'),(84,38,2,1,'2026-01-21'),(85,7,3,1,'2026-01-21'),(86,42,4,1,'2026-01-21'),(87,18,5,1,'2026-01-21'),(88,33,6,1,'2026-01-21'),(89,0,7,1,'2026-01-21'),(90,47,8,1,'2026-01-21'),(91,22,9,1,'2026-01-21'),(92,28,10,1,'2026-01-21'),(93,35,1,1,'2026-01-22'),(94,8,2,1,'2026-01-22'),(95,41,3,1,'2026-01-22'),(96,14,4,1,'2026-01-22'),(97,29,5,1,'2026-01-22'),(98,6,6,1,'2026-01-22'),(99,52,7,1,'2026-01-22'),(100,19,8,1,'2026-01-22'),(101,37,9,1,'2026-01-22'),(102,11,10,1,'2026-01-22'),(103,26,1,1,'2026-01-23'),(104,44,2,1,'2026-01-23'),(105,3,3,1,'2026-01-23'),(106,39,4,1,'2026-01-23'),(107,16,5,1,'2026-01-23'),(108,31,6,1,'2026-01-23'),(109,48,7,1,'2026-01-23'),(110,9,8,1,'2026-01-23'),(111,34,9,1,'2026-01-23'),(112,21,10,1,'2026-01-23'),(113,17,1,1,'2026-01-24'),(114,43,2,1,'2026-01-24'),(115,1,3,1,'2026-01-24'),(116,36,4,1,'2026-01-24'),(117,24,5,1,'2026-01-24'),(118,49,6,1,'2026-01-24'),(119,13,7,1,'2026-01-24'),(120,32,8,1,'2026-01-24'),(121,46,9,1,'2026-01-24'),(122,4,10,1,'2026-01-24'),(123,27,1,1,'2026-01-25'),(124,12,2,1,'2026-01-25'),(125,38,3,1,'2026-01-25'),(126,7,4,1,'2026-01-25'),(127,41,5,1,'2026-01-25'),(128,18,6,1,'2026-01-25'),(129,33,7,1,'2026-01-25'),(130,0,8,1,'2026-01-25'),(131,47,9,1,'2026-01-25'),(132,22,10,1,'2026-01-25'),(133,28,1,1,'2026-01-26'),(134,35,2,1,'2026-01-26'),(135,8,3,1,'2026-01-26'),(136,42,4,1,'2026-01-26'),(137,14,5,1,'2026-01-26'),(138,29,6,1,'2026-01-26'),(139,6,7,1,'2026-01-26'),(140,52,8,1,'2026-01-26'),(153,40,10,2,'2026-01-26'),(155,50,9,2,'2026-01-26');
/*!40000 ALTER TABLE `Rain` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SensorData`
--

DROP TABLE IF EXISTS `SensorData`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SensorData` (
  `SD_id` int NOT NULL AUTO_INCREMENT,
  `SD_data` json NOT NULL,
  `SD_create` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`SD_id`),
  UNIQUE KEY `uq_day` (`SD_create`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SensorData`
--

LOCK TABLES `SensorData` WRITE;
/*!40000 ALTER TABLE `SensorData` DISABLE KEYS */;
INSERT INTO `SensorData` VALUES (1,'{\"alt\": -8.66, \"hum\": 65.18, \"pres\": 101429.03, \"temp\": 27.03}','2026-01-25'),(2,'{\"alt\": -5.23, \"hum\": 72.45, \"pres\": 101512.67, \"temp\": 28.12}','2026-01-13'),(3,'{\"alt\": -3.89, \"hum\": 68.92, \"pres\": 101478.34, \"temp\": 26.87}','2026-01-14'),(4,'{\"alt\": -7.14, \"hum\": 71.23, \"pres\": 101445.89, \"temp\": 29.34}','2026-01-15'),(5,'{\"alt\": -4.67, \"hum\": 69.78, \"pres\": 101523.12, \"temp\": 27.56}','2026-01-16'),(6,'{\"alt\": -6.45, \"hum\": 73.41, \"pres\": 101489.76, \"temp\": 28.78}','2026-01-17'),(7,'{\"alt\": -2.98, \"hum\": 67.34, \"pres\": 101467.23, \"temp\": 26.43}','2026-01-18'),(8,'{\"alt\": -8.12, \"hum\": 74.89, \"pres\": 101534.45, \"temp\": 29.67}','2026-01-19'),(9,'{\"alt\": -5.76, \"hum\": 70.56, \"pres\": 101498.78, \"temp\": 27.89}','2026-01-20'),(10,'{\"alt\": -4.23, \"hum\": 72.12, \"pres\": 101456.34, \"temp\": 28.45}','2026-01-21'),(11,'{\"alt\": -7.89, \"hum\": 69.67, \"pres\": 101521.78, \"temp\": 26.78}','2026-01-22'),(12,'{\"alt\": -3.45, \"hum\": 75.23, \"pres\": 101487.56, \"temp\": 29.12}','2026-01-23'),(13,'{\"alt\": -6.78, \"hum\": 68.45, \"pres\": 101503.89, \"temp\": 27.34}','2026-01-24'),(14,'{\"alt\": -9.34, \"hum\": 71.78, \"pres\": 101469.12, \"temp\": 28.56}','2026-01-26'),(15,'{\"alt\": -4.56, \"hum\": 73.89, \"pres\": 101536.67, \"temp\": 26.98}','2026-01-27');
/*!40000 ALTER TABLE `SensorData` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `User_id` int NOT NULL AUTO_INCREMENT,
  `User_name` varchar(100) NOT NULL,
  `User_email` varchar(100) NOT NULL,
  `User_password` varchar(100) NOT NULL,
  `User_role` enum('user','staff','admin') NOT NULL DEFAULT 'user',
  `User_avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '/img/avatar.jpg',
  PRIMARY KEY (`User_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'Admin','Admin@email.com','123','admin','/api/avatar?f=/avatar/1.jpeg'),(2,'Staff','Staff@email.com','123','staff','/uploads/avatars/2.jpeg'),(10,'test','test@email.com','123','staff','/api/avatar?f=/avatar/10.jpeg');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Zone`
--

DROP TABLE IF EXISTS `Zone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Zone` (
  `Zone_id` int NOT NULL AUTO_INCREMENT,
  `Zone_name` varchar(100) NOT NULL,
  PRIMARY KEY (`Zone_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Zone`
--

LOCK TABLES `Zone` WRITE;
/*!40000 ALTER TABLE `Zone` DISABLE KEYS */;
INSERT INTO `Zone` VALUES (1,'ชุมพร'),(2,'กรุงเทพ'),(3,'เชียงใหม่'),(4,'เพชรบุรี'),(5,'สงขลา'),(6,'ภูเก็ต'),(7,'นครศรีธรรมราช'),(8,'สุราษฎร์ธานี'),(9,'ระนอง'),(10,'พังงา');
/*!40000 ALTER TABLE `Zone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'weather'
--
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-28 10:23:09
