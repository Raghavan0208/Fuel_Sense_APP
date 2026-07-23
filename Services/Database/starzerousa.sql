CREATE DATABASE  IF NOT EXISTS `starzerousa` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `starzerousa`;
-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: starzerousa
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brand` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `displayname` varchar(255) DEFAULT NULL,
  `enumname` varchar(255) DEFAULT NULL,
  `displayinlist` tinyint(1) DEFAULT NULL,
  `roworder` int DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `createdby` int DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `modifiedby` int DEFAULT NULL,
  `vehicleTypeid` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `vehicleTypeid` (`vehicleTypeid`),
  CONSTRAINT `brand_ibfk_1` FOREIGN KEY (`vehicleTypeid`) REFERENCES `vehicletype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES (52,'Toyota','Toyota','Toyota',1,0,1,'2026-07-02 12:29:11',NULL,'2026-07-02 12:29:11',NULL,1),(53,'Honda','Honda','Honda',1,0,1,'2026-07-02 13:29:12',NULL,'2026-07-02 13:29:12',NULL,1),(54,'Maruti Suzuki','Maruti Suzuki','Maruti Suzuki',1,0,1,'2026-07-09 10:50:51',NULL,'2026-07-09 10:50:51',NULL,1);
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brandseries`
--

DROP TABLE IF EXISTS `brandseries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brandseries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `brandid` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `displayname` varchar(255) DEFAULT NULL,
  `enumname` varchar(255) DEFAULT NULL,
  `displayinlist` tinyint(1) DEFAULT NULL,
  `roworder` int DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `createdby` int DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `modifiedby` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `brandid` (`brandid`),
  CONSTRAINT `brandseries_ibfk_1` FOREIGN KEY (`brandid`) REFERENCES `brand` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=388 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brandseries`
--

LOCK TABLES `brandseries` WRITE;
/*!40000 ALTER TABLE `brandseries` DISABLE KEYS */;
INSERT INTO `brandseries` VALUES (385,52,'Camry','Camry','Camry',1,0,1,'2026-07-02 12:29:11',NULL,'2026-07-02 12:29:11',NULL),(386,53,'Accord','Accord','Accord',1,0,1,'2026-07-02 13:29:12',NULL,'2026-07-02 13:29:12',NULL),(387,54,'-','-','-',1,0,1,'2026-07-09 10:50:51',NULL,'2026-07-09 10:50:51',NULL);
/*!40000 ALTER TABLE `brandseries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brandvariant`
--

DROP TABLE IF EXISTS `brandvariant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brandvariant` (
  `id` int NOT NULL AUTO_INCREMENT,
  `brandseriesid` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `displayname` varchar(255) DEFAULT NULL,
  `enumname` varchar(255) DEFAULT NULL,
  `displayinlist` tinyint(1) DEFAULT NULL,
  `roworder` int DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `createdby` int DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `modifiedby` int DEFAULT NULL,
  `fueltypeid` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `brandseriesid` (`brandseriesid`),
  KEY `fk_fueltypeid` (`fueltypeid`),
  CONSTRAINT `brandvariant_ibfk_1` FOREIGN KEY (`brandseriesid`) REFERENCES `brandseries` (`id`),
  CONSTRAINT `fk_fueltypeid` FOREIGN KEY (`fueltypeid`) REFERENCES `fueltype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1452 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brandvariant`
--

LOCK TABLES `brandvariant` WRITE;
/*!40000 ALTER TABLE `brandvariant` DISABLE KEYS */;
INSERT INTO `brandvariant` VALUES (1449,385,'LE','LE','LE',1,0,1,'2026-07-02 12:29:11',NULL,'2026-07-02 12:29:11',NULL,1),(1450,386,'EX-L','EX-L','EX-L',1,0,1,'2026-07-02 13:29:12',NULL,'2026-07-02 13:29:12',NULL,1),(1451,387,'-','-','-',1,0,1,'2026-07-09 10:50:51',NULL,'2026-07-09 10:50:51',NULL,1);
/*!40000 ALTER TABLE `brandvariant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contactus`
--

DROP TABLE IF EXISTS `contactus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contactus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `createdby` int DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `modifiedby` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contactus`
--

LOCK TABLES `contactus` WRITE;
/*!40000 ALTER TABLE `contactus` DISABLE KEYS */;
INSERT INTO `contactus` VALUES (1,'a','1898989898','a@k.l','n',1,'2023-07-18 07:04:26',0,'2023-07-18 07:04:26',0),(2,'Kavitha Sri R','7695876101','kavithasrir@inventsoftlabs.com','hi',1,'2023-07-18 07:08:59',0,'2023-07-18 07:08:59',0),(3,'Kavitha Sri R','7695876101','kavithasrir@inventsoftlabs.com','hi',1,'2023-07-18 07:14:20',0,'2023-07-18 07:14:20',0),(4,'Kavi','9976524800','Kavi@gmail.com','hi',1,'2023-07-18 07:15:05',0,'2023-07-18 07:15:05',0),(5,'Kavitha Sri','7695876101','Kavitha@gmail.com','hi',1,'2023-07-18 07:25:22',0,'2023-07-18 07:25:22',0),(6,'kavi','9976524800','kavithasrir2001@gmail.com','hi',1,'2023-07-18 07:46:43',0,'2023-07-18 07:46:43',0),(7,'Kavi D','9879879876','kavitha@abcd.com','hi',1,'2023-07-18 08:11:04',0,'2023-07-18 08:11:04',0),(8,'a','9797979797','kavithasrir2001@gmail.com','hi',1,'2023-07-18 08:26:29',0,'2023-07-18 08:26:29',0),(9,'a','9696969696','kavithasrir2001@gmail.com','hi',1,'2023-07-18 08:27:22',0,'2023-07-18 08:27:22',0),(10,'a','9696969696','kavithasrir2001@gmail.com','hi',1,'2023-07-18 08:27:30',0,'2023-07-18 08:27:30',0),(11,'a','9696989798','kavithasrir2001@gmail.com','hi',1,'2023-07-18 08:28:10',0,'2023-07-18 08:28:10',0),(12,'a','9797979787','abcd@gmail.com','hi',1,'2023-07-18 08:36:30',0,'2023-07-18 08:36:30',0),(13,'a','9698796789','kavithasrir2001@gmail.com','hi',1,'2023-07-18 08:36:57',0,'2023-07-18 08:36:57',0),(14,'a','9698796789','kavithasrir2001@gmail.com','hi',1,'2023-07-18 08:36:58',0,'2023-07-18 08:36:58',0),(15,'a','9698796789','kavithasrir2001@gmail.com','hi',1,'2023-07-18 08:37:50',0,'2023-07-18 08:37:50',0),(16,'a','9698796789','kavithasrir2001@gmail.com','hi',1,'2023-07-18 08:38:10',0,'2023-07-18 08:38:10',0),(17,'a','9698796789','kavithasrir2001@gmail.com','hi',1,'2023-07-18 08:40:33',0,'2023-07-18 08:40:33',0),(18,'a','9698796789','kavithasrir2001@gmail.com','hi',1,'2023-07-18 08:40:36',0,'2023-07-18 08:40:36',0),(19,'a','9698796789','kavithasrir2001@gmail.com','hi',1,'2023-07-18 08:41:03',0,'2023-07-18 08:41:03',0),(20,'a','9698796789','kavithasrir2001@gmail.com','hi',1,'2023-07-18 08:41:09',0,'2023-07-18 08:41:09',0),(21,'a','9698796789','kavithasrir2001@gmail.com','hi',1,'2023-07-18 08:41:10',0,'2023-07-18 08:41:10',0),(22,'a','9698796789','kavithasrir2001@gmail.com','hi',1,'2023-07-18 08:41:11',0,'2023-07-18 08:41:11',0),(23,'a','9709709709','kavithasrir2001@gmail.com','hi',1,'2023-07-18 08:48:43',0,'2023-07-18 08:48:43',0),(24,'a','0980987098','kavithasrir2001@gmail.com','hi',1,'2023-07-18 08:50:57',0,'2023-07-18 08:50:57',0),(25,'Uthayakumar Chelliah','9941302668','uthayac2002@gmail.com','test',1,'2023-07-18 12:25:43',0,'2023-07-18 12:25:43',0),(26,'dfsdf','4665645654','sdfsdf@gmail.com','fghfghf',1,'2023-07-19 07:02:01',0,'2023-07-19 07:02:01',0),(27,'dfsdf','4665645654','sdfsdf@gmail.com','fghfghf',1,'2023-07-19 07:03:00',0,'2023-07-19 07:03:00',0),(28,'dfsdf','4665645654','sdfsdf@gmail.com','fghfghf',1,'2023-07-19 07:03:09',0,'2023-07-19 07:03:09',0),(29,'j','0980980980','j@gmail.com','j',1,'2023-07-20 04:37:27',0,'2023-07-20 04:37:27',0),(30,'santha ','8764567890','uyif@gmail.com','s',1,'2023-07-20 05:27:53',0,'2023-07-20 05:27:53',0),(31,'santha ','8764567890','uyif@gmail.com','s',1,'2023-07-20 05:30:14',0,'2023-07-20 05:30:14',0),(32,'santha ','8764567890','uyif@gmail.com','s',1,'2023-07-20 05:32:58',0,'2023-07-20 05:32:58',0),(33,'abcd','8098181567','abc@gmail.com','a',1,'2023-07-20 06:12:53',0,'2023-07-20 06:12:53',0),(34,'Tets','8654789658','test@gmail.com','test',1,'2023-07-20 06:20:56',0,'2023-07-20 06:20:56',0),(35,'Chitra','9999988888','chitram@inventsoftlabs.com','Test Desc',1,'2023-07-20 10:28:18',0,'2023-07-20 10:28:18',0),(36,'Hukum','1234567890','hukum@gmail.com','mm',1,'2023-07-21 04:49:48',0,'2023-07-21 04:49:48',0),(37,'Hukum','1234567899','hukum@gmail.io','d',1,'2023-07-21 05:01:52',0,'2023-07-21 05:01:52',0),(38,'hukum','1234567890','bb@gmail.com','mm',1,'2023-07-21 05:37:44',0,'2023-07-21 05:37:44',0),(39,'bb','0987654321','bb@gmail.com','mn',1,'2023-07-21 05:38:48',0,'2023-07-21 05:38:48',0),(40,'bb','0987654321','bb@gmail.com','mn',1,'2023-07-21 05:40:07',0,'2023-07-21 05:40:07',0),(41,'bb','0987654321','bb@gmail.com','mn',1,'2023-07-21 05:40:11',0,'2023-07-21 05:40:11',0),(42,'New','1234567890','bb@gmail.com','qwd',1,'2023-07-21 05:40:35',0,'2023-07-21 05:40:35',0),(43,'123','9876432123','abc123@gmail.com','ee',1,'2023-07-21 05:41:27',0,'2023-07-21 05:41:27',0),(44,'Rajini','7667834545','rajini@gmail.com','Hii',1,'2023-07-21 05:42:53',0,'2023-07-21 05:42:53',0),(45,'AGR','1234567809','aa@gmail.com','Hi',1,'2023-07-21 05:49:16',0,'2023-07-21 05:49:16',0),(46,'Ganesh','1234567890','ganesh@gmail.co','hi',1,'2023-07-21 05:57:04',0,'2023-07-21 05:57:04',0),(47,'Ganesh','1234567890','ganesh@gmail.co','hi',1,'2023-07-21 05:57:04',0,'2023-07-21 05:57:04',0),(48,'New','1234567890','bb@gmail.com','hi',1,'2023-07-21 06:00:46',0,'2023-07-21 06:00:46',0),(49,'New','1234567890','bb@gmail.com','jijij',1,'2023-07-21 06:01:57',0,'2023-07-21 06:01:57',0),(50,'Bb','1234567890','bb@gmail.io','Nn',1,'2023-07-21 06:31:14',0,'2023-07-21 06:31:14',0),(51,'Megandar Khan','1231231231','megandarkhan@gmail.com','13',1,'2023-07-21 13:08:58',0,'2023-07-21 13:08:58',0),(52,'mehandarkhan','1231231231','megandarkhan@gmail.com','1',1,'2023-07-21 13:09:20',0,'2023-07-21 13:09:20',0),(53,'kathiravan','4534534534','kathiravana@itsoftlabs.com','dfgdfgdfgdfg',1,'2023-07-21 13:32:42',0,'2023-07-21 13:32:42',0),(54,'kathiravan','4534534534','kathiravana@itsoftlabs.com','dfgdfgdfgdfg',1,'2023-07-21 13:33:05',0,'2023-07-21 13:33:05',0),(55,'test','4444444444','Test@gmail.com','test',1,'2023-07-24 09:53:26',0,'2023-07-24 09:53:26',0),(56,'Ava Ron','8610549795','test@gmail.com','test',1,'2023-07-24 10:02:13',0,'2023-07-24 10:02:13',0),(57,'BB','9889274603','bb@gmail.com','nj',1,'2023-07-25 10:47:35',0,'2023-07-25 10:47:35',0),(58,'jh','7886786876','kani@gmail.com','hhhghg',1,'2023-07-25 11:18:11',0,'2023-07-25 11:18:11',0),(59,'test@gmail.com','8945632589','test@gmail.com','test',1,'2023-07-27 10:18:27',0,'2023-07-27 10:18:27',0),(60,'Uthayakumar Chelliah','9941302668','uthayac2002@gmail.com','test',1,'2023-08-04 08:39:04',0,'2023-08-04 08:39:04',0);
/*!40000 ALTER TABLE `contactus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emailtemplate`
--

DROP TABLE IF EXISTS `emailtemplate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emailtemplate` (
  `id` int NOT NULL AUTO_INCREMENT,
  `templatename` varchar(255) DEFAULT NULL,
  `displayname` varchar(255) DEFAULT NULL,
  `template` varchar(5000) DEFAULT NULL,
  `emailsubject` varchar(500) DEFAULT NULL,
  `emailcc` varchar(255) DEFAULT NULL,
  `emailbcc` varchar(255) DEFAULT NULL,
  `senderemail` varchar(255) DEFAULT NULL,
  `additionalinformation` varchar(5000) DEFAULT NULL,
  `attachementrequired` tinyint(1) DEFAULT NULL,
  `enumname` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `createdby` int DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `modifiedby` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emailtemplate`
--

LOCK TABLES `emailtemplate` WRITE;
/*!40000 ALTER TABLE `emailtemplate` DISABLE KEYS */;
INSERT INTO `emailtemplate` VALUES (1,'Login','Login','<!DOCTYPE html>','Login','indhumathiv@gmail.com','indhumathiv@gmail.com','chitram@inventsoftlabs.com',NULL,NULL,'Login',1,NULL,NULL,NULL,NULL),(2,'Cancel Subscription','Cancel Subscription','<!DOCTYPE html>','Cancel Subscription','indhumathiv@gmail.com','indhumathiv@gmail.com','chitram@inventsoftlabs.com',NULL,NULL,'Cancel Subscription',1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `emailtemplate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emissioncategory`
--

DROP TABLE IF EXISTS `emissioncategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emissioncategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vehicletypeid` int DEFAULT NULL,
  `fueltypeid` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `displayname` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `co2amount` decimal(16,2) DEFAULT NULL,
  `enumname` varchar(255) DEFAULT NULL,
  `displayinlist` tinyint(1) DEFAULT NULL,
  `roworder` int DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `createdby` int DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `modifiedby` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `vehicletypeid` (`vehicletypeid`),
  KEY `fueltypeid` (`fueltypeid`),
  CONSTRAINT `emissioncategory_ibfk_1` FOREIGN KEY (`vehicletypeid`) REFERENCES `vehicletype` (`id`),
  CONSTRAINT `emissioncategory_ibfk_2` FOREIGN KEY (`fueltypeid`) REFERENCES `fueltype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emissioncategory`
--

LOCK TABLES `emissioncategory` WRITE;
/*!40000 ALTER TABLE `emissioncategory` DISABLE KEYS */;
INSERT INTO `emissioncategory` VALUES (1,1,1,'Car-Petrol','Car-Petrol',NULL,179.94,'Car-Petrol',1,100,1,NULL,NULL,NULL,NULL),(2,1,2,'Car-Diesel','Car-Diesel',NULL,173.58,'Car-Diesel',1,100,1,NULL,NULL,NULL,NULL),(3,2,1,'Bike-Petrol','Bike-Petrol',NULL,39.04,'Bike-Petrol',1,100,1,NULL,NULL,NULL,NULL),(4,2,2,'Bike-Diesel','Bike-Diesel',NULL,NULL,'Bike-Diesel',1,100,1,NULL,NULL,NULL,NULL),(5,1,3,'Car-Hybrid','Car-Hybrid',NULL,125.96,'Car-Hybrid',1,500,1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `emissioncategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fueltype`
--

DROP TABLE IF EXISTS `fueltype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fueltype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `displayname` varchar(255) DEFAULT NULL,
  `enumname` varchar(255) DEFAULT NULL,
  `displayinlist` tinyint(1) DEFAULT NULL,
  `roworder` int DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `createdby` int DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `modifiedby` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fueltype`
--

LOCK TABLES `fueltype` WRITE;
/*!40000 ALTER TABLE `fueltype` DISABLE KEYS */;
INSERT INTO `fueltype` VALUES (1,'Petrol','Petrol','Petrol',1,100,1,NULL,NULL,NULL,NULL),(2,'Diesel','Diesel','Diesel',1,200,1,NULL,NULL,NULL,NULL),(3,'Hybrid','Hybrid','Hybrid',1,300,1,NULL,NULL,NULL,NULL),(4,'Gasoline','Gasoline','Gasoline',1,0,1,'2026-07-02 12:29:11',NULL,'2026-07-02 12:29:11',NULL),(5,'-','-','-',1,0,1,'2026-07-09 10:50:51',NULL,'2026-07-09 10:50:51',NULL);
/*!40000 ALTER TABLE `fueltype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `ivkey` varchar(255) DEFAULT NULL,
  `userroleid` int DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `createdby` int DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `modifiedby` int DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userroleid` (`userroleid`),
  CONSTRAINT `login_ibfk_1` FOREIGN KEY (`userroleid`) REFERENCES `userrole` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=594 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (591,'a@gmail.com','7650F46A34471839305F7FCD75D6E6A3','3AB16E2DD5C8FAB5C15B2A04EE4FEAE814DBDD6199E3C62F0FD39DE15F8F4DA6','CA885CF2313A44F7FBAF662A144C42EC',2,1,'2026-07-02 12:29:11',0,'2026-07-02 12:29:11',0,0),(592,'devhassan26@gmail.com','F803991C141BA3FAD05071213C750A25','627C79C924ED9972CE0A424C142ACF1247C2C2DF5E0F5CE93EBD05817B4049AE','75FA9887F354FD19275548055761F614',2,1,'2026-07-02 13:29:12',0,'2026-07-02 13:29:12',0,0),(593,'starzero@co.in','93ECED056B6B3ED592A42484345094EF','14FED1FDCF69BBF699C11D5E7106E5BDBC425C73C28EB9605DA78210C4BBCFBE','F462319B712EC5B424BF7852D28C277C',2,1,'2026-07-09 10:50:51',0,'2026-07-09 10:50:51',0,0);
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentdetails`
--

DROP TABLE IF EXISTS `paymentdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paymentdetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `loginid` int DEFAULT NULL,
  `userplanid` int DEFAULT NULL,
  `statusid` int DEFAULT NULL,
  `paymentorderid` varchar(55) DEFAULT NULL,
  `transactionid` varchar(55) DEFAULT NULL,
  `amount` decimal(10,0) DEFAULT NULL,
  `failedresponse` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `createdby` int DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `modifiedby` int DEFAULT NULL,
  `CCType` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `loginid` (`loginid`),
  KEY `userplanid` (`userplanid`),
  CONSTRAINT `paymentdetails_ibfk_1` FOREIGN KEY (`loginid`) REFERENCES `login` (`id`),
  CONSTRAINT `paymentdetails_ibfk_2` FOREIGN KEY (`userplanid`) REFERENCES `userplan` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=247 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentdetails`
--

LOCK TABLES `paymentdetails` WRITE;
/*!40000 ALTER TABLE `paymentdetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `paymentdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pendingemail`
--

DROP TABLE IF EXISTS `pendingemail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pendingemail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `emailTemplateid` int DEFAULT NULL,
  `isprocessed` tinyint(1) DEFAULT NULL,
  `parms` varchar(1000) DEFAULT NULL,
  `emailto` varchar(500) DEFAULT NULL,
  `emailfrom` varchar(100) DEFAULT NULL,
  `attachment` varchar(1000) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `createdby` int DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `modifiedby` int DEFAULT NULL,
  `retrycount` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `emailTemplateid` (`emailTemplateid`),
  CONSTRAINT `pendingemail_ibfk_1` FOREIGN KEY (`emailTemplateid`) REFERENCES `emailtemplate` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pendingemail`
--

LOCK TABLES `pendingemail` WRITE;
/*!40000 ALTER TABLE `pendingemail` DISABLE KEYS */;
/*!40000 ALTER TABLE `pendingemail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personaldetail`
--

DROP TABLE IF EXISTS `personaldetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personaldetail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `loginid` int DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobilenumber` varchar(25) DEFAULT NULL,
  `countryid` int DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `postalcode` varchar(20) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `createdby` int DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `modifiedby` int DEFAULT NULL,
  `profileimage` varchar(155) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `countryid` (`countryid`),
  KEY `loginid` (`loginid`),
  CONSTRAINT `personaldetail_ibfk_2` FOREIGN KEY (`loginid`) REFERENCES `login` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=572 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personaldetail`
--

LOCK TABLES `personaldetail` WRITE;
/*!40000 ALTER TABLE `personaldetail` DISABLE KEYS */;
INSERT INTO `personaldetail` VALUES (569,591,'a','a','a@gmail.com','2323232323',0,'','',1,'2026-07-02 12:29:11',0,'2026-07-02 12:29:11',0,NULL,0),(570,592,'Dev','Hassan','devhassan26@gmail.com','347354744',0,'','',1,'2026-07-02 13:29:12',0,'2026-07-02 13:29:12',0,NULL,0),(571,593,'Ram','Gupta','starzero@co.in','9347324009',0,'','',1,'2026-07-09 10:50:51',0,'2026-07-09 10:50:51',0,NULL,0);
/*!40000 ALTER TABLE `personaldetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `planreading`
--

DROP TABLE IF EXISTS `planreading`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `planreading` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userplanid` int DEFAULT NULL,
  `entrydate` datetime DEFAULT NULL,
  `reading` decimal(16,2) DEFAULT NULL,
  `distance` decimal(16,2) DEFAULT NULL,
  `co2emission` decimal(16,2) DEFAULT NULL,
  `readingimagepath` varchar(255) DEFAULT NULL,
  `roworder` int DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `createdby` int DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `modifiedby` int DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `imagename` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userplanid` (`userplanid`),
  CONSTRAINT `planreading_ibfk_1` FOREIGN KEY (`userplanid`) REFERENCES `userplan` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=421 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planreading`
--

LOCK TABLES `planreading` WRITE;
/*!40000 ALTER TABLE `planreading` DISABLE KEYS */;
/*!40000 ALTER TABLE `planreading` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plans`
--

DROP TABLE IF EXISTS `plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plans` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vehicletypeid` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `displayname` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `treecount` int DEFAULT NULL,
  `enumname` varchar(255) DEFAULT NULL,
  `amount` decimal(16,2) DEFAULT NULL,
  `currency` varchar(3) DEFAULT 'USD',
  `currencysymbol` varchar(5) DEFAULT '$',
  `ismostpopular` tinyint(1) DEFAULT NULL,
  `displayinlist` tinyint(1) DEFAULT NULL,
  `roworder` int DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `createdby` int DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `modifiedby` int DEFAULT NULL,
  `TreeFrequency` mediumtext,
  `TreesToPlant` mediumtext,
  `FinaltreeCount` mediumtext,
  `co2limit` int DEFAULT NULL,
  `PlanTypeId` int DEFAULT NULL,
  `PlanDurationId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `vehicletypeid` (`vehicletypeid`),
  CONSTRAINT `plans_ibfk_1` FOREIGN KEY (`vehicletypeid`) REFERENCES `vehicletype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plans`
--

LOCK TABLES `plans` WRITE;
/*!40000 ALTER TABLE `plans` DISABLE KEYS */;
INSERT INTO `plans` VALUES (1,1,'Breeze Basic','Breeze Basic','First Step – Track, Assess, Offset;;1 Metric Tonne of Carbon Neutral;;15 trees funded;;Selected best of Climate projects for Carbon credits  & Certification;;Individual & Business;;IRS compliant mileage reporting (Form 2106 & Schedule C)',15,'Breeze Basic',4.00,'USD','$',0,1,100,1,NULL,NULL,NULL,NULL,'100000','1','6',1000000,NULL,NULL),(2,1,'Windy Essential','Windy Essential','Track, Assess, Offset;;3 Metric Tonne of Carbon Neutral;;45 trees funded;;Selected best of Climate projects for Carbon credits  & Certification;;Individual & Business;;IRS compliant mileage reporting (Form 2106 & Schedule C)',45,'Windy Essential',8.00,'USD','$',1,1,100,1,NULL,NULL,NULL,NULL,'250000','3','12',3000000,NULL,NULL),(3,1,'Aero Supreme','Aero Supreme','Track, Assess, Offset;;6 Metric Tonne of Carbon Neutral;;90 trees funded;;Selected best of Climate projects for Carbon credits  & Certification;;Individual & Business;;IRS compliant mileage reporting (Form 2106 & Schedule C)',90,'Aero Supreme',12.00,'USD','$',0,1,100,1,NULL,NULL,NULL,NULL,'500000','9','14',6000000,NULL,NULL),(4,2,'Breeze Basic','Breeze Basic','First Step – Track, Assess, Offset;;1 Metric Tonne of Carbon Neutral;;15 trees funded;;Selected best of Climate projects for Carbon credits  & Certification;;Individual & Business;;IRS compliant mileage reporting (Form 2106 & Schedule C)',15,'Breeze Basic',3.00,'USD','$',0,1,100,1,NULL,NULL,NULL,NULL,'100000','1','6',500000,NULL,NULL),(5,2,'Windy Essential','Windy Essential','Track, Assess, Offset;;3 Metric Tonne of Carbon Neutral;;45 trees funded;;Selected best of Climate projects for Carbon credits  & Certification;;Individual & Business;;IRS compliant mileage reporting (Form 2106 & Schedule C)',45,'Windy Essential',6.00,'USD','$',1,1,100,1,NULL,NULL,NULL,NULL,'250000','3','12',1000000,NULL,NULL),(6,2,'Aero Supreme','Aero Supreme','Track, Assess, Offset;;6 Metric Tonne of Carbon Neutral;;90 trees funded;;Selected best of Climate projects for Carbon credits  & Certification;;Individual & Business;;IRS compliant mileage reporting (Form 2106 & Schedule C)',90,'Aero Supreme',10.00,'USD','$',0,1,100,1,NULL,NULL,NULL,NULL,'500000','9','14',3000000,NULL,NULL);
/*!40000 ALTER TABLE `plans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sentemail`
--

DROP TABLE IF EXISTS `sentemail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sentemail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pendingemailid` int DEFAULT NULL,
  `emailtemplateid` int DEFAULT NULL,
  `emailsubject` varchar(1000) DEFAULT NULL,
  `emailbody` varchar(5000) DEFAULT NULL,
  `toaddress` varchar(255) DEFAULT NULL,
  `fromaddress` varchar(128) DEFAULT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `createdby` int DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `modifiedby` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `emailtemplateid` (`emailtemplateid`),
  KEY `pendingemailid` (`pendingemailid`),
  CONSTRAINT `sentemail_ibfk_1` FOREIGN KEY (`emailtemplateid`) REFERENCES `emailtemplate` (`id`),
  CONSTRAINT `sentemail_ibfk_2` FOREIGN KEY (`pendingemailid`) REFERENCES `pendingemail` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sentemail`
--

LOCK TABLES `sentemail` WRITE;
/*!40000 ALTER TABLE `sentemail` DISABLE KEYS */;
/*!40000 ALTER TABLE `sentemail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `entitytype` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `displayname` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `enumname` varchar(255) DEFAULT NULL,
  `displayinlist` tinyint(1) DEFAULT NULL,
  `roworder` int DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `createdby` int DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `modifiedby` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Plan','Pending','Pending',NULL,'Pending',1,100,1,NULL,NULL,NULL,NULL),(2,'Plan','Active Plan','Active Plan',NULL,'Active Plan',1,200,1,NULL,NULL,NULL,NULL),(3,'Plan','Cancelled','Cancelled',NULL,'Cancelled',1,300,1,NULL,NULL,NULL,NULL),(4,'Payment','Payment Completed','Payment Completed',NULL,'Payment Completed',1,100,1,NULL,NULL,NULL,NULL),(5,'Payment','Payment InProgress','Payment InProgress',NULL,'Payment InProgress',1,100,1,NULL,NULL,NULL,NULL),(6,'Payment','Payment Failed','Payment Failed',NULL,'Payment Failed',1,100,1,NULL,NULL,NULL,NULL),(7,'Payment','Payment Cancelled','Payment Cancelled',NULL,'Payment Cancelled',1,100,1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treetype`
--

DROP TABLE IF EXISTS `treetype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `treetype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `displayname` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `enumname` varchar(255) DEFAULT NULL,
  `displayinlist` tinyint(1) DEFAULT NULL,
  `roworder` int DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `createdby` int DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `modifiedby` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treetype`
--

LOCK TABLES `treetype` WRITE;
/*!40000 ALTER TABLE `treetype` DISABLE KEYS */;
/*!40000 ALTER TABLE `treetype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userplan`
--

DROP TABLE IF EXISTS `userplan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userplan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uservehicleid` int DEFAULT NULL,
  `planid` int DEFAULT NULL,
  `statusid` int DEFAULT NULL,
  `purchasedate` datetime DEFAULT NULL,
  `treelimit` int DEFAULT NULL,
  `planamount` decimal(16,2) DEFAULT NULL,
  `maximumemission` decimal(16,2) DEFAULT NULL,
  `currentemission` decimal(16,2) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `createdby` int DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `modifiedby` int DEFAULT NULL,
  `startingreading` decimal(16,2) DEFAULT NULL,
  `isnewvehicle` tinyint(1) DEFAULT NULL,
  `IsCopy` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `uservehicleid` (`uservehicleid`),
  KEY `planid` (`planid`),
  CONSTRAINT `userplan_ibfk_1` FOREIGN KEY (`uservehicleid`) REFERENCES `uservehicle` (`id`),
  CONSTRAINT `userplan_ibfk_2` FOREIGN KEY (`planid`) REFERENCES `plans` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=571 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userplan`
--

LOCK TABLES `userplan` WRITE;
/*!40000 ALTER TABLE `userplan` DISABLE KEYS */;
INSERT INTO `userplan` VALUES (568,569,1,1,'2026-07-02 12:29:11',15,4.00,1000000.00,0.00,1,'2026-07-02 12:29:11',0,'2026-07-02 12:29:11',0,0.00,1,0),(569,570,1,1,'2026-07-02 13:28:32',15,4.00,1000000.00,0.00,1,'2026-07-02 13:29:12',0,'2026-07-02 13:29:12',0,0.00,1,0),(570,571,2,1,'2026-07-09 10:50:51',45,8.00,3000000.00,0.00,1,'2026-07-09 10:50:51',0,'2026-07-09 10:50:51',0,0.00,1,0);
/*!40000 ALTER TABLE `userplan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userplantask`
--

DROP TABLE IF EXISTS `userplantask`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userplantask` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userplanid` int DEFAULT NULL,
  `userreadingid` int DEFAULT NULL,
  `treecount` int DEFAULT NULL,
  `plantedcount` int DEFAULT NULL,
  `assignedto` int DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `createdby` int DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `modifiedby` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userplanid` (`userplanid`),
  KEY `userreadingid` (`userreadingid`),
  CONSTRAINT `userplantask_ibfk_1` FOREIGN KEY (`userplanid`) REFERENCES `userplan` (`id`),
  CONSTRAINT `userplantask_ibfk_2` FOREIGN KEY (`userreadingid`) REFERENCES `planreading` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userplantask`
--

LOCK TABLES `userplantask` WRITE;
/*!40000 ALTER TABLE `userplantask` DISABLE KEYS */;
/*!40000 ALTER TABLE `userplantask` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userplantree`
--

DROP TABLE IF EXISTS `userplantree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userplantree` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userplanid` int DEFAULT NULL,
  `userplantaskid` int DEFAULT NULL,
  `treetypeid` int DEFAULT NULL,
  `geolocation` varchar(255) DEFAULT NULL,
  `planteddate` datetime DEFAULT NULL,
  `plantedby` int DEFAULT NULL,
  `roworder` int DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `createdby` int DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `modifiedby` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userplanid` (`userplanid`),
  KEY `userplantaskid` (`userplantaskid`),
  KEY `treetypeid` (`treetypeid`),
  CONSTRAINT `userplantree_ibfk_1` FOREIGN KEY (`userplanid`) REFERENCES `userplan` (`id`),
  CONSTRAINT `userplantree_ibfk_2` FOREIGN KEY (`userplantaskid`) REFERENCES `userplantask` (`id`),
  CONSTRAINT `userplantree_ibfk_3` FOREIGN KEY (`treetypeid`) REFERENCES `treetype` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userplantree`
--

LOCK TABLES `userplantree` WRITE;
/*!40000 ALTER TABLE `userplantree` DISABLE KEYS */;
/*!40000 ALTER TABLE `userplantree` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userrole`
--

DROP TABLE IF EXISTS `userrole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userrole` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `displayname` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `enumname` varchar(255) DEFAULT NULL,
  `displayinlist` tinyint(1) DEFAULT NULL,
  `roworder` int DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `createdby` int DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `modifiedby` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userrole`
--

LOCK TABLES `userrole` WRITE;
/*!40000 ALTER TABLE `userrole` DISABLE KEYS */;
INSERT INTO `userrole` VALUES (1,'Admin','Admin',NULL,'Admin',1,100,1,NULL,NULL,NULL,NULL),(2,'Public','Public',NULL,'Public',1,200,1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `userrole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uservehicle`
--

DROP TABLE IF EXISTS `uservehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `uservehicle` (
  `id` int NOT NULL AUTO_INCREMENT,
  `loginid` int DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `registrationnumber` varchar(255) DEFAULT NULL,
  `registrationdate` varchar(25) DEFAULT NULL,
  `co2emission` decimal(16,2) DEFAULT NULL,
  `vehicletypeid` int DEFAULT NULL,
  `brandvariantid` int DEFAULT NULL,
  `fueltypeid` int DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `createdby` int DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `modifiedby` int DEFAULT NULL,
  `CCType` varchar(50) DEFAULT NULL,
  `RateId` int DEFAULT NULL,
  `RateName` varchar(100) DEFAULT NULL,
  `RateValue` decimal(10,2) DEFAULT NULL,
  `IsDefault` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `loginid` (`loginid`),
  KEY `vehicletypeid` (`vehicletypeid`),
  KEY `brandvariantid` (`brandvariantid`),
  KEY `fueltypeid` (`fueltypeid`),
  CONSTRAINT `uservehicle_ibfk_1` FOREIGN KEY (`loginid`) REFERENCES `login` (`id`),
  CONSTRAINT `uservehicle_ibfk_2` FOREIGN KEY (`vehicletypeid`) REFERENCES `vehicletype` (`id`),
  CONSTRAINT `uservehicle_ibfk_3` FOREIGN KEY (`brandvariantid`) REFERENCES `brandvariant` (`id`),
  CONSTRAINT `uservehicle_ibfk_4` FOREIGN KEY (`fueltypeid`) REFERENCES `fueltype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=572 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uservehicle`
--

LOCK TABLES `uservehicle` WRITE;
/*!40000 ALTER TABLE `uservehicle` DISABLE KEYS */;
INSERT INTO `uservehicle` VALUES (569,591,'a','a','4T1SK12E6RU850363','1970-01-01 00:00:00',249.70,1,1449,4,1,'2026-07-02 12:29:11',0,'2026-07-02 12:29:11',0,'2200',3,'No',0.00,1),(570,592,'Dev','Hassan','1HGCR2F85HA123456','1970-01-01 00:00:00',176.00,1,1450,4,1,'2026-07-02 13:29:12',0,'2026-07-02 13:29:12',0,'2356',1,'Standard',0.73,1),(571,593,'Ramya','Gupta','MBHJWC13SRH823946','1970-01-01 00:00:00',100.00,1,1451,5,1,'2026-07-09 10:50:51',0,'2026-07-09 10:50:51',0,'0',1,'Standard',0.73,1);
/*!40000 ALTER TABLE `uservehicle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicletype`
--

DROP TABLE IF EXISTS `vehicletype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicletype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `displayname` varchar(255) DEFAULT NULL,
  `enumname` varchar(255) DEFAULT NULL,
  `displayinlist` tinyint(1) DEFAULT NULL,
  `roworder` int DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `createdby` int DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `modifiedby` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicletype`
--

LOCK TABLES `vehicletype` WRITE;
/*!40000 ALTER TABLE `vehicletype` DISABLE KEYS */;
INSERT INTO `vehicletype` VALUES (1,'Car','Car','Car',1,100,1,NULL,NULL,NULL,NULL),(2,'Bike','Bike','Bike',1,200,1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `vehicletype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vw_brandvariant`
--

DROP TABLE IF EXISTS `vw_brandvariant`;
/*!50001 DROP VIEW IF EXISTS `vw_brandvariant`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_brandvariant` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `displayname`,
 1 AS `enumname`,
 1 AS `active`,
 1 AS `displayinlist`,
 1 AS `brandseriesid`,
 1 AS `brandseriesname`,
 1 AS `brandseriesenumname`,
 1 AS `brandid`,
 1 AS `brandname`,
 1 AS `brandenumname`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vw_logindetail`
--

DROP TABLE IF EXISTS `vw_logindetail`;
/*!50001 DROP VIEW IF EXISTS `vw_logindetail`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_logindetail` AS SELECT 
 1 AS `id`,
 1 AS `username`,
 1 AS `password`,
 1 AS `salt`,
 1 AS `ivkey`,
 1 AS `userroleid`,
 1 AS `created`,
 1 AS `createdby`,
 1 AS `modified`,
 1 AS `modifiedby`,
 1 AS `active`,
 1 AS `is_admin`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vw_personaldetaillist`
--

DROP TABLE IF EXISTS `vw_personaldetaillist`;
/*!50001 DROP VIEW IF EXISTS `vw_personaldetaillist`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_personaldetaillist` AS SELECT 
 1 AS `id`,
 1 AS `loginid`,
 1 AS `firstname`,
 1 AS `lastname`,
 1 AS `email`,
 1 AS `mobilenumber`,
 1 AS `countryid`,
 1 AS `address`,
 1 AS `postalcode`,
 1 AS `active`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vw_userplan`
--

DROP TABLE IF EXISTS `vw_userplan`;
/*!50001 DROP VIEW IF EXISTS `vw_userplan`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_userplan` AS SELECT 
 1 AS `id`,
 1 AS `planid`,
 1 AS `uservehicleid`,
 1 AS `statusId`,
 1 AS `purchasedate`,
 1 AS `treelimit`,
 1 AS `planamount`,
 1 AS `Maximumemission`,
 1 AS `CurrentEmission`,
 1 AS `StatusName`,
 1 AS `PlanName`,
 1 AS `PlanDescription`,
 1 AS `loginid`,
 1 AS `isnewvehicle`,
 1 AS `startingreading`,
 1 AS `IsCopy`,
 1 AS `created`,
 1 AS `createdby`,
 1 AS `modified`,
 1 AS `modifiedby`,
 1 AS `active`,
 1 AS `vehicletypeid`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vw_uservehicle`
--

DROP TABLE IF EXISTS `vw_uservehicle`;
/*!50001 DROP VIEW IF EXISTS `vw_uservehicle`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_uservehicle` AS SELECT 
 1 AS `id`,
 1 AS `loginid`,
 1 AS `firstname`,
 1 AS `lastname`,
 1 AS `registrationdate`,
 1 AS `registrationnumber`,
 1 AS `co2emission`,
 1 AS `vehicletypeid`,
 1 AS `brandvariantid`,
 1 AS `fueltypeid`,
 1 AS `fueltypename`,
 1 AS `vehicletypename`,
 1 AS `brandvariantname`,
 1 AS `brandseriesname`,
 1 AS `brandname`,
 1 AS `brandseriesid`,
 1 AS `brandid`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'starzerousa'
--

--
-- Dumping routines for database 'starzerousa'
--
/*!50003 DROP PROCEDURE IF EXISTS `SP_getplandashboard` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_getplandashboard`(loginId INT)
BEGIN
	  SELECT
        up.Id,
        up.currentemission,
        up.purchasedate,
        up.statusid,
        up.startingreading,
        uv.loginid,
        uv.brandname,
        uv.brandseriesname,
        uv.brandvariantname,
        uv.vehicletypename,
        p.name as planname,
        p.description as plandescription,
        (Select co2emission from planreading where userplanid = up.id order by id desc limit 1) as lastemission,
        (Select startingreading from userplan where uservehicleid = uv.Id order by id desc limit 1) as lastreading
    FROM starzerousa.userplan up
    INNER JOIN starzerousa.vw_uservehicle uv on uv.Id = up.uservehicleid
    INNER JOIN starzerousa.plans p on p.id = up.planid
    WHERE up.active = 1 and uv.loginid = loginId  ORDER BY up.Id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_PersonDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_PersonDetails`(paramloginid int)
BEGIN
	BEGIN
		SELECT id,
				username, 
				password,
				salt,
				ivkey,
				userroleid 
		FROM vw_logindetail WHERE id = paramloginid;
    END;
    BEGIN
		SELECT id,
				loginid,
				firstname,
				lastname,
				email,
				mobilenumber,
				countryid,
				address,
				postalcode 
		FROM vw_personaldetaillist WHERE loginid = paramloginid;
    END;
    BEGIN    
		SELECT id,
				loginid,
				firstname,
				lastname,
				registrationdate,
				registrationnumber,
				co2emission,
				vehicletypeid,
				brandvariantid,
				fueltypeid,
				fueltypename,
				vehicletypename as vehicletype,
				brandvariantname,
				brandseriesname,
				brandname,
				brandseriesid,
				brandid
		 FROM vw_uservehicle WHERE loginId = paramloginid;
     END;
    BEGIN
		SELECT id, 
				planid,
				uservehicleid,
				statusId,
				purchasedate,
				treelimit,
				planamount,
				Maximumemission,
				CurrentEmission,
				StatusName,
				loginid, 
                planname,
                plandescription,
                startingreading,
				isnewvehicle
		FROM vw_userplan WHERE loginid = paramloginid;
     END;    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `vw_brandvariant`
--

/*!50001 DROP VIEW IF EXISTS `vw_brandvariant`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_brandvariant` AS select `bv`.`id` AS `id`,`bv`.`name` AS `name`,`bv`.`displayname` AS `displayname`,`bv`.`enumname` AS `enumname`,`bv`.`active` AS `active`,`bv`.`displayinlist` AS `displayinlist`,`bv`.`brandseriesid` AS `brandseriesid`,`bs`.`name` AS `brandseriesname`,`bs`.`enumname` AS `brandseriesenumname`,`bs`.`brandid` AS `brandid`,`b`.`name` AS `brandname`,`b`.`enumname` AS `brandenumname` from ((`brandvariant` `bv` join `brandseries` `bs` on((`bs`.`id` = `bv`.`brandseriesid`))) join `brand` `b` on((`b`.`id` = `bs`.`brandid`))) where ((`bv`.`active` = 1) and (`bs`.`active` = 1) and (`b`.`active` = 1)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_logindetail`
--

/*!50001 DROP VIEW IF EXISTS `vw_logindetail`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_logindetail` AS select `l`.`id` AS `id`,`l`.`username` AS `username`,`l`.`password` AS `password`,`l`.`salt` AS `salt`,`l`.`ivkey` AS `ivkey`,`l`.`userroleid` AS `userroleid`,`l`.`created` AS `created`,`l`.`createdby` AS `createdby`,`l`.`modified` AS `modified`,`l`.`modifiedby` AS `modifiedby`,`l`.`active` AS `active`,`l`.`is_admin` AS `is_admin` from `login` `l` where (`l`.`active` = 1) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_personaldetaillist`
--

/*!50001 DROP VIEW IF EXISTS `vw_personaldetaillist`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_personaldetaillist` AS select `personaldetail`.`id` AS `id`,`personaldetail`.`loginid` AS `loginid`,`personaldetail`.`firstname` AS `firstname`,`personaldetail`.`lastname` AS `lastname`,`personaldetail`.`email` AS `email`,`personaldetail`.`mobilenumber` AS `mobilenumber`,`personaldetail`.`countryid` AS `countryid`,`personaldetail`.`address` AS `address`,`personaldetail`.`postalcode` AS `postalcode`,`personaldetail`.`active` AS `active` from `personaldetail` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_userplan`
--

/*!50001 DROP VIEW IF EXISTS `vw_userplan`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_userplan` AS select `up`.`id` AS `id`,`up`.`planid` AS `planid`,`up`.`uservehicleid` AS `uservehicleid`,`up`.`statusid` AS `statusId`,`up`.`purchasedate` AS `purchasedate`,`up`.`treelimit` AS `treelimit`,`up`.`planamount` AS `planamount`,`up`.`maximumemission` AS `Maximumemission`,`up`.`currentemission` AS `CurrentEmission`,`s`.`displayname` AS `StatusName`,`pl`.`name` AS `PlanName`,`pl`.`description` AS `PlanDescription`,`uv`.`loginid` AS `loginid`,`up`.`isnewvehicle` AS `isnewvehicle`,`up`.`startingreading` AS `startingreading`,`up`.`IsCopy` AS `IsCopy`,`up`.`created` AS `created`,`up`.`createdby` AS `createdby`,`up`.`modified` AS `modified`,`up`.`modifiedby` AS `modifiedby`,`up`.`active` AS `active`,`uv`.`vehicletypeid` AS `vehicletypeid` from (((`userplan` `up` join `plans` `pl` on(((`pl`.`id` = `up`.`planid`) and (`pl`.`active` = 1)))) join `uservehicle` `uv` on(((`uv`.`id` = `up`.`uservehicleid`) and (`uv`.`active` = 1)))) join `status` `s` on(((`s`.`id` = `up`.`statusid`) and (`s`.`active` = 1)))) where (`up`.`active` = 1) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_uservehicle`
--

/*!50001 DROP VIEW IF EXISTS `vw_uservehicle`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_uservehicle` AS select `uv`.`id` AS `id`,`uv`.`loginid` AS `loginid`,`uv`.`firstname` AS `firstname`,`uv`.`lastname` AS `lastname`,`uv`.`registrationdate` AS `registrationdate`,`uv`.`registrationnumber` AS `registrationnumber`,`uv`.`co2emission` AS `co2emission`,`uv`.`vehicletypeid` AS `vehicletypeid`,`uv`.`brandvariantid` AS `brandvariantid`,`uv`.`fueltypeid` AS `fueltypeid`,`ft`.`name` AS `fueltypename`,`vt`.`name` AS `vehicletypename`,`bv`.`name` AS `brandvariantname`,`bv`.`brandseriesname` AS `brandseriesname`,`bv`.`brandname` AS `brandname`,`bv`.`brandseriesid` AS `brandseriesid`,`bv`.`brandid` AS `brandid` from (((`uservehicle` `uv` join `fueltype` `ft` on((`ft`.`id` = `uv`.`fueltypeid`))) join `vehicletype` `vt` on((`vt`.`id` = `uv`.`vehicletypeid`))) join `vw_brandvariant` `bv` on((`bv`.`id` = `uv`.`brandvariantid`))) where (`uv`.`active` = 1) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-13  6:35:32
