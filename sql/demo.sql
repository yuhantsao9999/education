-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: education
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chapter`
--

DROP TABLE IF EXISTS `chapter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `chapter` (
  `course_id` bigint(255) NOT NULL,
  `chapter_auto_id` bigint(255) NOT NULL AUTO_INCREMENT,
  `chapter_id` bigint(255) NOT NULL,
  `chapter_title` varchar(255) NOT NULL,
  PRIMARY KEY (`chapter_auto_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapter`
--

LOCK TABLES `chapter` WRITE;
/*!40000 ALTER TABLE `chapter` DISABLE KEYS */;
INSERT INTO `chapter` VALUES (1,1,1,'Golang 簡介、安裝、與快速開始 '),(1,2,2,'Golang 資料、資料型態與變數'),(1,3,3,'Golang 基本輸入與輸出 - 使用 fmt 內建封包'),(1,4,4,'Golang 基本運算符號'),(1,5,5,'Golang 流程控制 - if 判斷式'),(4,6,1,'課程簡介'),(4,7,2,'JavaScript 程式簡介'),(4,8,3,'HTTP 通訊協定、AJAX 入門 / PHP 範例');
/*!40000 ALTER TABLE `chapter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `course` (
  `course_id` bigint(255) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `intro` varchar(255) NOT NULL,
  `teacher` varchar(255) NOT NULL,
  PRIMARY KEY (`course_id`,`title`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,'Golang 程式設計入門','全面介紹了 Go 語言的特點、安裝部署環境、語言語法、併發流程以及在多個實戰中的應用，並介紹如何整合 CI/CD 服務','Chao-Wei Peng'),(4,'JavaScript ES6 網頁前端工程入門','從基本的 HTML、CSS 網頁設計開始入門，先學習靜態版面設計技巧，再帶入動態的 JavaScript 程式撰寫，帶您領略十多年來的產業精隨。','amy');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `new_section`
--

DROP TABLE IF EXISTS `new_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `new_section` (
  `video_id` bigint(255) NOT NULL AUTO_INCREMENT,
  `course_id` bigint(255) NOT NULL,
  `chapter_id` bigint(255) NOT NULL,
  `section_id` bigint(255) NOT NULL,
  `section_title` varchar(255) NOT NULL,
  `section_intro` varchar(255) NOT NULL,
  `video` varchar(255) NOT NULL,
  PRIMARY KEY (`video_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `new_section`
--

LOCK TABLES `new_section` WRITE;
/*!40000 ALTER TABLE `new_section` DISABLE KEYS */;
INSERT INTO `new_section` VALUES (1,1,1,1,'撰寫、建置、並且執行第一個 Go 程式','1. Golang 的簡單介紹。 2. 如何安裝 Golang 執行環境，實務操作。 3. 選擇文字編輯器，實務操作 Visual Studio Code。 4. 撰寫、建置、並且執行第一個 Go 程式。','class_video-1567752268279.mp4'),(2,1,2,1,'Golang 資料型態','1.1 整數 int 1.2 浮點數 float64 1.3 字串 string 1.4 布林值 bool 1.5 字符 rune','class_video-1567752270045.mp4'),(3,1,2,2,'Golang 變數','2.1 宣告變數與變數的資料型態 2.2 指定變數中的資料 2.3 使用變數代替資料做運算','class_video-1567752272266.mp4'),(4,1,3,1,'Golang 載入封包','1.1 import 封包名稱 1.2 import \"fmt\"','class_video-1567752273376.mp4'),(5,1,3,2,'使用 fmt 封包做基本輸入','2.1 宣告變數 2.2 fmt.Scanln(&變數名稱) 2.3 取得變數對應的指標','class_video-1567752274955.mp4'),(6,1,3,3,'使用 fmt 封包做基本輸出','3.1 輸出換行 fmt.Println(資料) 3.2 輸出不換行 fmt.Print(資料)','class_video-1567752275443.mp4'),(7,1,4,1,'運算符號的種類','1-1. 算數運算 +, -, *, / 1-2. 指定運算 =, +=, -=, *=, /= 1-3. 單元運算 ++, -- 1-4. 比較運算 1-5. 邏輯運算 !, &&, ||','class_video-1567752276089.mp4'),(8,1,5,1,'Golang 流程控制','1.1 if 判斷式 1.2 if ... else 判斷結構 1.3 if ... else if ... else 多條件判斷結構','class_video-1567752278075.mp4'),(9,1,5,2,' Golang 練習範例','2.1 判斷式基本語法練習 2.2 ATM 情境範例練習','class_video-1567752279143.mp4'),(10,4,1,1,'網際網路簡介、網站經營實務','網際網路簡介、網站經營實務','class_video-1567918526342.mp4'),(11,4,1,2,'HTML 基本教學、CSS 基本教學','HTML 基本教學、CSS 基本教學','class_video-1567918526434.mp4'),(12,4,2,1,'變數與運算子、流程控制','變數與運算子、流程控制','class_video-1567918527235.mp4'),(13,4,2,2,'函式基礎、物件基礎','函式基礎、物件基礎','class_video-1567918527715.mp4'),(14,4,2,3,'HTML DOM','HTML DOM','class_video-1567918528285.mp4'),(15,4,2,4,'事件處理、自動排程','事件處理、自動排程','class_video-1567918528745.mp4'),(16,4,2,5,'陣列物件、字串與數學物件','陣列物件、字串與數學物件','class_video-1567918529126.mp4'),(17,4,3,1,'JSON 資料格式、SVG 繪圖','JSON 資料格式、SVG 繪圖','class_video-1567918529363.mp4');
/*!40000 ALTER TABLE `new_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section`
--

DROP TABLE IF EXISTS `section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `section` (
  `vide_id` bigint(255) NOT NULL AUTO_INCREMENT,
  `course_id` bigint(255) NOT NULL,
  `chapter_auto_id` bigint(255) NOT NULL,
  `section_id` bigint(255) NOT NULL,
  `section_title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `section_intro` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `video` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`vide_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section`
--

LOCK TABLES `section` WRITE;
/*!40000 ALTER TABLE `section` DISABLE KEYS */;
/*!40000 ALTER TABLE `section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `status` (
  `user_id` bigint(255) NOT NULL,
  `video_id` bigint(255) NOT NULL,
  `course_title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` bigint(10) NOT NULL DEFAULT '0',
  `registered` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`user_id`,`video_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (2,1,'rrr',1029,1),(3,1,'Golang 程式設計入門',0,1),(3,2,'Golang 程式設計入門',0,1),(3,3,'Golang 程式設計入門',0,1),(3,4,'Golang 程式設計入門',0,1),(3,5,'Golang 程式設計入門',0,1),(3,6,'Golang 程式設計入門',0,1),(3,7,'Golang 程式設計入門',0,1),(3,8,'Golang 程式設計入門',0,1),(3,9,'Golang 程式設計入門',0,1);
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `test` (
  `test_id` int(11) NOT NULL AUTO_INCREMENT,
  `video` varchar(45) DEFAULT '0',
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`test_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
INSERT INTO `test` VALUES (1,'0','i6i6i6');
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `user_id` bigint(255) unsigned NOT NULL AUTO_INCREMENT,
  `provider` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `access_token` varchar(255) NOT NULL,
  `access_expired` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'native','yuhan@yuhan','yuhan','6b6a43c9f8c43a73d10b42bbe5a6b6ab42109382f2f4244fe72e7a4c6b23e13c','1568078280074'),(2,'native','test@test','test','19a9787611f0cfd1772b98b896449c13a603911705d9fd4d502bcf5d344502b4','1568017885198'),(3,'native','peng@peng','peng','1687cc5806ef7508d060e0abe2234cf7f0e53627b64877269da028acb6606e2c','1568077222836');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-10  9:25:34
