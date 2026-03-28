package web.proiect;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import web.proiect.model.*;
import web.proiect.repository.*;
import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {


    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private UserRepository userRepository;

 @Override
public void run(String... args) throws Exception {
    

    if (userRepository.count() == 0) {
                userRepository.save(new User(
                null, 
                "admin_tech", 
                "admin123", 
                0, 
                "admin@techvault.ro", 
                Role.ADMIN
            ));

            userRepository.save(new User(
                null, 
                "andrei_popescu", 
                "parola123", 
                2500, 
                "andrei.p@gmail.com", 
                Role.USER
            ));

            userRepository.save(new User(
                null, 
                "elena_ionescu", 
                "secret789", 
                0, 
                "elena.io@yahoo.com", 
                Role.USER
            ));

            System.out.println("✅ Utilizatorii au fost inițializați cu succes!");
    }


    if (productRepository.count() == 0) {
        //1.Placi video
        productRepository.save(new Product(
            "NVIDIA GeForce RTX 4090", 
            "24GB GDDR6X, 384-bit, DLSS 3.0, Performanta extrema 4K", 
            new BigDecimal("9850.00"), 
            "Placi Video", 
            5, 
            "https://s13emagst.akamaized.net/products/101190/101189501/images/res_e91cb2628095581f038270c451d4ebf5.jpg?width=720&height=720&hash=3671BC4ABB1B40974351E364BBDB4824"
        ));

        productRepository.save(new Product(
            "NVIDIA GeForce RTX 4080 Super", 
            "16GB GDDR6X, Ray Tracing Gen 3, Performanta 4K de top, Editie Founders", 
            new BigDecimal("5600.00"), 
            "Placi Video", 
            7, 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRozLonnxR4tWOoWVLMnNb12rx2js--_TDx-A&s"
        ));

        productRepository.save(new Product(
            "AMD Radeon RX 7900 XTX", 
            "24GB GDDR6, Arhitectura RDNA 3, Rivalul direct pentru RTX 4080, Performanta bruta masiva", 
            new BigDecimal("5100.00"), 
            "Placi Video", 
            5, 
            "https://s13emagst.akamaized.net/products/51264/51263001/images/res_f31f86fdbf1115e64700750cbece7e69.jpg"
        ));

        productRepository.save(new Product(
            "NVIDIA GeForce RTX 4070 Ti Super", 
            "16GB GDDR6X, Ideala pentru 1440p Ultra, Consum eficient de energie", 
            new BigDecimal("4350.00"), 
            "Placi Video", 
            12, 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj6XIUiAasTozXUNuVc3_ubsOw4ebEeLQsGw&s"
        ));

        productRepository.save(new Product(
            "AMD Radeon RX 7800 XT", 
            "16GB GDDR6, Regele segmentului mid-range, Performanta excelenta in 1440p", 
            new BigDecimal("2750.00"), 
            "Placi Video", 
            10, 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTauTYYcPKg7vikRzTDG5hyN6OZojnlrdJZHA&s"
        ));

        productRepository.save(new Product(
            "NVIDIA GeForce RTX 4060 Ti", 
            "8GB GDDR6, DLSS 3.0, Cea mai buna optiune pentru gaming 1080p cu setari maxime", 
            new BigDecimal("1950.00"), 
            "Placi Video", 
            15, 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxaaTy_-L5xfDfIRtoocU85F2q6nPC3e0tVg&s"
        ));


        //2.Procesoare
        productRepository.save(new Product(
            "Intel Core i9-14900K", 
            "3.2GHz (6.0GHz Turbo), 24 nuclee, 32 thread-uri, LGA1700", 
            new BigDecimal("2999.00"), 
            "Procesoare", 
            12, 
            "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTr-pN4H_jOY3kwafx5GnjFZY2Av4WdmKkpSQzk0kDwcw25mughYgeNEoWBzBndv7g0nTGZMdvaCa3C7p6aFZeh907_QvOj9PyyuOzeUmv7ogGpUYEyeDNq51M"
        ));

        productRepository.save(new Product(
            "AMD Ryzen 7 7800X3D", 
            "Cel mai bun procesor pentru gaming, 8 nuclee, 96MB L3 Cache, Tehnologie 3D V-Cache", 
            new BigDecimal("1950.00"), 
            "Procesoare", 
            15, 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI9n0lnQiR42vR-xN_htvfn-kkPwqcsUZAUQ&s"
        ));

        productRepository.save(new Product(
            "Intel Core i7-14700K", 
            "20 nuclee (8P + 12E), 5.6GHz Turbo, LGA1700, Excelent pentru multitasking si gaming", 
            new BigDecimal("2150.00"), 
            "Procesoare", 
            10, 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD-dlHSvRrte4Nq4F1ojJqW7pGRi91IyJUEA&s"
        ));

        productRepository.save(new Product(
            "AMD Ryzen 9 7900X", 
            "12 nuclee, 24 thread-uri, 5.6GHz Boost, Arhitectura Zen 4, Socket AM5", 
            new BigDecimal("2100.00"), 
            "Procesoare", 
            8, 
            "https://3.grgs.ro/images/products/1/8524/2451324/normal/ryzen-9-7900x-47ghz-box-c6592d5c866068c64628cac0fc3a972e.jpg"
        ));

        productRepository.save(new Product(
            "Intel Core i5-13600K", 
            "14 nuclee, 5.1GHz, Regele raportului performanta/pret, Socket LGA1700", 
            new BigDecimal("1450.00"), 
            "Procesoare", 
            20, 
            "https://s13emagst.akamaized.net/products/49584/49583705/images/res_208beee3b24cb4b0c246f30d2d1c2447.jpg"
        ));

        productRepository.save(new Product(
            "AMD Ryzen 5 7600X", 
            "6 nuclee, 5.3GHz Boost, Ideal pentru build-uri de gaming AM5 cu buget mediu", 
            new BigDecimal("1050.00"), 
            "Procesoare", 
            12, 
            "https://lcdn.altex.ro/media/catalog/product/a/m/amd_ryzen_5_7000_series_3_85e4ef09.jpg"
        ));

        productRepository.save(new Product(
            "Intel Core i9-12900K", 
            "Fostul flagship, 16 nuclee, performanta solida in productivitate, pret redus", 
            new BigDecimal("1850.00"), 
            "Procesoare", 
            5, 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY0MB9fNeJ1jRPGCmCZtGAYKuAivF-6C80Lg&s"
        ));

        productRepository.save(new Product(
            "AMD Ryzen 7 5800X3D", 
            "Legenda socket-ului AM4, 8 nuclee, 3D V-Cache, upgrade-ul suprem pentru platformele vechi", 
            new BigDecimal("1400.00"), 
            "Procesoare", 
            9, 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB8LwPLv6aU7R8zBUWuJiWG9hLr2VsfM0rxQ&s"
        ));

        productRepository.save(new Product(
            "Intel Core i3-14100F", 
            "4 nuclee, 4.7GHz, Procesor de buget excelent pentru gaming entry-level", 
            new BigDecimal("620.00"), 
            "Procesoare", 
            25, 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8Is6YfOr_f0nSOB6wacopic6tZL_4Xd1Leg&s"
        ));

        productRepository.save(new Product(
            "AMD Ryzen 9 5950X", 
            "16 nuclee, 32 thread-uri, Bestia pentru randare si editare pe platforma AM4", 
            new BigDecimal("1900.00"), 
            "Procesoare", 
            4, 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkzKAJ7PJbX7R8gl5lUCtVrF3YDm9t0uWPZQ&s"
        ));

        productRepository.save(new Product(
            "Intel Core i7-12700K", 
            "12 nuclee, performanta hibrida solida, suport DDR4 si DDR5", 
            new BigDecimal("1350.00"), 
            "Procesoare", 
            11, 
            "https://s13emagst.akamaized.net/products/41223/41222781/images/res_ae029105ab73e9a3fe4fd4925bb6ef36.jpg"
        ));


        //3.RAM
        productRepository.save(new Product(
            "Kingston FURY Renegade 32GB", 
            "DDR5, 6000MHz, CL32, Kit 2x16GB, RGB", 
            new BigDecimal("845.50"), 
            "Memorii RAM", 
            25, 
            "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRRMGaGUo1kJReHxUghk34lGrEmNMJOj8bXR0VLRkhuldH8eSPORoUeMSreGKj99uae8oRk7xSxr2H1INMFDUEqDsX1xtd0p9MjshobKQS50fAigefo32Zd_54"
        ));

        productRepository.save(new Product(
            "G.Skill Trident Z5 RGB 32GB", 
            "DDR5-6400MHz, CL32, Kit 2x16GB, Design premium argintiu, Iluminare RGB spectaculoasa", 
            new BigDecimal("950.00"), 
            "Memorii RAM", 
            10, 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkJLR4RA_tZnrdHUhPXZIPQyIEYD8RJwAMng&s"
        ));

        productRepository.save(new Product(
            "Corsair Vengeance RGB 32GB", 
            "DDR5-6000MHz, CL30, Kit 2x16GB, Optimizat pentru AMD EXPO, Negru", 
            new BigDecimal("780.00"), 
            "Memorii RAM", 
            15, 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0NeKwfSoRIDbGbVLmJNZi3xyXLbbDrQFdVA&s"
        ));

        productRepository.save(new Product(
            "TeamGroup T-Force Delta RGB 32GB", 
            "DDR5-7200MHz, Design ultra-rapid, Radiator alb, Ideal pentru build-uri de gaming albe", 
            new BigDecimal("1100.00"), 
            "Memorii RAM", 
            5, 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9E7vaAgqJHIhg6DZTyHkasB5Hj-J_uW5Bxw&s"
        ));

        productRepository.save(new Product(
            "Crucial Pro 64GB Kit", 
            "DDR5-5600MHz, 2x32GB, Design low-profile fara RGB, Ideal pentru Workstation si productivitate", 
            new BigDecimal("1450.00"), 
            "Memorii RAM", 
            8, 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiAomu_Bek3NoPrN7AzlbCedCI31LS7kvk7g&s"
        ));

        productRepository.save(new Product(
            "G.Skill Flare X5 32GB", 
            "DDR5-6000MHz, CL32, Low-profile (inaltime redusa), Optimizat pentru procesoare AMD Ryzen", 
            new BigDecimal("690.00"), 
            "Memorii RAM", 
            12, 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiljHhQ11ABUEE2hQQR5W12advnlI7TwRniQ&s"
        ));

        productRepository.save(new Product(
            "ADATA XPG Lancer RGB 16GB", 
            "DDR5-5200MHz, CL38, Iluminare RGB customizabila, Performanta stabila pentru gaming", 
            new BigDecimal("350.00"), 
            "Memorii RAM", 
            20, 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPnVkKpmNKzfqZkJgMLQT8B53l8BkEE_Yx7Q&s"
        ));

        productRepository.save(new Product(
            "Corsair Dominator Platinum RGB 32GB", 
            "DDR5-6200MHz, CL36, DHX Cooling, LED-uri Capellix ultra-luminoase, Design iconic", 
            new BigDecimal("1250.00"), 
            "Memorii RAM", 
            4, 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr49iHQFH84E3TXaPikisK3x1Vo-xRS8YiTg&s"
        ));

        productRepository.save(new Product(
            "Patriot Viper Venom RGB 32GB", 
            "DDR5-7400MHz, Performanta extrema pentru entuziasti, Radiator aluminiu", 
            new BigDecimal("1050.00"), 
            "Memorii RAM", 
            6, 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrgqusFTg1VyBQ1uYbOu2ceY-cupLPO8N4TQ&s"
        ));

        productRepository.save(new Product(
            "Lexar Thor OC 32GB", 
            "DDR5-6000MHz, CL32, Radiator gri mat, Performanta stabila la un pret competitiv", 
            new BigDecimal("620.00"), 
            "Memorii RAM", 
            10, 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB06vGDqfH3WA9tq8jiC5Lv60rNfbDABBqUQ&s"
        ));



        //4.Stocare
        productRepository.save(new Product(
            "Samsung 990 PRO 2TB", 
            "NVMe M.2 SSD, PCIe Gen4, Viteze pana la 7450 MB/s", 
            new BigDecimal("890.00"), 
            "Stocare", 
            15, 
            "https://s13emagst.akamaized.net/products/56493/56492181/images/res_7672a1be3533a9a566cf31822e1e016d.jpg?width=720&height=720&hash=CA06CF562F47C3AA12A2F273AC9DCF0F"
        ));

            productRepository.save(new Product(
            "Crucial T700 2TB PCIe Gen5", 
            "Viteza incredibila de 12.400 MB/s, NVMe M.2, Radiator inclus, Viitorul stocarii", 
            new BigDecimal("1450.00"), 
            "Stocare", 
            4, 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1T-NikJpmSkd0AZG67SuWwllGamBfsWb2Sw&s"
        ));

        productRepository.save(new Product(
            "WD Black SN850X 1TB", 
            "Optimizat pentru Gaming, 7300 MB/s, Tehnologie Game Mode 2.0, NVMe M.2", 
            new BigDecimal("420.00"), 
            "Stocare", 
            18, 
            "https://s13emagst.akamaized.net/products/92444/92443583/images/res_8a1629a884131e66952325b882cb1f1a.jpg"
        ));

        productRepository.save(new Product(
            "Seagate FireCuda 530 2TB", 
            "Compatibil PS5, Rezistenta extrema (2550 TBW), 7300 MB/s, Heatsink EKWB", 
            new BigDecimal("980.00"), 
            "Stocare", 
            7, 
            "https://s13emagst.akamaized.net/products/41908/41907953/images/res_5861dbc0883fecf1c3970ef34847f5c3.jpg"
        ));

        productRepository.save(new Product(
            "Kingston KC3000 2TB", 
            "Performanta premium la pret corect, 7000 MB/s, Graphene Aluminum Spreader", 
            new BigDecimal("750.00"), 
            "Stocare", 
            12, 
            "https://s13emagst.akamaized.net/products/41241/41240887/images/res_3c1a4c88771b66ff6c23af3308f244ca.jpg"
        ));

        productRepository.save(new Product(
            "Sabrent Rocket 4 Plus 4TB", 
            "Capacitate uriasa, PCIe Gen4, Ideal pentru editare video 8K, 7100 MB/s", 
            new BigDecimal("2100.00"), 
            "Stocare", 
            3, 
            "https://sabrent.com/cdn/shop/products/ROCKET4-Main_2048x.jpg?v=1688176245"
        ));

        productRepository.save(new Product(
            "Samsung 870 EVO 1TB", 
            "SATA III 2.5 inch, Fiabilitate legendara, Ideal pentru upgrade laptop/PC vechi", 
            new BigDecimal("380.00"), 
            "Stocare", 
            25, 
            "https://s13emagst.akamaized.net/products/34725/34724872/images/res_e3f01f4cd31a7dd2ee6c5859bb63f3fc.jpg"
        ));

        productRepository.save(new Product(
            "Seagate IronWolf Pro 12TB", 
            "HDD special pentru NAS, 7200 RPM, Fiabilitate 24/7, Tehnologie AgileArray", 
            new BigDecimal("1550.00"), 
            "Stocare", 
            5, 
            "https://s13emagst.akamaized.net/products/58070/58069601/images/res_ae55d063805a419d6891dc4beb03e6b0.jpg"
        ));

        productRepository.save(new Product(
            "WD Blue 4TB HDD", 
            "Stocare masiva pentru poze si documente, 5400 RPM, Fiabil si silentios", 
            new BigDecimal("450.00"), 
            "Stocare", 
            10, 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg1ukCE_7Lrl1A6sKJsOCRc1mdk1vtUczexQ&s"
        ));


        //5.Placi de baza
        productRepository.save(new Product(
            "ASUS ROG Maximus Z790 Hero", 
            "Placa de baza High-end, DDR5, Wi-Fi 6E, Aura Sync", 
            new BigDecimal("3450.00"), 
            "Placi de baza", 
            8, 
            "https://1.grgs.ro/images/products/1/7985/2490060/normal/rog-maximus-z790-hero-5537f2d5895633d605022fc93d5d84eb.jpg"
        ));

        productRepository.save(new Product(
            "MSI MPG Z790 Carbon WiFi", 
            "Suport Intel Gen 14, DDR5, 5x M.2 Slots, Design Carbon Black, PCIe 5.0", 
            new BigDecimal("2150.00"), 
            "Placi de baza", 
            6, 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1AJ7JVxsmrwklSHxp2EBAXlFEZNpKk29uVQ&s"
        ));

        productRepository.save(new Product(
            "Gigabyte X670E AORUS Master", 
            "Socket AMD AM5, DDR5, Etaj alimentare 16+2+2 faze, WiFi 6E, E-ATX", 
            new BigDecimal("2450.00"), 
            "Placi de baza", 
            4, 
            "https://1.grgs.ro/images/products/1/3857/2468508/normal/x670e-aorus-master-c80b682ff8cc007f21fe6c870a364bea.jpg"
        ));

        productRepository.save(new Product(
            "ASRock Z790 Taichi Lite", 
            "Design steampunk iconic, 24 Phase VRM, Suport DDR5 7200MHz+, Dual LAN", 
            new BigDecimal("1850.00"), 
            "Placi de baza", 
            3, 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_5KzNdnqEt41SYiRd3giBqVI4wWCFOEaxeg&s"
        ));

        productRepository.save(new Product(
            "NZXT N7 B650E White", 
            "Chipset AMD, Design minimalist cu armura alba, WiFi 6E, Bluetooth 5.2", 
            new BigDecimal("1600.00"), 
            "Placi de baza", 
            7, 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcwztfRDKLLJcUMdD5n4cVUtmuaMG3zcz6XQ&s"
        ));

        productRepository.save(new Product(
            "EVGA Z790 Dark K|NGP|N", 
            "Orientata spre Overclocking extrem, Socket rotit la 90 grade, 21-layer PCB", 
            new BigDecimal("3900.00"), 
            "Placi de baza", 
            2, 
            "https://cdn.mos.cms.futurecdn.net/oW2nMQStCQoUg7nKLivTwb.jpg"
        ));


        //6.Carcase
        productRepository.save(new Product(
            "Corsair 4000D Airflow", 
            "Mid-Tower ATX, Panou lateral sticla securizata, High-Airflow, Alb", 
            new BigDecimal("550.00"), 
            "Carcase", 
            10, 
            "https://1.grgs.ro/images/products/1/6769/2110662/normal/4000d-airflow-black-742d329fc02855d3e278c84d968a7bce.jpg"
        ));

        productRepository.save(new Product(
            "NZXT H5 Flow", 
            "Mid-Tower, Flux de aer optimizat, Ventilator dedicat GPU, Negru", 
            new BigDecimal("480.00"), 
            "Carcase", 
            8, 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7-1SnFmDusjUxiz5__GbxWpC2NeeiT-YknQ&s"
        ));

        productRepository.save(new Product(
            "Lian Li PC-O11 Dynamic", 
            "Dual Chamber, Design modular, Ideal pentru Water Cooling, Negru", 
            new BigDecimal("920.00"), 
            "Carcase", 
            5, 
            "https://1.grgs.ro/images/products/1/6115/1778564/normal/pc-o11dx-tempered-glass-black-d1d13c0dca62c5b1b94f1f037f237b0b.jpg"
        ));

        productRepository.save(new Product(
            "Fractal Design North", 
            "Design Scandinav, Panou frontal cu lemn de nuc, Airflow, Charcoal", 
            new BigDecimal("850.00"), 
            "Carcase", 
            4, 
            "https://s13emagst.akamaized.net/products/105047/105046249/images/res_5e9fe499cd6a66a0deeb326cf43b504b.jpg"
        ));

        productRepository.save(new Product(
            "Be Quiet! Pure Base 500DX", 
            "Silentioasa, Benzi ARGB, 3 ventilatoare Pure Wings 2 incluse", 
            new BigDecimal("520.00"), 
            "Carcase", 
            12, 
            "https://s13emagst.akamaized.net/products/32840/32839091/images/res_234e2fc34d6787bce6cd980a6b9d8dff.jpg"
        ));

        productRepository.save(new Product(
            "Phanteks NV7", 
            "Full Tower, Design Panoramic, Suport E-ATX, Negru", 
            new BigDecimal("1150.00"), 
            "Carcase", 
            3, 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnYwRwdqxF_e7NN25O5l56VYYzT1xp0fr4MA&s"
        ));

        productRepository.save(new Product(
            "ASUS ROG Strix Helios", 
            "Premium Mid-Tower, Benzi de transport, Iluminare Aura Sync", 
            new BigDecimal("1650.00"), 
            "Carcase", 
            2, 
            "https://p1.akcdn.net/full/614221698.asus-rog-strix-gx601-helios-black-90dc0020-b39000.jpg"
        ));

        productRepository.save(new Product(
            "Cooler Master TD500 Mesh V2", 
            "Panou frontal poligonat, 3 ventilatoare ARGB incluse, Alb", 
            new BigDecimal("430.00"), 
            "Carcase", 
            15, 
            "https://s13emagst.akamaized.net/products/57757/57756428/images/res_c11306b30b95829f207455dee65fdf4e.jpg"
        ));

        productRepository.save(new Product(
            "DeepCool CC560", 
            "Buget excelent, 4 ventilatoare LED incluse, Negru", 
            new BigDecimal("280.00"), 
            "Carcase", 
            20, 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpuMDnZp8O-FaXKsufGQON7gADjyRKYYX7uQ&s"
        ));

        productRepository.save(new Product(
            "Hyte Y60", 
            "Design panoramic 3 piese sticla, Montare verticala GPU, Rosu", 
            new BigDecimal("1050.00"), 
            "Carcase", 
            6, 
            "https://media.icdn.hu/product/2022-11/861404/2057035_hyte-y60-tg-fekete.webp"
        ));


        System.out.println("✅ Tabelul Products a fost populat cu componente tech reale!");
    }
}
}