CREATE DATABASE  IF NOT EXISTS `starzeroin` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `starzeroin`;
-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: starzeroin
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
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES (1,'Audi','Audi','Audi',NULL,NULL,1,NULL,NULL,NULL,NULL,1),(2,'Jeep','Jeep','Jeep',NULL,NULL,1,NULL,NULL,NULL,NULL,1),(3,'TVS','TVS','TVS',NULL,NULL,1,NULL,NULL,NULL,NULL,2),(4,'Bajaj','Bajaj','Bajaj',NULL,NULL,1,NULL,NULL,NULL,NULL,2),(5,'Maruti Suzuki','Maruti Suzuki','Maruti Suzuki',1,NULL,1,NULL,NULL,NULL,NULL,1),(6,'Tata','Tata','Tata',1,NULL,1,NULL,NULL,NULL,NULL,1),(7,'Hyundai','Hyundai','Hyundai',1,NULL,1,NULL,NULL,NULL,NULL,1),(8,'Mahindra','Mahindra','Mahindra',1,NULL,1,NULL,NULL,NULL,NULL,1),(9,'BMW','BMW','BMW',1,NULL,1,NULL,NULL,NULL,NULL,1),(10,'MG','MG','MG',1,NULL,1,NULL,NULL,NULL,NULL,1),(11,'Kia','Kia','Kia',1,NULL,1,NULL,NULL,NULL,NULL,1),(12,'Toyota','Toyota','Toyota',1,NULL,1,NULL,NULL,NULL,NULL,1),(14,'MINI','MINI','MINI',1,NULL,1,NULL,NULL,NULL,NULL,1),(15,'Land Rover','Land Rover','Land Rover',1,NULL,1,NULL,NULL,NULL,NULL,1),(16,'Honda','Honda','Honda',1,NULL,1,NULL,NULL,NULL,NULL,1),(17,'Skoda','Skoda','Skoda',1,NULL,1,NULL,NULL,NULL,NULL,1),(18,'Porsche','Porsche','Porsche',1,NULL,1,NULL,NULL,NULL,NULL,1),(19,'Volvo','Volvo','Volvo',1,NULL,1,NULL,NULL,NULL,NULL,1),(20,'Volkswagen','Volkswagen','Volkswagen',1,NULL,1,NULL,NULL,NULL,NULL,1),(21,'Nissan','Nissan','Nissan',1,NULL,1,NULL,NULL,NULL,NULL,1),(22,'Rolls-Royce','Rolls-Royce','Rolls-Royce',1,NULL,1,NULL,NULL,NULL,NULL,1),(23,'Bentley','Bentley','Bentley',1,NULL,1,NULL,NULL,NULL,NULL,1),(24,'Maserati','Maserati','Maserati',1,NULL,1,NULL,NULL,NULL,NULL,1),(25,'Renault','Renault','Renault',1,NULL,1,NULL,NULL,NULL,NULL,1),(26,'Force Motors','Force Motors','Force Motors',1,NULL,1,NULL,NULL,NULL,NULL,1),(28,'Lamborghini','Lamborghini','Lamborghini',1,NULL,1,NULL,NULL,NULL,NULL,1),(29,'Jaguar','Jaguar','Jaguar',1,NULL,1,NULL,NULL,NULL,NULL,1),(30,'Citroen','Citroen','Citroen',1,NULL,1,NULL,NULL,NULL,NULL,1),(31,'Mercedes-Benz','Mercedes-Benz','Mercedes-Benz',1,NULL,1,NULL,NULL,NULL,NULL,1),(32,'Ferrari','Ferrari','Ferrari',1,NULL,1,NULL,NULL,NULL,NULL,1),(33,'Aston Martin','Aston Martin','Aston Martin',1,NULL,1,NULL,NULL,NULL,NULL,1),(34,'Bugatti','Bugatti','Bugatti',1,NULL,1,NULL,NULL,NULL,NULL,1),(35,'Lexus','Lexus','Lexus',1,NULL,1,NULL,NULL,NULL,NULL,1),(36,'McLaren','McLaren','McLaren',1,NULL,1,NULL,NULL,NULL,NULL,1),(37,'Isuzu','Isuzu','Isuzu',1,NULL,1,NULL,NULL,NULL,NULL,1),(39,'Hero','Hero','Hero',1,NULL,1,NULL,NULL,NULL,NULL,2),(41,'Royal Enfield','Royal Enfield','Royal Enfield',1,NULL,1,NULL,NULL,NULL,NULL,2),(42,'Yamaha','Yamaha','Yamaha',1,NULL,1,NULL,NULL,NULL,NULL,2),(43,'Honda','Honda','Honda',1,NULL,1,NULL,NULL,NULL,NULL,2),(44,'Suzuki','Suzuki','Suzuki',1,NULL,1,NULL,NULL,NULL,NULL,2),(45,'KTM','KTM','KTM',1,NULL,1,NULL,NULL,NULL,NULL,2),(46,'Jawa','Jawa','Jawa',1,NULL,1,NULL,NULL,NULL,NULL,2),(47,'Mahindra','Mahindra','Mahindra',1,NULL,1,NULL,NULL,NULL,NULL,2),(48,'Harley Davidson ','Harley Davidson ','Harley Davidson ',1,NULL,1,NULL,NULL,NULL,NULL,2),(49,'Ducati','Ducati','Ducati',1,NULL,1,NULL,NULL,NULL,NULL,2),(50,'Kawasaki','Kawasaki','Kawasaki',1,NULL,1,NULL,NULL,NULL,NULL,2),(51,'Test','Test','Test',1,0,1,'2023-09-04 11:13:58',NULL,'2023-09-04 11:13:58',NULL,1),(52,'string','string','string',1,0,1,'2023-09-05 06:41:06',NULL,'2023-09-05 06:41:06',NULL,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=386 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brandseries`
--

LOCK TABLES `brandseries` WRITE;
/*!40000 ALTER TABLE `brandseries` DISABLE KEYS */;
INSERT INTO `brandseries` VALUES (1,1,'A4','A4','A4',NULL,NULL,1,NULL,NULL,NULL,NULL),(2,1,'Q3','Q3','Q3',NULL,NULL,1,NULL,NULL,NULL,NULL),(3,2,'Compass','Compass','Compass',NULL,NULL,1,NULL,NULL,NULL,NULL),(4,2,'Meridian','Meridian','Meridian',NULL,NULL,1,NULL,NULL,NULL,NULL),(5,3,'Jupiter 125','Jupiter 125','Jupiter_125',NULL,NULL,1,NULL,NULL,NULL,NULL),(6,3,'Scooty Zest','Scooty Zest','Scooty_Zest',NULL,NULL,1,NULL,NULL,NULL,NULL),(7,4,'Platina 110','Platina 110','Platina_110',NULL,NULL,1,NULL,NULL,NULL,NULL),(8,4,'F250','F250','F250',NULL,NULL,1,NULL,NULL,NULL,NULL),(9,5,'Invicto','Invicto','Invicto',1,NULL,1,NULL,NULL,NULL,NULL),(10,5,'Fronx','Fronx','Fronx',1,NULL,1,NULL,NULL,NULL,NULL),(11,5,'Baleno','Baleno','Baleno',1,NULL,1,NULL,NULL,NULL,NULL),(12,5,'Grand Vitara','Grand Vitara','Grand Vitara',1,NULL,1,NULL,NULL,NULL,NULL),(13,5,'Jimny','Jimny','Jimny',1,NULL,1,NULL,NULL,NULL,NULL),(14,5,'Brezza','Brezza','Brezza',1,NULL,1,NULL,NULL,NULL,NULL),(15,5,'Alto 800','Alto 800','Alto 800',1,NULL,1,NULL,NULL,NULL,NULL),(16,5,'Alto K10','Alto K10','Alto K10',1,NULL,1,NULL,NULL,NULL,NULL),(17,5,'Ertiga','Ertiga','Ertiga',1,NULL,1,NULL,NULL,NULL,NULL),(18,5,'Swift','Swift','Swift',1,NULL,1,NULL,NULL,NULL,NULL),(19,5,'Wagon R','Wagon R','Wagon R',1,NULL,1,NULL,NULL,NULL,NULL),(20,5,'Ignis','Ignis','Ignis',1,NULL,1,NULL,NULL,NULL,NULL),(21,5,'XL6','XL6','XL6',1,NULL,1,NULL,NULL,NULL,NULL),(22,5,'XL7','XL7','XL7',1,NULL,1,NULL,NULL,NULL,NULL),(23,5,'XL8','XL8','XL8',1,NULL,1,NULL,NULL,NULL,NULL),(24,5,'XL9','XL9','XL9',1,NULL,1,NULL,NULL,NULL,NULL),(25,5,'XL10','XL10','XL10',1,NULL,1,NULL,NULL,NULL,NULL),(26,5,'XL11','XL11','XL11',1,NULL,1,NULL,NULL,NULL,NULL),(27,5,'XL12','XL12','XL12',1,NULL,1,NULL,NULL,NULL,NULL),(28,5,'XL13','XL13','XL13',1,NULL,1,NULL,NULL,NULL,NULL),(29,5,'Dzire','Dzire','Dzire',1,NULL,1,NULL,NULL,NULL,NULL),(30,5,'S-Presso','S-Presso','S-Presso',1,NULL,1,NULL,NULL,NULL,NULL),(31,5,'Celerio','Celerio','Celerio',1,NULL,1,NULL,NULL,NULL,NULL),(32,5,'Ciaz','Ciaz','Ciaz',1,NULL,1,NULL,NULL,NULL,NULL),(33,5,'Eeco','Eeco','Eeco',1,NULL,1,NULL,NULL,NULL,NULL),(34,6,'Nexon','Nexon','Nexon',1,NULL,1,NULL,NULL,NULL,NULL),(35,6,'Punch','Punch','Punch',1,NULL,1,NULL,NULL,NULL,NULL),(36,6,'Altroz','Altroz','Altroz',1,NULL,1,NULL,NULL,NULL,NULL),(37,6,'Harrier','Harrier','Harrier',1,NULL,1,NULL,NULL,NULL,NULL),(38,6,'Safari','Safari','Safari',1,NULL,1,NULL,NULL,NULL,NULL),(39,6,'Tiago','Tiago','Tiago',1,NULL,1,NULL,NULL,NULL,NULL),(40,6,'Tigor','Tigor','Tigor',1,NULL,1,NULL,NULL,NULL,NULL),(41,6,'Tiago NRG','Tiago NRG','Tiago NRG',1,NULL,1,NULL,NULL,NULL,NULL),(42,7,'Exter','Exter','Exter',1,NULL,1,NULL,NULL,NULL,NULL),(43,7,'Grand i10 Nios','Grand i10 Nios','Grand i10 Nios',1,NULL,1,NULL,NULL,NULL,NULL),(44,7,'Verna','Verna','Verna',1,NULL,1,NULL,NULL,NULL,NULL),(45,7,'Creta','Creta','Creta',1,NULL,1,NULL,NULL,NULL,NULL),(46,7,'Venue','Venue','Venue',1,NULL,1,NULL,NULL,NULL,NULL),(47,7,'i20','i20','i20',1,NULL,1,NULL,NULL,NULL,NULL),(48,7,'Aura','Aura','Aura',1,NULL,1,NULL,NULL,NULL,NULL),(49,7,'Alcazar','Alcazar','Alcazar',1,NULL,1,NULL,NULL,NULL,NULL),(50,7,'Tucson','Tucson','Tucson',1,NULL,1,NULL,NULL,NULL,NULL),(51,7,'i20 N Line','i20 N Line','i20 N Line',1,NULL,1,NULL,NULL,NULL,NULL),(52,7,'Venue N Line','Venue N Line','Venue N Line',1,NULL,1,NULL,NULL,NULL,NULL),(53,8,'Scorpio','Scorpio','Scorpio',1,NULL,1,NULL,NULL,NULL,NULL),(54,8,'XUV300 TurboSport','XUV300 TurboSport','XUV300 TurboSport',1,NULL,1,NULL,NULL,NULL,NULL),(55,8,'Scorpio N','Scorpio N','Scorpio N',1,NULL,1,NULL,NULL,NULL,NULL),(56,8,'Thar','Thar','Thar',1,NULL,1,NULL,NULL,NULL,NULL),(57,8,'Bolero Neo','Bolero Neo','Bolero Neo',1,NULL,1,NULL,NULL,NULL,NULL),(58,8,'XUV700','XUV700','XUV700',1,NULL,1,NULL,NULL,NULL,NULL),(59,8,'XUV300','XUV300','XUV300',1,NULL,1,NULL,NULL,NULL,NULL),(60,8,'Bolero','Bolero','Bolero',1,NULL,1,NULL,NULL,NULL,NULL),(61,8,'KUV100 NXT','KUV100 NXT','KUV100 NXT',1,NULL,1,NULL,NULL,NULL,NULL),(62,8,'Marazzo','Marazzo','Marazzo',1,NULL,1,NULL,NULL,NULL,NULL),(63,9,'X1','X1','X1',1,NULL,1,NULL,NULL,NULL,NULL),(64,9,'3 Series Gran Limousine','3 Series Gran Limousine','3 Series Gran Limousine',1,NULL,1,NULL,NULL,NULL,NULL),(65,9,'M340i','M340i','M340i',1,NULL,1,NULL,NULL,NULL,NULL),(66,9,'Z4','Z4','Z4',1,NULL,1,NULL,NULL,NULL,NULL),(67,9,'2 Series Gran Coupe','2 Series Gran Coupe','2 Series Gran Coupe',1,NULL,1,NULL,NULL,NULL,NULL),(68,9,'M2','M2','M2',1,NULL,1,NULL,NULL,NULL,NULL),(69,9,'5 Series','5 Series','5 Series',1,NULL,1,NULL,NULL,NULL,NULL),(70,9,'7 Series','7 Series','7 Series',1,NULL,1,NULL,NULL,NULL,NULL),(71,9,'X5','X5','X5',1,NULL,1,NULL,NULL,NULL,NULL),(72,9,'M8','M8','M8',1,NULL,1,NULL,NULL,NULL,NULL),(73,9,'6 Series GT','6 Series GT','6 Series GT',1,NULL,1,NULL,NULL,NULL,NULL),(74,9,'X7','X7','X7',1,NULL,1,NULL,NULL,NULL,NULL),(75,9,'XM','XM','XM',1,NULL,1,NULL,NULL,NULL,NULL),(76,9,'X3','X3','X3',1,NULL,1,NULL,NULL,NULL,NULL),(77,9,'X3  ','X3  ','X3  ',1,NULL,1,NULL,NULL,NULL,NULL),(78,9,'X5 M','X5 M','X5 M',1,NULL,1,NULL,NULL,NULL,NULL),(79,9,'X3 M40i','X3 M40i','X3 M40i',1,NULL,1,NULL,NULL,NULL,NULL),(80,9,'M4 Competition','M4 Competition','M4 Competition',1,NULL,1,NULL,NULL,NULL,NULL),(81,10,'Hector','Hector','Hector',1,NULL,1,NULL,NULL,NULL,NULL),(82,10,'Astor','Astor','Astor',1,NULL,1,NULL,NULL,NULL,NULL),(83,10,'Gloster','Gloster','Gloster',1,NULL,1,NULL,NULL,NULL,NULL),(84,10,'Hector Plus','Hector Plus','Hector Plus',1,NULL,1,NULL,NULL,NULL,NULL),(85,11,'Seltos','Seltos','Seltos',1,NULL,1,NULL,NULL,NULL,NULL),(86,11,'Sonet','Sonet','Sonet',1,NULL,1,NULL,NULL,NULL,NULL),(87,11,'Carens','Carens','Carens',1,NULL,1,NULL,NULL,NULL,NULL),(88,11,'Carnival','Carnival','Carnival',1,NULL,1,NULL,NULL,NULL,NULL),(89,12,'Innova Hycross','Innova Hycross','Innova Hycross',1,NULL,1,NULL,NULL,NULL,NULL),(90,12,'Urban Cruiser Hyryder','Urban Cruiser Hyryder','Urban Cruiser Hyryder',1,NULL,1,NULL,NULL,NULL,NULL),(91,12,'Fortuner','Fortuner','Fortuner',1,NULL,1,NULL,NULL,NULL,NULL),(92,12,'Glanza','Glanza','Glanza',1,NULL,1,NULL,NULL,NULL,NULL),(93,12,'Land Cruiser','Land Cruiser','Land Cruiser',1,NULL,1,NULL,NULL,NULL,NULL),(94,12,'Innova Crysta','Innova Crysta','Innova Crysta',1,NULL,1,NULL,NULL,NULL,NULL),(95,12,'Fortuner Legender','Fortuner Legender','Fortuner Legender',1,NULL,1,NULL,NULL,NULL,NULL),(96,12,'Vellfire','Vellfire','Vellfire',1,NULL,1,NULL,NULL,NULL,NULL),(97,12,'Hilux','Hilux','Hilux',1,NULL,1,NULL,NULL,NULL,NULL),(98,12,'Camry','Camry','Camry',1,NULL,1,NULL,NULL,NULL,NULL),(101,1,'S5 Sportback','S5 Sportback','S5 Sportback',1,NULL,1,NULL,NULL,NULL,NULL),(102,1,'A6','A6','A6',1,NULL,1,NULL,NULL,NULL,NULL),(103,1,'Q3 Sportback','Q3 Sportback','Q3 Sportback',1,NULL,1,NULL,NULL,NULL,NULL),(104,1,'Q5','Q5','Q5',1,NULL,1,NULL,NULL,NULL,NULL),(105,1,'Q7','Q7','Q7',1,NULL,1,NULL,NULL,NULL,NULL),(106,1,'RS5','RS5','RS5',1,NULL,1,NULL,NULL,NULL,NULL),(107,1,'RS Q8','RS Q8','RS Q8',1,NULL,1,NULL,NULL,NULL,NULL),(108,1,'Q8','Q8','Q8',1,NULL,1,NULL,NULL,NULL,NULL),(109,1,'A8 L','A8 L','A8 L',1,NULL,1,NULL,NULL,NULL,NULL),(110,14,'Cooper','Cooper','Cooper',1,NULL,1,NULL,NULL,NULL,NULL),(111,14,'Countryman','Countryman','Countryman',1,NULL,1,NULL,NULL,NULL,NULL),(112,15,'Defender','Defender','Defender',1,NULL,1,NULL,NULL,NULL,NULL),(113,15,'Range Rover Velar','Range Rover Velar','Range Rover Velar',1,NULL,1,NULL,NULL,NULL,NULL),(114,15,'Range Rover','Range Rover','Range Rover',1,NULL,1,NULL,NULL,NULL,NULL),(115,15,'Range Rover Evoque','Range Rover Evoque','Range Rover Evoque',1,NULL,1,NULL,NULL,NULL,NULL),(116,15,'Range Rover Sport','Range Rover Sport','Range Rover Sport',1,NULL,1,NULL,NULL,NULL,NULL),(117,15,'Discovery Sport','Discovery Sport','Discovery Sport',1,NULL,1,NULL,NULL,NULL,NULL),(118,15,'Discovery','Discovery','Discovery',1,NULL,1,NULL,NULL,NULL,NULL),(119,16,'Amaze','Amaze','Amaze',1,NULL,1,NULL,NULL,NULL,NULL),(120,16,'City','City','City',1,NULL,1,NULL,NULL,NULL,NULL),(121,16,'City Hybrid eHEV','City Hybrid eHEV','City Hybrid eHEV',1,NULL,1,NULL,NULL,NULL,NULL),(122,17,'Kushaq','Kushaq','Kushaq',1,NULL,1,NULL,NULL,NULL,NULL),(123,17,'Slavia','Slavia','Slavia',1,NULL,1,NULL,NULL,NULL,NULL),(124,17,'Superb','Superb','Superb',1,NULL,1,NULL,NULL,NULL,NULL),(125,17,'Kodiaq','Kodiaq','Kodiaq',1,NULL,1,NULL,NULL,NULL,NULL),(126,18,'718','718','718',1,NULL,1,NULL,NULL,NULL,NULL),(127,18,'911','911','911',1,NULL,1,NULL,NULL,NULL,NULL),(128,18,'Cayenne','Cayenne','Cayenne',1,NULL,1,NULL,NULL,NULL,NULL),(129,18,'Cayenne Coupe','Cayenne Coupe','Cayenne Coupe',1,NULL,1,NULL,NULL,NULL,NULL),(130,18,'Macan','Macan','Macan',1,NULL,1,NULL,NULL,NULL,NULL),(131,18,'Panamera','Panamera','Panamera',1,NULL,1,NULL,NULL,NULL,NULL),(132,18,'Taycan Cross Turismo','Taycan Cross Turismo','Taycan Cross Turismo',1,NULL,1,NULL,NULL,NULL,NULL),(133,19,'XC90','XC90','XC90',1,NULL,1,NULL,NULL,NULL,NULL),(134,19,'XC60','XC60','XC60',1,NULL,1,NULL,NULL,NULL,NULL),(135,19,'S90','S90','S90',1,NULL,1,NULL,NULL,NULL,NULL),(136,19,'XC40','XC40','XC40',1,NULL,1,NULL,NULL,NULL,NULL),(137,20,'Virtus','Virtus','Virtus',1,NULL,1,NULL,NULL,NULL,NULL),(138,20,'Taigun','Taigun','Taigun',1,NULL,1,NULL,NULL,NULL,NULL),(139,20,'Tiguan','Tiguan','Tiguan',1,NULL,1,NULL,NULL,NULL,NULL),(140,21,'Magnite','Magnite','Magnite',1,NULL,1,NULL,NULL,NULL,NULL),(141,22,'Phantom','Phantom','Phantom',1,NULL,1,NULL,NULL,NULL,NULL),(142,22,'Cullinan','Cullinan','Cullinan',1,NULL,1,NULL,NULL,NULL,NULL),(143,22,'Wraith','Wraith','Wraith',1,NULL,1,NULL,NULL,NULL,NULL),(144,22,'Dawn','Dawn','Dawn',1,NULL,1,NULL,NULL,NULL,NULL),(145,23,'Bentayga','Bentayga','Bentayga',1,NULL,1,NULL,NULL,NULL,NULL),(146,24,'Ghibli','Ghibli','Ghibli',1,NULL,1,NULL,NULL,NULL,NULL),(147,24,'Levante','Levante','Levante',1,NULL,1,NULL,NULL,NULL,NULL),(148,24,'Quattroporte','Quattroporte','Quattroporte',1,NULL,1,NULL,NULL,NULL,NULL),(149,24,'MC20','MC20','MC20',1,NULL,1,NULL,NULL,NULL,NULL),(150,25,'Kwid','Kwid','Kwid',1,NULL,1,NULL,NULL,NULL,NULL),(151,25,'Kiger','Kiger','Kiger',1,NULL,1,NULL,NULL,NULL,NULL),(152,25,'Triber','Triber','Triber',1,NULL,1,NULL,NULL,NULL,NULL),(153,26,'Gurkha','Gurkha','Gurkha',1,NULL,1,NULL,NULL,NULL,NULL),(154,26,'Trax Cruiser','Trax Cruiser','Trax Cruiser',1,NULL,1,NULL,NULL,NULL,NULL),(155,2,'Compass','Compass','Compass',1,NULL,1,NULL,NULL,NULL,NULL),(157,2,'Wrangler','Wrangler','Wrangler',1,NULL,1,NULL,NULL,NULL,NULL),(158,2,'Grand Cherokee','Grand Cherokee','Grand Cherokee',1,NULL,1,NULL,NULL,NULL,NULL),(159,28,'Huracan Evo','Huracan Evo','Huracan Evo',1,NULL,1,NULL,NULL,NULL,NULL),(160,28,'Urus Performante','Urus Performante','Urus Performante',1,NULL,1,NULL,NULL,NULL,NULL),(161,28,'Huracan STO','Huracan STO','Huracan STO',1,NULL,1,NULL,NULL,NULL,NULL),(162,28,'Huracan Tecnica','Huracan Tecnica','Huracan Tecnica',1,NULL,1,NULL,NULL,NULL,NULL),(163,28,'Urus S','Urus S','Urus S',1,NULL,1,NULL,NULL,NULL,NULL),(164,28,'Huracan Evo Spyder','Huracan Evo Spyder','Huracan Evo Spyder',1,NULL,1,NULL,NULL,NULL,NULL),(165,29,'F-Type','F-Type','F-Type',1,NULL,1,NULL,NULL,NULL,NULL),(166,29,'F-Pace','F-Pace','F-Pace',1,NULL,1,NULL,NULL,NULL,NULL),(167,29,'XF','XF','XF',1,NULL,1,NULL,NULL,NULL,NULL),(168,30,'C3','C3','C3',1,NULL,1,NULL,NULL,NULL,NULL),(169,30,'C5 Aircross','C5 Aircross','C5 Aircross',1,NULL,1,NULL,NULL,NULL,NULL),(170,31,'C-Class','C-Class','C-Class',1,NULL,1,NULL,NULL,NULL,NULL),(171,31,'GLA','GLA','GLA',1,NULL,1,NULL,NULL,NULL,NULL),(172,31,'Maybach S-Class','Maybach S-Class','Maybach S-Class',1,NULL,1,NULL,NULL,NULL,NULL),(173,31,'GLS','GLS','GLS',1,NULL,1,NULL,NULL,NULL,NULL),(174,31,'Maybach GLS','Maybach GLS','Maybach GLS',1,NULL,1,NULL,NULL,NULL,NULL),(175,31,'E-Class','E-Class','E-Class',1,NULL,1,NULL,NULL,NULL,NULL),(176,31,'GLC','GLC','GLC',1,NULL,1,NULL,NULL,NULL,NULL),(177,31,'S-Class','S-Class','S-Class',1,NULL,1,NULL,NULL,NULL,NULL),(178,31,'GLB','GLB','GLB',1,NULL,1,NULL,NULL,NULL,NULL),(179,31,'GLE','GLE','GLE',1,NULL,1,NULL,NULL,NULL,NULL),(180,31,'AMG GLC43 Coupe','AMG GLC43 Coupe','AMG GLC43 Coupe',1,NULL,1,NULL,NULL,NULL,NULL),(181,31,'AMG GT 63 S E Performance','AMG GT 63 S E Performance','AMG GT 63 S E Performance',1,NULL,1,NULL,NULL,NULL,NULL),(182,31,'GLC Coupe','GLC Coupe','GLC Coupe',1,NULL,1,NULL,NULL,NULL,NULL),(183,31,'AMG GLA35','AMG GLA35','AMG GLA35',1,NULL,1,NULL,NULL,NULL,NULL),(184,31,'AMG E53 Cabriolet','AMG E53 Cabriolet','AMG E53 Cabriolet',1,NULL,1,NULL,NULL,NULL,NULL),(185,31,'AMG GLE Coupe','AMG GLE Coupe','AMG GLE Coupe',1,NULL,1,NULL,NULL,NULL,NULL),(186,31,'AMG GT 63 S 4MATIC Plus','AMG GT 63 S 4MATIC Plus','AMG GT 63 S 4MATIC Plus',1,NULL,1,NULL,NULL,NULL,NULL),(187,31,'AMG E63','AMG E63','AMG E63',1,NULL,1,NULL,NULL,NULL,NULL),(188,31,'AMG E53','AMG E53','AMG E53',1,NULL,1,NULL,NULL,NULL,NULL),(189,31,'AMG SL55 Roadster','AMG SL55 Roadster','AMG SL55 Roadster',1,NULL,1,NULL,NULL,NULL,NULL),(190,31,'AMG A35','AMG A35','AMG A35',1,NULL,1,NULL,NULL,NULL,NULL),(191,31,'G-Class','G-Class','G-Class',1,NULL,1,NULL,NULL,NULL,NULL),(192,31,'AMG A45 S','AMG A45 S','AMG A45 S',1,NULL,1,NULL,NULL,NULL,NULL),(193,31,'A-Class Limousine','A-Class Limousine','A-Class Limousine',1,NULL,1,NULL,NULL,NULL,NULL),(194,32,'F8 Tributo','F8 Tributo','F8 Tributo',1,NULL,1,NULL,NULL,NULL,NULL),(195,32,'Portofino','Portofino','Portofino',1,NULL,1,NULL,NULL,NULL,NULL),(196,32,'Roma','Roma','Roma',1,NULL,1,NULL,NULL,NULL,NULL),(197,33,'DBX','DBX','DBX',1,NULL,1,NULL,NULL,NULL,NULL),(198,33,'DB11','DB11','DB11',1,NULL,1,NULL,NULL,NULL,NULL),(199,33,'Vantage','Vantage','Vantage',1,NULL,1,NULL,NULL,NULL,NULL),(200,34,'Bugatti Veyron','Bugatti Veyron','Bugatti Veyron',1,NULL,1,NULL,NULL,NULL,NULL),(201,35,'ES','ES','ES',1,NULL,1,NULL,NULL,NULL,NULL),(202,35,'LC 500h','LC 500h','LC 500h',1,NULL,1,NULL,NULL,NULL,NULL),(203,35,'NX','NX','NX',1,NULL,1,NULL,NULL,NULL,NULL),(204,35,'LX','LX','LX',1,NULL,1,NULL,NULL,NULL,NULL),(205,35,'RX','RX','RX',1,NULL,1,NULL,NULL,NULL,NULL),(206,35,'LS','LS','LS',1,NULL,1,NULL,NULL,NULL,NULL),(207,36,'720S','720S','720S',1,NULL,1,NULL,NULL,NULL,NULL),(208,36,'GT','GT','GT',1,NULL,1,NULL,NULL,NULL,NULL),(209,37,'D-Max','D-Max','D-Max',1,NULL,1,NULL,NULL,NULL,NULL),(210,37,'MU-X','MU-X','MU-X',1,NULL,1,NULL,NULL,NULL,NULL),(211,3,'Raider','Raider','Raider',1,NULL,1,NULL,NULL,NULL,NULL),(212,3,'NTORQ 125','NTORQ 125','NTORQ 125',1,NULL,1,NULL,NULL,NULL,NULL),(213,3,'Apache RTR 160','Apache RTR 160','Apache RTR 160',1,NULL,1,NULL,NULL,NULL,NULL),(214,3,'Apache RTR 161','Apache RTR 161','Apache RTR 161',1,NULL,1,NULL,NULL,NULL,NULL),(215,3,'Apache RTR 162','Apache RTR 162','Apache RTR 162',1,NULL,1,NULL,NULL,NULL,NULL),(216,3,'Jupiter','Jupiter','Jupiter',1,NULL,1,NULL,NULL,NULL,NULL),(217,3,'Apache RTR 160 4V','Apache RTR 160 4V','Apache RTR 160 4V',1,NULL,1,NULL,NULL,NULL,NULL),(218,3,'Ronin','Ronin','Ronin',1,NULL,1,NULL,NULL,NULL,NULL),(219,3,'TVS Apache RR 310','TVS Apache RR 310','TVS Apache RR 310',1,NULL,1,NULL,NULL,NULL,NULL),(220,3,'XL100','XL100','XL100',1,NULL,1,NULL,NULL,NULL,NULL),(222,3,'Apache RTR 200 4V','Apache RTR 200 4V','Apache RTR 200 4V',1,NULL,1,NULL,NULL,NULL,NULL),(223,3,'Sport','Sport','Sport',1,NULL,1,NULL,NULL,NULL,NULL),(224,3,'Radeon','Radeon','Radeon',1,NULL,1,NULL,NULL,NULL,NULL),(225,3,'Apache RTR 180','Apache RTR 180','Apache RTR 180',1,NULL,1,NULL,NULL,NULL,NULL),(226,3,'Star City Plus','Star City Plus','Star City Plus',1,NULL,1,NULL,NULL,NULL,NULL),(227,3,'Scooty Pep Plus','Scooty Pep Plus','Scooty Pep Plus',1,NULL,1,NULL,NULL,NULL,NULL),(229,39,'Splendor Plus','Splendor Plus','Splendor Plus',1,NULL,1,NULL,NULL,NULL,NULL),(230,39,'HF Deluxe','HF Deluxe','HF Deluxe',1,NULL,1,NULL,NULL,NULL,NULL),(231,39,'Passion Pro','Passion Pro','Passion Pro',1,NULL,1,NULL,NULL,NULL,NULL),(232,39,'Super Splendor','Super Splendor','Super Splendor',1,NULL,1,NULL,NULL,NULL,NULL),(233,39,'XPulse 200 4 V','XPulse 200 4 V','XPulse 200 4 V',1,NULL,1,NULL,NULL,NULL,NULL),(234,39,'Glamour','Glamour','Glamour',1,NULL,1,NULL,NULL,NULL,NULL),(235,39,'Xtreme 160R','Xtreme 160R','Xtreme 160R',1,NULL,1,NULL,NULL,NULL,NULL),(236,39,'Splendor Plus Xtec','Splendor Plus Xtec','Splendor Plus Xtec',1,NULL,1,NULL,NULL,NULL,NULL),(237,39,'Glamour Xtec','Glamour Xtec','Glamour Xtec',1,NULL,1,NULL,NULL,NULL,NULL),(238,39,'Passion Plus','Passion Plus','Passion Plus',1,NULL,1,NULL,NULL,NULL,NULL),(239,39,'HF 100','HF 100','HF 100',1,NULL,1,NULL,NULL,NULL,NULL),(240,39,'Xtreme 160R 4V','Xtreme 160R 4V','Xtreme 160R 4V',1,NULL,1,NULL,NULL,NULL,NULL),(241,39,'Super Splendor Xtec','Super Splendor Xtec','Super Splendor Xtec',1,NULL,1,NULL,NULL,NULL,NULL),(242,39,'XPulse 200T 4V','XPulse 200T 4V','XPulse 200T 4V',1,NULL,1,NULL,NULL,NULL,NULL),(243,39,'Xtreme 200S','Xtreme 200S','Xtreme 200S',1,NULL,1,NULL,NULL,NULL,NULL),(244,4,'NS200','NS200','NS200',1,NULL,1,NULL,NULL,NULL,NULL),(245,4,'RS200','RS200','RS200',1,NULL,1,NULL,NULL,NULL,NULL),(246,4,'125','125','125',1,NULL,1,NULL,NULL,NULL,NULL),(247,4,'NS 125','NS 125','NS 125',1,NULL,1,NULL,NULL,NULL,NULL),(248,4,'N160','N160','N160',1,NULL,1,NULL,NULL,NULL,NULL),(249,4,'150','150','150',1,NULL,1,NULL,NULL,NULL,NULL),(250,4,' 220 F',' 220 F',' 220 F',1,NULL,1,NULL,NULL,NULL,NULL),(251,4,'Dominar 400','Dominar 400','Dominar 400',1,NULL,1,NULL,NULL,NULL,NULL),(252,4,'NS160','NS160','NS160',1,NULL,1,NULL,NULL,NULL,NULL),(254,4,'Chetak','Chetak','Chetak',1,NULL,1,NULL,NULL,NULL,NULL),(255,4,'Dominar 250','Dominar 250','Dominar 250',1,NULL,1,NULL,NULL,NULL,NULL),(256,4,'CT 110X','CT 110X','CT 110X',1,NULL,1,NULL,NULL,NULL,NULL),(257,4,'N250','N250','N250',1,NULL,1,NULL,NULL,NULL,NULL),(259,4,'CT 125X','CT 125X','CT 125X',1,NULL,1,NULL,NULL,NULL,NULL),(260,4,'P150','P150','P150',1,NULL,1,NULL,NULL,NULL,NULL),(261,4,'Platina 100','Platina 100','Platina 100',1,NULL,1,NULL,NULL,NULL,NULL),(262,4,'Avenger Cruise 220','Avenger Cruise 220','Avenger Cruise 220',1,NULL,1,NULL,NULL,NULL,NULL),(263,4,'Avenger Street 160','Avenger Street 160','Avenger Street 160',1,NULL,1,NULL,NULL,NULL,NULL),(264,4,'Avenger 220 Street','Avenger 220 Street','Avenger 220 Street',1,NULL,1,NULL,NULL,NULL,NULL),(265,41,'Hunter 350','Hunter 350','Hunter 350',1,NULL,1,NULL,NULL,NULL,NULL),(266,41,'Bullet 350','Bullet 350','Bullet 350',1,NULL,1,NULL,NULL,NULL,NULL),(267,41,'Classic 350','Classic 350','Classic 350',1,NULL,1,NULL,NULL,NULL,NULL),(268,41,'Continental GT 650','Continental GT 650','Continental GT 650',1,NULL,1,NULL,NULL,NULL,NULL),(269,41,'Himalayan','Himalayan','Himalayan',1,NULL,1,NULL,NULL,NULL,NULL),(270,41,'Meteor 350','Meteor 350','Meteor 350',1,NULL,1,NULL,NULL,NULL,NULL),(271,41,'Super Meteor 650','Super Meteor 650','Super Meteor 650',1,NULL,1,NULL,NULL,NULL,NULL),(272,41,'Interceptor 650','Interceptor 650','Interceptor 650',1,NULL,1,NULL,NULL,NULL,NULL),(273,41,'Scram 411','Scram 411','Scram 411',1,NULL,1,NULL,NULL,NULL,NULL),(274,42,'R15S','R15S','R15S',1,NULL,1,NULL,NULL,NULL,NULL),(275,42,'MT 15 V2','MT 15 V2','MT 15 V2',1,NULL,1,NULL,NULL,NULL,NULL),(276,42,'R15 V4','R15 V4','R15 V4',1,NULL,1,NULL,NULL,NULL,NULL),(277,42,'FZS-FI V3','FZS-FI V3','FZS-FI V3',1,NULL,1,NULL,NULL,NULL,NULL),(278,42,'Aerox 155','Aerox 155','Aerox 155',1,NULL,1,NULL,NULL,NULL,NULL),(279,42,'RayZR 125 Fi Hybrid','RayZR 125 Fi Hybrid','RayZR 125 Fi Hybrid',1,NULL,1,NULL,NULL,NULL,NULL),(280,42,'FZ-X','FZ-X','FZ-X',1,NULL,1,NULL,NULL,NULL,NULL),(281,42,'FZ 25','FZ 25','FZ 25',1,NULL,1,NULL,NULL,NULL,NULL),(282,42,'FZS 25','FZS 25','FZS 25',1,NULL,1,NULL,NULL,NULL,NULL),(283,43,'Dio 125','Dio 125','Dio 125',1,NULL,1,NULL,NULL,NULL,NULL),(284,43,'Activa 6G','Activa 6G','Activa 6G',1,NULL,1,NULL,NULL,NULL,NULL),(285,43,'SP 125','SP 125','SP 125',1,NULL,1,NULL,NULL,NULL,NULL),(286,43,'Shine','Shine','Shine',1,NULL,1,NULL,NULL,NULL,NULL),(287,43,'Dio','Dio','Dio',1,NULL,1,NULL,NULL,NULL,NULL),(288,43,'H\'ness CB350','H\'ness CB350','H\'ness CB350',1,NULL,1,NULL,NULL,NULL,NULL),(289,43,'Unicorn','Unicorn','Unicorn',1,NULL,1,NULL,NULL,NULL,NULL),(290,43,'Shine 100','Shine 100','Shine 100',1,NULL,1,NULL,NULL,NULL,NULL),(291,43,'Hornet 2.0','Hornet 2.0','Hornet 2.0',1,NULL,1,NULL,NULL,NULL,NULL),(292,43,'Activa 125','Activa 125','Activa 125',1,NULL,1,NULL,NULL,NULL,NULL),(293,43,'CD 110 Dream','CD 110 Dream','CD 110 Dream',1,NULL,1,NULL,NULL,NULL,NULL),(294,43,'XBlade','XBlade','XBlade',1,NULL,1,NULL,NULL,NULL,NULL),(295,43,'Livo','Livo','Livo',1,NULL,1,NULL,NULL,NULL,NULL),(296,43,'CB350RS','CB350RS','CB350RS',1,NULL,1,NULL,NULL,NULL,NULL),(297,43,'CBR650R','CBR650R','CBR650R',1,NULL,1,NULL,NULL,NULL,NULL),(298,43,'Grazia','Grazia','Grazia',1,NULL,1,NULL,NULL,NULL,NULL),(299,43,'Gold Wing','Gold Wing','Gold Wing',1,NULL,1,NULL,NULL,NULL,NULL),(300,43,'CB300R','CB300R','CB300R',1,NULL,1,NULL,NULL,NULL,NULL),(301,43,'CB650R','CB650R','CB650R',1,NULL,1,NULL,NULL,NULL,NULL),(302,43,'CB200X','CB200X','CB200X',1,NULL,1,NULL,NULL,NULL,NULL),(303,43,'CB300F','CB300F','CB300F',1,NULL,1,NULL,NULL,NULL,NULL),(304,43,'CRF1100L Africa Twin','CRF1100L Africa Twin','CRF1100L Africa Twin',1,NULL,1,NULL,NULL,NULL,NULL),(305,43,'CB500X','CB500X','CB500X',1,NULL,1,NULL,NULL,NULL,NULL),(306,43,'CBR1000RR-R','CBR1000RR-R','CBR1000RR-R',1,NULL,1,NULL,NULL,NULL,NULL),(307,44,'Access 125','Access 125','Access 125',1,NULL,1,NULL,NULL,NULL,NULL),(308,44,'Hayabusa','Hayabusa','Hayabusa',1,NULL,1,NULL,NULL,NULL,NULL),(309,44,'Burgman Street','Burgman Street','Burgman Street',1,NULL,1,NULL,NULL,NULL,NULL),(310,44,'Gixxer','Gixxer','Gixxer',1,NULL,1,NULL,NULL,NULL,NULL),(311,44,'Gixxer SF','Gixxer SF','Gixxer SF',1,NULL,1,NULL,NULL,NULL,NULL),(312,44,'Avenis','Avenis','Avenis',1,NULL,1,NULL,NULL,NULL,NULL),(313,44,'Gixxer SF 250','Gixxer SF 250','Gixxer SF 250',1,NULL,1,NULL,NULL,NULL,NULL),(314,44,'V-Strom SX','V-Strom SX','V-Strom SX',1,NULL,1,NULL,NULL,NULL,NULL),(315,44,'Katana','Katana','Katana',1,NULL,1,NULL,NULL,NULL,NULL),(316,44,'V-Strom 650XT','V-Strom 650XT','V-Strom 650XT',1,NULL,1,NULL,NULL,NULL,NULL),(317,44,'Gixxer 250','Gixxer 250','Gixxer 250',1,NULL,1,NULL,NULL,NULL,NULL),(318,45,'390 Duke','390 Duke','390 Duke',1,NULL,1,NULL,NULL,NULL,NULL),(319,45,'200 Duke','200 Duke','200 Duke',1,NULL,1,NULL,NULL,NULL,NULL),(320,45,'250 Duke','250 Duke','250 Duke',1,NULL,1,NULL,NULL,NULL,NULL),(321,45,'125 Duke','125 Duke','125 Duke',1,NULL,1,NULL,NULL,NULL,NULL),(322,45,'RC 200','RC 200','RC 200',1,NULL,1,NULL,NULL,NULL,NULL),(323,45,'RC 390','RC 390','RC 390',1,NULL,1,NULL,NULL,NULL,NULL),(324,45,'390 Adventure','390 Adventure','390 Adventure',1,NULL,1,NULL,NULL,NULL,NULL),(325,45,'250 Adventure','250 Adventure','250 Adventure',1,NULL,1,NULL,NULL,NULL,NULL),(326,45,'390 Adventure X','390 Adventure X','390 Adventure X',1,NULL,1,NULL,NULL,NULL,NULL),(327,45,'RC 125','RC 125','RC 125',1,NULL,1,NULL,NULL,NULL,NULL),(328,46,'42 Bobber','42 Bobber','42 Bobber',1,NULL,1,NULL,NULL,NULL,NULL),(329,46,'Forty Two','Forty Two','Forty Two',1,NULL,1,NULL,NULL,NULL,NULL),(330,46,'Perak','Perak','Perak',1,NULL,1,NULL,NULL,NULL,NULL),(331,46,'Jawa','Jawa','Jawa',1,NULL,1,NULL,NULL,NULL,NULL),(332,46,'42 2.1','42 2.1','42 2.1',1,NULL,1,NULL,NULL,NULL,NULL),(333,47,'Mojo 300 BS6','Mojo 300 BS6','Mojo 300 BS6',1,NULL,1,NULL,NULL,NULL,NULL),(334,48,'X440','X440','X440',1,NULL,1,NULL,NULL,NULL,NULL),(335,48,'Fat Boy 114','Fat Boy 114','Fat Boy 114',1,NULL,1,NULL,NULL,NULL,NULL),(336,48,'Sportster S','Sportster S','Sportster S',1,NULL,1,NULL,NULL,NULL,NULL),(337,48,'Street Glide Special','Street Glide Special','Street Glide Special',1,NULL,1,NULL,NULL,NULL,NULL),(338,48,'Pan America 1250','Pan America 1250','Pan America 1250',1,NULL,1,NULL,NULL,NULL,NULL),(339,48,'Nightster','Nightster','Nightster',1,NULL,1,NULL,NULL,NULL,NULL),(340,48,'Heritage Classic','Heritage Classic','Heritage Classic',1,NULL,1,NULL,NULL,NULL,NULL),(341,48,'Fat Bob','Fat Bob','Fat Bob',1,NULL,1,NULL,NULL,NULL,NULL),(342,48,'Road Glide Special','Road Glide Special','Road Glide Special',1,NULL,1,NULL,NULL,NULL,NULL),(343,49,' Panigale V4',' Panigale V4',' Panigale V4',1,NULL,1,NULL,NULL,NULL,NULL),(344,49,'Scrambler 800','Scrambler 800','Scrambler 800',1,NULL,1,NULL,NULL,NULL,NULL),(345,49,'Monster','Monster','Monster',1,NULL,1,NULL,NULL,NULL,NULL),(346,49,'Streetfighter V4','Streetfighter V4','Streetfighter V4',1,NULL,1,NULL,NULL,NULL,NULL),(347,49,'DesertX','DesertX','DesertX',1,NULL,1,NULL,NULL,NULL,NULL),(348,49,'Hypermotard 950','Hypermotard 950','Hypermotard 950',1,NULL,1,NULL,NULL,NULL,NULL),(349,49,'Streetfighter V2','Streetfighter V2','Streetfighter V2',1,NULL,1,NULL,NULL,NULL,NULL),(350,49,'Multistrada V2','Multistrada V2','Multistrada V2',1,NULL,1,NULL,NULL,NULL,NULL),(351,49,'Multistrada V4','Multistrada V4','Multistrada V4',1,NULL,1,NULL,NULL,NULL,NULL),(352,49,'SuperSport 950','SuperSport 950','SuperSport 950',1,NULL,1,NULL,NULL,NULL,NULL),(353,49,'Multistrada 950','Multistrada 950','Multistrada 950',1,NULL,1,NULL,NULL,NULL,NULL),(354,49,'XDiavel','XDiavel','XDiavel',1,NULL,1,NULL,NULL,NULL,NULL),(355,49,'Scrambler Desert Sled','Scrambler Desert Sled','Scrambler Desert Sled',1,NULL,1,NULL,NULL,NULL,NULL),(356,49,'Scrambler 1100','Scrambler 1100','Scrambler 1100',1,NULL,1,NULL,NULL,NULL,NULL),(357,49,'Panigale V2','Panigale V2','Panigale V2',1,NULL,1,NULL,NULL,NULL,NULL),(358,49,'Diavel 1260','Diavel 1260','Diavel 1260',1,NULL,1,NULL,NULL,NULL,NULL),(359,50,'KLX230RS','KLX230RS','KLX230RS',1,NULL,1,NULL,NULL,NULL,NULL),(360,50,'KX112','KX112','KX112',1,NULL,1,NULL,NULL,NULL,NULL),(361,50,'KX65','KX65','KX65',1,NULL,1,NULL,NULL,NULL,NULL),(362,50,'Ninja ZX-10R','Ninja ZX-10R','Ninja ZX-10R',1,NULL,1,NULL,NULL,NULL,NULL),(363,50,'Z900','Z900','Z900',1,NULL,1,NULL,NULL,NULL,NULL),(364,50,'Ninja H2','Ninja H2','Ninja H2',1,NULL,1,NULL,NULL,NULL,NULL),(365,50,'Ninja 300','Ninja 300','Ninja 300',1,NULL,1,NULL,NULL,NULL,NULL),(366,50,'Ninja 400','Ninja 400','Ninja 400',1,NULL,1,NULL,NULL,NULL,NULL),(367,50,'Ninja 1000SX','Ninja 1000SX','Ninja 1000SX',1,NULL,1,NULL,NULL,NULL,NULL),(368,50,'W175','W175','W175',1,NULL,1,NULL,NULL,NULL,NULL),(369,50,'Z650','Z650','Z650',1,NULL,1,NULL,NULL,NULL,NULL),(370,50,'Vulcan S','Vulcan S','Vulcan S',1,NULL,1,NULL,NULL,NULL,NULL),(371,50,'KX 250','KX 250','KX 250',1,NULL,1,NULL,NULL,NULL,NULL),(372,50,'KLX 140','KLX 140','KLX 140',1,NULL,1,NULL,NULL,NULL,NULL),(373,50,'KX 100','KX 100','KX 100',1,NULL,1,NULL,NULL,NULL,NULL),(374,50,'Ninja 650','Ninja 650','Ninja 650',1,NULL,1,NULL,NULL,NULL,NULL),(375,50,'KX 450','KX 450','KX 450',1,NULL,1,NULL,NULL,NULL,NULL),(376,50,'Z650RS','Z650RS','Z650RS',1,NULL,1,NULL,NULL,NULL,NULL),(377,50,'KLX 110','KLX 110','KLX 110',1,NULL,1,NULL,NULL,NULL,NULL),(378,50,'KLX 450R','KLX 450R','KLX 450R',1,NULL,1,NULL,NULL,NULL,NULL),(379,50,'W800 Street','W800 Street','W800 Street',1,NULL,1,NULL,NULL,NULL,NULL),(380,50,'Versys 1000','Versys 1000','Versys 1000',1,NULL,1,NULL,NULL,NULL,NULL),(381,50,'Z900RS','Z900RS','Z900RS',1,NULL,1,NULL,NULL,NULL,NULL),(382,50,'Versys 650','Versys 650','Versys 650',1,NULL,1,NULL,NULL,NULL,NULL),(383,50,'Z H2','Z H2','Z H2',1,NULL,1,NULL,NULL,NULL,NULL),(384,51,'brandSeriesName','brandSeriesName','brandSeriesName',1,0,1,'2023-09-04 11:14:20',NULL,'2023-09-04 11:14:20',NULL),(385,52,'string','string','string',1,0,1,'2023-09-05 06:41:06',NULL,'2023-09-05 06:41:06',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=1450 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brandvariant`
--

LOCK TABLES `brandvariant` WRITE;
/*!40000 ALTER TABLE `brandvariant` DISABLE KEYS */;
INSERT INTO `brandvariant` VALUES (1,1,'Premium 40 TFSI','Premium 40 TFSI','Premium_40_TFSI',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(2,1,'Premium Plus 40 TFSI','Premium Plus 40 TFSI','Premium_Plus_40_TFSI',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(3,2,'40 TFSI Premium Plus','40 TFSI Premium Plus','40_TFSI_Premium_Plus',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(4,2,'40 TFSI Technology','40 TFSI Technology','40_TFSI_Technology',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(5,3,'Sport 2.0 Diesel','Sport 2.0 Diesel','Sport_2_0_Diesel',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(6,3,'Model S (O) 2.0 Diesel','Model S (O) 2.0 Diesel','Model_S_O_2_0_Diesel',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(7,4,'Upland','Upland','Upland',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(8,4,'X','X','X',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(9,5,'Default','Default','Default',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(10,6,'Default','Default','Default',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(11,7,'Default','Default','Default',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(12,8,'Default','Default','Default',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(13,9,'Zeta Plus 7 STR','Zeta Plus 7 STR','Zeta Plus 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,3),(14,9,'Zeta Plus 8 STR','Zeta Plus 8 STR','Zeta Plus 8 STR',1,NULL,1,NULL,NULL,NULL,NULL,3),(15,9,'Alpha Plus 7 STR','Alpha Plus 7 STR','Alpha Plus 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,3),(16,10,'Sigma 1.2L MT','Sigma 1.2L MT','Sigma 1.2L MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(17,10,'Delta 1.2L MT','Delta 1.2L MT','Delta 1.2L MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(18,10,'Sigma 1.2 CNG','Sigma 1.2 CNG','Sigma 1.2 CNG',1,NULL,1,NULL,NULL,NULL,NULL,1),(19,10,'Delta Plus 1.2L MT','Delta Plus 1.2L MT','Delta Plus 1.2L MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(20,10,'Delta 1.2L AGS','Delta 1.2L AGS','Delta 1.2L AGS',1,NULL,1,NULL,NULL,NULL,NULL,1),(21,10,'Delta 1.2 CNG','Delta 1.2 CNG','Delta 1.2 CNG',1,NULL,1,NULL,NULL,NULL,NULL,1),(22,10,'Delta Plus 1.2L AGS','Delta Plus 1.2L AGS','Delta Plus 1.2L AGS',1,NULL,1,NULL,NULL,NULL,NULL,1),(23,10,'Delta Plus 1.0 Turbo MT','Delta Plus 1.0 Turbo MT','Delta Plus 1.0 Turbo MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(24,10,'Zeta 1.0L Turbo MT','Zeta 1.0L Turbo MT','Zeta 1.0L Turbo MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(25,10,'Alpha 1.0L Turbo MT','Alpha 1.0L Turbo MT','Alpha 1.0L Turbo MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(26,10,'Alpha 1.0L Turbo MT Dual Tone','Alpha 1.0L Turbo MT Dual Tone','Alpha 1.0L Turbo MT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(27,10,'Zeta 1.0L Turbo 6 AT','Zeta 1.0L Turbo 6 AT','Zeta 1.0L Turbo 6 AT',1,NULL,1,NULL,NULL,NULL,NULL,1),(28,10,'Alpha 1.0L Turbo 6 AT','Alpha 1.0L Turbo 6 AT','Alpha 1.0L Turbo 6 AT',1,NULL,1,NULL,NULL,NULL,NULL,1),(29,10,'Alpha 1.0L Turbo 6 AT Dual Tone','Alpha 1.0L Turbo 6 AT Dual Tone','Alpha 1.0L Turbo 6 AT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(30,11,'Sigma MT','Sigma MT','Sigma MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(31,11,'Delta MT','Delta MT','Delta MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(32,11,'Delta AGS','Delta AGS','Delta AGS',1,NULL,1,NULL,NULL,NULL,NULL,1),(33,11,'Delta MT CNG','Delta MT CNG','Delta MT CNG',1,NULL,1,NULL,NULL,NULL,NULL,1),(34,11,'Zeta MT','Zeta MT','Zeta MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(35,11,'Zeta AGS','Zeta AGS','Zeta AGS',1,NULL,1,NULL,NULL,NULL,NULL,1),(36,11,'Zeta MT CNG','Zeta MT CNG','Zeta MT CNG',1,NULL,1,NULL,NULL,NULL,NULL,1),(37,11,'Alpha MT','Alpha MT','Alpha MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(38,11,'Alpha AGS','Alpha AGS','Alpha AGS',1,NULL,1,NULL,NULL,NULL,NULL,1),(39,12,'Sigma Smart Hybrid','Sigma Smart Hybrid','Sigma Smart Hybrid',1,NULL,1,NULL,NULL,NULL,NULL,3),(40,12,'Delta Smart Hybrid','Delta Smart Hybrid','Delta Smart Hybrid',1,NULL,1,NULL,NULL,NULL,NULL,3),(41,12,'Delta Smart Hybrid AT','Delta Smart Hybrid AT','Delta Smart Hybrid AT',1,NULL,1,NULL,NULL,NULL,NULL,3),(42,12,'Zeta Smart Hybrid','Zeta Smart Hybrid','Zeta Smart Hybrid',1,NULL,1,NULL,NULL,NULL,NULL,3),(43,12,'Zeta Smart Hybrid AT','Zeta Smart Hybrid AT','Zeta Smart Hybrid AT',1,NULL,1,NULL,NULL,NULL,NULL,3),(44,12,'Alpha Smart Hybrid','Alpha Smart Hybrid','Alpha Smart Hybrid',1,NULL,1,NULL,NULL,NULL,NULL,3),(45,12,'Alpha Dual Tone Smart Hybrid','Alpha Dual Tone Smart Hybrid','Alpha Dual Tone Smart Hybrid',1,NULL,1,NULL,NULL,NULL,NULL,3),(46,12,'Alpha Smart Hybrid AT','Alpha Smart Hybrid AT','Alpha Smart Hybrid AT',1,NULL,1,NULL,NULL,NULL,NULL,3),(47,12,'Alpha Smart Hybrid AllGrip','Alpha Smart Hybrid AllGrip','Alpha Smart Hybrid AllGrip',1,NULL,1,NULL,NULL,NULL,NULL,3),(48,12,'Alpha Dual Tone Smart Hybrid AT','Alpha Dual Tone Smart Hybrid AT','Alpha Dual Tone Smart Hybrid AT',1,NULL,1,NULL,NULL,NULL,NULL,3),(49,12,'Alpha Dual Tone Smart Hybrid AllGrip','Alpha Dual Tone Smart Hybrid AllGrip','Alpha Dual Tone Smart Hybrid AllGrip',1,NULL,1,NULL,NULL,NULL,NULL,3),(50,12,'Zeta Plus Intelligent Hybrid eCVT','Zeta Plus Intelligent Hybrid eCVT','Zeta Plus Intelligent Hybrid eCVT',1,NULL,1,NULL,NULL,NULL,NULL,3),(51,12,'Zeta Plus Dual Tone Intelligent Hybrid eCVT','Zeta Plus Dual Tone Intelligent Hybrid eCVT','Zeta Plus Dual Tone Intelligent Hybrid eCVT',1,NULL,1,NULL,NULL,NULL,NULL,3),(52,12,'Alpha Plus Intelligent Hybrid eCVT','Alpha Plus Intelligent Hybrid eCVT','Alpha Plus Intelligent Hybrid eCVT',1,NULL,1,NULL,NULL,NULL,NULL,3),(53,12,'Alpha Plus Dual Tone Intelligent Hybrid eCVT','Alpha Plus Dual Tone Intelligent Hybrid eCVT','Alpha Plus Dual Tone Intelligent Hybrid eCVT',1,NULL,1,NULL,NULL,NULL,NULL,3),(54,13,'Zeta MT','Zeta MT','Zeta MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(55,13,'Alpha MT','Alpha MT','Alpha MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(56,13,'Alpha MT Dual Tone','Alpha MT Dual Tone','Alpha MT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(57,13,'Zeta AT','Zeta AT','Zeta AT',1,NULL,1,NULL,NULL,NULL,NULL,1),(58,13,'Alpha AT','Alpha AT','Alpha AT',1,NULL,1,NULL,NULL,NULL,NULL,1),(59,13,'Alpha AT Dual Tone','Alpha AT Dual Tone','Alpha AT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(60,14,'LXi','LXi','LXi',1,NULL,1,NULL,NULL,NULL,NULL,1),(61,14,'VXi','VXi','VXi',1,NULL,1,NULL,NULL,NULL,NULL,1),(62,14,'ZXi','ZXi','ZXi',1,NULL,1,NULL,NULL,NULL,NULL,1),(63,14,'Vxi AT','Vxi AT','Vxi AT',1,NULL,1,NULL,NULL,NULL,NULL,1),(64,14,'Zxi Dual Tone','Zxi Dual Tone','Zxi Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(65,14,'ZXi Plus','ZXi Plus','ZXi Plus',1,NULL,1,NULL,NULL,NULL,NULL,1),(66,14,'ZXi AT','ZXi AT','ZXi AT',1,NULL,1,NULL,NULL,NULL,NULL,1),(67,14,'Zxi Plus Dual Tone','Zxi Plus Dual Tone','Zxi Plus Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(68,14,'Zxi AT Dual Tone','Zxi AT Dual Tone','Zxi AT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(69,14,'ZXi Plus AT','ZXi Plus AT','ZXi Plus AT',1,NULL,1,NULL,NULL,NULL,NULL,1),(70,14,'Zxi Plus AT Dual Tone','Zxi Plus AT Dual Tone','Zxi Plus AT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(71,15,'STD (O)','STD (O)','STD (O)',1,NULL,1,NULL,NULL,NULL,NULL,1),(72,15,'LXi (O)','LXi (O)','LXi (O)',1,NULL,1,NULL,NULL,NULL,NULL,1),(73,15,'VXi','VXi','VXi',1,NULL,1,NULL,NULL,NULL,NULL,1),(74,15,'Vxi Plus','Vxi Plus','Vxi Plus',1,NULL,1,NULL,NULL,NULL,NULL,1),(75,16,'Std','Std','Std',1,NULL,1,NULL,NULL,NULL,NULL,1),(76,16,'LXi','LXi','LXi',1,NULL,1,NULL,NULL,NULL,NULL,1),(77,16,'VXi','VXi','VXi',1,NULL,1,NULL,NULL,NULL,NULL,1),(78,16,'VXi Plus','VXi Plus','VXi Plus',1,NULL,1,NULL,NULL,NULL,NULL,1),(79,16,'VXi AGS','VXi AGS','VXi AGS',1,NULL,1,NULL,NULL,NULL,NULL,1),(80,16,'VXi Plus AGS','VXi Plus AGS','VXi Plus AGS',1,NULL,1,NULL,NULL,NULL,NULL,1),(81,17,'LXi (O)','LXi (O)','LXi (O)',1,NULL,1,NULL,NULL,NULL,NULL,1),(82,17,'VXi (O)','VXi (O)','VXi (O)',1,NULL,1,NULL,NULL,NULL,NULL,1),(83,17,'ZXi (O)','ZXi (O)','ZXi (O)',1,NULL,1,NULL,NULL,NULL,NULL,1),(84,17,'VXi AT','VXi AT','VXi AT',1,NULL,1,NULL,NULL,NULL,NULL,1),(85,17,'ZXi Plus','ZXi Plus','ZXi Plus',1,NULL,1,NULL,NULL,NULL,NULL,1),(86,17,'ZXi AT','ZXi AT','ZXi AT',1,NULL,1,NULL,NULL,NULL,NULL,1),(87,17,'ZXi Plus AT','ZXi Plus AT','ZXi Plus AT',1,NULL,1,NULL,NULL,NULL,NULL,1),(88,18,'LXi','LXi','LXi',1,NULL,1,NULL,NULL,NULL,NULL,1),(89,18,'VXi','VXi','VXi',1,NULL,1,NULL,NULL,NULL,NULL,1),(90,18,'VXi AMT','VXi AMT','VXi AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(91,18,'ZXi','ZXi','ZXi',1,NULL,1,NULL,NULL,NULL,NULL,1),(92,18,'ZXi AMT','ZXi AMT','ZXi AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(93,18,'ZXi Plus','ZXi Plus','ZXi Plus',1,NULL,1,NULL,NULL,NULL,NULL,1),(94,18,'ZXi Plus Dual Tone','ZXi Plus Dual Tone','ZXi Plus Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(95,18,'ZXi Plus AMT','ZXi Plus AMT','ZXi Plus AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(96,18,'ZXi Plus AMT Dual Tone','ZXi Plus AMT Dual Tone','ZXi Plus AMT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(97,19,'LXi','LXi','LXi',1,NULL,1,NULL,NULL,NULL,NULL,1),(98,19,'VXi','VXi','VXi',1,NULL,1,NULL,NULL,NULL,NULL,1),(99,19,'VXi AMT','VXi AMT','VXi AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(100,19,'ZXi','ZXi','ZXi',1,NULL,1,NULL,NULL,NULL,NULL,1),(101,19,'ZXi AMT','ZXi AMT','ZXi AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(102,19,'ZXi Plus','ZXi Plus','ZXi Plus',1,NULL,1,NULL,NULL,NULL,NULL,1),(103,19,'ZXi Plus Dual Tone','ZXi Plus Dual Tone','ZXi Plus Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(104,19,'ZXi Plus AMT','ZXi Plus AMT','ZXi Plus AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(105,19,'ZXi Plus AMT Dual Tone','ZXi Plus AMT Dual Tone','ZXi Plus AMT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(106,20,'Sigma 1.2 MT','Sigma 1.2 MT','Sigma 1.2 MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(107,20,'Delta 1.2 MT','Delta 1.2 MT','Delta 1.2 MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(108,20,'Delta 1.2 AMT','Delta 1.2 AMT','Delta 1.2 AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(109,20,'Zeta 1.2 MT','Zeta 1.2 MT','Zeta 1.2 MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(110,20,'Zeta 1.2 MT Dual Tone','Zeta 1.2 MT Dual Tone','Zeta 1.2 MT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(111,20,'Zeta 1.2 AMT','Zeta 1.2 AMT','Zeta 1.2 AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(112,20,'Alpha 1.2 MT','Alpha 1.2 MT','Alpha 1.2 MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(113,20,'Zeta 1.2 AMT Dual Tone','Zeta 1.2 AMT Dual Tone','Zeta 1.2 AMT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(114,20,'Alpha 1.2 MT Dual Tone','Alpha 1.2 MT Dual Tone','Alpha 1.2 MT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(115,20,'Alpha 1.2 AMT','Alpha 1.2 AMT','Alpha 1.2 AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(116,20,'Alpha 1.2 AMT Dual Tone','Alpha 1.2 AMT Dual Tone','Alpha 1.2 AMT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(117,21,'Zeta MT Petrol','Zeta MT Petrol','Zeta MT Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(118,22,'Alpha MT Petrol','Alpha MT Petrol','Alpha MT Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(119,23,'Zeta AT Petrol','Zeta AT Petrol','Zeta AT Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(120,24,'Alpha Plus MT Petrol','Alpha Plus MT Petrol','Alpha Plus MT Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(121,25,'Alpha Plus MT Petrol Dual Tone','Alpha Plus MT Petrol Dual Tone','Alpha Plus MT Petrol Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(122,26,'Alpha AT Petrol','Alpha AT Petrol','Alpha AT Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(123,27,'Alpha Plus AT Petrol','Alpha Plus AT Petrol','Alpha Plus AT Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(124,28,'Alpha Plus AT Petrol Dual Tone','Alpha Plus AT Petrol Dual Tone','Alpha Plus AT Petrol Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(125,29,'LXi','LXi','LXi',1,NULL,1,NULL,NULL,NULL,NULL,1),(126,29,'VXi','VXi','VXi',1,NULL,1,NULL,NULL,NULL,NULL,1),(127,29,'VXi AGS','VXi AGS','VXi AGS',1,NULL,1,NULL,NULL,NULL,NULL,1),(128,29,'ZXi','ZXi','ZXi',1,NULL,1,NULL,NULL,NULL,NULL,1),(129,29,'ZXi AGS','ZXi AGS','ZXi AGS',1,NULL,1,NULL,NULL,NULL,NULL,1),(130,29,'ZXi Plus','ZXi Plus','ZXi Plus',1,NULL,1,NULL,NULL,NULL,NULL,1),(131,29,'ZXi Plus AGS','ZXi Plus AGS','ZXi Plus AGS',1,NULL,1,NULL,NULL,NULL,NULL,1),(132,30,'Std','Std','Std',1,NULL,1,NULL,NULL,NULL,NULL,1),(133,30,'LXi','LXi','LXi',1,NULL,1,NULL,NULL,NULL,NULL,1),(134,30,'VXi','VXi','VXi',1,NULL,1,NULL,NULL,NULL,NULL,1),(135,30,'Vxi Plus','Vxi Plus','Vxi Plus',1,NULL,1,NULL,NULL,NULL,NULL,1),(136,30,'VXi (O) AMT','VXi (O) AMT','VXi (O) AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(137,30,'VXi Plus (O) AMT','VXi Plus (O) AMT','VXi Plus (O) AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(138,31,'LXi','LXi','LXi',1,NULL,1,NULL,NULL,NULL,NULL,1),(139,31,'VXi','VXi','VXi',1,NULL,1,NULL,NULL,NULL,NULL,1),(140,31,'ZXi','ZXi','ZXi',1,NULL,1,NULL,NULL,NULL,NULL,1),(141,31,'VXi AMT','VXi AMT','VXi AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(142,31,'ZXi Plus','ZXi Plus','ZXi Plus',1,NULL,1,NULL,NULL,NULL,NULL,1),(143,31,'ZXi AMT','ZXi AMT','ZXi AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(144,31,'ZXi Plus AMT','ZXi Plus AMT','ZXi Plus AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(145,32,'Sigma 1.5','Sigma 1.5','Sigma 1.5',1,NULL,1,NULL,NULL,NULL,NULL,1),(146,32,'Delta 1.5','Delta 1.5','Delta 1.5',1,NULL,1,NULL,NULL,NULL,NULL,1),(147,32,'Zeta 1.5','Zeta 1.5','Zeta 1.5',1,NULL,1,NULL,NULL,NULL,NULL,1),(148,32,'Alpha 1.5','Alpha 1.5','Alpha 1.5',1,NULL,1,NULL,NULL,NULL,NULL,1),(149,32,'Delta 1.5 AT','Delta 1.5 AT','Delta 1.5 AT',1,NULL,1,NULL,NULL,NULL,NULL,1),(150,32,'Alpha 1.5 Dual Tone','Alpha 1.5 Dual Tone','Alpha 1.5 Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(151,32,'Zeta 1.5 AT','Zeta 1.5 AT','Zeta 1.5 AT',1,NULL,1,NULL,NULL,NULL,NULL,1),(152,32,'Alpha 1.5 AT','Alpha 1.5 AT','Alpha 1.5 AT',1,NULL,1,NULL,NULL,NULL,NULL,1),(153,32,'Alpha 1.5 AT Dual Tone','Alpha 1.5 AT Dual Tone','Alpha 1.5 AT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(154,33,'5 STR STD','5 STR STD','5 STR STD',1,NULL,1,NULL,NULL,NULL,NULL,1),(155,33,'7 STR STD','7 STR STD','7 STR STD',1,NULL,1,NULL,NULL,NULL,NULL,1),(156,33,'5 STR AC','5 STR AC','5 STR AC',1,NULL,1,NULL,NULL,NULL,NULL,1),(157,34,'XE','XE','XE',1,NULL,1,NULL,NULL,NULL,NULL,1),(158,34,'XM','XM','XM',1,NULL,1,NULL,NULL,NULL,NULL,1),(159,34,'XM (S)','XM (S)','XM (S)',1,NULL,1,NULL,NULL,NULL,NULL,1),(160,34,'XMA','XMA','XMA',1,NULL,1,NULL,NULL,NULL,NULL,1),(161,34,'XZA Plus LUXS Kaziranga','XZA Plus LUXS Kaziranga','XZA Plus LUXS Kaziranga',1,NULL,1,NULL,NULL,NULL,NULL,1),(162,34,'XM Plus (S)','XM Plus (S)','XM Plus (S)',1,NULL,1,NULL,NULL,NULL,NULL,1),(163,34,'XMA (S)','XMA (S)','XMA (S)',1,NULL,1,NULL,NULL,NULL,NULL,1),(164,34,'XZ Plus','XZ Plus','XZ Plus',1,NULL,1,NULL,NULL,NULL,NULL,1),(165,34,'XMA Plus (S)','XMA Plus (S)','XMA Plus (S)',1,NULL,1,NULL,NULL,NULL,NULL,1),(166,34,'XZA Plus LUXS Dual Tone','XZA Plus LUXS Dual Tone','XZA Plus LUXS Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(167,34,'XZ Plus Dark Edition','XZ Plus Dark Edition','XZ Plus Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,1),(168,34,'XZA Plus','XZA Plus','XZA Plus',1,NULL,1,NULL,NULL,NULL,NULL,1),(169,34,'XZ Plus (S)','XZ Plus (S)','XZ Plus (S)',1,NULL,1,NULL,NULL,NULL,NULL,1),(170,34,'XZA Plus LUXS Dark Edition','XZA Plus LUXS Dark Edition','XZA Plus LUXS Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,1),(171,34,'XZA Plus LUXS Jet','XZA Plus LUXS Jet','XZA Plus LUXS Jet',1,NULL,1,NULL,NULL,NULL,NULL,1),(172,34,'XZ Plus (S) Dual tone','XZ Plus (S) Dual tone','XZ Plus (S) Dual tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(173,34,'XZA Plus Dark Edition','XZA Plus Dark Edition','XZA Plus Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,1),(174,34,'XZ Plus (S) Dark Edition','XZ Plus (S) Dark Edition','XZ Plus (S) Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,1),(175,34,'XZ Plus LUX','XZ Plus LUX','XZ Plus LUX',1,NULL,1,NULL,NULL,NULL,NULL,1),(176,34,'XZ Plus LUX Dual Tone','XZ Plus LUX Dual Tone','XZ Plus LUX Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(177,34,'XZA Plus LUXS Red Dark Edition','XZA Plus LUXS Red Dark Edition','XZA Plus LUXS Red Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,1),(178,34,'XZ Plus LUX Dark Edition','XZ Plus LUX Dark Edition','XZ Plus LUX Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,1),(179,34,'XZA Plus (S)','XZA Plus (S)','XZA Plus (S)',1,NULL,1,NULL,NULL,NULL,NULL,1),(180,34,'XZA Plus LUXS','XZA Plus LUXS','XZA Plus LUXS',1,NULL,1,NULL,NULL,NULL,NULL,1),(181,34,'XZA Plus (S) Dual tone','XZA Plus (S) Dual tone','XZA Plus (S) Dual tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(182,34,'XZ Plus LUXS','XZ Plus LUXS','XZ Plus LUXS',1,NULL,1,NULL,NULL,NULL,NULL,1),(183,34,'XZA Plus (S) Dark Edition','XZA Plus (S) Dark Edition','XZA Plus (S) Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,1),(184,34,'XZ Plus LUXS Kaziranga','XZ Plus LUXS Kaziranga','XZ Plus LUXS Kaziranga',1,NULL,1,NULL,NULL,NULL,NULL,1),(185,34,'XZ Plus LUXS Dual Tone','XZ Plus LUXS Dual Tone','XZ Plus LUXS Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(186,34,'XZA Plus LUX','XZA Plus LUX','XZA Plus LUX',1,NULL,1,NULL,NULL,NULL,NULL,1),(187,34,'XZ Plus LUXS Dark Edition','XZ Plus LUXS Dark Edition','XZ Plus LUXS Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,1),(188,34,'XZ Plus LUXS Jet','XZ Plus LUXS Jet','XZ Plus LUXS Jet',1,NULL,1,NULL,NULL,NULL,NULL,1),(189,34,'XZ Plus LUXS Red Dark Edition','XZ Plus LUXS Red Dark Edition','XZ Plus LUXS Red Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,1),(190,34,'XZA Plus LUX Dual Tone','XZA Plus LUX Dual Tone','XZA Plus LUX Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(191,34,'XZA Plus LUX Dark Edition','XZA Plus LUX Dark Edition','XZA Plus LUX Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,1),(192,34,'XZA Plus Diesel','XZA Plus Diesel','XZA Plus Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(193,34,'XZ Plus (S) Diesel','XZ Plus (S) Diesel','XZ Plus (S) Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(194,34,'XZ Plus (S) Diesel Dual tone','XZ Plus (S) Diesel Dual tone','XZ Plus (S) Diesel Dual tone',1,NULL,1,NULL,NULL,NULL,NULL,2),(195,34,'XZA Plus Diesel Dark Edition','XZA Plus Diesel Dark Edition','XZA Plus Diesel Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(196,34,'XZ Plus (S) Diesel Dark Edition','XZ Plus (S) Diesel Dark Edition','XZ Plus (S) Diesel Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(197,34,'XZ Plus LUX Diesel','XZ Plus LUX Diesel','XZ Plus LUX Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(198,34,'XZ Plus LUX Diesel Dual Tone','XZ Plus LUX Diesel Dual Tone','XZ Plus LUX Diesel Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,2),(199,34,'XZ Plus LUX Diesel Dark Edition','XZ Plus LUX Diesel Dark Edition','XZ Plus LUX Diesel Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(200,34,'XZ Plus LUXS Diesel','XZ Plus LUXS Diesel','XZ Plus LUXS Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(201,34,'XZ Plus LUXS Diesel Kaziranga','XZ Plus LUXS Diesel Kaziranga','XZ Plus LUXS Diesel Kaziranga',1,NULL,1,NULL,NULL,NULL,NULL,2),(202,34,'XZ Plus LUXS Diesel Dual Tone','XZ Plus LUXS Diesel Dual Tone','XZ Plus LUXS Diesel Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,2),(203,34,'XZA Plus LUX Diesel','XZA Plus LUX Diesel','XZA Plus LUX Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(204,34,'XZ Plus LUXS Diesel Dark Edition','XZ Plus LUXS Diesel Dark Edition','XZ Plus LUXS Diesel Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(205,34,'XZ Plus LUXS Diesel Jet','XZ Plus LUXS Diesel Jet','XZ Plus LUXS Diesel Jet',1,NULL,1,NULL,NULL,NULL,NULL,2),(206,34,'XZ Plus LUXS Diesel Red Dark Edition','XZ Plus LUXS Diesel Red Dark Edition','XZ Plus LUXS Diesel Red Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(207,34,'XZA Plus LUX Diesel Dual Tone','XZA Plus LUX Diesel Dual Tone','XZA Plus LUX Diesel Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,2),(208,34,'XZA Plus LUX Diesel Dark Edition','XZA Plus LUX Diesel Dark Edition','XZA Plus LUX Diesel Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(209,34,'XZA Plus LUXS Diesel','XZA Plus LUXS Diesel','XZA Plus LUXS Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(210,34,'XZA Plus LUXS Diesel Kaziranga','XZA Plus LUXS Diesel Kaziranga','XZA Plus LUXS Diesel Kaziranga',1,NULL,1,NULL,NULL,NULL,NULL,2),(211,34,'XZA Plus LUXS Diesel Dual Tone','XZA Plus LUXS Diesel Dual Tone','XZA Plus LUXS Diesel Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,2),(212,34,'XZA Plus LUXS Diesel Jet','XZA Plus LUXS Diesel Jet','XZA Plus LUXS Diesel Jet',1,NULL,1,NULL,NULL,NULL,NULL,2),(213,34,'XZA Plus LUXS Diesel Red Dark Edition','XZA Plus LUXS Diesel Red Dark Edition','XZA Plus LUXS Diesel Red Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(214,34,'XM (S) Diesel','XM (S) Diesel','XM (S) Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(215,34,'XZ Plus Diesel','XZ Plus Diesel','XZ Plus Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(216,34,'XMA Plus (S) Diesel','XMA Plus (S) Diesel','XMA Plus (S) Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(217,34,'XZ Plus Diesel Dark Edition','XZ Plus Diesel Dark Edition','XZ Plus Diesel Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(218,34,'XMA (S) Diesel','XMA (S) Diesel','XMA (S) Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(219,34,'XM Plus (S) Diesel','XM Plus (S) Diesel','XM Plus (S) Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(220,34,'XM Diesel','XM Diesel','XM Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(221,34,'XZA Plus LUXS Diesel Dark Edition','XZA Plus LUXS Diesel Dark Edition','XZA Plus LUXS Diesel Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(222,35,'Pure MT','Pure MT','Pure MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(223,35,'Pure Rhythm Pack MT','Pure Rhythm Pack MT','Pure Rhythm Pack MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(224,35,'Adventure MT','Adventure MT','Adventure MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(225,35,'Camo Adventure MT','Camo Adventure MT','Camo Adventure MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(226,35,'Adventure Rhythm Pack MT','Adventure Rhythm Pack MT','Adventure Rhythm Pack MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(227,35,'Camo Adventure Rhythm MT','Camo Adventure Rhythm MT','Camo Adventure Rhythm MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(228,35,'Adventure AMT','Adventure AMT','Adventure AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(229,35,'Camo Adventure AMT','Camo Adventure AMT','Camo Adventure AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(230,35,'Accomplished MT','Accomplished MT','Accomplished MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(231,35,'Camo Accomplished MT','Camo Accomplished MT','Camo Accomplished MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(232,35,'Adventure Rhythm Pack AMT','Adventure Rhythm Pack AMT','Adventure Rhythm Pack AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(233,35,'Camo Adventure Rhythm AMT','Camo Adventure Rhythm AMT','Camo Adventure Rhythm AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(234,35,'Accomplished Dazzle Pack MT','Accomplished Dazzle Pack MT','Accomplished Dazzle Pack MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(235,35,'Camo Accomplished Dazzle MT','Camo Accomplished Dazzle MT','Camo Accomplished Dazzle MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(236,35,'Accomplished AMT','Accomplished AMT','Accomplished AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(237,35,'Camo Accomplished AMT','Camo Accomplished AMT','Camo Accomplished AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(238,35,'Creative MT','Creative MT','Creative MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(239,35,'Creative Dual Tone','Creative Dual Tone','Creative Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(240,35,'Accomplished Dazzle Pack AMT','Accomplished Dazzle Pack AMT','Accomplished Dazzle Pack AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(241,35,'Camo Accomplished Dazzle AMT','Camo Accomplished Dazzle AMT','Camo Accomplished Dazzle AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(242,35,'Creative iRA Pack MT','Creative iRA Pack MT','Creative iRA Pack MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(243,35,'Creative IRA Dual Tone','Creative IRA Dual Tone','Creative IRA Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(244,35,'Creative AMT','Creative AMT','Creative AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(245,35,'Creative Dual Tone AMT','Creative Dual Tone AMT','Creative Dual Tone AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(246,35,'Creative iRA Pack AMT','Creative iRA Pack AMT','Creative iRA Pack AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(247,35,'Creative IRA AMT Dual Tone','Creative IRA AMT Dual Tone','Creative IRA AMT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(248,36,'XE Plus Diesel','XE Plus Diesel','XE Plus Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(249,36,'XM Plus Diesel','XM Plus Diesel','XM Plus Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(250,36,'XM Plus (S) Diesel','XM Plus (S) Diesel','XM Plus (S) Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(251,36,'XZ Diesel','XZ Diesel','XZ Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(252,36,'XZ Plus (S) Dark Edition Diesel','XZ Plus (S) Dark Edition Diesel','XZ Plus (S) Dark Edition Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(253,36,'XZ Plus Diesel','XZ Plus Diesel','XZ Plus Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(254,36,'XZ Plus (S) Diesel','XZ Plus (S) Diesel','XZ Plus (S) Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(255,36,'XZ Plus Diesel Dark Edition','XZ Plus Diesel Dark Edition','XZ Plus Diesel Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(256,36,'XT Diesel','XT Diesel','XT Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(257,36,'XE Petrol','XE Petrol','XE Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(258,36,'XE Plus Petrol','XE Plus Petrol','XE Plus Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(259,36,'XM Plus Petrol','XM Plus Petrol','XM Plus Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(260,36,'XM Plus (S)','XM Plus (S)','XM Plus (S)',1,NULL,1,NULL,NULL,NULL,NULL,1),(261,36,'XT Petrol','XT Petrol','XT Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(262,36,'XT Petrol Dark Edition','XT Petrol Dark Edition','XT Petrol Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,1),(263,36,'XZ Petrol','XZ Petrol','XZ Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(264,36,'XMA Plus Petrol','XMA Plus Petrol','XMA Plus Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(265,36,'XMA Plus (S)','XMA Plus (S)','XMA Plus (S)',1,NULL,1,NULL,NULL,NULL,NULL,1),(266,36,'XZ Plus Petrol','XZ Plus Petrol','XZ Plus Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(267,36,'XZ Plus (S)','XZ Plus (S)','XZ Plus (S)',1,NULL,1,NULL,NULL,NULL,NULL,1),(268,36,'XZ i-Turbo Petrol','XZ i-Turbo Petrol','XZ i-Turbo Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(269,36,'XTA Petrol','XTA Petrol','XTA Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(270,36,'XZ Plus Petrol Dark Edition','XZ Plus Petrol Dark Edition','XZ Plus Petrol Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,1),(271,36,'XZ Plus (S) Dark Edition','XZ Plus (S) Dark Edition','XZ Plus (S) Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,1),(272,36,'XTA Petrol Dark Edtion','XTA Petrol Dark Edtion','XTA Petrol Dark Edtion',1,NULL,1,NULL,NULL,NULL,NULL,1),(273,36,'XZ Plus (O) (S)','XZ Plus (O) (S)','XZ Plus (O) (S)',1,NULL,1,NULL,NULL,NULL,NULL,1),(274,36,'XZ Plus i-Turbo Petrol','XZ Plus i-Turbo Petrol','XZ Plus i-Turbo Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(275,36,'XZA Petrol','XZA Petrol','XZA Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(276,36,'XZ Plus i-Turbo (S)','XZ Plus i-Turbo (S)','XZ Plus i-Turbo (S)',1,NULL,1,NULL,NULL,NULL,NULL,1),(277,36,'XZ Plus i-Turbo Petrol Dark Edition','XZ Plus i-Turbo Petrol Dark Edition','XZ Plus i-Turbo Petrol Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,1),(278,36,'XZA Plus (S)','XZA Plus (S)','XZA Plus (S)',1,NULL,1,NULL,NULL,NULL,NULL,1),(279,36,'XZA Plus Petrol Dark Edtion','XZA Plus Petrol Dark Edtion','XZA Plus Petrol Dark Edtion',1,NULL,1,NULL,NULL,NULL,NULL,1),(280,36,'XZA Plus Petrol','XZA Plus Petrol','XZA Plus Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(281,36,'XZ Plus i-Turbo (S) Dark Edition','XZ Plus i-Turbo (S) Dark Edition','XZ Plus i-Turbo (S) Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,1),(282,36,'XZA Plus (S) Dark Edition','XZA Plus (S) Dark Edition','XZA Plus (S) Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,1),(283,36,'XZA Plus (O) (S)','XZA Plus (O) (S)','XZA Plus (O) (S)',1,NULL,1,NULL,NULL,NULL,NULL,1),(284,37,'XE','XE','XE',1,NULL,1,NULL,NULL,NULL,NULL,2),(285,37,'XM','XM','XM',1,NULL,1,NULL,NULL,NULL,NULL,2),(286,37,'XMS','XMS','XMS',1,NULL,1,NULL,NULL,NULL,NULL,2),(287,37,'XT Plus','XT Plus','XT Plus',1,NULL,1,NULL,NULL,NULL,NULL,2),(288,37,'XMAS','XMAS','XMAS',1,NULL,1,NULL,NULL,NULL,NULL,2),(289,37,'XT Plus Dark Editon','XT Plus Dark Editon','XT Plus Dark Editon',1,NULL,1,NULL,NULL,NULL,NULL,2),(290,37,'XZ','XZ','XZ',1,NULL,1,NULL,NULL,NULL,NULL,2),(291,37,'XZ Dual Tone','XZ Dual Tone','XZ Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,2),(292,37,'XTA Plus','XTA Plus','XTA Plus',1,NULL,1,NULL,NULL,NULL,NULL,2),(293,37,'XTA Plus Dark Edition','XTA Plus Dark Edition','XTA Plus Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(294,37,'XZA','XZA','XZA',1,NULL,1,NULL,NULL,NULL,NULL,2),(295,37,'XZA Dual Tone','XZA Dual Tone','XZA Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,2),(296,37,'XZ Plus','XZ Plus','XZ Plus',1,NULL,1,NULL,NULL,NULL,NULL,2),(297,37,'XZ Plus Dual Tone','XZ Plus Dual Tone','XZ Plus Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,2),(298,37,'XZ Plus Dark Edition','XZ Plus Dark Edition','XZ Plus Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(299,37,'XZ Plus Red Dark Edition','XZ Plus Red Dark Edition','XZ Plus Red Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(300,37,'XZA Plus','XZA Plus','XZA Plus',1,NULL,1,NULL,NULL,NULL,NULL,2),(301,37,'XZA Plus Dual Tone','XZA Plus Dual Tone','XZA Plus Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,2),(302,37,'XZA Plus Dark Edition','XZA Plus Dark Edition','XZA Plus Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(303,37,'XZA Plus Red Dark Edition','XZA Plus Red Dark Edition','XZA Plus Red Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(304,37,'XZA Plus (O)','XZA Plus (O)','XZA Plus (O)',1,NULL,1,NULL,NULL,NULL,NULL,2),(305,37,'XZA Plus (O) Dual Tone','XZA Plus (O) Dual Tone','XZA Plus (O) Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,2),(306,37,'XZA Plus (O) Dark Edition','XZA Plus (O) Dark Edition','XZA Plus (O) Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(307,37,'XZA Plus (O) Red Dark Edition','XZA Plus (O) Red Dark Edition','XZA Plus (O) Red Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(308,38,'XE','XE','XE',1,NULL,1,NULL,NULL,NULL,NULL,2),(309,38,'XM','XM','XM',1,NULL,1,NULL,NULL,NULL,NULL,2),(310,38,'XMS','XMS','XMS',1,NULL,1,NULL,NULL,NULL,NULL,2),(311,38,'XT Plus','XT Plus','XT Plus',1,NULL,1,NULL,NULL,NULL,NULL,2),(312,38,'XMAS','XMAS','XMAS',1,NULL,1,NULL,NULL,NULL,NULL,2),(313,38,'XT Plus Dark Edition','XT Plus Dark Edition','XT Plus Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(314,38,'XZ','XZ','XZ',1,NULL,1,NULL,NULL,NULL,NULL,2),(315,38,'XTA Plus','XTA Plus','XTA Plus',1,NULL,1,NULL,NULL,NULL,NULL,2),(316,38,'XTA Plus Dark Edition','XTA Plus Dark Edition','XTA Plus Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(317,38,'XZA','XZA','XZA',1,NULL,1,NULL,NULL,NULL,NULL,2),(318,38,'XZ Plus','XZ Plus','XZ Plus',1,NULL,1,NULL,NULL,NULL,NULL,2),(319,38,'XZ Plus 6 S','XZ Plus 6 S','XZ Plus 6 S',1,NULL,1,NULL,NULL,NULL,NULL,2),(320,38,'XZ Plus Adventure','XZ Plus Adventure','XZ Plus Adventure',1,NULL,1,NULL,NULL,NULL,NULL,2),(321,38,'XZ Plus Dark Edition','XZ Plus Dark Edition','XZ Plus Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(322,38,'XZ Plus 6S Adventure','XZ Plus 6S Adventure','XZ Plus 6S Adventure',1,NULL,1,NULL,NULL,NULL,NULL,2),(323,38,'XZ Plus Red Dark Edition','XZ Plus Red Dark Edition','XZ Plus Red Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(324,38,'XZ Plus 6 S Dark Edition','XZ Plus 6 S Dark Edition','XZ Plus 6 S Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(325,38,'XZ Plus 6 S Red Dark Edition','XZ Plus 6 S Red Dark Edition','XZ Plus 6 S Red Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(326,38,'XZA Plus','XZA Plus','XZA Plus',1,NULL,1,NULL,NULL,NULL,NULL,2),(327,38,'XZA Plus 6S','XZA Plus 6S','XZA Plus 6S',1,NULL,1,NULL,NULL,NULL,NULL,2),(328,38,'XZA Plus Adventure','XZA Plus Adventure','XZA Plus Adventure',1,NULL,1,NULL,NULL,NULL,NULL,2),(329,38,'XZA Plus 6S Adventure','XZA Plus 6S Adventure','XZA Plus 6S Adventure',1,NULL,1,NULL,NULL,NULL,NULL,2),(330,38,'XZA Plus Dark Edition','XZA Plus Dark Edition','XZA Plus Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(331,38,'XZA Plus 6 S Dark Edition','XZA Plus 6 S Dark Edition','XZA Plus 6 S Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(332,38,'XZA Plus Red Dark Edition','XZA Plus Red Dark Edition','XZA Plus Red Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(333,38,'XZA Plus 6 S Red Dark Edition','XZA Plus 6 S Red Dark Edition','XZA Plus 6 S Red Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(334,38,'XZA Plus (O)','XZA Plus (O)','XZA Plus (O)',1,NULL,1,NULL,NULL,NULL,NULL,2),(335,38,'XZA Plus (O) 6 S','XZA Plus (O) 6 S','XZA Plus (O) 6 S',1,NULL,1,NULL,NULL,NULL,NULL,2),(336,38,'XZA Plus (O) Adventure','XZA Plus (O) Adventure','XZA Plus (O) Adventure',1,NULL,1,NULL,NULL,NULL,NULL,2),(337,38,'XZA Plus (O) 6 S Adventure','XZA Plus (O) 6 S Adventure','XZA Plus (O) 6 S Adventure',1,NULL,1,NULL,NULL,NULL,NULL,2),(338,38,'XZA Plus (O) Dark Edition','XZA Plus (O) Dark Edition','XZA Plus (O) Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(339,38,'XZA Plus (O) Red Dark Edition','XZA Plus (O) Red Dark Edition','XZA Plus (O) Red Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(340,38,'XZA Plus (O) 6 S Dark Edition','XZA Plus (O) 6 S Dark Edition','XZA Plus (O) 6 S Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(341,38,'XZA Plus (O) 6 S Red Dark Edition','XZA Plus (O) 6 S Red Dark Edition','XZA Plus (O) 6 S Red Dark Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(342,39,'XE','XE','XE',1,NULL,1,NULL,NULL,NULL,NULL,1),(343,39,'XT (O)','XT (O)','XT (O)',1,NULL,1,NULL,NULL,NULL,NULL,1),(344,39,'XT','XT','XT',1,NULL,1,NULL,NULL,NULL,NULL,1),(345,39,'XT Rhythm','XT Rhythm','XT Rhythm',1,NULL,1,NULL,NULL,NULL,NULL,1),(346,39,'XTA','XTA','XTA',1,NULL,1,NULL,NULL,NULL,NULL,1),(347,39,'XZ Plus','XZ Plus','XZ Plus',1,NULL,1,NULL,NULL,NULL,NULL,1),(348,39,'XZ Plus Dual Tone','XZ Plus Dual Tone','XZ Plus Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(349,39,'XZA Plus','XZA Plus','XZA Plus',1,NULL,1,NULL,NULL,NULL,NULL,1),(350,39,'XZA Plus Dual Tone','XZA Plus Dual Tone','XZA Plus Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(351,40,'XE','XE','XE',1,NULL,1,NULL,NULL,NULL,NULL,1),(352,40,'XM','XM','XM',1,NULL,1,NULL,NULL,NULL,NULL,1),(353,40,'XZ','XZ','XZ',1,NULL,1,NULL,NULL,NULL,NULL,1),(354,40,'XMA','XMA','XMA',1,NULL,1,NULL,NULL,NULL,NULL,1),(355,40,'XZ Plus','XZ Plus','XZ Plus',1,NULL,1,NULL,NULL,NULL,NULL,1),(356,40,'XZ Plus Leatherette Pack','XZ Plus Leatherette Pack','XZ Plus Leatherette Pack',1,NULL,1,NULL,NULL,NULL,NULL,1),(357,40,'XZA Plus','XZA Plus','XZA Plus',1,NULL,1,NULL,NULL,NULL,NULL,1),(358,40,'XZA Plus Leatherette Pack','XZA Plus Leatherette Pack','XZA Plus Leatherette Pack',1,NULL,1,NULL,NULL,NULL,NULL,1),(359,41,'XT MT','XT MT','XT MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(360,41,'XZ MT','XZ MT','XZ MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(361,41,'XZ AMT','XZ AMT','XZ AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(362,42,'EX 1.2 MT','EX 1.2 MT','EX 1.2 MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(363,42,'EX (O) 1.2 MT','EX (O) 1.2 MT','EX (O) 1.2 MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(364,42,'S 1.2 MT','S 1.2 MT','S 1.2 MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(365,42,'S (O) 1.2 MT','S (O) 1.2 MT','S (O) 1.2 MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(366,42,'S 1.2 AMT','S 1.2 AMT','S 1.2 AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(367,42,'SX 1.2 MT','SX 1.2 MT','SX 1.2 MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(368,42,'SX 1.2 MT Dual Tone','SX 1.2 MT Dual Tone','SX 1.2 MT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(369,42,'SX (O) 1.2 MT','SX (O) 1.2 MT','SX (O) 1.2 MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(370,42,'SX 1.2 AMT','SX 1.2 AMT','SX 1.2 AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(371,42,'SX 1.2 AMT Dual Tone','SX 1.2 AMT Dual Tone','SX 1.2 AMT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(372,42,'SX (O) Connect 1.2 MT','SX (O) Connect 1.2 MT','SX (O) Connect 1.2 MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(373,42,'SX (O) 1.2 AMT','SX (O) 1.2 AMT','SX (O) 1.2 AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(374,42,'SX (O) Connect 1.2 MT Dual Tone','SX (O) Connect 1.2 MT Dual Tone','SX (O) Connect 1.2 MT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(375,42,'SX (O) Connect 1.2 AMT','SX (O) Connect 1.2 AMT','SX (O) Connect 1.2 AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(376,42,'SX (O) Connect 1.2 AMT Dual Tone','SX (O) Connect 1.2 AMT Dual Tone','SX (O) Connect 1.2 AMT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(377,43,'Era 1.2 Kappa VTVT','Era 1.2 Kappa VTVT','Era 1.2 Kappa VTVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(378,43,'Magna 1.2 Kappa VTVT','Magna 1.2 Kappa VTVT','Magna 1.2 Kappa VTVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(379,43,'Sportz Executive 1.2 Kappa VTVT','Sportz Executive 1.2 Kappa VTVT','Sportz Executive 1.2 Kappa VTVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(380,43,'Sportz 1.2 Kappa VTVT','Sportz 1.2 Kappa VTVT','Sportz 1.2 Kappa VTVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(381,43,'Magna AMT 1.2 Kappa VTVT','Magna AMT 1.2 Kappa VTVT','Magna AMT 1.2 Kappa VTVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(382,43,'Sportz 1.2 Kappa VTVT Dual Tone','Sportz 1.2 Kappa VTVT Dual Tone','Sportz 1.2 Kappa VTVT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(383,43,'Sportz Executive AMT 1.2 Kappa VTVT','Sportz Executive AMT 1.2 Kappa VTVT','Sportz Executive AMT 1.2 Kappa VTVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(384,43,'Sportz AMT 1.2 Kappa VTVT','Sportz AMT 1.2 Kappa VTVT','Sportz AMT 1.2 Kappa VTVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(385,43,'Asta 1.2 Kappa VTVT','Asta 1.2 Kappa VTVT','Asta 1.2 Kappa VTVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(386,43,'Asta AMT 1.2 Kappa VTVT','Asta AMT 1.2 Kappa VTVT','Asta AMT 1.2 Kappa VTVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(387,44,'EX 1.5 VTVT','EX 1.5 VTVT','EX 1.5 VTVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(388,44,'S 1.5 VTVT','S 1.5 VTVT','S 1.5 VTVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(389,44,'SX 1.5 VTVT','SX 1.5 VTVT','SX 1.5 VTVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(390,44,'SX 1.5 VTVT IVT','SX 1.5 VTVT IVT','SX 1.5 VTVT IVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(391,44,'SX (O)1.5 VTVT','SX (O)1.5 VTVT','SX (O)1.5 VTVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(392,44,'SX 1.5 Turbo Petrol MT','SX 1.5 Turbo Petrol MT','SX 1.5 Turbo Petrol MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(393,44,'SX 1.5 Turbo Petrol MT Dual Tone','SX 1.5 Turbo Petrol MT Dual Tone','SX 1.5 Turbo Petrol MT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(394,44,'SX (O) 1.5 Turbo Petrol MT','SX (O) 1.5 Turbo Petrol MT','SX (O) 1.5 Turbo Petrol MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(395,44,'SX (O) 1.5 Turbo Petrol MT Dual Tone','SX (O) 1.5 Turbo Petrol MT Dual Tone','SX (O) 1.5 Turbo Petrol MT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(396,44,'SX 1.5 Turbo Petrol DCT','SX 1.5 Turbo Petrol DCT','SX 1.5 Turbo Petrol DCT',1,NULL,1,NULL,NULL,NULL,NULL,1),(397,44,'SX 1.5 Turbo Petrol DCT Dual Tone','SX 1.5 Turbo Petrol DCT Dual Tone','SX 1.5 Turbo Petrol DCT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(398,44,'SX (O) 1.5 VTVT IVT','SX (O) 1.5 VTVT IVT','SX (O) 1.5 VTVT IVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(399,44,'SX (O) 1.5 Turbo Petrol DCT','SX (O) 1.5 Turbo Petrol DCT','SX (O) 1.5 Turbo Petrol DCT',1,NULL,1,NULL,NULL,NULL,NULL,1),(400,44,'SX (O) 1.5 Turbo Petrol DCT Dual Tone','SX (O) 1.5 Turbo Petrol DCT Dual Tone','SX (O) 1.5 Turbo Petrol DCT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(401,45,'E 1.5 Petrol','E 1.5 Petrol','E 1.5 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(402,45,'EX 1.5 Petrol','EX 1.5 Petrol','EX 1.5 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(403,45,'S 1.5 Petrol','S 1.5 Petrol','S 1.5 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(404,45,'S Plus 1.5 Petrol Knight Dual Tone','S Plus 1.5 Petrol Knight Dual Tone','S Plus 1.5 Petrol Knight Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(405,45,'S Plus 1.5 Petrol Knight','S Plus 1.5 Petrol Knight','S Plus 1.5 Petrol Knight',1,NULL,1,NULL,NULL,NULL,NULL,1),(406,45,'SX 1.5 Petrol Executive','SX 1.5 Petrol Executive','SX 1.5 Petrol Executive',1,NULL,1,NULL,NULL,NULL,NULL,1),(407,45,'SX 1.5 Petrol','SX 1.5 Petrol','SX 1.5 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(408,45,'SX 1.5 Petrol CVT','SX 1.5 Petrol CVT','SX 1.5 Petrol CVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(409,45,'SX (O) 1.5 Petrol CVT','SX (O) 1.5 Petrol CVT','SX (O) 1.5 Petrol CVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(410,45,'SX (O) 1.5 Petrol CVT Knight','SX (O) 1.5 Petrol CVT Knight','SX (O) 1.5 Petrol CVT Knight',1,NULL,1,NULL,NULL,NULL,NULL,1),(411,45,'SX (O) 1.5 Petrol CVT Knight Dual Tone','SX (O) 1.5 Petrol CVT Knight Dual Tone','SX (O) 1.5 Petrol CVT Knight Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(412,45,'E 1.5 Diesel','E 1.5 Diesel','E 1.5 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(413,45,'EX 1.5 Diesel','EX 1.5 Diesel','EX 1.5 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(414,45,'S 1.5 Diesel','S 1.5 Diesel','S 1.5 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(415,45,'S Plus 1.5 Diesel Knight Dual Tone','S Plus 1.5 Diesel Knight Dual Tone','S Plus 1.5 Diesel Knight Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,2),(416,45,'SX 1.5 Diesel Executive','SX 1.5 Diesel Executive','SX 1.5 Diesel Executive',1,NULL,1,NULL,NULL,NULL,NULL,2),(417,45,'S Plus 1.5 Diesel Knight','S Plus 1.5 Diesel Knight','S Plus 1.5 Diesel Knight',1,NULL,1,NULL,NULL,NULL,NULL,2),(418,45,'SX 1.5 Diesel','SX 1.5 Diesel','SX 1.5 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(419,45,'SX (O) 1.5 Diesel','SX (O) 1.5 Diesel','SX (O) 1.5 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(420,45,'SX (O) 1.5 Diesel Automatic','SX (O) 1.5 Diesel Automatic','SX (O) 1.5 Diesel Automatic',1,NULL,1,NULL,NULL,NULL,NULL,2),(421,45,'SX (O) 1.5 Diesel Automatic knight','SX (O) 1.5 Diesel Automatic knight','SX (O) 1.5 Diesel Automatic knight',1,NULL,1,NULL,NULL,NULL,NULL,2),(422,45,'SX (O) 1.5 Diesel Automatic knight Dual Tone','SX (O) 1.5 Diesel Automatic knight Dual Tone','SX (O) 1.5 Diesel Automatic knight Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,2),(423,46,'E 1.2 Petrol','E 1.2 Petrol','E 1.2 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(424,46,'S 1.2 Petrol','S 1.2 Petrol','S 1.2 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(425,46,'S (O) 1.2 Petrol','S (O) 1.2 Petrol','S (O) 1.2 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(426,46,'S (O) 1.0 Turbo iMT','S (O) 1.0 Turbo iMT','S (O) 1.0 Turbo iMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(427,46,'S Plus 1.5 CRDi','S Plus 1.5 CRDi','S Plus 1.5 CRDi',1,NULL,1,NULL,NULL,NULL,NULL,2),(428,46,'SX 1.2 Petrol','SX 1.2 Petrol','SX 1.2 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(429,46,'SX 1.2 Petrol Dual Tone','SX 1.2 Petrol Dual Tone','SX 1.2 Petrol Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(430,46,'S (O) 1.0 Turbo DCT','S (O) 1.0 Turbo DCT','S (O) 1.0 Turbo DCT',1,NULL,1,NULL,NULL,NULL,NULL,1),(431,46,'SX 1.5 CRDi','SX 1.5 CRDi','SX 1.5 CRDi',1,NULL,1,NULL,NULL,NULL,NULL,2),(432,46,'SX 1.5 CRDi Dual Tone','SX 1.5 CRDi Dual Tone','SX 1.5 CRDi Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,2),(433,46,'SX (O) 1.0 Turbo iMT','SX (O) 1.0 Turbo iMT','SX (O) 1.0 Turbo iMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(434,46,'SX (O) 1.0 Turbo iMT Dual Tone','SX (O) 1.0 Turbo iMT Dual Tone','SX (O) 1.0 Turbo iMT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(435,46,'SX (O) 1.5 CRDi','SX (O) 1.5 CRDi','SX (O) 1.5 CRDi',1,NULL,1,NULL,NULL,NULL,NULL,2),(436,46,'SX (O) 1.0 Turbo DCT','SX (O) 1.0 Turbo DCT','SX (O) 1.0 Turbo DCT',1,NULL,1,NULL,NULL,NULL,NULL,1),(437,46,'SX (O) 1.5 CRDi Dual Tone','SX (O) 1.5 CRDi Dual Tone','SX (O) 1.5 CRDi Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,2),(438,46,'SX (O) 1.0 Turbo DCT Dual Tone','SX (O) 1.0 Turbo DCT Dual Tone','SX (O) 1.0 Turbo DCT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(439,47,'Magna 1.2 MT','Magna 1.2 MT','Magna 1.2 MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(440,47,'Sportz 1.2 MT','Sportz 1.2 MT','Sportz 1.2 MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(441,47,'Sportz 1.2 MT Dual Tone','Sportz 1.2 MT Dual Tone','Sportz 1.2 MT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(442,47,'Asta 1.2 MT','Asta 1.2 MT','Asta 1.2 MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(443,47,'Sportz 1.2 IVT','Sportz 1.2 IVT','Sportz 1.2 IVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(444,47,'Asta (O) 1.2 MT','Asta (O) 1.2 MT','Asta (O) 1.2 MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(445,47,'Asta (O) 1.2 MT Dual Tone','Asta (O) 1.2 MT Dual Tone','Asta (O) 1.2 MT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(446,47,'Sportz 1.0 Turbo DCT','Sportz 1.0 Turbo DCT','Sportz 1.0 Turbo DCT',1,NULL,1,NULL,NULL,NULL,NULL,1),(447,47,'Asta (O) 1.2 IVT','Asta (O) 1.2 IVT','Asta (O) 1.2 IVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(448,47,'Asta (O) 1.2 IVT Dual Tone','Asta (O) 1.2 IVT Dual Tone','Asta (O) 1.2 IVT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(449,47,'Asta (O) 1.0 Turbo DCT','Asta (O) 1.0 Turbo DCT','Asta (O) 1.0 Turbo DCT',1,NULL,1,NULL,NULL,NULL,NULL,1),(450,47,'Asta (O) 1.0 Turbo DCT Dual Tone','Asta (O) 1.0 Turbo DCT Dual Tone','Asta (O) 1.0 Turbo DCT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(451,48,'E 1.2 Petrol','E 1.2 Petrol','E 1.2 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(452,48,'S 1.2 Petrol','S 1.2 Petrol','S 1.2 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(453,48,'SX 1.2 Petrol','SX 1.2 Petrol','SX 1.2 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(454,48,'SX 1.2 (O) Petrol','SX 1.2 (O) Petrol','SX 1.2 (O) Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(455,48,'SX Plus 1.2 AMT Petrol','SX Plus 1.2 AMT Petrol','SX Plus 1.2 AMT Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(456,49,'Prestige 7 STR 1.5 Turbo Petrol','Prestige 7 STR 1.5 Turbo Petrol','Prestige 7 STR 1.5 Turbo Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(457,49,'Prestige 7 STR 1.5 Diesel','Prestige 7 STR 1.5 Diesel','Prestige 7 STR 1.5 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(458,49,'Platinum 7 STR 1.5 Turbo Petrol','Platinum 7 STR 1.5 Turbo Petrol','Platinum 7 STR 1.5 Turbo Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(459,49,'Prestige (O) 7 STR 1.5 Diesel AT','Prestige (O) 7 STR 1.5 Diesel AT','Prestige (O) 7 STR 1.5 Diesel AT',1,NULL,1,NULL,NULL,NULL,NULL,2),(460,49,'Platinum 7 STR 1.5 Diesel','Platinum 7 STR 1.5 Diesel','Platinum 7 STR 1.5 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(461,49,'Platinum (O) 6 STR 1.5 Petrol DCT','Platinum (O) 6 STR 1.5 Petrol DCT','Platinum (O) 6 STR 1.5 Petrol DCT',1,NULL,1,NULL,NULL,NULL,NULL,1),(462,49,'Platinum (O) 7 STR 1.5 Petrol DCT','Platinum (O) 7 STR 1.5 Petrol DCT','Platinum (O) 7 STR 1.5 Petrol DCT',1,NULL,1,NULL,NULL,NULL,NULL,1),(463,49,'Signature 6 STR 1.5 Diesel','Signature 6 STR 1.5 Diesel','Signature 6 STR 1.5 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(464,49,'Signature (O) 7 STR 1.5 Petrol DCT','Signature (O) 7 STR 1.5 Petrol DCT','Signature (O) 7 STR 1.5 Petrol DCT',1,NULL,1,NULL,NULL,NULL,NULL,1),(465,49,'Signature (O) 6 STR 1.5 Petrol DCT','Signature (O) 6 STR 1.5 Petrol DCT','Signature (O) 6 STR 1.5 Petrol DCT',1,NULL,1,NULL,NULL,NULL,NULL,1),(466,49,'Signature 6 STR 1.5 Diesel Dual Tone','Signature 6 STR 1.5 Diesel Dual Tone','Signature 6 STR 1.5 Diesel Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,2),(467,49,'Signature (O) 6 STR 1.5 Petrol  DCT Dual Tone','Signature (O) 6 STR 1.5 Petrol  DCT Dual Tone','Signature (O) 6 STR 1.5 Petrol  DCT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(468,49,'Platinum (O) 7 Seater 1.5 Diesel AT','Platinum (O) 7 Seater 1.5 Diesel AT','Platinum (O) 7 Seater 1.5 Diesel AT',1,NULL,1,NULL,NULL,NULL,NULL,2),(469,49,'Platinum (O) 6 STR 1.5 Diesel AT','Platinum (O) 6 STR 1.5 Diesel AT','Platinum (O) 6 STR 1.5 Diesel AT',1,NULL,1,NULL,NULL,NULL,NULL,2),(470,49,'Signature (O) 6 STR 1.5 Diesel AT','Signature (O) 6 STR 1.5 Diesel AT','Signature (O) 6 STR 1.5 Diesel AT',1,NULL,1,NULL,NULL,NULL,NULL,2),(471,49,'Signature (O) 7 Seater 1.5 Diesel AT','Signature (O) 7 Seater 1.5 Diesel AT','Signature (O) 7 Seater 1.5 Diesel AT',1,NULL,1,NULL,NULL,NULL,NULL,2),(472,49,'Signature (O) 6 STR 1.5 Diesel AT Dual Tone','Signature (O) 6 STR 1.5 Diesel AT Dual Tone','Signature (O) 6 STR 1.5 Diesel AT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,2),(473,50,'Platinum 2.0 AT Petrol','Platinum 2.0 AT Petrol','Platinum 2.0 AT Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(474,50,'Signature 2.0 AT Petrol','Signature 2.0 AT Petrol','Signature 2.0 AT Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(475,50,'Platinum 2.0 AT Diesel','Platinum 2.0 AT Diesel','Platinum 2.0 AT Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(476,50,'Signature 2.0 AT Petrol Dual Tone','Signature 2.0 AT Petrol Dual Tone','Signature 2.0 AT Petrol Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(477,50,'Signature 2.0 AT Diesel','Signature 2.0 AT Diesel','Signature 2.0 AT Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(478,50,'Signature 2.0 AT Diesel Dual Tone','Signature 2.0 AT Diesel Dual Tone','Signature 2.0 AT Diesel Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,2),(479,50,'Signature 2.0 4WD AT Diesel','Signature 2.0 4WD AT Diesel','Signature 2.0 4WD AT Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(480,50,'Signature 2.0 4WD AT Diesel Dual Tone','Signature 2.0 4WD AT Diesel Dual Tone','Signature 2.0 4WD AT Diesel Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,2),(481,51,'N6 1.0 Turbo iMT','N6 1.0 Turbo iMT','N6 1.0 Turbo iMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(482,51,'N6 1.0 Turbo iMT Dual Tone','N6 1.0 Turbo iMT Dual Tone','N6 1.0 Turbo iMT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(483,51,'N8 1.0 Turbo iMT','N8 1.0 Turbo iMT','N8 1.0 Turbo iMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(484,51,'N8 1.0 Turbo iMT Dual Tone','N8 1.0 Turbo iMT Dual Tone','N8 1.0 Turbo iMT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(485,51,'N8 1.0 Turbo DCT','N8 1.0 Turbo DCT','N8 1.0 Turbo DCT',1,NULL,1,NULL,NULL,NULL,NULL,1),(486,51,'N8 1.0 Turbo DCT Dual Tone','N8 1.0 Turbo DCT Dual Tone','N8 1.0 Turbo DCT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(487,52,'N6 DCT','N6 DCT','N6 DCT',1,NULL,1,NULL,NULL,NULL,NULL,1),(488,52,'N6 DCT Dual Tone','N6 DCT Dual Tone','N6 DCT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(489,52,'N8 DCT','N8 DCT','N8 DCT',1,NULL,1,NULL,NULL,NULL,NULL,1),(490,52,'N8 DCT Dual Tone','N8 DCT Dual Tone','N8 DCT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(491,53,'S MT 7STR','S MT 7STR','S MT 7STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(492,53,'S MT 9STR','S MT 9STR','S MT 9STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(493,53,'S11 MT 7S','S11 MT 7S','S11 MT 7S',1,NULL,1,NULL,NULL,NULL,NULL,2),(494,53,'S11 MT 7S CC','S11 MT 7S CC','S11 MT 7S CC',1,NULL,1,NULL,NULL,NULL,NULL,2),(495,54,'W6','W6','W6',1,NULL,1,NULL,NULL,NULL,NULL,1),(496,54,'W8','W8','W8',1,NULL,1,NULL,NULL,NULL,NULL,1),(497,54,'W8 Dual Tone','W8 Dual Tone','W8 Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(498,54,'W8(O)','W8(O)','W8(O)',1,NULL,1,NULL,NULL,NULL,NULL,1),(499,54,'W8(O) Dual Tone','W8(O) Dual Tone','W8(O) Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(500,55,'Z2 Petrol MT 7 STR','Z2 Petrol MT 7 STR','Z2 Petrol MT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(501,55,'Z2 Petrol MT 7 STR (E)','Z2 Petrol MT 7 STR (E)','Z2 Petrol MT 7 STR (E)',1,NULL,1,NULL,NULL,NULL,NULL,1),(502,55,'Z2 Diesel MT 7 STR','Z2 Diesel MT 7 STR','Z2 Diesel MT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(503,55,'Z2 Diesel MT 7 STR (E)','Z2 Diesel MT 7 STR (E)','Z2 Diesel MT 7 STR (E)',1,NULL,1,NULL,NULL,NULL,NULL,2),(504,55,'Z4 Petrol MT 7 STR','Z4 Petrol MT 7 STR','Z4 Petrol MT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(505,55,'Z4 Petrol MT 7 STR (E)','Z4 Petrol MT 7 STR (E)','Z4 Petrol MT 7 STR (E)',1,NULL,1,NULL,NULL,NULL,NULL,1),(506,55,'Z4 Diesel MT 2WD 7 STR','Z4 Diesel MT 2WD 7 STR','Z4 Diesel MT 2WD 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(507,55,'Z4 Diesel MT 2WD 7 STR (E)','Z4 Diesel MT 2WD 7 STR (E)','Z4 Diesel MT 2WD 7 STR (E)',1,NULL,1,NULL,NULL,NULL,NULL,2),(508,55,'Z6 Diesel MT 2WD 7 STR','Z6 Diesel MT 2WD 7 STR','Z6 Diesel MT 2WD 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(509,55,'Z4 Petrol AT 7 STR','Z4 Petrol AT 7 STR','Z4 Petrol AT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(510,55,'Z4 Diesel AT 2WD 7 STR','Z4 Diesel AT 2WD 7 STR','Z4 Diesel AT 2WD 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(511,55,'Z4 Diesel MT 4WD 7 STR (E)','Z4 Diesel MT 4WD 7 STR (E)','Z4 Diesel MT 4WD 7 STR (E)',1,NULL,1,NULL,NULL,NULL,NULL,2),(512,55,'Z4 Diesel MT 4WD 7 STR','Z4 Diesel MT 4WD 7 STR','Z4 Diesel MT 4WD 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(513,55,'Z6 Diesel AT 2WD 7 STR','Z6 Diesel AT 2WD 7 STR','Z6 Diesel AT 2WD 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(514,55,'Z8 Petrol MT 7 STR','Z8 Petrol MT 7 STR','Z8 Petrol MT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(515,55,'Z8 Diesel MT 2WD 7 STR','Z8 Diesel MT 2WD 7 STR','Z8 Diesel MT 2WD 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(516,55,'Z8 Petrol AT 7 STR','Z8 Petrol AT 7 STR','Z8 Petrol AT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(517,55,'Z8 L Petrol MT 7 STR','Z8 L Petrol MT 7 STR','Z8 L Petrol MT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(518,55,'Z8 L Petrol MT 6 STR','Z8 L Petrol MT 6 STR','Z8 L Petrol MT 6 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(519,55,'Z8 L Diesel MT 2WD 7 STR','Z8 L Diesel MT 2WD 7 STR','Z8 L Diesel MT 2WD 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(520,55,'Z8 Diesel AT 2WD 7 STR','Z8 Diesel AT 2WD 7 STR','Z8 Diesel AT 2WD 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(521,55,'Z8 L Diesel MT 2WD 6 STR','Z8 L Diesel MT 2WD 6 STR','Z8 L Diesel MT 2WD 6 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(522,55,'Z8 Diesel MT 4WD 7 STR','Z8 Diesel MT 4WD 7 STR','Z8 Diesel MT 4WD 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(523,55,'Z8 L Petrol AT 7 STR','Z8 L Petrol AT 7 STR','Z8 L Petrol AT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(524,55,'Z8 L Petrol AT 6 STR','Z8 L Petrol AT 6 STR','Z8 L Petrol AT 6 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(525,55,'Z8 L Diesel AT 2WD 7 STR','Z8 L Diesel AT 2WD 7 STR','Z8 L Diesel AT 2WD 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(526,55,'Z8 L Diesel AT 2WD 6 STR','Z8 L Diesel AT 2WD 6 STR','Z8 L Diesel AT 2WD 6 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(527,55,'Z8 L Diesel MT 4WD 7 STR','Z8 L Diesel MT 4WD 7 STR','Z8 L Diesel MT 4WD 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(528,55,'Z8 Diesel AT 4WD 7 STR','Z8 Diesel AT 4WD 7 STR','Z8 Diesel AT 4WD 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(529,55,'Z8 L Diesel AT 4WD 7 STR','Z8 L Diesel AT 4WD 7 STR','Z8 L Diesel AT 4WD 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(530,56,'AX (O) Hard Top Diesel MT RWD','AX (O) Hard Top Diesel MT RWD','AX (O) Hard Top Diesel MT RWD',1,NULL,1,NULL,NULL,NULL,NULL,2),(531,56,'LX Hard Top Diesel MT RWD','LX Hard Top Diesel MT RWD','LX Hard Top Diesel MT RWD',1,NULL,1,NULL,NULL,NULL,NULL,2),(532,56,'LX Hard Top Petrol AT RWD','LX Hard Top Petrol AT RWD','LX Hard Top Petrol AT RWD',1,NULL,1,NULL,NULL,NULL,NULL,1),(533,56,'AX (O) Convertible Top Petrol MT 4WD','AX (O) Convertible Top Petrol MT 4WD','AX (O) Convertible Top Petrol MT 4WD',1,NULL,1,NULL,NULL,NULL,NULL,1),(534,56,'AX (O) Convertible Top Diesel MT 4WD','AX (O) Convertible Top Diesel MT 4WD','AX (O) Convertible Top Diesel MT 4WD',1,NULL,1,NULL,NULL,NULL,NULL,2),(535,56,'AX (O) Hard Top Diesel MT 4WD','AX (O) Hard Top Diesel MT 4WD','AX (O) Hard Top Diesel MT 4WD',1,NULL,1,NULL,NULL,NULL,NULL,2),(536,56,'LX Hard Top Petrol MT 4WD','LX Hard Top Petrol MT 4WD','LX Hard Top Petrol MT 4WD',1,NULL,1,NULL,NULL,NULL,NULL,1),(537,56,'LX Convertible Top Diesel MT 4WD','LX Convertible Top Diesel MT 4WD','LX Convertible Top Diesel MT 4WD',1,NULL,1,NULL,NULL,NULL,NULL,2),(538,56,'LX Hard Top Diesel MT 4WD','LX Hard Top Diesel MT 4WD','LX Hard Top Diesel MT 4WD',1,NULL,1,NULL,NULL,NULL,NULL,2),(539,56,'LX Convertible Top Petrol AT 4WD','LX Convertible Top Petrol AT 4WD','LX Convertible Top Petrol AT 4WD',1,NULL,1,NULL,NULL,NULL,NULL,1),(540,56,'LX Hard Top Petrol AT 4WD','LX Hard Top Petrol AT 4WD','LX Hard Top Petrol AT 4WD',1,NULL,1,NULL,NULL,NULL,NULL,1),(541,56,'LX Convertible Top Diesel AT 4WD','LX Convertible Top Diesel AT 4WD','LX Convertible Top Diesel AT 4WD',1,NULL,1,NULL,NULL,NULL,NULL,2),(542,56,'LX Hard Top Diesel AT 4WD','LX Hard Top Diesel AT 4WD','LX Hard Top Diesel AT 4WD',1,NULL,1,NULL,NULL,NULL,NULL,2),(543,57,'N4','N4','N4',1,NULL,1,NULL,NULL,NULL,NULL,2),(544,57,'N8','N8','N8',1,NULL,1,NULL,NULL,NULL,NULL,2),(545,57,'N10','N10','N10',1,NULL,1,NULL,NULL,NULL,NULL,2),(546,57,'N10 (O)','N10 (O)','N10 (O)',1,NULL,1,NULL,NULL,NULL,NULL,2),(547,58,'MX Petrol MT 5 STR','MX Petrol MT 5 STR','MX Petrol MT 5 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(548,58,'MX Diesel MT 5 STR','MX Diesel MT 5 STR','MX Diesel MT 5 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(549,58,'MX Petrol MT 5 STR (E)','MX Petrol MT 5 STR (E)','MX Petrol MT 5 STR (E)',1,NULL,1,NULL,NULL,NULL,NULL,1),(550,58,'MX Diesel MT 5 STR (E)','MX Diesel MT 5 STR (E)','MX Diesel MT 5 STR (E)',1,NULL,1,NULL,NULL,NULL,NULL,2),(551,58,'AX 3 Petrol MT 5 STR','AX 3 Petrol MT 5 STR','AX 3 Petrol MT 5 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(552,58,'AX 3 Diesel MT 5 STR','AX 3 Diesel MT 5 STR','AX 3 Diesel MT 5 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(553,58,'AX 3 Petrol MT 5 STR (E)','AX 3 Petrol MT 5 STR (E)','AX 3 Petrol MT 5 STR (E)',1,NULL,1,NULL,NULL,NULL,NULL,1),(554,58,'AX 3 Diesel MT 5 STR (E)','AX 3 Diesel MT 5 STR (E)','AX 3 Diesel MT 5 STR (E)',1,NULL,1,NULL,NULL,NULL,NULL,2),(555,58,'AX 3 Diesel MT 7 STR','AX 3 Diesel MT 7 STR','AX 3 Diesel MT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(556,58,'AX 5 Petrol MT 5 STR','AX 5 Petrol MT 5 STR','AX 5 Petrol MT 5 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(557,58,'AX 3 Petrol AT 5 STR','AX 3 Petrol AT 5 STR','AX 3 Petrol AT 5 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(558,58,'AX 3 Diesel MT 7 STR (E)','AX 3 Diesel MT 7 STR (E)','AX 3 Diesel MT 7 STR (E)',1,NULL,1,NULL,NULL,NULL,NULL,2),(559,58,'AX 5 Petrol MT 5 STR (E)','AX 5 Petrol MT 5 STR (E)','AX 5 Petrol MT 5 STR (E)',1,NULL,1,NULL,NULL,NULL,NULL,1),(560,58,'AX 5 Diesel MT 5 STR','AX 5 Diesel MT 5 STR','AX 5 Diesel MT 5 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(561,58,'AX 5 Petrol MT 7 STR','AX 5 Petrol MT 7 STR','AX 5 Petrol MT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(562,58,'AX 3 Diesel AT 5 STR','AX 3 Diesel AT 5 STR','AX 3 Diesel AT 5 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(563,58,'AX 5 Petrol MT 7 STR (E)','AX 5 Petrol MT 7 STR (E)','AX 5 Petrol MT 7 STR (E)',1,NULL,1,NULL,NULL,NULL,NULL,1),(564,58,'AX 5 Diesel MT 7 STR','AX 5 Diesel MT 7 STR','AX 5 Diesel MT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(565,58,'AX 5 Petrol AT 5 STR','AX 5 Petrol AT 5 STR','AX 5 Petrol AT 5 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(566,58,'AX 5 Diesel AT 5 STR','AX 5 Diesel AT 5 STR','AX 5 Diesel AT 5 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(567,58,'AX 7 Petrol MT 7 STR','AX 7 Petrol MT 7 STR','AX 7 Petrol MT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(568,58,'AX 5 Diesel AT 7 STR','AX 5 Diesel AT 7 STR','AX 5 Diesel AT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(569,58,'AX 7 Diesel MT 7 STR','AX 7 Diesel MT 7 STR','AX 7 Diesel MT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(570,58,'AX 7 Petrol AT 7 STR','AX 7 Petrol AT 7 STR','AX 7 Petrol AT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(571,58,'AX 7 Diesel AT 7 STR','AX 7 Diesel AT 7 STR','AX 7 Diesel AT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(572,58,'AX 7 Diesel MT Luxury Pack 7 STR','AX 7 Diesel MT Luxury Pack 7 STR','AX 7 Diesel MT Luxury Pack 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(573,58,'AX 7 Petrol AT Luxury Pack 7 STR','AX 7 Petrol AT Luxury Pack 7 STR','AX 7 Petrol AT Luxury Pack 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(574,58,'AX 7 Diesel AT AWD 7 STR','AX 7 Diesel AT AWD 7 STR','AX 7 Diesel AT AWD 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(575,58,'AX 7 Diesel AT Luxury Pack 7 STR','AX 7 Diesel AT Luxury Pack 7 STR','AX 7 Diesel AT Luxury Pack 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(576,58,'AX 7 Diesel AT AWD Luxury Pack 7 STR','AX 7 Diesel AT AWD Luxury Pack 7 STR','AX 7 Diesel AT AWD Luxury Pack 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(577,59,'W4 1.5 Diesel','W4 1.5 Diesel','W4 1.5 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(578,59,'W6 1.5 Diesel','W6 1.5 Diesel','W6 1.5 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(579,59,'W6 1.5 Diesel AMT','W6 1.5 Diesel AMT','W6 1.5 Diesel AMT',1,NULL,1,NULL,NULL,NULL,NULL,2),(580,59,'W8 1.5 Diesel','W8 1.5 Diesel','W8 1.5 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(581,59,'W8 (O) 1.5 Diesel','W8 (O) 1.5 Diesel','W8 (O) 1.5 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(582,59,'W8(O) 1.5 Diesel Dual Tone','W8(O) 1.5 Diesel Dual Tone','W8(O) 1.5 Diesel Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,2),(583,59,'W8 (O) 1.5 Diesel AMT Dual Tone','W8 (O) 1.5 Diesel AMT Dual Tone','W8 (O) 1.5 Diesel AMT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,2),(584,59,'W8 (O) 1.5 Diesel AMT','W8 (O) 1.5 Diesel AMT','W8 (O) 1.5 Diesel AMT',1,NULL,1,NULL,NULL,NULL,NULL,2),(585,59,'W4 1.2 Petrol','W4 1.2 Petrol','W4 1.2 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(586,59,'W6 1.2 Petrol','W6 1.2 Petrol','W6 1.2 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(587,59,'W6 1.2 Petrol AMT','W6 1.2 Petrol AMT','W6 1.2 Petrol AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(588,59,'W8 1.2 Petrol','W8 1.2 Petrol','W8 1.2 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(589,59,'W8 (O) 1.2 Petrol','W8 (O) 1.2 Petrol','W8 (O) 1.2 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(590,59,'W8(O) 1.2 Petrol Dual Tone','W8(O) 1.2 Petrol Dual Tone','W8(O) 1.2 Petrol Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(591,59,'W8 (O) 1.2 Petrol AMT Dual Tone','W8 (O) 1.2 Petrol AMT Dual Tone','W8 (O) 1.2 Petrol AMT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(592,59,'W8 (O) 1.2 Petrol AMT','W8 (O) 1.2 Petrol AMT','W8 (O) 1.2 Petrol AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(593,60,'B4','B4','B4',1,NULL,1,NULL,NULL,NULL,NULL,2),(594,60,'B6','B6','B6',1,NULL,1,NULL,NULL,NULL,NULL,2),(595,60,'B6(O)','B6(O)','B6(O)',1,NULL,1,NULL,NULL,NULL,NULL,2),(596,61,'K2 Plus 6 STR','K2 Plus 6 STR','K2 Plus 6 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(597,61,'K4 Plus 6 STR','K4 Plus 6 STR','K4 Plus 6 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(598,61,'K6 Plus 6 STR','K6 Plus 6 STR','K6 Plus 6 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(599,61,'K8 6 STR','K8 6 STR','K8 6 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(600,61,'K8 6 STR Dual Tone','K8 6 STR Dual Tone','K8 6 STR Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(601,62,'M2 7 STR','M2 7 STR','M2 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(602,62,'M2 8 STR','M2 8 STR','M2 8 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(603,62,'M4 Plus 7 STR','M4 Plus 7 STR','M4 Plus 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(604,62,'M4 Plus 8 STR','M4 Plus 8 STR','M4 Plus 8 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(605,62,'M6 Plus 7 STR','M6 Plus 7 STR','M6 Plus 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(606,62,'M6 Plus 8 STR','M6 Plus 8 STR','M6 Plus 8 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(607,63,'sDrive18i xLine','sDrive18i xLine','sDrive18i xLine',1,NULL,1,NULL,NULL,NULL,NULL,1),(608,63,'sDrive18d M Sport','sDrive18d M Sport','sDrive18d M Sport',1,NULL,1,NULL,NULL,NULL,NULL,2),(609,63,'sDrive18i M Sport','sDrive18i M Sport','sDrive18i M Sport',1,NULL,1,NULL,NULL,NULL,NULL,1),(610,64,'330Li M Sport','330Li M Sport','330Li M Sport',1,NULL,1,NULL,NULL,NULL,NULL,1),(611,64,'320Ld M Sport','320Ld M Sport','320Ld M Sport',1,NULL,1,NULL,NULL,NULL,NULL,2),(612,65,'xDrive','xDrive','xDrive',1,NULL,1,NULL,NULL,NULL,NULL,1),(613,66,'M40i','M40i','M40i',1,NULL,1,NULL,NULL,NULL,NULL,1),(614,67,'220i M Sport Pro','220i M Sport Pro','220i M Sport Pro',1,NULL,1,NULL,NULL,NULL,NULL,1),(615,67,'220d M Sport','220d M Sport','220d M Sport',1,NULL,1,NULL,NULL,NULL,NULL,2),(616,67,'220i M Sport','220i M Sport','220i M Sport',1,NULL,1,NULL,NULL,NULL,NULL,1),(617,68,'3.0 Petrol','3.0 Petrol','3.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(618,69,'530i M Sport','530i M Sport','530i M Sport',1,NULL,1,NULL,NULL,NULL,NULL,1),(619,69,'520d M Sport','520d M Sport','520d M Sport',1,NULL,1,NULL,NULL,NULL,NULL,2),(620,70,'740i','740i','740i',1,NULL,1,NULL,NULL,NULL,NULL,1),(621,71,'xDrive40i M Sport','xDrive40i M Sport','xDrive40i M Sport',1,NULL,1,NULL,NULL,NULL,NULL,1),(622,71,'xDrive30d M Sport','xDrive30d M Sport','xDrive30d M Sport',1,NULL,1,NULL,NULL,NULL,NULL,2),(623,72,'Coupe','Coupe','Coupe',1,NULL,1,NULL,NULL,NULL,NULL,1),(624,73,'630i M Sport','630i M Sport','630i M Sport',1,NULL,1,NULL,NULL,NULL,NULL,1),(625,73,'620d M Sport','620d M Sport','620d M Sport',1,NULL,1,NULL,NULL,NULL,NULL,2),(626,74,'xDrive40i M Sport','xDrive40i M Sport','xDrive40i M Sport',1,NULL,1,NULL,NULL,NULL,NULL,3),(627,74,'xDrive40d M Sport','xDrive40d M Sport','xDrive40d M Sport',1,NULL,1,NULL,NULL,NULL,NULL,3),(628,75,'Plug-in-Hybrid  ','Plug-in-Hybrid  ','Plug-in-Hybrid  ',1,NULL,1,NULL,NULL,NULL,NULL,3),(629,76,'xDrive20d Luxury Edition','xDrive20d Luxury Edition','xDrive20d Luxury Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(630,77,'xDrive20d xLine','xDrive20d xLine','xDrive20d xLine',1,NULL,1,NULL,NULL,NULL,NULL,2),(631,77,'xDrive20d M Sport','xDrive20d M Sport','xDrive20d M Sport',1,NULL,1,NULL,NULL,NULL,NULL,2),(632,78,'Competition','Competition','Competition',1,NULL,1,NULL,NULL,NULL,NULL,1),(633,79,'xDrive  ','xDrive  ','xDrive  ',1,NULL,1,NULL,NULL,NULL,NULL,1),(634,80,'M xDrive Coupe','M xDrive Coupe','M xDrive Coupe',1,NULL,1,NULL,NULL,NULL,NULL,1),(635,80,'50 Jahre Edition','50 Jahre Edition','50 Jahre Edition',1,NULL,1,NULL,NULL,NULL,NULL,1),(636,81,'Style 1.5 Turbo MT','Style 1.5 Turbo MT','Style 1.5 Turbo MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(637,81,'Shine 1.5 Turbo MT','Shine 1.5 Turbo MT','Shine 1.5 Turbo MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(638,81,'Smart EX MT','Smart EX MT','Smart EX MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(639,81,'Smart 1.5 Turbo MT','Smart 1.5 Turbo MT','Smart 1.5 Turbo MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(640,81,'Shine 1.5 Turbo CVT','Shine 1.5 Turbo CVT','Shine 1.5 Turbo CVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(641,81,'Smart Pro 1.5 Turbo MT','Smart Pro 1.5 Turbo MT','Smart Pro 1.5 Turbo MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(642,81,'Smart EX CVT','Smart EX CVT','Smart EX CVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(643,81,'Smart 1.5 Turbo CVT','Smart 1.5 Turbo CVT','Smart 1.5 Turbo CVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(644,81,'Shine 2.0 Turbo Diesel MT','Shine 2.0 Turbo Diesel MT','Shine 2.0 Turbo Diesel MT',1,NULL,1,NULL,NULL,NULL,NULL,2),(645,81,'Smart 2.0 Turbo Diesel MT','Smart 2.0 Turbo Diesel MT','Smart 2.0 Turbo Diesel MT',1,NULL,1,NULL,NULL,NULL,NULL,2),(646,81,'Sharp Pro 1.5 Turbo MT','Sharp Pro 1.5 Turbo MT','Sharp Pro 1.5 Turbo MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(647,81,'Sharp Pro 1.5 Turbo MT Dual Tone','Sharp Pro 1.5 Turbo MT Dual Tone','Sharp Pro 1.5 Turbo MT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(648,81,'Smart Pro 2.0 Turbo Diesel MT','Smart Pro 2.0 Turbo Diesel MT','Smart Pro 2.0 Turbo Diesel MT',1,NULL,1,NULL,NULL,NULL,NULL,2),(649,81,'Smart Pro 2.0 Turbo Diesel MT Dual Tone','Smart Pro 2.0 Turbo Diesel MT Dual Tone','Smart Pro 2.0 Turbo Diesel MT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,2),(650,81,'Sharp Pro 1.5 Turbo CVT','Sharp Pro 1.5 Turbo CVT','Sharp Pro 1.5 Turbo CVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(651,81,'Sharp Pro 1.5 Turbo CVT Dual Tone','Sharp Pro 1.5 Turbo CVT Dual Tone','Sharp Pro 1.5 Turbo CVT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(652,81,'Savvy Pro 1.5 Turbo CVT','Savvy Pro 1.5 Turbo CVT','Savvy Pro 1.5 Turbo CVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(653,81,'Sharp Pro 2.0 Turbo Diesel MT','Sharp Pro 2.0 Turbo Diesel MT','Sharp Pro 2.0 Turbo Diesel MT',1,NULL,1,NULL,NULL,NULL,NULL,2),(654,81,'Savvy Pro 1.5 Turbo CVT Dual Tone','Savvy Pro 1.5 Turbo CVT Dual Tone','Savvy Pro 1.5 Turbo CVT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(655,81,'Sharp Pro 2.0 Turbo Diesel MT Dual Tone','Sharp Pro 2.0 Turbo Diesel MT Dual Tone','Sharp Pro 2.0 Turbo Diesel MT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,2),(656,82,'Style 1.5 MT','Style 1.5 MT','Style 1.5 MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(657,82,'Super 1.5 MT','Super 1.5 MT','Super 1.5 MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(658,82,'Super 1.5 CVT','Super 1.5 CVT','Super 1.5 CVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(659,82,'Smart 1.5 MT','Smart 1.5 MT','Smart 1.5 MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(660,82,'Sharp 1.5 MT Ivory','Sharp 1.5 MT Ivory','Sharp 1.5 MT Ivory',1,NULL,1,NULL,NULL,NULL,NULL,1),(661,82,'Sharp 1.5 MT Sangria','Sharp 1.5 MT Sangria','Sharp 1.5 MT Sangria',1,NULL,1,NULL,NULL,NULL,NULL,1),(662,82,'Smart 1.5 CVT','Smart 1.5 CVT','Smart 1.5 CVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(663,82,'Sharp 1.5 CVT Ivory','Sharp 1.5 CVT Ivory','Sharp 1.5 CVT Ivory',1,NULL,1,NULL,NULL,NULL,NULL,1),(664,82,'Sharp 1.5 CVT Sangaria','Sharp 1.5 CVT Sangaria','Sharp 1.5 CVT Sangaria',1,NULL,1,NULL,NULL,NULL,NULL,1),(665,82,'Savvy 1.5 CVT','Savvy 1.5 CVT','Savvy 1.5 CVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(666,82,'Savvy 1.5 CVT S Red','Savvy 1.5 CVT S Red','Savvy 1.5 CVT S Red',1,NULL,1,NULL,NULL,NULL,NULL,1),(667,82,'Smart 1.3 Turbo AT','Smart 1.3 Turbo AT','Smart 1.3 Turbo AT',1,NULL,1,NULL,NULL,NULL,NULL,1),(668,82,'Sharp 1.3 Turbo AT','Sharp 1.3 Turbo AT','Sharp 1.3 Turbo AT',1,NULL,1,NULL,NULL,NULL,NULL,1),(669,82,'Savvy 1.3 Turbo AT S Red','Savvy 1.3 Turbo AT S Red','Savvy 1.3 Turbo AT S Red',1,NULL,1,NULL,NULL,NULL,NULL,1),(670,83,'Sharp 7 STR 2.0 Turbo 2WD','Sharp 7 STR 2.0 Turbo 2WD','Sharp 7 STR 2.0 Turbo 2WD',1,NULL,1,NULL,NULL,NULL,NULL,2),(671,83,'Super 7 STR 2.0 Turbo 2WD','Super 7 STR 2.0 Turbo 2WD','Super 7 STR 2.0 Turbo 2WD',1,NULL,1,NULL,NULL,NULL,NULL,2),(672,83,'Savvy 6 STR 2.0 Turbo 2WD','Savvy 6 STR 2.0 Turbo 2WD','Savvy 6 STR 2.0 Turbo 2WD',1,NULL,1,NULL,NULL,NULL,NULL,2),(673,83,'Savvy 7 STR 2.0 Turbo 2WD','Savvy 7 STR 2.0 Turbo 2WD','Savvy 7 STR 2.0 Turbo 2WD',1,NULL,1,NULL,NULL,NULL,NULL,2),(674,83,'Blackstorm 6 STR 2.0 Turbo 2WD','Blackstorm 6 STR 2.0 Turbo 2WD','Blackstorm 6 STR 2.0 Turbo 2WD',1,NULL,1,NULL,NULL,NULL,NULL,2),(675,83,'Blackstorm 7 STR 2.0 Turbo 2WD','Blackstorm 7 STR 2.0 Turbo 2WD','Blackstorm 7 STR 2.0 Turbo 2WD',1,NULL,1,NULL,NULL,NULL,NULL,2),(676,83,'Savvy 6 STR 2.0 Twin Turbo 4WD','Savvy 6 STR 2.0 Twin Turbo 4WD','Savvy 6 STR 2.0 Twin Turbo 4WD',1,NULL,1,NULL,NULL,NULL,NULL,2),(677,83,'Savvy 7 STR 2.0 Twin Turbo 4WD','Savvy 7 STR 2.0 Twin Turbo 4WD','Savvy 7 STR 2.0 Twin Turbo 4WD',1,NULL,1,NULL,NULL,NULL,NULL,2),(678,83,'Blackstorm 6 STR 2.0 Twin Turbo 4WD','Blackstorm 6 STR 2.0 Twin Turbo 4WD','Blackstorm 6 STR 2.0 Twin Turbo 4WD',1,NULL,1,NULL,NULL,NULL,NULL,2),(679,83,'Blackstorm 7 STR 2.0 Twin Turbo 4WD','Blackstorm 7 STR 2.0 Twin Turbo 4WD','Blackstorm 7 STR 2.0 Twin Turbo 4WD',1,NULL,1,NULL,NULL,NULL,NULL,2),(680,84,'Smart 1.5 Turbo Petrol 7 STR','Smart 1.5 Turbo Petrol 7 STR','Smart 1.5 Turbo Petrol 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(681,84,'Smart EX 1.5 Turbo Petrol 7 STR','Smart EX 1.5 Turbo Petrol 7 STR','Smart EX 1.5 Turbo Petrol 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(682,84,'Sharp Pro 1.5 Turbo Petrol MT 6 STR','Sharp Pro 1.5 Turbo Petrol MT 6 STR','Sharp Pro 1.5 Turbo Petrol MT 6 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(683,84,'Smart 2.0 Turbo Diesel 7 STR','Smart 2.0 Turbo Diesel 7 STR','Smart 2.0 Turbo Diesel 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(684,84,'Sharp Pro 1.5 Turbo Petrol 7 STR','Sharp Pro 1.5 Turbo Petrol 7 STR','Sharp Pro 1.5 Turbo Petrol 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(685,84,'Sharp Pro 1.5 Turbo Petrol 6 STR Dual Tone','Sharp Pro 1.5 Turbo Petrol 6 STR Dual Tone','Sharp Pro 1.5 Turbo Petrol 6 STR Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(686,84,'Sharp Pro 1.5 Turbo Petrol 7 STR Dual Tone','Sharp Pro 1.5 Turbo Petrol 7 STR Dual Tone','Sharp Pro 1.5 Turbo Petrol 7 STR Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(687,84,'Smart Pro 2.0 Turbo Diesel 6 STR','Smart Pro 2.0 Turbo Diesel 6 STR','Smart Pro 2.0 Turbo Diesel 6 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(688,84,'Sharp Pro 1.5 Turbo Petrol CVT 6 STR','Sharp Pro 1.5 Turbo Petrol CVT 6 STR','Sharp Pro 1.5 Turbo Petrol CVT 6 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(689,84,'Sharp Pro 1.5 Turbo Petrol CVT 7 STR','Sharp Pro 1.5 Turbo Petrol CVT 7 STR','Sharp Pro 1.5 Turbo Petrol CVT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(690,84,'Sharp Pro 1.5 Turbo Petrol CVT 6 STR Dual Tone','Sharp Pro 1.5 Turbo Petrol CVT 6 STR Dual Tone','Sharp Pro 1.5 Turbo Petrol CVT 6 STR Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(691,84,'Sharp Pro 1.5 Turbo Petrol  CVT 7 STR Dual Tone','Sharp Pro 1.5 Turbo Petrol  CVT 7 STR Dual Tone','Sharp Pro 1.5 Turbo Petrol  CVT 7 STR Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(692,84,'Savvy Pro 1.5 Turbo Petrol CVT 6 STR','Savvy Pro 1.5 Turbo Petrol CVT 6 STR','Savvy Pro 1.5 Turbo Petrol CVT 6 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(693,84,'Sharp Pro 2.0 Turbo Diesel 6 STR','Sharp Pro 2.0 Turbo Diesel 6 STR','Sharp Pro 2.0 Turbo Diesel 6 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(694,84,'Savvy Pro 1.5 Turbo Petrol CVT 7 STR','Savvy Pro 1.5 Turbo Petrol CVT 7 STR','Savvy Pro 1.5 Turbo Petrol CVT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(695,84,'Sharp Pro 2.0 Turbo Diesel 7 STR','Sharp Pro 2.0 Turbo Diesel 7 STR','Sharp Pro 2.0 Turbo Diesel 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(696,84,'Savvy Pro 1.5 Turbo Petrol CVT 6 STR Dual Tone','Savvy Pro 1.5 Turbo Petrol CVT 6 STR Dual Tone','Savvy Pro 1.5 Turbo Petrol CVT 6 STR Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(697,84,'Sharp Pro 2.0 Turbo Diesel 6 STR Dual Tone','Sharp Pro 2.0 Turbo Diesel 6 STR Dual Tone','Sharp Pro 2.0 Turbo Diesel 6 STR Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,2),(698,84,'Savvy Pro 1.5 Turbo Petrol CVT 7 STR Dual Tone','Savvy Pro 1.5 Turbo Petrol CVT 7 STR Dual Tone','Savvy Pro 1.5 Turbo Petrol CVT 7 STR Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(699,84,'Sharp Pro 2.0 Turbo Diesel 7 STR Dual Tone','Sharp Pro 2.0 Turbo Diesel 7 STR Dual Tone','Sharp Pro 2.0 Turbo Diesel 7 STR Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,2),(700,85,'HTE 1.5','HTE 1.5','HTE 1.5',1,NULL,1,NULL,NULL,NULL,NULL,1),(701,85,'HTK 1.5','HTK 1.5','HTK 1.5',1,NULL,1,NULL,NULL,NULL,NULL,1),(702,85,'HTE 1.5 Diesel iMT','HTE 1.5 Diesel iMT','HTE 1.5 Diesel iMT',1,NULL,1,NULL,NULL,NULL,NULL,2),(703,85,'HTK Plus 1.5','HTK Plus 1.5','HTK Plus 1.5',1,NULL,1,NULL,NULL,NULL,NULL,1),(704,85,'HTK 1.5 Diesel iMT','HTK 1.5 Diesel iMT','HTK 1.5 Diesel iMT',1,NULL,1,NULL,NULL,NULL,NULL,2),(705,85,'HTX 1.5','HTX 1.5','HTX 1.5',1,NULL,1,NULL,NULL,NULL,NULL,1),(706,85,'HTK Plus 1.5 Diesel iMT','HTK Plus 1.5 Diesel iMT','HTK Plus 1.5 Diesel iMT',1,NULL,1,NULL,NULL,NULL,NULL,2),(707,85,'HTX 1.5 CVT','HTX 1.5 CVT','HTX 1.5 CVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(708,85,'HTX 1.5 Diesel iMT','HTX 1.5 Diesel iMT','HTX 1.5 Diesel iMT',1,NULL,1,NULL,NULL,NULL,NULL,2),(709,85,'HTX 1.5 Diesel AT','HTX 1.5 Diesel AT','HTX 1.5 Diesel AT',1,NULL,1,NULL,NULL,NULL,NULL,2),(710,85,'HTX Plus 1.5 Diesel iMT','HTX Plus 1.5 Diesel iMT','HTX Plus 1.5 Diesel iMT',1,NULL,1,NULL,NULL,NULL,NULL,2),(711,85,'HTX Plus 1.5 Diesel iMT Dual Tone','HTX Plus 1.5 Diesel iMT Dual Tone','HTX Plus 1.5 Diesel iMT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,2),(712,85,'GTX Plus 1.5 Diesel AT','GTX Plus 1.5 Diesel AT','GTX Plus 1.5 Diesel AT',1,NULL,1,NULL,NULL,NULL,NULL,2),(713,85,'GTX Plus 1.5 Diesel AT Dual Tone','GTX Plus 1.5 Diesel AT Dual Tone','GTX Plus 1.5 Diesel AT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,2),(714,85,'X Line 1.5 Diesel AT','X Line 1.5 Diesel AT','X Line 1.5 Diesel AT',1,NULL,1,NULL,NULL,NULL,NULL,2),(715,86,'HTE 1.2','HTE 1.2','HTE 1.2',1,NULL,1,NULL,NULL,NULL,NULL,1),(716,86,'HTK 1.2','HTK 1.2','HTK 1.2',1,NULL,1,NULL,NULL,NULL,NULL,1),(717,86,'HTK Plus 1.2','HTK Plus 1.2','HTK Plus 1.2',1,NULL,1,NULL,NULL,NULL,NULL,1),(718,86,'HTE 1.5 Diesel iMT','HTE 1.5 Diesel iMT','HTE 1.5 Diesel iMT',1,NULL,1,NULL,NULL,NULL,NULL,2),(719,86,'HTK Plus 1.0 iMT','HTK Plus 1.0 iMT','HTK Plus 1.0 iMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(720,86,'HTK 1.5 Diesel iMT','HTK 1.5 Diesel iMT','HTK 1.5 Diesel iMT',1,NULL,1,NULL,NULL,NULL,NULL,2),(721,86,'HTK Plus 1.5 Diesel iMT','HTK Plus 1.5 Diesel iMT','HTK Plus 1.5 Diesel iMT',1,NULL,1,NULL,NULL,NULL,NULL,2),(722,86,'HTX 1.0 iMT','HTX 1.0 iMT','HTX 1.0 iMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(723,86,'Aurochs Edition 1.0 iMT','Aurochs Edition 1.0 iMT','Aurochs Edition 1.0 iMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(724,86,'HTX 1.0 DCT','HTX 1.0 DCT','HTX 1.0 DCT',1,NULL,1,NULL,NULL,NULL,NULL,1),(725,86,'HTX 1.5 Diesel iMT','HTX 1.5 Diesel iMT','HTX 1.5 Diesel iMT',1,NULL,1,NULL,NULL,NULL,NULL,2),(726,86,'Aurochs Edition 1.0 7DCT','Aurochs Edition 1.0 7DCT','Aurochs Edition 1.0 7DCT',1,NULL,1,NULL,NULL,NULL,NULL,1),(727,86,'Aurochs Edition 1.5 Diesel iMT','Aurochs Edition 1.5 Diesel iMT','Aurochs Edition 1.5 Diesel iMT',1,NULL,1,NULL,NULL,NULL,NULL,2),(728,86,'HTX Plus 1.0 iMT','HTX Plus 1.0 iMT','HTX Plus 1.0 iMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(729,86,'HTX Plus 1.0 iMT Dual Tone','HTX Plus 1.0 iMT Dual Tone','HTX Plus 1.0 iMT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(730,86,'HTX 1.5 Diesel AT','HTX 1.5 Diesel AT','HTX 1.5 Diesel AT',1,NULL,1,NULL,NULL,NULL,NULL,2),(731,86,'GTX Plus 1.0 iMT','GTX Plus 1.0 iMT','GTX Plus 1.0 iMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(732,86,'GTX Plus 1.0 iMT Dual Tone','GTX Plus 1.0 iMT Dual Tone','GTX Plus 1.0 iMT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(733,86,'Aurochs Edition 1.5 Diesel AT','Aurochs Edition 1.5 Diesel AT','Aurochs Edition 1.5 Diesel AT',1,NULL,1,NULL,NULL,NULL,NULL,2),(734,86,'HTX Plus 1.5 Diesel iMT','HTX Plus 1.5 Diesel iMT','HTX Plus 1.5 Diesel iMT',1,NULL,1,NULL,NULL,NULL,NULL,2),(735,86,'HTX Plus 1.5 Diesel iMT Dual Tone','HTX Plus 1.5 Diesel iMT Dual Tone','HTX Plus 1.5 Diesel iMT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,2),(736,86,'GTX Plus 1.0 DCT','GTX Plus 1.0 DCT','GTX Plus 1.0 DCT',1,NULL,1,NULL,NULL,NULL,NULL,1),(737,86,'GTX Plus 1.0 DCT Dual Tone','GTX Plus 1.0 DCT Dual Tone','GTX Plus 1.0 DCT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(738,86,'GTX Plus 1.5 Diesel iMT','GTX Plus 1.5 Diesel iMT','GTX Plus 1.5 Diesel iMT',1,NULL,1,NULL,NULL,NULL,NULL,2),(739,86,'X Line 1.0 DCT','X Line 1.0 DCT','X Line 1.0 DCT',1,NULL,1,NULL,NULL,NULL,NULL,1),(740,86,'GTX Plus 1.5 Diesel iMT Dual Tone','GTX Plus 1.5 Diesel iMT Dual Tone','GTX Plus 1.5 Diesel iMT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,2),(741,86,'GTX Plus 1.5 Diesel AT','GTX Plus 1.5 Diesel AT','GTX Plus 1.5 Diesel AT',1,NULL,1,NULL,NULL,NULL,NULL,2),(742,86,'GTX Plus 1.5 AT Dual Tone','GTX Plus 1.5 AT Dual Tone','GTX Plus 1.5 AT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(743,86,'X Line 1.5 Diesel AT','X Line 1.5 Diesel AT','X Line 1.5 Diesel AT',1,NULL,1,NULL,NULL,NULL,NULL,2),(744,87,'Premium 1.5 Petrol 7 STR','Premium 1.5 Petrol 7 STR','Premium 1.5 Petrol 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(745,87,'Prestige 1.5 Petrol 7 STR','Prestige 1.5 Petrol 7 STR','Prestige 1.5 Petrol 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(746,87,'Premium 1.5 Turbo Petrol iMT 7 STR','Premium 1.5 Turbo Petrol iMT 7 STR','Premium 1.5 Turbo Petrol iMT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(747,87,'Premium 1.5 Diesel iMT 7 STR','Premium 1.5 Diesel iMT 7 STR','Premium 1.5 Diesel iMT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(748,87,'Prestige 1.5 Turbo Petrol iMT 7 STR','Prestige 1.5 Turbo Petrol iMT 7 STR','Prestige 1.5 Turbo Petrol iMT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(749,87,'Prestige 1.5 Diesel iMT 7 STR','Prestige 1.5 Diesel iMT 7 STR','Prestige 1.5 Diesel iMT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(750,87,'Prestige Plus 1.5 Turbo Petrol iMT 7 STR','Prestige Plus 1.5 Turbo Petrol iMT 7 STR','Prestige Plus 1.5 Turbo Petrol iMT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(751,87,'Prestige Plus 1.5 Diesel iMT 7 STR','Prestige Plus 1.5 Diesel iMT 7 STR','Prestige Plus 1.5 Diesel iMT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(752,87,'Prestige Plus 1.5 Turbo Petrol DCT 7 STR','Prestige Plus 1.5 Turbo Petrol DCT 7 STR','Prestige Plus 1.5 Turbo Petrol DCT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(753,87,'Luxury 1.5 Turbo Petrol iMT 7 STR','Luxury 1.5 Turbo Petrol iMT 7 STR','Luxury 1.5 Turbo Petrol iMT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(754,87,'Luxury 1.5 Diesel iMT 7 STR','Luxury 1.5 Diesel iMT 7 STR','Luxury 1.5 Diesel iMT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(755,87,'Luxury (O)1.5 Turbo Petrol DCT 7 STR','Luxury (O)1.5 Turbo Petrol DCT 7 STR','Luxury (O)1.5 Turbo Petrol DCT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(756,87,'Luxury Plus 1.5 Turbo Petrol iMT 6 STR','Luxury Plus 1.5 Turbo Petrol iMT 6 STR','Luxury Plus 1.5 Turbo Petrol iMT 6 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(757,87,'Luxury Plus 1.5 Turbo Petrol iMT 7 STR','Luxury Plus 1.5 Turbo Petrol iMT 7 STR','Luxury Plus 1.5 Turbo Petrol iMT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(758,87,'Luxury (O)1.5 Diesel AT 7 STR','Luxury (O)1.5 Diesel AT 7 STR','Luxury (O)1.5 Diesel AT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(759,87,'Luxury Plus 1.5 Diesel iMT 7 STR','Luxury Plus 1.5 Diesel iMT 7 STR','Luxury Plus 1.5 Diesel iMT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(760,87,'Luxury Plus 1.5 Diesel iMT 6 STR','Luxury Plus 1.5 Diesel iMT 6 STR','Luxury Plus 1.5 Diesel iMT 6 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(761,87,'Luxury Plus 1.5 Turbo Petrol DCT 6 STR','Luxury Plus 1.5 Turbo Petrol DCT 6 STR','Luxury Plus 1.5 Turbo Petrol DCT 6 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(762,87,'Luxury Plus 1.5 Turbo Petrol DCT 7 STR','Luxury Plus 1.5 Turbo Petrol DCT 7 STR','Luxury Plus 1.5 Turbo Petrol DCT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(763,87,'Luxury Plus 1.5 Diesel AT 6 STR','Luxury Plus 1.5 Diesel AT 6 STR','Luxury Plus 1.5 Diesel AT 6 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(764,87,'Luxury Plus 1.5 Diesel AT 7 STR','Luxury Plus 1.5 Diesel AT 7 STR','Luxury Plus 1.5 Diesel AT 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(765,88,'Prestige 7 STR','Prestige 7 STR','Prestige 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(766,88,'Limousine 7 STR','Limousine 7 STR','Limousine 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(767,88,'Limousine Plus 7 STR','Limousine Plus 7 STR','Limousine Plus 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(768,89,'GX 7 STR','GX 7 STR','GX 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(769,89,'GX 8 STR','GX 8 STR','GX 8 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(770,89,'VX Hybrid 7 STR','VX Hybrid 7 STR','VX Hybrid 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,3),(771,89,'VX Hybrid 8 STR','VX Hybrid 8 STR','VX Hybrid 8 STR',1,NULL,1,NULL,NULL,NULL,NULL,3),(772,89,'VX (O) Hybrid 7 STR','VX (O) Hybrid 7 STR','VX (O) Hybrid 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,3),(773,89,'VX (O) Hybrid 8 STR','VX (O) Hybrid 8 STR','VX (O) Hybrid 8 STR',1,NULL,1,NULL,NULL,NULL,NULL,3),(774,89,'ZX Hybrid 7 STR','ZX Hybrid 7 STR','ZX Hybrid 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,3),(775,89,'ZX (O) Hybrid 7 STR','ZX (O) Hybrid 7 STR','ZX (O) Hybrid 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,3),(776,90,'E NeoDrive','E NeoDrive','E NeoDrive',1,NULL,1,NULL,NULL,NULL,NULL,3),(777,90,'S NeoDrive','S NeoDrive','S NeoDrive',1,NULL,1,NULL,NULL,NULL,NULL,3),(778,90,'S AT NeoDrive','S AT NeoDrive','S AT NeoDrive',1,NULL,1,NULL,NULL,NULL,NULL,3),(779,90,'G NeoDrive','G NeoDrive','G NeoDrive',1,NULL,1,NULL,NULL,NULL,NULL,3),(780,90,'G AT NeoDrive','G AT NeoDrive','G AT NeoDrive',1,NULL,1,NULL,NULL,NULL,NULL,3),(781,90,'V NeoDrive','V NeoDrive','V NeoDrive',1,NULL,1,NULL,NULL,NULL,NULL,3),(782,90,'S Hybrid','S Hybrid','S Hybrid',1,NULL,1,NULL,NULL,NULL,NULL,3),(783,90,'V AT NeoDrive','V AT NeoDrive','V AT NeoDrive',1,NULL,1,NULL,NULL,NULL,NULL,3),(784,90,'V AWD NeoDrive','V AWD NeoDrive','V AWD NeoDrive',1,NULL,1,NULL,NULL,NULL,NULL,3),(785,90,'G Hybrid','G Hybrid','G Hybrid',1,NULL,1,NULL,NULL,NULL,NULL,3),(786,90,'V Hybrid','V Hybrid','V Hybrid',1,NULL,1,NULL,NULL,NULL,NULL,3),(787,91,'4X2 MT 2.7 Petrol','4X2 MT 2.7 Petrol','4X2 MT 2.7 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(788,91,'4X2 AT 2.7 Petrol','4X2 AT 2.7 Petrol','4X2 AT 2.7 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(789,91,'4X2 MT 2.8 Diesel','4X2 MT 2.8 Diesel','4X2 MT 2.8 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(790,91,'4X2 AT 2.8 Diesel','4X2 AT 2.8 Diesel','4X2 AT 2.8 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(791,91,'4X4 MT 2.8 Diesel','4X4 MT 2.8 Diesel','4X4 MT 2.8 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(792,91,'4X4 AT 2.8 Diesel','4X4 AT 2.8 Diesel','4X4 AT 2.8 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(793,91,'GR-S','GR-S','GR-S',1,NULL,1,NULL,NULL,NULL,NULL,2),(794,92,'E','E','E',1,NULL,1,NULL,NULL,NULL,NULL,1),(795,92,'S','S','S',1,NULL,1,NULL,NULL,NULL,NULL,1),(796,92,'S AMT','S AMT','S AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(797,92,'G','G','G',1,NULL,1,NULL,NULL,NULL,NULL,1),(798,92,'G AMT','G AMT','G AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(799,92,'V','V','V',1,NULL,1,NULL,NULL,NULL,NULL,1),(800,92,'V AMT','V AMT','V AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(801,93,'ZX Diesel','ZX Diesel','ZX Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(802,94,'GX 7 STR','GX 7 STR','GX 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(803,94,'GX 8 STR','GX 8 STR','GX 8 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(804,94,'VX 2.4 7 STR','VX 2.4 7 STR','VX 2.4 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(805,94,'VX 2.4 8 STR','VX 2.4 8 STR','VX 2.4 8 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(806,94,'ZX 2.4 7 STR','ZX 2.4 7 STR','ZX 2.4 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(807,95,'4X2 AT 2.8 Legender','4X2 AT 2.8 Legender','4X2 AT 2.8 Legender',1,NULL,1,NULL,NULL,NULL,NULL,2),(808,95,'4X4 AT 2.8 Legender','4X4 AT 2.8 Legender','4X4 AT 2.8 Legender',1,NULL,1,NULL,NULL,NULL,NULL,2),(809,96,'Hybrid ','Hybrid ','Hybrid ',1,NULL,1,NULL,NULL,NULL,NULL,3),(810,97,'STD 4X4 MT','STD 4X4 MT','STD 4X4 MT',1,NULL,1,NULL,NULL,NULL,NULL,2),(811,97,'High 4X4 MT','High 4X4 MT','High 4X4 MT',1,NULL,1,NULL,NULL,NULL,NULL,2),(812,97,'High 4X4 AT','High 4X4 AT','High 4X4 AT',1,NULL,1,NULL,NULL,NULL,NULL,2),(813,98,'Hybrid ','Hybrid ','Hybrid ',1,NULL,1,NULL,NULL,NULL,NULL,3),(814,1,'Premium 40 TFSI','Premium 40 TFSI','Premium 40 TFSI',1,NULL,1,NULL,NULL,NULL,NULL,1),(815,1,'Premium Plus 40 TFSI','Premium Plus 40 TFSI','Premium Plus 40 TFSI',1,NULL,1,NULL,NULL,NULL,NULL,1),(816,1,'Technology 40 TFSI','Technology 40 TFSI','Technology 40 TFSI',1,NULL,1,NULL,NULL,NULL,NULL,1),(817,2,'40 TFSI Premium Plus','40 TFSI Premium Plus','40 TFSI Premium Plus',1,NULL,1,NULL,NULL,NULL,NULL,1),(818,2,'40 TFSI Technology','40 TFSI Technology','40 TFSI Technology',1,NULL,1,NULL,NULL,NULL,NULL,1),(819,101,'3.0 TFSI Quattr','3.0 TFSI Quattr','3.0 TFSI Quattr',1,NULL,1,NULL,NULL,NULL,NULL,1),(820,102,'Premium Plus 45 TFSI','Premium Plus 45 TFSI','Premium Plus 45 TFSI',1,NULL,1,NULL,NULL,NULL,NULL,1),(821,102,'Technology 45 TFSI W/O Matrix','Technology 45 TFSI W/O Matrix','Technology 45 TFSI W/O Matrix',1,NULL,1,NULL,NULL,NULL,NULL,1),(822,102,'Technology 45 TFSI','Technology 45 TFSI','Technology 45 TFSI',1,NULL,1,NULL,NULL,NULL,NULL,1),(823,103,'Technology Plus S-line','Technology Plus S-line','Technology Plus S-line',1,NULL,1,NULL,NULL,NULL,NULL,1),(824,104,'Premium Plus 45 TFSI','Premium Plus 45 TFSI','Premium Plus 45 TFSI',1,NULL,1,NULL,NULL,NULL,NULL,1),(825,104,'Special Edition','Special Edition','Special Edition',1,NULL,1,NULL,NULL,NULL,NULL,1),(826,104,'Technology 45 TFSI','Technology 45 TFSI','Technology 45 TFSI',1,NULL,1,NULL,NULL,NULL,NULL,1),(827,105,'Premium Plus 55 TFSI','Premium Plus 55 TFSI','Premium Plus 55 TFSI',1,NULL,1,NULL,NULL,NULL,NULL,1),(828,105,'Technology 55 TFSI w/o Matrix','Technology 55 TFSI w/o Matrix','Technology 55 TFSI w/o Matrix',1,NULL,1,NULL,NULL,NULL,NULL,1),(829,105,'Technology 55 TFSI','Technology 55 TFSI','Technology 55 TFSI',1,NULL,1,NULL,NULL,NULL,NULL,1),(830,106,'Sportback','Sportback','Sportback',1,NULL,1,NULL,NULL,NULL,NULL,1),(831,107,'4.0L TFSI','4.0L TFSI','4.0L TFSI',1,NULL,1,NULL,NULL,NULL,NULL,1),(832,108,'Celebration','Celebration','Celebration',1,NULL,1,NULL,NULL,NULL,NULL,1),(833,108,'55 TFSI quattro','55 TFSI quattro','55 TFSI quattro',1,NULL,1,NULL,NULL,NULL,NULL,1),(834,109,'Celebration Edition','Celebration Edition','Celebration Edition',1,NULL,1,NULL,NULL,NULL,NULL,3),(835,109,'Technology','Technology','Technology',1,NULL,1,NULL,NULL,NULL,NULL,3),(836,110,'s','s','s',1,NULL,1,NULL,NULL,NULL,NULL,1),(837,110,'S (Steptronic Sport)','S (Steptronic Sport)','S (Steptronic Sport)',1,NULL,1,NULL,NULL,NULL,NULL,1),(838,111,'Cooper S JCW Inspired','Cooper S JCW Inspired','Cooper S JCW Inspired',1,NULL,1,NULL,NULL,NULL,NULL,1),(839,112,'110 SE 2.0 Petrol','110 SE 2.0 Petrol','110 SE 2.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(840,112,'90 HSE 2.0 Petrol','90 HSE 2.0 Petrol','90 HSE 2.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(841,112,'90 X-Dynamic HSE 2.0 Petrol','90 X-Dynamic HSE 2.0 Petrol','90 X-Dynamic HSE 2.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(842,112,'110 HSE 2.0 Petrol','110 HSE 2.0 Petrol','110 HSE 2.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(843,112,'110 X-Dynamic HSE 2.0 Petrol','110 X-Dynamic HSE 2.0 Petrol','110 X-Dynamic HSE 2.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(844,112,'90 HSE 3.0 Petrol','90 HSE 3.0 Petrol','90 HSE 3.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(845,112,'90 HSE 3.0 Diesel','90 HSE 3.0 Diesel','90 HSE 3.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(846,112,'110 HSE 3.0 Diesel','110 HSE 3.0 Diesel','110 HSE 3.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(847,112,'110 HSE 3.0 Petrol','110 HSE 3.0 Petrol','110 HSE 3.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(848,112,'110 X-Dynamic HSE 3.0 Petrol','110 X-Dynamic HSE 3.0 Petrol','110 X-Dynamic HSE 3.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(849,112,'110 X-Dynamic HSE 3.0 Diesel','110 X-Dynamic HSE 3.0 Diesel','110 X-Dynamic HSE 3.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(850,112,'90 X 3.0 Petrol','90 X 3.0 Petrol','90 X 3.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(851,112,'90 75th Anniversary Edition 3.0 Petrol','90 75th Anniversary Edition 3.0 Petrol','90 75th Anniversary Edition 3.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(852,112,'90 X 3.0 Diesel','90 X 3.0 Diesel','90 X 3.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(853,112,'130 HSE 3.0 Diesel','130 HSE 3.0 Diesel','130 HSE 3.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(854,112,'130 HSE 3.0 Petrol','130 HSE 3.0 Petrol','130 HSE 3.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(855,112,'110 X 3.0 Petrol','110 X 3.0 Petrol','110 X 3.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(856,112,'110 X 3.0 Diesel','110 X 3.0 Diesel','110 X 3.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(857,112,'90 75th Anniversary Edition 3.0 Diesel','90 75th Anniversary Edition 3.0 Diesel','90 75th Anniversary Edition 3.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(858,112,'110 75th Anniversary Edition 3.0 Petrol','110 75th Anniversary Edition 3.0 Petrol','110 75th Anniversary Edition 3.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(859,112,'110 75th Anniversary Edition 3.0 Diesel','110 75th Anniversary Edition 3.0 Diesel','110 75th Anniversary Edition 3.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(860,112,'110 X-Dynamic HSE 2.0 Petrol PHEV','110 X-Dynamic HSE 2.0 Petrol PHEV','110 X-Dynamic HSE 2.0 Petrol PHEV',1,NULL,1,NULL,NULL,NULL,NULL,3),(861,112,'130 X 3.0 Diesel','130 X 3.0 Diesel','130 X 3.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(862,112,'130 X 3.0 Petrol','130 X 3.0 Petrol','130 X 3.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(863,112,'110 X 2.0 Petrol PHEV','110 X 2.0 Petrol PHEV','110 X 2.0 Petrol PHEV',1,NULL,1,NULL,NULL,NULL,NULL,3),(864,112,'110 75th Anniversary Edition 2.0 Petrol PHEV','110 75th Anniversary Edition 2.0 Petrol PHEV','110 75th Anniversary Edition 2.0 Petrol PHEV',1,NULL,1,NULL,NULL,NULL,NULL,3),(865,112,'90 5.0 Petrol V8','90 5.0 Petrol V8','90 5.0 Petrol V8',1,NULL,1,NULL,NULL,NULL,NULL,1),(866,112,'90 Carpathian 5.0 Petrol','90 Carpathian 5.0 Petrol','90 Carpathian 5.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(867,112,'110 5.0 Petrol V8','110 5.0 Petrol V8','110 5.0 Petrol V8',1,NULL,1,NULL,NULL,NULL,NULL,1),(868,112,'110 Carpathian 5.0 Petrol','110 Carpathian 5.0 Petrol','110 Carpathian 5.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(869,113,'S R-Dynamic 2.0 Diesel','S R-Dynamic 2.0 Diesel','S R-Dynamic 2.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(870,113,'S R-Dynamic 2.0 Petrol','S R-Dynamic 2.0 Petrol','S R-Dynamic 2.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(871,114,'SE 3.0 Diesel','SE 3.0 Diesel','SE 3.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(872,114,'SE 3.0 Petrol','SE 3.0 Petrol','SE 3.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(873,114,'SE 4.4 Petrol','SE 4.4 Petrol','SE 4.4 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(874,114,'SE LWB 3.0 Petrol','SE LWB 3.0 Petrol','SE LWB 3.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(875,114,'SE LWB 3.0 Diesel','SE LWB 3.0 Diesel','SE LWB 3.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(876,114,'SE 3.0 Petrol PHEV','SE 3.0 Petrol PHEV','SE 3.0 Petrol PHEV',1,NULL,1,NULL,NULL,NULL,NULL,3),(877,114,'HSE 3.0 Diesel','HSE 3.0 Diesel','HSE 3.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(878,114,'HSE 3.0 Petrol','HSE 3.0 Petrol','HSE 3.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(879,114,'SE LWB 3.0 Petrol 7 STR','SE LWB 3.0 Petrol 7 STR','SE LWB 3.0 Petrol 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(880,114,'SE LWB 3.0 Diesel 7 STR','SE LWB 3.0 Diesel 7 STR','SE LWB 3.0 Diesel 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(881,114,'SE LWB 4.4 Petrol','SE LWB 4.4 Petrol','SE LWB 4.4 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(882,114,'SE 3.0 Petrol 503BHP PHEV','SE 3.0 Petrol 503BHP PHEV','SE 3.0 Petrol 503BHP PHEV',1,NULL,1,NULL,NULL,NULL,NULL,3),(883,114,'HSE 4.4 Petrol','HSE 4.4 Petrol','HSE 4.4 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(884,114,'HSE LWB 3.0 Petrol','HSE LWB 3.0 Petrol','HSE LWB 3.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(885,114,'HSE LWB 3.0 Diesel','HSE LWB 3.0 Diesel','HSE LWB 3.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(886,114,'SE LWB 3.0 Petrol PHEV','SE LWB 3.0 Petrol PHEV','SE LWB 3.0 Petrol PHEV',1,NULL,1,NULL,NULL,NULL,NULL,3),(887,114,'SE LWB 4.4 Petrol 7 STR','SE LWB 4.4 Petrol 7 STR','SE LWB 4.4 Petrol 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(888,114,'HSE 3.0 Petrol PHEV','HSE 3.0 Petrol PHEV','HSE 3.0 Petrol PHEV',1,NULL,1,NULL,NULL,NULL,NULL,3),(889,114,'HSE LWB 3.0 Petrol 7 STR','HSE LWB 3.0 Petrol 7 STR','HSE LWB 3.0 Petrol 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(890,114,'HSE LWB 3.0 Diesel 7 STR','HSE LWB 3.0 Diesel 7 STR','HSE LWB 3.0 Diesel 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(891,114,'HSE LWB 4.4 Petrol','HSE LWB 4.4 Petrol','HSE LWB 4.4 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(892,114,'HSE 3.0 Petrol 503BHP PHEV','HSE 3.0 Petrol 503BHP PHEV','HSE 3.0 Petrol 503BHP PHEV',1,NULL,1,NULL,NULL,NULL,NULL,3),(893,114,'Autobiography 3.0 Diesel','Autobiography 3.0 Diesel','Autobiography 3.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(894,114,'Autobiography 3.0 Petrol','Autobiography 3.0 Petrol','Autobiography 3.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(895,114,'HSE LWB 3.0 Petrol PHEV','HSE LWB 3.0 Petrol PHEV','HSE LWB 3.0 Petrol PHEV',1,NULL,1,NULL,NULL,NULL,NULL,3),(896,114,'HSE LWB 4.4 Petrol 7 STR','HSE LWB 4.4 Petrol 7 STR','HSE LWB 4.4 Petrol 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(897,114,'Autobiography 4.4 Petrol','Autobiography 4.4 Petrol','Autobiography 4.4 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(898,114,'Autobiography LWB 3.0 Diesel','Autobiography LWB 3.0 Diesel','Autobiography LWB 3.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(899,114,'Autobiography LWB 3.0 Petrol','Autobiography LWB 3.0 Petrol','Autobiography LWB 3.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(900,114,'Autobiography 3.0 Petrol PHEV','Autobiography 3.0 Petrol PHEV','Autobiography 3.0 Petrol PHEV',1,NULL,1,NULL,NULL,NULL,NULL,3),(901,114,'First Edition 3.0 Diesel','First Edition 3.0 Diesel','First Edition 3.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(902,114,'First Edition 3.0 Petrol','First Edition 3.0 Petrol','First Edition 3.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(903,114,'Autobiography LWB 3.0 Diesel 7 STR','Autobiography LWB 3.0 Diesel 7 STR','Autobiography LWB 3.0 Diesel 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(904,114,'Autobiography LWB 3.0 Petrol 7 STR','Autobiography LWB 3.0 Petrol 7 STR','Autobiography LWB 3.0 Petrol 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(905,114,'Autobiography 3.0 Petrol 503BHP PHEV','Autobiography 3.0 Petrol 503BHP PHEV','Autobiography 3.0 Petrol 503BHP PHEV',1,NULL,1,NULL,NULL,NULL,NULL,3),(906,114,'Autobiography LWB 4.4 Petrol','Autobiography LWB 4.4 Petrol','Autobiography LWB 4.4 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(907,114,'First Edition 4.4 Petrol','First Edition 4.4 Petrol','First Edition 4.4 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(908,114,'First Edition 3.0 Petrol PHEV','First Edition 3.0 Petrol PHEV','First Edition 3.0 Petrol PHEV',1,NULL,1,NULL,NULL,NULL,NULL,3),(909,114,'First Edition 3.0 LWB Petrol','First Edition 3.0 LWB Petrol','First Edition 3.0 LWB Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(910,114,'First Edition LWB 3.0 Diesel','First Edition LWB 3.0 Diesel','First Edition LWB 3.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(911,114,'First Edition 3.0 Petrol 503BHP PHEV','First Edition 3.0 Petrol 503BHP PHEV','First Edition 3.0 Petrol 503BHP PHEV',1,NULL,1,NULL,NULL,NULL,NULL,3),(912,114,'Autobiography LWB 4.4 Petrol 7 STR','Autobiography LWB 4.4 Petrol 7 STR','Autobiography LWB 4.4 Petrol 7 STR',1,NULL,1,NULL,NULL,NULL,NULL,1),(913,114,'Autobiography LWB 3.0 Petrol PHEV','Autobiography LWB 3.0 Petrol PHEV','Autobiography LWB 3.0 Petrol PHEV',1,NULL,1,NULL,NULL,NULL,NULL,3),(914,114,'First Edition LWB 4.4 Petrol','First Edition LWB 4.4 Petrol','First Edition LWB 4.4 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(915,114,'First Edition LWB 3.0 Petrol PHEV','First Edition LWB 3.0 Petrol PHEV','First Edition LWB 3.0 Petrol PHEV',1,NULL,1,NULL,NULL,NULL,NULL,3),(916,114,'SV 3.0 Diesel','SV 3.0 Diesel','SV 3.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(917,114,'SV 4.4 Petrol','SV 4.4 Petrol','SV 4.4 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(918,114,'SV LWB 3.0 Diesel','SV LWB 3.0 Diesel','SV LWB 3.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(919,114,'SV 3.0 Petrol 503BHP PHEV','SV 3.0 Petrol 503BHP PHEV','SV 3.0 Petrol 503BHP PHEV',1,NULL,1,NULL,NULL,NULL,NULL,3),(920,114,'SV LWB 4.4 Petrol','SV LWB 4.4 Petrol','SV LWB 4.4 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(921,115,'SE R-Dynamic Diesel','SE R-Dynamic Diesel','SE R-Dynamic Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(922,115,'SE R-Dynamic Petrol','SE R-Dynamic Petrol','SE R-Dynamic Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(923,116,'SE Dynamic 3.0 Diesel','SE Dynamic 3.0 Diesel','SE Dynamic 3.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(924,116,'HSE Dynamic 3.0 Diesel','HSE Dynamic 3.0 Diesel','HSE Dynamic 3.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(925,116,'Autobiography 3.0 Diesel','Autobiography 3.0 Diesel','Autobiography 3.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(926,116,'First Edition 3.0 Diesel','First Edition 3.0 Diesel','First Edition 3.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(927,117,'SE R-Dynamic','SE R-Dynamic','SE R-Dynamic',1,NULL,1,NULL,NULL,NULL,NULL,3),(928,117,'SE R-Dynamic Petrol','SE R-Dynamic Petrol','SE R-Dynamic Petrol',1,NULL,1,NULL,NULL,NULL,NULL,3),(929,118,'2.0 Petrol','2.0 Petrol','2.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(930,118,'S 2.0 Petrol','S 2.0 Petrol','S 2.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(931,118,'SE 2.0 Petrol','SE 2.0 Petrol','SE 2.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(932,118,'S R-Dynamic 2.0 Petrol','S R-Dynamic 2.0 Petrol','S R-Dynamic 2.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(933,118,'S 3.0 Petrol','S 3.0 Petrol','S 3.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(934,118,'SE R-Dynamic 2.0 Petrol','SE R-Dynamic 2.0 Petrol','SE R-Dynamic 2.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(935,118,'SE 3.0 Petrol','SE 3.0 Petrol','SE 3.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(936,118,'HSE 2.0 Petrol','HSE 2.0 Petrol','HSE 2.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(937,118,'S R-Dynamic 3.0 Petrol','S R-Dynamic 3.0 Petrol','S R-Dynamic 3.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(938,118,'HSE R-Dynamic 2.0 Petrol','HSE R-Dynamic 2.0 Petrol','HSE R-Dynamic 2.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(939,118,'SE R-Dynamic 3.0 Petrol','SE R-Dynamic 3.0 Petrol','SE R-Dynamic 3.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(940,118,'HSE 3.0 Petrol','HSE 3.0 Petrol','HSE 3.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(941,118,'S 3.0 Diesel','S 3.0 Diesel','S 3.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(942,118,'SE 3.0 Diesel','SE 3.0 Diesel','SE 3.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(943,118,'S R-Dynamic 3.0 Diesel','S R-Dynamic 3.0 Diesel','S R-Dynamic 3.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(944,118,'HSE 3.0 Diesel','HSE 3.0 Diesel','HSE 3.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(945,118,'SE R-Dynamic 3.0 Diesel','SE R-Dynamic 3.0 Diesel','SE R-Dynamic 3.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(946,118,'HSE R-Dynamic 3.0 Diesel','HSE R-Dynamic 3.0 Diesel','HSE R-Dynamic 3.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(947,118,'Metropolitan Edition','Metropolitan Edition','Metropolitan Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(948,119,'E 1.2 Petrol MT','E 1.2 Petrol MT','E 1.2 Petrol MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(949,119,'S 1.2 Petrol MT','S 1.2 Petrol MT','S 1.2 Petrol MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(950,119,'S 1.2 Petrol CVT','S 1.2 Petrol CVT','S 1.2 Petrol CVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(951,119,'VX 1.2 Petrol MT','VX 1.2 Petrol MT','VX 1.2 Petrol MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(952,119,'VX 1.2 Petrol CVT','VX 1.2 Petrol CVT','VX 1.2 Petrol CVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(953,120,'SV Petrol MT','SV Petrol MT','SV Petrol MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(954,120,'V Petrol MT','V Petrol MT','V Petrol MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(955,120,'VX Petrol MT','VX Petrol MT','VX Petrol MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(956,120,'V Petrol CVT','V Petrol CVT','V Petrol CVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(957,120,'ZX Petrol MT','ZX Petrol MT','ZX Petrol MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(958,120,'VX Petrol CVT','VX Petrol CVT','VX Petrol CVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(959,120,'ZX Petrol CVT','ZX Petrol CVT','ZX Petrol CVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(960,121,'V','V','V',1,NULL,1,NULL,NULL,NULL,NULL,3),(961,121,'ZX','ZX','ZX',1,NULL,1,NULL,NULL,NULL,NULL,3),(962,122,'Active 1.0 TSI MT','Active 1.0 TSI MT','Active 1.0 TSI MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(963,122,'ONYX Edition 1.0 TSI','ONYX Edition 1.0 TSI','ONYX Edition 1.0 TSI',1,NULL,1,NULL,NULL,NULL,NULL,1),(964,122,'Ambition 1.0L TSI MT','Ambition 1.0L TSI MT','Ambition 1.0L TSI MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(965,122,'Ambition 1.5L TSI MT','Ambition 1.5L TSI MT','Ambition 1.5L TSI MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(966,122,'Ambition 1.0 TSI AT','Ambition 1.0 TSI AT','Ambition 1.0 TSI AT',1,NULL,1,NULL,NULL,NULL,NULL,1),(967,122,'Style 1.0L TSI MT (Non-Sunroof)','Style 1.0L TSI MT (Non-Sunroof)','Style 1.0L TSI MT (Non-Sunroof)',1,NULL,1,NULL,NULL,NULL,NULL,1),(968,122,'Style 1.0L TSI MT','Style 1.0L TSI MT','Style 1.0L TSI MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(969,122,'Matte Edition 1.0L TSI MT','Matte Edition 1.0L TSI MT','Matte Edition 1.0L TSI MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(970,122,'Ambition 1.5L TSI DSG','Ambition 1.5L TSI DSG','Ambition 1.5L TSI DSG',1,NULL,1,NULL,NULL,NULL,NULL,1),(971,122,'Monte Carlo 1.0L TSI MT','Monte Carlo 1.0L TSI MT','Monte Carlo 1.0L TSI MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(972,122,'Ambition 1.5L TSI DSG Dual Tone','Ambition 1.5L TSI DSG Dual Tone','Ambition 1.5L TSI DSG Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(973,122,'Style 1.0L TSI AT','Style 1.0L TSI AT','Style 1.0L TSI AT',1,NULL,1,NULL,NULL,NULL,NULL,1),(974,122,'Style 1.0 TSI AT Dual Tone','Style 1.0 TSI AT Dual Tone','Style 1.0 TSI AT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(975,122,'Style 1.5L TSI MT','Style 1.5L TSI MT','Style 1.5L TSI MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(976,122,'Matte Edition 1.0L TSI AT','Matte Edition 1.0L TSI AT','Matte Edition 1.0L TSI AT',1,NULL,1,NULL,NULL,NULL,NULL,1),(977,122,'Lava Blue Edition 1.5L TSI MT','Lava Blue Edition 1.5L TSI MT','Lava Blue Edition 1.5L TSI MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(978,122,'Monte Carlo 1.0 TSI AT','Monte Carlo 1.0 TSI AT','Monte Carlo 1.0 TSI AT',1,NULL,1,NULL,NULL,NULL,NULL,1),(979,122,'Matte Edition 1.5L TSI MT','Matte Edition 1.5L TSI MT','Matte Edition 1.5L TSI MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(980,122,'Monte Carlo 1.5L TSI MT','Monte Carlo 1.5L TSI MT','Monte Carlo 1.5L TSI MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(981,122,'Lava Blue Edition 1.5L TSI DSG','Lava Blue Edition 1.5L TSI DSG','Lava Blue Edition 1.5L TSI DSG',1,NULL,1,NULL,NULL,NULL,NULL,1),(982,122,'Style 1.5L TSI DSG','Style 1.5L TSI DSG','Style 1.5L TSI DSG',1,NULL,1,NULL,NULL,NULL,NULL,1),(983,122,'Style 1.5 TSI DSG Dual Tone','Style 1.5 TSI DSG Dual Tone','Style 1.5 TSI DSG Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(984,122,'Matte Edition 1.5L TSI DSG','Matte Edition 1.5L TSI DSG','Matte Edition 1.5L TSI DSG',1,NULL,1,NULL,NULL,NULL,NULL,1),(985,122,'Monte Carlo 1.5L TSI DSG','Monte Carlo 1.5L TSI DSG','Monte Carlo 1.5L TSI DSG',1,NULL,1,NULL,NULL,NULL,NULL,1),(986,123,'Active 1.0L TSI MT','Active 1.0L TSI MT','Active 1.0L TSI MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(987,123,'Ambition 1.0L TSI MT','Ambition 1.0L TSI MT','Ambition 1.0L TSI MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(988,123,'Style (Non-Sunroof)','Style (Non-Sunroof)','Style (Non-Sunroof)',1,NULL,1,NULL,NULL,NULL,NULL,1),(989,123,'Ambition 1.0L TSI AT','Ambition 1.0L TSI AT','Ambition 1.0L TSI AT',1,NULL,1,NULL,NULL,NULL,NULL,1),(990,123,'Style 1.0L TSI MT','Style 1.0L TSI MT','Style 1.0L TSI MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(991,123,'Ambition 1.5L TSI MT','Ambition 1.5L TSI MT','Ambition 1.5L TSI MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(992,123,'Style 1.0 TSI AT Dual Tone','Style 1.0 TSI AT Dual Tone','Style 1.0 TSI AT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(993,123,'Style 1.0L TSI AT','Style 1.0L TSI AT','Style 1.0L TSI AT',1,NULL,1,NULL,NULL,NULL,NULL,1),(994,123,'Ambition 1.5L TSI DSG','Ambition 1.5L TSI DSG','Ambition 1.5L TSI DSG',1,NULL,1,NULL,NULL,NULL,NULL,1),(995,123,'Ambition 1.5L TSI DSG Dual Tone','Ambition 1.5L TSI DSG Dual Tone','Ambition 1.5L TSI DSG Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(996,123,'Style 1.5L TSI MT','Style 1.5L TSI MT','Style 1.5L TSI MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(997,123,'Anniversary Edition 1.5L TSI MT','Anniversary Edition 1.5L TSI MT','Anniversary Edition 1.5L TSI MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(998,123,'Style 1.5L TSI DSG','Style 1.5L TSI DSG','Style 1.5L TSI DSG',1,NULL,1,NULL,NULL,NULL,NULL,1),(999,123,'Style 1.5 TSI DSG Dual Tone','Style 1.5 TSI DSG Dual Tone','Style 1.5 TSI DSG Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(1000,123,'Anniversary Edition 1.5L TSI DSG','Anniversary Edition 1.5L TSI DSG','Anniversary Edition 1.5L TSI DSG',1,NULL,1,NULL,NULL,NULL,NULL,1),(1001,124,'Sportline AT','Sportline AT','Sportline AT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1002,124,'L&K AT','L&K AT','L&K AT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1003,125,'Style','Style','Style',1,NULL,1,NULL,NULL,NULL,NULL,1),(1004,125,'Sportline','Sportline','Sportline',1,NULL,1,NULL,NULL,NULL,NULL,1),(1005,125,'L&K','L&K','L&K',1,NULL,1,NULL,NULL,NULL,NULL,1),(1006,126,'Cayman','Cayman','Cayman',1,NULL,1,NULL,NULL,NULL,NULL,1),(1007,126,'Boxster','Boxster','Boxster',1,NULL,1,NULL,NULL,NULL,NULL,1),(1008,126,'Cayman Style Edition','Cayman Style Edition','Cayman Style Edition',1,NULL,1,NULL,NULL,NULL,NULL,1),(1009,126,'Boxster Style Edition','Boxster Style Edition','Boxster Style Edition',1,NULL,1,NULL,NULL,NULL,NULL,1),(1010,126,'Cayman GTS 4.0','Cayman GTS 4.0','Cayman GTS 4.0',1,NULL,1,NULL,NULL,NULL,NULL,1),(1011,126,'Boxster GTS 4.0','Boxster GTS 4.0','Boxster GTS 4.0',1,NULL,1,NULL,NULL,NULL,NULL,1),(1012,126,'Spyder','Spyder','Spyder',1,NULL,1,NULL,NULL,NULL,NULL,1),(1013,126,'Spyder PDK','Spyder PDK','Spyder PDK',1,NULL,1,NULL,NULL,NULL,NULL,1),(1014,126,'Cayman GT4','Cayman GT4','Cayman GT4',1,NULL,1,NULL,NULL,NULL,NULL,1),(1015,126,'Cayman GT4 PDK','Cayman GT4 PDK','Cayman GT4 PDK',1,NULL,1,NULL,NULL,NULL,NULL,1),(1016,126,'Cayman GT4 RS','Cayman GT4 RS','Cayman GT4 RS',1,NULL,1,NULL,NULL,NULL,NULL,1),(1017,127,'Carrera','Carrera','Carrera',1,NULL,1,NULL,NULL,NULL,NULL,1),(1018,127,'Carrera T','Carrera T','Carrera T',1,NULL,1,NULL,NULL,NULL,NULL,1),(1019,127,'Carrera Cabriolet','Carrera Cabriolet','Carrera Cabriolet',1,NULL,1,NULL,NULL,NULL,NULL,1),(1020,127,'Carrera S','Carrera S','Carrera S',1,NULL,1,NULL,NULL,NULL,NULL,1),(1021,127,'Carrera S Cabriolet','Carrera S Cabriolet','Carrera S Cabriolet',1,NULL,1,NULL,NULL,NULL,NULL,1),(1022,127,'GT3','GT3','GT3',1,NULL,1,NULL,NULL,NULL,NULL,1),(1023,127,'GT3 Manual','GT3 Manual','GT3 Manual',1,NULL,1,NULL,NULL,NULL,NULL,1),(1024,127,'GT3 with Touring Package','GT3 with Touring Package','GT3 with Touring Package',1,NULL,1,NULL,NULL,NULL,NULL,1),(1025,127,'GT3 with Touring Package Manual','GT3 with Touring Package Manual','GT3 with Touring Package Manual',1,NULL,1,NULL,NULL,NULL,NULL,1),(1026,127,'GT3 RS','GT3 RS','GT3 RS',1,NULL,1,NULL,NULL,NULL,NULL,1),(1027,127,'Turbo S','Turbo S','Turbo S',1,NULL,1,NULL,NULL,NULL,NULL,1),(1028,128,'Base','Base','Base',1,NULL,1,NULL,NULL,NULL,NULL,1),(1029,128,'Platinum Edition','Platinum Edition','Platinum Edition',1,NULL,1,NULL,NULL,NULL,NULL,1),(1030,128,'E-Hybrid','E-Hybrid','E-Hybrid',1,NULL,1,NULL,NULL,NULL,NULL,1),(1031,128,'GTS','GTS','GTS',1,NULL,1,NULL,NULL,NULL,NULL,1),(1032,128,'E-Hybrid Platinum Edition','E-Hybrid Platinum Edition','E-Hybrid Platinum Edition',1,NULL,1,NULL,NULL,NULL,NULL,3),(1033,128,'Turbo','Turbo','Turbo',1,NULL,1,NULL,NULL,NULL,NULL,1),(1034,129,'Base','Base','Base',1,NULL,1,NULL,NULL,NULL,NULL,1),(1035,129,'Platinum Edition','Platinum Edition','Platinum Edition',1,NULL,1,NULL,NULL,NULL,NULL,1),(1036,129,'GTS Coupe','GTS Coupe','GTS Coupe',1,NULL,1,NULL,NULL,NULL,NULL,1),(1037,129,'E-Hybrid Platinum Edition','E-Hybrid Platinum Edition','E-Hybrid Platinum Edition',1,NULL,1,NULL,NULL,NULL,NULL,3),(1038,129,'Turbo','Turbo','Turbo',1,NULL,1,NULL,NULL,NULL,NULL,1),(1039,129,'Turbo GT','Turbo GT','Turbo GT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1040,130,'Base','Base','Base',1,NULL,1,NULL,NULL,NULL,NULL,1),(1041,130,'S','S','S',1,NULL,1,NULL,NULL,NULL,NULL,1),(1042,130,'GTS','GTS','GTS',1,NULL,1,NULL,NULL,NULL,NULL,1),(1043,131,'Standard','Standard','Standard',1,NULL,1,NULL,NULL,NULL,NULL,1),(1044,131,'Platinum Edition','Platinum Edition','Platinum Edition',1,NULL,1,NULL,NULL,NULL,NULL,1),(1045,131,'GTS','GTS','GTS',1,NULL,1,NULL,NULL,NULL,NULL,1),(1046,131,'Turbo S','Turbo S','Turbo S',1,NULL,1,NULL,NULL,NULL,NULL,1),(1047,131,'Turbo S E-Hybrid','Turbo S E-Hybrid','Turbo S E-Hybrid',1,NULL,1,NULL,NULL,NULL,NULL,3),(1048,132,'4S','4S','4S',1,NULL,1,NULL,NULL,NULL,NULL,1),(1049,132,'Turbo','Turbo','Turbo',1,NULL,1,NULL,NULL,NULL,NULL,1),(1050,132,'Turbo S','Turbo S','Turbo S',1,NULL,1,NULL,NULL,NULL,NULL,1),(1051,133,'B6 Ultimate','B6 Ultimate','B6 Ultimate',1,NULL,1,NULL,NULL,NULL,NULL,3),(1052,134,'B5 Ultimate','B5 Ultimate','B5 Ultimate',1,NULL,1,NULL,NULL,NULL,NULL,3),(1053,135,'B5 Ultimate','B5 Ultimate','B5 Ultimate',1,NULL,1,NULL,NULL,NULL,NULL,3),(1054,136,'B4 Ultimate','B4 Ultimate','B4 Ultimate',1,NULL,1,NULL,NULL,NULL,NULL,3),(1055,137,'Comfortline 1.0 TSI MT','Comfortline 1.0 TSI MT','Comfortline 1.0 TSI MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1056,137,'Highline 1.0 TSI MT','Highline 1.0 TSI MT','Highline 1.0 TSI MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1057,137,'Highline 1.0 TSI AT','Highline 1.0 TSI AT','Highline 1.0 TSI AT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1058,137,'Topline 1.0 TSI MT','Topline 1.0 TSI MT','Topline 1.0 TSI MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1059,137,'GT 1.5 TSI DSG','GT 1.5 TSI DSG','GT 1.5 TSI DSG',1,NULL,1,NULL,NULL,NULL,NULL,1),(1060,137,'Topline 1.0 TSI AT','Topline 1.0 TSI AT','Topline 1.0 TSI AT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1061,137,'GT Plus 1.5 MT','GT Plus 1.5 MT','GT Plus 1.5 MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1062,137,'GT Edge Limited Edition MT','GT Edge Limited Edition MT','GT Edge Limited Edition MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1063,137,'GT Plus 1.5 TSI EVO DSG','GT Plus 1.5 TSI EVO DSG','GT Plus 1.5 TSI EVO DSG',1,NULL,1,NULL,NULL,NULL,NULL,1),(1064,137,'GT Edge Limited Edition DSG','GT Edge Limited Edition DSG','GT Edge Limited Edition DSG',1,NULL,1,NULL,NULL,NULL,NULL,1),(1065,138,'Comfortline 1.0 TSI MT','Comfortline 1.0 TSI MT','Comfortline 1.0 TSI MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1066,138,'Highline 1.0 TSI MT','Highline 1.0 TSI MT','Highline 1.0 TSI MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1067,138,'Highline 1.0 TSI AT','Highline 1.0 TSI AT','Highline 1.0 TSI AT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1068,138,'Topline 1.0 TSI MT','Topline 1.0 TSI MT','Topline 1.0 TSI MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1069,138,'GT 1.5 TSI MT','GT 1.5 TSI MT','GT 1.5 TSI MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1070,138,'GT 1.5 DSG','GT 1.5 DSG','GT 1.5 DSG',1,NULL,1,NULL,NULL,NULL,NULL,1),(1071,138,'Topline 1.0 TSI AT','Topline 1.0 TSI AT','Topline 1.0 TSI AT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1072,138,'GT Plus 1.5 MT','GT Plus 1.5 MT','GT Plus 1.5 MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1073,138,'GT Edge Limited Edition Deep Black Pearl','GT Edge Limited Edition Deep Black Pearl','GT Edge Limited Edition Deep Black Pearl',1,NULL,1,NULL,NULL,NULL,NULL,1),(1074,138,'GT Edge Limited Edition Carbon Steel Grey Matte','GT Edge Limited Edition Carbon Steel Grey Matte','GT Edge Limited Edition Carbon Steel Grey Matte',1,NULL,1,NULL,NULL,NULL,NULL,1),(1075,138,'GT Plus 1.5 TSI DSG','GT Plus 1.5 TSI DSG','GT Plus 1.5 TSI DSG',1,NULL,1,NULL,NULL,NULL,NULL,1),(1076,138,'GT Plus 1.5 TSI DSG (With Ventilated Seats)','GT Plus 1.5 TSI DSG (With Ventilated Seats)','GT Plus 1.5 TSI DSG (With Ventilated Seats)',1,NULL,1,NULL,NULL,NULL,NULL,1),(1077,138,'GT Edge Limited Edition DSG Deep Black Pearl','GT Edge Limited Edition DSG Deep Black Pearl','GT Edge Limited Edition DSG Deep Black Pearl',1,NULL,1,NULL,NULL,NULL,NULL,1),(1078,139,'Elegance 2.0 TSI DSG','Elegance 2.0 TSI DSG','Elegance 2.0 TSI DSG',1,NULL,1,NULL,NULL,NULL,NULL,1),(1079,140,'XE','XE','XE',1,NULL,1,NULL,NULL,NULL,NULL,1),(1080,140,'XL','XL','XL',1,NULL,1,NULL,NULL,NULL,NULL,1),(1081,140,'XV Executive','XV Executive','XV Executive',1,NULL,1,NULL,NULL,NULL,NULL,1),(1082,140,'Geza Edition','Geza Edition','Geza Edition',1,NULL,1,NULL,NULL,NULL,NULL,1),(1083,140,'XV','XV','XV',1,NULL,1,NULL,NULL,NULL,NULL,1),(1084,140,'XV Dual Tone','XV Dual Tone','XV Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(1085,140,'XV Red Edition','XV Red Edition','XV Red Edition',1,NULL,1,NULL,NULL,NULL,NULL,1),(1086,140,'XL Turbo','XL Turbo','XL Turbo',1,NULL,1,NULL,NULL,NULL,NULL,1),(1087,140,'XV Premium','XV Premium','XV Premium',1,NULL,1,NULL,NULL,NULL,NULL,1),(1088,140,'XV Premium Dual Tone','XV Premium Dual Tone','XV Premium Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(1089,140,'XV Turbo','XV Turbo','XV Turbo',1,NULL,1,NULL,NULL,NULL,NULL,1),(1090,140,'XV Turbo Dual Tone','XV Turbo Dual Tone','XV Turbo Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(1091,140,'XV Turbo Red Edition','XV Turbo Red Edition','XV Turbo Red Edition',1,NULL,1,NULL,NULL,NULL,NULL,1),(1092,140,'XV Premium Turbo','XV Premium Turbo','XV Premium Turbo',1,NULL,1,NULL,NULL,NULL,NULL,1),(1093,140,'XV Premium Turbo Dual Tone','XV Premium Turbo Dual Tone','XV Premium Turbo Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(1094,140,'XV Premium (O)Turbo','XV Premium (O)Turbo','XV Premium (O)Turbo',1,NULL,1,NULL,NULL,NULL,NULL,1),(1095,140,'XV Turbo CVT','XV Turbo CVT','XV Turbo CVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1096,140,'XV Premium (O) Turbo Dual Tone','XV Premium (O) Turbo Dual Tone','XV Premium (O) Turbo Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(1097,140,'XV Turbo CVT Dual Tone','XV Turbo CVT Dual Tone','XV Turbo CVT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(1098,140,'XV Turbo CVT Red Edition','XV Turbo CVT Red Edition','XV Turbo CVT Red Edition',1,NULL,1,NULL,NULL,NULL,NULL,1),(1099,140,'XV Premium Turbo CVT','XV Premium Turbo CVT','XV Premium Turbo CVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1100,140,'XV Premium Turbo CVT Dual Tone','XV Premium Turbo CVT Dual Tone','XV Premium Turbo CVT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(1101,140,'XV Premium (O)Turbo CVT','XV Premium (O)Turbo CVT','XV Premium (O)Turbo CVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1102,141,'Sedan','Sedan','Sedan',1,NULL,1,NULL,NULL,NULL,NULL,1),(1103,142,'SUV','SUV','SUV',1,NULL,1,NULL,NULL,NULL,NULL,1),(1104,143,'Coupe','Coupe','Coupe',1,NULL,1,NULL,NULL,NULL,NULL,1),(1105,144,'Convertible','Convertible','Convertible',1,NULL,1,NULL,NULL,NULL,NULL,1),(1106,145,'V8 Petrol','V8 Petrol','V8 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(1107,145,'EWB','EWB','EWB',1,NULL,1,NULL,NULL,NULL,NULL,1),(1108,146,'GT Hybrid','GT Hybrid','GT Hybrid',1,NULL,1,NULL,NULL,NULL,NULL,3),(1109,146,'Modena S','Modena S','Modena S',1,NULL,1,NULL,NULL,NULL,NULL,1),(1110,146,'Trofeo','Trofeo','Trofeo',1,NULL,1,NULL,NULL,NULL,NULL,1),(1111,147,'GT Hybrid','GT Hybrid','GT Hybrid',1,NULL,1,NULL,NULL,NULL,NULL,1),(1112,147,'Modena','Modena','Modena',1,NULL,1,NULL,NULL,NULL,NULL,1),(1113,147,'Modena S','Modena S','Modena S',1,NULL,1,NULL,NULL,NULL,NULL,1),(1114,147,'Trofeo','Trofeo','Trofeo',1,NULL,1,NULL,NULL,NULL,NULL,1),(1115,148,'GT','GT','GT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1116,148,'Modena','Modena','Modena',1,NULL,1,NULL,NULL,NULL,NULL,1),(1117,148,'Trofeo','Trofeo','Trofeo',1,NULL,1,NULL,NULL,NULL,NULL,1),(1118,149,'Coupe','Coupe','Coupe',1,NULL,1,NULL,NULL,NULL,NULL,1),(1119,150,'RXE 1.0','RXE 1.0','RXE 1.0',1,NULL,1,NULL,NULL,NULL,NULL,1),(1120,150,'RXL 1.0','RXL 1.0','RXL 1.0',1,NULL,1,NULL,NULL,NULL,NULL,1),(1121,150,'RXL(O) 1.0','RXL(O) 1.0','RXL(O) 1.0',1,NULL,1,NULL,NULL,NULL,NULL,1),(1122,150,'RXT 1.0','RXT 1.0','RXT 1.0',1,NULL,1,NULL,NULL,NULL,NULL,1),(1123,150,'CLIMBER','CLIMBER','CLIMBER',1,NULL,1,NULL,NULL,NULL,NULL,1),(1124,150,'CLIMBER (O) 1.0 Dual Tone','CLIMBER (O) 1.0 Dual Tone','CLIMBER (O) 1.0 Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(1125,150,'RXT 1.0 AMT','RXT 1.0 AMT','RXT 1.0 AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1126,150,'CLIMBER AMT','CLIMBER AMT','CLIMBER AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1127,150,'CLIMBER (O) 1.0 AMT Dual Tone','CLIMBER (O) 1.0 AMT Dual Tone','CLIMBER (O) 1.0 AMT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(1128,151,'RXE MT','RXE MT','RXE MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1129,151,'RXT MT','RXT MT','RXT MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1130,151,'RXT (O) MT','RXT (O) MT','RXT (O) MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1131,151,'RXT (O) MT Dual Tone','RXT (O) MT Dual Tone','RXT (O) MT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(1132,151,'RXT AMT','RXT AMT','RXT AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1133,151,'RXT (O) AMT','RXT (O) AMT','RXT (O) AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1134,151,'RXT (O) AMT Dual Tone','RXT (O) AMT Dual Tone','RXT (O) AMT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(1135,151,'RXZ MT','RXZ MT','RXZ MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1136,151,'RXZ MT Dual Tone','RXZ MT Dual Tone','RXZ MT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(1137,151,'RXZ AMT','RXZ AMT','RXZ AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1138,151,'RXZ AMT Dual Tone','RXZ AMT Dual Tone','RXZ AMT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(1139,151,'RXZ Turbo MT','RXZ Turbo MT','RXZ Turbo MT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1140,151,'RXZ Turbo MT Dual Tone','RXZ Turbo MT Dual Tone','RXZ Turbo MT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(1141,151,'RXZ Turbo CVT','RXZ Turbo CVT','RXZ Turbo CVT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1142,151,'RXZ Turbo CVT Dual Tone','RXZ Turbo CVT Dual Tone','RXZ Turbo CVT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(1143,152,'RXE','RXE','RXE',1,NULL,1,NULL,NULL,NULL,NULL,1),(1144,152,'RXL','RXL','RXL',1,NULL,1,NULL,NULL,NULL,NULL,1),(1145,152,'RXT','RXT','RXT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1146,152,'RXT EASY-R AMT','RXT EASY-R AMT','RXT EASY-R AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1147,152,'RXZ','RXZ','RXZ',1,NULL,1,NULL,NULL,NULL,NULL,1),(1148,152,'RXZ Dual Tone','RXZ Dual Tone','RXZ Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(1149,152,'RXZ EASY-R AMT','RXZ EASY-R AMT','RXZ EASY-R AMT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1150,152,'RXZ EASY-R AMT Dual Tone','RXZ EASY-R AMT Dual Tone','RXZ EASY-R AMT Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(1151,153,'4X4','4X4','4X4',1,NULL,1,NULL,NULL,NULL,NULL,2),(1152,154,'9 STR','9 STR','9 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(1153,154,'12 STR','12 STR','12 STR',1,NULL,1,NULL,NULL,NULL,NULL,2),(1154,154,'12 STR AC','12 STR AC','12 STR AC',1,NULL,1,NULL,NULL,NULL,NULL,2),(1155,154,'9 STR AC','9 STR AC','9 STR AC',1,NULL,1,NULL,NULL,NULL,NULL,2),(1156,3,'Sport 2.0 Diesel','Sport 2.0 Diesel','Sport 2.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(1157,3,'Limited (O) 2.0 Diesel','Limited (O) 2.0 Diesel','Limited (O) 2.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(1158,3,'Model S (O) 2.0 Diesel','Model S (O) 2.0 Diesel','Model S (O) 2.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(1159,3,'Limited (O) 2.0 Diesel 4x4 AT','Limited (O) 2.0 Diesel 4x4 AT','Limited (O) 2.0 Diesel 4x4 AT',1,NULL,1,NULL,NULL,NULL,NULL,2),(1160,3,'Model S (O) Diesel 4x4 AT','Model S (O) Diesel 4x4 AT','Model S (O) Diesel 4x4 AT',1,NULL,1,NULL,NULL,NULL,NULL,2),(1161,4,'Limited (O) 4x2 MT','Limited (O) 4x2 MT','Limited (O) 4x2 MT',1,NULL,1,NULL,NULL,NULL,NULL,2),(1162,4,'Upland','Upland','Upland',1,NULL,1,NULL,NULL,NULL,NULL,2),(1163,4,'X','X','X',1,NULL,1,NULL,NULL,NULL,NULL,2),(1164,4,'Limited (O) 4x2 AT','Limited (O) 4x2 AT','Limited (O) 4x2 AT',1,NULL,1,NULL,NULL,NULL,NULL,2),(1165,4,'Limited Plus 4x2 AT','Limited Plus 4x2 AT','Limited Plus 4x2 AT',1,NULL,1,NULL,NULL,NULL,NULL,2),(1166,4,'Limited (O) 4x4 AT','Limited (O) 4x4 AT','Limited (O) 4x4 AT',1,NULL,1,NULL,NULL,NULL,NULL,2),(1167,4,'Limited Plus 4x4 AT','Limited Plus 4x4 AT','Limited Plus 4x4 AT',1,NULL,1,NULL,NULL,NULL,NULL,2),(1168,157,'Unlimited','Unlimited','Unlimited',1,NULL,1,NULL,NULL,NULL,NULL,1),(1169,157,'Rubicon','Rubicon','Rubicon',1,NULL,1,NULL,NULL,NULL,NULL,1),(1170,158,'Limited (O) 4x4 AT','Limited (O) 4x4 AT','Limited (O) 4x4 AT',1,NULL,1,NULL,NULL,NULL,NULL,1),(1171,159,'AWD','AWD','AWD',1,NULL,1,NULL,NULL,NULL,NULL,1),(1172,159,'RWD','RWD','RWD',1,NULL,1,NULL,NULL,NULL,NULL,1),(1173,160,'Twin Turbo ','Twin Turbo ','Twin Turbo ',1,NULL,1,NULL,NULL,NULL,NULL,1),(1174,161,'Special Edition','Special Edition','Special Edition',1,NULL,1,NULL,NULL,NULL,NULL,1),(1175,162,'V10','V10','V10',1,NULL,1,NULL,NULL,NULL,NULL,1),(1176,163,'Twin Turbo ','Twin Turbo ','Twin Turbo ',1,NULL,1,NULL,NULL,NULL,NULL,1),(1177,164,'RWD','RWD','RWD',1,NULL,1,NULL,NULL,NULL,NULL,1),(1178,164,'AWD','AWD','AWD',1,NULL,1,NULL,NULL,NULL,NULL,1),(1179,165,'Coupe R-Dynamic 2.0','Coupe R-Dynamic 2.0','Coupe R-Dynamic 2.0',1,NULL,1,NULL,NULL,NULL,NULL,1),(1180,165,'V8 Coupe R-Dynamic 5.0','V8 Coupe R-Dynamic 5.0','V8 Coupe R-Dynamic 5.0',1,NULL,1,NULL,NULL,NULL,NULL,1),(1181,165,'V8 Convertible R-Dynamic 5.0','V8 Convertible R-Dynamic 5.0','V8 Convertible R-Dynamic 5.0',1,NULL,1,NULL,NULL,NULL,NULL,1),(1182,166,'S R-Dynamic 2.0 Diesel','S R-Dynamic 2.0 Diesel','S R-Dynamic 2.0 Diesel',1,NULL,1,NULL,NULL,NULL,NULL,2),(1183,166,'S R-Dynamic 2.0 Petrol','S R-Dynamic 2.0 Petrol','S R-Dynamic 2.0 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(1184,167,'R-Dynamic S P250','R-Dynamic S P250','R-Dynamic S P250',1,NULL,1,NULL,NULL,NULL,NULL,1),(1185,167,'R-Dynamic S D200','R-Dynamic S D200','R-Dynamic S D200',1,NULL,1,NULL,NULL,NULL,NULL,2),(1186,168,'Live 1.2 Petrol','Live 1.2 Petrol','Live 1.2 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(1187,168,'Feel 1.2 Petrol','Feel 1.2 Petrol','Feel 1.2 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(1188,168,'Feel 1.2 Petrol Dual Tone','Feel 1.2 Petrol Dual Tone','Feel 1.2 Petrol Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(1189,168,'Feel 1.2 Petrol Vibe Pack','Feel 1.2 Petrol Vibe Pack','Feel 1.2 Petrol Vibe Pack',1,NULL,1,NULL,NULL,NULL,NULL,1),(1190,168,'Feel 1.2 Petrol Vibe Pack Dual Tone','Feel 1.2 Petrol Vibe Pack Dual Tone','Feel 1.2 Petrol Vibe Pack Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(1191,168,'Shine 1.2 Petrol','Shine 1.2 Petrol','Shine 1.2 Petrol',1,NULL,1,NULL,NULL,NULL,NULL,1),(1192,168,'Shine 1.2 Petrol Vibe Pack','Shine 1.2 Petrol Vibe Pack','Shine 1.2 Petrol Vibe Pack',1,NULL,1,NULL,NULL,NULL,NULL,1),(1193,168,'Shine 1.2 Petrol Dual Tone','Shine 1.2 Petrol Dual Tone','Shine 1.2 Petrol Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(1194,168,'Shine 1.2 Petrol Vibe Pack Dual Tone','Shine 1.2 Petrol Vibe Pack Dual Tone','Shine 1.2 Petrol Vibe Pack Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(1195,168,'Feel 1.2 Turbo Dual Tone','Feel 1.2 Turbo Dual Tone','Feel 1.2 Turbo Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(1196,168,'Feel 1.2 Turbo Vibe Pack Dual Tone','Feel 1.2 Turbo Vibe Pack Dual Tone','Feel 1.2 Turbo Vibe Pack Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(1197,168,'Shine 1.2 Turbo Dual Tone','Shine 1.2 Turbo Dual Tone','Shine 1.2 Turbo Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(1198,168,'Shine 1.2 Turbo Vibe Pack Dual Tone','Shine 1.2 Turbo Vibe Pack Dual Tone','Shine 1.2 Turbo Vibe Pack Dual Tone',1,NULL,1,NULL,NULL,NULL,NULL,1),(1199,169,'Shine Dual Tone ','Shine Dual Tone ','Shine Dual Tone ',1,NULL,1,NULL,NULL,NULL,NULL,2),(1200,170,'C 200','C 200','C 200',1,NULL,1,NULL,NULL,NULL,NULL,1),(1201,170,'C 220d','C 220d','C 220d',1,NULL,1,NULL,NULL,NULL,NULL,2),(1202,170,'C 300d','C 300d','C 300d',1,NULL,1,NULL,NULL,NULL,NULL,2),(1203,171,'200','200','200',1,NULL,1,NULL,NULL,NULL,NULL,1),(1204,171,'220d','220d','220d',1,NULL,1,NULL,NULL,NULL,NULL,2),(1205,171,'220d 4MATIC','220d 4MATIC','220d 4MATIC',1,NULL,1,NULL,NULL,NULL,NULL,2),(1206,172,'S 580 4MATIC','S 580 4MATIC','S 580 4MATIC',1,NULL,1,NULL,NULL,NULL,NULL,3),(1207,172,'S 680 4MATIC','S 680 4MATIC','S 680 4MATIC',1,NULL,1,NULL,NULL,NULL,NULL,1),(1208,173,'400d 4MATIC','400d 4MATIC','400d 4MATIC',1,NULL,1,NULL,NULL,NULL,NULL,2),(1209,174,'600 4MATIC','600 4MATIC','600 4MATIC',1,NULL,1,NULL,NULL,NULL,NULL,1),(1210,175,'E 200 Exclusive','E 200 Exclusive','E 200 Exclusive',1,NULL,1,NULL,NULL,NULL,NULL,1),(1211,175,'E 220d Exclusive','E 220d Exclusive','E 220d Exclusive',1,NULL,1,NULL,NULL,NULL,NULL,2),(1212,175,'E 350d AMG Line','E 350d AMG Line','E 350d AMG Line',1,NULL,1,NULL,NULL,NULL,NULL,2),(1213,176,'200 Progressive','200 Progressive','200 Progressive',1,NULL,1,NULL,NULL,NULL,NULL,1),(1214,176,'220d 4MATIC Progressive','220d 4MATIC Progressive','220d 4MATIC Progressive',1,NULL,1,NULL,NULL,NULL,NULL,2),(1215,177,'S 350d','S 350d','S 350d',1,NULL,1,NULL,NULL,NULL,NULL,2),(1216,177,'S 450 4MATIC','S 450 4MATIC','S 450 4MATIC',1,NULL,1,NULL,NULL,NULL,NULL,1),(1217,178,'200 Progressive Line','200 Progressive Line','200 Progressive Line',1,NULL,1,NULL,NULL,NULL,NULL,1),(1218,178,'220d Progressive Line','220d Progressive Line','220d Progressive Line',1,NULL,1,NULL,NULL,NULL,NULL,2),(1219,178,'220d 4MATIC AMG Line','220d 4MATIC AMG Line','220d 4MATIC AMG Line',1,NULL,1,NULL,NULL,NULL,NULL,2),(1220,179,'300d 4MATIC LWB','300d 4MATIC LWB','300d 4MATIC LWB',1,NULL,1,NULL,NULL,NULL,NULL,2),(1221,179,'450 4MATIC LWB','450 4MATIC LWB','450 4MATIC LWB',1,NULL,1,NULL,NULL,NULL,NULL,1),(1222,179,'400d 4MATIC LWB','400d 4MATIC LWB','400d 4MATIC LWB',1,NULL,1,NULL,NULL,NULL,NULL,2),(1223,180,'4MATIC','4MATIC','4MATIC',1,NULL,1,NULL,NULL,NULL,NULL,1),(1224,181,'Limousine','Limousine','Limousine',1,NULL,1,NULL,NULL,NULL,NULL,1),(1225,182,'300 4MATIC','300 4MATIC','300 4MATIC',1,NULL,1,NULL,NULL,NULL,NULL,1),(1226,182,'300d 4MATIC','300d 4MATIC','300d 4MATIC',1,NULL,1,NULL,NULL,NULL,NULL,2),(1227,183,'4MATIC','4MATIC','4MATIC',1,NULL,1,NULL,NULL,NULL,NULL,1),(1228,184,'4MATIC','4MATIC','4MATIC',1,NULL,1,NULL,NULL,NULL,NULL,1),(1229,185,'53 4Matic Plus','53 4Matic Plus','53 4Matic Plus',1,NULL,1,NULL,NULL,NULL,NULL,1),(1230,185,'63 S 4Matic Plus','63 S 4Matic Plus','63 S 4Matic Plus',1,NULL,1,NULL,NULL,NULL,NULL,1),(1231,186,'Limousine','Limousine','Limousine',1,NULL,1,NULL,NULL,NULL,NULL,1),(1232,187,'S 4MATIC Plus','S 4MATIC Plus','S 4MATIC Plus',1,NULL,1,NULL,NULL,NULL,NULL,1),(1233,188,'4MATIC Plus','4MATIC Plus','4MATIC Plus',1,NULL,1,NULL,NULL,NULL,NULL,1),(1234,189,'4MATIC+','4MATIC+','4MATIC+',1,NULL,1,NULL,NULL,NULL,NULL,1),(1235,190,'4MATIC','4MATIC','4MATIC',1,NULL,1,NULL,NULL,NULL,NULL,1),(1236,191,'Adventure Edition','Adventure Edition','Adventure Edition',1,NULL,1,NULL,NULL,NULL,NULL,2),(1237,191,'G 400 d AMG Line','G 400 d AMG Line','G 400 d AMG Line',1,NULL,1,NULL,NULL,NULL,NULL,2),(1238,192,'4Matic Plus','4Matic Plus','4Matic Plus',1,NULL,1,NULL,NULL,NULL,NULL,1),(1239,193,'200','200','200',1,NULL,1,NULL,NULL,NULL,NULL,1),(1240,194,'Berlinetta','Berlinetta','Berlinetta',1,NULL,1,NULL,NULL,NULL,NULL,1),(1241,195,'M','M','M',1,NULL,1,NULL,NULL,NULL,NULL,1),(1242,196,'Coupe','Coupe','Coupe',1,NULL,1,NULL,NULL,NULL,NULL,1),(1243,197,'Twin Turbo','Twin Turbo','Twin Turbo',1,NULL,1,NULL,NULL,NULL,NULL,1),(1244,197,'707','707','707',1,NULL,1,NULL,NULL,NULL,NULL,1),(1245,198,'Evolution','Evolution','Evolution',1,NULL,1,NULL,NULL,NULL,NULL,1),(1246,199,'Coupe','Coupe','Coupe',1,NULL,1,NULL,NULL,NULL,NULL,1),(1247,200,'16.4 Grand Sport','16.4 Grand Sport','16.4 Grand Sport',1,NULL,1,NULL,NULL,NULL,NULL,1),(1248,201,'300h Exquisite','300h Exquisite','300h Exquisite',1,NULL,1,NULL,NULL,NULL,NULL,3),(1249,201,'300h Luxury','300h Luxury','300h Luxury',1,NULL,1,NULL,NULL,NULL,NULL,3),(1250,202,'Sport Plus','Sport Plus','Sport Plus',1,NULL,1,NULL,NULL,NULL,NULL,3),(1251,203,'350h Exquisite','350h Exquisite','350h Exquisite',1,NULL,1,NULL,NULL,NULL,NULL,3),(1252,203,'350h Luxury','350h Luxury','350h Luxury',1,NULL,1,NULL,NULL,NULL,NULL,3),(1253,203,'350h F-Sport','350h F-Sport','350h F-Sport',1,NULL,1,NULL,NULL,NULL,NULL,3),(1254,204,'500d','500d','500d',1,NULL,1,NULL,NULL,NULL,NULL,2),(1255,205,'350h Panasonic','350h Panasonic','350h Panasonic',1,NULL,1,NULL,NULL,NULL,NULL,3),(1256,205,'500h Panasonic','500h Panasonic','500h Panasonic',1,NULL,1,NULL,NULL,NULL,NULL,3),(1257,206,'500h Luxury','500h Luxury','500h Luxury',1,NULL,1,NULL,NULL,NULL,NULL,3),(1258,206,'500h Ultra Luxury','500h Ultra Luxury','500h Ultra Luxury',1,NULL,1,NULL,NULL,NULL,NULL,3),(1259,206,'500h Nishijin','500h Nishijin','500h Nishijin',1,NULL,1,NULL,NULL,NULL,NULL,3),(1260,207,'Coupe','Coupe','Coupe',1,NULL,1,NULL,NULL,NULL,NULL,1),(1261,207,'Spider','Spider','Spider',1,NULL,1,NULL,NULL,NULL,NULL,1),(1262,208,'Coupe','Coupe','Coupe',1,NULL,1,NULL,NULL,NULL,NULL,1),(1263,209,'Hi-Lander','Hi-Lander','Hi-Lander',1,NULL,1,NULL,NULL,NULL,NULL,2),(1264,209,'V-Cross Z 4x2 AT','V-Cross Z 4x2 AT','V-Cross Z 4x2 AT',1,NULL,1,NULL,NULL,NULL,NULL,2),(1265,209,'V-Cross Z 4x4 MT','V-Cross Z 4x4 MT','V-Cross Z 4x4 MT',1,NULL,1,NULL,NULL,NULL,NULL,2),(1266,209,'V-Cross Z Prestige 4x4 AT','V-Cross Z Prestige 4x4 AT','V-Cross Z Prestige 4x4 AT',1,NULL,1,NULL,NULL,NULL,NULL,2),(1267,210,'4x2 AT','4x2 AT','4x2 AT',1,NULL,1,NULL,NULL,NULL,NULL,2),(1268,210,'4x4 AT','4x4 AT','4x4 AT',1,NULL,1,NULL,NULL,NULL,NULL,2),(1269,211,'Drum','Drum','Drum',1,NULL,1,NULL,NULL,NULL,NULL,1),(1270,212,'Race XP','Race XP','Race XP',1,NULL,1,NULL,NULL,NULL,NULL,1),(1271,213,'Drum','Drum','Drum',1,NULL,1,NULL,NULL,NULL,NULL,1),(1272,214,'Disc','Disc','Disc',1,NULL,1,NULL,NULL,NULL,NULL,1),(1273,215,'Disc Bluetooth','Disc Bluetooth','Disc Bluetooth',1,NULL,1,NULL,NULL,NULL,NULL,1),(1274,216,'ZX SmartXonnect','ZX SmartXonnect','ZX SmartXonnect',1,NULL,1,NULL,NULL,NULL,NULL,1),(1275,217,'RTR 165 RP','RTR 165 RP','RTR 165 RP',1,NULL,1,NULL,NULL,NULL,NULL,1),(1276,218,'Triple Tone - Dual Channel','Triple Tone - Dual Channel','Triple Tone - Dual Channel',1,NULL,1,NULL,NULL,NULL,NULL,1),(1277,219,'ABS','ABS','ABS',1,NULL,1,NULL,NULL,NULL,NULL,1),(1278,220,'Heavy Duty','Heavy Duty','Heavy Duty',1,NULL,1,NULL,NULL,NULL,NULL,1),(1279,220,'Comfort','Comfort','Comfort',1,NULL,1,NULL,NULL,NULL,NULL,1),(1280,220,'Heavy Duty i Touch Start Special Edition','Heavy Duty i Touch Start Special Edition','Heavy Duty i Touch Start Special Edition',1,NULL,1,NULL,NULL,NULL,NULL,1),(1281,220,'Heavy Duty i Touch Start','Heavy Duty i Touch Start','Heavy Duty i Touch Start',1,NULL,1,NULL,NULL,NULL,NULL,1),(1282,220,'Heavy Duty i Touch Start Win Edition','Heavy Duty i Touch Start Win Edition','Heavy Duty i Touch Start Win Edition',1,NULL,1,NULL,NULL,NULL,NULL,1),(1283,5,'Drum','Drum','Drum',1,NULL,1,NULL,NULL,NULL,NULL,1),(1284,5,'Disc','Disc','Disc',1,NULL,1,NULL,NULL,NULL,NULL,1),(1285,5,'Drum Alloy','Drum Alloy','Drum Alloy',1,NULL,1,NULL,NULL,NULL,NULL,1),(1286,222,'4V Dual Channel ABS','4V Dual Channel ABS','4V Dual Channel ABS',1,NULL,1,NULL,NULL,NULL,NULL,1),(1287,223,'Self Start Alloy Wheel','Self Start Alloy Wheel','Self Start Alloy Wheel',1,NULL,1,NULL,NULL,NULL,NULL,1),(1288,224,'Dual Tone Edition Disc','Dual Tone Edition Disc','Dual Tone Edition Disc',1,NULL,1,NULL,NULL,NULL,NULL,1),(1289,225,'Disc','Disc','Disc',1,NULL,1,NULL,NULL,NULL,NULL,1),(1290,226,'ES Disc','ES Disc','ES Disc',1,NULL,1,NULL,NULL,NULL,NULL,1),(1291,227,'Glossy','Glossy','Glossy',1,NULL,1,NULL,NULL,NULL,NULL,1),(1292,6,'Gloss','Gloss','Gloss',1,NULL,1,NULL,NULL,NULL,NULL,1),(1293,229,'Self with Alloy Wheel','Self with Alloy Wheel','Self with Alloy Wheel',1,NULL,1,NULL,NULL,NULL,NULL,1),(1294,230,'Self Start Alloy Wheel i3S','Self Start Alloy Wheel i3S','Self Start Alloy Wheel i3S',1,NULL,1,NULL,NULL,NULL,NULL,1),(1295,231,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1296,232,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1297,233,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1298,234,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1299,235,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1300,236,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1301,237,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1302,238,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1303,239,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1304,240,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1305,241,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1306,242,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1307,243,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1308,244,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1309,245,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1310,246,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1311,247,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1312,248,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1313,249,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1314,250,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1315,251,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1316,252,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1317,7,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1318,254,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1319,255,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1320,256,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1321,257,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1322,8,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1323,259,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1324,260,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1325,261,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1326,262,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1327,263,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1328,264,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1329,265,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1330,266,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1331,267,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1332,268,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1333,269,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1334,270,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1335,271,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1336,272,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1337,273,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1338,274,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1339,275,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1340,276,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1341,277,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1342,278,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1343,279,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1344,280,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1345,281,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1346,282,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1347,283,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1348,284,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1349,285,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1350,286,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1351,287,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1352,288,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1353,289,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1354,290,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1355,291,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1356,292,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1357,293,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1358,294,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1359,295,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1360,296,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1361,297,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1362,298,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1363,299,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1364,300,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1365,301,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1366,302,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1367,303,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1368,304,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1369,305,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1370,306,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1371,307,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1372,308,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1373,309,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1374,310,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1375,311,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1376,312,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1377,313,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1378,314,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1379,315,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1380,316,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1381,317,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1382,318,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1383,319,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1384,320,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1385,321,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1386,322,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1387,323,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1388,324,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1389,325,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1390,326,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1391,327,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1392,328,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1393,329,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1394,330,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1395,331,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1396,332,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1397,333,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1398,334,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1399,335,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1400,336,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1401,337,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1402,338,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1403,339,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1404,340,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1405,341,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1406,342,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1407,343,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1408,344,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1409,345,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1410,346,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1411,347,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1412,348,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1413,349,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1414,350,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1415,351,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1416,352,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1417,353,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1418,354,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1419,355,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1420,356,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1421,357,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1422,358,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1423,359,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1424,360,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1425,361,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1426,362,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1427,363,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1428,364,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1429,365,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1430,366,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1431,367,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1432,368,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1433,369,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1434,370,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1435,371,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1436,372,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1437,373,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1438,374,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1439,375,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1440,376,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1441,377,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1442,378,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1443,379,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1444,380,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1445,381,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1446,382,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1447,383,'Default','Default','Default',1,NULL,1,NULL,NULL,NULL,NULL,1),(1448,384,'brandVariantTest','brandVariantTest','brandVariantTest',1,0,1,'2023-09-04 11:14:20',NULL,'2023-09-04 11:14:20',NULL,1),(1449,385,'string','string','string',1,0,1,'2023-09-05 06:41:06',NULL,'2023-09-05 06:41:06',NULL,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fueltype`
--

LOCK TABLES `fueltype` WRITE;
/*!40000 ALTER TABLE `fueltype` DISABLE KEYS */;
INSERT INTO `fueltype` VALUES (1,'Petrol','Petrol','Petrol',1,100,1,NULL,NULL,NULL,NULL),(2,'Diesel','Diesel','Diesel',1,200,1,NULL,NULL,NULL,NULL),(3,'Hybrid','Hybrid','Hybrid',1,300,1,NULL,NULL,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=599 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=575 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personaldetail`
--

LOCK TABLES `personaldetail` WRITE;
/*!40000 ALTER TABLE `personaldetail` DISABLE KEYS */;
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
INSERT INTO `plans` VALUES (1,1,'Breeze Basic','Breeze Basic','First Step for Carbon emissions Tracking and Carbon Neutral;;1 Metric Tonne of Carbon Neutral;;Individual & Business;;ITR compliant mileage log (Income Tax Act Section 10(14) – conveyance allowance)',15,'Breeze Basic',349.00,'INR','?',0,1,100,1,NULL,NULL,NULL,NULL,'100000','1','6',1000000,NULL,NULL),(2,1,'Vayu Essential','Vayu Essential','Perfect for giving back to planet;;3 Metric Tonnes of Carbon Neutral;;Individual, Business & Corporates;;ITR compliant mileage log (Income Tax Act Section 10(14) – conveyance allowance)',45,'Vayu Essential',699.00,'INR','?',1,1,100,1,NULL,NULL,NULL,NULL,'250000','3','12',3000000,NULL,NULL),(3,1,'Aero Supreme','Aero Supreme','Business & Corporate enabling employees care for planet Individually;;6 Metric Tonnes of Carbon Neutral;;Individual, Business & Corporates;;ITR compliant mileage log (Income Tax Act Section 10(14) – conveyance allowance)',90,'Aero Supreme',999.00,'INR','?',0,1,100,1,NULL,NULL,NULL,NULL,'500000','9','14',6000000,NULL,NULL),(4,2,'Breeze Basic','Breeze Basic','First Step for Carbon emissions Tracking and Carbon Neutral;;0.5 Metric Tonne of Carbon Neutral;;Individual & Business;;ITR compliant mileage log (Income Tax Act Section 10(14) – conveyance allowance)',7,'Breeze Basic',249.00,'INR','?',0,1,100,1,NULL,NULL,NULL,NULL,'100000','1','6',500000,NULL,NULL),(5,2,'Vayu Essential','Vayu Essential','Perfect for giving back to planet;;1 Metric Tonne of Carbon Neutral;;Individual, Business & Corporates;;ITR compliant mileage log (Income Tax Act Section 10(14) – conveyance allowance)',15,'Vayu Essential',499.00,'INR','?',1,1,100,1,NULL,NULL,NULL,NULL,'250000','3','12',1000000,NULL,NULL),(6,2,'Aero Supreme','Aero Supreme','Business & Corporate enabling employees care for planet Individually;;3 Metric Tonnes of Carbon Neutral;;Individual, Business & Corporates;;ITR compliant mileage log (Income Tax Act Section 10(14) – conveyance allowance)',45,'Aero Supreme',799.00,'INR','?',0,1,100,1,NULL,NULL,NULL,NULL,'500000','9','14',3000000,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=570 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userplan`
--

LOCK TABLES `userplan` WRITE;
/*!40000 ALTER TABLE `userplan` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=571 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uservehicle`
--

LOCK TABLES `uservehicle` WRITE;
/*!40000 ALTER TABLE `uservehicle` DISABLE KEYS */;
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
-- Dumping events for database 'starzeroin'
--

--
-- Dumping routines for database 'starzeroin'
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
    FROM starzeroin.userplan up
    INNER JOIN starzeroin.vw_uservehicle uv on uv.Id = up.uservehicleid
    INNER JOIN starzeroin.plans p on p.id = up.planid
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

-- Dump completed on 2026-07-13  6:32:52
