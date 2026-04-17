# 🚀 TechVault - PC Components Store

Aplicație Full-Stack modernă (Spring Boot + React) pentru managementul componentelor PC, cu un design securizat și optimizat pentru orice dispozitiv.

## 🛠 1. Ce face aplicația?
* **Autentificare:** Sistem de Logare și Înregistrare cu parole.
* **Catalog Hardware:** Vizualizarea produselor (Plăci video, Procesoare, etc.) cu detalii despre stoc, preț și categorii.
* **Sistem de Fidelitate:** Utilizatorii logați pot acumula și vizualiza puncte de loialitate (`points`).
* **Design Responsive:** Interfață simetrică, optimizată special pentru ecrane mobile (Samsung S8+, etc.) și desktop.

---

## 👥 2. Roluri și Permisiuni

Aplicația folosește un sistem de control al accesului bazat pe roluri, definit în coloana `role` din tabela `users`.

| Funcționalitate | Utilizator (USER) | Administrator (ADMIN) |
|:---|:---:|:---:|
| Vizualizare produse | ✅ | ✅ |
| Căutare componente | ✅ | ✅ |
| Acumulare puncte fidelitate | ✅ | ✅ |
| Acces panou de control | ❌ | ✅ |
| Adăugare/Editare produse | ❌ | ✅ |
| Ștergere produse | ❌ | ✅ |

### 🛠️ Capabilități Specifice:

#### **Utilizator (Role: `USER`)**
* **Experiență Personalizată:** Acces la un profil propriu unde poate vedea punctele de fidelitate acumulate.
* **Shopping:** Poate naviga prin catalogul de componente și le poate adăuga în coș.

#### **Administrator (Role: `ADMIN`)**
* **Gestiune Stoc:** Poate modifica prețurile, descrierile și cantitățile de stoc direct din interfață.
* **Inventar:** Are permisiunea de a introduce produse noi în baza de date (Plăci video, Procesoare etc.).
* **Interfață Extinsă:** În header apare insigna specială de **ADMIN** care deblochează butoanele de editare.

---
## 💻 3. Ghid de Instalare (Pe un dispozitiv nou)

### 🗄️ Pasul 1: Baza de Date (SQL Server)
Înainte de a porni aplicația, trebuie pregătit mediul de date. Rulează scriptul `TechVaultSetup.sql` în **SQL Server Management Studio (SSMS)**. Acesta va executa automat:
1. Crearea bazei de date `TechVaultDB`.
2. Crearea login-ului și utilizatorului `techuser` cu parola `User123!`.
3. Generarea și popularea tabelelor `users` și `products` cu date de test.

### ⚠️ Pasul 2: Depanare Port 1433 (TCP/IP)
Dacă serverul backend nu se poate conecta la baza de date (eroare *Connection Refused*):
1. Deschide **SQL Server Configuration Manager**.
2. Mergi la **SQL Server Network Configuration** > **Protocols for MSSQLSERVER**.
3. Dă click dreapta pe **TCP/IP** și alege **Enable**.
4. Dublu-click pe **TCP/IP**, mergi la tab-ul **IP Addresses**, scroll până jos la **IPAll**:
   - Șterge orice valoare de la *TCP Dynamic Ports*.
   - Setează *TCP Port* la **1433**.
5. Mergi la **SQL Server Services** și dă **Restart** serviciului *SQL Server (MSSQLSERVER)*.

### ⚙️ Pasul 3: Configurația Predefinită (`application.properties`)
Proiectul este configurat să funcționeze "out-of-the-box". Parametrii de conexiune sunt deja hardcodați în `src/main/resources/application.properties`:
* **URL**: `jdbc:sqlserver://localhost:1433;databaseName=TechVaultDB`
* **User**: `techuser`
* **Parolă**: `User123!`

### 🚀 Pasul 4: Pornirea Proiectului

**Backend (Java/Spring Boot):**
1. Navighează în VS Code la: `server\src\main\java\web\proiect\App.java`.
2. Click dreapta pe fișier -> **Run Java**.
3. Serverul este pornit când apare mesajul: `TechVault Backend a pornit cu succes!`.

**Frontend (React/Vite):**
Deschide un terminal în folderul proiectului:
```bash
cd client
npm install  # Rulează această comandă doar la prima instalare
npm run dev #accesam link-ul pentru a vizualiza site-ul(ex: Local:   http://localhost:5173/)
