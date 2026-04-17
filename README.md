# 🚀 Vault Tech App

Acest proiect este o aplicație web modernă pentru gestionarea componentelor PC, oferind o interfață optimizată pentru orice dispozitiv.

## 🛠 1. Ce face aplicația?

Aplicația permite utilizatorilor să:
* ** Creare cont și logare într-un "Vault" personalizat.
* ** Identificarea rapidă a produselor/elementelor prin bara de căutare din header.
* ** Design adaptat pentru PC, Tabletă și Mobil (Samsung S8+, etc.).
* ** Gestionarea informațiilor stocate într-o bază de date SQL Server.

---

## 💻 2. Ghid de Instalare (Setup pe un device nou)

Urmează pașii de mai jos pentru a configura mediul de dezvoltare.

### 📋 Precondiții
* [Node.js](https://nodejs.org/) (versiunea LTS recomandată)
* [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms)

---

### 🗄️ Pasul 1: Configurarea Bazei de Date (SQL Server)

1.  Deschide **SQL Server Management Studio (SSMS)** și conectează-te la serverul local.
2.  Deschide si rulează TechVaultDB.sql
    
### 🔗 Pasul 2: Configurarea Conexiunii

În folderul Web_proiect\server\src\main\resources\application.properties, creează un fișier `.env` și adaugă link-ul de conectare:

```env
DB_CONNECTION_STRING="Server=localhost;Database=vault_db;User Id=vault_user;Password=ParolaTaPuternica123!;Encrypt=true;TrustServerCertificate=true;"
PORT=5000

