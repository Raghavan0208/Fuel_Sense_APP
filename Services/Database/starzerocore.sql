CREATE DATABASE  IF NOT EXISTS `starzerocore` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `starzerocore`;
-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: starzerocore
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
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `id` int NOT NULL AUTO_INCREMENT,
  `countrycode` varchar(255) DEFAULT NULL,
  `address1` varchar(255) DEFAULT NULL,
  `address2` varchar(255) DEFAULT NULL,
  `cityname` varchar(255) DEFAULT NULL,
  `statename` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `contactnumber1` varchar(255) DEFAULT NULL,
  `contactnumber2` varchar(255) DEFAULT NULL,
  `roworder` int DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `createdby` int DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `modifiedby` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'default','Smartzero Technologies And Services Private Limited\nRegus Office Centre Service (Chennai) Pvt Ltd Spaces\nOlympia','Main Road','Chennai','TamilNadu','India','222 032','33 6145 9004','44 6145 1234',100,1,NULL,NULL,NULL,NULL),(2,'IN','Smartzero Technologies And Services Private Limited\nRegus Office Centre Service (Chennai) Pvt Ltd Spaces\nOlympia','Olympia Technology Park,9 th floor, Citius\nBlock, 1-SIDCO Industrial Estate,Guindy','Chennai','TamilNadu','India','600 032','44 6145 9004','44 6145 1234',100,1,NULL,NULL,NULL,NULL),(3,'UK','SMARTZero Technologies and Services UK limited ','86-90 Paul Street','London','London','United Kingdom','EC2A 4NE','','',100,1,NULL,NULL,NULL,NULL),(4,'USA','SMARTZero Inc.','115 West 27th Street','New York','New York','United States','NY 10001','','',100,1,NULL,NULL,NULL,NULL),(5,'Canada','SMARTZero Canada Inc.','20 Bay Street, Suite 1100','Toronto','Ontario','Canada','M5J 2N8','','',100,1,NULL,NULL,NULL,NULL),(6,'FrenchCanada','SMARTZero Canada Inc.','1000 Rue De La Gauchetière Ouest, Suite 2400','Montreal','Quebec','Canada','H3B 4W5','','',100,1,NULL,NULL,NULL,NULL),(7,'Australia','SMARTZero Australia Pty Ltd','Level 5, 1 Castlereagh Street','Sydney','New South Wales','Australia','NSW 2000','','',100,1,NULL,NULL,NULL,NULL),(8,'International','SMARTZero International','c/o Smartzero Technologies And Services Private Limited\nOlympia Technology Park','Chennai','TamilNadu','India','600 032','','',100,1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blogs`
--

DROP TABLE IF EXISTS `blogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `countrycode` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `enumname` varchar(255) DEFAULT NULL,
  `displayname` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `displayinlist` tinyint(1) DEFAULT NULL,
  `roworder` int DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `createdby` int DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `modifiedby` int DEFAULT NULL,
  `imagename` varchar(255) DEFAULT NULL,
  `blogurl` varchar(255) DEFAULT NULL,
  `blogslink` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs`
--

LOCK TABLES `blogs` WRITE;
/*!40000 ALTER TABLE `blogs` DISABLE KEYS */;
INSERT INTO `blogs` VALUES (1,'IN','Climate Change and Paris Alignment: “The Climate is Changing, and So Are We”','blog1','Climate Change and Paris Alignment: “The Climate is Changing, and So Are We”','Our upcoming Spring Meetings will focus on Reshaping Development for a New Era – this is an excellent ..',1,100,1,NULL,NULL,NULL,NULL,'climate_change_paris','blogs.worldbank.org','https://blogs.worldbank.org/voices/climate-change-and-paris-alignment-climate-changing-and-so-are-we'),(2,'IN','India: Climate Change Impacts','blog2','India: Climate Change Impacts','To better understand the risks of climate change to development, the World Bank Group commissioned the Potsdam Institute for Climate Impact..',1,200,1,NULL,NULL,NULL,NULL,'climate_change_india','blogs.worldbank.org','https://www.worldbank.org/en/news/feature/2013/06/19/india-climate-change-impacts'),(3,'IN','Climate Change and Environmental Sustainability','blog3','Climate Change and Environmental Sustainability','UNICEF estimates that by 2040, almost 600 million children globally are projected to be living in areas of extremely high-water stress',1,300,1,NULL,NULL,NULL,NULL,'climate_change_environment','blogs.worldbank.org','https://www.unicef.org/india/what-we-do/climate-change'),(4,'IN','22.5 MW wind power project in Rajasthan, India – Lowering Co2 emissions by 45 GWh yearly','blog4','22.5 MW wind power project in Rajasthan, India – Lowering Co2 emissions by 45 GWh yearly','Renewable energy is used to produce clean electricity at the 22.5 MW wind power project in Rajasthan',1,400,1,NULL,NULL,NULL,NULL,'project_in_rajasthan','www.goldstandard.org','https://marketplace.goldstandard.org/collections/projects/products/225-mw-wind-power-project-rajasthan-india'),(5,'IN','Powering 25,500 households with wind Power in Madya Pradesh – Reduced Co2','blog5','Powering 25,500 households with wind Power in Madya Pradesh – Reduced Co2','The 50 MW wind power project in Madhya Pradesh, promoted by Orange Bercha Wind Power Pvt Ltd,',1,500,1,NULL,NULL,NULL,NULL,'project_in_madhya_pradesh','www.goldstandard.org','https://marketplace.goldstandard.org/collections/projects/products/infinite-solutions-50-mw-wind-power-project-in-madhya-pradesh-india'),(6,'UK','Climate Change and Paris Alignment: “The Climate is Changing, and So Are We”','blog1','Climate Change and Paris Alignment: “The Climate is Changing, and So Are We”','Our upcoming Spring Meetings will focus on Reshaping Development for a New Era – this is an excellent ..',1,100,1,NULL,NULL,NULL,NULL,'climate_change_paris','blogs.worldbank.org','https://blogs.worldbank.org/voices/climate-change-and-paris-alignment-climate-changing-and-so-are-we'),(7,'UK','India: Climate Change Impacts','blog2','India: Climate Change Impacts','To better understand the risks of climate change to development, the World Bank Group commissioned the Potsdam Institute for Climate Impact..',1,200,1,NULL,NULL,NULL,NULL,'climate_change_india','blogs.worldbank.org','https://www.worldbank.org/en/news/feature/2013/06/19/india-climate-change-impacts'),(8,'UK','Climate Change and Environmental Sustainability','blog3','Climate Change and Environmental Sustainability','UNICEF estimates that by 2040, almost 600 million children globally are projected to be living in areas of extremely high-water stress',1,300,1,NULL,NULL,NULL,NULL,'climate_change_environment','blogs.worldbank.org','https://www.unicef.org/india/what-we-do/climate-change'),(9,'UK','22.5 MW wind power project in Rajasthan, India – Lowering Co2 emissions by 45 GWh yearly','blog4','22.5 MW wind power project in Rajasthan, India – Lowering Co2 emissions by 45 GWh yearly','Renewable energy is used to produce clean electricity at the 22.5 MW wind power project in Rajasthan',1,400,1,NULL,NULL,NULL,NULL,'project_in_rajasthan','www.goldstandard.org','https://marketplace.goldstandard.org/collections/projects/products/225-mw-wind-power-project-rajasthan-india'),(10,'UK','Powering 25,500 households with wind Power in Madya Pradesh – Reduced Co2','blog5','Powering 25,500 households with wind Power in Madya Pradesh – Reduced Co2','The 50 MW wind power project in Madhya Pradesh, promoted by Orange Bercha Wind Power Pvt Ltd,',1,500,1,NULL,NULL,NULL,NULL,'project_in_madhya_pradesh','www.goldstandard.org','https://marketplace.goldstandard.org/collections/projects/products/infinite-solutions-50-mw-wind-power-project-in-madhya-pradesh-india'),(11,'USA','Climate Change and Paris Alignment: “The Climate is Changing, and So Are We”','blog1','Climate Change and Paris Alignment: “The Climate is Changing, and So Are We”','Our upcoming Spring Meetings will focus on Reshaping Development for a New Era – this is an excellent ..',1,100,1,NULL,NULL,NULL,NULL,'climate_change_paris','blogs.worldbank.org','https://blogs.worldbank.org/voices/climate-change-and-paris-alignment-climate-changing-and-so-are-we'),(12,'USA','India: Climate Change Impacts','blog2','India: Climate Change Impacts','To better understand the risks of climate change to development, the World Bank Group commissioned the Potsdam Institute for Climate Impact..',1,200,1,NULL,NULL,NULL,NULL,'climate_change_india','blogs.worldbank.org','https://www.worldbank.org/en/news/feature/2013/06/19/india-climate-change-impacts'),(13,'USA','Climate Change and Environmental Sustainability','blog3','Climate Change and Environmental Sustainability','UNICEF estimates that by 2040, almost 600 million children globally are projected to be living in areas of extremely high-water stress',1,300,1,NULL,NULL,NULL,NULL,'climate_change_environment','blogs.worldbank.org','https://www.unicef.org/india/what-we-do/climate-change'),(14,'USA','22.5 MW wind power project in Rajasthan, India – Lowering Co2 emissions by 45 GWh yearly','blog4','22.5 MW wind power project in Rajasthan, India – Lowering Co2 emissions by 45 GWh yearly','Renewable energy is used to produce clean electricity at the 22.5 MW wind power project in Rajasthan',1,400,1,NULL,NULL,NULL,NULL,'project_in_rajasthan','www.goldstandard.org','https://marketplace.goldstandard.org/collections/projects/products/225-mw-wind-power-project-rajasthan-india'),(15,'USA','Powering 25,500 households with wind Power in Madya Pradesh – Reduced Co2','blog5','Powering 25,500 households with wind Power in Madya Pradesh – Reduced Co2','The 50 MW wind power project in Madhya Pradesh, promoted by Orange Bercha Wind Power Pvt Ltd,',1,500,1,NULL,NULL,NULL,NULL,'project_in_madhya_pradesh','www.goldstandard.org','https://marketplace.goldstandard.org/collections/projects/products/infinite-solutions-50-mw-wind-power-project-in-madhya-pradesh-india'),(16,'default','Climate Change and Paris Alignment: “The Climate is Changing, and So Are We”','blog1','Climate Change and Paris Alignment: “The Climate is Changing, and So Are We”','Our upcoming Spring Meetings will focus on Reshaping Development for a New Era – this is an excellent ..',1,100,1,NULL,NULL,NULL,NULL,'climate_change_paris','blogs.worldbank.org','https://blogs.worldbank.org/voices/climate-change-and-paris-alignment-climate-changing-and-so-are-we'),(17,'default','India: Climate Change Impacts','blog2','India: Climate Change Impacts','To better understand the risks of climate change to development, the World Bank Group commissioned the Potsdam Institute for Climate Impact..',1,200,1,NULL,NULL,NULL,NULL,'climate_change_india','blogs.worldbank.org','https://www.worldbank.org/en/news/feature/2013/06/19/india-climate-change-impacts'),(18,'default','Climate Change and Environmental Sustainability','blog3','Climate Change and Environmental Sustainability','UNICEF estimates that by 2040, almost 600 million children globally are projected to be living in areas of extremely high-water stress',1,300,1,NULL,NULL,NULL,NULL,'climate_change_environment','blogs.worldbank.org','https://www.unicef.org/india/what-we-do/climate-change'),(19,'default','22.5 MW wind power project in Rajasthan, India – Lowering Co2 emissions by 45 GWh yearly','blog4','22.5 MW wind power project in Rajasthan, India – Lowering Co2 emissions by 45 GWh yearly','Renewable energy is used to produce clean electricity at the 22.5 MW wind power project in Rajasthan',1,400,1,NULL,NULL,NULL,NULL,'project_in_rajasthan','www.goldstandard.org','https://marketplace.goldstandard.org/collections/projects/products/225-mw-wind-power-project-rajasthan-india'),(20,'default','Powering 25,500 households with wind Power in Madya Pradesh – Reduced Co2','blog5','Powering 25,500 households with wind Power in Madya Pradesh – Reduced Co2','The 50 MW wind power project in Madhya Pradesh, promoted by Orange Bercha Wind Power Pvt Ltd,',1,500,1,NULL,NULL,NULL,NULL,'project_in_madhya_pradesh','www.goldstandard.org','https://marketplace.goldstandard.org/collections/projects/products/infinite-solutions-50-mw-wind-power-project-in-madhya-pradesh-india');
/*!40000 ALTER TABLE `blogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carousalbanner`
--

DROP TABLE IF EXISTS `carousalbanner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carousalbanner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `countrycode` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `displayinlist` varchar(255) DEFAULT NULL,
  `thumbnailpath` varchar(255) DEFAULT NULL,
  `roworder` int DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `createdby` int DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `modifiedby` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carousalbanner`
--

LOCK TABLES `carousalbanner` WRITE;
/*!40000 ALTER TABLE `carousalbanner` DISABLE KEYS */;
INSERT INTO `carousalbanner` VALUES (1,'default','Website','Earth for Every Generations','1',NULL,100,1,NULL,NULL,NULL,NULL),(2,'IN','Website','Earth for Every Generations','1',NULL,100,1,NULL,NULL,NULL,NULL),(3,'UK','Website','Earth for Every Generations','1',NULL,100,1,NULL,NULL,NULL,NULL),(4,'USA','Website','Earth for Every Generations','1',NULL,100,1,NULL,NULL,NULL,NULL),(5,'CA','Website','Earth for Every Generations','1',NULL,100,1,NULL,NULL,NULL,NULL),(6,'FRCA','Website','La Terre pour chaque génération','1',NULL,100,1,NULL,NULL,NULL,NULL),(7,'AUS','Website','Earth for Every Generations','1',NULL,100,1,NULL,NULL,NULL,NULL),(8,'INTL','Website','Earth for Every Generations','1',NULL,100,1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `carousalbanner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country` (
  `id` int NOT NULL AUTO_INCREMENT,
  `countrycode` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `enumname` varchar(255) DEFAULT NULL,
  `displayname` varchar(255) DEFAULT NULL,
  `displayinlist` tinyint(1) DEFAULT NULL,
  `roworder` int DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `createdby` int DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `modifiedby` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (1,'','default','default','default',1,100,1,NULL,NULL,NULL,NULL),(2,'IN','IN','IN','IN',1,200,1,NULL,NULL,NULL,NULL),(3,'UK','UK','UK','UK',1,300,1,NULL,NULL,NULL,NULL),(4,'USA','USA','USA','USA',1,400,1,NULL,NULL,NULL,NULL),(5,'Canada','Canada','Canada','Canada',1,500,1,NULL,NULL,NULL,NULL),(6,'FrenchCanada','FrenchCanada','FrenchCanada','French Canada',1,600,1,NULL,NULL,NULL,NULL),(7,'Australia','Australia','Australia','Australia',1,700,1,NULL,NULL,NULL,NULL),(8,'International','International','International','International',1,800,1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'starzerocore'
--

--
-- Dumping routines for database 'starzerocore'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-13  6:31:37
