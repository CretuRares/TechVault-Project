-- 1. Creare Bază de Date TechVaultDB
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'TechVaultDB')
BEGIN
    CREATE DATABASE TechVaultDB;
END
GO

USE TechVaultDB;
GO

-- 2. Creare Login și User 'techuser' (pentru conexiunea din application.properties)
IF NOT EXISTS (SELECT * FROM sys.server_principals WHERE name = 'techuser')
BEGIN
    CREATE LOGIN techuser WITH PASSWORD = 'User123!', DEFAULT_DATABASE = TechVaultDB;
END

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'techuser')
BEGIN
    CREATE USER techuser FOR LOGIN techuser;
    EXEC sp_addrolemember 'db_owner', 'techuser';
END
GO

-- 3. Tabelul pentru Useri și Admini 
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[users]') AND type in (N'U'))
BEGIN
    CREATE TABLE users (
        id BIGINT PRIMARY KEY IDENTITY(1,1),
        username NVARCHAR(50) UNIQUE NOT NULL,
        password NVARCHAR(255) NOT NULL, -- BCrypt hash
        email NVARCHAR(100),
        role NVARCHAR(20) NOT NULL, -- 'USER' sau 'ADMIN'
        points INT DEFAULT 0       
    );
END
GO

-- 4. Tabelul pentru Produse (Componente PC - Actualizat)
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[products]') AND type in (N'U'))
BEGIN
    CREATE TABLE products (
        id BIGINT PRIMARY KEY IDENTITY(1,1),
        name NVARCHAR(100) NOT NULL,
        description NVARCHAR(MAX),
        price DECIMAL(10, 2) NOT NULL,
        stock_quantity INT DEFAULT 0,
        category NVARCHAR(50),
        image_url NVARCHAR(255),
        stock INT DEFAULT 0        
    );
END
GO

-- 5. Tabelul pentru Carduri
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[cards]') AND type in (N'U'))
BEGIN
    CREATE TABLE cards (
        id BIGINT PRIMARY KEY IDENTITY(1,1),
        card_number NVARCHAR(19) NOT NULL,
        expiry_date NVARCHAR(5) NOT NULL,
        cvv NVARCHAR(4) NOT NULL,
        user_id BIGINT UNIQUE NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
END
GO

-- 6. Tabelul pentru Comenzi
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[orders]') AND type in (N'U'))
BEGIN
    CREATE TABLE orders (
        id BIGINT PRIMARY KEY IDENTITY(1,1),
        user_id BIGINT NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        order_date DATETIME2 NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
END
GO

-- 7. Tabelul pentru Produsele din Comandă (Order Items)
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[order_items]') AND type in (N'U'))
BEGIN
    CREATE TABLE order_items (
        id BIGINT PRIMARY KEY IDENTITY(1,1),
        order_id BIGINT NOT NULL,
        product_id BIGINT NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
    );
END
GO