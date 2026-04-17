# 🚀 TechVault - PC Components Store

Aplicație Full-Stack modernă (Spring Boot + React) pentru managementul componentelor PC.

## 🛠 1. Ce face aplicația?
* **Autentificare securizată:** Logare/Înregistrare cu BCrypt.
* **Catalog:** Vizualizare produse cu stoc și puncte de fidelitate.
* **UI/UX:** Design simetric, optimizat pentru mobil (Samsung S8+) și desktop.

## 💻 2. Ghid de Instalare (Device Nou)

### 🗄️ Pasul 1: Baza de Date
Rulează scriptul `TechVaultSetup.sql` în SSMS. Acesta creează baza de date `TechVaultDB`, utilizatorul `techuser` (parola `User123!`) și tabelele necesare.

### ⚠️ Pasul 2: Depanare Port 1433 (TCP/IP)
Dacă conexiunea este refuzată:
1. Deschide **SQL Server Configuration Manager**.
2. Mergi la **SQL Server Network Configuration** > **Protocols for MSSQLSERVER**.
3. Activează (**Enable**) **TCP/IP**.
4. La **TCP/IP Properties** > **IP Addresses** > **IPAll**:
   - Șterge *TCP Dynamic Ports*.
   - Setează *TCP Port* la **1433**.
5. **Restart** la serviciul *SQL Server (MSSQLSERVER)* din lista de Services.

### ⚙️ Pasul 3: Configurația Predefinită (application.properties)
Proiectul vine configurat "out-of-the-box". Nu este necesară nicio modificare în cod, dar asigurați-vă că parametrii de mai jos (deja existenți în src/main/resources/application.properties) corespund cu baza de date creată anterior:
```bash
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=TechVaultDB;encrypt=true;trustServerCertificate=true;
spring.datasource.username=techuser
spring.datasource.password=User123!


### 🚀 Pasul 4: Pornirea Proiectului

**Backend:**
Click dreapta pe server\src\main\java\web\proiect\App.java Run Java.Asteptam mesaj de confirmare a pornirii serverului.


**Frontend**
```bash
cd client
npm run dev
