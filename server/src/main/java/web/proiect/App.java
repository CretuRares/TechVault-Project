package web.proiect;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication // Aceasta este "cheia" care porneste tot
public class App {

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(App.class, args);
        
        String port = context.getEnvironment().getProperty("server.port");
        if (port == null) port = "8080";

        
        System.out.println("\n------------------------------------------------");
        System.out.println(" TechVault Backend a pornit cu succes!");
        System.out.println(" Serverul asteapta cereri pe portul: " + port);
        System.out.println(" URL Produse: http://localhost:" + port + "/api/products");
        System.out.println("------------------------------------------------\n");
    }
}