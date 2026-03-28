

-- Tabelul pentru Useri și Admini
CREATE TABLE users (
    id BIGINT PRIMARY KEY IDENTITY(1,1),
    username NVARCHAR(50) UNIQUE NOT NULL,
    password NVARCHAR(255) NOT NULL, -- Aici salvăm BCrypt hash
    email NVARCHAR(100),
    role NVARCHAR(20) NOT NULL -- 'USER' sau 'ADMIN'
);

-- Tabelul pentru Produse (Componente PC)
CREATE TABLE products (
    id BIGINT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(100) NOT NULL,
    description NVARCHAR(MAX),
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    category NVARCHAR(50),
    image_url NVARCHAR(255)
);