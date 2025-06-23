
CREATE DATABASE IF NOT EXISTS fims;
USE fims;


CREATE TABLE farmers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  farmer_id VARCHAR(30) UNIQUE NOT NULL, -- used as username
  first_name VARCHAR(50) NOT NULL,
  middle_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  village VARCHAR(100) NOT NULL,
  ward VARCHAR(100) NOT NULL,
  district VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(100),
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE farms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  farmer_id VARCHAR(30) NOT NULL,
  farm_name VARCHAR(100) NOT NULL,
  location TEXT,
  size DECIMAL(6,2),
  crop_type VARCHAR(100),
  status ENUM('Pending', 'Verified') DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (farmer_id) REFERENCES farmers(farmer_id) ON DELETE CASCADE
);


CREATE TABLE outputs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  farm_id INT NOT NULL,
  crop_name VARCHAR(100),
  quantity DECIMAL(10,2),
  unit VARCHAR(20), -- e.g., kg, bags
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE CASCADE
);


CREATE TABLE market_prices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  crop_name VARCHAR(100) NOT NULL,
  price_per_unit DECIMAL(10,2) NOT NULL,
  unit VARCHAR(20) NOT NULL,
  region VARCHAR(100),
  updated_by VARCHAR(50), -- district_officer_id
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE extension_officers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  officer_id VARCHAR(30) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  ward VARCHAR(100),
  district VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(100),
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE district_officers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  officer_id VARCHAR(30) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  district VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(100),
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
